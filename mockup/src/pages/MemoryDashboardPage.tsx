import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import {
  userProfile,
  pythonRetentionHistory,
  mechanicsRetentionHistory,
  pythonKnowledgeKeys,
  mechanicsKnowledgeKeys,
  CONCEPT_LABELS,
} from '../data/profile'
import { useNavigate } from 'react-router-dom'

type CourseTab = 'python' | 'mechanics'

const COURSE_TABS: { id: CourseTab; label: string; icon: string }[] = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'mechanics', label: 'Mechanics', icon: '⚛' },
]

const PYTHON_COLORS: Record<string, string> = {
  python_loops: '#6c63ff',
  python_conditionals: '#34d399',
  python_functions: '#fbbf24',
  python_lists: '#f87171',
}

const MECHANICS_COLORS: Record<string, string> = {
  mech_scalars_vectors: '#6c63ff',
  mech_displacement_velocity: '#34d399',
  mech_kinematic_equations: '#fbbf24',
  mech_newtons_first_law: '#f87171',
}

const CHART_CONCEPTS: Record<CourseTab, string[]> = {
  python: ['python_loops', 'python_conditionals', 'python_functions', 'python_lists'],
  mechanics: ['mech_scalars_vectors', 'mech_displacement_velocity', 'mech_kinematic_equations', 'mech_newtons_first_law'],
}

function pivotData(history: typeof pythonRetentionHistory) {
  const byDate: Record<string, Record<string, number>> = {}
  for (const pt of history) {
    if (!byDate[pt.date]) byDate[pt.date] = {}
    byDate[pt.date][pt.concept] = Math.round(pt.retention * 100)
  }
  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, concepts]) => ({ date: date.slice(5), ...concepts }))
}

function HealthBar({ value, concept, color }: { value: number; concept: string; color: string }) {
  const barColor = value >= 70 ? '#34d399' : value >= 50 ? '#fbbf24' : '#f87171'
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: color }} />
          <span className="text-[#c8cad4]">{CONCEPT_LABELS[concept] ?? concept}</span>
        </div>
        <span style={{ color: barColor }} className="font-medium">{value}%</span>
      </div>
      <div className="h-1.5 bg-[#0d0e13] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  )
}

