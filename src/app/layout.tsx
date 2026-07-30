import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
};

const SITE_URL = "https://background-remover-ucpa.onrender.com";
const SITE_NAME = "Background Remover";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Background Remover — Free AI Tool to Remove BG Instantly",
    template: "%s | Background Remover",
  },
  description:
    "Remove image backgrounds instantly with our free AI background remover. No signup, no watermarks. Full subject preserved, batch processing. Try now!",
  keywords: [
    "background remover",
    "remove background",
    "background removal",
    "AI background remover",
    "transparent background",
    "free background remover",
    "remove bg",
    "bg remover",
    "erase background",
    "cutout image",
    "image background remover",
    "photo background remover",
    "PNG transparent",
    "batch background removal",
    "background eraser",
    "image editing",
    "product photo editor",
    "ecommerce photo editor",
    "remove background from image",
    "background remover online",
    "background remover free",
    "free image editor",
    "remove white background",
    "product photography",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Background Remover — Free AI Tool to Remove BG from Any Image",
    description:
      "Remove background from any image instantly with AI. 100% free, no signup, no watermarks. Full subject preserved, batch processing available.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Background Remover — Free AI tool to remove any background in seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Background Remover — Free AI Tool to Remove BG Instantly",
    description:
      "Remove background from any image instantly with AI. 100% free, no signup, no watermarks. Full subject preserved, batch processing.",
    images: ["/og-image.png"],
    creator: "@backgroundremover",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "MultimediaApplication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Background Remover" />
        {/* ── Resource Hints ─────────────────────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* ── Google Search Console Verification ────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": SITE_URL + "/blog" }
              ]
            })
          }}
        />

        {/* ── Google AdSense ─────────────────────────────────────── */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8907823495775296" crossOrigin="anonymous"></script>
        {/* Google AdSense Auto Ads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-8907823495775296",
                enable_page_level_ads: true
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
