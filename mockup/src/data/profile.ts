// ─── Types ────────────────────────────────────────────────────────────────────

export interface MemoryRecord {
  strength: number
  stability_days: number
  last_reviewed_at: string
  review_count: number
  initial_acquisition_depth: number
  predicted_retention: number
}

export interface UserPreferences {
  format: 'visual' | 'text' | 'mixed'
  pace: 'slow' | 'medium' | 'fast'
  abstraction: 'intuition-first' | 'rigorous' | 'mixed'
}

export interface EngagementStats {
  avg_time_per_slide_seconds: number
  quiz_accuracy: number
  preferred_layout: string
  total_slides_completed: number
  total_sessions: number
  streak_days: number
}

export interface MemoryHealth {
  avg_predicted_retention: number
  concepts_below_threshold: number
  next_review_due_at: string
}

export interface UserProfile {
  userId: string
  displayName: string
  avatarInitials: string
  createdAt: string
  knowledge: Record<string, MemoryRecord>
  preferences: UserPreferences
  weaknesses: string[]
  engagement: EngagementStats
  memory_health: MemoryHealth
}

// ─── Review item ──────────────────────────────────────────────────────────────

export interface ReviewItem {
  conceptId: string
  concept: string
  courseId: string
  courseLabel: string
  predicted_retention: number
  review_format: 'recall-prompt' | 'quiz-and-explanation' | 'full-reteach'
  question: string
  choices: string[]
  correct: number
  explanation: string
  chapter: string
}

// ─── Profile Data ─────────────────────────────────────────────────────────────

export const userProfile: UserProfile = {
  userId: 'usr_alex_chen',
  displayName: 'Alex Chen',
  avatarInitials: 'AC',
  createdAt: '2026-03-15T09:00:00Z',

  knowledge: {
    // ── Python course ──────────────────────────────────────────────────────
    python_variables_types: {
      strength: 0.90,
      stability_days: 20.0,
      last_reviewed_at: '2026-04-22T18:00:00Z',
      review_count: 4,
      initial_acquisition_depth: 0.85,
      predicted_retention: 0.87,
    },
    python_conditionals: {
      strength: 0.82,
      stability_days: 17.5,
      last_reviewed_at: '2026-04-24T10:30:00Z',
      review_count: 3,
      initial_acquisition_depth: 0.78,
      predicted_retention: 0.84,
    },
    python_loops: {
      strength: 0.70,
      stability_days: 12.8,
      last_reviewed_at: '2026-04-20T18:30:00Z',
      review_count: 3,
      initial_acquisition_depth: 0.65,
      predicted_retention: 0.60,
    },
    python_functions: {
      strength: 0.62,
      stability_days: 8.5,
      last_reviewed_at: '2026-04-21T14:00:00Z',
      review_count: 2,
      initial_acquisition_depth: 0.58,
      predicted_retention: 0.53,
    },
    python_scope: {
      strength: 0.50,
      stability_days: 5.2,
      last_reviewed_at: '2026-04-26T09:15:00Z',
      review_count: 1,
      initial_acquisition_depth: 0.50,
      predicted_retention: 0.80,
    },
    python_lists: {
      strength: 0.45,
      stability_days: 4.0,
      last_reviewed_at: '2026-04-27T11:00:00Z',
      review_count: 1,
      initial_acquisition_depth: 0.45,
      predicted_retention: 0.76,
    },
    python_dictionaries: {
      strength: 0.35,
      stability_days: 3.0,
      last_reviewed_at: '2026-04-28T16:00:00Z',
      review_count: 1,
      initial_acquisition_depth: 0.35,
      predicted_retention: 0.71,
    },

    // ── Mechanics course ──────────────────────────────────────────────────
    mech_scalars_vectors: {
      strength: 0.88,
      stability_days: 18.0,
      last_reviewed_at: '2026-04-26T10:00:00Z',
      review_count: 2,
      initial_acquisition_depth: 0.82,
      predicted_retention: 0.86,
    },
    mech_displacement_velocity: {
      strength: 0.74,
      stability_days: 13.5,
      last_reviewed_at: '2026-04-27T14:00:00Z',
      review_count: 2,
      initial_acquisition_depth: 0.70,
      predicted_retention: 0.80,
    },
    mech_kinematic_equations: {
      strength: 0.55,
      stability_days: 7.0,
      last_reviewed_at: '2026-04-25T16:00:00Z',
      review_count: 1,
      initial_acquisition_depth: 0.55,
      predicted_retention: 0.57,
    },
    mech_newtons_first_law: {
      strength: 0.48,
      stability_days: 5.0,
      last_reviewed_at: '2026-04-28T09:00:00Z',
      review_count: 1,
      initial_acquisition_depth: 0.48,
      predicted_retention: 0.78,
    },
  },

  preferences: {
    format: 'mixed',
    pace: 'medium',
    abstraction: 'intuition-first',
  },
  weaknesses: ['abstract scope rules', 'kinematic equations under time pressure'],
  engagement: {
    avg_time_per_slide_seconds: 91,
    quiz_accuracy: 0.69,
    preferred_layout: 'two-col',
    total_slides_completed: 14,
    total_sessions: 8,
    streak_days: 4,
  },
  memory_health: {
    avg_predicted_retention: 0.74,
    concepts_below_threshold: 3,
    next_review_due_at: '2026-04-29T00:00:00Z',
  },
}

// ─── Knowledge split by course (for per-course views) ────────────────────────

