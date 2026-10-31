import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MapView from '../components/MapView'
import './Dashboard.css'

function Dashboard() {
  const [incidents, setIncidents] = useState([])
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('list') // 'list' or 'map'
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    highPriority: 0,
    inProgress: 0,
    resolved: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      const response = await axios.get('/api/incidents')
      setIncidents(response.data)
      calculateStats(response.data)
    } catch (error) {
      console.error('Error fetching incidents:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      open: data.filter(i => i.status === 'open').length,
      highPriority: data.filter(i => i.severity === 'high' || i.severity === 'critical').length,
      inProgress: data.filter(i => i.status === 'in-progress').length,
      resolved: data.filter(i => i.status === 'resolved').length,
    })
  }

  const updateStatus = async (incidentId, newStatus) => {
    try {
      await axios.patch(`/api/incidents/${incidentId}/status`, { status: newStatus })
      fetchIncidents()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const filteredIncidents = incidents.filter(incident => {
    if (filter === 'all') return true
    if (filter === 'open') return incident.status === 'open'
    if (filter === 'in-progress') return incident.status === 'in-progress'
    if (filter === 'resolved') return incident.status === 'resolved'
    if (filter === 'high') return incident.severity === 'high' || incident.severity === 'critical'
    return true
  })

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc3545'
      case 'high': return '#fd7e14'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#17a2b8'
      case 'in-progress': return '#ffc107'
      case 'resolved': return '#28a745'
      default: return '#6c757d'
    }
  }

  if (loading) {
    return (
      <div className="dashboard">
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
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <nav>
        <div className="logo">🆘 Sahayak</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/report">Report Incident</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Incident Dashboard</h1>
          <p>Monitor and manage emergency incidents</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Incidents</div>
          </div>
          <div className="stat-card stat-open">
            <div className="stat-number">{stats.open}</div>
            <div className="stat-label">Open</div>
          </div>
          <div className="stat-card stat-high">
            <div className="stat-number">{stats.highPriority}</div>
            <div className="stat-label">High Priority</div>
          </div>
          <div className="stat-card stat-progress">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card stat-resolved">
            <div className="stat-number">{stats.resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>

        <div className="dashboard-controls">
          <div className="filter-group">
            <label>Filter by:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Incidents</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="view-toggle">
            <button
              className={`btn btn-toggle ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              📋 List View
            </button>
            <button
              className={`btn btn-toggle ${view === 'map' ? 'active' : ''}`}
              onClick={() => setView('map')}
            >
              🗺️ Map View
            </button>
          </div>
          <button className="btn btn-refresh" onClick={fetchIncidents}>
            🔄 Refresh
          </button>
        </div>

        {view === 'list' ? (
          <div className="incidents-list">
            {filteredIncidents.length === 0 ? (
              <div className="no-incidents">No incidents found</div>
            ) : (
              filteredIncidents.map(incident => (
                <div key={incident._id} className="incident-card">
                  <div className="incident-header">
                    <div className="incident-type">{incident.incidentType || 'Unknown'}</div>
                    <div className="incident-id">#{incident._id.slice(-6).toUpperCase()}</div>
                  </div>
                  <div className="incident-body">
                    <p className="incident-description">{incident.description}</p>
                    <div className="incident-meta">
                      <span className="meta-item">
                        <strong>Location:</strong> {incident.location}
                      </span>
                      <span className="meta-item">
                        <strong>Time:</strong> {new Date(incident.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="incident-footer">
                    <div className="incident-severity" style={{ backgroundColor: getSeverityColor(incident.severity) }}>
                      {incident.severity || 'Unknown'} Severity
                    </div>
                    <div className="incident-status" style={{ backgroundColor: getStatusColor(incident.status) }}>
                      {incident.status || 'Unknown'}
                    </div>
                    <div className="incident-actions">
                      {incident.status === 'open' && (
                        <button
                          onClick={() => updateStatus(incident._id, 'in-progress')}
                          className="btn btn-small btn-assign"
                        >
                          Assign
                        </button>
                      )}
                      {incident.status === 'in-progress' && (
                        <button
                          onClick={() => updateStatus(incident._id, 'resolved')}
                          className="btn btn-small btn-resolve"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="map-container">
            <MapView incidents={filteredIncidents} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
