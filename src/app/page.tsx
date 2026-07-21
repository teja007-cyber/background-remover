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
  Layers,
  X,
  FileImage,
  Archive,
  Clock,
  ChevronDown,
  ArrowRight,
  Globe,
  Lock,
  Heart,
  ImagePlus,
  Gauge,
  Palette,
  Cookie,
  FileText,
  Scale,
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

// ─── Types ───────────────────────────────────────────────────────

type AppMode = 'single' | 'batch'
type SingleState = 'idle' | 'processing' | 'done' | 'error'

interface BatchItem {
  id: string
  file: File
  name: string
  size: number
  originalDataUrl: string
  processedDataUrl: string | null
  status: 'pending' | 'processing' | 'done' | 'error'
  error?: string
  processingTime?: number
}

// ─── Constants ───────────────────────────────────────────────────

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
const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_BATCH_FILES = 10

// ─── Helpers ─────────────────────────────────────────────────────

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ─── FAQ Data ────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Is Background Remover really free?',
    a: 'Yes, 100% free. No hidden charges, no premium tiers, no watermarks. Every feature is available to everyone.',
  },
  {
    q: 'What image formats are supported?',
    a: 'Background Remover supports PNG, JPG/JPEG, and WebP. The output is always a high-quality transparent PNG.',
  },
  {
    q: 'Are my images stored on your servers?',
    a: 'No. Your images are processed in real-time and immediately deleted from our servers. We never store, share, or analyze your uploads.',
  },
  {
    q: 'Why does the full subject get preserved?',
    a: 'We use advanced AI padding technology that gives the model context beyond image edges, preventing any cutoff. Combined with alpha matting and edge recovery, your subject stays intact.',
  },
  {
    q: 'How many images can I process at once?',
    a: 'You can process up to 10 images simultaneously in Batch Mode. Each image is processed sequentially to ensure quality.',
  },
  {
    q: 'What is the maximum file size?',
    a: 'Each image can be up to 10MB. For best results, we recommend images under 2MB for faster processing.',
  },
  {
    q: 'Does Background Remover work on mobile devices?',
    a: 'Yes! Background Remover is fully responsive and works on any device — phones, tablets, and desktops.',
  },
  {
    q: 'Can I use the processed images commercially?',
    a: 'Absolutely. The output images are yours. Use them for e-commerce, design, presentations, social media — anything.',
  },
]

// ─── Main Component ──────────────────────────────────────────────

