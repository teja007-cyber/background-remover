import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://backgroundremover.app";
const LAST_UPDATED = "March 4, 2025";

// ─── SEO Metadata ─────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Background Remover — free AI background removal tool. You retain full ownership of all images and outputs.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service",
    description:
      "Terms of Service for Background Remover — free AI background removal tool. You retain full ownership of all images and outputs.",
    url: `${SITE_URL}/terms`,
    siteName: "Background Remover",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service",
    description:
      "Terms of Service for Background Remover — free AI background removal tool. You retain full ownership of all images and outputs.",
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
      name: "Terms of Service",
      item: `${SITE_URL}/terms`,
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description:
    "Terms of Service for Background Remover — free AI background removal tool. You retain full ownership of all images and outputs.",
  url: `${SITE_URL}/terms`,
  isPartOf: {
    "@type": "WebSite",
    name: "Background Remover",
    url: SITE_URL,
  },
  dateModified: "2025-03-04",
  breadcrumb: {
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
        name: "Terms of Service",
        item: `${SITE_URL}/terms`,
      },
    ],
  },
};

// ─── Page Component ───────────────────────────────────────────────

export default function TermsOfServicePage() {
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
        {/* ─── Header / Back Navigation ─────────────────────────── */}
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium group"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-1">
                &larr;
              </span>
              Back to Background Remover
            </Link>
          </div>
        </header>

        {/* ─── Main Content ─────────────────────────────────────── */}
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Breadcrumb Navigation */}
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
                <li aria-hidden="true">&gt;</li>
                <li className="text-foreground font-medium" aria-current="page">
                  Terms of Service
                </li>
              </ol>
            </nav>

            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm mb-10">
              Last Updated: {LAST_UPDATED}
            </p>

            {/* ─── Sections ───────────────────────────────────────── */}
            <div className="space-y-10 text-[15px] leading-7 text-muted-foreground">
              {/* 1. Acceptance of Terms */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using the Background Remover service (&quot;Service&quot;),
                  available at{" "}
                  <Link
                    href="/"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    backgroundremover.app
                  </Link>
                  , you agree to be bound by these Terms of Service
                  (&quot;Terms&quot;). If you do not agree to these Terms, you must not
                  access or use the Service. Your continued use of the Service
                  following the posting of any changes to these Terms constitutes
                  acceptance of those changes.
                </p>
              </section>

              {/* 2. Definitions */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  2. Definitions
                </h2>
                <ul className="space-y-2 list-none pl-0">
                  <li>
                    <strong className="text-foreground">&quot;Service&quot;</strong>{" "}
                    means the Background Remover web application, including all
                    features, functionality, content, and tools provided at
                    backgroundremover.app, including but not limited to AI-powered
                    background removal, batch processing, and image download
                    capabilities.
                  </li>
                  <li>
                    <strong className="text-foreground">&quot;User&quot;</strong>{" "}
                    means any individual who accesses, browses, or uses the
                    Service, regardless of whether they upload any images.
                  </li>
                  <li>
                    <strong className="text-foreground">&quot;Content&quot;</strong>{" "}
                    means any image, photograph, graphic, or other visual material
                    that a User uploads or submits to the Service for processing.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      &quot;Processed Output&quot;
                    </strong>{" "}
                    means the resulting image produced by the Service after
                    removing the background from a User&apos;s uploaded Content,
                    including transparent PNG files and any other output format
                    provided by the Service.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      &quot;We,&quot; &quot;Us,&quot; &quot;Our&quot;
                    </strong>{" "}
                    means Background Remover, the operator of the Service.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      &quot;You,&quot; &quot;Your&quot;
                    </strong>{" "}
                    means the User accessing or using the Service.
                  </li>
                </ul>
              </section>

              {/* 3. Description of Service */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  3. Description of Service
                </h2>
                <p>
                  Background Remover is a free, web-based AI-powered tool that
                  removes backgrounds from images. The Service allows Users to
                  upload images in formats including PNG, JPG, and WebP, and uses
                  artificial intelligence to automatically detect and remove the
                  background, producing a transparent PNG output. The Service also
                  supports batch processing of up to 10 images simultaneously.
                </p>
                <p className="mt-3">
                  The Service is provided free of charge. No account, registration,
                  or sign-up is required to use the Service. The Service processes
                  images in real-time and does not permanently store User Content
                  on its servers after processing is complete.
                </p>
              </section>

              {/* 4. Eligibility */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  4. Eligibility
                </h2>
                <p>
                  By using the Service, you represent and warrant that:
                </p>
                <ul className="mt-3 space-y-1 list-disc pl-6">
                  <li>
                    You are at least 13 years of age. If you are under 18, you
                    must have the consent of a parent or legal guardian to use
                    the Service.
                  </li>
                  <li>
                    You have the legal capacity to enter into a binding agreement
                    under applicable law.
                  </li>
                  <li>
                    You are not prohibited from using the Service under any
                    applicable law or regulation, including any laws of the
                    jurisdiction in which you reside or from which you access the
                    Service.
                  </li>
                  <li>
                    You have not been previously suspended or terminated from
                    using the Service.
                  </li>
                </ul>
              </section>

              {/* 5. User Accounts */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  5. User Accounts
                </h2>
                <p>
                  No account is required to use the Service. Background Remover is
                  designed to be accessible without registration, login, or any
                  form of user identification. You may use the Service anonymously
                  without providing any personal information. If we introduce
                  optional account features in the future, separate terms may
                  apply, and we will notify you at that time.
                </p>
              </section>

              {/* 6. User Content & Intellectual Property */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  6. User Content &amp; Intellectual Property
                </h2>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
                  <p className="font-semibold text-emerald-800">
                    Your Content, Your Rights.
                  </p>
                  <ul className="space-y-2 list-none pl-0 text-emerald-900">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 shrink-0">&#10003;</span>
                      <span>
                        <strong>You retain ALL ownership and intellectual property rights</strong> to
                        any images you upload to the Service (&quot;Content&quot;).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 shrink-0">&#10003;</span>
                      <span>
                        <strong>You retain ALL ownership and intellectual property rights</strong> to
                        any processed images produced by the Service (&quot;Processed Output&quot;).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 shrink-0">&#10003;</span>
                      <span>
                        <strong>Background Remover claims NO ownership, license, or rights</strong> to
                        your uploaded images or processed outputs.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 shrink-0">&#10003;</span>
                      <span>
                        The Service is a <strong>tool</strong> — the output belongs{" "}
                        <strong>entirely to you</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1 shrink-0">&#10003;</span>
                      <span>
                        You may use Processed Output for <strong>any purpose</strong>,
                        including commercial, personal, editorial, creative, or any
                        other lawful use, without attribution required.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="mt-4">
                  By uploading Content to the Service, you grant us a limited,
                  temporary, non-exclusive, non-transferable license solely for
                  the purpose of processing your image and delivering the Processed
                  Output to you. This license terminates automatically once
                  processing is complete and the Processed Output has been
                  delivered to you. We do not retain, store, reproduce, distribute,
                  or create derivative works from your Content or Processed Output
                  beyond what is technically necessary to provide the Service.
                </p>
                <p className="mt-3">
                  Because the Service does not permanently store your images, we
                  cannot recover or retrieve Content or Processed Output once you
                  navigate away from the results page. You are solely responsible
                  for downloading and saving any Processed Output you wish to keep.
                </p>
              </section>

              {/* 7. User Responsibilities & Warranties */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  7. User Responsibilities &amp; Warranties
                </h2>
                <p>
                  By uploading Content to the Service, you represent and warrant
                  that:
                </p>
                <ul className="mt-3 space-y-1 list-disc pl-6">
                  <li>
                    You own the Content or have obtained all necessary rights,
                    licenses, consents, and permissions to upload the Content and
                    have it processed by the Service.
                  </li>
                  <li>
                    The Content does not infringe upon any third party&apos;s
                    copyright, trademark, patent, trade secret, or other
                    intellectual property right.
                  </li>
                  <li>
                    The Content does not violate any applicable law, regulation, or
                    third-party right.
                  </li>
                  <li>
                    If the Content contains identifiable individuals, you have
                    obtained their consent for the use and processing of their
                    image, or such use is otherwise lawful.
                  </li>
                  <li>
                    You are solely responsible for the Content you upload and any
                    consequences arising from its processing or use of the
                    Processed Output.
                  </li>
                </ul>
              </section>

              {/* 8. Prohibited Uses */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  8. Prohibited Uses
                </h2>
                <p>
                  You may not use the Service for any purpose that is unlawful,
                  harmful, or violates the rights of others. The following uses are
                  strictly prohibited:
                </p>
                <ul className="mt-3 space-y-1 list-disc pl-6">
                  <li>
                    <strong>Illegal content.</strong> Uploading, processing, or
                    distributing any content that violates any applicable local,
                    state, national, or international law or regulation.
                  </li>
                  <li>
                    <strong>Child sexual abuse material (CSAM).</strong> We have
                    zero tolerance for CSAM. Any attempt to upload, process, or
                    distribute content involving the sexual exploitation of minors
                    will result in immediate termination of access and{" "}
                    <strong>reporting to the appropriate law enforcement
                    authorities</strong>, including the National Center for Missing
                    &amp; Exploited Children (NCMEC) and relevant international
                    agencies.
                  </li>
                  <li>
                    <strong>Violation of others&apos; rights.</strong> Uploading or
                    processing images that violate any person&apos;s copyright,
                    trademark, privacy, publicity, or other intellectual property
                    or personal rights.
                  </li>
                  <li>
                    <strong>Unauthorized use of likeness.</strong> Using the Service
                    to process images of identifiable individuals without their
                    consent, particularly for purposes that could be defamatory,
                    misleading, or harmful to their reputation.
                  </li>
                  <li>
                    <strong>Service disruption.</strong> Attempting to disrupt,
                    overload, compromise, or impair the Service&apos;s
                    infrastructure, servers, networks, or any third-party services
                    integrated with the Service, including but not limited to
                    denial-of-service attacks, flooding, or excessive resource
                    consumption.
                  </li>
                  <li>
                    <strong>Automated abuse.</strong> Using automated tools,
                    scripts, bots, scrapers, or any other automated means to
                    access, scrape, crawl, or interact with the Service in a
                    manner that exceeds reasonable personal use or places undue
                    burden on the Service&apos;s infrastructure.
                  </li>
                  <li>
                    <strong>Reverse engineering.</strong> Attempting to reverse
                    engineer, decompile, disassemble, or otherwise derive the
                    source code, algorithms, models, or underlying technology of
                    the Service.
                  </li>
                  <li>
                    <strong>Unlawful purposes.</strong> Using the Service for any
                    purpose that constitutes a criminal offense, gives rise to
                    civil liability, or otherwise violates any applicable law.
                  </li>
                  <li>
                    <strong>Malicious deepfakes.</strong> Using the Service to
                    create deepfakes, manipulated images, or synthetic media for
                    the purpose of fraud, defamation, harassment, blackmail,
                    election interference, or any other malicious or deceptive
                    purpose.
                  </li>
                  <li>
                    <strong>Harmful content.</strong> Uploading content that
                    promotes violence, terrorism, hate speech, discrimination, or
                    harassment against any individual or group.
                  </li>
                  <li>
                    <strong>Interference.</strong> Interfering with or circumventing
                    any security measures, access controls, or usage limits
                    implemented by the Service.
                  </li>
                </ul>
                <p className="mt-3">
                  We reserve the right to refuse processing of any Content, at any
                  time, for any reason, including but not limited to suspected
                  violations of these Terms.
                </p>
              </section>

              {/* 9. Service Availability */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  9. Service Availability
                </h2>
                <p>
                  The Service is provided on an &quot;as-is&quot; and &quot;as-available&quot;
                  basis. We do not guarantee that the Service will be available at
                  any particular time, uninterrupted, or error-free. We may
                  experience hardware, software, or other problems, and we may
                  need to perform maintenance, resulting in interruptions,
                  delays, or errors.
                </p>
                <p className="mt-3">
                  We reserve the right to change, modify, suspend, or discontinue
                  the Service, in whole or in part, at any time, with or without
                  notice. We shall not be liable to you or any third party for any
                  modification, suspension, or discontinuation of the Service.
                </p>
              </section>

              {/* 10. Accuracy of Results */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  10. Accuracy of Results
                </h2>
                <p>
                  The Service uses artificial intelligence and machine learning
                  technology to process images. AI-generated results may not be
                  perfect, and the quality of the Processed Output may vary
                  depending on the complexity, resolution, and characteristics of
                  the uploaded Content.
                </p>
                <p className="mt-3">
                  We do not guarantee the accuracy, completeness, reliability, or
                  quality of any Processed Output. You acknowledge that the
                  Service may produce imperfect, incomplete, or unexpected
                  results, and you use the Processed Output at your own risk. It
                  is your responsibility to review and verify the quality and
                  accuracy of any Processed Output before using it for any
                  purpose.
                </p>
              </section>

              {/* 11. Limitation of Liability */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  11. Limitation of Liability
                </h2>
                <div className="space-y-3">
                  <p>
                    <strong className="text-foreground">
                      TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW:
                    </strong>
                  </p>
                  <p>
                    The Service is provided without warranty of any kind, whether
                    express, implied, statutory, or otherwise, including but not
                    limited to warranties of merchantability, fitness for a
                    particular purpose, title, non-infringement, and any
                    warranties arising from course of dealing, usage, or trade
                    practice.
                  </p>
                  <p>
                    In no event shall Background Remover, its operators, directors,
                    employees, agents, or affiliates be liable for any indirect,
                    incidental, special, consequential, punitive, or exemplary
                    damages, including but not limited to damages for loss of
                    profits, goodwill, data, images, content, or other
                    intangible losses, regardless of whether such damages are
                    based on contract, tort, strict liability, or any other
                    theory, and whether or not we have been advised of the
                    possibility of such damages.
                  </p>
                  <p>
                    In no event shall our total aggregate liability to you for all
                    claims arising out of or relating to the Service or these
                    Terms exceed the amount you have paid to us for the Service.
                    Because the Service is provided free of charge, this amount
                    is <strong className="text-foreground">$0.00</strong>.
                  </p>
                  <p>
                    You acknowledge that the Service is provided as a free tool
                    and that no fee is charged for its use. Accordingly, you agree
                    that the absence of any payment consideration limits the
                    liability of Background Remover to the greatest extent
                    permitted by law, and that it would be unjust to hold
                    Background Remover liable for any damages arising from the use
                    of a free service.
                  </p>
                  <p>
                    Some jurisdictions do not allow the exclusion of certain
                    warranties or the limitation or exclusion of liability for
                    certain types of damages. Accordingly, some of the above
                    limitations and disclaimers may not apply to you. To the
                    extent that we may not, as a matter of applicable law,
                    disclaim any implied warranty or limit our liabilities, the
                    scope and duration of such warranty and the extent of our
                    liability shall be the minimum permitted under such applicable
                    law.
                  </p>
                </div>
              </section>

              {/* 12. Indemnification */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  12. Indemnification
                </h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Background
                  Remover, its operators, directors, employees, agents, and
                  affiliates from and against any and all claims, damages,
                  losses, liabilities, costs, and expenses (including reasonable
                  attorneys&apos; fees) arising out of or in any way connected with:
                </p>
                <ul className="mt-3 space-y-1 list-disc pl-6">
                  <li>
                    Your use of the Service or any activity conducted through the
                    Service.
                  </li>
                  <li>
                    Any Content you upload or process through the Service.
                  </li>
                  <li>
                    Your violation of these Terms or any applicable law or
                    regulation.
                  </li>
                  <li>
                    Your violation of any rights of a third party, including but
                    not limited to intellectual property rights, privacy rights,
                    or publicity rights.
                  </li>
                  <li>
                    Any claim that your Content or use of the Processed Output
                    causes damage to a third party.
                  </li>
                </ul>
                <p className="mt-3">
                  This indemnification obligation will survive the termination or
                  expiration of these Terms and your use of the Service.
                </p>
              </section>

              {/* 13. DMCA & Copyright */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  13. DMCA &amp; Copyright
                </h2>
                <p>
                  We respect intellectual property rights and expect our Users to
                  do the same. If you believe that any Content processed by or
                  available through the Service infringes your copyright, please
                  refer to our{" "}
                  <Link
                    href="/dmca"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    DMCA / Copyright Policy
                  </Link>{" "}
                  page for information on how to submit a takedown notice. We
                  will respond to valid DMCA takedown requests in accordance with
                  applicable law.
                </p>
              </section>

              {/* 14. Privacy */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  14. Privacy
                </h2>
                <p>
                  Your privacy is important to us. Your use of the Service is
                  also governed by our{" "}
                  <Link
                    href="/privacy"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  , which describes how we collect, use, and protect information
                  when you use the Service. By using the Service, you consent to
                  the collection and use of information as outlined in our
                  Privacy Policy.
                </p>
              </section>

              {/* 15. Cookies */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  15. Cookies
                </h2>
                <p>
                  The Service may use cookies and similar tracking technologies to
                  enhance your experience. For detailed information about the
                  cookies we use and your choices regarding cookies, please see
                  our{" "}
                  <Link
                    href="/cookies"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  . By using the Service, you consent to the use of cookies as
                  described in our Cookie Policy.
                </p>
              </section>

              {/* 16. Modifications to Terms */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  16. Modifications to Terms
                </h2>
                <p>
                  We reserve the right to modify, amend, or update these Terms at
                  any time, at our sole discretion. When we make material changes,
                  we will update the &quot;Last Updated&quot; date at the top of this page
                  and make reasonable efforts to notify you, which may include
                  posting a notice on the Service or through other appropriate
                  means.
                </p>
                <p className="mt-3">
                  Your continued use of the Service after any changes to these
                  Terms become effective constitutes your acceptance of the
                  revised Terms. If you do not agree with the modified Terms, you
                  must discontinue use of the Service immediately.
                </p>
                <p className="mt-3">
                  We encourage you to review these Terms periodically to stay
                  informed of any changes. It is your responsibility to check
                  these Terms regularly for updates.
                </p>
              </section>

              {/* 17. Termination */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  17. Termination
                </h2>
                <p>
                  We reserve the right to terminate, suspend, or restrict your
                  access to the Service, in whole or in part, at any time, with
                  or without notice, for any reason, including but not limited to:
                </p>
                <ul className="mt-3 space-y-1 list-disc pl-6">
                  <li>
                    Violation of these Terms or any applicable law or regulation.
                  </li>
                  <li>
                    Conduct that we reasonably believe could cause harm to us,
                    other Users, or any third party.
                  </li>
                  <li>
                    Abuse, excessive use, or use of the Service in a manner that
                    places undue burden on our infrastructure.
                  </li>
                  <li>
                    Any attempted upload of CSAM or other illegal content, which
                    will result in immediate and permanent termination.
                  </li>
                </ul>
                <p className="mt-3">
                  Upon termination, your right to use the Service will immediately
                  cease. All provisions of these Terms that by their nature should
                  survive termination shall survive, including but not limited to
                  the limitations of liability, indemnification, and warranty
                  disclaimers.
                </p>
              </section>

              {/* 18. Dispute Resolution */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  18. Dispute Resolution
                </h2>
                <div className="space-y-3">
                  <p>
                    <strong className="text-foreground">Governing Law.</strong>{" "}
                    These Terms shall be governed by and construed in accordance
                    with the laws of the jurisdiction in which Background Remover
                    operates, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    <strong className="text-foreground">Jurisdiction.</strong>{" "}
                    Any disputes arising out of or relating to these Terms or the
                    Service shall be resolved exclusively in the courts of
                    competent jurisdiction in the jurisdiction where Background
                    Remover operates. You consent to the personal jurisdiction of
                    such courts and waive any objection to venue in such courts.
                  </p>
                  <p>
                    <strong className="text-foreground">Arbitration Option.</strong>{" "}
                    Before filing any claim in court, you and we agree to attempt
                    to resolve the dispute through good-faith negotiation. If the
                    dispute cannot be resolved through negotiation within 30 days,
                    either party may submit the dispute to binding arbitration
                    administered by a mutually agreed-upon arbitration service.
                    The arbitration shall be conducted on an individual basis —
                    class arbitrations, class actions, and representative actions
                    are not permitted. The arbitrator&apos;s decision shall be final
                    and binding, and judgment on the award may be entered in any
                    court of competent jurisdiction.
                  </p>
                  <p>
                    <strong className="text-foreground">Waiver of Class Actions.</strong>{" "}
                    You agree that any dispute resolution proceedings will be
                    conducted only on an individual basis and not in a class,
                    consolidated, or representative action. You waive any right to
                    participate in a class action lawsuit or class-wide arbitration
                    against us.
                  </p>
                </div>
              </section>

              {/* 19. Severability */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  19. Severability
                </h2>
                <p>
                  If any provision of these Terms is held to be invalid, illegal,
                  void, or unenforceable by a court of competent jurisdiction,
                  such provision shall be modified to the minimum extent necessary
                  to make it valid and enforceable, or if modification is not
                  possible, shall be severed from these Terms. The invalidity or
                  unenforceability of any provision shall not affect the validity
                  or enforceability of the remaining provisions, which shall
                  continue in full force and effect. The parties agree that any
                  provision that is held to be invalid or unenforceable shall be
                  replaced by a provision that comes as close as possible to the
                  intent and economic effect of the invalid or unenforceable
                  provision.
                </p>
              </section>

              {/* 20. Entire Agreement */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  20. Entire Agreement
                </h2>
                <p>
                  These Terms of Service, together with our{" "}
                  <Link
                    href="/privacy"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link
                    href="/cookies"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  , and{" "}
                  <Link
                    href="/dmca"
                    className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                  >
                    DMCA Policy
                  </Link>
                  , constitute the entire agreement between you and Background
                  Remover with respect to your use of the Service. These Terms
                  supersede all prior or contemporaneous communications,
                  representations, or agreements, whether oral or written, relating
                  to the Service.
                </p>
                <p className="mt-3">
                  Our failure to enforce any right or provision of these Terms
                  shall not constitute a waiver of such right or provision. Any
                  waiver of any provision of these Terms will be effective only
                  if in writing and signed by us.
                </p>
              </section>

              {/* 21. Contact Information */}
              <section>
                <h2 className="text-xl font-semibold text-emerald-700 mb-3">
                  21. Contact Information
                </h2>
                <p>
                  If you have any questions, concerns, or feedback regarding these
                  Terms of Service, please contact us at:
                </p>
                <div className="mt-3 rounded-lg border border-border bg-muted/30 p-4">
                  <p className="font-medium text-foreground">
                    Background Remover — Legal
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:legal@backgroundremover.app"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                    >
                      legal@backgroundremover.app
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <Link
                      href="/"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                    >
                      backgroundremover.app
                    </Link>
                  </p>
                </div>
              </section>
            </div>

            {/* ─── Bottom Navigation ────────────────────────────────── */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-medium group"
              >
                <span className="inline-block transition-transform group-hover:-translate-x-1">
                  &larr;
                </span>
                Back to Background Remover
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href="/privacy"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-muted-foreground">&bull;</span>
                <Link
                  href="/cookies"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Cookie Policy
                </Link>
                <span className="text-muted-foreground">&bull;</span>
                <Link
                  href="/dmca"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  DMCA Policy
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* ─── Footer ─────────────────────────────────────────────── */}
        <footer className="border-t border-border mt-auto">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Background Remover. All rights
            reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
