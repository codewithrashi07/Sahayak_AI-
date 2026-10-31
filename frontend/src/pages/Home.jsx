import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
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

      <div className="hero">
        <div className="hero-content">
          <h1>AI-Powered Disaster Management Response Platform</h1>
          <p>
            A unified digital platform to report emergencies, prioritize incidents,
            coordinate responders and connect people with nearby help.
          </p>
          <div className="hero-buttons">
            <Link to="/report" className="btn btn-primary">
              Report Emergency
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              View Dashboard
            </Link>
            <Link to="/resources" className="btn btn-secondary">
              Find Resources
            </Link>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Quick Reporting</h3>
          <p>Submit emergency reports with text, location, and optional photos</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Analysis</h3>
          <p>Automatic incident classification and priority suggestions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>Real-time Tracking</h3>
          <p>Live dashboard to monitor incidents and response status</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏥</div>
          <h3>Resource Directory</h3>
          <p>Find nearby hospitals, shelters, and relief centers</p>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Sahayak - AI-Powered Disaster Management Response Platform</p>
        <p className="disclaimer">
          This is a coordination aid and prototype, not a replacement for emergency services.
        </p>
      </footer>
    </div>
  )
}

export default Home
