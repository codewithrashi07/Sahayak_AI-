# Quick Start Guide - Sahayak

This guide will help you get Sahayak up and running quickly on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **Python** (v3.8 or higher) - [Download here](https://www.python.org/)
3. **MongoDB** (running locally) - [Download here](https://www.mongodb.com/try/download/community)

## Installation Steps

### 1. Navigate to the Project Directory

```bash
cd C:\Users\rashi\Sahayak
```

### 2. Start MongoDB

Make sure MongoDB is running on your system. If you installed MongoDB locally, start the MongoDB service:

```bash
# Windows (as Administrator)
net start MongoDB

# Or if using MongoDB Community Edition
mongod --dbpath "C:\data\db"
```

### 3. Setup and Start the Backend

```bash
cd backend
npm install
npm start
```

The backend will start on `http://localhost:5000`

### 4. Setup and Start the AI Service

Open a new terminal window:

```bash
cd ai-service
pip install -r requirements.txt
python main.py
```

The AI service will start on `http://localhost:8000`

### 5. Setup and Start the Frontend

Open another new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 6. Seed the Database (Optional)

To populate the database with sample incident data:

Open a new terminal window:

```bash
cd backend
node src/seed.js
```

## Accessing the Application

Once all services are running:

1. Open your browser and go to: **http://localhost:3000**
2. You will see the Sahayak home page
3. Navigate through the application:
   - **Home**: Overview and features
   - **Report Incident**: Submit emergency reports
   - **Dashboard**: View and manage incidents (admin/responder view)
   - **Resources**: Find nearby hospitals, shelters, and relief centers
   - **Login**: Authenticate with role selection

## Demo Login

For demonstration purposes, the login system accepts any email and password. Select your role:

- **Citizen**: Can report incidents and view status
- **Responder**: Can view assigned incidents and update progress
- **Admin**: Full access to dashboard with incident management capabilities

## Stopping the Services

To stop each service, press `Ctrl + C` in the respective terminal window.

## Troubleshooting

### MongoDB Connection Error

If you see a MongoDB connection error:
- Ensure MongoDB is running
- Check the connection string in `backend/.env`
- Default: `mongodb://localhost:27017/sahayak`

### Port Already in Use

If a port is already in use:
- Change the port in the respective configuration file
- Frontend: `frontend/vite.config.js` (default: 3000)
- Backend: `backend/.env` (default: 5000)
- AI Service: `ai-service/main.py` (default: 8000)

### Python Module Not Found

If you get module not found errors:
```bash
cd ai-service
pip install -r requirements.txt
```

### Frontend Build Errors

If the frontend has build errors:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Project Structure

```
Sahayak/
├── frontend/          # React frontend (port 3000)
├── backend/           # Express.js backend (port 5000)
├── ai-service/        # FastAPI AI service (port 8000)
└── README.md          # Detailed documentation
```

## Next Steps

- Explore the dashboard features
- Try submitting a test incident
- View incidents on the map
- Check the resource directory
- Read the full [README.md](README.md) for detailed information

## Support

For issues or questions, refer to the main README.md file or check the project documentation.
