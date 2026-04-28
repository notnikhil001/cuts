# Local Indian Hair Salon Management System

## Overview
A clean MERN application for an Indian barber salon.

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT-based admin login
- Mobile-first design with deep navy + gold accents

## Structure
- `server/` — backend API, models, routes
- `client/` — React app with Tailwind utilities

## Setup Instructions

### 1. Install MongoDB

If you do not already have MongoDB installed, install it locally via Homebrew or MongoDB Compass.

Recommended:
- `brew tap mongodb/brew`
- `brew install mongodb-community@7.0`
- Start the database: `brew services start mongodb-community@7.0`

### 2. Configure the server

1. Open a terminal in `building-the-salon/server`
2. Install dependencies:
   - `npm install`
3. Copy environment variables:
   - `cp .env.example .env`
4. Optionally adjust `MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` in `.env`

### 3. Run the backend

From `server/`:
- `npm run dev`

If the database is connected successfully, you will see:
- `MongoDB connected: 127.0.0.1`
- `Server running on http://localhost:5000`

### 4. Configure the frontend

1. Open a terminal in `building-the-salon/client`
2. Install dependencies:
   - `npm install`

### 5. Run the frontend

From `client/`:
- `npm run dev`

Visit the displayed URL, usually `http://localhost:5173`.

## Test the database connection

1. Run the server: `npm run dev`
2. If the connection is successful, the server log will show `MongoDB connected: ...`
3. Open your browser and visit:
   - `http://localhost:5000/`

You should get a JSON welcome response.

## Admin login

Use the credentials from `server/.env`.

Default values:
- `ADMIN_USERNAME=admin`
- `ADMIN_PASSWORD=SalonAdmin123!`

## Notes

- The booking form sends customer data to MongoDB.
- Admin pages show today's schedule and allow fast management of services and staff.
