# Freedom Wall - Project Structure

```
freedom-wall/
├── README.md                   # Main documentation
├── QUICKSTART.md              # Quick start guide
├── PROJECT_STRUCTURE.md       # This file
│
├── backend/                    # Node.js + Express Backend
│   ├── .env                   # Environment variables
│   ├── package.json           # Backend dependencies
│   ├── package-lock.json      # Locked dependencies
│   ├── server.js              # Express server entry point
│   │
│   └── models/
│       └── Message.js         # Mongoose Message schema
│
└── frontend/                   # React + TypeScript Frontend
    ├── .env                   # Frontend environment variables
    ├── index.html             # HTML entry point
    ├── package.json           # Frontend dependencies
    ├── package-lock.json      # Locked dependencies
    ├── components.json        # shadcn/ui config
    ├── tsconfig.json          # TypeScript config
    ├── tsconfig.app.json      # TypeScript app config
    ├── tsconfig.node.json     # TypeScript node config
    ├── vite.config.ts         # Vite config
    ├── tailwind.config.js     # Tailwind CSS config
    ├── postcss.config.js      # PostCSS config
    ├── eslint.config.js       # ESLint config
    │
    ├── src/
    │   ├── main.tsx           # React entry point
    │   ├── App.tsx            # Main App component
    │   ├── App.css            # Custom styles
    │   ├── index.css          # Global styles
    │   │
    │   ├── components/
    │   │   ├── MessageForm.tsx    # Message input form
    │   │   ├── MessageItem.tsx    # Single message card
    │   │   ├── MessageList.tsx    # Message list container
    │   │   └── ui/                # shadcn/ui components
    │   │       ├── button.tsx
    │   │       ├── card.tsx
    │   │       ├── scroll-area.tsx
    │   │       ├── textarea.tsx
    │   │       └── ... (40+ components)
    │   │
    │   ├── services/
    │   │   └── api.ts         # API service with Axios
    │   │
    │   ├── hooks/             # Custom React hooks
    │   ├── lib/               # Utility functions
    │   └── types/             # TypeScript types
    │
    ├── dist/                  # Production build
    │   ├── index.html
    │   └── assets/
    │       ├── index-*.js
    │       └── index-*.css
    │
    └── node_modules/          # Dependencies
```

## Key Files Explained

### Backend

| File | Purpose |
|------|---------|
| `server.js` | Express server with API routes and MongoDB connection |
| `models/Message.js` | Mongoose schema for messages |
| `.env` | Environment variables (PORT, MONGODB_URI) |
| `package.json` | Dependencies: express, mongoose, cors, dotenv |

### Frontend

| File | Purpose |
|------|---------|
| `App.tsx` | Main component with state management and polling |
| `components/MessageForm.tsx` | Input form with character counter |
| `components/MessageItem.tsx` | Individual message card |
| `components/MessageList.tsx` | List container with scroll area |
| `services/api.ts` | Axios API client with TypeScript types |
| `.env` | API URL configuration |

## Component Hierarchy

```
App
├── Header (status, refresh button)
├── MessageForm (input + submit)
│   └── Textarea
│   └── Character counter
│   └── Progress bar
│   └── Submit button
│
└── MessageList
    └── ScrollArea
        └── MessageItem[]
            └── Message text
            └── Timestamp
```

## Data Flow

```
User Input → MessageForm → api.ts → Backend API → MongoDB
                                              ↓
User Display ← MessageList ← api.ts ← Backend API ← MongoDB
```

## API Endpoints

```
GET  /api/messages    → Returns all messages (newest first)
POST /api/messages    → Creates new message
GET  /api/health      → Health check
```
