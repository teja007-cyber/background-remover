import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Control referrer information leakage
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Disable legacy XSS filter (modern approach: rely on CSP instead)
  response.headers.set('X-XSS-Protection', '0');

  // Disable unnecessary browser features
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy - allows data: URLs for base64 images,
  // blob: for file uploads, unsafe-inline/eval for Next.js scripts
  // Google AdSense allowed for ad-serving scripts and images
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://pagead2.googlesyndication.com; img-src 'self' data: blob: https: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com; frame-ancestors 'none';"
  );

  // Prevent cross-origin attacks
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|logo.svg|favicon.svg|og-image.png).*)',
  ],
};
