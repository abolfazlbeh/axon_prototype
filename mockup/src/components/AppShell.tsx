import { Link, useLocation } from 'react-router-dom'
import { notifications } from '../data/notifications'

const unread = notifications.filter((n) => !n.read).length

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/curriculum', label: 'My Course', icon: BookIcon },
  { path: '/review', label: 'Review', icon: RotateIcon },
  { path: '/memory', label: 'Memory', icon: BrainIcon },
  { path: '/profile', label: 'Profile', icon: UserIcon },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  if (location.pathname === '/' || location.pathname === '/clarification' || location.pathname === '/waiting') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-[#0d0e13] overflow-hidden">
      {/* Sidebar */}
      <nav className="w-56 shrink-0 flex flex-col border-r border-[#1e2130] bg-[#0d0e13]">
        <div className="px-5 py-5 border-b border-[#1e2130]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#6c63ff] flex items-center justify-center">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M8 2L14 12H2L8 2Z" fill="white" opacity="0.9" />
                <circle cx="8" cy="10" r="2.5" fill="white" opacity="0.6" />
              </svg>
            </div>
            <span className="text-[#f0f1f5] font-semibold text-lg tracking-tight">Axon</span>
          </Link>
        </div>

        <div className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                  active
                    ? 'bg-[rgba(108,99,255,0.15)] text-[#f0f1f5] font-medium'
                    : 'text-[#6b7280] hover:text-[#c8cad4] hover:bg-[#13151c]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#6c63ff]' : ''}`} />
                {label}
              </Link>
            )
          })}
        </div>

        <div className="p-2 border-t border-[#1e2130]">
          <Link
            to="/notifications"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 relative ${
              location.pathname === '/notifications'
                ? 'bg-[rgba(108,99,255,0.15)] text-[#f0f1f5] font-medium'
                : 'text-[#6b7280] hover:text-[#c8cad4] hover:bg-[#13151c]'
            }`}
          >
            <BellIcon className="w-4 h-4 shrink-0" />
            Notifications
            {unread > 0 && (
              <span className="ml-auto bg-[#6c63ff] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                {unread}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 6.5L8 2l6 4.5V14H10v-3.5H6V14H2V6.5Z" />
    </svg>
  )
}
function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="1" width="12" height="14" rx="1.5" />
      <path d="M5 5h6M5 8h6M5 11h4" />
    </svg>
  )
}
function RotateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 8A5 5 0 1 1 8 3" />
      <path d="M8 1l3 2-3 2" />
    </svg>
  )
}
function BrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 13.5c-3-1-4-3.5-4-5.5 0-2.5 2-4.5 4-4.5" />
      <path d="M10 13.5c3-1 4-3.5 4-5.5 0-2.5-2-4.5-4-4.5" />
      <path d="M6 3.5C6 2.7 6.7 2 8 2s2 .7 2 1.5" />
      <path d="M8 2v12" />
      <path d="M5 8.5H3M11 8.5h2" />
    </svg>
  )
}
function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  )
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1v1M8 14a1 1 0 0 0 2 0M3 12V8a5 5 0 0 1 10 0v4l1.5 1H1.5L3 12Z" />
    </svg>
  )
}
