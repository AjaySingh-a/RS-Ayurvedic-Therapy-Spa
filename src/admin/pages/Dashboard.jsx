import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

function StatCard({ icon, bg, number, label }) {
  return (
    <div className="adm-stat-card">
      <div className={`adm-stat-icon ${bg}`}>{icon}</div>
      <div>
        <div className="adm-stat-number">{number}</div>
        <div className="adm-stat-label">{label}</div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ today: 0, pending: 0, confirmed: 0, employees: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    const today = new Date().toISOString().split('T')[0]

    const [todayRes, pendingRes, confirmedRes, empRes, recentRes] = await Promise.all([
      supabase.from('bookings').select('id', { count: 'exact' }).eq('preferred_date', today),
      supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'pending'),
      supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'confirmed'),
      supabase.from('employees').select('id', { count: 'exact' }).eq('is_active', true),
      supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(8),
    ])

    setStats({
      today: todayRes.count || 0,
      pending: pendingRes.count || 0,
      confirmed: confirmedRes.count || 0,
      employees: empRes.count || 0,
    })
    setRecent(recentRes.data || [])
    setLoading(false)
  }

  if (loading) return (
    <div className="admin-loading" style={{ minHeight: 'auto', padding: 60 }}>
      <div><div className="adm-spinner" /></div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Dashboard</h2>
        <p style={{ color: 'var(--adm-text-dim)', marginTop: 4, fontSize: 13.5 }}>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="adm-stats-grid">
        <StatCard icon="📅" bg="gold" number={stats.today} label="Today's Bookings" />
        <StatCard icon="⏳" bg="gold" number={stats.pending} label="Pending Approval" />
        <StatCard icon="✅" bg="green" number={stats.confirmed} label="Confirmed" />
        <StatCard icon="👥" bg="blue" number={stats.employees} label="Active Employees" />
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Recent Bookings</h3>
          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => navigate('/admin/bookings')}>
            View All →
          </button>
        </div>
        <div className="adm-table-wrap">
          {recent.length === 0 ? (
            <div className="adm-empty">
              <div className="adm-empty-icon">📋</div>
              <h4>No bookings yet</h4>
              <p>Bookings from your website will appear here.</p>
            </div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Guests</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(b => (
                  <tr key={b.id} className="clickable" onClick={() => navigate('/admin/bookings')}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.client_name}</div>
                      {b.client_phone && <div style={{ fontSize: 12, color: 'var(--adm-text-dim)' }}>{b.client_phone}</div>}
                    </td>
                    <td style={{ maxWidth: 200 }}>
                      <div style={{ fontSize: 13 }}>{b.service_name.split('—')[0].trim()}</div>
                    </td>
                    <td>{new Date(b.preferred_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                    <td>{b.preferred_time?.slice(0, 5)}</td>
                    <td>{b.guests}</td>
                    <td><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
