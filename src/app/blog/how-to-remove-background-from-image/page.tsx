import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Eraser, Clock, Calendar, Share2 } from 'lucide-react'
import JsonLd from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'How to Remove Background from Any Image in Seconds (2026 Guide)',
  description:
    'Learn how to remove background from any image using AI. Step-by-step guide with tips for perfect transparent PNG results. Free tool, no signup needed.',
  openGraph: {
    title: 'How to Remove Background from Any Image in Seconds (2026 Guide)',
    description: 'Step-by-step guide to remove backgrounds from images using AI. Free, no signup, no watermarks.',
  },
}

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Remove Background from Any Image in Seconds (2026 Guide)',
  description: 'Complete guide to removing backgrounds from images using AI technology. Includes tips for perfect results.',
  image: 'https://background-remover-ucpa.onrender.com/og-image.png',
  datePublished: '2026-07-28',
  dateModified: '2026-07-28',
  author: {
    '@type': 'Organization',
    name: 'Background Remover',
  },
}

export default function HowToRemoveBgPage() {
  return (
    <>
      <JsonLd data={articleStructuredData} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/blog" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
              <Eraser className="h-4 w-4" /> Background Remover
            </Link>
          </div>
        </header>

        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> July 28, 2026</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min read</span>
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-medium">Guides</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-6">
            How to Remove Background from Any Image in Seconds (2026 Guide)
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Removing backgrounds from images used to take hours of careful Photoshop work.
            With modern AI technology, you can now remove backgrounds from any image in just seconds —
            completely free, with no signup required.
          </p>

          {/* Quick steps */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 sm:p-8 mb-10 border border-emerald-100 dark:border-emerald-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              How to Remove Background from an Image in 3 Simple Steps
            </h2>
            <ol className="space-y-4">
              {[
                { step: '1', title: 'Upload Your Image', desc: 'Click the upload area or drag & drop your image. We support PNG, JPG, JPEG, and WebP formats up to 10MB.' },
                { step: '2', title: 'AI Processes Automatically', desc: 'Our AI instantly analyzes your image, identifies the subject, and removes the background with edge-padding technology.' },
                { step: '3', title: 'Download Your Transparent PNG', desc: 'Download your result as a high-quality transparent PNG, ready for use in any project.' },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Why Use AI to Remove Backgrounds?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Traditional background removal methods like Photoshop manual selection, magic wand tool, or
              green screen require significant skill and time. AI-powered background removal is:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-slate-600 dark:text-slate-400">
              {[
                'Faster — results in seconds, not hours',
                'Free — no expensive software subscriptions',
                'More accurate — AI detects edges precisely',
                'No signup — start removing instantly',
                'Batch processing — edit multiple images at once',
                'Full subject preservation — no cut-off edges',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Tips for Best Results When Removing Backgrounds
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Use high-resolution images', desc: 'Higher resolution images give the AI more pixels to work with, resulting in cleaner edges and better subject detection.' },
                { title: 'Ensure good contrast', desc: 'Images where the subject has good contrast against the background produce the best results with AI removal tools.' },
                { title: 'Avoid complex hair/fur', desc: 'While our AI handles hair and fur well, simpler edges produce the fastest and most accurate results.' },
                { title: 'Use batch mode for multiple images', desc: 'Need to remove backgrounds from many photos? Use our batch mode to process up to 10 images at once.' },
              ].map((tip) => (
                <div key={tip.title} className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{tip.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              What Can You Use Transparent PNG Images For?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Once you remove the background from an image, the possibilities are endless:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              {[
                'E-commerce product photos for Amazon, eBay, Shopify, and Etsy',
                'Social media content and marketing materials',
                'Presentation slides and business documents',
                'Graphic design projects and digital art',
                'Website design and UI elements',
                'Print materials like flyers, brochures, and catalogs',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-10 text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Remove a Background?
            </h2>
            <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
              Try our free AI background remover right now. No signup, no watermarks, no limits.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Remove Background Free
            </Link>
          </div>
        </article>

        {/* Footer nav */}
        <div className="border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors">
              ← Back to Blog
            </Link>
            <Link href="/blog/best-free-background-remover-tools" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              Next: Best Free Background Remover Tools →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
