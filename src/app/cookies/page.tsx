import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Cookie,
  ShieldCheck,
  Monitor,
  Mail,
  ChevronRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// ─── SEO Metadata ─────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Background Remover — we use minimal essential cookies only. No tracking, no analytics cookies. Learn more about our privacy-first approach.",
  keywords: [
    "cookie policy",
    "background remover cookies",
    "essential cookies",
    "no tracking cookies",
    "privacy-first cookies",
    "cookie consent",
    "cookie management",
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
    canonical: "https://backgroundremover.app/cookies",
  },
  openGraph: {
    title: "Cookie Policy | Background Remover",
    description:
      "Cookie Policy for Background Remover — we use minimal essential cookies only. No tracking, no analytics cookies. Learn more about our privacy-first approach.",
    url: "https://backgroundremover.app/cookies",
    siteName: "Background Remover",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cookie Policy — Background Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Background Remover",
    description:
      "Cookie Policy for Background Remover — we use minimal essential cookies only. No tracking, no analytics cookies. Privacy-first.",
    images: ["/og-image.png"],
  },
};

// ─── Constants ────────────────────────────────────────────────────────────

const SITE_URL = "https://backgroundremover.app";
const LAST_UPDATED = "March 4, 2026";
const CONTACT_EMAIL = "privacy@backgroundremover.app";

// ─── JSON-LD Structured Data ──────────────────────────────────────────────

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
      name: "Cookie Policy",
      item: `${SITE_URL}/cookies`,
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cookie Policy — Background Remover",
  description:
    "Cookie Policy for Background Remover — we use minimal essential cookies only. No tracking, no analytics cookies.",
  url: `${SITE_URL}/cookies`,
  isPartOf: {
    "@type": "WebSite",
    name: "Background Remover",
    url: SITE_URL,
  },
  dateModified: "2026-03-04",
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
        name: "Cookie Policy",
        item: `${SITE_URL}/cookies`,
      },
    ],
  },
};

// ─── Cookie Table Data ────────────────────────────────────────────────────

const cookiesWeUse = [
  {
    name: "bg-remover-cookie-consent",
    purpose: "Stores your cookie consent preference (acknowledged/dismissed) using browser localStorage",
    type: "Essential / Strictly Necessary",
    duration: "Persistent until you clear browser data or manually remove it",
    category: "First-Party (localStorage)",
  },
];

// ─── Page Component ───────────────────────────────────────────────────────

