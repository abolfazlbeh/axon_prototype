import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  id: string
  text: string
  options?: string[]
  type: 'choice' | 'text-choice'
}

const QUESTIONS: Question[] = [
  {
    id: 'familiarity',
    text: "What's your current familiarity with programming?",
    type: 'choice',
    options: [
      'Complete beginner — I have never written code before',
      'Some exposure — I have tried a tutorial but never built anything',
      'Intermediate — I know another language and want to learn Python',
      'Advanced — I know Python basics but want to solidify the fundamentals',
    ],
  },
  {
    id: 'goal',
    text: 'What are you planning to use Python for?',
    type: 'choice',
    options: [
      'Data analysis and automation at work',
      'Building web apps or scripts',
      'Machine learning and AI projects',
      'General curiosity — I just want to learn to code',
    ],
  },
  {
    id: 'time',
    text: 'How much time do you want to invest in this course?',
    type: 'choice',
    options: [
      'Light — 15–20 minutes, just the key ideas',
      'Focused — 30–45 minutes, enough to write real scripts',
      'Deep — 1–2 hours, I want solid foundations',
      'Thorough — as long as it takes to be confident',
    ],
  },
  {
    id: 'style',
    text: 'How do you prefer to learn new concepts?',
    type: 'choice',
    options: [
      'Intuition first — explain the idea before showing code',
      'Code first — show me running examples and explain from there',
      'Analogies first — relate it to something I already know',
      'Mixed — whatever works best for the concept',
    ],
  },
]

export function ClarificationPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [inputPrompt] = useState('I want to learn Python programming from scratch.')

  const current = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1

  function handleSelect(option: string) {
    setSelected(option)
  }

  function handleNext() {
    if (!selected) return
    const newAnswers = { ...answers, [current.id]: selected }
    setAnswers(newAnswers)
    setSelected(null)

    if (isLast) {
      navigate('/waiting')
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0e13] flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-[#1e2130] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#6c63ff] flex items-center justify-center">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M8 2L14 12H2L8 2Z" fill="white" opacity="0.9" />
              <circle cx="8" cy="10" r="2.5" fill="white" opacity="0.6" />
            </svg>
          </div>
          <span className="text-[#f0f1f5] font-semibold text-lg tracking-tight">Axon</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-xs text-[#3a3f52] hover:text-[#6b7280] transition-colors"
        >
          Cancel
        </button>
      </header>

      {/* Progress bar */}
      <div className="h-0.5 bg-[#1e2130]">
        <motion.div
          className="h-full bg-[#6c63ff]"
          animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          {/* Prompt bubble */}
          <div className="flex gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[rgba(108,99,255,0.2)] border border-[rgba(108,99,255,0.3)] flex items-center justify-center shrink-0 mt-0.5">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M8 2L14 12H2L8 2Z" fill="#6c63ff" opacity="0.9" />
              </svg>
            </div>
            <div className="bg-[#13151c] border border-[#1e2130] rounded-xl rounded-tl-sm px-4 py-3 text-sm text-[#9ca3af]">
              You said: <span className="text-[#c8cad4] italic">"{inputPrompt}"</span>
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(108,99,255,0.2)] border border-[rgba(108,99,255,0.3)] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-[#6c63ff]">
                  A
                </div>
                <p className="text-[#f0f1f5] text-lg font-medium leading-snug pt-1">
                  {current.text}
                </p>
              </div>

              <div className="space-y-2 ml-11">
                {current.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 ${
                      selected === opt
                        ? 'border-[#6c63ff] bg-[rgba(108,99,255,0.12)] text-[#f0f1f5]'
                        : 'border-[#1e2130] bg-[#13151c] text-[#c8cad4] hover:border-[#3a3f52]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="ml-11 flex items-center justify-between pt-2">
                <span className="text-xs text-[#3a3f52]">
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className="flex items-center gap-2 bg-[#6c63ff] text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#5b54e8] transition-all"
                >
                  {isLast ? 'Generate my course' : 'Continue'}
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
