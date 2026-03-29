# Freedom Wall - Quick Start Guide

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

## Setup (3 Steps)

### 1. Start MongoDB
Make sure MongoDB is running on your machine or use MongoDB Atlas.

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Open in Browser
Navigate to: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Get all messages |
| POST | `/api/messages` | Create new message |

## Environment Variables

**Backend** (`backend/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/freedom-wall
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
```

---

## Features
- ✅ Anonymous message posting
- ✅ 100 character limit
- ✅ Auto-delete oldest when > 50 messages
- ✅ Auto-refresh every 5 seconds
- ✅ Responsive design
- ✅ Real-time notifications

## Troubleshooting

**MongoDB not connecting?**
- Check if MongoDB service is running
- Or use MongoDB Atlas cloud database

**Port already in use?**
- Change PORT in `backend/.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

**CORS errors?**
- Ensure backend is running
- Check `VITE_API_URL` in frontend `.env`