export const pythonKnowledgeKeys = [
  'python_variables_types',
  'python_conditionals',
  'python_loops',
  'python_functions',
  'python_scope',
  'python_lists',
  'python_dictionaries',
]

export const mechanicsKnowledgeKeys = [
  'mech_scalars_vectors',
  'mech_displacement_velocity',
  'mech_kinematic_equations',
  'mech_newtons_first_law',
]

export const CONCEPT_LABELS: Record<string, string> = {
  // Python
  python_variables_types: 'Variables & Types',
  python_conditionals: 'Conditionals',
  python_loops: 'Loops',
  python_functions: 'Functions',
  python_scope: 'Scope',
  python_lists: 'Lists',
  python_dictionaries: 'Dictionaries',
  // Mechanics
  mech_scalars_vectors: 'Scalars & Vectors',
  mech_displacement_velocity: 'Displacement & Velocity',
  mech_kinematic_equations: 'Kinematic Equations',
  mech_newtons_first_law: "Newton's 1st Law",
}

// ─── Review items from both courses ──────────────────────────────────────────

export const reviewItems: ReviewItem[] = [
  // Python — due
  {
    conceptId: 'python_loops',
    concept: 'Loops (for & while)',
    courseId: 'curr_python_001',
    courseLabel: '🐍 Python',
    predicted_retention: 0.60,
    review_format: 'quiz-and-explanation',
    chapter: 'Chapter 1 — Python Basics',
    question: "What does Python's range(2, 10, 3) produce?",
    choices: ['2, 3, 4, 5, 6, 7, 8, 9', '2, 5, 8', '3, 6, 9', '2, 4, 6, 8'],
    correct: 1,
    explanation:
      'range(start, stop, step) starts at 2, increments by 3, and stops before 10. So: 2, 5, 8. The stop value (10) is exclusive.',
  },
  {
    conceptId: 'python_functions',
    concept: 'Functions',
    courseId: 'curr_python_001',
    courseLabel: '🐍 Python',
    predicted_retention: 0.53,
    review_format: 'quiz-and-explanation',
    chapter: 'Chapter 2 — Functions & Data Structures',
    question: 'What does a Python function return if it has no return statement?',
    choices: ['0', 'An empty string ""', 'None', 'It raises a TypeError'],
    correct: 2,
    explanation:
      'In Python, a function that reaches the end without a return statement implicitly returns None — the absence of a value. Not zero, not an empty string.',
  },
  // Mechanics — due
  {
    conceptId: 'mech_kinematic_equations',
    concept: 'Kinematic Equations',
    courseId: 'curr_mechanics_001',
    courseLabel: '⚛ Mechanics',
    predicted_retention: 0.57,
    review_format: 'quiz-and-explanation',
    chapter: 'Chapter 1 — Kinematics',
    question: 'A car starts from rest and accelerates at 4 m/s². How far has it travelled after 3 seconds?',
    choices: ['12 m', '18 m', '36 m', '6 m'],
    correct: 1,
    explanation:
      'Use x = x₀ + v₀t + ½at². With x₀ = 0, v₀ = 0, a = 4, t = 3: x = 0 + 0 + ½ × 4 × 9 = 18 m.',
  },
]

// ─── Retention history ────────────────────────────────────────────────────────

export interface RetentionDataPoint {
  date: string
  concept: string
  retention: number
}

function retentionCurve(
  conceptId: string,
  stabilityDays: number,
  lastReviewedAt: string,
  reviewStrength: number,
): RetentionDataPoint[] {
  const points: RetentionDataPoint[] = []
  const base = new Date('2026-04-01')
  const reviewDate = new Date(lastReviewedAt)

  for (let d = 0; d < 30; d++) {
    const date = new Date(base)
    date.setDate(date.getDate() + d)

    let retention: number
    if (date < reviewDate) {
      const daysBefore = (reviewDate.getTime() - date.getTime()) / 86400000
      retention = Math.min(reviewStrength, Math.exp(-daysBefore / (stabilityDays * 0.6)))
    } else {
      const daysAfter = (date.getTime() - reviewDate.getTime()) / 86400000
      retention = reviewStrength * Math.exp(-daysAfter / stabilityDays)
    }

    points.push({
      date: date.toISOString().split('T')[0],
      concept: conceptId,
      retention: Math.max(0, Math.min(1, retention)),
    })
  }
  return points
}

// Python retention curves
export const pythonRetentionHistory: RetentionDataPoint[] = [
  ...retentionCurve('python_loops', 12.8, '2026-04-20T18:30:00Z', 0.70),
  ...retentionCurve('python_conditionals', 17.5, '2026-04-24T10:30:00Z', 0.82),
  ...retentionCurve('python_functions', 8.5, '2026-04-21T14:00:00Z', 0.62),
  ...retentionCurve('python_lists', 4.0, '2026-04-27T11:00:00Z', 0.45),
]

// Mechanics retention curves
export const mechanicsRetentionHistory: RetentionDataPoint[] = [
  ...retentionCurve('mech_scalars_vectors', 18.0, '2026-04-26T10:00:00Z', 0.88),
  ...retentionCurve('mech_displacement_velocity', 13.5, '2026-04-27T14:00:00Z', 0.74),
  ...retentionCurve('mech_kinematic_equations', 7.0, '2026-04-25T16:00:00Z', 0.55),
  ...retentionCurve('mech_newtons_first_law', 5.0, '2026-04-28T09:00:00Z', 0.48),
]

// Combined for all-courses view
export const retentionHistory: RetentionDataPoint[] = [
  ...pythonRetentionHistory,
  ...mechanicsRetentionHistory,
]
