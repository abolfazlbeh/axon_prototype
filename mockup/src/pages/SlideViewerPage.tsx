import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { allCurricula } from '../data/curriculum'
import { SlideRenderer } from '../components/SlideRenderer'

export function SlideViewerPage() {
  const { chapterId, slideIndex } = useParams()
  const navigate = useNavigate()

  // Search across all curricula for the chapter
  const allChapters = allCurricula.flatMap((c) => c.chapters)
  const chapter = allChapters.find((c) => c.id === chapterId) ?? allChapters[0]

  // Find which curriculum this chapter belongs to (for breadcrumb)
  const parentCurriculum = allCurricula.find((c) => c.chapters.some((ch) => ch.id === chapter.id))
  const chapterIdx = (parentCurriculum?.chapters ?? []).findIndex((c) => c.id === chapter.id)

  const totalSlides = chapter.slides.length
  const currentIdx = parseInt(slideIndex ?? '0', 10)
  const slide = chapter.slides[Math.min(currentIdx, totalSlides - 1)]

  const [direction, setDirection] = useState(1)

  function goNext() {
    if (currentIdx < totalSlides - 1) {
      setDirection(1)
      navigate(`/slide/${chapter.id}/${currentIdx + 1}`)
    } else {
      navigate('/curriculum')
    }
  }

  function goPrev() {
    if (currentIdx > 0) {
      setDirection(-1)
      navigate(`/slide/${chapter.id}/${currentIdx - 1}`)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0d0e13]">
      {/* Top bar */}
      <div className="shrink-0 px-6 py-3.5 border-b border-[#1e2130] flex items-center gap-4">
        <button
          onClick={() => navigate('/curriculum')}
          className="text-[#3a3f52] hover:text-[#6b7280] transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#3a3f52] mb-0.5">
            <span className="text-[#3a3f52]">{parentCurriculum?.title}</span>
            <span>·</span>
            <span>Chapter {chapterIdx + 1}</span>
            <span>·</span>
            <span className="truncate text-[#6b7280]">{chapter.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {chapter.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(`/slide/${chapter.id}/${i}`)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i < currentIdx
                    ? 'bg-[#34d399] w-4'
                    : i === currentIdx
                      ? 'bg-[#6c63ff] w-6'
                      : 'bg-[#1e2130] w-4'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-xs text-[#3a3f52] shrink-0">
          {currentIdx + 1} / {totalSlides}
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-hidden px-8 py-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            <SlideRenderer slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 px-8 py-4 border-t border-[#1e2130] flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="flex items-center gap-2 text-sm text-[#6b7280] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#c8cad4] transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M10 3L5 8l5 5" />
          </svg>
          Previous
        </button>

        <div className="text-xs text-[#3a3f52] max-w-sm text-center truncate">{slide.purpose}</div>

        <button
          onClick={goNext}
          className="flex items-center gap-2 text-sm bg-[#6c63ff] text-white px-5 py-2 rounded-lg hover:bg-[#5b54e8] transition-colors font-medium"
        >
          {currentIdx < totalSlides - 1 ? 'Next' : 'Complete Chapter'}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
