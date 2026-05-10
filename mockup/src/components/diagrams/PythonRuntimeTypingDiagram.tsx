import type { CSSProperties, PointerEvent, WheelEvent } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const INTRO =
  'A short narration walking through how Python decides what type a variable is at runtime — and why that differs from statically typed languages like Java or C++.'

const ZOOM_MIN = 0.7
const ZOOM_MAX = 2.25
const ZOOM_STEP = 0.15

function ZoomToolbar({
  zoom,
  onZoom,
  onResetView,
}: {
  zoom: number
  onZoom: (z: number) => void
  onResetView: () => void
}) {
  return (
    <div
      className="sticky top-0 z-20 flex shrink-0 flex-wrap items-center justify-end gap-2 rounded-lg border border-[#1e2130] bg-[#13151c]/95 px-2.5 py-2 shadow-lg backdrop-blur-sm"
      role="toolbar"
      aria-label="Diagram zoom and view"
    >
      <span className="mr-auto text-[11px] font-medium text-[#6b7280]">View</span>
      <button
        type="button"
        className="rounded-md border border-[#3a3f52] bg-[#1a1d26] px-2.5 py-1 text-sm font-semibold text-[#c8cad4] transition hover:border-[#6c63ff]/50 hover:bg-[#1e2130] disabled:opacity-40"
        onClick={() => onZoom(zoom - ZOOM_STEP)}
        disabled={zoom <= ZOOM_MIN + 0.01}
        aria-label="Zoom out"
      >
        −
      </button>
      <span className="min-w-[3.25rem] text-center text-[12px] font-semibold tabular-nums text-[#a5b4fc]">
        {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        className="rounded-md border border-[#3a3f52] bg-[#1a1d26] px-2.5 py-1 text-sm font-semibold text-[#c8cad4] transition hover:border-[#6c63ff]/50 hover:bg-[#1e2130] disabled:opacity-40"
        onClick={() => onZoom(zoom + ZOOM_STEP)}
        disabled={zoom >= ZOOM_MAX - 0.01}
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        className="rounded-md border border-[#3a3f52] bg-[#1a1d26] px-2.5 py-1 text-[11px] font-medium text-[#9ca3af] transition hover:border-[#6c63ff]/50 hover:text-[#c8cad4]"
        onClick={onResetView}
      >
        Reset view
      </button>
    </div>
  )
}

function isInteractivePanTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest('button, a, input, textarea, select, [role="slider"], [data-no-pan]'),
  )
}

