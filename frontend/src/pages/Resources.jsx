import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Resources.css'

function Resources() {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: 'City General Hospital',
      type: 'hospital',
      address: '123 Main Street, Ward 5',
      phone: '+91-11-23456789',
      latitude: 28.6139,
      longitude: 77.2090,
      capacity: 'High',
      status: 'Operational',
    },
    {
      id: 2,
      name: 'Emergency Shelter Center A',
      type: 'shelter',
      address: '45 Market Road, Ward 8',
      phone: '+91-11-23456790',
      latitude: 28.6150,
      longitude: 77.2100,
      capacity: 'Medium',
      status: 'Open',
    },
    {
      id: 3,
      name: 'Relief Distribution Center',
      type: 'relief',
      address: '78 Sector 4, Near Community Hall',
      phone: '+91-11-23456791',
      latitude: 28.6120,
      longitude: 77.2080,
      capacity: 'High',
      status: 'Open',
    },
    {
      id: 4,
      name: 'District Hospital',
      type: 'hospital',
      address: '56 Highway Exit 4',
      phone: '+91-11-23456792',
      latitude: 28.6140,
      longitude: 77.2110,
      capacity: 'High',
      status: 'Operational',
    },
    {
      id: 5,
      name: 'Community Shelter Hall',
      type: 'shelter',
      address: '90 Hill Road, Mile 5',
      phone: '+91-11-23456793',
      latitude: 28.6110,
      longitude: 77.2070,
      capacity: 'Low',
      status: 'Open',
    },
    {
      id: 6,
      name: 'Emergency Response Team HQ',
      type: 'emergency',
      address: '12 Main Junction',
      phone: '+91-11-23456794',
      latitude: 28.6160,
      longitude: 77.2120,
      capacity: 'N/A',
      status: 'Active',
    },
  ])

  const [filter, setFilter] = useState('all')

  const filteredResources = resources.filter(resource => {
    if (filter === 'all') return true
    return resource.type === filter
  })

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hospital': return '🏥'
      case 'shelter': return '🏠'
      case 'relief': return '📦'
      case 'emergency': return '🚨'
      default: return '📍'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'hospital': return '#dc3545'
      case 'shelter': return '#28a745'
      case 'relief': return '#ffc107'
      case 'emergency': return '#667eea'
      default: return '#6c757d'
    }
  }

  return (
    <div className="resources">
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

      <div className="resources-container">
        <div className="resources-header">
          <h1>Resource Directory</h1>
          <p>Find nearby hospitals, shelters, and relief centers</p>
        </div>

        <div className="resources-controls">
          <div className="filter-group">
            <label>Filter by type:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Resources</option>
              <option value="hospital">Hospitals</option>
              <option value="shelter">Shelters</option>
              <option value="relief">Relief Centers</option>
              <option value="emergency">Emergency Services</option>
            </select>
          </div>
        </div>

        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-header">
                <div className="resource-icon">{getTypeIcon(resource.type)}</div>
                <div className="resource-type" style={{ color: getTypeColor(resource.type) }}>
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </div>
              </div>
              <div className="resource-body">
                <h3>{resource.name}</h3>
                <p className="resource-address">{resource.address}</p>
                <div className="resource-details">
                  <div className="detail-item">
                    <strong>Phone:</strong> {resource.phone}
                  </div>
                  <div className="detail-item">
                    <strong>Capacity:</strong> {resource.capacity}
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong>
                    <span className={`status-badge ${resource.status.toLowerCase()}`}>
                      {resource.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="resource-footer">
                <button className="btn btn-primary">
                  📍 Get Directions
                </button>
                <button className="btn btn-secondary">
                  📞 Call
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="resources-info">
          <h3>Important Information</h3>
          <ul>
            <li>Contact emergency services (e.g., 112, 108) for life-threatening situations</li>
            <li>Call ahead to confirm availability and operating hours</li>
            <li>Bring identification and essential documents when visiting shelters</li>
            <li>Follow official guidelines and instructions from authorities</li>
            <li>This directory is for reference - always verify with official sources</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Resources
