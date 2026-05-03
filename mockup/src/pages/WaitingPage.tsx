import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const STAGES = [
  { label: 'Analyzing your learning profile', duration: 1800 },
  { label: 'Planning curriculum structure', duration: 2200 },
  { label: 'Generating Chapter 1 content', duration: 3000 },
  { label: 'Creating quizzes and exercises', duration: 2000 },
  { label: 'Running coherence check', duration: 1500 },
  { label: 'Finalizing your course', duration: 1200 },
]

export function WaitingPage() {
  const navigate = useNavigate()
  const [currentStage, setCurrentStage] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let stageIdx = 0
    let timeout: ReturnType<typeof setTimeout>

    function next() {
      if (stageIdx < STAGES.length - 1) {
        stageIdx++
        setCurrentStage(stageIdx)
        timeout = setTimeout(next, STAGES[stageIdx].duration)
      } else {
        setTimeout(() => setDone(true), 800)
      }
    }

    timeout = setTimeout(next, STAGES[0].duration)
    return () => clearTimeout(timeout)
  }, [])

  const progress = done ? 100 : Math.round(((currentStage) / (STAGES.length - 1)) * 90)

  return (
    <div className="min-h-screen bg-[#0d0e13] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Animated logo */}
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="relative w-16 h-16"
          >
            <div className="absolute inset-0 rounded-full border-2 border-[#1e2130]" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#6c63ff]"
              style={{ transform: 'rotate(0deg)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 rounded-lg bg-[#6c63ff] flex items-center justify-center">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M8 2L14 12H2L8 2Z" fill="white" opacity="0.9" />
                  <circle cx="8" cy="10" r="2.5" fill="white" opacity="0.6" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {!done ? (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#f0f1f5]">Building your course</h1>
              <p className="text-[#6b7280] text-sm">
                Axon is generating personalized content for{' '}
                <span className="text-[#c8cad4]">Python Programming from Scratch</span>
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-3">
              <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#6c63ff] rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#3a3f52]">
                <span>{progress}% complete</span>
                <span>~{Math.max(1, Math.round((STAGES.length - 1 - currentStage) * 1.5))} sec remaining</span>
              </div>
            </div>

            {/* Stage list */}
            <div className="space-y-2 text-left">
              {STAGES.map((stage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= currentStage ? 1 : 0.25, x: 0 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    i < currentStage
                      ? 'bg-[#34d399]'
                      : i === currentStage
                        ? 'border-2 border-[#6c63ff]'
                        : 'border border-[#1e2130]'
                  }`}>
                    {i < currentStage && (
                      <svg viewBox="0 0 8 8" fill="none" className="w-2.5 h-2.5">
                        <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {i === currentStage && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-[#6c63ff]"
                      />
                    )}
                  </div>
                  <span className={i === currentStage ? 'text-[#c8cad4]' : i < currentStage ? 'text-[#6b7280]' : 'text-[#3a3f52]'}>
                    {stage.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-[#3a3f52]">
              We'll notify you when your course is ready. You can leave this tab.
            </p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5"
          >
            <div className="w-14 h-14 rounded-full bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.3)] flex items-center justify-center mx-auto">
              <svg viewBox="0 0 20 20" fill="none" className="w-7 h-7">
                <path d="M4 10l4 4 8-8" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#f0f1f5] mb-2">Your course is ready</h1>
              <p className="text-[#6b7280] text-sm">
                <span className="text-[#c8cad4]">Python Programming from Scratch</span> — 2 chapters, 10 slides
              </p>
            </div>
            <button
              onClick={() => navigate('/curriculum')}
              className="w-full bg-[#6c63ff] text-white py-3 rounded-xl font-semibold text-base hover:bg-[#5b54e8] transition-colors shadow-lg shadow-[rgba(108,99,255,0.3)]"
            >
              Start Chapter 1
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
