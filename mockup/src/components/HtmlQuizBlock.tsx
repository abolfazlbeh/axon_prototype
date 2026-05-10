import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface HtmlQuizBlockProps {
  questionHtml: string
  choiceHtmls: string[]
  correct: number
  explanation: string
  /** Screen reader / accessible name when the question is visual */
  questionPlain?: string
  onAnswer?: (correct: boolean) => void
}

/** Multiple-choice quiz with HTML question and/or HTML answer cells (static curriculum HTML only). */
export function HtmlQuizBlock({
  questionHtml,
  choiceHtmls,
  correct,
  explanation,
  questionPlain,
  onAnswer,
}: HtmlQuizBlockProps) {
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
      'w-full text-left px-3 py-3 rounded-lg border text-sm transition-all duration-200 cursor-pointer flex items-start gap-2'

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
    <section
      className="space-y-3 rounded-xl border border-[#1e2130] bg-[#13151c] p-4"
      aria-label={questionPlain ? `${questionPlain} — quiz` : 'Visual quiz'}
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-widest text-[#6c63ff]">
          Check
        </span>
        <div
          className="htmlquiz-question min-w-0 flex-1 text-sm font-medium leading-snug text-[#f0f1f5] [&_img]:max-w-full [&_p]:mt-0 [&_svg]:max-h-40 [&_svg]:w-full [&_svg]:text-[#c8cad4]"
          dangerouslySetInnerHTML={{ __html: questionHtml }}
        />
      </div>

      <div className="space-y-2">
        {choiceHtmls.map((html, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelect(idx)}
            className={getChoiceStyle(idx)}
            disabled={revealed}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs">
              {revealed && idx === correct
                ? '✓'
                : revealed && idx === selected && idx !== correct
                  ? '✗'
                  : String.fromCharCode(65 + idx)}
            </span>
            <div
              className="htmlquiz-choice min-w-0 flex-1 [&_img]:max-w-full [&_p]:my-0"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </button>
        ))}
      </div>

      {!revealed && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full rounded-lg bg-[#6c63ff] py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#5b54e8] active:scale-98 disabled:cursor-not-allowed disabled:opacity-30"
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
                ? 'border border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.08)] text-[#34d399]'
                : 'border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.08)] text-[#c8cad4]'
            }`}
          >
            <span className="mb-0.5 block font-semibold">
              {selected === correct ? 'Correct.' : 'Not quite.'}
            </span>
            {explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
