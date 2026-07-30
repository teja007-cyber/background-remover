import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Eraser,
  Scissors,
  Upload,
  Download,
  Zap,
  ShieldCheck,
  Eye,
  Layers,
  FileText,
  ArrowRight,
  RefreshCw,
  Clock,
  CheckCircle2,
  Sparkles,
  Palette,
  Globe,
  Lock,
  Heart,
  ImagePlus,
  Gauge,
  FileImage,
  Archive,
} from 'lucide-react'
import JsonLd from '@/components/json-ld'

// Dynamic import — tool section loads only when needed
const ToolSection = dynamic(() => import('@/components/tool-section'), {
  ssr: false,
  loading: () => (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
            <Eraser className="h-7 w-7" />
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Loading background remover...
          </p>
        </div>
      </div>
    </section>
  ),
})

// ─── Structured Data ─────────────────────────────────────────────

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Background Remover',
  url: 'https://background-remover-ucpa.onrender.com',
  description: 'Free AI-powered background removal tool. Remove backgrounds from images instantly.',
}

const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Background Remover',
  url: 'https://background-remover-ucpa.onrender.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://background-remover-ucpa.onrender.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const webApplicationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Background Remover',
  url: 'https://background-remover-ucpa.onrender.com',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Remove Background from an Image',
  description: 'Remove background from any image in three simple steps using AI.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Upload Image', text: 'Upload your image in PNG, JPG, or WebP format.' },
    { '@type': 'HowToStep', position: 2, name: 'AI Processing', text: 'Our AI automatically detects the subject and removes the background.' },
    { '@type': 'HowToStep', position: 3, name: 'Download Result', text: 'Download your image as a transparent PNG, ready to use.' },
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is Background Remover really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, 100% free. No hidden charges, no premium tiers, no watermarks.' } },
    { '@type': 'Question', name: 'What image formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'PNG, JPG/JPEG, and WebP. Output is always a transparent PNG.' } },
    { '@type': 'Question', name: 'Are my images stored on your servers?', acceptedAnswer: { '@type': 'Answer', text: 'No. Images are processed in real-time and immediately deleted.' } },
    { '@type': 'Question', name: 'How many images can I process at once?', acceptedAnswer: { '@type': 'Answer', text: 'Up to 10 images in batch mode, or one at a time in single mode.' } },
  ],
}

// ─── Static Content Sections ─────────────────────────────────────

