import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Employees from './pages/Employees'
import Clients from './pages/Clients'
import './admin.css'

function ProtectedRoute({ session, children }) {
  if (!session) return <Navigate to="/admin/login" replace />
  return children
}

export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div className="admin-loading">
      <div><div className="adm-spinner" /><p>Loading...</p></div>
    </div>
  )

  return (
    <Routes>
      <Route path="login" element={<AdminLogin session={session} />} />
      <Route path="*" element={
        <ProtectedRoute session={session}>
          <AdminLayout session={session}>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="employees" element={<Employees />} />
              <Route path="clients" element={<Clients />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}
