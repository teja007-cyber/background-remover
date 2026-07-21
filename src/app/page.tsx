'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eraser,
  Upload,
  Download,
  RefreshCw,
  ImageIcon,
  Loader2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { toast, Toaster } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

type AppState = 'idle' | 'processing' | 'done' | 'error'

const CHECKERBOARD_BG = {
  backgroundImage: [
    'linear-gradient(45deg, #e0e0e0 25%, transparent 25%)',
    'linear-gradient(-45deg, #e0e0e0 25%, transparent 25%)',
    'linear-gradient(45deg, transparent 75%, #e0e0e0 75%)',
    'linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
  ].join(', '),
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  backgroundColor: '#ffffff',
}

const VALID_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export default function Home() {
  const [state, setState] = useState<AppState>('idle')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!VALID_TYPES.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Please upload a PNG, JPG, JPEG, or WebP image.',
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Please upload an image smaller than 10MB.',
      })
      return
    }

    // Preview original
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setFileName(file.name)
    setState('processing')
    setProgress(0)

    // Simulate progress while waiting for API
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 8
      if (currentProgress >= 85) {
        currentProgress = 85
        clearInterval(progressInterval)
      }
      setProgress(Math.min(currentProgress, 85))
    }, 400)

    try {
      const formData = new FormData()
      formData.append('file', file)

      abortControllerRef.current = new AbortController()

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal,
      })

      const data = await response.json()
      clearInterval(progressInterval)

      if (data.success && data.image) {
        setProgress(100)
        setTimeout(() => {
          setProcessedImage(data.image)
          setState('done')
        }, 400)
        toast.success('Background removed successfully!', {
          description: 'Your image is ready to download.',
        })
      } else {
        setState('error')
        toast.error('Processing failed', {
          description: data.error || 'Something went wrong. Please try again.',
        })
      }
    } catch (err) {
      clearInterval(progressInterval)
      if (err instanceof DOMException && err.name === 'AbortError') return
      setState('error')
      toast.error('Network error', {
        description: 'Failed to connect to the server. Please try again.',
      })
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleDownload = useCallback(() => {
    if (!processedImage) return
    const link = document.createElement('a')
    link.href = processedImage
    link.download = fileName.replace(/\.[^.]+$/, '') + '-no-bg.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Download started!', {
      description: 'Your image is being saved.',
    })
  }, [processedImage, fileName])

  const handleReset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setState('idle')
    setOriginalImage(null)
    setProcessedImage(null)
    setProgress(0)
    setFileName('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Toaster position="top-center" richColors closeButton />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <Eraser className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                BG Remover
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Remove image backgrounds instantly
              </p>
            </div>
          </motion.div>
          <Badge
            variant="secondary"
            className="hidden sm:flex gap-1.5 px-3 py-1 text-xs"
          >
            <Sparkles className="h-3 w-3 text-emerald-600" />
            AI Powered
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {/* IDLE STATE - Upload Zone */}
          {state === 'idle' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl"
            >
              <div className="text-center mb-8">
                <motion.h2
                  className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Remove Any Background
                </motion.h2>
                <motion.p
                  className="text-slate-600 dark:text-slate-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Upload an image and let AI remove the background in seconds
                </motion.p>
              </div>

              <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                  <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                      relative cursor-pointer transition-all duration-300 ease-in-out
                      border-2 border-dashed rounded-lg m-6 p-8 sm:p-12
                      flex flex-col items-center justify-center gap-4
                      min-h-[280px] sm:min-h-[320px]
                      ${
                        isDragging
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 scale-[1.02]'
                          : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                      }
                    `}
                  >
                    <motion.div
                      className={`
                        flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300
                        ${
                          isDragging
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                        }
                      `}
                      animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Upload className="h-7 w-7" />
                    </motion.div>

                    <div className="text-center space-y-1.5">
                      <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                        {isDragging ? 'Drop your image here' : 'Drop your image here or click to browse'}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Select an image file from your device
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                      {['PNG', 'JPG', 'JPEG', 'WebP'].map((fmt) => (
                        <Badge
                          key={fmt}
                          variant="outline"
                          className="text-xs font-mono text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        >
                          {fmt}
                        </Badge>
                      ))}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
                      onChange={handleInputChange}
                      className="hidden"
                      aria-label="Upload image file"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>No Signup Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Privacy First</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROCESSING STATE */}
          {state === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl"
            >
              <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <Loader2 className="h-5 w-5 text-emerald-600 animate-spin" />
                    Processing Your Image
                  </CardTitle>
                  <CardDescription>
                    AI is removing the background from &ldquo;{fileName}&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Original image preview */}
                  {originalImage && (
                    <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                      <img
                        src={originalImage}
                        alt="Original image being processed"
                        className="w-full h-auto max-h-[400px] object-contain mx-auto opacity-60"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 dark:bg-slate-900/40">
                        <div className="flex flex-col items-center gap-3 bg-white/90 dark:bg-slate-900/90 rounded-2xl px-6 py-5 shadow-xl backdrop-blur-sm">
                          <div className="relative">
                            <Loader2 className="h-10 w-10 text-emerald-600 animate-spin" />
                          </div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            Removing background...
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Progress
                      </span>
                      <span className="font-medium text-emerald-600 tabular-nums">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2.5 bg-slate-100 dark:bg-slate-800 [&>[data-slot=progress-indicator]]:bg-emerald-600"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* DONE STATE - Before/After */}
          {state === 'done' && originalImage && processedImage && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-5xl"
            >
              {/* Success banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                    Background removed successfully!
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                    {fileName}
                  </p>
                </div>
              </motion.div>

              {/* Before / After Comparison */}
              <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-50">
                      Result
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="gap-1.5 text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40"
                    >
                      <Sparkles className="h-3 w-3" />
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Original */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <ImageIcon className="h-4 w-4" />
                        Original
                      </div>
                      <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                        <img
                          src={originalImage}
                          alt="Original image"
                          className="w-full h-auto max-h-[450px] object-contain"
                        />
                      </div>
                    </div>

                    {/* Arrow - visible on md+ */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    </div>

                    {/* Processed (with checkerboard) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Eraser className="h-4 w-4 text-emerald-600" />
                        Background Removed
                      </div>
                      <div
                        className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
                        style={CHECKERBOARD_BG}
                      >
                        <img
                          src={processedImage}
                          alt="Processed image with background removed"
                          className="w-full h-auto max-h-[450px] object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md min-w-[200px]"
                    >
                      <Download className="h-4 w-4" />
                      Download Result
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      size="lg"
                      className="gap-2 min-w-[200px]"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Upload New Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ERROR STATE */}
          {state === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl"
            >
              <Card className="overflow-hidden shadow-lg border-red-200 dark:border-red-900">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                    Processing Failed
                  </CardTitle>
                  <CardDescription>
                    We couldn&apos;t remove the background from your image. Please try
                    again with a different image.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {originalImage && (
                    <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                      <img
                        src={originalImage}
                        alt="Failed image"
                        className="w-full h-auto max-h-[300px] object-contain opacity-40 grayscale"
                      />
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Button
                      onClick={handleReset}
                      size="lg"
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md min-w-[200px]"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/60 backdrop-blur-sm dark:bg-slate-950/60 mt-auto">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            BG Remover — AI-powered background removal tool
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Your images are processed securely and never stored
          </p>
        </div>
      </footer>
    </div>
  )
}
