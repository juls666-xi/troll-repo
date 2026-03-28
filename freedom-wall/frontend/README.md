# Freedom Wall

A public message board where users can post short anonymous messages. Built with the MERN stack (MongoDB, Express, React, Node.js).

![Freedom Wall Screenshot](https://via.placeholder.com/800x400?text=Freedom+Wall+Screenshot)

## Features

- **Anonymous Posting**: No login or authentication required
- **Character Limit**: Messages limited to 100 characters
- **Auto-Cleanup**: Only the latest 50 messages are stored
- **Real-time Updates**: Messages auto-refresh every 5 seconds
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, minimal interface with smooth animations

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Folder Structure

```
freedom-wall/
├── backend/
│   ├── models/
│   │   └── Message.js          # Mongoose schema
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MessageForm.tsx # Message input form
│   │   │   ├── MessageItem.tsx # Single message card
│   │   │   └── MessageList.tsx # Message list container
│   │   ├── services/
│   │   │   └── api.ts          # API service with Axios
│   │   ├── App.tsx             # Main app component
│   │   ├── App.css             # Custom styles
│   │   └── main.tsx            # Entry point
│   ├── .env                    # Frontend environment variables
│   ├── package.json            # Frontend dependencies
│   └── ...                     # Config files
└── README.md                   # This file
```

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

## Installation & Setup

### Step 1: Clone/Download the Project

```bash
cd freedom-wall
```

### Step 2: Setup Backend

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Update `MONGODB_URI` if needed (default: `mongodb://localhost:27017/freedom-wall`)
   - Change `PORT` if needed (default: `5000`)

4. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# OR production mode
npm start
```

The backend will start on `http://localhost:5000`

### Step 3: Setup Frontend

1. Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Update `VITE_API_URL` if your backend runs on a different port
   - Default: `VITE_API_URL=http://localhost:5000/api`

4. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Step 4: Open in Browser

Navigate to `http://localhost:5173` to use the Freedom Wall!

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Get all messages (sorted newest first) |
| POST | `/api/messages` | Create a new message |
| GET | `/api/health` | Health check |

### POST /api/messages

**Request Body:**
```json
{
  "text": "Your message here (max 100 characters)"
}
```

**Response:**
```json
{
  "_id": "...",
  "text": "Your message here",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/freedom-wall` |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## Available Scripts

### Backend

```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Database Schema

### Message

```javascript
{
  text: String,      // Required, max 100 characters
  createdAt: Date    // Default: current time
}
```

## Features in Detail

### Message Submission
- Input field with real-time character counter
- Visual progress bar showing character usage
- Submit button disabled when empty or over limit
- Loading state during submission
- Success/error toast notifications

### Message Display
- Messages sorted by newest first
- Relative timestamps (e.g., "2 minutes ago")
- Smooth animation for new messages
- Auto-refresh every 5 seconds
- Manual refresh button
- Online/offline status indicator

### Auto-Cleanup
- Maximum 50 messages stored
- Oldest message automatically deleted when limit exceeded
- Message count displayed in UI

## Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: Usually set automatically by platform

2. Add start script to package.json (already included)

3. Deploy using platform's Git integration

### Frontend Deployment (e.g., Vercel, Netlify)

1. Update `.env` with production API URL:
   ```
   VITE_API_URL=https://your-api-url.com/api
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder

## Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoDB connection error`

**Solution:**
- Ensure MongoDB is running locally, or
- Use MongoDB Atlas cloud database
- Check your `MONGODB_URI` in `.env`

### CORS Errors

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- Ensure backend CORS middleware is enabled
- Check that `VITE_API_URL` points to the correct backend URL

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
- Change the `PORT` in backend `.env`
- Or kill the process using the port:
  ```bash
  # On macOS/Linux
  lsof -ti:5000 | xargs kill -9
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## Credits

Built with ❤️ using the MERN stack and modern web technologies.
