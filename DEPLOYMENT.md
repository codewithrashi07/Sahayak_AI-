# Deployment Guide - Sahayak

This guide explains how to deploy the Sahayak project to various platforms.

## Quick Deployment Options

### Option 1: Railway (Recommended - Full Stack Deployment)

Railway is the easiest option as it can deploy the entire stack (frontend + backend + database) in one place.

#### Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `Sahayak` repository
   - Railway will automatically detect the project structure

3. **Configure Environment Variables**
   - Go to your project settings in Railway
   - Add these environment variables:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sahayak
     AI_SERVICE_URL=https://your-ai-service-url.com
     PORT=5000
     ```

4. **MongoDB Setup**
   - In Railway, add a MongoDB service (or use MongoDB Atlas)
   - Update the MONGODB_URI with the connection string

5. **Deploy**
   - Railway will automatically build and deploy
   - Your app will be live at `https://your-app.railway.app`

### Option 2: Vercel (Frontend) + Render (Backend)

#### Frontend Deployment (Vercel):

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Select your `Sahayak` repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Environment Variables**
   - Add: `VITE_API_URL=https://your-backend-url.com`

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be live at `https://your-app.vercel.app`

#### Backend Deployment (Render):

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Select your `Sahayak` repository
   - Configure:
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `node src/server.js`

3. **Environment Variables**
   - Add:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sahayak
     AI_SERVICE_URL=https://your-ai-service-url.com
     PORT=5000
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Your backend will be live at `https://your-app.onrender.com`

### Option 3: Netlify (Frontend) + Heroku (Backend)

#### Frontend Deployment (Netlify):

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up

2. **Import Site**
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub
   - Select `Sahayak` repository
   - Configure:
     - Build command: `cd frontend && npm run build`
     - Publish directory: `frontend/dist`

3. **Environment Variables**
   - Add: `VITE_API_URL=https://your-backend-url.com`

4. **Deploy**
   - Click "Deploy site"

#### Backend Deployment (Heroku):

1. **Create Heroku Account**
   - Go to https://heroku.com
   - Sign up

2. **Create App**
   - Click "Create New App"
   - Give it a name
   - Connect GitHub repository

3. **Configure**
   - Buildpacks: Node.js
   - Environment variables:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sahayak
     AI_SERVICE_URL=https://your-ai-service-url.com
     PORT=5000
     ```

4. **Deploy**
   - Click "Deploy Branch"

## MongoDB Atlas Setup (Free Tier)

For all deployment options, you'll need a MongoDB database:

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Select "Free" tier
   - Choose a region close to your deployment

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username and password (save these!)
   - Click "Create User"

4. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Use this as your `MONGODB_URI`

## AI Service Deployment

The AI service can be deployed separately:

### Option 1: Render/Heroku

```bash
# Deploy as a separate service
cd ai-service
# Use same deployment process as backend
# Start command: uvicorn main:app --host 0.0.0.0 --port 8000
```

### Option 2: Railway

Add the AI service as a separate service in Railway or combine it with the backend.

## Environment Variables Summary

Create a `.env.production` file for each service:

**Backend:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sahayak
AI_SERVICE_URL=https://your-ai-service-url.com
NODE_ENV=production
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-url.com
```

## Testing After Deployment

1. **Health Check**
   - Visit `https://your-backend-url.com/api/health`
   - Should return: `{"status":"OK","message":"Sahayak backend is running"}`

2. **Frontend Access**
   - Visit your frontend URL
   - Test reporting an incident
   - Check dashboard
   - Verify map view

3. **API Integration**
   - Ensure frontend can reach backend
   - Check browser console for errors
   - Verify CORS configuration

## Troubleshooting

### CORS Errors

If you get CORS errors, update backend:

```javascript
// In backend/src/server.js
app.use(cors({
  origin: ['https://your-frontend-url.com', 'http://localhost:3000'],
  credentials: true
}));
```

### MongoDB Connection Issues

- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions
- Check if cluster is running

### Build Failures

- Ensure all dependencies are in package.json
- Check Node.js version compatibility
- Verify build commands are correct
- Check deployment logs for errors

### Environment Variables Not Loading

- Ensure variables are set in platform settings
- Variable names should match exactly
- Restart the deployment after adding variables
- Check platform-specific variable naming (e.g., VITE_ for Vercel)

## Recommended Deployment Stack

For beginners, I recommend:
- **Frontend:** Vercel (easiest, automatic deployments)
- **Backend:** Render (free tier available)
- **Database:** MongoDB Atlas (free tier)
- **AI Service:** Render (as separate service)

## Production Checklist

Before going live:

- [ ] MongoDB Atlas configured with whitelist
- [ ] All environment variables set
- [ ] CORS configured for production domains
- [ ] HTTPS enabled (most platforms do this automatically)
- [ ] Error logging configured
- [ ] Rate limiting implemented (for API)
- [ ] Authentication/authorization tested
- [ ] Sample data removed from production
- [ ] Backup strategy for database
- [ ] Monitoring/alerting set up

## Support

For platform-specific issues:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Railway: https://docs.railway.app
- Netlify: https://docs.netlify.com
- MongoDB Atlas: https://docs.atlas.mongodb.com
