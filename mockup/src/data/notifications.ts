export interface Notification {
  id: string
  type: 'course_ready' | 'review_due' | 'milestone' | 'streak'
  title: string
  body: string
  timestamp: string
  read: boolean
  actionLabel?: string
  actionPath?: string
}

export const notifications: Notification[] = [
  {
    id: 'notif_001',
    type: 'course_ready',
    title: 'Your course is ready',
    body: '"Python Programming from Scratch" has been generated. Chapter 1 — Variables, Types & Control Flow is ready to start.',
    timestamp: '2026-04-20T10:14:00Z',
    read: true,
    actionLabel: 'Start Learning',
    actionPath: '/curriculum',
  },
  {
    id: 'notif_002',
    type: 'review_due',
    title: '2 concepts need reinforcement',
    body: 'Loops and Functions are due for review. Estimated time: 6 minutes.',
    timestamp: '2026-04-29T08:00:00Z',
    read: false,
    actionLabel: 'Start Review',
    actionPath: '/review',
  },
  {
    id: 'notif_003',
    type: 'course_ready',
    title: 'New course available',
    body: '"Mechanics Physics from Scratch" has been generated based on your interests. Explore it anytime.',
    timestamp: '2026-04-25T09:10:00Z',
    read: false,
    actionLabel: 'View Course',
    actionPath: '/curriculum',
  },
  {
    id: 'notif_004',
    type: 'milestone',
    title: 'Chapter 1 complete',
    body: 'You finished "Python Basics" with 71% quiz accuracy. Chapter 2 — Functions & Data Structures is now unlocked.',
    timestamp: '2026-04-26T11:30:00Z',
    read: true,
    actionLabel: 'Continue',
    actionPath: '/curriculum',
  },
  {
    id: 'notif_005',
    type: 'streak',
    title: '4-day streak',
    body: "You've studied 4 days in a row. Keep it up — memory health is at 73%.",
    timestamp: '2026-04-29T07:00:00Z',
    read: false,
  },
]
