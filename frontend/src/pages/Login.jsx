import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'citizen',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: formData.role,
      }))
      setLoading(false)

      if (formData.role === 'admin' || formData.role === 'responder') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }, 1000)
  }

  return (
    <div className="login">
      <nav>
        <div className="logo">🆘 Sahayak</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/report">Report Incident</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-header">
          <h1>Login to Sahayak</h1>
          <p>Access the disaster management platform</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="citizen">Citizen</option>
              <option value="responder">Responder / Volunteer</option>
              <option value="admin">Admin / Control Room Operator</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-info">
          <h3>Demo Login</h3>
          <p>For demonstration purposes, you can use any email and password.</p>
          <p>Select your role to access different features:</p>
          <ul>
            <li><strong>Citizen:</strong> Report incidents and view status</li>
            <li><strong>Responder:</strong> View assigned incidents and update progress</li>
            <li><strong>Admin:</strong> Full dashboard access with incident management</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
