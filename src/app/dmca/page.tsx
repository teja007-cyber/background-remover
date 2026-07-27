import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Scale,
  Ban,
  Info,
} from "lucide-react";

// ─── SEO Metadata ──────────────────────────────────────────────────

const SITE_URL = "https://backgroundremover.app";

export const metadata: Metadata = {
  title: "DMCA / Copyright Policy",
  description:
    "DMCA and copyright policy for Background Remover. Learn how to report copyright infringement or file a counter-notification.",
  keywords: [
    "DMCA policy",
    "copyright policy",
    "background remover DMCA",
    "takedown notice",
    "counter-notification",
    "copyright infringement",
    "DMCA compliance",
  ],
  authors: [{ name: "Background Remover", url: SITE_URL }],
  creator: "Background Remover",
  publisher: "Background Remover",
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
  alternates: {
    canonical: `${SITE_URL}/dmca`,
  },
  openGraph: {
    title: "DMCA / Copyright Policy | Background Remover",
    description:
      "DMCA and copyright policy for Background Remover. Learn how to report copyright infringement or file a counter-notification.",
    url: `${SITE_URL}/dmca`,
    siteName: "Background Remover",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DMCA / Copyright Policy — Background Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DMCA / Copyright Policy | Background Remover",
    description:
      "DMCA and copyright policy for Background Remover. Learn how to report copyright infringement or file a counter-notification.",
    images: ["/og-image.png"],
  },
};

// ─── BreadcrumbList JSON-LD ────────────────────────────────────────

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
      name: "DMCA Policy",
      item: `${SITE_URL}/dmca`,
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "DMCA / Copyright Policy — Background Remover",
  description: "DMCA and copyright policy for Background Remover. Report copyright infringement or file a counter-notification.",
  url: `${SITE_URL}/dmca`,
  dateModified: "2026-03-04",
  isPartOf: {
    "@type": "WebSite",
    name: "Background Remover",
    url: SITE_URL,
  },
};

// ─── Page Component ────────────────────────────────────────────────

