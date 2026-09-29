# Lost & Found Management System

## Problem Statement
Problem 17 – Lost & Found Management System

## Feature Set A
- Report lost item
- Report found item
- Enter item details
- Search items
- Display matching items

## Tech Stack
React + Vite, Node.js + Express.js, MongoDB + Mongoose

## Run
### Backend
cd backend
npm install
Create `.env` with:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Then:
npm run dev

### Frontend
Open another terminal:
cd frontend
npm install
npm run dev

Open http://localhost:5173

## API
POST /api/items
GET /api/items
GET /api/items/search?q=...
GET /api/health

## Screenshots
Add screenshots of the report form, lost/found reports, search results and matching cards before submission.
