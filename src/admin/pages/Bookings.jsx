import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUSES = ['all', 'pending', 'confirmed', 'cancelled', 'completed']

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>
}

function BookingModal({ booking, employees, onClose, onSave }) {
  const [status, setStatus] = useState(booking.status)
  const [employeeId, setEmployeeId] = useState(booking.employee_id || '')
  const [confirmedTime, setConfirmedTime] = useState(booking.confirmed_time || booking.preferred_time?.slice(0, 5) || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const { error } = await supabase.from('bookings').update({
      status,
      employee_id: employeeId || null,
      confirmed_time: confirmedTime || null,
    }).eq('id', booking.id)
    if (!error) onSave()
    setSaving(false)
  }

  const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-header">
          <h3>Booking Details</h3>
          <button className="adm-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="adm-modal-body">

          <div className="adm-info-grid">
            <div className="adm-info-item">
              <label>Client Name</label>
              <span>{booking.client_name}</span>
            </div>
            <div className="adm-info-item">
              <label>Phone</label>
              <span>{booking.client_phone || '—'}</span>
            </div>
            <div className="adm-info-item full" style={{ gridColumn: '1/-1' }}>
              <label>Service</label>
              <span>{booking.service_name}</span>
            </div>
            <div className="adm-info-item">
              <label>Preferred Date</label>
              <span>{fmtDate(booking.preferred_date)}</span>
            </div>
            <div className="adm-info-item">
              <label>Preferred Time</label>
              <span>{booking.preferred_time?.slice(0, 5)}</span>
            </div>
            <div className="adm-info-item">
              <label>Guests</label>
              <span>{booking.guests}</span>
            </div>
            <div className="adm-info-item">
              <label>Booked On</label>
              <span>{new Date(booking.created_at).toLocaleDateString('en-IN')}</span>
            </div>
            {booking.notes && (
              <div className="adm-info-item" style={{ gridColumn: '1/-1' }}>
                <label>Notes</label>
                <span>{booking.notes}</span>
              </div>
            )}
          </div>

          <div className="adm-divider">Update Status</div>
          <div className="adm-status-chips">
            {['pending', 'confirmed', 'cancelled', 'completed'].map(s => (
              <button
                key={s}
                className={`adm-status-chip${status === s ? ` selected-${s}` : ''}`}
                onClick={() => setStatus(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <div className="adm-divider" style={{ marginTop: 20 }}>Assign Employee</div>
          <div className="adm-field">
            <label>Select Employee</label>
            <select value={employeeId} onChange={e => setEmployeeId(e.target.value)}>
              <option value="">— Not assigned —</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div className="adm-field">
            <label>Confirmed Slot Time</label>
            <input type="time" value={confirmedTime} onChange={e => setConfirmedTime(e.target.value)} />
          </div>

        </div>
        <div className="adm-modal-footer">
          <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [employees, setEmployees] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [])

  const loadAll = async () => {
    const [bRes, eRes] = await Promise.all([
      supabase.from('bookings').select('*, employees(name)').order('created_at', { ascending: false }),
      supabase.from('employees').select('*').eq('is_active', true).order('name'),
    ])
    setBookings(bRes.data || [])
    setEmployees(eRes.data || [])
    setLoading(false)
  }

  const filtered = bookings.filter(b => {
    const matchTab = activeTab === 'all' || b.status === activeTab
    const q = search.toLowerCase()
    const matchSearch = !q || b.client_name.toLowerCase().includes(q) || (b.client_phone || '').includes(q) || b.service_name.toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = s === 'all' ? bookings.length : bookings.filter(b => b.status === s).length
    return acc
  }, {})

  const handleSave = () => {
    setSelected(null)
    loadAll()
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Bookings</h2>
        <p style={{ color: 'var(--adm-text-dim)', marginTop: 4, fontSize: 13.5 }}>Manage all incoming bookings from the website.</p>
      </div>

      <div className="adm-card">
        <div className="adm-card-header" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div className="adm-tabs">
            {STATUSES.map(s => (
              <button
                key={s}
                className={`adm-tab${activeTab === s ? ' active' : ''}`}
                onClick={() => setActiveTab(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
              </button>
            ))}
          </div>
          <div className="adm-search-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search client, service…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="adm-table-wrap">
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center' }}><div className="adm-spinner" /></div>
          ) : filtered.length === 0 ? (
            <div className="adm-empty">
              <div className="adm-empty-icon">📋</div>
              <h4>No bookings found</h4>
              <p>{search ? 'Try a different search term.' : 'Bookings will appear here when clients submit the form.'}</p>
            </div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Guests</th>
                  <th>Employee</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="clickable" onClick={() => setSelected(b)}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.client_name}</div>
                      {b.client_phone && <div style={{ fontSize: 12, color: 'var(--adm-text-dim)' }}>{b.client_phone}</div>}
                    </td>
                    <td>
                      <div style={{ fontSize: 13, maxWidth: 180 }}>{b.service_name.split('—')[0].trim()}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>
                        {new Date(b.preferred_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--adm-text-dim)' }}>
                        {b.confirmed_time ? `✓ ${b.confirmed_time.slice(0,5)}` : b.preferred_time?.slice(0,5)}
                      </div>
                    </td>
                    <td>{b.guests}</td>
                    <td>
                      {b.employees?.name
                        ? <span style={{ fontSize: 13, color: 'var(--adm-sidebar)', fontWeight: 500 }}>{b.employees.name}</span>
                        : <span style={{ fontSize: 12, color: 'var(--adm-text-dim)' }}>Unassigned</span>}
                    </td>
                    <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                    <td>
                      <button
                        className="adm-btn adm-btn-ghost adm-btn-sm"
                        onClick={e => { e.stopPropagation(); setSelected(b) }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selected && (
        <BookingModal
          booking={selected}
          employees={employees}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
