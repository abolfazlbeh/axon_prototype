import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppShell } from './components/AppShell'
import { LandingPage } from './pages/LandingPage'
import { ClarificationPage } from './pages/ClarificationPage'
import { WaitingPage } from './pages/WaitingPage'
import { CurriculumOverviewPage } from './pages/CurriculumOverviewPage'
import { SlideViewerPage } from './pages/SlideViewerPage'
import { ReviewSessionPage } from './pages/ReviewSessionPage'
import { MemoryDashboardPage } from './pages/MemoryDashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import { NotificationsPage } from './pages/NotificationsPage'

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/clarification" element={<ClarificationPage />} />
            <Route path="/waiting" element={<WaitingPage />} />
            <Route path="/curriculum" element={<CurriculumOverviewPage />} />
            <Route path="/slide/:chapterId/:slideIndex" element={<SlideViewerPage />} />
            <Route path="/review" element={<ReviewSessionPage />} />
            <Route path="/memory" element={<MemoryDashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </AnimatePresence>
      </AppShell>
    </BrowserRouter>
  )
}
