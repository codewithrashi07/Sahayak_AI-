import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './ReportIncident.css'

function ReportIncident() {
  const [formData, setFormData] = useState({
    description: '',
    incidentType: '',
    location: '',
    latitude: '',
    longitude: '',
    image: null,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
            location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          }))
        },
        (error) => {
          setError('Unable to retrieve location. Please enter manually.')
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('description', formData.description)
      formDataToSend.append('incidentType', formData.incidentType)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('latitude', formData.latitude)
      formDataToSend.append('longitude', formData.longitude)
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      const response = await axios.post('/api/incidents', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess(true)
      setFormData({
        description: '',
        incidentType: '',
        location: '',
        latitude: '',
        longitude: '',
        image: null,
      })

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to submit report. Please try again.')
      console.error('Error submitting report:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="report-incident">
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

      <div className="report-container">
        <div className="report-header">
          <h1>Report an Emergency</h1>
          <p>Provide details about the incident to help responders assist quickly</p>
        </div>

        {success && (
          <div className="alert alert-success">
            ✓ Report submitted successfully! Your report ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="description">Incident Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the emergency situation in detail..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="incidentType">Incident Type</label>
            <select
              id="incidentType"
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
            >
              <option value="">Select type (optional)</option>
              <option value="flood">Flood</option>
              <option value="fire">Fire</option>
              <option value="earthquake">Earthquake</option>
              <option value="landslide">Landslide</option>
              <option value="medical">Medical Emergency</option>
              <option value="accident">Accident</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <div className="location-input-group">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter address or description of location"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="btn-location"
              >
                📍 Use Current Location
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Auto-filled or enter manually"
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Auto-filled or enter manually"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Photo (Optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="file-input"
            />
            <p className="help-text">Maximum file size: 5MB</p>
          </div>

          <button
            type="submit"
            className="btn btn-submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>

        <div className="report-info">
          <h3>Important Information</h3>
          <ul>
            <li>Provide accurate and detailed information</li>
            <li>Include specific landmarks if possible</li>
            <li>Photos can help responders understand the situation better</li>
            <li>You will receive a reference number to track your report</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReportIncident
