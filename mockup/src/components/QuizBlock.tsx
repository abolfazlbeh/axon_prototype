import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizProps {
  question: string
  choices: string[]
  correct: number
  explanation: string
  onAnswer?: (correct: boolean) => void
}

export function QuizBlock({ question, choices, correct, explanation, onAnswer }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  function handleSelect(idx: number) {
    if (revealed) return
    setSelected(idx)
  }

  function handleSubmit() {
    if (selected === null) return
    setRevealed(true)
    onAnswer?.(selected === correct)
  }

  function getChoiceStyle(idx: number): string {
    const base =
      'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 cursor-pointer'

    if (!revealed) {
      if (selected === idx) {
        return `${base} border-[#6c63ff] bg-[rgba(108,99,255,0.12)] text-[#f0f1f5]`
      }
      return `${base} border-[#1e2130] bg-[#13151c] text-[#c8cad4] hover:border-[#3a3f52] hover:bg-[#1a1c26]`
    }

    if (idx === correct) {
      return `${base} border-[#34d399] bg-[rgba(52,211,153,0.1)] text-[#34d399]`
    }
    if (idx === selected && idx !== correct) {
      return `${base} border-[#f87171] bg-[rgba(248,113,113,0.1)] text-[#f87171]`
    }
    return `${base} border-[#1e2130] bg-[#13151c] text-[#6b7280]`
  }

  return (
    <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-[#6c63ff] text-xs font-semibold uppercase tracking-widest mt-0.5 shrink-0">
          Check
        </span>
        <p className="text-[#f0f1f5] text-sm font-medium leading-snug">{question}</p>
      </div>

      <div className="space-y-2">
        {choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={getChoiceStyle(idx)}
            disabled={revealed}
          >
            <span className="flex items-start gap-2">
              <span className="shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs mt-0.5">
                {revealed && idx === correct ? '✓' : revealed && idx === selected && idx !== correct ? '✗' : String.fromCharCode(65 + idx)}
              </span>
              {choice}
            </span>
          </button>
        ))}
      </div>

      {!revealed && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-[#6c63ff] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#5b54e8] active:scale-98"
        >
          Submit Answer
        </button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg px-3 py-2.5 text-xs leading-relaxed ${
              selected === correct
                ? 'bg-[rgba(52,211,153,0.08)] border border-[rgba(52,211,153,0.2)] text-[#34d399]'
                : 'bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)] text-[#c8cad4]'
            }`}
          >
            <span className="font-semibold block mb-0.5">
              {selected === correct ? 'Correct.' : 'Not quite.'}
            </span>
            {explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
