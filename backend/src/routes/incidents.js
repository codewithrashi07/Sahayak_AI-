const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const axios = require('axios');

// Get all incidents with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, severity, incidentType } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (severity) filter.severity = severity;
    if (incidentType) filter.incidentType = incidentType;

    const incidents = await Incident.find(filter).sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error: error.message });
  }
});

// Get single incident by ID
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incident', error: error.message });
  }
});

// Create new incident
router.post('/', async (req, res) => {
  try {
    const { description, incidentType, location, latitude, longitude, image } = req.body;

    // Create incident with default values
    const incident = new Incident({
      description,
      incidentType: incidentType || 'other',
      location,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      severity: 'medium',
      status: 'open',
    });

    // Call AI service for classification
    try {
      const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/api/classify`, {
        description,
        incidentType,
      });

      if (aiResponse.data) {
        incident.aiSuggestion = {
          category: aiResponse.data.category,
          severity: aiResponse.data.severity,
          confidence: aiResponse.data.confidence,
        };
        // Use AI suggestion as initial value
        incident.incidentType = aiResponse.data.category || incidentType;
        incident.severity = aiResponse.data.severity || 'medium';
      }
    } catch (aiError) {
      console.log('AI service unavailable, using default values');
    }

    const savedIncident = await incident.save();
    res.status(201).json(savedIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error creating incident', error: error.message });
  }
});

// Update incident status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    // Add to status history
    incident.statusHistory.push({
      status: status,
      notes: notes,
    });

    incident.status = status;
    const updatedIncident = await incident.save();
    res.json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
});

// Assign incident to responder
router.patch('/:id/assign', async (req, res) => {
  try {
    const { assignedTo } = req.body;
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    incident.assignedTo = assignedTo;
    incident.status = 'in-progress';
    incident.statusHistory.push({
      status: 'in-progress',
      notes: `Assigned to ${assignedTo}`,
    });

    const updatedIncident = await incident.save();
    res.json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning incident', error: error.message });
  }
});

module.exports = router;
