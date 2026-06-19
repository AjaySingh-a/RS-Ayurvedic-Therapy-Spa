import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function ClientModal({ client, onClose }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('bookings')
      .select('*, employees(name)')
      .eq('client_phone', client.phone)
      .order('preferred_date', { ascending: false })
      .then(({ data }) => { setBookings(data || []); setLoading(false) })
  }, [client])

  return (
    <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal" style={{ maxWidth: 600 }}>
        <div className="adm-modal-header">
          <h3>{client.name} — Booking History</h3>
          <button className="adm-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="adm-modal-body">
          <div className="adm-info-grid" style={{ marginBottom: 20 }}>
            <div className="adm-info-item">
              <label>Phone</label>
              <span>{client.phone || '—'}</span>
            </div>
            <div className="adm-info-item">
              <label>Total Visits</label>
              <span>{client.total_bookings}</span>
            </div>
          </div>

          <div className="adm-divider">Past Bookings</div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 24 }}><div className="adm-spinner" /></div>
          ) : bookings.length === 0 ? (
            <p style={{ color: 'var(--adm-text-dim)', fontSize: 13 }}>No booking history found.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Employee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td style={{ fontSize: 13 }}>{b.service_name.split('—')[0].trim()}</td>
                    <td>
                      {new Date(b.preferred_date).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td>
                      {b.employees?.name
                        ? <span style={{ fontSize: 13, color: 'var(--adm-sidebar)', fontWeight: 500 }}>{b.employees.name}</span>
                        : <span style={{ fontSize: 12, color: 'var(--adm-text-dim)' }}>—</span>}
                    </td>
                    <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="adm-modal-footer">
          <button className="adm-btn adm-btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => { load() }, [])

  const load = async () => {
    // Read from the real clients table (single source of truth),
    // then enrich each with booking count + last visit from bookings.
    const [clientsRes, bookingsRes] = await Promise.all([
      supabase.from('clients').select('*').order('created_at', { ascending: false }),
      supabase.from('bookings').select('client_name, client_phone, created_at'),
    ])

    const clientRows = clientsRes.data || []
    const bookings = bookingsRes.data || []

    const merged = clientRows.map(c => {
      const matches = bookings.filter(b =>
        c.phone ? b.client_phone === c.phone : b.client_name === c.name
      )
      const last = matches.reduce(
        (acc, b) => (!acc || new Date(b.created_at) > new Date(acc)) ? b.created_at : acc,
        null
      )
      return {
        name: c.name,
        phone: c.phone,
        email: c.email,
        total_bookings: matches.length,
        last_visit: last || c.created_at,
      }
    })

    setClients(merged)
    setLoading(false)
  }

  const filtered = clients.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search)
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Clients</h2>
        <p style={{ color: 'var(--adm-text-dim)', marginTop: 4, fontSize: 13.5 }}>
          All clients auto-created from website bookings.
        </p>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <div className="adm-search-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search by name or phone…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--adm-text-dim)' }}>{clients.length} total clients</span>
        </div>

        <div className="adm-table-wrap">
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center' }}><div className="adm-spinner" /></div>
          ) : filtered.length === 0 ? (
            <div className="adm-empty">
              <div className="adm-empty-icon">👤</div>
              <h4>{search ? 'No clients found' : 'No clients yet'}</h4>
              <p>Clients appear here automatically when a booking is submitted.</p>
            </div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Phone</th>
                  <th>Total Bookings</th>
                  <th>Last Visit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #1a2e2b, #2e4f4a)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#c8a96e', fontWeight: 700, fontSize: 13, flexShrink: 0
                        }}>
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{c.name}</div>
                          {c.email && <div style={{ fontSize: 12, color: 'var(--adm-text-dim)' }}>{c.email}</div>}
                        </div>
                      </div>
                    </td>
                    <td>{c.phone || '—'}</td>
                    <td>
                      <span style={{
                        background: '#e8f5e9', color: '#2e7d32',
                        padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600
                      }}>
                        {c.total_bookings} {c.total_bookings === 1 ? 'visit' : 'visits'}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--adm-text-dim)' }}>
                      {new Date(c.last_visit).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      {c.phone && (
                        <button
                          className="adm-btn adm-btn-ghost adm-btn-sm"
                          onClick={() => setSelected(c)}
                        >
                          History
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selected && (
        <ClientModal client={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