const features = [
  { icon: Eye, title: 'Full Subject Preserved', desc: 'AI edge-padding technology prevents subject cutoff. Every detail stays intact.' },
  { icon: Layers, title: 'Batch Processing', desc: 'Process up to 10 images at once. Save hours of manual editing time.' },
  { icon: ShieldCheck, title: 'Privacy First', desc: 'Your images are processed in real-time and never stored. 100% private.' },
  { icon: FileImage, title: 'Transparent PNG Output', desc: 'Download high-quality PNGs with transparent backgrounds, ready for any use.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'AI removes backgrounds in seconds, not minutes. Results in under 5 seconds.' },
  { icon: Globe, title: 'Works Everywhere', desc: 'No downloads needed. Works in any modern browser on desktop, tablet, or mobile.' },
]

const steps = [
  { icon: Upload, title: 'Upload Your Image', desc: 'Drop your PNG, JPG, or WebP image onto the upload area. Up to 10MB per image.' },
  { icon: Scissors, title: 'AI Does the Work', desc: 'Our AI instantly detects your subject, removes the background, and preserves fine details like hair and edges.' },
  { icon: Download, title: 'Download & Use', desc: 'Download a transparent PNG. No watermarks, no signup. Ready for e-commerce, design, or social media.' },
]

const useCases = [
  { icon: ShoppingCart, title: 'E-Commerce', desc: 'Create professional product photos for Amazon, Shopify, and eBay.' },
  { icon: Palette, title: 'Design', desc: 'Extract subjects for graphic design, presentations, and digital art.' },
  { icon: Globe, title: 'Social Media', desc: 'Remove backgrounds for Instagram, TikTok, and marketing content.' },
  { icon: Heart, title: 'Personal', desc: 'Edit family photos, create memes, and have fun with image editing.' },
]

const faqItems = [
  { q: 'Is Background Remover really free?', a: 'Yes, 100% free. No hidden charges, no premium tiers, no watermarks. Every feature is available to everyone.' },
  { q: 'What image formats are supported?', a: 'Background Remover supports PNG, JPG/JPEG, and WebP. The output is always a high-quality transparent PNG.' },
  { q: 'Are my images stored on your servers?', a: 'No. Your images are processed in real-time and immediately deleted from our servers. We never store, share, or analyze your uploads.' },
  { q: 'Why does the full subject get preserved?', a: 'We use advanced AI padding technology that gives the model context beyond image edges, preventing any cutoff. Combined with alpha matting and edge recovery, your subject stays intact.' },
  { q: 'How many images can I process at once?', a: 'You can process up to 10 images in batch mode, or one at a time in single mode. Both free.' },
  { q: 'What is the maximum file size?', a: 'Each image can be up to 10MB. Most high-resolution photos fit well within this limit.' },
  { q: 'Does it work on mobile devices?', a: 'Yes! Background Remover works in any modern browser, including Safari, Chrome, and Firefox on iOS and Android.' },
  { q: 'Can I use the processed images commercially?', a: 'Absolutely. The output images are yours. Use them for e-commerce, design, presentations, social media — anything.' },
]

const blogPosts = [
  { href: '/blog/how-to-remove-background-from-image', title: 'How to Remove Background from Any Image in Seconds', desc: 'Step-by-step guide to removing backgrounds with AI.', cat: 'Guides' },
  { href: '/blog/best-free-background-remover-tools', title: '10 Best Free Background Remover Tools Compared', desc: 'See how our tool compares to Remove.bg, Photoshop, and 8 others.', cat: 'Comparisons' },
  { href: '/blog/remove-white-background-ecommerce', title: 'Remove White Background for E-Commerce Photos', desc: 'Amazon, Shopify & eBay product photo editing guide.', cat: 'E-Commerce' },
  { href: '/blog/background-remover-vs-photoshop', title: 'AI Remover vs Photoshop: Which Is Better?', desc: 'Speed, quality, cost and ease of use compared side-by-side.', cat: 'Comparisons' },
]

// Simple CSS animation classes
const fadeIn = ''

export default function Home() {
  return (
    <>
      <JsonLd data={organizationStructuredData} />
      <JsonLd data={websiteStructuredData} />
      <JsonLd data={webApplicationStructuredData} />
      <JsonLd data={howToStructuredData} />
      <JsonLd data={faqStructuredData} />

      {/* ─── Header Nav ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16" aria-label="Main navigation">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Eraser className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight text-slate-900 dark:text-slate-50">
                Background<br />Remover
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/#tool-section" className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Free &amp; Private
            </a>
            <a
              href="/#tool-section"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Scissors className="h-3.5 w-3.5" aria-hidden="true" />
              Try Now
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content" role="main">
        {/* ─── Hero Section ─────────────────────────────────────── */}
        <section aria-label="Hero" className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-40" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
            <div className={`max-w-3xl mx-auto text-center ${fadeIn}`}>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 mb-6">
                <Sparkles className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Free AI Background Remover — No Signup
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50 leading-[1.1] tracking-tight mb-6">
                Remove Any Background in Seconds
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                Remove backgrounds from any image instantly with AI.
                <strong className="text-slate-900 dark:text-slate-200"> 100% free</strong>,
                no signup, no watermarks. Full subject preservation, batch processing,
                transparent PNG output.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/#tool-section"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/25 text-lg"
                >
                  <Scissors className="h-5 w-5" aria-hidden="true" />
                  Remove Background Free
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium px-6 py-4 transition-colors"
                >
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  Read the Guide
                </a>
              </div>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Free Forever</span>
                <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-emerald-500" aria-hidden="true" /> No Upload Storage</span>
                <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Instant Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Tool Section (dynamically loaded) ────────────────── */}
        <ToolSection />

        {/* ─── Features Section ──────────────────────────────────── */}
        <section aria-label="Features" className="py-16 sm:py-24" style={{ contentVisibility: 'auto' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                AI Background Remover Features for Perfect Results
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Everything you need to remove backgrounds and create professional transparent PNGs.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ──────────────────────────────────────── */}
        <section aria-label="How it works" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50" style={{ contentVisibility: 'auto' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                How to Remove Background from Image in 3 Simple Steps
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                No tutorials needed. Just upload, wait a moment, and download your transparent PNG.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                        <step.icon className="h-8 w-8" aria-hidden="true" />
                      </div>
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-emerald-600 text-xs font-bold border border-emerald-200 dark:border-emerald-700">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Use Cases ─────────────────────────────────────────── */}
        <section aria-label="Use cases" className="py-16 sm:py-24" style={{ contentVisibility: 'auto' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Remove Background for E-Commerce, Design, Social Media &amp; More
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                From Amazon product photos to Instagram content — our tool handles it all.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {useCases.map((uc) => (
                <div key={uc.title} className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
                    <uc.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{uc.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────────────── */}
        <section aria-label="Frequently asked questions" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50" style={{ contentVisibility: 'auto' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="group bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-base font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors list-none">
                    {item.q}
                    <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Blog Section ──────────────────────────────────────── */}
        <section aria-label="Latest blog articles" className="py-16 sm:py-20 bg-slate-50/50 dark:bg-slate-900/30" style={{ contentVisibility: 'auto' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Latest from our Blog
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Background Removal Tips &amp; Guides
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Learn how to remove backgrounds like a pro. Expert tips for e-commerce, design, and social media.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group block h-full bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300"
                >
                  <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full mb-3">
                    {post.cat}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {post.desc}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                View All Articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CTA Section ───────────────────────────────────────── */}
        <section aria-label="Call to action" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25" aria-hidden="true">
                  <Eraser className="h-7 w-7" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Remove Any Background for Free — No Signup Required
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
                Start removing backgrounds in seconds. Free forever, no signup, no watermarks.
              </p>
              <a
                href="/#tool-section"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-600/25 text-base min-w-[240px]"
              >
                <Scissors className="h-5 w-5" aria-hidden="true" />
                Start for Free
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <footer role="contentinfo" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Eraser className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-50">Background Remover</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Free AI-powered background removal tool. Remove backgrounds from any image instantly.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Tool</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/#tool-section" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Remove Background</a></li>
                <li><Link href="/blog" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Learn</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog/how-to-remove-background-from-image" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">How to Remove Background</Link></li>
                <li><Link href="/blog/best-free-background-remover-tools" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Best Free Tools</Link></li>
                <li><Link href="/blog/background-remover-vs-photoshop" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">AI vs Photoshop</Link></li>
                <li><Link href="/blog/remove-white-background-ecommerce" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">E-Commerce Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="/dmca" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">DMCA</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Background Remover. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

// Re-export icons used as components
function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
}
