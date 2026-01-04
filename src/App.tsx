import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { LoginPage } from './pages/Login'

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* public */}
        <Route path="/login" element={<LoginPage />} />

        {/* protected */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* other routes need protect: <Route path="/lessons/:id" element={<LessonDetail />} /> */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="p-20 text-center">404 Page Not Found</div>} />
      </Routes>
    </HashRouter>
  )
}

export default App
