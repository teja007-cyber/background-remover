import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, unlink, mkdir } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import os from 'os';

const execFileAsync = promisify(execFile);

// Rate limiting
const rateLimiter = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // batch requests per window (lower than single)
const RATE_WINDOW = 120_000; // 2 minutes

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

const MAX_BATCH_SIZE = 10;
const VALID_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

async function processSingleImage(inputPath: string, outputPath: string): Promise<Buffer> {
  const scriptPath = path.join(process.cwd(), 'scripts', 'remove_bg.py');

  await execFileAsync('python3', [scriptPath, inputPath, outputPath], {
    timeout: 300000, // 5 minutes per image
    maxBuffer: 10 * 1024 * 1024,
  });

  const outputBuffer = await readFile(outputPath);
  if (!outputBuffer || outputBuffer.length === 0) {
    throw new Error('Processing produced an empty result');
  }
  return outputBuffer;
}

function header2Str(uint8: Uint8Array, offset: number, length: number): string {
  return String.fromCharCode(...uint8.slice(offset, offset + length));
}

function validateImageBytes(uint8: Uint8Array): boolean {
  if (uint8.length < 12) return false;
  const header = uint8.slice(0, 8);
  const isPng = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47;
  const isJpg = header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF;
  const isWebp = header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46 &&
                 uint8.length > 11 && header2Str(uint8, 8, 4) === 'WEBP';
  return isPng || isJpg || isWebp;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many batch requests. Please wait before trying again.' },
      { status: 429 }
    );
  }

  const tmpDir = path.join(os.tmpdir(), 'bg-remover-batch');
  const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request. Please send a multipart/form-data request with image files.' },
        { status: 400 }
      );
    }
    const files: File[] = [];

    // Collect all files from formData
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key.startsWith('file') && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 });
    }

    if (files.length > MAX_BATCH_SIZE) {
      return NextResponse.json(
        { success: false, error: `Too many files. Maximum ${MAX_BATCH_SIZE} images per batch.` },
        { status: 400 }
      );
    }

    // Validate all files first
    for (const file of files) {
      if (!VALID_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: `Invalid file type: ${file.name}. Only PNG, JPG, WebP allowed.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: `File too large: ${file.name}. Max 10MB per image.` },
          { status: 400 }
        );
      }
      if (file.size === 0) {
        return NextResponse.json(
          { success: false, error: `File is empty: ${file.name}. Please upload valid images.` },
          { status: 400 }
        );
      }
    }

    // Validate actual file content (magic bytes)
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      if (!validateImageBytes(uint8)) {
        return NextResponse.json(
          { success: false, error: `File content is not a valid image: ${file.name}. Please upload real PNG, JPG, or WebP images.` },
          { status: 400 }
        );
      }
    }

    await mkdir(tmpDir, { recursive: true });

    // Process images sequentially to avoid OOM
    const results: Array<{
      name: string;
      originalSize: number;
      processedSize: number;
      image: string;
    }> = [];

    const errors: Array<{ name: string; error: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const inputPath = path.join(tmpDir, `batch-${sessionId}-${i}-input.png`);
      const outputPath = path.join(tmpDir, `batch-${sessionId}-${i}-output.png`);

      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(inputPath, buffer);

        const outputBuffer = await processSingleImage(inputPath, outputPath);

        const base64 = outputBuffer.toString('base64');

        results.push({
          name: file.name,
          originalSize: buffer.length,
          processedSize: outputBuffer.length,
          image: `data:image/png;base64,${base64}`,
        });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Processing failed';
        errors.push({ name: file.name, error: errMsg });
      } finally {
        // Clean up temp files for this image
        await unlink(inputPath).catch(() => {});
        await unlink(outputPath).catch(() => {});
      }
    }

    return NextResponse.json({
      success: true,
      results,
      errors,
      total: files.length,
      processed: results.length,
      failed: errors.length,
    });
  } catch (error: unknown) {
    console.error('Batch background removal error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';

    if (errorMessage.includes('signal') || errorMessage.includes('killed') || errorMessage.includes('ENOMEM')) {
      return NextResponse.json({
        success: false,
        error: 'Processing failed: insufficient memory. Try smaller images or fewer files.',
      }, { status: 507 });
    }

    if (errorMessage.includes('timed out') || errorMessage.includes('ETIMEDOUT')) {
      return NextResponse.json({
        success: false,
        error: 'Processing timed out. Try fewer or smaller images.',
      }, { status: 504 });
    }

    return NextResponse.json({
      success: false,
      error: 'Batch processing failed. Please try again.',
    }, { status: 500 });
  }
}
