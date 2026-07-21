import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bg-remover.app"),
  title: "BG Remover — Free AI Background Removal Tool",
  description:
    "Remove image backgrounds instantly with AI. Free, no signup required. Upload any PNG, JPG, or WebP image and get a transparent background in seconds. Privacy-first — your images are never stored.",
  keywords: [
    "background remover",
    "remove background",
    "background removal",
    "AI background remover",
    "transparent background",
    "free background remover",
    "image background remover",
    "photo background remover",
    "PNG transparent",
    "remove bg",
    "bg remover",
    "erase background",
    "cutout image",
    "image editing",
  ],
  authors: [{ name: "BG Remover" }],
  creator: "BG Remover",
  publisher: "BG Remover",
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
    icon: "/logo.svg",
  },
  openGraph: {
    title: "BG Remover — Free AI Background Removal Tool",
    description:
      "Remove image backgrounds instantly with AI. 100% free, no signup, privacy-first.",
    url: "https://bg-remover.app",
    siteName: "BG Remover",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BG Remover — AI Background Removal Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BG Remover — Free AI Background Removal Tool",
    description:
      "Remove image backgrounds instantly with AI. 100% free, no signup, privacy-first.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://bg-remover.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "BG Remover",
              description:
                "Free AI-powered background removal tool. Remove image backgrounds instantly with no signup required.",
              url: "https://bg-remover.app",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "AI background removal",
                "Free to use",
                "No signup required",
                "Supports PNG, JPG, WebP",
                "Privacy-first processing",
                "Instant results",
              ],
            }),
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
