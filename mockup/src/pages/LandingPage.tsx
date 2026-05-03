import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Intent-Driven',
    desc: 'Just tell Axon what you want to learn. It figures out the curriculum, depth, and structure — no browsing, no course catalogs.',
  },
  {
    icon: '🧠',
    title: 'Adapts to You',
    desc: 'Your learning profile updates after every slide. Content difficulty, format, and pace adjust in real time to match how you actually learn.',
  },
  {
    icon: '♾',
    title: 'Memory-Aware',
    desc: "Axon tracks what you've learned and when you'll forget it. Spaced repetition is built into every session — automatically.",
  },
  {
    icon: '◈',
    title: 'Rich Content',
    desc: 'Text, charts, code, images, and interactive quizzes — all generated and assembled by AI, tailored to your learning style.',
  },
]

const STEPS = [
  { n: '01', title: 'Tell Axon what to learn', body: '"I want to understand gradient descent well enough to implement it from scratch."' },
  { n: '02', title: 'Answer 3 quick questions', body: 'Axon calibrates your background, goals, and preferences. This takes about 90 seconds.' },
  { n: '03', title: 'Your course is generated', body: 'A full curriculum — chapters, slides, code, quizzes — built for you. Usually ready in under 2 minutes.' },
  { n: '04', title: 'Learn. Axon remembers.', body: 'As you progress, Axon schedules reviews so concepts stick — not just for the quiz, but permanently.' },
]

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0d0e13] text-[#c8cad4]">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2130] bg-[rgba(13,14,19,0.85)] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#6c63ff] flex items-center justify-center">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M8 2L14 12H2L8 2Z" fill="white" opacity="0.9" />
                <circle cx="8" cy="10" r="2.5" fill="white" opacity="0.6" />
              </svg>
            </div>
            <span className="text-[#f0f1f5] font-semibold text-lg tracking-tight">Axon</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-[#6b7280] hover:text-[#c8cad4] transition-colors px-3 py-1.5">
              Sign in
            </button>
            <button
              onClick={() => navigate('/clarification')}
              className="text-sm bg-[#6c63ff] text-white px-4 py-1.5 rounded-lg hover:bg-[#5b54e8] transition-colors font-medium"
            >
              Start Learning
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1e2130] bg-[#13151c] text-xs text-[#6b7280] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6c63ff] animate-pulse" />
            AI-native adaptive learning — currently in early access
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#f0f1f5] leading-[1.05] tracking-tight mb-6">
            Learning that adapts<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #6c63ff, #a78bfa)' }}>
              to how you think.
            </span>
          </h1>

          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto leading-relaxed mb-10">
            Tell Axon what you want to learn. It builds a personalized curriculum, generates structured content, and tracks your memory — adapting in real time to make knowledge stick.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/clarification')}
              className="flex items-center gap-2 bg-[#6c63ff] text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-[#5b54e8] transition-all duration-200 shadow-lg shadow-[rgba(108,99,255,0.3)]"
            >
              Start Learning Free
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/curriculum')}
              className="flex items-center gap-2 text-[#c8cad4] border border-[#1e2130] px-7 py-3.5 rounded-xl font-medium text-base hover:border-[#3a3f52] hover:bg-[#13151c] transition-all duration-200"
            >
              See a demo course
            </button>
          </div>
        </motion.div>

        {/* Hero mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 rounded-2xl border border-[#1e2130] bg-[#13151c] overflow-hidden shadow-2xl shadow-black/50 max-w-4xl mx-auto"
        >
          <div className="px-4 py-3 border-b border-[#1e2130] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#1e2130]" />
            <span className="w-3 h-3 rounded-full bg-[#1e2130]" />
            <span className="w-3 h-3 rounded-full bg-[#1e2130]" />
            <span className="ml-3 text-xs text-[#3a3f52]">axon.app · Python Functions — Chapter 2 of 2</span>
          </div>
          <div className="grid grid-cols-2 gap-0 divide-x divide-[#1e2130]">
            <div className="p-6 space-y-3">
              <div className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest">Chapter 1 — How Machines Learn</div>
              <h2 className="text-xl font-bold text-[#f0f1f5] leading-tight">Functions in Python</h2>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                A <strong className="text-[#f0f1f5]">function</strong> is a named, reusable block of code. You define it once and call it as many times as needed — with different inputs each time.
              </p>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Good functions follow the <strong className="text-[#f0f1f5]">single responsibility principle</strong>: each function does one thing and does it well.
              </p>
            </div>
            <div className="p-6 space-y-3">
              <div className="rounded-lg overflow-hidden bg-[#0d0e13] aspect-video flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto">
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                      <path d="M8 48 Q20 20 32 32 Q44 44 56 16" stroke="#6c63ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <circle cx="32" cy="32" r="3" fill="#6c63ff" />
                      <path d="M32 32 L26 44" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 2" />
                      <circle cx="26" cy="44" r="2.5" fill="#fbbf24" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#3a3f52]">Loss landscape visualization</p>
                </div>
              </div>
              <div className="bg-[#0d0e13] border border-[#1e2130] rounded-lg p-3">
                <p className="text-xs text-[#6c63ff] font-semibold mb-1.5">Check</p>
                <p className="text-xs text-[#f0f1f5] mb-2">What does a function return with no return statement?</p>
                <div className="space-y-1">
                  {['0', 'An empty string', 'None'].map((c, i) => (
                    <div key={i} className={`text-xs px-2.5 py-1.5 rounded border ${i === 2 ? 'border-[#34d399] text-[#34d399] bg-[rgba(52,211,153,0.08)]' : 'border-[#1e2130] text-[#6b7280]'}`}>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-[#f0f1f5] mb-3">
          Not a course platform. A learning system.
        </h2>
        <p className="text-center text-[#6b7280] mb-12 max-w-xl mx-auto">
          Axon generates content uniquely for you, tracks what you know and what you're forgetting, and adapts every session to close the gap.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border border-[#1e2130] bg-[#13151c] hover:border-[#3a3f52] transition-colors"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-base font-semibold text-[#f0f1f5] mb-1.5">{f.title}</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-[#1e2130]">
        <h2 className="text-center text-3xl font-bold text-[#f0f1f5] mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="text-[#1e2130] text-4xl font-black mb-3 select-none">{s.n}</div>
              <h3 className="text-sm font-semibold text-[#f0f1f5] mb-1.5">{s.title}</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed italic">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-[#1e2130] text-center">
        <h2 className="text-3xl font-bold text-[#f0f1f5] mb-4">
          Ready to learn something?
        </h2>
        <p className="text-[#6b7280] mb-8 max-w-md mx-auto">
          Type a topic. Axon builds the course. Start learning in minutes.
        </p>
        <button
          onClick={() => navigate('/clarification')}
          className="bg-[#6c63ff] text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#5b54e8] transition-all duration-200 shadow-lg shadow-[rgba(108,99,255,0.3)]"
        >
          Get started — it's free
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2130] py-6 px-6 text-center text-xs text-[#3a3f52]">
        © 2026 Axon — AI-Native Adaptive Learning Platform · Mockup / Design Preview
      </footer>
    </div>
  )
}
