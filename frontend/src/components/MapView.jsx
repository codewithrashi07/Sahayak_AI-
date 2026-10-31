import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapView.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function MapView({ incidents }) {
  const [center, setCenter] = useState([28.6139, 77.2090]) // Default to Delhi coordinates

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc3545'
      case 'high': return '#fd7e14'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  const createCustomIcon = (severity) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${getSeverityColor(severity)}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })
  }

  const validIncidents = incidents.filter(
    incident => incident.latitude && incident.longitude
  )

  if (validIncidents.length > 0) {
    const avgLat = validIncidents.reduce((sum, i) => sum + i.latitude, 0) / validIncidents.length
    const avgLng = validIncidents.reduce((sum, i) => sum + i.longitude, 0) / validIncidents.length
    setCenter([avgLat, avgLng])
  }

  return (
    <div className="map-view">
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validIncidents.map((incident) => (
          <Marker
            key={incident._id}
            position={[incident.latitude, incident.longitude]}
            icon={createCustomIcon(incident.severity)}
          >
            <Popup>
              <div className="popup-content">
                <h3>{incident.incidentType || 'Unknown'}</h3>
                <p><strong>Status:</strong> {incident.status}</p>
                <p><strong>Severity:</strong> {incident.severity}</p>
                <p><strong>Location:</strong> {incident.location}</p>
                <p className="description">{incident.description}</p>
                {incident.assignedTo && (
                  <p><strong>Assigned to:</strong> {incident.assignedTo}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView
