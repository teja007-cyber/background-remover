import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, unlink, mkdir } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import os from 'os';

const execFileAsync = promisify(execFile);

export async function POST(request: NextRequest) {
  const tmpDir = path.join(os.tmpdir(), 'bg-remover');
  const inputPath = path.join(tmpDir, `input-${Date.now()}.png`);
  const outputPath = path.join(tmpDir, `output-${Date.now()}.png`);

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Ensure tmp directory exists
    await mkdir(tmpDir, { recursive: true });

    // Save uploaded file to temp
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(inputPath, buffer);

    // Run Python rembg as a one-shot command
    const pythonPath = 'python3';
    const script = `
import sys
from rembg import remove
input_path = sys.argv[1]
output_path = sys.argv[2]
with open(input_path, 'rb') as f:
    input_data = f.read()
output_data = remove(input_data)
with open(output_path, 'wb') as f:
    f.write(output_data)
print("done")
`;

    const { stdout, stderr } = await execFileAsync(pythonPath, [
      '-c', script, inputPath, outputPath
    ], {
      timeout: 300000, // 5 minute timeout
      maxBuffer: 10 * 1024 * 1024,
    });

    // Read processed image
    const outputBuffer = await readFile(outputPath);
    const base64 = outputBuffer.toString('base64');

    // Clean up temp files
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${base64}`,
      original_size: buffer.length,
      processed_size: outputBuffer.length,
    });
  } catch (error: any) {
    console.error('Background removal error:', error);

    // Clean up temp files on error
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    const errorMessage = error?.message || 'Internal server error';

    // Check for OOM or timeout
    if (errorMessage.includes('signal') || errorMessage.includes('killed') || errorMessage.includes('ENOMEM')) {
      return NextResponse.json({
        error: 'Processing failed: insufficient memory. Try a smaller image.',
      }, { status: 507 });
    }

    if (errorMessage.includes('timed out')) {
      return NextResponse.json({
        error: 'Processing timed out. Try a smaller image.',
      }, { status: 504 });
    }

    return NextResponse.json({
      error: `Background removal failed: ${errorMessage}`,
    }, { status: 500 });
  }
}