export default function DMCAPage() {
  const lastUpdated = "March 4, 2026";

  return (
    <>
      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {/* WebPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <div className="min-h-screen flex flex-col bg-background">
        {/* ─── Header / Back Navigation ──────────────────────────── */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors group"
              aria-label="Back to home page"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* ─── Main Content ──────────────────────────────────────── */}
        <main id="main-content" className="flex-1">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* ── Breadcrumb Navigation ──────────────────────────── */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5">
                <li className="inline-flex items-center gap-1.5">
                  <Link
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li
                  role="presentation"
                  aria-hidden="true"
                  className="text-muted-foreground/50"
                >
                  /
                </li>
                <li
                  className="inline-flex items-center gap-1.5 text-foreground font-medium"
                  aria-current="page"
                >
                  DMCA Policy
                </li>
              </ol>
            </nav>

            {/* ── Page Title ─────────────────────────────────────── */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-10 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <Scale className="size-5" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  DMCA / Copyright Policy
                </h1>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                This policy outlines how Background Remover handles copyright
                infringement notifications and counter-notifications in
                compliance with the Digital Millennium Copyright Act (DMCA), 17
                U.S.C. §&nbsp;512.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground/70">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* ── Divider ────────────────────────────────────────── */}
            <div className="h-px bg-border mb-10 sm:mb-12" />

            {/* ════════════════════════════════════════════════════════
                SECTION 1: Copyright Infringement Reporting
            ════════════════════════════════════════════════════════ */}
            <section className="mb-10 sm:mb-12" id="copyright-reporting">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                  <ShieldCheck className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  1. Copyright Infringement Reporting
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                <p>
                  Background Remover respects the intellectual property rights
                  of others and expects its users to do the same. We are
                  committed to complying with the Digital Millennium Copyright
                  Act of 1998 ({" "}
                  <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                    17 U.S.C. § 512
                  </span>
                  ), including the notice-and-takedown procedures described
                  therein.
                </p>
                <p>
                  It is our policy to respond to clear notices of alleged
                  copyright infringement that comply with the requirements set
                  forth in the DMCA. If we receive a properly formatted DMCA
                  takedown notice, we will expeditiously remove or disable access
                  to the material identified as infringing in that notice.
                </p>
                <p>
                  We will also, in appropriate circumstances, terminate the
                  access of users who are repeat infringers of copyrighted
                  material, as required by{" "}
                  <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                    17 U.S.C. § 512(i)
                  </span>
                  .
                </p>
              </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                SECTION 2: DMCA Takedown Notice Requirements
            ════════════════════════════════════════════════════════ */}
            <section
              className="mb-10 sm:mb-12"
              id="takedown-notice-requirements"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                  <FileText className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  2. DMCA Takedown Notice Requirements
                </h2>
              </div>
              <div className="pl-0 sm:pl-11">
                <p className="mb-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Pursuant to{" "}
                  <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                    17 U.S.C. § 512(c)(3)
                  </span>
                  , a valid DMCA takedown notice must include all of the
                  following elements. Failure to include all required elements
                  may result in your notice not being processed.
                </p>

                <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Required Elements
                  </h3>

                  <ol className="space-y-4">
                    {/* Element A */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                        A
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Physical or Electronic Signature
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          A physical or electronic signature of a person
                          authorized to act on behalf of the owner of an
                          exclusive right that is allegedly infringed. For
                          electronic notices, a typed full legal name is
                          acceptable as an electronic signature.
                        </p>
                      </div>
                    </li>

                    {/* Element B */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                        B
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Identification of the Copyrighted Work
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Identification of the copyrighted work claimed to have
                          been infringed, or, if multiple copyrighted works at a
                          single online site are covered by a single
                          notification, a representative list of such works at
                          that site. Please provide URLs, titles, or other
                          identifying information sufficient for us to locate the
                          material.
                        </p>
                      </div>
                    </li>

                    {/* Element C */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                        C
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Identification of the Infringing Material
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Identification of the material that is claimed to be
                          infringing or to be the subject of infringing activity
                          and that is to be removed or have access disabled, and
                          information reasonably sufficient to permit us to
                          locate the material. Please provide the specific URL
                          or other identifying information for each item.
                        </p>
                      </div>
                    </li>

                    {/* Element D */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                        D
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Contact Information
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Information reasonably sufficient to permit us to
                          contact the complaining party, such as an address,
                          telephone number, and, if available, an electronic
                          mail address at which the complaining party may be
                          contacted.
                        </p>
                      </div>
                    </li>

                    {/* Element E */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                        E
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Good Faith Belief Statement
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          A statement that the complaining party has a good faith
                          belief that use of the material in the manner
                          complained of is not authorized by the copyright owner,
                          its agent, or the law.
                        </p>
                        <div className="mt-2 rounded-md bg-muted/50 border border-border p-3 text-xs sm:text-sm italic text-muted-foreground">
                          &ldquo;I have a good faith belief that the use of the
                          material in the manner complained of is not authorized
                          by the copyright owner, its agent, or the law.&rdquo;
                        </div>
                      </div>
                    </li>

                    {/* Element F */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                        F
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Statement of Accuracy Under Penalty of Perjury
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          A statement that the information in the notification is
                          accurate, and under penalty of perjury, that the
                          complaining party is authorized to act on behalf of
                          the owner of an exclusive right that is allegedly
                          infringed.
                        </p>
                        <div className="mt-2 rounded-md bg-muted/50 border border-border p-3 text-xs sm:text-sm italic text-muted-foreground">
                          &ldquo;I swear, under penalty of perjury, that the
                          information in the notification is accurate and that I
                          am the copyright owner or am authorized to act on
                          behalf of the owner of an exclusive right that is
                          allegedly infringed.&rdquo;
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                SECTION 3: Where to Send DMCA Notices
            ════════════════════════════════════════════════════════ */}
            <section className="mb-10 sm:mb-12" id="send-dmca-notices">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                  <Mail className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  3. Where to Send DMCA Notices
                </h2>
              </div>
              <div className="pl-0 sm:pl-11">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  To file a DMCA takedown notice with Background Remover, please
                  send your written notice to our designated DMCA agent at the
                  following email address:
                </p>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <Mail className="size-5 text-emerald-600 shrink-0" />
                    <a
                      href="mailto:dmca@backgroundremover.app"
                      className="text-emerald-700 font-semibold text-base sm:text-lg hover:text-emerald-800 underline underline-offset-2 transition-colors"
                    >
                      dmca@backgroundremover.app
                    </a>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground">Background Remover</p>
                    <p>Attn: DMCA Designated Agent</p>
                    <p>dmca@backgroundremover.app</p>
                    <p className="mt-2 text-xs text-muted-foreground/70">
                      Physical mailing address and telephone number are available
                      upon request via email, and are registered with the U.S.
                      Copyright Office as required by 17 U.S.C. § 512(c)(2).
                      If you require our physical address or phone number for
                      your notice, please email us and we will provide it promptly.
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  In accordance with 17 U.S.C. § 512(c)(2), our designated agent&apos;s contact information has been filed with the U.S. Copyright Office and is available through their online directory of designated agents at{" "}
                  <a
                    href="https://www.copyright.gov/dmca-directory/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    https://www.copyright.gov/dmca-directory/
                  </a>.
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Please ensure your notice includes all six required elements
                  listed above. Incomplete notices may not be processed, and we
                  may request additional information before taking action.
                </p>
              </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                SECTION 4: Counter-Notification Requirements
            ════════════════════════════════════════════════════════ */}
            <section
              className="mb-10 sm:mb-12"
              id="counter-notification-requirements"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                  <AlertTriangle className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  4. Counter-Notification Requirements
                </h2>
              </div>
              <div className="pl-0 sm:pl-11">
                <p className="mb-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  If you believe that your material was removed or disabled as a
                  result of a mistake or misidentification, you may file a
                  counter-notification pursuant to{" "}
                  <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                    17 U.S.C. § 512(g)(3)
                  </span>
                  . A valid counter-notification must include all of the
                  following:
                </p>

                <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Required Elements for Counter-Notification
                  </h3>

                  <ol className="space-y-4">
                    {/* Element 1 */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Physical or Electronic Signature
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your physical or electronic signature. For electronic
                          counter-notifications, a typed full legal name is
                          acceptable.
                        </p>
                      </div>
                    </li>

                    {/* Element 2 */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Identification of the Removed Material
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Identification of the material that has been removed or
                          to which access has been disabled and the location at
                          which the material appeared before it was removed or
                          access to it was disabled. Provide the specific URL or
                          other identifying details.
                        </p>
                      </div>
                    </li>

                    {/* Element 3 */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Good Faith Belief Statement Under Penalty of Perjury
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          A statement under penalty of perjury that you have a
                          good faith belief that the material was removed or
                          disabled as a result of mistake or misidentification
                          of the material to be removed or disabled.
                        </p>
                        <div className="mt-2 rounded-md bg-muted/50 border border-border p-3 text-xs sm:text-sm italic text-muted-foreground">
                          &ldquo;I swear, under penalty of perjury, that I have a
                          good faith belief that the material was removed or
                          disabled as a result of mistake or misidentification
                          of the material to be removed or disabled.&rdquo;
                        </div>
                      </div>
                    </li>

                    {/* Element 4 */}
                    <li className="flex gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold shrink-0 mt-0.5">
                        4
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          Name, Address, Phone, and Consent to Jurisdiction
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your name, address, and telephone number, and a
                          statement that you consent to the jurisdiction of the
                          Federal District Court for the judicial district in
                          which your address is located (or if your address is
                          outside of the United States, for any judicial district
                          in which Background Remover may be found), and that
                          you will accept service of process from the person who
                          provided notification of the alleged infringement or an
                          agent of such person.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  <strong>Important:</strong> If a counter-notification is
                  received, we will forward a copy to the original complaining
                  party and inform them that we may replace the removed material
                  or cease disabling access to it in 10 business days. Unless
                  the copyright owner files an action seeking a court order
                  against you, the removed material may be restored after that
                  10-day period.
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Counter-notifications should be sent to:{" "}
                  <a
                    href="mailto:dmca@backgroundremover.app"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    dmca@backgroundremover.app
                  </a>
                </p>
              </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                SECTION 5: Repeat Infringer Policy
            ════════════════════════════════════════════════════════ */}
            <section className="mb-10 sm:mb-12" id="repeat-infringer-policy">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                  <Ban className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  5. Repeat Infringer Policy
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed pl-0 sm:pl-11">
                <p>
                  In accordance with{" "}
                  <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                    17 U.S.C. § 512(i)(1)(A)
                  </span>
                  , Background Remover has adopted and reasonably implements a
                  policy providing for the termination in appropriate
                  circumstances of users who are repeat infringers of copyright.
                </p>
                <p>
                  We maintain a record of valid DMCA takedown notices received.
                  When we determine that a user has been the subject of multiple
                  valid DMCA complaints, we will take steps including, but not
                  limited to:
                </p>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>
                    Issuing a formal warning to the user regarding the
                    infringement
                  </li>
                  <li>
                    Temporarily suspending the user&apos;s access to the service
                  </li>
                  <li>
                    Permanently terminating the user&apos;s access to the
                    service for repeated offenses
                  </li>
                  <li>
                    Blocking associated IP addresses or device identifiers
                  </li>
                </ul>
                <p>
                  We reserve the right to determine what constitutes a
                  &ldquo;repeat infringer&rdquo; on a case-by-case basis, taking
                  into account the nature and frequency of infringements, as
                  well as any mitigating or aggravating circumstances.
                </p>
              </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                SECTION 6: Important Notes
            ════════════════════════════════════════════════════════ */}
            <section className="mb-10 sm:mb-12" id="important-notes">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                  <Info className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  6. Important Notes About Our Service
                </h2>
              </div>
              <div className="pl-0 sm:pl-11 space-y-4">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6 space-y-5">
                  {/* Note 1: We don't store images */}
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">
                        We Do Not Store Your Images
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Background Remover is designed with privacy as a core
                        principle. Images uploaded to our service are processed
                        in real-time and are{" "}
                        <strong className="text-foreground">
                          immediately deleted
                        </strong>{" "}
                        from our servers once processing is complete. We do not
                        store, cache, retain, or archive any uploaded images or
                        processed results on our servers. No permanent copy of
                        any image exists on our systems.
                      </p>
                    </div>
                  </div>

                  {/* Note 2: Cannot remove content we don't host */}
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">
                        We Cannot Remove Content We Don&apos;t Host
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Because we do not store or host images on our platform,
                        we cannot remove, disable, or block access to specific
                        image content. If you have identified infringing
                        material that was processed through our service, please
                        be aware that we have no ability to remove the
                        processed image from the user&apos;s device or from any
                        third-party website where it may have been subsequently
                        published.
                      </p>
                    </div>
                  </div>

                  {/* Note 3: Processing tool, not hosting platform */}
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">
                        Our Service Is a Processing Tool, Not a Hosting Platform
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Background Remover functions as an ephemeral image
                        processing tool. We transform images at the user&apos;s
                        request and return the result directly to the user. We
                        do not provide image hosting, storage, sharing, or
                        distribution capabilities. As such, our service does not
                        &ldquo;host&rdquo; content in the traditional sense
                        contemplated by DMCA takedown procedures, and our
                        ability to respond to takedown requests is inherently
                        limited by the nature of our service.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you believe your copyrighted material was processed through
                  our service and the resulting output is being distributed
                  elsewhere, you may still send a DMCA notice and we will review
                  it in good faith. However, please understand that the most
                  effective course of action may be to contact the party hosting
                  or distributing the infringing material directly.
                </p>
              </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                SECTION 7: Misrepresentations
            ════════════════════════════════════════════════════════ */}
            <section className="mb-10 sm:mb-12" id="misrepresentations">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-red-50 text-red-600 shrink-0">
                  <AlertTriangle className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  7. Misrepresentations &mdash; Penalty of Perjury Warning
                </h2>
              </div>
              <div className="pl-0 sm:pl-11 space-y-4">
                <div className="rounded-lg border border-red-200 bg-red-50 p-5 sm:p-6">
                  <p className="text-sm sm:text-base text-red-800 leading-relaxed font-medium">
                    Under{" "}
                    <span className="font-mono text-xs bg-red-100 px-1.5 py-0.5 rounded">
                      17 U.S.C. § 512(f)
                    </span>
                    , any person who knowingly materially misrepresents that
                    material or activity is infringing, or that material or
                    activity was removed or disabled by mistake or
                    misidentification, shall be liable for any damages,
                    including costs and attorneys&apos; fees, incurred by the
                    alleged infringer, by any copyright owner or copyright
                    owner&apos;s authorized licensee, or by a service provider
                    who is injured by such misrepresentation.
                  </p>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  This means that if you file a DMCA takedown notice claiming
                  that material infringes your copyright when you know that it
                  does not, or if you file a counter-notification claiming that
                  material was removed by mistake when you know it was
                  legitimately infringing, you may be held legally responsible
                  for the damages caused by your misrepresentation.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Please carefully consider whether the material in question
                  genuinely infringes your rights before submitting a DMCA
                  notice, and consult with legal counsel if you are uncertain.
                </p>
              </div>
            </section>

            {/* ════════════════════════════════════════════════════════
                SECTION 8: Contact for DMCA Notices
            ════════════════════════════════════════════════════════ */}
            <section className="mb-10 sm:mb-12" id="contact">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-8 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                  <Mail className="size-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  8. Contact for DMCA Notices
                </h2>
              </div>
              <div className="pl-0 sm:pl-11 space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  All DMCA takedown notices and counter-notifications should be
                  sent to our designated DMCA agent at the following email
                  address:
                </p>

                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Designated DMCA Agent for Background Remover:
                  </p>
                  <a
                    href="mailto:dmca@backgroundremover.app"
                    className="text-emerald-700 font-semibold text-lg sm:text-xl hover:text-emerald-800 underline underline-offset-2 transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="size-5" />
                    dmca@backgroundremover.app
                  </a>
                  <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground">Background Remover</p>
                    <p>Attn: DMCA Designated Agent</p>
                    <p>dmca@backgroundremover.app</p>
                    <p className="mt-2 text-xs text-muted-foreground/70">
                      Physical mailing address and telephone number are available
                      upon request via email, and are registered with the U.S.
                      Copyright Office as required by 17 U.S.C. § 512(c)(2).
                    </p>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
                    We will acknowledge receipt of your notice via email and
                    will process valid notices as expeditiously as possible.
                  </p>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  In accordance with 17 U.S.C. § 512(c)(2), our designated agent&apos;s contact information has been filed with the U.S. Copyright Office and is available through their online directory of designated agents at{" "}
                  <a
                    href="https://www.copyright.gov/dmca-directory/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    https://www.copyright.gov/dmca-directory/
                  </a>.
                </p>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  For general inquiries not related to DMCA or copyright
                  matters, please visit our{" "}
                  <Link
                    href="/"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    home page
                  </Link>{" "}
                  for more information about our service.
                </p>
              </div>
            </section>

            {/* ── Final Divider ──────────────────────────────────── */}
            <div className="h-px bg-border mb-8" />

            {/* ── Legal Disclaimer ───────────────────────────────── */}
            <div className="rounded-md bg-muted/50 border border-border p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Disclaimer:</strong>{" "}
                This DMCA policy is provided for informational purposes and
                constitutes our official statement regarding copyright
                infringement procedures. Nothing in this policy shall be
                construed as legal advice, nor does it create an
                attorney-client relationship. We reserve the right to modify
                this policy at any time without prior notice. It is your
                responsibility to review this policy periodically for changes.
                Last updated: {lastUpdated}.
              </p>
            </div>
          </div>
        </main>

        {/* ─── Footer ────────────────────────────────────────────── */}
        <footer className="border-t border-border bg-muted/30 mt-auto">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
              <span aria-hidden="true">·</span>
              <Link href="/cookies" className="hover:text-emerald-600 transition-colors">Cookie Policy</Link>
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
