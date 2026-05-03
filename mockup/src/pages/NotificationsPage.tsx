import { useNavigate } from 'react-router-dom'
import { notifications } from '../data/notifications'
import type { Notification } from '../data/notifications'
import { motion } from 'framer-motion'

const TYPE_META: Record<Notification['type'], { icon: string; color: string; bg: string }> = {
  course_ready: { icon: '◈', color: '#6c63ff', bg: 'rgba(108,99,255,0.12)' },
  review_due: { icon: '↻', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
  milestone: { icon: '✓', color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  streak: { icon: '🔥', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function NotificationsPage() {
  const navigate = useNavigate()
  const unread = notifications.filter((n) => !n.read)
  const read = notifications.filter((n) => n.read)

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#6c63ff] uppercase tracking-widest mb-1">Notifications</div>
        <h1 className="text-3xl font-bold text-[#f0f1f5]">Activity</h1>
      </div>

      {unread.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-[#3a3f52] uppercase tracking-widest mb-3">
            New — {unread.length}
          </h2>
          <div className="space-y-2">
            {unread.map((n, i) => {
              const meta = TYPE_META[n.type]
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-4 rounded-xl border border-[rgba(108,99,255,0.2)] bg-[rgba(108,99,255,0.04)] hover:bg-[rgba(108,99,255,0.07)] transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ backgroundColor: meta.bg, color: meta.color }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-[#f0f1f5]">{n.title}</p>
                      <span className="text-xs text-[#3a3f52] shrink-0">{timeAgo(n.timestamp)}</span>
                    </div>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{n.body}</p>
                    {n.actionLabel && (
                      <button
                        onClick={() => navigate(n.actionPath ?? '/')}
                        className="mt-2 text-xs font-medium text-[#6c63ff] hover:text-[#a78bfa] transition-colors"
                      >
                        {n.actionLabel} →
                      </button>
                    )}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#6c63ff] shrink-0 mt-1.5" />
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-[#3a3f52] uppercase tracking-widest mb-3">Earlier</h2>
          <div className="space-y-2">
            {read.map((n, i) => {
              const meta = TYPE_META[n.type]
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="flex gap-4 p-4 rounded-xl border border-[#1e2130] bg-[#13151c] hover:border-[#3a3f52] transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 opacity-60"
                    style={{ backgroundColor: meta.bg, color: meta.color }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="text-sm font-medium text-[#9ca3af]">{n.title}</p>
                      <span className="text-xs text-[#3a3f52] shrink-0">{timeAgo(n.timestamp)}</span>
                    </div>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{n.body}</p>
                    {n.actionLabel && (
                      <button
                        onClick={() => navigate(n.actionPath ?? '/')}
                        className="mt-2 text-xs font-medium text-[#3a3f52] hover:text-[#6b7280] transition-colors"
                      >
                        {n.actionLabel} →
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
