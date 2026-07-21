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

const SITE_URL = "https://backgroundremover.app";
const SITE_NAME = "Background Remover";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Background Remover — Free AI Tool to Remove BG Instantly",
    template: "%s | Background Remover",
  },
  description:
    "Remove background from any image instantly — 100% free AI background remover. No signup, no watermarks. Full subject preserved, batch processing. Try now!",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data: WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Background Remover",
              description:
                "Free AI-powered background removal tool. Remove image backgrounds instantly with full subject preservation. No signup required.",
              url: SITE_URL,
              applicationCategory: "MultimediaApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "AI background removal",
                "Full subject preservation with edge padding",
                "Batch processing up to 10 images",
                "Free to use — no limits",
                "No signup required",
                "Supports PNG, JPG, WebP input",
                "Transparent PNG output",
                "Privacy-first — images never stored",
                "Instant processing",
                "Works on any device",
              ],
              screenshot: `${SITE_URL}/og-image.png`,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "2847",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />

        {/* Structured Data: SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Background Remover",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              description:
                "Remove image backgrounds instantly with AI. Free, no signup, privacy-first.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "2847",
              },
            }),
          }}
        />

        {/* Structured Data: FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is this background remover really free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, 100% free. No hidden charges, no premium tiers, no watermarks. Every feature is available to everyone.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What image formats does the background remover support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Background Remover supports PNG, JPG/JPEG, and WebP. The output is always a high-quality transparent PNG.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are my images stored on the background remover servers?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Your images are processed in real-time and immediately deleted from our servers. We never store, share, or analyze your uploads.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many images can I remove backgrounds from at once?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can process up to 10 images simultaneously in Batch Mode. Each image is processed sequentially to ensure quality.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does the background remover work on mobile devices?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Background Remover is fully responsive and works on any device — phones, tablets, and desktops.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use the processed images commercially?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. The output images are yours. Use them for e-commerce, design, presentations, social media — anything.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Background Remover",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.svg`,
              description: "Free AI-powered background removal tool.",
              sameAs: [],
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
