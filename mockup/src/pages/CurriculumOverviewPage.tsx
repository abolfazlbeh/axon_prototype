import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { allCurricula } from '../data/curriculum'

const COURSE_ICONS: Record<string, string> = {
  'curr_python_001': '🐍',
  'curr_mechanics_001': '⚛',
  'curr_english_pv_001': '📚',
}

export function CurriculumOverviewPage() {
  const navigate = useNavigate()
  const [activeCurriculumId, setActiveCurriculumId] = useState(allCurricula[0].id)

  const curriculum = allCurricula.find((c) => c.id === activeCurriculumId) ?? allCurricula[0]

  const completedSlides = curriculum.chapters.reduce(
    (sum, ch) => sum + Math.floor(ch.slides.length * ch.progress / 100),
    0
  )
  const totalSlides = curriculum.chapters.reduce((sum, ch) => sum + ch.slides.length, 0)
  const overallProgress = Math.round((completedSlides / totalSlides) * 100)

  const primaryChapter =
    curriculum.chapters.find((ch) => ch.status === 'in-progress') ??
    curriculum.chapters.find((ch) => ch.status !== 'locked' && ch.progress < 100) ??
    [...curriculum.chapters].reverse().find((ch) => ch.status !== 'locked') ??
    curriculum.chapters[0]
  const courseResumeSlideIdx =
    primaryChapter && primaryChapter.slides.length > 0
      ? Math.min(
          Math.floor(primaryChapter.slides.length * (primaryChapter.progress / 100)),
          primaryChapter.slides.length - 1,
        )
      : 0

  return (
    <div className="p-8 max-w-3xl">
      {/* Course switcher tabs */}
      <div className="flex gap-2 mb-7 p-1 bg-[#13151c] border border-[#1e2130] rounded-xl w-fit">
        {allCurricula.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCurriculumId(c.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              c.id === activeCurriculumId
                ? 'bg-[#0d0e13] text-[#f0f1f5] shadow-sm'
                : 'text-[#6b7280] hover:text-[#c8cad4]'
            }`}
          >
            <span>{COURSE_ICONS[c.id]}</span>
            <span className="max-w-[140px] truncate">{c.title}</span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest mb-2">My Course</div>
        <h1 className="text-3xl font-bold text-[#f0f1f5] tracking-tight mb-2">{curriculum.title}</h1>
        <p className="text-[#6b7280] text-sm leading-relaxed max-w-xl">{curriculum.description}</p>

        <div className="flex gap-4 mt-4 text-xs text-[#3a3f52]">
          <span>
            {curriculum.streamMode ? 'Single learning stream' : `${curriculum.totalChapters} chapters`}
          </span>
          <span>·</span>
          <span>{totalSlides} slides</span>
          <span>·</span>
          <span>~{curriculum.estimatedMinutes} min</span>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-sm font-medium text-[#c8cad4]">Overall Progress</span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-[#f0f1f5]">{overallProgress}%</span>
            {primaryChapter && primaryChapter.status !== 'locked' && (
              <button
                type="button"
                onClick={() =>
                  navigate(`/slide/${primaryChapter.id}/${courseResumeSlideIdx}`)
                }
                className="shrink-0 rounded-lg bg-[#6c63ff] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5b54e8] active:scale-[0.98]"
              >
                {overallProgress >= 100 ? 'Review' : overallProgress > 0 ? 'Continue' : 'Start'}
              </button>
            )}
          </div>
        </div>
        <div className="h-2 bg-[#0d0e13] rounded-full overflow-hidden">
          <motion.div
            key={activeCurriculumId}
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-[#6c63ff] rounded-full"
          />
        </div>
        <div className="flex gap-5 mt-3 text-xs text-[#6b7280]">
          <span>{completedSlides} slides completed</span>
          <span>·</span>
          <span>71% quiz accuracy</span>
          <span>·</span>
          <span>4-day streak</span>
        </div>
      </div>

      {/* Review prompt — only for Python course which has due concepts */}
      {activeCurriculumId === 'curr_python_001' && (
        <div className="bg-[rgba(251,191,36,0.06)] border border-[rgba(251,191,36,0.2)] rounded-xl p-4 mb-6 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[rgba(251,191,36,0.15)] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 16 16" fill="none" stroke="#fbbf24" strokeWidth="1.5" className="w-4 h-4">
              <path d="M8 2L14 12H2L8 2Z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#fbbf24] mb-0.5">3 concepts are due for review</p>
            <p className="text-xs text-[#9ca3af]">
              Loops, Functions (Python) and Kinematic Equations (Mechanics) are fading. ~8 minutes.
            </p>
          </div>
          <button
            onClick={() => navigate('/review')}
            className="shrink-0 text-xs bg-[rgba(251,191,36,0.15)] text-[#fbbf24] border border-[rgba(251,191,36,0.3)] px-3 py-1.5 rounded-lg hover:bg-[rgba(251,191,36,0.2)] transition-colors font-medium"
          >
            Review now
          </button>
        </div>
      )}

      {/* Chapter list */}
      <div className="space-y-4">
        {curriculum.chapters.map((chapter, idx) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`border rounded-xl overflow-hidden ${
              chapter.status === 'locked'
                ? 'border-[#1e2130] opacity-50'
                : 'border-[#1e2130] hover:border-[#3a3f52] transition-colors'
            }`}
          >
            <div className="bg-[#13151c] p-5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
                  chapter.status === 'completed'
                    ? 'bg-[rgba(52,211,153,0.15)] text-[#34d399]'
                    : chapter.status === 'in-progress'
                      ? 'bg-[rgba(108,99,255,0.15)] text-[#6c63ff]'
                      : 'bg-[#0d0e13] text-[#3a3f52]'
                }`}>
                  {chapter.status === 'completed' ? '✓' : chapter.status === 'locked' ? '🔒' : String(idx + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-[#f0f1f5]">
                        {curriculum.streamMode
                          ? chapter.title
                          : `Chapter ${idx + 1} — ${chapter.title}`}
                      </h3>
                      {chapter.status === 'completed' && (
                        <span className="text-xs bg-[rgba(52,211,153,0.1)] text-[#34d399] px-2 py-0.5 rounded-full">
                          Complete
                        </span>
                      )}
                      {chapter.status === 'in-progress' && (
                        <span className="text-xs bg-[rgba(108,99,255,0.1)] text-[#6c63ff] px-2 py-0.5 rounded-full">
                          In progress
                        </span>
                      )}
                    </div>
                    {chapter.status !== 'locked' && chapter.slides.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const resume = Math.min(
                            Math.floor(
                              chapter.slides.length * (chapter.progress / 100),
                            ),
                            chapter.slides.length - 1,
                          )
                          navigate(`/slide/${chapter.id}/${resume}`)
                        }}
                        className="shrink-0 rounded-lg bg-[#6c63ff] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#5b54e8] active:scale-[0.98]"
                      >
                        {chapter.progress >= 100
                          ? 'Review'
                          : chapter.progress > 0
                            ? 'Continue'
                            : 'Start'}
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-[#6b7280] leading-relaxed mb-3">{chapter.summary}</p>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-[#3a3f52] mb-1.5">
                      <span>{chapter.slides.length} slides</span>
                      <span>{chapter.progress}%</span>
                    </div>
                    <div className="h-1 bg-[#0d0e13] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${chapter.progress}%`,
                          backgroundColor: chapter.status === 'completed' ? '#34d399' : '#6c63ff',
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    {chapter.learningOutcomes.map((outcome, i) => (
                      <div key={i} className="flex gap-2 text-xs text-[#6b7280]">
                        <span className="text-[#3a3f52] mt-0.5">→</span>
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {chapter.status !== 'locked' && (
              <div className="px-5 py-3 bg-[#0d0e13] border-t border-[#1e2130] flex items-center justify-between">
                <div className="flex gap-2">
                  {chapter.slides.map((_slide, si) => (
                    <button
                      key={si}
                      onClick={() => navigate(`/slide/${chapter.id}/${si}`)}
                      className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                        si < Math.floor(chapter.slides.length * chapter.progress / 100)
                          ? 'bg-[rgba(52,211,153,0.15)] text-[#34d399]'
                          : si === Math.floor(chapter.slides.length * chapter.progress / 100) && chapter.progress < 100
                            ? 'bg-[rgba(108,99,255,0.2)] text-[#6c63ff] ring-1 ring-[#6c63ff]'
                            : 'bg-[#13151c] text-[#3a3f52]'
                      }`}
                    >
                      {si + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const slideIdx = Math.min(
                      Math.floor(chapter.slides.length * chapter.progress / 100),
                      chapter.slides.length - 1
                    )
                    navigate(`/slide/${chapter.id}/${slideIdx}`)
                  }}
                  className="text-xs font-semibold text-[#6c63ff] hover:text-[#a78bfa] transition-colors px-1"
                >
                  {chapter.progress === 100 ? 'Review →' : chapter.progress > 0 ? 'Continue →' : 'Start →'}
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
