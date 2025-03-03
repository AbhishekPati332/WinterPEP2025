# Hospital Management System

A full-stack application for managing hospitals, doctors, and patient inquiries with an integrated QnA bot.

## Features

- User Authentication
- Hospital Management (CRUD operations)
- Interactive QnA Bot
- Responsive Material-UI Design

## Tech Stack

### Frontend
- React with Vite
- Material-UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Local Development Setup

### Prerequisites
- Node.js >= 18.0.0
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hospital-management
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_APP_NAME=Hospital Management System
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment (e.g., to Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables in Render dashboard
5. Deploy

### Frontend Deployment (e.g., to Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` directory
3. Set environment variables in your hosting platform
4. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## Environment Variables

### Backend (.env.production)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secure-jwt-secret
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-url.com/api/v1
VITE_APP_NAME=Hospital Management System
```

## API Documentation

### Authentication Endpoints
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - User login

### Hospital Endpoints
- GET `/api/v1/hospitals` - Get all hospitals
- POST `/api/v1/hospitals` - Create new hospital
- GET `/api/v1/hospitals/:id` - Get hospital by ID
- PUT `/api/v1/hospitals/:id` - Update hospital
- DELETE `/api/v1/hospitals/:id` - Delete hospital

### QnA Bot Endpoints
- POST `/api/v1/qna/ask` - Ask a question to the bot

## License

MIT 