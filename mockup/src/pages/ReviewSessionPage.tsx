import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { reviewItems } from '../data/profile'

function RetentionBadge({ value }: { value: number }) {
  const pct = Math.round(value * 100)
  const color = value >= 0.7 ? '#34d399' : value >= 0.5 ? '#fbbf24' : '#f87171'
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color, backgroundColor: `${color}18` }}>
      {pct}% retention
    </span>
  )
}

export function ReviewSessionPage() {
  const navigate = useNavigate()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)

  const current = reviewItems[currentIdx]
  const totalItems = reviewItems.length
  const totalMinutes = 6

  function handleSelect(idx: number) {
    if (revealed) return
    setSelected(idx)
  }

  function handleSubmit() {
    if (selected === null) return
    const correct = selected === current.correct
    setAnswers((prev) => ({ ...prev, [current.conceptId]: correct }))
    setRevealed(true)
  }

  function handleNext() {
    setSelected(null)
    setRevealed(false)
    if (currentIdx < totalItems - 1) {
      setCurrentIdx((i) => i + 1)
    } else {
      setDone(true)
    }
  }

  function getChoiceStyle(idx: number): string {
    const base = 'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 cursor-pointer'
    if (!revealed) {
      return selected === idx
        ? `${base} border-[#6c63ff] bg-[rgba(108,99,255,0.12)] text-[#f0f1f5]`
        : `${base} border-[#1e2130] bg-[#13151c] text-[#c8cad4] hover:border-[#3a3f52]`
    }
    if (idx === current.correct) return `${base} border-[#34d399] bg-[rgba(52,211,153,0.08)] text-[#34d399]`
    if (idx === selected) return `${base} border-[#f87171] bg-[rgba(248,113,113,0.08)] text-[#f87171]`
    return `${base} border-[#1e2130] bg-[#13151c] text-[#6b7280]`
  }

  const correctCount = Object.values(answers).filter(Boolean).length

  return (
    <div className="p-8 max-w-2xl">
      {!done ? (
        <>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs font-semibold text-[#fbbf24] uppercase tracking-widest mb-1">Review Session</div>
                <h1 className="text-2xl font-bold text-[#f0f1f5]">Reinforcing your memory</h1>
              </div>
              <div className="text-right text-xs text-[#3a3f52]">
                <div className="text-lg font-bold text-[#c8cad4]">{currentIdx + 1}/{totalItems}</div>
                <div>~{totalMinutes} min</div>
              </div>
            </div>
            <p className="text-sm text-[#6b7280]">
              These concepts are due for review based on your memory health. Completing this session will extend their retention.
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mb-6">
            {reviewItems.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < currentIdx
                    ? answers[reviewItems[i].conceptId]
                      ? 'bg-[#34d399]'
                      : 'bg-[#f87171]'
                    : i === currentIdx
                      ? 'bg-[#fbbf24]'
                      : 'bg-[#1e2130]'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Concept header */}
              <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#0d0e13] text-[#3a3f52]">
                        {current.courseLabel}
                      </span>
                      <p className="text-xs text-[#3a3f52]">{current.chapter}</p>
                    </div>
                    <h2 className="text-base font-semibold text-[#f0f1f5]">{current.concept}</h2>
                  </div>
                  <RetentionBadge value={current.predicted_retention} />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-3">
                <p className="text-[#f0f1f5] font-medium leading-snug">{current.question}</p>
                <div className="space-y-2">
                  {current.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={revealed}
                      className={getChoiceStyle(idx)}
                    >
                      <span className="flex items-start gap-2">
                        <span className="shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs mt-0.5">
                          {revealed && idx === current.correct ? '✓' : revealed && idx === selected && idx !== current.correct ? '✗' : String.fromCharCode(65 + idx)}
                        </span>
                        {choice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {!revealed ? (
                <button
                  onClick={handleSubmit}
                  disabled={selected === null}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-[#fbbf24] text-[#0d0e13] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f59e0b] transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    answers[current.conceptId]
                      ? 'bg-[rgba(52,211,153,0.08)] border border-[rgba(52,211,153,0.2)] text-[#c8cad4]'
                      : 'bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)] text-[#c8cad4]'
                  }`}>
                    <span className={`font-semibold block mb-1 ${answers[current.conceptId] ? 'text-[#34d399]' : 'text-[#f87171]'}`}>
                      {answers[current.conceptId] ? 'Correct — memory reinforced.' : 'Not quite — let\'s re-read this.'}
                    </span>
                    {current.explanation}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-[#6c63ff] text-white hover:bg-[#5b54e8] transition-colors"
                  >
                    {currentIdx < totalItems - 1 ? 'Next concept →' : 'Finish review'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="w-14 h-14 rounded-full bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.3)] flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-7 h-7">
              <path d="M4 10l4 4 8-8" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#f0f1f5] mb-2">Review complete</h1>
            <p className="text-[#6b7280] text-sm">
              {correctCount}/{totalItems} correct · Memory stability updated · Next review scheduled
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {reviewItems.map((item) => (
              <div key={item.conceptId} className="bg-[#13151c] border border-[#1e2130] rounded-xl p-4">
                <p className="text-xs text-[#3a3f52] mb-1">{item.concept}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${answers[item.conceptId] ? 'text-[#34d399]' : 'text-[#f87171]'}`}>
                    {answers[item.conceptId] ? 'Reinforced' : 'Re-review soon'}
                  </span>
                  <RetentionBadge value={answers[item.conceptId] ? Math.min(0.92, item.predicted_retention + 0.2) : item.predicted_retention} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/curriculum')}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#6c63ff] text-white hover:bg-[#5b54e8] transition-colors"
            >
              Continue learning
            </button>
            <button
              onClick={() => navigate('/memory')}
              className="py-3 px-5 rounded-xl text-sm font-medium border border-[#1e2130] text-[#6b7280] hover:border-[#3a3f52] hover:text-[#c8cad4] transition-colors"
            >
              View memory
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
