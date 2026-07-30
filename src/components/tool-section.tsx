'use client'

import { useState, useRef, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  Download,
  RefreshCw,
  ImageIcon,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  FileImage,
  Archive,
  Layers,
  ChevronDown,
  ArrowRight,
  Eye,
  Scissors,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

const cookieConsent = typeof window !== 'undefined'
  ? window.localStorage.getItem('cookie-consent') === 'true'
  : false

export default function ToolSection() {
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

  // ─── Single Mode Handlers ──────────────────────────────────────

  const processImage = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const controller = new AbortController()
    abortControllerRef.current = controller

    const startTime = Date.now()

    const res = await fetch('/api/remove-background', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.error || `Server error (${res.status})`)
    }

    const blob = await res.blob()
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    setProcessingTime(Number(elapsed))

    return URL.createObjectURL(blob)
  }, [])

  const handleSingleFile = useCallback(
    async (file: File) => {
      if (!VALID_TYPES.includes(file.type)) {
        toast.error('Unsupported format', { description: 'Please upload PNG, JPG, or WebP.' })
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File too large', { description: 'Maximum file size is 10MB.' })
        return
      }

      setFileName(file.name)
      setFileSize(file.size)
      setErrorMsg('')
      setSingleState('processing')
      setProgress(0)

      try {
        const dataUrl = await readFileAsDataUrl(file)
        setOriginalImage(dataUrl)

        const img = new Image()
        img.onload = () => setImageDimensions({ w: img.naturalWidth, h: img.naturalHeight })
        img.src = dataUrl

        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + Math.random() * 20 + 5, 90))
        }, 300)

        const resultUrl = await processImage(file)
        clearInterval(progressInterval)
        setProgress(100)
        setProcessedImage(resultUrl)
        setSingleState('done')
        toast.success('Background removed!', { description: 'Your image is ready to download.' })
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return
        const msg = err instanceof Error ? err.message : 'Something went wrong'
        setErrorMsg(msg)
        setSingleState('error')
        toast.error('Processing failed', { description: msg })
      }
    },
    [processImage]
  )

  const handleSingleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleSingleFile(file)
    },
    [handleSingleFile]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleSingleFile(file)
    },
    [handleSingleFile]
  )

  const resetSingle = useCallback(() => {
    setSingleState('idle')
    setOriginalImage(null)
    setProcessedImage(null)
    setProgress(0)
    setFileName('')
    setFileSize(0)
    setImageDimensions(null)
    setErrorMsg('')
    setProcessingTime(0)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  const downloadResult = useCallback(() => {
    if (!processedImage) return
    const link = document.createElement('a')
    link.href = processedImage
    link.download = fileName.replace(/\.[^.]+$/, '') + '-bg-removed.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [processedImage, fileName])

  // ─── Batch Mode Handlers ───────────────────────────────────────

  const addBatchFiles = useCallback((files: File[]) => {
    const valid = files.filter(
      (f) => VALID_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE
    )
    if (valid.length === 0) {
      toast.error('No valid files', { description: 'Only PNG, JPG, and WebP under 10MB.' })
      return
    }
    const newItems: BatchItem[] = valid.map((file) => ({
      id: generateId(),
      file,
      name: file.name,
      size: file.size,
      originalDataUrl: '',
      processedDataUrl: null,
      status: 'pending',
    }))
    // Read data URLs
    Promise.all(
      newItems.map(async (item) => {
        const dataUrl = await readFileAsDataUrl(item.file)
        return { ...item, originalDataUrl: dataUrl }
      })
    ).then((resolved) => {
      setBatchItems((prev) => [...prev, ...resolved].slice(0, MAX_BATCH_FILES))
    })
  }, [])

  const handleBatchDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsBatchDragging(false)
      addBatchFiles(Array.from(e.dataTransfer.files))
    },
    [addBatchFiles]
  )

  const handleBatchSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) addBatchFiles(Array.from(e.target.files))
    },
    [addBatchFiles]
  )

  const removeBatchItem = useCallback((id: string) => {
    setBatchItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const processBatch = useCallback(async () => {
    const pending = batchItems.filter((i) => i.status === 'pending')
    if (pending.length === 0) return

    setBatchProcessing(true)
    const controller = new AbortController()
    batchAbortRef.current = controller

    for (let i = 0; i < batchItems.length; i++) {
      const item = batchItems[i]
      if (item.status !== 'pending' || item.processedDataUrl) continue

      setBatchCurrentIndex(i)
      setBatchItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, status: 'processing' } : p))
      )

      try {
        const startTime = Date.now()
        const resultUrl = await processImage(item.file)
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)

        setBatchItems((prev) =>
          prev.map((p) =>
            p.id === item.id
              ? { ...p, processedDataUrl: resultUrl, status: 'done', processingTime: Number(elapsed) }
              : p
          )
        )
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return
        const msg = err instanceof Error ? err.message : 'Error'
        setBatchItems((prev) =>
          prev.map((p) =>
            p.id === item.id ? { ...p, status: 'error', error: msg } : p
          )
        )
      }
    }

    setBatchProcessing(false)
    setBatchCurrentIndex(-1)
  }, [batchItems, processImage])

  const downloadBatchItem = useCallback((item: BatchItem) => {
    if (!item.processedDataUrl) return
    const link = document.createElement('a')
    link.href = item.processedDataUrl
    link.download = item.name.replace(/\.[^.]+$/, '') + '-bg-removed.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const downloadAllBatch = useCallback(() => {
    batchItems
      .filter((i) => i.processedDataUrl)
      .forEach((item) => {
        setTimeout(() => downloadBatchItem(item), 100 * batchItems.indexOf(item))
      })
  }, [batchItems, downloadBatchItem])

  const resetBatch = useCallback(() => {
    setBatchItems([])
    setBatchProcessing(false)
    setBatchCurrentIndex(-1)
    if (batchAbortRef.current) batchAbortRef.current.abort()
  }, [])

  // ─── Render ─────────────────────────────────────────────────────

  const doneCount = batchItems.filter((i) => i.status === 'done').length
  const pendingCount = batchItems.filter((i) => i.status === 'pending').length

  return (
    <section id="tool-section" aria-label="Background removal tool" className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Free AI Background Remover — Upload and Remove Instantly
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
            <motion.div
              key="single-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* IDLE STATE */}
              {singleState === 'idle' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-lg mx-auto"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Upload area for background removal. Click or drag an image."
                    className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 scale-[1.02]'
                        : 'border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleSingleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleFileSelect}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                        <Upload className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          Drop your image here
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          or click to browse · PNG, JPG, WebP · up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Badge variant="secondary" className="gap-1 px-2.5 py-0.5 text-xs">
                      <Sparkles className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                      Free &amp; Private
                    </Badge>
                    <Badge variant="secondary" className="gap-1 px-2.5 py-0.5 text-xs">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                      No Watermark
                    </Badge>
                  </div>
                </motion.div>
              )}

              {/* PROCESSING STATE */}
              {singleState === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto text-center"
                >
                  <div className="relative mb-6">
                    <div className="relative mx-auto w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                      {originalImage && (
                        <img
                          src={originalImage}
                          alt="Original image being processed"
                          className="w-full h-full object-contain"
                        />
                      )}
                      <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 animate-pulse">
                      Removing background...
                    </p>
                    <div className="max-w-xs mx-auto">
                      <Progress value={progress} className="h-2" aria-label={`${Math.round(progress)}% complete`} />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      AI analyzing image &middot; detecting edges &middot; preserving subject
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-slate-400"
                    onClick={resetSingle}
                    aria-label="Cancel processing"
                  >
                    Cancel
                  </Button>
                </motion.div>
              )}

              {/* DONE STATE */}
              {singleState === 'done' && processedImage && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Before */}
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Original</p>
                      <div
                        className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white"
                        style={{ minHeight: 200 }}
                      >
                        {originalImage && (
                          <img
                            src={originalImage}
                            alt={`Original image: ${fileName}`}
                            className="w-full h-full object-contain"
                            style={{ maxHeight: 300, margin: '0 auto' }}
                          />
                        )}
                      </div>
                      {imageDimensions && (
                        <p className="text-xs text-slate-400 mt-1">
                          {imageDimensions.w} &times; {imageDimensions.h} &middot; {formatFileSize(fileSize)}
                        </p>
                      )}
                    </div>

                    {/* After */}
                    <div className="text-center">
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                        Result <span className="text-slate-400 font-normal">({processingTime}s)</span>
                      </p>
                      <div
                        className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                        style={{ ...CHECKERBOARD_BG, minHeight: 200 }}
                      >
                        <img
                          src={processedImage}
                          alt="Image with background removed, preview on transparent checkerboard"
                          className="w-full h-full object-contain"
                          style={{ maxHeight: 300, margin: '0 auto' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                    <Button
                      onClick={downloadResult}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white min-w-[200px]"
                      size="lg"
                    >
                      <Download className="h-5 w-5" aria-hidden="true" />
                      Download PNG
                    </Button>
                    <Button variant="outline" onClick={resetSingle} className="gap-2 min-w-[160px]" size="lg">
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      Remove Another
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ERROR STATE */}
              {singleState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-sm mx-auto text-center"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Processing Failed</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{errorMsg}</p>
                    </div>
                    <Button variant="outline" onClick={resetSingle} className="gap-2">
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      Try Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ═══════════════════ BATCH MODE ═══════════════════ */}
          {mode === 'batch' && (
            <motion.div
              key="batch-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {batchItems.length === 0 && !batchProcessing && (
                <motion.div
                  key="batch-upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-lg mx-auto"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Batch upload area. Drop multiple images or click to select."
                    className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200 ${
                      isBatchDragging
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 scale-[1.02]'
                        : 'border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setIsBatchDragging(true) }}
                    onDragLeave={() => setIsBatchDragging(false)}
                    onDrop={handleBatchDrop}
                    onClick={() => batchFileInputRef.current?.click()}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') batchFileInputRef.current?.click() }}
                  >
                    <input
                      ref={batchFileInputRef}
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleBatchSelect}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                        <Archive className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          Drop up to {MAX_BATCH_FILES} images
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          or click to browse · PNG, JPG, WebP · 10MB each
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Badge variant="secondary" className="gap-1 px-2.5 py-0.5 text-xs">
                      <Archive className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                      Batch up to {MAX_BATCH_FILES}
                    </Badge>
                  </div>
                </motion.div>
              )}

              {/* BATCH ITEMS LIST */}
              {batchItems.length > 0 && (
                <motion.div
                  key="batch-list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto"
                >
                  {/* Batch header */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {batchItems.length} file{batchItems.length !== 1 ? 's' : ''}
                      {doneCount > 0 && ` · ${doneCount} done`}
                      {pendingCount > 0 && ` · ${pendingCount} pending`}
                    </p>
                    <div className="flex gap-2">
                      {doneCount > 0 && (
                        <Button variant="outline" size="sm" onClick={downloadAllBatch} className="gap-1.5 text-xs">
                          <Download className="h-3.5 w-3.5" aria-hidden="true" />
                          Download All
                        </Button>
                      )}
                      {!batchProcessing && pendingCount > 0 && (
                        <Button size="sm" onClick={processBatch} className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                          <Scissors className="h-3.5 w-3.5" aria-hidden="true" />
                          Process {pendingCount} file{pendingCount !== 1 ? 's' : ''}
                        </Button>
                      )}
                      {!batchProcessing && (
                        <Button variant="ghost" size="sm" onClick={resetBatch} className="text-xs">
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Batch items */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {batchItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          item.status === 'done'
                            ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                            : item.status === 'error'
                            ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                            : item.status === 'processing'
                            ? 'bg-sky-50 dark:bg-sky-900/10 border-sky-200 dark:border-sky-800'
                            : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                          {item.originalDataUrl && (
                            <img
                              src={item.originalDataUrl}
                              alt={`Preview for ${item.name}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.status === 'pending' && formatFileSize(item.size)}
                            {item.status === 'processing' && 'Processing...'}
                            {item.status === 'done' && `Done${item.processingTime ? ` (${item.processingTime}s)` : ''}`}
                            {item.status === 'error' && (item.error || 'Failed')}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-center gap-1">
                          {item.status === 'done' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => downloadBatchItem(item)} aria-label={`Download ${item.name}`}>
                              <Download className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                            </Button>
                          )}
                          {item.status === 'done' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeBatchItem(item.id)} aria-label={`Remove ${item.name} from list`}>
                              <X className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            </Button>
                          )}
                          {item.status === 'processing' && (
                            <Loader2 className="h-4 w-4 text-sky-500 animate-spin" aria-hidden="true" />
                          )}
                          {item.status === 'pending' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeBatchItem(item.id)} aria-label={`Remove ${item.name} from list`}>
                              <X className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add more button */}
                  {!batchProcessing && (
                    <div className="mt-3 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => batchFileInputRef.current?.click()}
                        className="gap-1.5 text-xs"
                        disabled={batchItems.length >= MAX_BATCH_FILES}
                      >
                        <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                        Add More Files
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
