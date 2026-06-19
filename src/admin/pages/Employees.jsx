import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const BLANK = { name: '', phone: '', email: '', specializations: '', is_active: true }

function EmployeeModal({ employee, onClose, onSave }) {
  const isEdit = !!employee?.id
  const [form, setForm] = useState(
    isEdit
      ? { ...employee, specializations: (employee.specializations || []).join(', ') }
      : BLANK
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required.'); return }
    setSaving(true)
    setError('')
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      specializations: form.specializations ? form.specializations.split(',').map(s => s.trim()).filter(Boolean) : [],
      is_active: form.is_active,
    }
    const { error } = isEdit
      ? await supabase.from('employees').update(payload).eq('id', employee.id)
      : await supabase.from('employees').insert(payload)
    if (error) { setError(error.message); setSaving(false); return }
    onSave()
  }

  return (
    <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-header">
          <h3>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h3>
          <button className="adm-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="adm-modal-body">
          {error && <div className="admin-login-error" style={{ marginBottom: 16 }}>{error}</div>}
          <div className="adm-form-grid">
            <div className="adm-field full">
              <label>Full Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Priya Sharma" />
            </div>
            <div className="adm-field">
              <label>Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div className="adm-field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="priya@rsspa.com" />
            </div>
            <div className="adm-field full">
              <label>Specializations (comma separated)</label>
              <input
                value={form.specializations}
                onChange={e => set('specializations', e.target.value)}
                placeholder="Abhyanga, Shirodhara, Deep Tissue"
              />
            </div>
            <div className="adm-field full">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={e => set('is_active', e.target.checked)}
                  style={{ width: 'auto', margin: 0 }}
                />
                Active Employee
              </label>
            </div>
          </div>
        </div>
        <div className="adm-modal-footer">
          <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    const { data } = await supabase.from('employees').select('*').order('name')
    setEmployees(data || [])
    setLoading(false)
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from the team?`)) return
    await supabase.from('employees').delete().eq('id', id)
    load()
  }

  const handleSave = () => {
    setModal(null)
    load()
  }

  const filtered = employees.filter(e =>
    !search || e.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Employees</h2>
        <p style={{ color: 'var(--adm-text-dim)', marginTop: 4, fontSize: 13.5 }}>Manage your therapy team.</p>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <div className="adm-search-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search employee…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="adm-btn adm-btn-primary" onClick={() => setModal({})}>
            + Add Employee
          </button>
        </div>

        <div className="adm-card-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="adm-spinner" /></div>
          ) : filtered.length === 0 ? (
            <div className="adm-empty">
              <div className="adm-empty-icon">👥</div>
              <h4>{search ? 'No employees found' : 'No employees yet'}</h4>
              <p>{search ? 'Try a different name.' : 'Add your first team member to get started.'}</p>
            </div>
          ) : (
            <div className="adm-employee-grid">
              {filtered.map(emp => (
                <div key={emp.id} className="adm-employee-card">
                  <div className="adm-employee-head">
                    <div className="adm-employee-avatar">{emp.name.charAt(0)}</div>
                    <div>
                      <div className="adm-employee-name">{emp.name}</div>
                      <div className="adm-employee-phone">{emp.phone || emp.email || 'No contact info'}</div>
                    </div>
                    <span
                      className={`badge badge-${emp.is_active ? 'confirmed' : 'cancelled'}`}
                      style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}
                    >
                      {emp.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {emp.specializations?.length > 0 && (
                    <div className="adm-tags">
                      {emp.specializations.map(s => (
                        <span key={s} className="adm-tag">{s}</span>
                      ))}
                    </div>
                  )}

                  <div className="adm-employee-actions">
                    <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setModal(emp)}>
                      Edit
                    </button>
                    <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => handleDelete(emp.id, emp.name)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {modal !== null && (
        <EmployeeModal
          employee={modal?.id ? modal : null}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
