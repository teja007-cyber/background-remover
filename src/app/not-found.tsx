import Link from 'next/link'
import { Eraser, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <Eraser className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-900 dark:text-slate-50 leading-none">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
            Page Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back to removing backgrounds!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/">
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white min-w-[200px]">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
