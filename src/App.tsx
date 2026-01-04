import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { LoginPage } from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 公开路由 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 受保护路由 */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* 如果以后有课程详情页: <Route path="/lessons/:id" element={<LessonDetail />} /> */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* 404 兜底 */}
        <Route path="*" element={<div className="p-20 text-center">404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