export default function CookiePolicyPage() {
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

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* ─── Header ─────────────────────────────────────────────── */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </header>

        {/* ─── Main Content ────────────────────────────────────────── */}
        <main id="main-content" className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-3.5 w-3.5" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Cookie Policy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Page Title Section */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600">
                  <Cookie className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Cookie Policy
                  </h1>
                </div>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                We believe in transparency. This Cookie Policy explains how
                Background Remover uses cookies and similar technologies, and how
                you can control them.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Last updated:{" "}
                <time dateTime="2026-03-04" className="font-medium">
                  {LAST_UPDATED}
                </time>
              </p>
            </div>

            {/* ─── Policy Sections ─────────────────────────────────── */}
            <div className="space-y-10 sm:space-y-12">
              {/* 1. Introduction */}
              <section id="introduction" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">1.</span>{' '}
                  Introduction
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Background Remover (&quot;we,&quot; &quot;us,&quot; or
                    &quot;our&quot;), accessible at{" "}
                    <Link
                      href="/"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                    >
                      backgroundremover.app
                    </Link>
                    , is committed to protecting your privacy and being
                    transparent about how we use technology on our website.
                  </p>
                  <p>
                    This Cookie Policy explains what cookies and similar
                    technologies are, how we use them on our website, and your
                    rights to control their use. This policy applies to all
                    visitors and users of our website.
                  </p>
                  <p>
                    This Cookie Policy is part of our broader privacy practices
                    and should be read alongside our Privacy Policy. By using our
                    website, you consent to the use of cookies as described in
                    this policy, subject to the choices you make through our
                    cookie consent mechanism.
                  </p>
                  <p>
                    This policy is designed to comply with the requirements of
                    the EU Cookie Directive (2009/136/EC), the ePrivacy
                    Directive (2002/58/EC as amended), the General Data
                    Protection Regulation (GDPR — Regulation (EU) 2016/679), and
                    the California Consumer Privacy Act (CCPA) as amended by the
                    CPRA.
                  </p>
                </div>
              </section>

              {/* 2. What Are Cookies */}
              <section id="what-are-cookies" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">2.</span>
                  What Are Cookies?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Cookies are small text files that are placed on your computer,
                    smartphone, or other device when you visit a website. They are
                    widely used to make websites work more efficiently, provide a
                    better browsing experience, and supply information to the
                    website owners.
                  </p>
                  <p>
                    Each cookie is a small piece of data — typically consisting of
                    letters and numbers — that is stored on your device by your
                    web browser at the request of a web server. When you visit the
                    same website again, your browser sends the cookie back to the
                    server, allowing the website to recognize your device and
                    remember information about your visit.
                  </p>
                  <p>
                    Cookies can be &quot;persistent&quot; (they remain on your
                    device until they expire or you delete them) or
                    &quot;session&quot; (they are deleted when you close your
                    browser). Cookies can be set by the website you are visiting
                    (&quot;first-party cookies&quot;) or by third-party services
                    operating on that website (&quot;third-party cookies&quot;).
                  </p>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 sm:p-5 my-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">In simple terms:</strong>{" "}
                      Think of a cookie like a small note a website leaves on
                      your device so it can remember something about you the next
                      time you visit. Just like a shopkeeper might remember your
                      name, cookies help websites remember your preferences.
                    </p>
                  </div>
                  <p>
                    Cookies are not programs and cannot execute code or carry
                    viruses or malware. They cannot access the data on your hard
                    drive or read other cookies stored by other websites. However,
                    they do store information about you, which is why we believe
                    you should understand and control their use.
                  </p>
                </div>
              </section>

              {/* 3. Types of Cookies */}
              <section id="types-of-cookies" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">3.</span>
                  Types of Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  There are several categories of cookies that websites commonly
                  use. Below is a detailed explanation of each type, including
                  which ones we use and which ones we do not.
                </p>

                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className="rounded-xl border border-border p-5 sm:p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Essential / Strictly Necessary Cookies
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-0.5 mt-1">
                          We use this type
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      These cookies are strictly necessary for the operation of
                      our website. They are set in response to your use of our
                      services, such as remembering your cookie consent
                      preferences. Without these cookies, certain features of the
                      website cannot function properly. Essential cookies do not
                      require your consent under the ePrivacy Directive and GDPR,
                      as they are necessary for the provision of the service you
                      have requested.
                    </p>
                  </div>

                  {/* Performance Cookies */}
                  <div className="rounded-xl border border-border p-5 sm:p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
                        <Monitor className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Performance / Analytics Cookies
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 mt-1">
                          We do NOT use this type
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      These cookies collect information about how visitors use a
                      website, such as which pages are visited most often, how
                      users navigate between pages, and whether users encounter
                      error messages. These cookies do not collect information
                      that identifies you personally; all data is aggregated and
                      anonymized. Under GDPR and the ePrivacy Directive, these
                      cookies require your prior consent.
                    </p>
                  </div>

                  {/* Functionality Cookies */}
                  <div className="rounded-xl border border-border p-5 sm:p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
                        <Cookie className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Functionality Cookies
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 mt-1">
                          We do NOT use this type
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      These cookies allow the website to remember choices you
                      make (such as your preferred language, region, or other
                      display settings) and provide enhanced, personalized
                      features. They may also be used to remember changes you
                      have made to text size, fonts, and other customizable
                      elements. These cookies require your prior consent under
                      applicable law.
                    </p>
                  </div>

                  {/* Advertising Cookies */}
                  <div className="rounded-xl border border-border p-5 sm:p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
                        <Cookie className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Advertising / Targeting Cookies
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 mt-1">
                          We do NOT use this type
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      These cookies are used to deliver advertisements more
                      relevant to you and your interests. They are also used to
                      limit the number of times you see an advertisement, as well
                      as to measure the effectiveness of advertising campaigns.
                      They are usually placed by advertising networks with the
                      website operator&apos;s permission. These cookies track
                      your browsing activity across different websites and
                      require your explicit prior consent.
                    </p>
                  </div>

                  {/* Third-Party Cookies */}
                  <div className="rounded-xl border border-border p-5 sm:p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
                        <Cookie className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Third-Party Cookies
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground text-xs font-medium px-2.5 py-0.5 mt-1">
                          We do NOT use this type
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Third-party cookies are set by domains other than the
                      website you are visiting. These are commonly used by
                      analytics providers, advertising networks, social media
                      platforms, and other external services operating on a
                      website. Third-party cookies can track your activity across
                      multiple websites and raise significant privacy concerns.
                      Under GDPR and the ePrivacy Directive, these cookies
                      require your explicit prior informed consent.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Cookies We Use */}
              <section id="cookies-we-use" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">4.</span>
                  Cookies We Use
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
                  <p>
                    We are committed to minimizing the use of cookies on our
                    website. We only use one essential cookie, and we do not use
                    any analytics, advertising, functionality, or third-party
                    cookies.
                  </p>
                  <p>
                    The sole cookie we use is necessary to remember your cookie
                    consent preference, as required by applicable law. Without
                    this cookie, we would be unable to honor your consent choice
                    and would need to ask you for consent on every page visit.
                  </p>
                </div>

                {/* Cookie Table */}
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          <th className="text-left font-semibold py-3 px-4 text-foreground">
                            Cookie Name
                          </th>
                          <th className="text-left font-semibold py-3 px-4 text-foreground">
                            Purpose
                          </th>
                          <th className="text-left font-semibold py-3 px-4 text-foreground">
                            Type
                          </th>
                          <th className="text-left font-semibold py-3 px-4 text-foreground">
                            Duration
                          </th>
                          <th className="text-left font-semibold py-3 px-4 text-foreground">
                            Category
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cookiesWeUse.map((cookie) => (
                          <tr
                            key={cookie.name}
                            className="border-b border-border last:border-b-0"
                          >
                            <td className="py-3 px-4 font-mono text-xs text-emerald-600 bg-emerald-50/50">
                              {cookie.name}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {cookie.purpose}
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5">
                                {cookie.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {cookie.duration}
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {cookie.category}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* What we do NOT use */}
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-emerald-800 mb-3">
                    What We Do NOT Use
                  </h3>
                  <p className="text-emerald-700 text-sm mb-4">
                    We are proud of our privacy-first approach. We do{" "}
                    <strong>not</strong> use any of the following:
                  </p>
                  <ul className="space-y-2 text-sm text-emerald-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 font-bold">
                        &times;
                      </span>
                      <span>
                        <strong>Analytics cookies</strong> — We do not track how
                        you use our website or collect browsing statistics.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 font-bold">
                        &times;
                      </span>
                      <span>
                        <strong>Advertising / targeting cookies</strong> — We do
                        not serve targeted advertisements or track you for
                        advertising purposes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 font-bold">
                        &times;
                      </span>
                      <span>
                        <strong>Tracking cookies</strong> — We do not track your
                        browsing activity across pages or sessions (beyond your
                        consent preference).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 font-bold">
                        &times;
                      </span>
                      <span>
                        <strong>Third-party cookies</strong> — No external
                        service sets cookies through our website.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 font-bold">
                        &times;
                      </span>
                      <span>
                        <strong>Social media cookies</strong> — We do not embed
                        social media plugins or share buttons that set cookies.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 font-bold">
                        &times;
                      </span>
                      <span>
                        <strong>Functionality cookies</strong> — We do not store
                        preferences like language or display settings via
                        cookies.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. How We Use Cookies */}
              <section id="how-we-use-cookies" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">5.</span>
                  How We Use Cookies
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We use cookies for one purpose only: to remember your cookie
                    consent preference.
                  </p>
                  <p>
                    When you visit our website for the first time, a cookie
                    consent banner is displayed. Once you acknowledge the
                    banner, we store your preference in browser localStorage
                    under the key <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">bg-remover-cookie-consent</code>. This
                    ensures that:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        We do not show you the consent banner again on
                        subsequent visits, providing a better user experience.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        We honor your consent choice consistently across your
                        visits, as required by the ePrivacy Directive and GDPR.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        We maintain a record of your consent for compliance
                        purposes.
                      </span>
                    </li>
                  </ul>
                  <p>
                    That is the full extent of our cookie usage. We do not use
                    cookies for tracking, profiling, analytics, advertising, or
                    any other purpose.
                  </p>
                </div>
              </section>

              {/* 6. Third-Party Cookies */}
              <section id="third-party-cookies" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">6.</span>
                  Third-Party Cookies
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We do <strong>not</strong> allow any third-party cookies to
                    be set on our website. This means:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        No analytics services (such as Google Analytics, Matomo,
                        or similar) set cookies through our website.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        No advertising networks (such as Google Ads, Facebook
                        Pixel, or similar) set cookies through our website.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        No social media platforms (such as Facebook, Twitter/X,
                        LinkedIn, or similar) set cookies through our website.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        No embedded content from third-party domains sets cookies
                        through our website.
                      </span>
                    </li>
                  </ul>
                  <p>
                    Our website is entirely self-contained with respect to cookie
                    usage. The only cookie set is our own first-party essential
                    cookie for consent management.
                  </p>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 sm:p-5 my-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Note:</strong> While we
                      do not set third-party cookies ourselves, please be aware
                      that third-party cookies may be set by other websites you
                      visit. We have no control over cookies set by other
                      websites and recommend reviewing their cookie policies.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Managing Cookies */}
              <section id="managing-cookies" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">7.</span>
                  Managing Cookies
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    You have the right to decide whether to accept or reject
                    cookies. You can exercise your cookie preferences in the
                    following ways:
                  </p>

                  {/* Cookie Consent Banner */}
                  <h3 className="text-lg font-semibold text-foreground pt-2">
                    Through Our Cookie Consent Banner
                  </h3>
                  <p>
                    When you first visit our website, a cookie consent banner is
                    displayed. You can accept or reject non-essential cookies
                    through this banner. You can also change your preference at
                    any time by clearing the <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">bg-remover-cookie-consent</code> localStorage entry from
                    your browser, which will cause the banner to reappear on your
                    next visit.
                  </p>

                  {/* Browser Settings */}
                  <h3 className="text-lg font-semibold text-foreground pt-2">
                    Through Your Browser Settings
                  </h3>
                  <p>
                    Most web browsers allow you to control cookies through their
                    settings. You can set your browser to refuse all cookies,
                    accept only certain cookies, or alert you when a cookie is
                    being set. Below are instructions for the most common
                    browsers:
                  </p>

                  <div className="space-y-4 mt-4">
                    {/* Chrome */}
                    <div className="rounded-lg border border-border p-4 sm:p-5">
                      <h4 className="font-semibold text-foreground mb-2">
                        Google Chrome
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          Click the three-dot menu in the top-right corner and
                          select &quot;Settings&quot;
                        </li>
                        <li>
                          Click &quot;Privacy and security&quot; in the left
                          sidebar
                        </li>
                        <li>Click &quot;Third-party cookies&quot;</li>
                        <li>
                          Select your preferred cookie settings (block all, block
                          third-party, or allow all)
                        </li>
                        <li>
                          To manage existing cookies, click &quot;See all site
                          data and permissions&quot;
                        </li>
                      </ol>
                    </div>

                    {/* Firefox */}
                    <div className="rounded-lg border border-border p-4 sm:p-5">
                      <h4 className="font-semibold text-foreground mb-2">
                        Mozilla Firefox
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          Click the three-line menu in the top-right corner and
                          select &quot;Settings&quot;
                        </li>
                        <li>
                          Select &quot;Privacy &amp; Security&quot; from the
                          left panel
                        </li>
                        <li>
                          Under &quot;Enhanced Tracking Protection,&quot; choose
                          your level of protection
                        </li>
                        <li>
                          Under &quot;Cookies and Site Data,&quot; click
                          &quot;Manage Data&quot; to view and remove individual
                          cookies
                        </li>
                      </ol>
                    </div>

                    {/* Safari */}
                    <div className="rounded-lg border border-border p-4 sm:p-5">
                      <h4 className="font-semibold text-foreground mb-2">
                        Apple Safari (macOS)
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          Click &quot;Safari&quot; in the menu bar and select
                          &quot;Settings&quot; (or &quot;Preferences&quot;)
                        </li>
                        <li>Click the &quot;Privacy&quot; tab</li>
                        <li>
                          Under &quot;Cookies and website data,&quot; select your
                          preferred option (block all, block third-party, or
                          allow)
                        </li>
                        <li>
                          Click &quot;Manage Website Data&quot; to view and
                          remove individual cookies
                        </li>
                      </ol>
                    </div>

                    {/* Safari iOS */}
                    <div className="rounded-lg border border-border p-4 sm:p-5">
                      <h4 className="font-semibold text-foreground mb-2">
                        Apple Safari (iOS)
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Open the &quot;Settings&quot; app</li>
                        <li>Scroll down and tap &quot;Safari&quot;</li>
                        <li>
                          Under &quot;Privacy &amp; Security,&quot; toggle
                          &quot;Block All Cookies&quot; on or off
                        </li>
                        <li>
                          Tap &quot;Advanced&quot; → &quot;Website Data&quot; to
                          manage stored data
                        </li>
                      </ol>
                    </div>

                    {/* Edge */}
                    <div className="rounded-lg border border-border p-4 sm:p-5">
                      <h4 className="font-semibold text-foreground mb-2">
                        Microsoft Edge
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          Click the three-dot menu in the top-right corner and
                          select &quot;Settings&quot;
                        </li>
                        <li>
                          Click &quot;Cookies and site permissions&quot; in the
                          left sidebar
                        </li>
                        <li>
                          Click &quot;Manage and delete cookies and site
                          data&quot;
                        </li>
                        <li>
                          Configure your preferences for cookies and third-party
                          cookies
                        </li>
                      </ol>
                    </div>
                  </div>

                  {/* What happens if you disable cookies */}
                  <h3 className="text-lg font-semibold text-foreground pt-4">
                    What Happens If You Disable Cookies
                  </h3>
                  <p>
                    If you choose to disable all cookies, please note the
                    following:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        The core functionality of Background Remover (removing
                        backgrounds from images) will continue to work normally,
                        as it does not depend on cookies.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        Our cookie consent banner will appear each time you visit
                        the website, since we will not be able to remember your
                        previous consent choice.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        You will need to indicate your consent preference on
                        every visit, which may be inconvenient.
                      </span>
                    </li>
                  </ul>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 sm:p-5 my-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Important:</strong>{" "}
                      Disabling cookies in your browser does not delete cookies
                      that have already been set. To remove existing cookies, you
                      must delete them manually through your browser settings or
                      clear your browsing data.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. Cookie Consent */}
              <section id="cookie-consent" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">8.</span>
                  Cookie Consent
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In accordance with the EU Cookie Directive, ePrivacy
                    Directive, and GDPR, we obtain your consent before placing
                    any non-essential cookies on your device.
                  </p>
                  <p>
                    Our cookie consent mechanism works as follows:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      When you first visit our website, a cookie consent banner
                      is displayed at the bottom of the screen.
                    </li>
                    <li>
                      The banner provides clear information about the cookies we
                      use and their purposes.
                    </li>
                    <li>
                      You can acknowledge the banner by clicking
                      &quot;Got it,&quot; which dismisses it and stores your
                      preference. Since we only use essential localStorage,
                      there are no non-essential cookies to accept or reject.
                    </li>
                    <li>
                      Your choice is stored in browser localStorage under
                      the key <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">bg-remover-cookie-consent</code>
                      so that we can honor your preference on future visits.
                    </li>
                    <li>
                      You can change your consent preference at any time by
                      clearing the <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">bg-remover-cookie-consent</code> localStorage entry, which
                      will cause the banner to reappear.
                    </li>
                  </ol>
                  <p>
                    Because we only use one essential cookie (the consent
                    preference cookie itself), accepting or rejecting
                    non-essential cookies has no practical difference in terms of
                    additional cookies being placed — we never place
                    non-essential cookies regardless. However, the consent
                    mechanism ensures we comply with legal requirements and
                    respect your right to be informed.
                  </p>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 my-4">
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      <strong>Your Rights Under GDPR:</strong> Under the General
                      Data Protection Regulation, you have the right to withdraw
                      your consent at any time. Withdrawing consent does not
                      affect the lawfulness of processing based on consent before
                      its withdrawal. To withdraw consent, simply clear the
                      bg-remover-cookie-consent entry in your browser&apos;s localStorage
                      (via Developer Tools → Application → Local Storage) and then
                      reject cookies when the banner reappears.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 sm:p-5 my-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Your Rights Under CCPA:</strong>{" "}
                      Under the California Consumer Privacy Act (as amended by
                      the CPRA), California residents have the right to opt out of
                      the &quot;sale&quot; or &quot;sharing&quot; of their
                      personal information. Because we do not use any tracking,
                      advertising, or analytics cookies, and we do not sell or
                      share your personal information with third parties, there is
                      nothing for you to opt out of. However, if you wish to
                      exercise any of your CCPA rights, please contact us at the
                      email address listed below.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. Changes to Cookie Policy */}
              <section id="changes-to-cookie-policy" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">9.</span>
                  Changes to This Cookie Policy
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We may update this Cookie Policy from time to time to reflect
                    changes in our practices, technology, legal requirements, or
                    other factors. When we make changes, we will:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        Update the &quot;Last updated&quot; date at the top of
                        this page.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        If the changes are significant, display a prominent
                        notice on our website informing you of the update.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        Obtain new consent from you if the changes involve
                        introducing new categories of cookies that require
                        consent.
                      </span>
                    </li>
                  </ul>
                  <p>
                    We encourage you to review this Cookie Policy periodically to
                    stay informed about how we use cookies. Your continued use of
                    our website after any changes constitutes your acceptance of
                    the updated policy, subject to your consent preferences.
                  </p>
                </div>
              </section>

              {/* 10. Contact */}
              <section id="contact" className="scroll-mt-20">
                <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono text-lg">
                    10.
                  </span>
                  Contact Us
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    If you have any questions, concerns, or requests regarding
                    this Cookie Policy or our use of cookies, please contact us:
                  </p>
                  <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Email
                          </p>
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="text-foreground hover:text-emerald-600 transition-colors font-medium"
                          >
                            {CONTACT_EMAIL}
                          </a>
                        </div>
                      </div>
                      <div className="border-t border-border pt-3">
                        <p className="text-sm text-muted-foreground">
                          We will respond to your request within 30 days, or
                          sooner where required by applicable law. For GDPR
                          requests, we will respond without undue delay and no
                          later than one month from receipt of your request. For
                          CCPA requests, we will respond within 45 days, with a
                          possible 45-day extension where reasonably necessary.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p>
                    You also have the right to lodge a complaint with a data
                    protection supervisory authority in your jurisdiction if you
                    believe that our use of cookies violates applicable data
                    protection laws. In the EU, you can contact your national
                    Data Protection Authority. In the UK, you can contact the
                    Information Commissioner&apos;s Office (ICO). In California,
                    you can contact the California Privacy Protection Agency
                    (CPPA).
                  </p>
                </div>
              </section>
            </div>

            {/* ─── Bottom Navigation ────────────────────────────────── */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Background Remover</span>
              </Link>
            </div>
          </div>
        </main>

        {/* ─── Footer ────────────────────────────────────────────── */}
        <footer className="border-t border-border bg-muted/30 mt-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
              <span aria-hidden="true">·</span>
              <Link href="/dmca" className="hover:text-emerald-600 transition-colors">DMCA</Link>
            </nav>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Background Remover. All rights reserved.{" "}
              <Link
                href="/"
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                backgroundremover.app
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
