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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
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

  // ─── Single: Cleanup ─────────────────────────────────────────

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort()
      if (batchAbortRef.current) batchAbortRef.current.abort()
    }
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

    // Simulate progress
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

  // ─── Single: Download ────────────────────────────────────────

  const handleDownload = useCallback(() => {
    if (!processedImage) return
    const link = document.createElement('a')
    link.href = processedImage
    link.download = fileName.replace(/\.[^.]+$/, '') + '-no-bg.png'
    document.body.appendChild(link); link.click(); document.body.removeChild(link)
    toast.success('Download started!', { description: 'Saving as PNG.' })
  }, [processedImage, fileName])

  // ─── Single: Reset ───────────────────────────────────────────

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
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        originalDataUrl: dataUrl,
        processedDataUrl: null,
        status: 'pending',
      })
    }

    setBatchItems(prev => {
      const combined = [...prev, ...newItems]
      if (combined.length > MAX_BATCH_FILES) {
        toast.warning(`Only ${MAX_BATCH_FILES} images max. Extras were trimmed.`)
        return combined.slice(0, MAX_BATCH_FILES)
      }
      return combined
    })

    if (newItems.length > 0) {
      toast.success(`${newItems.length} image${newItems.length > 1 ? 's' : ''} added to batch`)
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

    // Process one at a time to avoid OOM
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
            ...bi,
            status: 'done' as const,
            processedDataUrl: data.image,
            processingTime: Number(elapsed),
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

    const doneCount = batchItems.filter(bi => bi.status === 'done' || pendingItems.some(p => p.id === bi.id)).length
    // We need to check final state after processing
    toast.success('Batch processing complete!', {
      description: `Check results below.`,
    })
  }, [batchItems])

  // ─── Batch: Download All ─────────────────────────────────────

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
      setTimeout(() => downloadBatchItem(item), i * 200) // stagger downloads
    })
    toast.success(`Downloading ${doneItems.length} image${doneItems.length > 1 ? 's' : ''}`)
  }, [batchItems, downloadBatchItem])

  // ─── Batch: Reset ────────────────────────────────────────────

  const resetBatch = useCallback(() => {
    if (batchAbortRef.current) batchAbortRef.current.abort()
    setBatchItems([])
    setBatchProcessing(false)
    setBatchCurrentIndex(-1)
    if (batchFileInputRef.current) batchFileInputRef.current.value = ''
  }, [])

  // ─── Batch: Progress ─────────────────────────────────────────

  const batchDoneCount = batchItems.filter(bi => bi.status === 'done').length
  const batchTotalCount = batchItems.length
  const batchProgressPercent = batchTotalCount > 0
    ? Math.round((batchDoneCount / batchTotalCount) * 100)
    : 0

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Toaster position="top-center" richColors closeButton />

      {/* Skip link */}
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
          <Badge variant="secondary" className="hidden sm:flex gap-1.5 px-3 py-1 text-xs">
            <Sparkles className="h-3 w-3 text-emerald-600" aria-hidden="true" />
            AI Powered
          </Badge>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Mode Tabs */}
        <div className="mx-auto max-w-4xl mb-8">
          <Tabs value={mode} onValueChange={(v) => setMode(v as AppMode)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
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

              {/* IDLE STATE */}
              {singleState === 'idle' && (
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
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                      Remove Any Background
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
                      Upload an image and let AI remove the background in seconds.
                      Full subject preserved — nothing gets cut off.
                    </p>
                  </div>

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
                            <Badge key={fmt} variant="outline" className="text-xs font-mono text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                              {fmt}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Max file size: 10MB</p>
                        <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg,.webp" onChange={handleSingleInputChange} className="hidden" aria-label="Upload image file" />
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
                      <div key={label} className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg py-2 px-3 border border-slate-100 dark:border-slate-800">
                        <Icon className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* How it works */}
                  <section aria-label="How it works" className="mt-10">
                    <h3 className="text-center text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">How It Works</h3>
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
              {singleState === 'processing' && (
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
                      {originalImage && (
                        <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                          <img src={originalImage} alt="Original image being processed" className="w-full h-auto max-h-[400px] object-contain mx-auto opacity-60" width={imageDimensions?.w} height={imageDimensions?.h} />
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
                </motion.section>
              )}

              {/* DONE STATE */}
              {singleState === 'done' && originalImage && processedImage && (
                <motion.section
                  key="done"
                  aria-label="Background removal result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-5xl"
                >
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
                            <ImageIcon className="h-4 w-4" aria-hidden="true" />
                            Original
                          </div>
                          <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                            <img src={originalImage} alt="Original image" className="w-full h-auto max-h-[450px] object-contain" width={imageDimensions?.w} height={imageDimensions?.h} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <Eraser className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                            Background Removed
                          </div>
                          <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700" style={CHECKERBOARD_BG}>
                            <img src={processedImage} alt="Image with background removed" className="w-full h-auto max-h-[450px] object-contain" width={imageDimensions?.w} height={imageDimensions?.h} />
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
                </motion.section>
              )}

              {/* ERROR STATE */}
              {singleState === 'error' && (
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
                      <CardDescription>{errorMsg || "We couldn't remove the background. Please try again."}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {originalImage && (
                        <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                          <img src={originalImage} alt="Failed image preview" className="w-full h-auto max-h-[300px] object-contain opacity-40 grayscale" width={imageDimensions?.w} height={imageDimensions?.h} />
                        </div>
                      )}
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
                </motion.section>
              )}
            </motion.div>
          )}

          {/* ═══════════════════ BATCH MODE ═══════════════════ */}
          {mode === 'batch' && (
            <motion.div key="batch-mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                    Batch Background Removal
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
                    Upload up to {MAX_BATCH_FILES} images at once. AI processes them one by one,
                    preserving the full subject in every image.
                  </p>
                </div>

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
                        flex flex-col items-center justify-center gap-3
                        min-h-[180px]
                        ${batchProcessing ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
                        ${isBatchDragging
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 scale-[1.02]'
                          : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                        }
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
                          {isBatchDragging ? 'Drop images here' : 'Drop multiple images here or click to browse'}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          PNG, JPG, WebP · Max 10MB each · Up to {MAX_BATCH_FILES} images
                        </p>
                      </div>
                      <input
                        ref={batchFileInputRef}
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        multiple
                        onChange={handleBatchInputChange}
                        className="hidden"
                        aria-label="Upload multiple image files"
                        disabled={batchProcessing}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Batch File List */}
                {batchItems.length > 0 && (
                  <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800 mb-6">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <CardTitle className="text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
                            <FileImage className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                            Queue
                            <Badge variant="secondary" className="text-xs">{batchItems.length} image{batchItems.length !== 1 ? 's' : ''}</Badge>
                          </CardTitle>
                        </div>
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
                      {/* Overall progress */}
                      {batchProcessing && (
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" aria-hidden="true" />
                              Processing image {batchCurrentIndex + 1} of {batchItems.filter(bi => bi.status !== 'done' && bi.status !== 'error').length + batchDoneCount}...
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
                            <span className="text-red-600 dark:text-red-400 ml-2">
                              · {batchItems.filter(bi => bi.status === 'error').length} failed
                            </span>
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
                            {/* Thumbnail */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                              <img
                                src={item.status === 'done' && item.processedDataUrl ? item.processedDataUrl : item.originalDataUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{item.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {formatFileSize(item.size)}
                                {item.processingTime ? ` · ${item.processingTime}s` : ''}
                              </p>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {item.status === 'pending' && (
                                <Badge variant="outline" className="text-xs text-slate-500 dark:text-slate-400">
                                  <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                                  Pending
                                </Badge>
                              )}
                              {item.status === 'processing' && (
                                <Badge variant="secondary" className="text-xs text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/40">
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" aria-hidden="true" />
                                  Processing
                                </Badge>
                              )}
                              {item.status === 'done' && (
                                <>
                                  <Badge variant="secondary" className="text-xs text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/40">
                                    <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
                                    Done
                                  </Badge>
                                  <Button onClick={() => downloadBatchItem(item)} size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-emerald-600" aria-label={`Download ${item.name}`}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {item.status === 'error' && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="h-3 w-3 mr-1" aria-hidden="true" />
                                  Failed
                                </Badge>
                              )}
                              {/* Remove button (only when not processing) */}
                              {!batchProcessing && item.status !== 'processing' && (
                                <Button onClick={() => removeBatchItem(item.id)} size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500" aria-label={`Remove ${item.name}`}>
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

                {/* Batch Results Preview (for done items) */}
                {batchItems.some(bi => bi.status === 'done' && bi.processedDataUrl) && (
                  <Card className="overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-slate-900 dark:text-slate-50 flex items-center gap-2">
                          <Eye className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                          Results Preview
                        </CardTitle>
                        <Button onClick={downloadAllBatch} size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white">
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                          Download All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {batchItems.filter(bi => bi.status === 'done' && bi.processedDataUrl).map(item => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="group relative"
                          >
                            <div
                              className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 aspect-square"
                              style={CHECKERBOARD_BG}
                            >
                              <img
                                src={item.processedDataUrl!}
                                alt={`${item.name} - background removed`}
                                className="w-full h-full object-contain p-2"
                              />
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Button onClick={() => downloadBatchItem(item)} size="sm" variant="secondary" className="gap-1.5">
                                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                                  Save
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

                {/* Empty state hint */}
                {batchItems.length === 0 && (
                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
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
              </div>
            </motion.div>
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
