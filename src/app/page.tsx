'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eraser,
  Upload,
  Download,
  RefreshCw,
  ImageIcon,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Eye,
  Scissors,
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
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function Home() {
  const [state, setState] = useState<AppState>('idle')
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState(0)
  const [imageDimensions, setImageDimensions] = useState<{ w: number; h: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [processingTime, setProcessingTime] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleFile = useCallback(async (file: File) => {
    // Validate type
    if (!VALID_TYPES.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Please upload a PNG, JPG, JPEG, or WebP image.',
      })
      return
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File too large', {
        description: 'Please upload an image smaller than 10MB.',
      })
      return
    }

    // Preview original
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setOriginalImage(dataUrl)
      // Get image dimensions
      const img = new window.Image()
      img.onload = () => {
        setImageDimensions({ w: img.naturalWidth, h: img.naturalHeight })
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)

    setFileName(file.name)
    setFileSize(file.size)
    setState('processing')
    setProgress(0)
    setErrorMsg('')
    setProcessingTime(0)

    // Simulate progress while waiting for API
    let currentProgress = 0
    const startTime = Date.now()
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 6
      if (currentProgress >= 85) {
        currentProgress = 85
        clearInterval(progressInterval)
      }
      setProgress(Math.min(currentProgress, 85))
    }, 500)

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

      if (!response.ok) {
        // Server returned an error
        setState('error')
        setErrorMsg(data.error || `Server error (${response.status})`)
        toast.error('Processing failed', {
          description: data.error || 'Something went wrong. Please try again.',
        })
        return
      }

      if (data.success && data.image) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
        setProcessingTime(Number(elapsed))
        setProgress(100)
        setTimeout(() => {
          setProcessedImage(data.image)
          setState('done')
        }, 300)
        toast.success('Background removed successfully!', {
          description: `Processed in ${elapsed}s`,
        })
      } else {
        setState('error')
        setErrorMsg(data.error || 'Unexpected response from server')
        toast.error('Processing failed', {
          description: data.error || 'Something went wrong. Please try again.',
        })
      }
    } catch (err) {
      clearInterval(progressInterval)
      if (err instanceof DOMException && err.name === 'AbortError') return
      setState('error')
      setErrorMsg('Failed to connect to the server. Please check your connection and try again.')
      toast.error('Network error', {
        description: 'Failed to connect to the server.',
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
      description: 'Your image is being saved as PNG.',
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
    setFileSize(0)
    setImageDimensions(null)
    setErrorMsg('')
    setProcessingTime(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Toaster position="top-center" richColors closeButton />

      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header role="banner" className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md" aria-hidden="true">
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
            <Sparkles className="h-3 w-3 text-emerald-600" aria-hidden="true" />
            AI Powered
          </Badge>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {/* IDLE STATE - Upload Zone */}
          {state === 'idle' && (
            <motion.section
              key="upload"
              aria-label="Image upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl"
            >
              <div className="text-center mb-8">
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Remove Any Background
                </motion.h2>
                <motion.p
                  className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Upload an image and let AI remove the background in seconds.
                  Full subject preserved — nothing gets cut off.
                </motion.p>
              </div>

              <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                  <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload image: click or drag and drop"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleClick()
                      }
                    }}
                    className={`
                      relative cursor-pointer transition-all duration-300 ease-in-out
                      border-2 border-dashed rounded-lg m-6 p-8 sm:p-12
                      flex flex-col items-center justify-center gap-4
                      min-h-[280px] sm:min-h-[320px]
                      focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2
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
                      aria-hidden="true"
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

                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Max file size: 10MB
                    </p>

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

              {/* Feature badges */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: ShieldCheck, label: '100% Free' },
                  { icon: Zap, label: 'No Signup' },
                  { icon: Eye, label: 'Full Subject Preserved' },
                  { icon: Scissors, label: 'Clean Edges' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg py-2 px-3 border border-slate-100 dark:border-slate-800"
                  >
                    <Icon className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* How it works */}
              <section aria-label="How it works" className="mt-10">
                <h3 className="text-center text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">
                  How It Works
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { step: '1', title: 'Upload', desc: 'Drag & drop or click to select any image' },
                    { step: '2', title: 'Process', desc: 'AI removes the background while preserving your subject' },
                    { step: '3', title: 'Download', desc: 'Get a transparent PNG ready for any use' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="text-center p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-bold mx-auto mb-2">
                        {step}
                      </div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.section>
          )}

          {/* PROCESSING STATE */}
          {state === 'processing' && (
            <motion.section
              key="processing"
              aria-label="Processing image"
              aria-live="polite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl"
            >
              <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <Loader2 className="h-5 w-5 text-emerald-600 animate-spin" aria-hidden="true" />
                    Processing Your Image
                  </CardTitle>
                  <CardDescription>
                    AI is removing the background from &ldquo;{fileName}&rdquo; ({formatFileSize(fileSize)})
                    {imageDimensions && ` — ${imageDimensions.w}×${imageDimensions.h}`}
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
                        width={imageDimensions?.w}
                        height={imageDimensions?.h}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 dark:bg-slate-900/40">
                        <div className="flex flex-col items-center gap-3 bg-white/90 dark:bg-slate-900/90 rounded-2xl px-6 py-5 shadow-xl backdrop-blur-sm">
                          <Loader2 className="h-10 w-10 text-emerald-600 animate-spin" aria-hidden="true" />
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            Removing background...
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Preserving full subject with clean edges
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
                      <span className="font-medium text-emerald-600 tabular-nums" aria-live="polite">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2.5 bg-slate-100 dark:bg-slate-800 [&>[data-slot=progress-indicator]]:bg-emerald-600"
                      aria-label={`Processing progress: ${Math.round(progress)}%`}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="gap-2"
                    >
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {/* DONE STATE - Before/After */}
          {state === 'done' && originalImage && processedImage && (
            <motion.section
              key="done"
              aria-label="Background removal result"
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
                role="alert"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white flex-shrink-0" aria-hidden="true">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                    Background removed successfully!
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                    {fileName} &middot; {formatFileSize(fileSize)}
                    {imageDimensions && ` · ${imageDimensions.w}×${imageDimensions.h}`}
                    {processingTime > 0 && ` · ${processingTime}s`}
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
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Original */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <ImageIcon className="h-4 w-4" aria-hidden="true" />
                        Original
                      </div>
                      <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                        <img
                          src={originalImage}
                          alt="Original image before background removal"
                          className="w-full h-auto max-h-[450px] object-contain"
                          width={imageDimensions?.w}
                          height={imageDimensions?.h}
                        />
                      </div>
                    </div>

                    {/* Processed (with checkerboard) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Eraser className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                        Background Removed
                      </div>
                      <div
                        className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
                        style={CHECKERBOARD_BG}
                      >
                        <img
                          src={processedImage}
                          alt="Image with background removed, showing on transparent checkerboard pattern"
                          className="w-full h-auto max-h-[450px] object-contain"
                          width={imageDimensions?.w}
                          height={imageDimensions?.h}
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
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download PNG
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      size="lg"
                      className="gap-2 min-w-[200px]"
                    >
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      Upload New Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {/* ERROR STATE */}
          {state === 'error' && (
            <motion.section
              key="error"
              aria-label="Processing error"
              role="alert"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-2xl"
            >
              <Card className="overflow-hidden shadow-lg border-red-200 dark:border-red-900">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                    Processing Failed
                  </CardTitle>
                  <CardDescription>
                    {errorMsg || "We couldn't remove the background from your image. Please try again."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {originalImage && (
                    <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                      <img
                        src={originalImage}
                        alt="Failed image preview"
                        className="w-full h-auto max-h-[300px] object-contain opacity-40 grayscale"
                        width={imageDimensions?.w}
                        height={imageDimensions?.h}
                      />
                    </div>
                  )}
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                      <strong>Tips:</strong> Try a clearer image with a distinct subject. Images under 2MB work best.
                      Very large images may take longer or fail due to memory constraints.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={handleReset}
                      size="lg"
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md min-w-[200px]"
                    >
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="border-t bg-white/60 backdrop-blur-sm dark:bg-slate-950/60 mt-auto">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} BG Remover — AI-powered background removal tool
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Privacy First
            </span>
            <span>Images processed securely & never stored</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
