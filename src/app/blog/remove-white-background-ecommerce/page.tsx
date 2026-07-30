import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Eraser } from 'lucide-react'
import JsonLd from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'How to Remove White Background from Product Photos for E-Commerce',
  description: 'Learn how to remove white background from product images for Amazon, eBay, and Shopify. Professional e-commerce photo editing guide with AI.',
  openGraph: {
    title: 'How to Remove White Background from Product Photos for E-Commerce',
    description: 'Professional guide to removing white backgrounds from product photos for Amazon, Shopify, eBay.',
  },
}

const structuredData = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: 'How to Remove White Background from Product Photos for E-Commerce',
  description: 'Guide to removing white backgrounds from product images for e-commerce platforms.',
  datePublished: '2026-07-26',
  author: { '@type': 'Organization', name: 'Background Remover' },
}

export default function EcommercePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/blog" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-emerald-600"><Eraser className="h-4 w-4" /> Background Remover</Link>
          </div>
        </header>
        <article className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-6">
            How to Remove White Background from Product Photos for E-Commerce
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            White background product photos sell better. Studies show that products with clean,
            white backgrounds have up to 94% higher conversion rates on e-commerce platforms.
            Here&apos;s how to remove white backgrounds from your product photos using AI.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Why Remove White Backgrounds?</h2>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              {[
                'Amazon requires pure white backgrounds (RGB 255,255,255) for main product images',
                'Shopify product pages convert better with consistent, clean backgrounds',
                'eBay listings with white background photos sell faster and at higher prices',
                'Etsy product images with removed backgrounds look more professional',
                'Social media product ads perform better with clear, distraction-free images',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2"><span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />{item}</li>
              ))}
            </ul>
          </section>

          <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 sm:p-8 mb-10 border border-emerald-100 dark:border-emerald-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">How to Remove White Background for Amazon & Shopify</h2>
            <ol className="space-y-4">
              {[
                { step: '1', title: 'Upload your product photo', desc: 'Drag and drop your product image into our free background remover. We support PNG, JPG, and WebP.' },
                { step: '2', title: 'AI removes the background instantly', desc: 'Our AI automatically detects your product and removes the white background, preserving every detail.' },
                { step: '3', title: 'Download transparent PNG', desc: 'Get a high-quality transparent PNG that you can place on any background — perfect for Amazon compliance.' },
                { step: '4', title: 'Add to your listing', desc: 'Upload your clean product image to Amazon, Shopify, eBay, or Etsy. Your product will stand out immediately.' },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">{item.step}</span>
                  <div><h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3><p className="text-slate-600 dark:text-slate-400">{item.desc}</p></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Best Practices for E-Commerce Product Photos</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Consistent sizing', desc: 'Use the same dimensions for all product photos in your catalog for a professional look.' },
                { title: 'High resolution', desc: 'Amazon recommends 1000x1000 pixels or larger. Higher resolution = better zoom capability.' },
                { title: 'Multiple angles', desc: 'Remove backgrounds from front, back, and side views. Consistency builds trust.' },
                { title: 'Lifestyle shots too', desc: 'While white background is required for main images, add lifestyle photos showing your product in use.' },
              ].map((tip) => (
                <div key={tip.title} className="bg-white dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{tip.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Remove Background from Product Photos Free</h2>
            <p className="text-emerald-100 mb-6">No signup, no watermarks. Start selling more today.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors">Remove Background Free</Link>
          </div>
        </article>
      </div>
    </>
  )
}
