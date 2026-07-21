import type { Metadata } from "next";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────

const SITE_URL = "https://backgroundremover.app";
const SITE_NAME = "Background Remover";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Background Remover — learn how we handle your images and data. No images stored, GDPR & CCPA compliant, privacy-first AI tool.",
  keywords: [
    "privacy policy",
    "background remover privacy",
    "GDPR compliance",
    "CCPA compliance",
    "image privacy",
    "data protection",
    "background removal privacy",
    "AI tool privacy",
    "no image storage",
    "privacy-first",
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
  openGraph: {
    title: "Privacy Policy | Background Remover",
    description:
      "Privacy Policy for Background Remover — learn how we handle your images and data. No images stored, GDPR & CCPA compliant, privacy-first AI tool.",
    url: `${SITE_URL}/privacy`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy — Background Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Background Remover",
    description:
      "Privacy Policy for Background Remover — learn how we handle your images and data. No images stored, GDPR & CCPA compliant, privacy-first AI tool.",
    images: ["/og-image.png"],
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: `${SITE_URL}/privacy`,
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — Background Remover",
  description: "Privacy Policy for Background Remover AI tool",
  url: `${SITE_URL}/privacy`,
  dateModified: "2026-03-04",
  isPartOf: {
    "@type": "WebSite",
    name: "Background Remover",
    url: SITE_URL,
  },
};

// ─── Page Component ───────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Skip to content */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg">
          Skip to main content
        </a>

        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted-foreground/50">
                /
              </li>
              <li className="text-foreground font-medium" aria-current="page">
                Privacy Policy
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            Last updated: March 4, 2026
          </p>

          {/* Sections */}
          <div className="space-y-12 text-[15px] leading-7 text-foreground/90">
            {/* ─── 1. Introduction ─────────────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>Background Remover</strong>{" "}
                (<Link
                  href="https://backgroundremover.app"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  https://backgroundremover.app
                </Link>
                ). We are committed to protecting your privacy and ensuring that
                your personal data — and especially your images — are handled
                with the utmost care and respect. This Privacy Policy describes
                how we collect, use, process, and safeguard information when you
                use our free AI background removal tool and related services
                (collectively, the &ldquo;Service&rdquo;).
              </p>
              <p className="mt-4">
                By accessing or using our Service, you agree to the practices
                described in this Privacy Policy. If you do not agree with the
                terms of this policy, please do not use our Service. This policy
                applies to all visitors, users, and others who access or use the
                Service.
              </p>
              <p className="mt-4">
                <strong>Key promise:</strong> We do not store, retain, cache, or
                share your uploaded images. Your images are processed in
                real-time, and all temporary data is immediately deleted after
                processing is complete. This is the cornerstone of our
                privacy-first approach.
              </p>
            </section>

            {/* ─── 1b. Data Controller ──────────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                Data Controller
              </h2>
              <p>
                For the purposes of the General Data Protection Regulation (GDPR),
                the data controller responsible for your personal data is
                Background Remover, contactable at{" "}
                <a
                  href="mailto:privacy@backgroundremover.app"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  privacy@backgroundremover.app
                </a>
                . We act as both the data controller and data processor for the
                limited data described in this policy.
              </p>
            </section>

            {/* ─── 2. Information We Collect ───────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                2. Information We Collect
              </h2>
              <p>
                We collect only the minimum information necessary to provide our
                Service and maintain its security and reliability. Below is a
                detailed breakdown of the types of information we may collect:
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                2.1 Images You Upload
              </h3>
              <p>
                When you use our Service to remove an image background, you
                upload an image file (PNG, JPG, or WebP). These images are
                transmitted to our servers for the sole purpose of background
                removal processing. Images are held in temporary server memory
                during processing and are <strong>never</strong> written to
                persistent storage, cached, or retained on any server in any
                form. Once processing is complete and the result has been
                delivered to your browser, all temporary data associated with
                your image is immediately and permanently deleted. For more
                details, see Section 4 (Image Processing &amp; Data Handling).
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                2.2 Technical Data (Automatically Collected)
              </h3>
              <p>
                When you access our Service, our servers may automatically
                collect certain technical information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>IP address</strong> — used for server security, rate
                  limiting, and abuse prevention
                </li>
                <li>
                  <strong>Browser type and version</strong> — e.g., Chrome 120,
                  Safari 17, Firefox 121
                </li>
                <li>
                  <strong>Operating system</strong> — e.g., Windows 11, macOS
                  14, iOS 17
                </li>
                <li>
                  <strong>Device type</strong> — e.g., desktop, mobile, tablet
                </li>
                <li>
                  <strong>Screen resolution</strong> — to optimize layout
                  rendering
                </li>
                <li>
                  <strong>Referring URL</strong> — the website that linked you
                  to our Service
                </li>
                <li>
                  <strong>Request headers</strong> — standard HTTP headers sent
                  by your browser
                </li>
              </ul>
              <p className="mt-3">
                This technical data is collected automatically as a necessary
                part of serving web pages and is used solely to maintain the
                security, stability, and performance of our Service. It is not
                used to identify or profile individual users.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                2.3 Usage Data
              </h3>
              <p>
                We may collect aggregate, non-personally-identifiable usage data
                to improve our Service, including:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  Pages and features visited or used on our Service
                </li>
                <li>
                  The number of images processed (aggregate counts only)
                </li>
                <li>
                  Timestamps of visits and processing requests
                </li>
                <li>
                  Error reports and processing failure rates (for debugging)
                </li>
                <li>
                  General geographic region (country-level, derived from IP)
                </li>
              </ul>
              <p className="mt-3">
                Usage data is collected at an aggregate level and cannot be used
                to identify any individual user. We do not track individual user
                behavior across sessions or build user profiles.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                2.4 Cookie Data
              </h3>
              <p>
                We use a minimal number of cookies. Specifically, we use a
                single essential cookie to store your cookie consent preference
                (i.e., whether you have acknowledged our cookie notice). No
                other cookies are set by our Service. For full details, see
                Section 6 (Cookies and Tracking Technologies).
              </p>
            </section>

            {/* ─── 3. How We Use Your Information ──────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>To provide the Service:</strong> Processing your
                  uploaded images to remove their backgrounds and delivering the
                  results to you. This is the primary and sole purpose for which
                  your images are processed.
                </li>
                <li>
                  <strong>To maintain and operate the Service:</strong> Ensuring
                  the Service functions correctly, including load balancing,
                  rate limiting to prevent abuse, and maintaining server
                  stability.
                </li>
                <li>
                  <strong>To protect the Service:</strong> Detecting and
                  preventing security threats, abuse, spam, or malicious
                  activity. IP addresses are used for rate limiting and abuse
                  prevention.
                </li>
                <li>
                  <strong>To improve the Service:</strong> Analyzing aggregate
                  usage patterns and error rates to enhance performance,
                  reliability, and user experience. No individual-level analysis
                  is performed.
                </li>
                <li>
                  <strong>To comply with legal obligations:</strong> Responding
                  to lawful requests from public authorities, court orders, or
                  as required by applicable law.
                </li>
                <li>
                  <strong>To remember your preferences:</strong> Storing your
                  cookie consent preference so we do not repeatedly prompt you
                  with cookie notices.
                </li>
              </ul>
              <p className="mt-4">
                We do <strong>not</strong> use your information for:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>Marketing, advertising, or promotional purposes</li>
                <li>Building user profiles or behavioral tracking</li>
                <li>Training, improving, or developing AI models</li>
                <li>Selling, renting, or trading personal data</li>
                <li>Any purpose beyond those explicitly stated above</li>
              </ul>
            </section>

            {/* ─── 4. Image Processing & Data Handling ─────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                4. Image Processing &amp; Data Handling
              </h2>
              <p>
                We understand that the images you upload may be personal,
                sensitive, or commercially valuable. We have designed our
                Service with a privacy-first architecture that ensures your
                images are handled with the highest level of care. Here is
                exactly what happens when you upload an image:
              </p>

              <div className="mt-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
                  How Image Processing Works
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-sm leading-6">
                  <li>
                    <strong>Upload:</strong> Your image is transmitted from your
                    browser to our server over an encrypted HTTPS connection.
                  </li>
                  <li>
                    <strong>Temporary Processing:</strong> The image is loaded
                    into temporary server memory (RAM) for AI background removal
                    processing. A temporary file may be created on the server&apos;s
                    ephemeral storage during processing.
                  </li>
                  <li>
                    <strong>Immediate Deletion:</strong> As soon as the
                    background removal is complete and the result has been
                    encoded and sent to your browser, the temporary file is{" "}
                    <strong>immediately and permanently deleted</strong> from the
                    server. This deletion occurs within the same request cycle —
                    typically within seconds.
                  </li>
                  <li>
                    <strong>Delivery:</strong> The processed image (with
                    background removed) is sent directly to your browser via
                    base64 encoding. The result exists only in your browser&apos;s
                    memory and is never stored on our servers.
                  </li>
                </ol>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Our Binding Commitments Regarding Your Images
              </h3>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>No images are stored, cached, or retained</strong> on
                  any server, database, CDN, or backup system. Once processing
                  is complete and the result delivered, all image data is
                  permanently deleted.
                </li>
                <li>
                  <strong>No images are used for training AI models.</strong>{" "}
                  Our background removal AI model is pre-trained and
                  production-ready. Your images are never used as training data,
                  fine-tuning data, or evaluation data for any AI system.
                </li>
                <li>
                  <strong>No images are shared with any third party.</strong>{" "}
                  Your images are processed entirely within our infrastructure
                  and are never transmitted to, shared with, or made accessible
                  to any third party for any purpose.
                </li>
                <li>
                  <strong>No human ever views your images.</strong> Image
                  processing is fully automated. No employee, contractor, or
                  agent of Background Remover ever views, accesses, or inspects
                  your uploaded images.
                </li>
                <li>
                  <strong>No logging of image content.</strong> Server logs may
                  record that a processing request occurred (timestamp, IP
                  address, file size), but the content of the image itself is
                  never logged, recorded, or stored in any form.
                </li>
              </ul>

              <div className="mt-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Important:</strong> Because we do not store your
                  images, we cannot recover or retrieve them after processing.
                  If you close your browser before downloading the result, the
                  processed image cannot be recovered. We recommend downloading
                  your results immediately after processing.
                </p>
              </div>
            </section>

            {/* ─── 5. Data Retention ───────────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                5. Data Retention
              </h2>
              <p>
                Our data retention practices reflect our commitment to data
                minimization and privacy:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>Uploaded images:</strong> Deleted immediately after
                  processing (0 seconds retention). Images are held only in
                  temporary memory during processing and are immediately deleted
                  after the processed result is delivered to your browser. No
                  images are stored on any persistent storage medium.
                </li>
                <li>
                  <strong>Server access logs:</strong> Retained for 30 days, then
                  automatically purged. Standard server access logs (containing IP
                  addresses, request timestamps, browser user agents, and HTTP
                  status codes) are retained for security monitoring and abuse
                  prevention, after which they are automatically deleted.
                </li>
                <li>
                  <strong>Cookie consent preference:</strong> Retained for 1 year
                  from the date of consent. The cookie storing your consent
                  preference is retained on your browser for up to 1 year, after
                  which it expires and you will be asked to re-consent.
                </li>
                <li>
                  <strong>No other data is retained.</strong> We do not retain any
                  other personal data beyond what is described above. Temporary
                  files created during image processing are deleted immediately
                  upon completion of the processing request, within the same
                  server response cycle.
                </li>
              </ul>
            </section>

            {/* ─── 6. Cookies and Tracking Technologies ────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                6. Cookies and Tracking Technologies
              </h2>
              <p>
                A cookie is a small text file stored on your device by your web
                browser. We use cookies only to the extent necessary for the
                basic functioning of our Service. We are committed to minimal
                cookie usage and full transparency about what cookies we set and
                why.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Cookies We Use
              </h3>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold">
                        Cookie Name
                      </th>
                      <th className="text-left py-3 pr-4 font-semibold">
                        Purpose
                      </th>
                      <th className="text-left py-3 pr-4 font-semibold">
                        Duration
                      </th>
                      <th className="text-left py-3 font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4 font-mono text-xs">
                        cookie_consent
                      </td>
                      <td className="py-3 pr-4">
                        Stores your cookie consent preference (whether you have
                        acknowledged our cookie notice)
                      </td>
                      <td className="py-3 pr-4">1 year</td>
                      <td className="py-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:text-emerald-200">
                          Essential
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                What We Do NOT Use
              </h3>
              <p>
                We want to be explicit about the tracking technologies we do{" "}
                <strong>not</strong> use, as we believe this is just as
                important as disclosing what we do use:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>No analytics cookies</strong> — We do not use Google
                  Analytics, Matomo, or any other web analytics platform that
                  sets tracking cookies.
                </li>
                <li>
                  <strong>No advertising cookies</strong> — We do not display
                  advertisements and do not set any advertising-related cookies
                  or tracking identifiers.
                </li>
                <li>
                  <strong>No tracking pixels or beacons</strong> — We do not
                  embed tracking pixels, web beacons, clear GIFs, or any
                  similar technology in our emails or web pages.
                </li>
                <li>
                  <strong>No third-party cookies</strong> — No cookies are set
                  on our website by any third-party service.
                </li>
                <li>
                  <strong>No browser fingerprinting</strong> — We do not
                  collect or analyze device fingerprints or browser
                  characteristics for tracking purposes.
                </li>
                <li>
                  <strong>No local storage tracking</strong> — We do not use
                  HTML5 local storage, session storage, or IndexedDB for
                  tracking or identification purposes.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Managing Cookies
              </h3>
              <p>
                You can control and manage cookies through your browser settings.
                Most browsers allow you to refuse or delete cookies. However,
                please note that refusing the essential cookie_consent cookie may
                result in repeated cookie consent prompts. For information on how
                to manage cookies in your specific browser, please consult your
                browser&apos;s help documentation.
              </p>
            </section>

            {/* ─── 7. Third-Party Services ─────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                7. Third-Party Services
              </h2>
              <p>
                While we process your images entirely within our own
                infrastructure, we do rely on certain third-party services to
                deliver and maintain our Service. These services have access to
                only the technical data necessary to perform their functions and
                are contractually obligated to handle such data in compliance
                with applicable privacy laws:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>AI Processing Library:</strong> We use rembg, an
                  open-source AI library based on the U2-Net deep learning model,
                  to perform background removal. This model runs entirely on our
                  own servers and does not transmit your images to any external AI
                  service or API. The AI model is pre-trained and your images are
                  never used for training, fine-tuning, or evaluation.
                </li>
                <li>
                  <strong>Cloud Hosting Provider:</strong> Our Service is hosted
                  on a cloud infrastructure provider that processes requests on
                  our behalf. The hosting provider may have access to server
                  logs containing IP addresses and request metadata for security
                  and operational purposes. They do not have access to the
                  content of your uploaded images.
                </li>
                <li>
                  <strong>Content Delivery Network (CDN):</strong> We use a CDN
                  to deliver static assets (HTML, CSS, JavaScript, images)
                  efficiently to users worldwide. The CDN may collect technical
                  data (IP addresses, request data) for performance optimization
                  and security. The CDN does not process, store, or have access
                  to your uploaded images.
                </li>
              </ul>
              <p className="mt-4">
                We do not use any third-party analytics services, advertising
                networks, social media plugins, chat widgets, or other third-party
                tracking tools that would collect data from our visitors.
              </p>
            </section>

            {/* ─── 8. Data Sharing ─────────────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                8. Data Sharing
              </h2>
              <p>
                We do <strong>not</strong> share your personal data or uploaded
                images with any third parties, except in the following limited
                circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>Service Providers:</strong> As described in Section 7,
                  we share certain technical data with our hosting provider and
                  CDN solely for the purpose of delivering the Service. These
                  providers are contractually bound to protect your data and may
                  only use it as instructed by us.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose
                  information if required to do so by law, in response to a
                  valid legal process (such as a court order, subpoena, or
                  government request), or to establish, exercise, or defend
                  legal claims. However, because we do not store your images or
                  collect personally identifiable information beyond technical
                  data, our ability to disclose such data is inherently limited.
                </li>
                <li>
                  <strong>Protection of Rights:</strong> We may disclose
                  information to protect the rights, property, or safety of
                  Background Remover, our users, or the public, including
                  investigating fraud, security threats, or violations of our
                  terms of service.
                </li>
              </ul>

              <div className="mt-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  <strong>We do not sell your data.</strong> We have never sold,
                  and will never sell, personal data, image data, or any other
                  information to any third party for any purpose, including
                  advertising or marketing. This is an absolute commitment.
                </p>
              </div>
            </section>

            {/* ─── 9. Data Security ────────────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                9. Data Security
              </h2>
              <p>
                We implement robust technical and organizational measures to
                protect your data and ensure the security of our Service:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>HTTPS/TLS Encryption:</strong> All communication
                  between your browser and our servers is encrypted using
                  industry-standard TLS (Transport Layer Security). This ensures
                  that your uploaded images and all data in transit are
                  protected from interception or tampering.
                </li>
                <li>
                  <strong>Secure Processing:</strong> Image processing occurs on
                  isolated, ephemeral server instances that are automatically
                  provisioned and terminated for each processing session. This
                  ensures that no data persists between requests.
                </li>
                <li>
                  <strong>Rate Limiting:</strong> We implement rate limiting to
                  prevent abuse, protect against denial-of-service attacks, and
                  ensure fair access for all users.
                </li>
                <li>
                  <strong>Access Controls:</strong> Access to our infrastructure
                  is restricted to authorized personnel using multi-factor
                  authentication and the principle of least privilege. No
                  personnel have access to user image data.
                </li>
                <li>
                  <strong>Automatic Data Purging:</strong> As described in
                  Section 4, all temporary image data is automatically deleted
                  after processing. Server logs are automatically purged after
                  30 days.
                </li>
                <li>
                  <strong>Regular Security Reviews:</strong> We periodically
                  review our security practices and infrastructure to identify
                  and address potential vulnerabilities.
                </li>
              </ul>
              <p className="mt-4">
                While we strive to use commercially acceptable means to protect
                your data, no method of transmission over the Internet or
                electronic storage is 100% secure. Therefore, we cannot
                guarantee absolute security. However, our zero-retention policy
                for images significantly minimizes the potential impact of any
                security incident, as there is simply no image data to
                compromise.
              </p>
            </section>

            {/* ─── 9b. Data Breach Notification ──────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                Data Breach Notification
              </h2>
              <p>
                In the event of a personal data breach that is likely to result
                in a risk to your rights and freedoms, we will comply with our
                obligations under GDPR Articles 33 and 34:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>Supervisory Authority Notification (Article 33):</strong>{" "}
                  We will notify the relevant supervisory authority within 72
                  hours of becoming aware of a breach that is likely to result
                  in a risk to the rights and freedoms of individuals, unless
                  the breach is unlikely to result in such a risk.
                </li>
                <li>
                  <strong>Individual Notification (Article 34):</strong>{" "}
                  If a breach is likely to result in a <em>high risk</em> to
                  your rights and freedoms, we will also communicate the breach
                  to you directly without undue delay, along with clear
                  information about what happened, what data was affected, and
                  what steps you can take to protect yourself.
                </li>
                <li>
                  <strong>Our Mitigating Factor:</strong> Because we do not
                  store your images and collect only minimal technical data (IP
                  addresses, browser type) that is automatically purged after 30
                  days, the potential impact of any data breach is significantly
                  limited. No image data can be compromised in a breach because
                  no image data is retained.
                </li>
              </ul>
              <p className="mt-4">
                If you believe a data breach has occurred that affects you,
                please contact us immediately at{" "}
                <a
                  href="mailto:privacy@backgroundremover.app"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  privacy@backgroundremover.app
                </a>
                .
              </p>
            </section>

            {/* ─── 10. Your Rights Under GDPR ──────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                10. Your Rights Under GDPR (EU/EEA Residents)
              </h2>
              <p>
                If you are a resident of the European Union or the European
                Economic Area (EU/EEA), you have certain data protection rights
                under the General Data Protection Regulation (GDPR). We are
                committed to facilitating these rights:
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right of Access (Article 15)
              </h3>
              <p>
                You have the right to obtain confirmation as to whether or not
                personal data concerning you is being processed, and if so,
                access to that personal data along with information about the
                purposes of processing, the categories of data concerned, and
                the recipients to whom the data has been disclosed.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Rectification (Article 16)
              </h3>
              <p>
                You have the right to request the correction of inaccurate
                personal data concerning you. Taking into account the purposes
                of processing, you also have the right to have incomplete
                personal data completed.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Erasure (Article 17)
              </h3>
              <p>
                You have the right to request the deletion of personal data
                concerning you. We will comply with such requests subject to
                certain exceptions, such as where we are required to retain data
                for legal compliance or for the establishment, exercise, or
                defense of legal claims. Note: Because we do not store your
                images, there is no image data to erase upon request. Technical
                data in server logs is automatically purged after 30 days.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Restriction of Processing (Article 18)
              </h3>
              <p>
                You have the right to request the restriction of processing of
                your personal data in certain circumstances, such as when you
                contest the accuracy of the data, when processing is unlawful
                but you prefer restriction over erasure, or when we no longer
                need the data but you require it for legal claims.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Data Portability (Article 20)
              </h3>
              <p>
                You have the right to receive your personal data in a
                structured, commonly used, and machine-readable format, and the
                right to transmit that data to another controller without
                hindrance. Given the minimal personal data we collect, this
                right primarily applies to any technical data we may hold about
                you.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Object (Article 21)
              </h3>
              <p>
                You have the right to object to the processing of your personal
                data based on legitimate interests. We will cease processing
                unless we have compelling legitimate grounds for processing that
                override your interests, rights, and freedoms, or for the
                establishment, exercise, or defense of legal claims.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right Not to Be Subject to Automated Decision-Making (Article 22)
              </h3>
              <p>
                You have the right not to be subject to a decision based solely
                on automated processing, including profiling, which produces
                legal effects concerning you or similarly significantly affects
                you. Our background removal processing does not produce legal
                or similarly significant effects concerning you.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Notification (Article 19)
              </h3>
              <p>
                When we rectify, erase, or restrict the processing of your
                personal data, we are obligated to notify each recipient of that
                data of the change. Given that we do not share your data with any
                third parties, this obligation is automatically fulfilled as there
                are no recipients to notify.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Lodge a Complaint
              </h3>
              <p>
                You have the right to lodge a complaint with a supervisory
                authority in the EU/EEA member state of your habitual residence,
                place of work, or place of the alleged infringement if you
                consider that the processing of your personal data infringes the
                GDPR. A list of EU/EEA data protection authorities is available
                at{" "}
                <a
                  href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_en"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the European Data Protection Board website
                </a>
                .
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Lawful Basis for Processing (Article 6)
              </h3>
              <p>
                Our processing of your personal data is lawful under the
                following GDPR legal bases:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>Performance of a Contract (Article 6(1)(b)):</strong>{" "}
                  Processing your uploaded images is necessary to perform the
                  background removal service you have requested.
                </li>
                <li>
                  <strong>Legitimate Interests (Article 6(1)(f)):</strong>{" "}
                  Collecting technical data (IP address, browser type) for
                  security, abuse prevention, and service maintenance represents
                  a legitimate interest that does not override your rights and
                  freedoms.
                </li>
                <li>
                  <strong>Consent (Article 6(1)(a)):</strong> Setting the cookie
                  consent preference cookie is based on your consent, which you
                  may withdraw at any time.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Lawful Basis Mapping
              </h3>
              <p>
                Below is an explicit mapping of each processing activity to its
                lawful basis under GDPR Article 6(1):
              </p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold">
                        Processing Activity
                      </th>
                      <th className="text-left py-3 pr-4 font-semibold">
                        Lawful Basis
                      </th>
                      <th className="text-left py-3 font-semibold">
                        Justification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">
                        Image processing (background removal)
                      </td>
                      <td className="py-3 pr-4">
                        Performance of a contract (Article 6(1)(b))
                      </td>
                      <td className="py-3">
                        Processing is necessary to perform the background
                        removal service you have requested
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">
                        Technical data (IP, browser)
                      </td>
                      <td className="py-3 pr-4">
                        Legitimate interest (Article 6(1)(f))
                      </td>
                      <td className="py-3">
                        Necessary for security and service stability
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">
                        Cookie consent
                      </td>
                      <td className="py-3 pr-4">
                        Consent (Article 6(1)(a))
                      </td>
                      <td className="py-3">
                        Stored only after you provide consent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Data Protection Officer
              </h3>
              <p>
                We have not appointed a Data Protection Officer (DPO) as we are
                not required to do so under GDPR Article 37, given the nature and
                scale of our data processing. If you have any data protection
                concerns, please contact us at{" "}
                <a
                  href="mailto:privacy@backgroundremover.app"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  privacy@backgroundremover.app
                </a>
                .
              </p>
            </section>

            {/* ─── 11. Your Rights Under CCPA ──────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                11. Your Rights Under CCPA (California Residents)
              </h2>
              <p>
                The California Consumer Privacy Act (CCPA) grants California
                residents specific rights regarding their personal information.
                This section applies to all individuals who are California
                residents as defined under the CCPA.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Know
              </h3>
              <p>
                You have the right to request, up to twice per year, that we
                disclose to you the following information about the personal
                information we have collected about you in the preceding 12
                months:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>The categories of personal information collected</li>
                <li>
                  The categories of sources from which the personal information
                  was collected
                </li>
                <li>
                  The business or commercial purpose for collecting the personal
                  information
                </li>
                <li>
                  The categories of third parties with whom we share personal
                  information
                </li>
                <li>
                  The specific pieces of personal information we have collected
                  about you
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Delete
              </h3>
              <p>
                You have the right to request that we delete any personal
                information about you that we have collected. We will comply with
                your request, subject to certain exceptions under the CCPA, such
                as when the data is necessary to complete a transaction, detect
                security incidents, or comply with legal obligations. As noted
                throughout this policy, we do not retain your uploaded images,
                and technical data in server logs is automatically purged after
                30 days.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Opt-Out of Sale
              </h3>
              <p>
                You have the right to opt-out of the sale of your personal
                information. We do <strong>not</strong> sell personal information
                and have never sold personal information. Because we do not sell
                personal information, there is no opt-out to exercise. We do not
                include a &ldquo;Do Not Sell My Personal Information&rdquo; link
                on our website because this right is inapplicable to our
                practices.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Right to Non-Discrimination
              </h3>
              <p>
                You have the right not to receive discriminatory treatment for
                exercising any of your CCPA rights. We will not discriminate
                against you for exercising your rights, including by denying or
                providing a different level or quality of service, charging
                different prices, or suggesting that you will receive
                discriminatory treatment.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                CCPA Information Categories
              </h3>
              <p>
                For the purposes of the CCPA, the categories of personal
                information we have collected in the preceding 12 months are:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>Category A: Identifiers</strong> — IP address (collected
                  automatically)
                </li>
                <li>
                  <strong>Category B: Customer Records Information</strong> —
                  None collected
                </li>
                <li>
                  <strong>Category C: Protected Classification Information</strong>{" "}
                  — None collected
                </li>
                <li>
                  <strong>Category D: Commercial Information</strong> — None
                  collected
                </li>
                <li>
                  <strong>Category E: Biometric Information</strong> — None
                  collected (images are processed temporarily and immediately
                  deleted; they are not analyzed for biometric data)
                </li>
                <li>
                  <strong>Category F: Internet or Other Electronic Network
                  Activity Information</strong> — Browser type, pages visited,
                  timestamps (collected automatically)
                </li>
                <li>
                  <strong>Category G: Geolocation Data</strong> — Country-level
                  location inferred from IP address (not precise geolocation)
                </li>
                <li>
                  <strong>Category H: Sensory Data</strong> — Uploaded images
                  (processed temporarily and immediately deleted; not retained)
                </li>
                <li>
                  <strong>Category I: Professional or Employment Information</strong>{" "}
                  — None collected
                </li>
                <li>
                  <strong>Category J: Inferences</strong> — None drawn
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Exercising Your CCPA Rights
              </h3>
              <p>
                To exercise any of your CCPA rights, please contact us at{" "}
                <a
                  href="mailto:privacy@backgroundremover.app"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  privacy@backgroundremover.app
                </a>
                . We will respond to your request within 45 days, as required by
                the CCPA. We may extend this period by an additional 45 days
                when necessary, with notice to you. We will verify your identity
                before processing your request.
              </p>
            </section>

            {/* ─── 12. Your Rights Under CalOPPA ────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                12. Your Rights Under CalOPPA (California Online Privacy
                Protection Act)
              </h2>
              <p>
                Under the California Online Privacy Protection Act (CalOPPA), we
                are required to provide the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>Privacy Policy:</strong> This Privacy Policy
                  constitutes our &ldquo;online privacy policy&rdquo; as
                  required by CalOPPA.
                </li>
                <li>
                  <strong>Personally Identifiable Information Collected:</strong>{" "}
                  As described in Section 2, we collect IP addresses,
                  browser/device technical data, and temporarily process uploaded
                  images.
                </li>
                <li>
                  <strong>Third Parties:</strong> As described in Section 7, we
                  share certain technical data with our hosting provider and
                  CDN.
                </li>
                <li>
                  <strong>Response to Do Not Track Signals:</strong> See Section
                  16 for our response to Do Not Track signals.
                </li>
                <li>
                  <strong>Policy Changes:</strong> See Section 17 for how we
                  notify users of changes to this policy.
                </li>
              </ul>
              <p className="mt-4">
                CalOPPA further grants you the right to request that we remove
                your personally identifiable information from our systems. You
                may exercise this right by contacting us at{" "}
                <a
                  href="mailto:privacy@backgroundremover.app"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  privacy@backgroundremover.app
                </a>
                .
              </p>
            </section>

            {/* ─── 13. Your Rights Under PIPEDA ─────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                13. Your Rights Under PIPEDA (Canadian Residents)
              </h2>
              <p>
                If you are a resident of Canada, the Personal Information
                Protection and Electronic Documents Act (PIPEDA) grants you
                certain rights regarding the collection, use, and disclosure of
                your personal information. Under PIPEDA, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  <strong>Right of Access:</strong> You have the right to
                  request access to your personal information held by us, and to
                  obtain information about how it has been used and disclosed.
                </li>
                <li>
                  <strong>Right to Correction:</strong> You have the right to
                  request the correction of inaccurate or incomplete personal
                  information.
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> You may withdraw
                  your consent for the collection, use, or disclosure of your
                  personal information, subject to legal and contractual
                  restrictions. Withdrawing consent may affect your ability to
                  use the Service.
                </li>
                <li>
                  <strong>Right to Complain:</strong> You have the right to file
                  a complaint with the Office of the Privacy Commissioner of
                  Canada if you believe your personal information has been
                  mishandled. For more information, visit{" "}
                  <a
                    href="https://www.priv.gc.ca"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    priv.gc.ca
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-4">
                Under PIPEDA, we are required to identify the purposes for which
                personal information is collected at or before the time of
                collection. This Privacy Policy fulfills that requirement. Our
                purposes are described in Section 3. We collect only the
                information that is necessary for the identified purposes and
                do not collect information beyond what is needed.
              </p>
            </section>

            {/* ─── 14. Children's Privacy ──────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                14. Children&apos;s Privacy
              </h2>
              <p>
                Our Service is not directed at children under the age of 13, and
                we do not knowingly collect personal information from children
                under 13. In compliance with the Children&apos;s Online Privacy
                Protection Act (COPPA), we do not:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  Collect personal information from children under 13
                </li>
                <li>
                  Allow children under 13 to create accounts or profiles
                </li>
                <li>
                  Use tracking technologies specifically targeted at children
                </li>
                <li>
                  Display content or advertising specifically targeted at
                  children
                </li>
              </ul>
              <p className="mt-4">
                If you are a parent or guardian and become aware that your child
                under 13 has used our Service and provided personal information,
                please contact us immediately at{" "}
                <a
                  href="mailto:privacy@backgroundremover.app"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  privacy@backgroundremover.app
                </a>
                . We will take prompt steps to delete any such information from
                our systems.
              </p>
              <p className="mt-4">
                For children aged 13-16, parental consent may be required under
                certain state laws (such as the California Age-Appropriate Design
                Code Act). We encourage parents and guardians to monitor their
                children&apos;s online activities and to contact us with any
                concerns.
              </p>
            </section>

            {/* ─── 15. International Data Transfers ─────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                15. International Data Transfers
              </h2>
              <p>
                Our Service is operated from servers that may be located outside
                of your country of residence. When you use our Service, your
                data (including uploaded images and technical data) may be
                transferred to and processed on servers in a different
                jurisdiction.
              </p>
              <p className="mt-4">
                For EU/EEA residents: Our hosting provider and CDN may process
                data in the United States or other countries. We ensure
                appropriate safeguards are in place for such transfers,
                including:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  Standard Contractual Clauses (SCCs) as approved by the
                  European Commission, where applicable
                </li>
                <li>
                  Data Processing Agreements (DPAs) with all third-party
                  service providers that process data on our behalf
                </li>
                <li>
                  The zero-retention policy for images, which means no image
                  data is stored on any server for any period beyond immediate
                  processing
                </li>
              </ul>
              <p className="mt-4">
                Because we do not store your images or collect significant
                personally identifiable information, the risk associated with
                international data transfers is inherently minimized. Technical
                data in server logs (IP addresses, timestamps) may be subject
                to transfer but is automatically purged within 30 days.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                EU Adequacy Decisions
              </h3>
              <p>
                The European Commission has granted adequacy decisions to certain
                countries and territories, meaning data transfers to these
                jurisdictions are considered to provide an adequate level of data
                protection. Where your data may be processed in a country without
                an adequacy decision, we rely on Standard Contractual Clauses
                (SCCs) approved by the European Commission to ensure adequate
                protection. Given our zero-retention policy for images, the risk
                of cross-border data transfers is minimal, as no personal data in
                the form of images is retained beyond the processing period.
              </p>
            </section>

            {/* ─── 16. Do Not Track Signals ─────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                16. Do Not Track Signals
              </h2>
              <p>
                Some web browsers incorporate a &ldquo;Do Not Track&rdquo; (DNT)
                feature that signals to websites that you do not wish to be
                tracked. Because there is currently no industry standard for how
                websites should respond to DNT signals, and because the
                definition of &ldquo;tracking&rdquo; under DNT remains
                ambiguous, our response to DNT signals is as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  We do <strong>not track users</strong> regardless of whether
                  DNT is enabled. Our privacy practices are consistent across
                  all users — we do not engage in behavioral tracking, user
                  profiling, or targeted advertising.
                </li>
                <li>
                  Our processing of technical data (IP addresses, browser
                  information) is limited to what is necessary for security,
                  abuse prevention, and service delivery, which falls outside
                  the scope of &ldquo;tracking&rdquo; as commonly understood.
                </li>
                <li>
                  Because we do not use analytics cookies, advertising cookies,
                  tracking pixels, or any other tracking technologies, enabling
                  DNT in your browser will not change your experience on our
                  Service — your privacy is already protected to the maximum
                  extent.
                </li>
              </ul>
            </section>

            {/* ─── 17. Changes to This Policy ──────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                17. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technologies, legal requirements, or
                other factors. When we make changes, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2">
                <li>
                  Update the &ldquo;Last updated&rdquo; date at the top of this
                  page to reflect the date of the most recent revision
                </li>
                <li>
                  Post the updated Privacy Policy on this page with a clear
                  indication of what has changed
                </li>
                <li>
                  For material changes that affect how we handle your data, we
                  will provide additional notice through a prominent notice on
                  our website homepage for a reasonable period before the
                  changes take effect
                </li>
              </ul>
              <p className="mt-4">
                We encourage you to review this Privacy Policy periodically to
                stay informed about how we protect your information. Your
                continued use of the Service after any changes to this policy
                constitutes your acceptance of the updated policy.
              </p>
              <p className="mt-4">
                In the event of a material change that significantly reduces
                your privacy protections, we will make reasonable efforts to
                obtain your affirmative consent before implementing the change.
              </p>
            </section>

            {/* ─── 18. Contact Information ─────────────────────── */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-700 mb-4 scroll-mt-20">
                18. Contact Information
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 bg-muted/50 border border-border rounded-lg p-5 sm:p-6">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-foreground">
                      Service:
                    </span>{" "}
                    Background Remover
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">
                      Website:
                    </span>{" "}
                    <Link
                      href="https://backgroundremover.app"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                    >
                      https://backgroundremover.app
                    </Link>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">
                      Privacy Email:
                    </span>{" "}
                    <a
                      href="mailto:privacy@backgroundremover.app"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                    >
                      privacy@backgroundremover.app
                    </a>
                  </div>
                </div>
              </div>
              <p className="mt-4">
                We will acknowledge receipt of your privacy-related inquiry
                within 5 business days and provide a substantive response within
                30 days, or within the timeframe required by applicable law
                (45 days under CCPA, as described in Section 11). If we require
                additional time to respond, we will inform you of the reason for
                the delay and the expected response date.
              </p>
              <p className="mt-4">
                When submitting a request, please include sufficient information
                to verify your identity (such as the IP address used at the time
                of your visit and the approximate date of access) so that we can
                locate the relevant data in our systems.
              </p>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Background Remover
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 mt-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
              <span aria-hidden="true">·</span>
              <Link href="/cookies" className="hover:text-emerald-600 transition-colors">Cookie Policy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/dmca" className="hover:text-emerald-600 transition-colors">DMCA</Link>
            </nav>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Background Remover. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
