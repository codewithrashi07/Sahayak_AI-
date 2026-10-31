# Sahayak - AI-Powered Disaster Management Response Platform

A unified digital platform to report emergencies, prioritize incidents, coordinate responders and connect people with nearby help.

## Project Overview

Sahayak is a software-based disaster response and coordination platform designed to support citizens, emergency volunteers, response teams and administrators during events such as floods, earthquakes, fires, severe weather and other local emergencies.

## Features

- **Citizen Reporting**: Submit emergency reports with text, location, and optional photos
- **AI Analysis**: Automatic incident classification and priority suggestions using rule-based analysis
- **Real-time Dashboard**: Monitor incidents by status, priority, and category
- **Location Tracking**: GPS integration for accurate incident location
- **Status Management**: Track incident progress from report to resolution
- **Role-based Access**: Different interfaces for citizens, responders, and administrators

## Tech Stack

### Frontend
- React.js with Vite
- React Router for navigation
- Axios for API calls
- Leaflet and React-Leaflet for maps
- CSS for styling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- REST API architecture
- CORS enabled

### AI Service
- Python with FastAPI
- Rule-based incident classification
- Pydantic for data validation

## Project Structure

```
Sahayak/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── components/ # Reusable components
│   │   └── App.jsx   # Main app component
│   └── package.json
├── backend/           # Express.js backend
│   ├── src/
│   │   ├── models/   # Mongoose models
│   │   ├── routes/   # API routes
│   │   ├── server.js # Main server file
│   │   └── seed.js   # Database seed script
│   └── package.json
├── ai-service/        # FastAPI AI service
│   ├── main.py       # FastAPI application
│   └── requirements.txt
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (running locally or cloud instance)

### 1. Clone and Setup Project

```bash
cd Sahayak
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

### 3. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sahayak
AI_SERVICE_URL=http://localhost:8000
```

Start the backend server:
```bash
npm start
```

Backend will run on http://localhost:5000

### 4. Setup AI Service

```bash
cd ai-service
pip install -r requirements.txt
python main.py
```

AI service will run on http://localhost:8000

### 5. Seed Database (Optional)

To populate the database with sample data:
```bash
cd backend
node src/seed.js
```

## Usage

### Running the Application

1. Start MongoDB
2. Start the AI service: `cd ai-service && python main.py`
3. Start the backend: `cd backend && npm start`
4. Start the frontend: `cd frontend && npm run dev`

### Accessing the Application

- Open http://localhost:3000 in your browser
- Navigate through:
  - Home: Overview and features
  - Report Incident: Submit emergency reports
  - Dashboard: View and manage incidents (admin/responder)
  - Login: Authenticate with role selection

### User Roles

- **Citizen**: Can report incidents and view status
- **Responder**: Can view assigned incidents and update progress
- **Admin**: Full access to dashboard with incident management capabilities

## API Endpoints

### Incidents

- `GET /api/incidents` - Get all incidents (with optional filters)
- `GET /api/incidents/:id` - Get single incident by ID
- `POST /api/incidents` - Create new incident
- `PATCH /api/incidents/:id/status` - Update incident status
- `PATCH /api/incidents/:id/assign` - Assign incident to responder

### AI Service

- `POST /api/classify` - Classify incident description
- `GET /health` - Health check endpoint

## Development

### Frontend Development

```bash
cd frontend
npm run dev
```

### Backend Development

```bash
cd backend
npm start
```

### AI Service Development

```bash
cd ai-service
python main.py
```

## Security & Privacy Notes

- This is a prototype and coordination aid, not a replacement for emergency services
- AI output is advisory and must be reviewed by authorized personnel
- Location data and personal information should be handled with care
- In production, implement proper authentication, encryption, and access controls
- Never present sample data as live emergency information

## Future Enhancements

- Integration with official emergency services
- Real-time notifications via WebSocket
- Advanced ML models for classification
- Mobile application
- Multi-language support
- Offline mode support
- Integration with weather and alert services

## License

This project is a prototype for demonstration purposes.

---

## 👨‍💻 Author

**Rashi Yadav**

- **GitHub:** [@codewithrashi07](https://github.com/codewithrashi07)
- **LinkedIn:** [Rashi Yadav](https://linkedin.com/in/rashi-yadav-617ab437b/)
- **Email:** rashiyadav684@email.com

---

## 📞 Support

If you encounter any issues or have questions:
- Open an [Issue](https://github.com/codewithrashi07/Sahayak_AI-/issues)
- Email: rashiyadav684@email.com
- Check existing [Discussions](https://github.com/codewithrashi07/Sahayak_AI-/discussions)

---


## Disclaimer

Sahayak is a coordination aid and prototype, not a replacement for emergency services or official disaster authorities. For real emergencies, always contact your local emergency services.
