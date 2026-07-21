import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, unlink, mkdir } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import os from 'os';

const execFileAsync = promisify(execFile);

// Rate limiting: simple in-memory store
const rateLimiter = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment before trying again.' },
      { status: 429 }
    );
  }

  const tmpDir = path.join(os.tmpdir(), 'bg-remover');
  const inputPath = path.join(tmpDir, `input-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);
  const outputPath = path.join(tmpDir, `output-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PNG, JPG, or WebP image.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Please upload an image smaller than 10MB.' },
        { status: 400 }
      );
    }

    // Ensure tmp directory exists
    await mkdir(tmpDir, { recursive: true });

    // Save uploaded file to temp
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(inputPath, buffer);

    // Run the dedicated Python script with optimized rembg settings
    const scriptPath = path.join(process.cwd(), 'scripts', 'remove_bg.py');

    const { stdout, stderr } = await execFileAsync('python3', [
      scriptPath, inputPath, outputPath
    ], {
      timeout: 300000, // 5 minute timeout
      maxBuffer: 10 * 1024 * 1024,
    });

    // Verify output file was created
    let outputBuffer: Buffer;
    try {
      outputBuffer = await readFile(outputPath);
    } catch {
      throw new Error('Processing completed but no output file was generated');
    }

    if (outputBuffer.length === 0) {
      throw new Error('Processing produced an empty result');
    }

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
  } catch (error: unknown) {
    console.error('Background removal error:', error);

    // Clean up temp files on error
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';

    // Check for OOM or process killed
    if (errorMessage.includes('signal') || errorMessage.includes('killed') || errorMessage.includes('ENOMEM')) {
      return NextResponse.json({
        error: 'Processing failed: insufficient memory. Try a smaller image (under 2MB recommended).',
      }, { status: 507 });
    }

    // Check for timeout
    if (errorMessage.includes('timed out') || errorMessage.includes('ETIMEDOUT')) {
      return NextResponse.json({
        error: 'Processing timed out. Try a smaller image or try again later.',
      }, { status: 504 });
    }

    return NextResponse.json({
      error: 'Background removal failed. Please try again with a different image.',
    }, { status: 500 });
  }
}
