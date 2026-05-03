import { useState, useEffect, useRef } from 'react'

interface AudioProps {
  title: string
  duration: string
  description: string
}

// Generate a stable pseudo-random waveform from the title string
function makeWaveform(seed: string, bars: number): number[] {
  const heights: number[] = []
  let h = 0
  for (let i = 0; i < bars; i++) {
    const c = seed.charCodeAt(i % seed.length)
    h = ((h * 31 + c) & 0xffff) / 0xffff
    // Bias toward mid-height with some peaks
    heights.push(0.2 + Math.abs(Math.sin(h * Math.PI * 3 + i * 0.4)) * 0.8)
  }
  return heights
}

export function AudioBlock({ title, duration, description }: AudioProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const BARS = 48
  const waveform = makeWaveform(title, BARS)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false)
            return 0
          }
          return p + 0.6
        })
      }, 80)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing])

  const progressBar = Math.floor((progress / 100) * BARS)

  // Format mm:ss for current position
  const [totalMin, totalSec] = duration.split(':').map(Number)
  const totalSeconds = (totalMin ?? 0) * 60 + (totalSec ?? 0)
  const elapsed = Math.round((progress / 100) * totalSeconds)
  const elapsedStr = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`

  return (
    <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[rgba(108,99,255,0.15)] border border-[rgba(108,99,255,0.25)] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 1v8M5 4a4 4 0 0 0 6 0" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 11c0 2.5 10 2.5 10 0" stroke="#6c63ff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest mb-0.5">Audio Narration</p>
          <p className="text-sm font-medium text-[#f0f1f5] leading-snug truncate">{title}</p>
          <p className="text-xs text-[#6b7280] mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex items-end gap-[2px] h-10 px-1">
        {waveform.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-colors duration-100"
            style={{
              height: `${h * 100}%`,
              backgroundColor: i < progressBar
                ? '#6c63ff'
                : i === progressBar
                  ? '#a78bfa'
                  : '#1e2130',
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-9 h-9 rounded-full bg-[#6c63ff] hover:bg-[#5b54e8] transition-colors flex items-center justify-center shrink-0"
        >
          {playing ? (
            <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3">
              <rect x="2" y="1" width="3" height="10" rx="1" />
              <rect x="7" y="1" width="3" height="10" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3">
              <path d="M3 1.5l7 4.5-7 4.5V1.5Z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="h-1 bg-[#1e2130] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6c63ff] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="text-xs text-[#3a3f52] tabular-nums shrink-0">
          {elapsedStr} / {duration}
        </span>
      </div>
    </div>
  )
}
