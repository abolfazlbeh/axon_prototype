import { useState } from 'react'

interface VideoProps {
  title: string
  duration: string
  description: string
  thumbnail?: string
}

export function VideoBlock({ title, duration, description, thumbnail }: VideoProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative rounded-xl overflow-hidden bg-[#0d0e13] border border-[#1e2130] cursor-pointer group"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setPlaying((p) => !p)}
      >
        {/* Background / thumbnail */}
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-60" />
        ) : (
          /* Abstract animated background when no thumbnail */
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 225" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id={`vbg-${title.slice(0,4)}`} cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0d0e13" stopOpacity="1" />
                </radialGradient>
              </defs>
              <rect width="400" height="225" fill={`url(#vbg-${title.slice(0,4)})`} />
              {/* Grid lines */}
              {Array.from({ length: 8 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke="#6c63ff" strokeOpacity="0.06" strokeWidth="1" />
              ))}
              {Array.from({ length: 13 }, (_, i) => (
                <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="225" stroke="#6c63ff" strokeOpacity="0.06" strokeWidth="1" />
              ))}
              {/* Centre glow circle */}
              <circle cx="200" cy="112" r="60" fill="none" stroke="#6c63ff" strokeOpacity="0.12" strokeWidth="1" />
              <circle cx="200" cy="112" r="35" fill="none" stroke="#6c63ff" strokeOpacity="0.18" strokeWidth="1" />
            </svg>
          </div>
        )}

        {/* Play / pause overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
            playing
              ? 'bg-[rgba(108,99,255,0.9)] scale-95'
              : 'bg-[rgba(108,99,255,0.85)] group-hover:bg-[rgba(108,99,255,1)] group-hover:scale-105'
          }`}>
            {playing ? (
              <svg viewBox="0 0 16 16" fill="white" className="w-5 h-5">
                <rect x="3" y="2" width="4" height="12" rx="1" />
                <rect x="9" y="2" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="white" className="w-5 h-5">
                <path d="M4 2l10 6-10 6V2Z" />
              </svg>
            )}
          </div>
          <p className="text-xs font-medium text-white/70 text-center px-6 leading-snug">{title}</p>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded font-mono">
          {duration}
        </div>

        {/* Playing indicator bar */}
        {playing && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1e2130]">
            <div
              className="h-full bg-[#6c63ff] rounded-full"
              style={{
                width: '35%',
                animation: 'none',
              }}
            />
          </div>
        )}
      </div>

      {/* Caption */}
      <p className="text-xs text-[#6b7280] leading-relaxed">{description}</p>
    </div>
  )
}
