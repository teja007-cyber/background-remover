import Link from 'next/link'
import type { Metadata } from 'next'
import { Eraser, ArrowRight, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Background Removal Tips, Guides & Free Tools',
  description:
    'Learn how to remove backgrounds from images with our expert guides. Free AI background remover tips, e-commerce photo editing tutorials, and more.',
  openGraph: {
    title: 'Blog — Background Remover Tips & Guides',
    description: 'Learn how to remove backgrounds from images with our expert guides.',
  },
}

const posts = [
  {
    slug: 'how-to-remove-background-from-image',
    title: 'How to Remove Background from Any Image in Seconds (2026 Guide)',
    description:
      'Learn the fastest way to remove background from any image using AI. Step-by-step guide with tips for perfect results every time.',
    date: '2026-07-28',
    readTime: '5 min read',
    category: 'Guides',
    keywords: ['remove background', 'background removal guide', 'AI background remover'],
  },
  {
    slug: 'best-free-background-remover-tools',
    title: '10 Best Free Background Remover Tools Compared (2026 Review)',
    description:
      'We tested the top free background remover tools. See how our AI background remover compares to Photoshop, Remove.bg, and other alternatives.',
    date: '2026-07-27',
    readTime: '8 min read',
    category: 'Comparisons',
    keywords: ['best background remover', 'free background remover', 'background remover comparison'],
  },
  {
    slug: 'remove-white-background-ecommerce',
    title: 'How to Remove White Background from Product Photos for E-Commerce',
    description:
      'Remove white background from product images for Amazon, eBay, Shopify. Professional e-commerce photo editing guide with AI tools.',
    date: '2026-07-26',
    readTime: '6 min read',
    category: 'E-Commerce',
    keywords: ['remove white background', 'ecommerce photo editing', 'product photography'],
  },
  {
    slug: 'background-remover-vs-photoshop',
    title: 'AI Background Remover vs Photoshop: Which Is Better for Removing Backgrounds?',
    description:
      'Compare AI background remover tools vs Adobe Photoshop for removing backgrounds. Speed, quality, cost, and ease of use compared.',
    date: '2026-07-25',
    readTime: '7 min read',
    category: 'Comparisons',
    keywords: ['background remover vs photoshop', 'photoshop remove background', 'AI vs manual editing'],
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Eraser className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Background Remover Blog
              </h1>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-4">
            Remove Backgrounds Like a Pro
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
            Expert guides, tutorials, and tips for removing backgrounds from images.
            Learn how to get perfect transparent PNGs every time with AI-powered tools.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Try Our Free AI Background Remover
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Stop reading, start doing. Remove backgrounds from your images right now —
            completely free, no signup required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors text-lg"
          >
            Remove Background Now — Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