function ReviewCalendarDay({ date, hasConcept }: { date: string; hasConcept: boolean }) {
  const isToday = date === '04-29'
  return (
    <div className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs gap-0.5 ${
      isToday
        ? 'bg-[rgba(108,99,255,0.2)] border border-[#6c63ff] text-[#f0f1f5]'
        : 'bg-[#13151c] border border-[#1e2130] text-[#6b7280]'
    }`}>
      <span className="font-medium">{date.slice(3)}</span>
      {hasConcept && (
        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: isToday ? '#6c63ff' : '#fbbf24' }} />
      )}
    </div>
  )
}

export function MemoryDashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<CourseTab>('python')
  const { memory_health, knowledge } = userProfile

  const conceptKeys = activeTab === 'python' ? pythonKnowledgeKeys : mechanicsKnowledgeKeys
  const colors = activeTab === 'python' ? PYTHON_COLORS : MECHANICS_COLORS
  const chartHistory = activeTab === 'python' ? pythonRetentionHistory : mechanicsRetentionHistory
  const chartConcepts = CHART_CONCEPTS[activeTab]
  const chartData = pivotData(chartHistory)

  const courseConceptsBelowThreshold = conceptKeys.filter((k) => {
    const rec = knowledge[k]
    return rec && rec.predicted_retention < 0.70
  }).length

  const courseAvgRetention = conceptKeys.reduce((sum, k) => {
    return sum + (knowledge[k]?.predicted_retention ?? 0)
  }, 0) / conceptKeys.length

  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const d = new Date('2026-04-01')
    d.setDate(d.getDate() + i)
    return d.toISOString().slice(5, 10)
  })

  const reviewDays = new Set(
    activeTab === 'python'
      ? ['04-20', '04-21', '04-24', '04-26', '04-27', '04-28', '04-29', '05-02', '05-06']
      : ['04-25', '04-26', '04-27', '04-28', '04-29', '05-03', '05-08']
  )

  const courseLabel = activeTab === 'python' ? 'Python Programming' : 'Mechanics Physics'

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <div className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest mb-1">Memory</div>
        <h1 className="text-3xl font-bold text-[#f0f1f5] tracking-tight">Memory Health</h1>
        <p className="text-[#6b7280] text-sm mt-1">
          Retention forecast per concept. Below 70% = due for review.
        </p>
      </div>

      {/* Course tabs */}
      <div className="flex gap-2 p-1 bg-[#13151c] border border-[#1e2130] rounded-xl w-fit">
        {COURSE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab.id === activeTab
                ? 'bg-[#0d0e13] text-[#f0f1f5] shadow-sm'
                : 'text-[#6b7280] hover:text-[#c8cad4]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5">
          <p className="text-xs text-[#3a3f52] mb-1">Course Memory Health</p>
          <div className="text-3xl font-black text-[#f0f1f5] mb-0.5">
            {Math.round(courseAvgRetention * 100)}%
          </div>
          <p className="text-xs text-[#6b7280]">{courseLabel}</p>
        </div>
        <div className={`bg-[#13151c] rounded-xl p-5 border ${
          courseConceptsBelowThreshold > 0 ? 'border-[rgba(251,191,36,0.2)]' : 'border-[rgba(52,211,153,0.2)]'
        }`}>
          <p className="text-xs text-[#3a3f52] mb-1">Due for Review</p>
          <div className={`text-3xl font-black mb-0.5 ${
            courseConceptsBelowThreshold > 0 ? 'text-[#fbbf24]' : 'text-[#34d399]'
          }`}>
            {courseConceptsBelowThreshold}
          </div>
          <p className="text-xs text-[#6b7280]">concepts below threshold</p>
        </div>
        <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5">
          <p className="text-xs text-[#3a3f52] mb-1">Overall Health</p>
          <div className="text-3xl font-black text-[#f0f1f5] mb-0.5">
            {Math.round(memory_health.avg_predicted_retention * 100)}%
          </div>
          <p className="text-xs text-[#6b7280]">across all {Object.keys(knowledge).length} concepts</p>
        </div>
      </div>

      {/* Retention curves chart */}
      <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[#f0f1f5] mb-1">
          Retention Curves — {courseLabel} · April 2026
        </h2>
        <p className="text-xs text-[#6b7280] mb-4">
          Predicted recall probability per concept over time. Spikes indicate review sessions.
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
            <CartesianGrid stroke="#1e2130" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#4b5563', fontSize: 10 }}
              tickLine={false}
              interval={4}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#4b5563', fontSize: 10 }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <ReferenceLine
              y={70}
              stroke="#3a3f52"
              strokeDasharray="4 2"
              label={{ value: 'threshold', fill: '#3a3f52', fontSize: 9, position: 'insideTopRight' }}
            />
            <Tooltip
              contentStyle={{ background: '#13151c', border: '1px solid #1e2130', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#6b7280' }}
              itemStyle={{ color: '#c8cad4' }}
              formatter={(value, name) => [
                `${value ?? 0}%`,
                (CONCEPT_LABELS[String(name)] ?? String(name)) as string,
              ]}
            />
            {chartConcepts.map((concept) => (
              <Line
                key={concept}
                type="monotone"
                dataKey={concept}
                stroke={colors[concept]}
                strokeWidth={2}
                dot={false}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-5 mt-3 flex-wrap">
          {chartConcepts.map((concept) => (
            <div key={concept} className="flex items-center gap-1.5 text-xs text-[#6b7280]">
              <span className="w-3 h-0.5 rounded" style={{ backgroundColor: colors[concept] }} />
              {CONCEPT_LABELS[concept]}
            </div>
          ))}
        </div>
      </div>

      {/* Per-concept health bars */}
      <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-[#f0f1f5]">
          Current Retention — {courseLabel}
        </h2>
        {conceptKeys.map((key) => {
          const record = knowledge[key]
          const pct = record ? Math.round(record.predicted_retention * 100) : 0
          return <HealthBar key={key} concept={key} value={pct} color={colors[key] ?? '#6c63ff'} />
        })}
        {courseConceptsBelowThreshold > 0 && (
          <button
            onClick={() => navigate('/review')}
            className="w-full mt-2 py-2.5 rounded-lg text-sm font-semibold bg-[rgba(251,191,36,0.15)] border border-[rgba(251,191,36,0.3)] text-[#fbbf24] hover:bg-[rgba(251,191,36,0.2)] transition-colors"
          >
            Start review session — {courseConceptsBelowThreshold} concept{courseConceptsBelowThreshold > 1 ? 's' : ''} due
          </button>
        )}
      </div>

      {/* Review calendar */}
      <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[#f0f1f5] mb-1">
          Review Calendar — {courseLabel} · April / May 2026
        </h2>
        <p className="text-xs text-[#6b7280] mb-4">
          Days with dots have concepts scheduled for review. Purple = today.
        </p>
        <div className="flex flex-wrap gap-2">
          {daysInMonth.map((date) => (
            <ReviewCalendarDay key={date} date={date} hasConcept={reviewDays.has(date)} />
          ))}
        </div>
      </div>
    </div>
  )
}
