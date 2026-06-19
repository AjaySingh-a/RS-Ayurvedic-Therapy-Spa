import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AdminLogin({ session }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) navigate('/admin', { replace: true })
  }, [session])

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else navigate('/admin', { replace: true })
    setLoading(false)
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <h1>🌿 RS Ayurvedic Spa</h1>
          <p>Admin Panel — Sign in to continue</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="adm-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@rsspa.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="adm-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#9ca3af' }}>
          First time? Create your account from Supabase Dashboard → Authentication → Users
        </p>
      </div>
    </div>
  )
}
