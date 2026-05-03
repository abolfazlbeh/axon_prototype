import { useState } from 'react'
import { userProfile, pythonKnowledgeKeys, mechanicsKnowledgeKeys, CONCEPT_LABELS } from '../data/profile'
import { useNavigate } from 'react-router-dom'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

type CourseTab = 'python' | 'mechanics'

const COURSE_TABS: { id: CourseTab; label: string; icon: string }[] = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'mechanics', label: 'Mechanics', icon: '⚛' },
]

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-4">
      <p className="text-xs text-[#3a3f52] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#f0f1f5]">{value}</p>
      {sub && <p className="text-xs text-[#6b7280] mt-0.5">{sub}</p>}
    </div>
  )
}

export function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<CourseTab>('python')
  const { displayName, avatarInitials, engagement, knowledge, preferences, weaknesses, memory_health } = userProfile

  const conceptKeys = activeTab === 'python' ? pythonKnowledgeKeys : mechanicsKnowledgeKeys

  const radarData = conceptKeys.map((key) => ({
    subject: CONCEPT_LABELS[key] ?? key,
    strength: Math.round((knowledge[key]?.strength ?? 0) * 100),
  }))

  const courseKnowledge = Object.fromEntries(
    conceptKeys.map((k) => [k, knowledge[k]]).filter((entry): entry is [string, NonNullable<typeof knowledge[string]>] => !!entry[1])
  )

  return (
    <div className="p-8 max-w-4xl space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(108,99,255,0.2)] border border-[rgba(108,99,255,0.3)] flex items-center justify-center text-2xl font-bold text-[#6c63ff]">
          {avatarInitials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#f0f1f5]">{displayName}</h1>
          <div className="flex items-center gap-3 mt-1 text-sm text-[#6b7280]">
            <span>🔥 {engagement.streak_days}-day streak</span>
            <span>·</span>
            <span>{engagement.total_sessions} sessions</span>
            <span>·</span>
            <span>{engagement.total_slides_completed} slides completed</span>
          </div>
        </div>
        <div className="ml-auto">
          <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${
            memory_health.avg_predicted_retention >= 0.8
              ? 'bg-[rgba(52,211,153,0.1)] text-[#34d399]'
              : memory_health.avg_predicted_retention >= 0.6
                ? 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24]'
                : 'bg-[rgba(248,113,113,0.1)] text-[#f87171]'
          }`}>
            Memory health: {Math.round(memory_health.avg_predicted_retention * 100)}%
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Quiz Accuracy" value={`${Math.round(engagement.quiz_accuracy * 100)}%`} sub="across all slides" />
        <StatCard label="Avg Time / Slide" value={`${engagement.avg_time_per_slide_seconds}s`} sub="engagement signal" />
        <StatCard
          label="Concepts Mastered"
          value={String(Object.values(knowledge).filter((k) => k.strength >= 0.7).length)}
          sub={`of ${Object.keys(knowledge).length} studied`}
        />
        <StatCard
          label="Review Sessions"
          value={String(Object.values(knowledge).reduce((s, k) => s + k.review_count, 0))}
          sub="total review cycles"
        />
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

      <div className="grid grid-cols-2 gap-5">
        {/* Knowledge Radar */}
        <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[#f0f1f5] mb-4">Knowledge Map</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#1e2130" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: '#13151c', border: '1px solid #1e2130', borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: '#c8cad4' }}
                formatter={(v) => [`${v ?? 0}%`, 'Strength']}
              />
              <Radar
                name="Strength"
                dataKey="strength"
                stroke={activeTab === 'python' ? '#6c63ff' : '#34d399'}
                fill={activeTab === 'python' ? 'rgba(108,99,255,0.2)' : 'rgba(52,211,153,0.2)'}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Preferences & weaknesses */}
        <div className="space-y-4">
          <div className="bg-[#13151c] border border-[#1e2130] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#f0f1f5] mb-3">Learning Preferences</h2>
            <div className="space-y-2">
              {[
                { label: 'Format', value: preferences.format },
                { label: 'Pace', value: preferences.pace },
                { label: 'Abstraction', value: preferences.abstraction },
                { label: 'Preferred layout', value: engagement.preferred_layout },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-[#6b7280]">{label}</span>
                  <span className="bg-[#0d0e13] text-[#c8cad4] px-2 py-0.5 rounded font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#13151c] border border-[rgba(248,113,113,0.2)] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-[#f0f1f5] mb-3">Identified Weaknesses</h2>
            <div className="space-y-1.5">
              {weaknesses.map((w) => (
                <div key={w} className="flex items-center gap-2 text-xs text-[#c8cad4]">
                  <span className="text-[#f87171]">⚠</span>
                  {w}
                </div>
              ))}
              <p className="text-xs text-[#3a3f52] mt-2 italic">
                Axon reduces these areas' density automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge detail table */}
      <div className="bg-[#13151c] border border-[#1e2130] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2130]">
          <h2 className="text-sm font-semibold text-[#f0f1f5]">
            Concept Detail — {activeTab === 'python' ? '🐍 Python' : '⚛ Mechanics'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1e2130]">
                {['Concept', 'Strength', 'Retention', 'Reviews', 'Stability (days)', 'Last Reviewed'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[#3a3f52] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(courseKnowledge).map(([key, rec]) => {
                const retPct = Math.round(rec.predicted_retention * 100)
                const strPct = Math.round(rec.strength * 100)
                const retColor = retPct >= 70 ? '#34d399' : retPct >= 50 ? '#fbbf24' : '#f87171'
                const barColor = activeTab === 'python' ? '#6c63ff' : '#34d399'
                return (
                  <tr key={key} className="border-b border-[#1e2130] hover:bg-[#0d0e13] transition-colors">
                    <td className="px-4 py-3 text-[#c8cad4] font-medium">{CONCEPT_LABELS[key] ?? key}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#0d0e13] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${strPct}%`, backgroundColor: barColor }} />
                        </div>
                        <span className="text-[#6b7280]">{strPct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ color: retColor }} className="font-medium">{retPct}%</span>
                    </td>
                    <td className="px-4 py-3 text-[#6b7280]">{rec.review_count}</td>
                    <td className="px-4 py-3 text-[#6b7280]">{rec.stability_days.toFixed(1)}</td>
                    <td className="px-4 py-3 text-[#6b7280]">{rec.last_reviewed_at.slice(0, 10)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => navigate('/memory')}
          className="text-sm border border-[#1e2130] text-[#6b7280] px-5 py-2.5 rounded-xl hover:border-[#3a3f52] hover:text-[#c8cad4] transition-colors"
        >
          View memory dashboard
        </button>
        <button
          onClick={() => navigate('/review')}
          className="text-sm bg-[#6c63ff] text-white px-5 py-2.5 rounded-xl hover:bg-[#5b54e8] transition-colors font-medium"
        >
          Start review session
        </button>
      </div>
    </div>
  )
}