export default function Home() {
  const [mode, setMode] = useState<AppMode>('single')

  // Single image state
  const [singleState, setSingleState] = useState<SingleState>('idle')
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

  // Batch state
  const [batchItems, setBatchItems] = useState<BatchItem[]>([])
  const [batchProcessing, setBatchProcessing] = useState(false)
  const [batchCurrentIndex, setBatchCurrentIndex] = useState(-1)
  const [isBatchDragging, setIsBatchDragging] = useState(false)
  const batchFileInputRef = useRef<HTMLInputElement>(null)
  const batchAbortRef = useRef<AbortController | null>(null)

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Legal dialog state
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [dmcaOpen, setDmcaOpen] = useState(false)

  // Cookie consent state — lazy init to avoid calling setState in effect
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem('bg-remover-cookie-consent')
  })

  // Tool section ref for smooth scroll
  const toolRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
      if (batchAbortRef.current) batchAbortRef.current.abort()
    }
  }, [])

  const dismissCookieBanner = useCallback(() => {
    localStorage.setItem('bg-remover-cookie-consent', 'dismissed')
    setShowCookieBanner(false)
  }, [])

  // ─── Single: Handle File ─────────────────────────────────────

  const handleSingleFile = useCallback(async (file: File) => {
    if (!VALID_TYPES.includes(file.type)) {
      toast.error('Invalid file type', { description: 'Please upload a PNG, JPG, or WebP image.' })
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File too large', { description: 'Please upload an image smaller than 10MB.' })
      return
    }

    const dataUrl = await readFileAsDataUrl(file)
    setOriginalImage(dataUrl)
    const img = new window.Image()
    img.onload = () => setImageDimensions({ w: img.naturalWidth, h: img.naturalHeight })
    img.src = dataUrl

    setFileName(file.name)
    setFileSize(file.size)
    setSingleState('processing')
    setProgress(0)
    setErrorMsg('')
    setProcessingTime(0)

    let currentProgress = 0
    const startTime = Date.now()
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 6
      if (currentProgress >= 85) { currentProgress = 85; clearInterval(progressInterval) }
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

      if (!response.ok || !data.success) {
        setSingleState('error')
        setErrorMsg(data.error || `Server error (${response.status})`)
        toast.error('Processing failed', { description: data.error || 'Something went wrong.' })
        return
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
      setProcessingTime(Number(elapsed))
      setProgress(100)
      setTimeout(() => {
        setProcessedImage(data.image)
        setSingleState('done')
      }, 300)
      toast.success('Background removed!', { description: `Processed in ${elapsed}s` })
    } catch (err) {
      clearInterval(progressInterval)
      if (err instanceof DOMException && err.name === 'AbortError') return
      setSingleState('error')
      setErrorMsg('Failed to connect to the server. Please try again.')
      toast.error('Network error', { description: 'Failed to connect to the server.' })
    }
  }, [])

  // ─── Single: Drag/Drop/Click ─────────────────────────────────

  const handleSingleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleSingleFile(file)
  }, [handleSingleFile])

  const handleSingleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true) }, [])
  const handleSingleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false) }, [])
  const handleSingleClick = useCallback(() => { fileInputRef.current?.click() }, [])
  const handleSingleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleSingleFile(file)
  }, [handleSingleFile])

  const handleDownload = useCallback(() => {
    if (!processedImage) return
    const link = document.createElement('a')
    link.href = processedImage
    link.download = fileName.replace(/\.[^.]+$/, '') + '-no-bg.png'
    document.body.appendChild(link); link.click(); document.body.removeChild(link)
    toast.success('Download started!', { description: 'Saving as transparent PNG.' })
  }, [processedImage, fileName])

  const handleSingleReset = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort()
    setSingleState('idle')
    setOriginalImage(null); setProcessedImage(null); setProgress(0)
    setFileName(''); setFileSize(0); setImageDimensions(null); setErrorMsg(''); setProcessingTime(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  // ─── Batch: Add Files ────────────────────────────────────────

  const addBatchFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const newItems: BatchItem[] = []

    for (const file of fileArray) {
      if (!VALID_TYPES.includes(file.type)) {
        toast.error(`Skipped ${file.name}`, { description: 'Invalid file type.' })
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Skipped ${file.name}`, { description: 'File too large (max 10MB).' })
        continue
      }
      const dataUrl = await readFileAsDataUrl(file)
      newItems.push({
        id: generateId(), file, name: file.name, size: file.size,
        originalDataUrl: dataUrl, processedDataUrl: null, status: 'pending',
      })
    }

    setBatchItems(prev => {
      const combined = [...prev, ...newItems]
      if (combined.length > MAX_BATCH_FILES) {
        toast.warning(`Max ${MAX_BATCH_FILES} images. Extras trimmed.`)
        return combined.slice(0, MAX_BATCH_FILES)
      }
      return combined
    })

    if (newItems.length > 0) {
      toast.success(`${newItems.length} image${newItems.length > 1 ? 's' : ''} added`)
    }
  }, [])

  const handleBatchDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsBatchDragging(false)
    if (e.dataTransfer.files.length) addBatchFiles(e.dataTransfer.files)
  }, [addBatchFiles])

  const handleBatchDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsBatchDragging(true) }, [])
  const handleBatchDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsBatchDragging(false) }, [])
  const handleBatchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addBatchFiles(e.target.files)
  }, [addBatchFiles])

  const removeBatchItem = useCallback((id: string) => {
    setBatchItems(prev => prev.filter(item => item.id !== id))
  }, [])

  // ─── Batch: Process ──────────────────────────────────────────

  const processBatch = useCallback(async () => {
    const pendingItems = batchItems.filter(item => item.status === 'pending')
    if (pendingItems.length === 0) return

    setBatchProcessing(true)
    batchAbortRef.current = new AbortController()

    for (let i = 0; i < pendingItems.length; i++) {
      const item = pendingItems[i]
      setBatchCurrentIndex(i)

      setBatchItems(prev => prev.map(bi =>
        bi.id === item.id ? { ...bi, status: 'processing' as const } : bi
      ))

      const startTime = Date.now()

      try {
        const formData = new FormData()
        formData.append('file', item.file)

        const response = await fetch('/api/remove-bg', {
          method: 'POST',
          body: formData,
          signal: batchAbortRef.current?.signal,
        })

        const data = await response.json()
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)

        if (!response.ok || !data.success) {
          setBatchItems(prev => prev.map(bi =>
            bi.id === item.id ? { ...bi, status: 'error' as const, error: data.error || 'Failed' } : bi
          ))
          continue
        }

        setBatchItems(prev => prev.map(bi =>
          bi.id === item.id ? {
            ...bi, status: 'done' as const,
            processedDataUrl: data.image, processingTime: Number(elapsed),
          } : bi
        ))
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') break
        setBatchItems(prev => prev.map(bi =>
          bi.id === item.id ? { ...bi, status: 'error' as const, error: 'Network error' } : bi
        ))
      }
    }

    setBatchProcessing(false)
    setBatchCurrentIndex(-1)
    toast.success('Batch complete!', { description: 'Check your results below.' })
  }, [batchItems])

  // ─── Batch: Download ─────────────────────────────────────────

  const downloadBatchItem = useCallback((item: BatchItem) => {
    if (!item.processedDataUrl) return
    const link = document.createElement('a')
    link.href = item.processedDataUrl
    link.download = item.name.replace(/\.[^.]+$/, '') + '-no-bg.png'
    document.body.appendChild(link); link.click(); document.body.removeChild(link)
  }, [])

  const downloadAllBatch = useCallback(() => {
    const doneItems = batchItems.filter(item => item.status === 'done' && item.processedDataUrl)
    if (doneItems.length === 0) return
    doneItems.forEach((item, i) => {
      setTimeout(() => downloadBatchItem(item), i * 200)
    })
    toast.success(`Downloading ${doneItems.length} image${doneItems.length > 1 ? 's' : ''}`)
  }, [batchItems, downloadBatchItem])

  const resetBatch = useCallback(() => {
    if (batchAbortRef.current) batchAbortRef.current.abort()
    setBatchItems([]); setBatchProcessing(false); setBatchCurrentIndex(-1)
    if (batchFileInputRef.current) batchFileInputRef.current.value = ''
  }, [])

  const batchDoneCount = batchItems.filter(bi => bi.status === 'done').length
  const batchTotalCount = batchItems.length
  const batchProgressPercent = batchTotalCount > 0 ? Math.round((batchDoneCount / batchTotalCount) * 100) : 0

  const scrollToTool = useCallback(() => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Toaster position="top-center" richColors closeButton />

      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* ─── Header ───────────────────────────────────────────── */}
      <header role="banner" className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 backdrop-blur-lg dark:bg-slate-950/80">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm" aria-hidden="true">
              <Eraser className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-none">
                Background Remover
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                AI Background Remover
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex gap-1.5 px-2.5 py-0.5 text-xs">
              <Sparkles className="h-3 w-3 text-emerald-600" aria-hidden="true" />
              Free &amp; Private
            </Badge>
            <Button onClick={scrollToTool} size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hidden sm:flex">
              <Scissors className="h-3.5 w-3.5" aria-hidden="true" />
              Try Now
            </Button>
          </div>
        </nav>
      </header>

      <main id="main-content" role="main">

        {/* ─── Hero Section ───────────────────────────────────── */}
        <section aria-label="Hero" className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-40" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI-Powered · 100% Free · No Signup</span>
              </motion.div>

              {/* Heading — h1, the only h1 on the page */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-5 leading-[1.1]">
                Remove Any Background{' '}
                <span className="text-emerald-600 dark:text-emerald-400">in Seconds</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                Upload any image — our AI precisely removes the background while
                preserving every detail of your subject. Nothing gets cut off.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={scrollToTool}
                  size="lg"
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 min-w-[220px] h-12 text-base"
                >
                  <Scissors className="h-5 w-5" aria-hidden="true" />
                  Remove Background
                  <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 min-w-[180px] h-12 text-base border-slate-300 dark:border-slate-700"
                  onClick={() => {
                    setMode('batch')
                    setTimeout(scrollToTool, 100)
                  }}
                >
                  <Layers className="h-5 w-5" aria-hidden="true" />
                  Batch Mode
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Privacy First
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Instant Results
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Full Subject Preserved
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Tool Section ───────────────────────────────────── */}
        <section ref={toolRef} aria-label="Background removal tool" className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

            {/* Section header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                Start Removing Backgrounds
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Single image or batch — your choice.
              </p>
            </div>

            {/* Mode Tabs */}
            <div className="mb-8">
              <Tabs value={mode} onValueChange={(v) => setMode(v as AppMode)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
                  <TabsTrigger value="single" className="gap-2">
                    <ImageIcon className="h-4 w-4" aria-hidden="true" />
                    Single Image
                  </TabsTrigger>
                  <TabsTrigger value="batch" className="gap-2">
                    <Layers className="h-4 w-4" aria-hidden="true" />
                    Batch Process
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <AnimatePresence mode="wait">
              {/* ═══════════════════ SINGLE MODE ═══════════════════ */}
              {mode === 'single' && (
                <motion.div key="single-mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

                  {singleState === 'idle' && (
                    <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="mx-auto max-w-2xl">
                      <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                        <CardContent className="p-0">
                          <div
                            onClick={handleSingleClick}
                            onDrop={handleSingleDrop}
                            onDragOver={handleSingleDragOver}
                            onDragLeave={handleSingleDragLeave}
                            role="button"
                            tabIndex={0}
                            aria-label="Upload image: click or drag and drop"
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSingleClick() } }}
                            className={`
                              relative cursor-pointer transition-all duration-300 ease-in-out
                              border-2 border-dashed rounded-lg m-6 p-8 sm:p-12
                              flex flex-col items-center justify-center gap-4
                              min-h-[280px] sm:min-h-[320px]
                              focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2
                              ${isDragging
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 scale-[1.02]'
                                : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                              }
                            `}
                          >
                            <motion.div
                              className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${
                                isDragging ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                              }`}
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
                                <Badge key={fmt} variant="outline" className="text-xs font-mono text-slate-500 border-slate-200 dark:border-slate-700">{fmt}</Badge>
                              ))}
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Max 10MB per image</p>
                            <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.webp" onChange={handleSingleInputChange} className="hidden" aria-label="Upload image file" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {singleState === 'processing' && (
                    <motion.div key="processing" aria-live="polite" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="mx-auto max-w-2xl">
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
                          {originalImage && (
                            <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                              <img src={originalImage} alt="Original image being processed by AI background remover" className="w-full h-auto max-h-[400px] object-contain mx-auto opacity-60" width={imageDimensions?.w} height={imageDimensions?.h} />
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 dark:bg-slate-900/40">
                                <div className="flex flex-col items-center gap-3 bg-white/90 dark:bg-slate-900/90 rounded-2xl px-6 py-5 shadow-xl backdrop-blur-sm">
                                  <Loader2 className="h-10 w-10 text-emerald-600 animate-spin" aria-hidden="true" />
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Removing background...</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Preserving full subject with clean edges</p>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">Progress</span>
                              <span className="font-medium text-emerald-600 tabular-nums" aria-live="polite">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2.5 bg-slate-100 dark:bg-slate-800 [&>[data-slot=progress-indicator]]:bg-emerald-600" aria-label={`Processing progress: ${Math.round(progress)}%`} />
                          </div>
                          <div className="flex justify-center">
                            <Button variant="outline" onClick={handleSingleReset} className="gap-2">
                              <RefreshCw className="h-4 w-4" aria-hidden="true" />
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {singleState === 'done' && originalImage && processedImage && (
                    <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="mx-auto max-w-5xl">
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
                          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Background removed successfully!</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 truncate">
                            {fileName} &middot; {formatFileSize(fileSize)}
                            {imageDimensions && ` · ${imageDimensions.w}×${imageDimensions.h}`}
                            {processingTime > 0 && ` · ${processingTime}s`}
                          </p>
                        </div>
                      </motion.div>

                      <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-slate-900 dark:text-slate-50">Result</CardTitle>
                            <Badge variant="secondary" className="gap-1.5 text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40">
                              <Sparkles className="h-3 w-3" aria-hidden="true" />
                              Completed
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <ImageIcon className="h-4 w-4" aria-hidden="true" />Original
                              </div>
                              <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                                <img src={originalImage} alt="Original uploaded image before background removal" className="w-full h-auto max-h-[450px] object-contain" width={imageDimensions?.w} height={imageDimensions?.h} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <Eraser className="h-4 w-4 text-emerald-600" aria-hidden="true" />Background Removed
                              </div>
                              <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700" style={CHECKERBOARD_BG}>
                                <img src={processedImage} alt="Image with background removed showing transparent checkerboard pattern" className="w-full h-auto max-h-[450px] object-contain" width={imageDimensions?.w} height={imageDimensions?.h} />
                              </div>
                            </div>
                          </div>
                          <Separator className="my-6" />
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Button onClick={handleDownload} size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md min-w-[200px]">
                              <Download className="h-4 w-4" aria-hidden="true" />
                              Download PNG
                            </Button>
                            <Button variant="outline" onClick={handleSingleReset} size="lg" className="gap-2 min-w-[200px]">
                              <RefreshCw className="h-4 w-4" aria-hidden="true" />
                              Upload New Image
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {singleState === 'error' && (
                    <motion.div key="error" role="alert" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="mx-auto max-w-2xl">
                      <Card className="overflow-hidden shadow-lg border-red-200 dark:border-red-900">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                            Processing Failed
                          </CardTitle>
                          <CardDescription>{errorMsg || "We couldn't remove the background. Please try again."}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                            <p className="text-xs text-amber-800 dark:text-amber-200">
                              <strong>Tips:</strong> Try a clearer image with a distinct subject. Images under 2MB work best.
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <Button onClick={handleSingleReset} size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md min-w-[200px]">
                              <RefreshCw className="h-4 w-4" aria-hidden="true" />
                              Try Again
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ═══════════════════ BATCH MODE ═══════════════════ */}
              {mode === 'batch' && (
                <motion.div key="batch-mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mx-auto max-w-5xl">
                  {/* Upload Zone */}
                  <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800 mb-6">
                    <CardContent className="p-0">
                      <div
                        onClick={() => !batchProcessing && batchFileInputRef.current?.click()}
                        onDrop={handleBatchDrop}
                        onDragOver={handleBatchDragOver}
                        onDragLeave={handleBatchDragLeave}
                        role="button"
                        tabIndex={batchProcessing ? -1 : 0}
                        aria-label="Upload multiple images for batch processing"
                        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !batchProcessing) { e.preventDefault(); batchFileInputRef.current?.click() } }}
                        className={`
                          relative transition-all duration-300 ease-in-out
                          border-2 border-dashed rounded-lg m-6 p-6 sm:p-8
                          flex flex-col items-center justify-center gap-3 min-h-[180px]
                          ${batchProcessing ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                          ${isBatchDragging ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 scale-[1.02]' : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}
                        `}
                      >
                        <motion.div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
                            isBatchDragging ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                          }`}
                          aria-hidden="true"
                          animate={isBatchDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Layers className="h-6 w-6" />
                        </motion.div>
                        <div className="text-center space-y-1">
                          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                            {isBatchDragging ? 'Drop images here' : 'Drop multiple images or click to browse'}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            PNG, JPG, WebP · Max 10MB each · Up to {MAX_BATCH_FILES} images
                          </p>
                        </div>
                        <input ref={batchFileInputRef} type="file" accept=".png,.jpg,.jpeg,.webp" multiple onChange={handleBatchInputChange} className="hidden" aria-label="Upload multiple image files" disabled={batchProcessing} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Batch File List */}
                  {batchItems.length > 0 && (
                    <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800 mb-6">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <CardTitle className="text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
                            <FileImage className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                            Queue
                            <Badge variant="secondary" className="text-xs">{batchItems.length} image{batchItems.length !== 1 ? 's' : ''}</Badge>
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            {!batchProcessing && batchItems.some(bi => bi.status === 'pending') && (
                              <Button onClick={processBatch} size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
                                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                                Process All
                              </Button>
                            )}
                            {!batchProcessing && batchDoneCount > 0 && (
                              <Button onClick={downloadAllBatch} size="sm" variant="outline" className="gap-1.5">
                                <Archive className="h-3.5 w-3.5" aria-hidden="true" />
                                Download All ({batchDoneCount})
                              </Button>
                            )}
                            {!batchProcessing && (
                              <Button onClick={resetBatch} size="sm" variant="ghost" className="gap-1.5 text-slate-500">
                                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                                Clear
                              </Button>
                            )}
                            {batchProcessing && (
                              <Button onClick={() => { batchAbortRef.current?.abort(); setBatchProcessing(false); setBatchCurrentIndex(-1) }} size="sm" variant="destructive" className="gap-1.5">
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                                Stop
                              </Button>
                            )}
                          </div>
                        </div>
                        {batchProcessing && (
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" aria-hidden="true" />
                                Processing image {batchCurrentIndex + 1}...
                              </span>
                              <span className="font-medium text-emerald-600 tabular-nums">{batchProgressPercent}%</span>
                            </div>
                            <Progress value={batchProgressPercent} className="h-2 bg-slate-100 dark:bg-slate-800 [&>[data-slot=progress-indicator]]:bg-emerald-600" />
                          </div>
                        )}
                        {batchDoneCount > 0 && !batchProcessing && (
                          <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 mt-2">
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            {batchDoneCount} of {batchTotalCount} completed
                            {batchItems.filter(bi => bi.status === 'error').length > 0 && (
                              <span className="text-red-600 dark:text-red-400 ml-2">· {batchItems.filter(bi => bi.status === 'error').length} failed</span>
                            )}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                          {batchItems.map((item) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`
                                flex items-center gap-3 p-3 rounded-lg border transition-colors
                                ${item.status === 'done'
                                  ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20'
                                  : item.status === 'error'
                                  ? 'border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20'
                                  : item.status === 'processing'
                                  ? 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20'
                                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                                }
                              `}
                            >
                              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                                <img src={item.status === 'done' && item.processedDataUrl ? item.processedDataUrl : item.originalDataUrl} alt={`${item.name} thumbnail for batch background removal`} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{item.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {formatFileSize(item.size)}
                                  {item.processingTime ? ` · ${item.processingTime}s` : ''}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {item.status === 'pending' && (
                                  <Badge variant="outline" className="text-xs text-slate-500 dark:text-slate-400">
                                    <Clock className="h-3 w-3 mr-1" aria-hidden="true" />Pending
                                  </Badge>
                                )}
                                {item.status === 'processing' && (
                                  <Badge variant="secondary" className="text-xs text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/40">
                                    <Loader2 className="h-3 w-3 mr-1 animate-spin" aria-hidden="true" />Processing
                                  </Badge>
                                )}
                                {item.status === 'done' && (
                                  <>
                                    <Badge variant="secondary" className="text-xs text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40">
                                      <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />Done
                                    </Badge>
                                    <Button onClick={() => downloadBatchItem(item)} size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-emerald-600" aria-label={`Download ${item.name} with background removed`}>
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                {item.status === 'error' && (
                                  <Badge variant="destructive" className="text-xs">
                                    <AlertTriangle className="h-3 w-3 mr-1" aria-hidden="true" />Failed
                                  </Badge>
                                )}
                                {!batchProcessing && item.status !== 'processing' && (
                                  <Button onClick={() => removeBatchItem(item.id)} size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500" aria-label={`Remove ${item.name} from batch queue`}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Batch Results Preview */}
                  {batchItems.some(bi => bi.status === 'done' && bi.processedDataUrl) && (
                    <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
                            <Eye className="h-5 w-5 text-emerald-600" aria-hidden="true" />Results Preview
                          </CardTitle>
                          <Button onClick={downloadAllBatch} size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Download className="h-3.5 w-3.5" aria-hidden="true" />Download All
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {batchItems.filter(bi => bi.status === 'done' && bi.processedDataUrl).map(item => (
                            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="group relative">
                              <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 aspect-square" style={CHECKERBOARD_BG}>
                                <img src={item.processedDataUrl!} alt={`${item.name} with background removed, transparent PNG result`} className="w-full h-full object-contain p-2" />
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <Button onClick={() => downloadBatchItem(item)} size="sm" variant="secondary" className="gap-1.5">
                                    <Download className="h-3.5 w-3.5" aria-hidden="true" />Save
                                  </Button>
                                </div>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1.5 text-center">{item.name}</p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Empty state */}
                  {batchItems.length === 0 && (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                      {[
                        { icon: Layers, label: 'Up to 10 Images' },
                        { icon: Zap, label: 'Sequential Processing' },
                        { icon: Eye, label: 'Full Subject Preserved' },
                        { icon: Archive, label: 'Download All' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg py-2 px-3 border border-slate-100 dark:border-slate-800">
                          <Icon className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Features Section ───────────────────────────────── */}
        <section aria-label="Features" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs mb-4">
                <Zap className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                Why Choose Us
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                Everything You Need, Nothing You Don&apos;t
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Professional-grade background removal without the complexity or cost.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Scissors,
                  title: 'Full Subject Preserved',
                  desc: 'Advanced AI padding ensures every detail of your subject stays intact — no cutoff, no missing edges.',
                },
                {
                  icon: Layers,
                  title: 'Batch Processing',
                  desc: 'Upload up to 10 images at once. Process them all and download in one click.',
                },
                {
                  icon: Lock,
                  title: 'Privacy First',
                  desc: 'Your images are processed in real-time and immediately deleted. We never store or share your data.',
                },
                {
                  icon: Palette,
                  title: 'Transparent PNG Output',
                  desc: 'Every result is a high-quality transparent PNG ready for design, e-commerce, or presentations.',
                },
                {
                  icon: Gauge,
                  title: 'Lightning Fast',
                  desc: 'AI-powered processing completes in seconds, not minutes. No queues, no waiting.',
                },
                {
                  icon: Globe,
                  title: 'Works Everywhere',
                  desc: 'Fully responsive — works on any device, any browser. No downloads or installs needed.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="h-full border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4" aria-hidden="true">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">{title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works Section ───────────────────────────── */}
        <section aria-label="How it works" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs mb-4">
                <ImagePlus className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                Simple Process
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                Three Steps. Zero Hassle.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  icon: Upload,
                  title: 'Upload Your Image',
                  desc: 'Drag & drop, click to browse, or select multiple files for batch processing. We support PNG, JPG, and WebP.',
                },
                {
                  step: '02',
                  icon: Sparkles,
                  title: 'AI Does the Work',
                  desc: 'Our AI precisely identifies the subject and removes the background. Edge-padding technology ensures nothing gets cut off.',
                },
                {
                  step: '03',
                  icon: Download,
                  title: 'Download & Use',
                  desc: 'Get a crisp transparent PNG instantly. Use it for e-commerce, design projects, presentations, or social media.',
                },
              ].map(({ step, icon: Icon, title, desc }) => (
                <motion.div
                  key={step}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: parseInt(step) * 0.1 }}
                >
                  <div className="flex items-center justify-center mb-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25" aria-hidden="true">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">Step {step}</p>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Use Cases Section ──────────────────────────────── */}
        <section aria-label="Use cases" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                Built for Every Use Case
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                From e-commerce to design, get professional results every time.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                'E-Commerce',
                'Graphic Design',
                'Presentations',
                'Social Media',
                'Photo Editing',
                'Marketing',
              ].map((useCase) => (
                <motion.div
                  key={useCase}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <Heart className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{useCase}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ────────────────────────────────────── */}
        <section aria-label="Frequently asked questions" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs mb-4">
                <Eye className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                FAQ
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Card className="border-slate-200 dark:border-slate-800">
                    <button
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2 rounded-lg"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
                        {item.q}
                      </h3>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          role="region"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA Section ────────────────────────────────────── */}
        <section aria-label="Call to action" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25" aria-hidden="true">
                  <Eraser className="h-7 w-7" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Ready to Cut the Clutter?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
                Start removing backgrounds in seconds. Free forever, no signup, no watermarks.
              </p>
              <Button
                onClick={scrollToTool}
                size="lg"
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 min-w-[240px] h-13 text-base"
              >
                <Scissors className="h-5 w-5" aria-hidden="true" />
                Start for Free
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer role="contentinfo" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white" aria-hidden="true">
                  <Eraser className="h-4 w-4" />
                </div>
                <span className="text-base font-bold text-slate-900 dark:text-slate-50">Background Remover</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                AI-powered background removal tool. Free, private, and precise.
              </p>
            </div>

            {/* Features — using div with aria-label instead of orphaned h4 */}
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3" aria-label="Features" role="heading" aria-level={2}>Features</div>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>Single Image Removal</li>
                <li>Batch Processing</li>
                <li>Full Subject Preservation</li>
                <li>Transparent PNG Export</li>
              </ul>
            </div>

            {/* Info — using div with aria-label instead of orphaned h4 */}
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3" aria-label="Info" role="heading" aria-level={2}>Info</div>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li>100% Free — No Limits</li>
                <li>No Signup Required</li>
                <li>Privacy First — Never Stored</li>
                <li>Works on Any Device</li>
              </ul>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} Background Remover — Free AI Tool. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline-offset-2 hover:underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setTermsOpen(true)}
                className="text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline-offset-2 hover:underline"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setDmcaOpen(true)}
                className="text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline-offset-2 hover:underline"
              >
                DMCA
              </button>
              <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                Images processed securely &amp; never stored
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Legal Dialogs ────────────────────────────────────── */}

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              Privacy Policy
            </DialogTitle>
            <DialogDescription>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">1. What Data We Collect</h3>
              <p>When you use Background Remover, we temporarily receive the image files you upload for the purpose of removing their backgrounds. That is the only data we process. We do not collect names, email addresses, phone numbers, or any other personal information.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">2. How We Process Your Data</h3>
              <p>Uploaded images are sent to our AI background removal service for processing. The AI analyzes the image, identifies the subject, and removes the background. Processing occurs in real-time and the result is returned directly to your browser.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">3. Data Retention</h3>
              <p>Your images are deleted immediately after processing is complete. We do not store, cache, or retain any uploaded images or processed results on our servers. Once you close the page, the data is gone.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">4. Cookies</h3>
              <p>We use only essential cookies necessary for the basic functioning of this website. We do not use tracking cookies, analytics cookies, or advertising cookies. A single essential cookie is used to remember your cookie consent preference.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">5. Third-Party Sharing</h3>
              <p>We do not share your images, processed results, or any other data with third parties. Your data is never sold, rented, or distributed.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">6. Personal Data</h3>
              <p>We do not collect personal data. No account, no signup, no email — nothing that identifies you as an individual is collected or stored.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">7. GDPR Compliance</h3>
              <p>Background Remover is compliant with the General Data Protection Regulation (GDPR). Since we do not collect or store personal data, the risk of data breaches involving personal information is eliminated. If you are an EU resident and have any concerns, please contact us using the information below.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">8. CCPA Compliance</h3>
              <p>Background Remover is compliant with the California Consumer Privacy Act (CCPA). We do not sell personal information, we do not collect personal information beyond what is necessary for the service, and we do not share information with third parties. California residents have the right to know what data is collected — and the answer is: only the images you temporarily upload, which are deleted immediately.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">9. Children&apos;s Privacy</h3>
              <p>Background Remover is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will take steps to remove such information.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">10. Contact Information</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at: privacy@backgroundremover.app</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setPrivacyOpen(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              Terms of Service
            </DialogTitle>
            <DialogDescription>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">1. Acceptance of Terms</h3>
              <p>By accessing and using Background Remover, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our service.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">2. Description of Service</h3>
              <p>Background Remover is a free, AI-powered web application that removes backgrounds from images. The service processes uploaded images and returns transparent PNG files with the background removed.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">3. User Responsibilities</h3>
              <p>You represent and warrant that you own or have the legal right to upload and process any images you submit to Background Remover. You are solely responsible for ensuring that your use of the service complies with all applicable laws and regulations.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">4. Intellectual Property</h3>
              <p>You retain full ownership and intellectual property rights to all images you upload and the processed results. Background Remover does not claim any ownership or license over your images or outputs. The service is a tool — what you create with it belongs to you.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">5. Prohibited Uses</h3>
              <p>You may not use Background Remover to:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Process images depicting illegal content</li>
                <li>Process images involving child sexual abuse material (CSAM)</li>
                <li>Process images that infringe on someone&apos;s likeness or identity without authorization</li>
                <li>Process images that violate any applicable law or regulation</li>
                <li>Attempt to disrupt, overload, or compromise the service</li>
                <li>Use the service for any purpose that is unlawful or harmful</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">6. Service Availability</h3>
              <p>Background Remover is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do not guarantee uninterrupted or error-free service. We reserve the right to modify, suspend, or discontinue the service at any time without notice.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">7. Limitation of Liability</h3>
              <p>To the fullest extent permitted by law, Background Remover and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the service. This includes, without limitation, damages for loss of data, images, or profits.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">8. DMCA / Copyright Policy</h3>
              <p>We respect intellectual property rights. If you believe your copyrighted work has been processed through our service in a way that constitutes copyright infringement, please see our <button onClick={() => { setTermsOpen(false); setTimeout(() => setDmcaOpen(true), 200) }} className="text-emerald-600 dark:text-emerald-400 underline">DMCA Policy</button> for instructions on filing a notice.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">9. Governing Law</h3>
              <p>These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved in the courts of competent jurisdiction.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">10. Changes to Terms</h3>
              <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the service after any changes constitutes acceptance of the updated terms. We encourage you to review these terms periodically.</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setTermsOpen(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              I Agree
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DMCA / Copyright Policy Dialog */}
      <Dialog open={dmcaOpen} onOpenChange={setDmcaOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              DMCA / Copyright Policy
            </DialogTitle>
            <DialogDescription>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">1. Copyright Infringement Reporting</h3>
              <p>Background Remover respects the intellectual property rights of others and expects its users to do the same. If you believe that your copyrighted work has been copied or processed through our service in a way that constitutes copyright infringement, please notify us.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">2. DMCA Takedown Procedure</h3>
              <p>Pursuant to the Digital Millennium Copyright Act (17 U.S.C. § 512), copyright owners or their agents may submit a DMCA takedown notice to our designated copyright agent. To be valid, the notice must include:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing and that is to be removed</li>
                <li>Sufficient information to permit us to contact the complaining party (address, phone number, or email)</li>
                <li>A statement that the complaining party has a good faith belief that use of the material is not authorized</li>
                <li>A statement that the information in the notice is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the copyright owner</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">3. Counter-Notification</h3>
              <p>If you believe that your content was removed or disabled as a result of a mistake or misidentification, you may submit a counter-notification. To be valid, the counter-notification must include:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Your physical or electronic signature</li>
                <li>Identification of the material that was removed and the location where it previously appeared</li>
                <li>A statement under penalty of perjury that you have a good faith belief that the material was removed as a result of mistake or misidentification</li>
                <li>Your name, address, phone number, and a statement consenting to jurisdiction of the federal court in your district</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">4. Repeat Infringer Policy</h3>
              <p>In accordance with the DMCA and other applicable law, Background Remover has adopted a policy of terminating access for users who are found to be repeat infringers. We may terminate access for any user who has been the subject of multiple valid DMCA takedown notices.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">5. Contact for DMCA Notices</h3>
              <p>Please send all DMCA takedown notices and counter-notifications to: dmca@backgroundremover.app</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setDmcaOpen(false)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Cookie Consent Banner ────────────────────────────── */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-0"
          >
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-4 shadow-xl">
                <Cookie className="h-6 w-6 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left flex-1">
                  We only use essential cookies for basic site functionality. We do not track you, use analytics cookies, or share data with third parties.
                </p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    onClick={dismissCookieBanner}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