/** Rich visual for py_ch01_02b: static vs dynamic typing + animated variable binding */
export function PythonRuntimeTypingDiagram() {
  const [phase, setPhase] = useState(0)
  const [zoom, setZoom] = useState(1)
  const rid = useId().replace(/:/g, '')
  const viewportRef = useRef<HTMLDivElement>(null)
  const panRef = useRef<{ down: boolean; sx: number; sy: number; sl: number; st: number; id: number } | null>(
    null,
  )

  useEffect(() => {
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 2), 3200)
    return () => window.clearInterval(id)
  }, [])

  const setZoomClamped = (target: number) => {
    const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(target * 100) / 100))
    setZoom(Number.isFinite(next) ? next : 1)
  }

  const resetView = useCallback(() => {
    setZoom(1)
    const el = viewportRef.current
    if (el) {
      el.scrollTo({ left: 0, top: 0, behavior: 'auto' })
    }
  }, [])

  const handleWheelZoom = (e: WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    setZoom((z) => {
      const n = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + delta) * 100) / 100))
      return Number.isFinite(n) ? n : z
    })
  }

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.pointerType === 'touch') return
    if (isInteractivePanTarget(e.target)) return
    const el = viewportRef.current
    if (!el) return
    panRef.current = {
      down: true,
      sx: e.clientX,
      sy: e.clientY,
      sl: el.scrollLeft,
      st: el.scrollTop,
      id: e.pointerId,
    }
    el.setPointerCapture(e.pointerId)
    el.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const p = panRef.current
    if (!p?.down) return
    const el = viewportRef.current
    if (!el) return
    el.scrollLeft = p.sl - (e.clientX - p.sx)
    el.scrollTop = p.st - (e.clientY - p.sy)
  }, [])

  const endPan = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const p = panRef.current
    if (!p?.down) return
    panRef.current = null
    const el = viewportRef.current
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
      el.style.cursor = 'grab'
    }
  }, [])

  const staticBg = `prv-${rid}-static-bg`
  const arrRed = `prv-${rid}-arr-red`
  const arrGrn = `prv-${rid}-arr-grn`

  return (
    <div className="flex w-full min-w-0 max-w-[min(640px,100%)] flex-col gap-2">
      <ZoomToolbar zoom={zoom} onZoom={setZoomClamped} onResetView={resetView} />

      <div
        ref={viewportRef}
        data-diagram-viewport
        className="min-h-[min(520px,62vh)] w-full max-h-[min(92vh,1280px)] cursor-grab overflow-auto rounded-xl border border-[#1e2130] bg-[#0a0c10] p-2 sm:p-3 active:cursor-grabbing [&:active]:select-none"
        style={{ touchAction: 'pan-x pan-y' }}
        onWheel={handleWheelZoom}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
      >
        <div className="min-w-0" style={{ zoom } as CSSProperties}>
          <div className="flex min-w-0 flex-col gap-4 p-1">
            <p className="px-0.5 text-center text-[12px] leading-relaxed text-[#9ca3af] sm:text-[13px]">{INTRO}</p>

            <div className="grid min-w-[280px] grid-cols-2 gap-3">
              <motion.div
                className="relative overflow-hidden rounded-lg border border-red-400/25 bg-gradient-to-b from-red-950/40 to-[#0d0f14] p-2.5"
                initial={false}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(248,113,113,0)',
                    '0 0 20px -4px rgba(248,113,113,0.25)',
                    '0 0 0 0 rgba(248,113,113,0)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-red-300/90 sm:text-[12px]">
                  Static (Java, C++)
                </div>
                <svg
                  viewBox="0 0 320 160"
                  className="aspect-[2/1] h-auto min-h-[160px] w-full max-h-[240px]"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id={staticBg} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3f1212" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#1a0a0a" stopOpacity="0.3" />
                    </linearGradient>
                    <marker id={arrRed} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0 0 L8 4 L0 8 Z" fill="#f87171" opacity="0.85" />
                    </marker>
                  </defs>
                  <rect width="320" height="160" rx="10" fill={`url(#${staticBg})`} stroke="#f87171" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="18" y="18" width="200" height="44" rx="6" fill="#13151c" stroke="#3a3f52" strokeWidth="1.2" />
                  <text x="28" y="40" fill="#fca5a5" fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="500">
                    int x = &quot;no&quot;
                  </text>
                  <text x="28" y="58" fill="#9ca3af" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12">
                    compile-time check
                  </text>
                  <circle cx="262" cy="40" r="22" fill="#7f1d1d90" stroke="#f87171" strokeWidth="2" />
                  <text x="252" y="48" fill="#fecaca" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="22" fontWeight="700">
                    ✕
                  </text>
                  <text x="20" y="98" fill="#c8cad4" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="13">
                    Types checked before run
                  </text>
                  <text x="20" y="122" fill="#f87171" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="13" fontWeight="600">
                    Error: type mismatch
                  </text>
                  <path
                    d="M130 82 L130 104"
                    stroke="#f87171"
                    strokeOpacity="0.75"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    markerEnd={`url(#${arrRed})`}
                  />
                </svg>
              </motion.div>

              <motion.div
                className="relative overflow-hidden rounded-lg border border-emerald-400/25 bg-gradient-to-b from-emerald-950/35 to-[#0d0f14] p-2.5"
                initial={false}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(52,211,153,0)',
                    '0 0 20px -4px rgba(52,211,153,0.2)',
                    '0 0 0 0 rgba(52,211,153,0)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-300/90 sm:text-[12px]">
                  Python (runtime)
                </div>
                <svg
                  viewBox="0 0 320 160"
                  className="aspect-[2/1] h-auto min-h-[160px] w-full max-h-[240px]"
                  aria-hidden
                >
                  <defs>
                    <marker id={arrGrn} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0 0 L8 4 L0 8 Z" fill="#6ee7b7" opacity="0.9" />
                    </marker>
                  </defs>
                  <rect width="320" height="160" rx="10" fill="#0c1914" fillOpacity="0.85" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="16" y="20" width="150" height="36" rx="6" fill="#13151c" stroke="#34d399" strokeOpacity="0.45" strokeWidth="1.2" />
                  <text x="26" y="43" fill="#c678dd" fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="500">
                    x =
                  </text>
                  <text x="56" y="43" fill="#d19a66" fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="500">
                    100
                  </text>
                  <circle cx="258" cy="38" r="14" fill="#065f46" fillOpacity="0.65" stroke="#34d399" strokeWidth="2" />
                  <path d="M168 38h64" stroke="#6ee7b7" strokeOpacity="0.85" strokeWidth="2.2" markerEnd={`url(#${arrGrn})`} />
                  <text x="258" y="44" fill="#6ee7b7" fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="600" textAnchor="middle">
                    int
                  </text>
                  <text x="18" y="92" fill="#c8cad4" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="13">
                    Object &amp; type exist when line runs
                  </text>
                  <circle cx="72" cy="128" r="6" fill="#6c63ff" fillOpacity="0.45" />
                  <circle cx="108" cy="128" r="6" fill="#fbbf24" fillOpacity="0.45" />
                  <text x="90" y="150" fill="#9ca3af" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" textAnchor="middle">
                    many object types
                  </text>
                </svg>
              </motion.div>
            </div>

            <div className="rounded-lg border border-[#1e2130] bg-[#0f1218] p-3">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280] sm:text-[12px]">
                  Name → object (rebinding)
                </span>
                <motion.span
                  key={phase}
                  className="rounded-full border border-[#6c63ff]/40 bg-[#6c63ff]/15 px-2.5 py-1 text-[11px] font-semibold text-[#a5b4fc] sm:text-[12px]"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  Step {phase + 1} of 2 — live
                </motion.span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-2 font-mono text-[13px] sm:text-[14px]">
                <div className="space-y-2.5">
                  <motion.div
                    className="rounded-md border px-2.5 py-2"
                    animate={{
                      borderColor: phase === 0 ? 'rgba(108,99,255,0.55)' : 'rgba(62,64,75,0.5)',
                      backgroundColor: phase === 0 ? 'rgba(108,99,255,0.09)' : 'transparent',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-[#c678dd]">x</span>
                    <span className="text-[#9ca3af]"> = </span>
                    <span className="text-[#d19a66]">100</span>
                  </motion.div>
                  <motion.div
                    className="rounded-md border px-2.5 py-2"
                    animate={{
                      borderColor: phase === 1 ? 'rgba(108,99,255,0.55)' : 'rgba(62,64,75,0.5)',
                      backgroundColor: phase === 1 ? 'rgba(108,99,255,0.09)' : 'transparent',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-[#c678dd]">x</span>
                    <span className="text-[#9ca3af]"> = </span>
                    <span className="text-[#98c379]">&quot;hi&quot;</span>
                  </motion.div>
                </div>

                <div className="flex flex-col justify-center gap-[1.5rem] py-2">
                  <motion.div
                    className="text-xl leading-none text-[#6c63ff] sm:text-2xl"
                    animate={{
                      opacity: phase === 0 ? 1 : 0.2,
                      x: phase === 0 ? 0 : -3,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    aria-hidden
                  >
                    →
                  </motion.div>
                  <motion.div
                    className="text-xl leading-none text-[#6c63ff] sm:text-2xl"
                    animate={{
                      opacity: phase === 1 ? 1 : 0.2,
                      x: phase === 1 ? 0 : -3,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    aria-hidden
                  >
                    →
                  </motion.div>
                </div>

                <div className="flex flex-col items-center gap-2.5 pt-1">
                  <motion.div
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 shadow-lg sm:h-[4.5rem] sm:w-[4.5rem]"
                    animate={{
                      borderColor: phase === 0 ? '#34d399' : '#3f3f46',
                      scale: phase === 0 ? 1.06 : 1,
                      boxShadow:
                        phase === 0
                          ? '0 0 18px -2px rgba(52,211,153,0.45)'
                          : '0 0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <span className="text-[15px] font-bold text-[#d19a66] sm:text-[16px]">100</span>
                    <span className="text-[10px] font-semibold uppercase text-[#6ee7b7] sm:text-[11px]">int</span>
                  </motion.div>
                  <motion.div
                    className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 shadow-lg sm:h-[4.5rem] sm:w-[4.5rem]"
                    animate={{
                      borderColor: phase === 1 ? '#fbbf24' : '#3f3f46',
                      scale: phase === 1 ? 1.06 : 1,
                      boxShadow:
                        phase === 1
                          ? '0 0 18px -2px rgba(251,191,36,0.4)'
                          : '0 0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <span className="max-w-[58px] truncate text-center text-[13px] font-semibold text-[#98c379] sm:text-[14px]">
                      &quot;hi&quot;
                    </span>
                    <span className="text-[10px] font-semibold uppercase text-[#fcd34d] sm:text-[11px]">str</span>
                  </motion.div>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-3 text-[11px] leading-snug sm:text-[12px]"
              data-no-pan
            >
              <div className="rounded-md border border-red-400/20 bg-red-950/20 px-2.5 py-2 text-red-200/90">
                <span className="font-semibold text-red-300">Static:</span> compiler enforces types{' '}
                <span className="text-red-100/90">before</span> execution; bad assignments fail at compile time.
              </div>
              <div className="rounded-md border border-emerald-400/20 bg-emerald-950/20 px-2.5 py-2 text-emerald-200/90">
                <span className="font-semibold text-emerald-300">Python:</span> each assignment rebinds the name to an
                object — effective type is decided <span className="text-emerald-100/90">when that line runs</span>.
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] leading-snug text-[#5b6578]">
        <span className="block sm:inline">
          <strong className="text-[#6b7280]">Zoom:</strong> +/− or{' '}
          <kbd className="rounded border border-[#2d3344] bg-[#141821] px-1 font-mono text-[9px]">Ctrl</kbd> /{' '}
          <kbd className="rounded border border-[#2d3344] bg-[#141821] px-1 font-mono text-[9px]">⌘</kbd> + scroll.
        </span>{' '}
        <span className="block sm:inline">
          <strong className="text-[#6b7280]">Pan:</strong> drag inside the framed area (scroll wheels still scroll).
        </span>
      </p>
    </div>
  )
}
