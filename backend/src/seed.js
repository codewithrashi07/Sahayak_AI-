require('dotenv').config();
const mongoose = require('mongoose');
const Incident = require('./models/Incident');

const sampleIncidents = [
  {
    description: 'Severe flooding in Ward 12, water level rising rapidly, people trapped in homes',
    incidentType: 'flood',
    location: 'Ward 12, Main Street',
    latitude: 28.6139,
    longitude: 77.2090,
    severity: 'critical',
    status: 'open',
    aiSuggestion: {
      category: 'flood',
      severity: 'critical',
      confidence: 0.85,
    },
  },
  {
    description: 'Fire reported at Market Road shop, flames spreading quickly',
    incidentType: 'fire',
    location: 'Market Road, Shop No. 42',
    latitude: 28.6150,
    longitude: 77.2100,
    severity: 'high',
    status: 'open',
    aiSuggestion: {
      category: 'fire',
      severity: 'high',
      confidence: 0.8,
    },
  },
  {
    description: 'Large tree fallen on Sector 4 road blocking traffic',
    incidentType: 'other',
    location: 'Sector 4, Main Road',
    latitude: 28.6120,
    longitude: 77.2080,
    severity: 'medium',
    status: 'in-progress',
    assignedTo: 'Team Alpha',
    aiSuggestion: {
      category: 'other',
      severity: 'medium',
      confidence: 0.7,
    },
  },
  {
    description: 'Medical emergency, person injured in accident near highway',
    incidentType: 'medical',
    location: 'Highway Exit 4',
    latitude: 28.6140,
    longitude: 77.2110,
    severity: 'high',
    status: 'resolved',
    aiSuggestion: {
      category: 'medical',
      severity: 'high',
      confidence: 0.8,
    },
  },
  {
    description: 'Minor landslide reported on hilly road, debris blocking path',
    incidentType: 'landslide',
    location: 'Hill Road, Mile 5',
    latitude: 28.6110,
    longitude: 77.2070,
    severity: 'medium',
    status: 'open',
    aiSuggestion: {
      category: 'landslide',
      severity: 'medium',
      confidence: 0.75,
    },
  },
  {
    description: 'Vehicle collision at intersection, no serious injuries reported',
    incidentType: 'accident',
    location: 'Main Junction',
    latitude: 28.6160,
    longitude: 77.2120,
    severity: 'low',
    status: 'resolved',
    aiSuggestion: {
      category: 'accident',
      severity: 'low',
      confidence: 0.75,
    },
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sahayak');
    console.log('Connected to MongoDB');

    // Clear existing incidents
    await Incident.deleteMany({});
    console.log('Cleared existing incidents');

    // Insert sample incidents
    await Incident.insertMany(sampleIncidents);
    console.log('Sample incidents inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
