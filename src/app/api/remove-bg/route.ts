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
  // Cleanup expired entries to prevent memory leak
  for (const [key, entry] of rateLimiter) {
    if (now > entry.resetTime) rateLimiter.delete(key);
  }
  const entry = rateLimiter.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function header2Str(uint8: Uint8Array, offset: number, length: number): string {
  return String.fromCharCode(...uint8.slice(offset, offset + length));
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a moment before trying again.' },
      { status: 429 }
    );
  }

  const tmpDir = path.join(os.tmpdir(), 'bg-remover');
  const inputPath = path.join(tmpDir, `input-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);
  const outputPath = path.join(tmpDir, `output-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);

  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request. Please send a multipart/form-data request with an image file.' },
        { status: 400 }
      );
    }
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Please upload a PNG, JPG, or WebP image.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File too large. Please upload an image smaller than 10MB.' },
        { status: 400 }
      );
    }

    // Validate file has actual content (not empty)
    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'File is empty. Please upload a valid image.' },
        { status: 400 }
      );
    }

    // Validate actual file content matches declared type (magic bytes check)
    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const header = uint8.slice(0, 8);

    const isPng = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47;
    const isJpg = header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF;
    const isWebp = header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46 &&
                   uint8.length > 11 && header2Str(uint8, 8, 4) === 'WEBP';

    if (!isPng && !isJpg && !isWebp) {
      return NextResponse.json(
        { success: false, error: 'File content does not match a valid image format. Please upload a real PNG, JPG, or WebP image.' },
        { status: 400 }
      );
    }

    // Ensure tmp directory exists
    await mkdir(tmpDir, { recursive: true });

    // Save uploaded file to temp
    const buffer = Buffer.from(arrayBuffer);
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
        success: false,
        error: 'Processing failed: insufficient memory. Try a smaller image (under 2MB recommended).',
      }, { status: 507 });
    }

    // Check for timeout
    if (errorMessage.includes('timed out') || errorMessage.includes('ETIMEDOUT')) {
      return NextResponse.json({
        success: false,
        error: 'Processing timed out. Try a smaller image or try again later.',
      }, { status: 504 });
    }

    return NextResponse.json({
      success: false,
      error: 'Background removal failed. Please try again with a different image.',
    }, { status: 500 });
  }
}
