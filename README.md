# Student Management System

## Local development

1. In `server/`, create a `.env` file containing your MongoDB connection string:

   ```text
   MONGO_URI=mongodb+srv://...
   ```

2. Install the server dependencies and start the API:

   ```sh
   cd server
   npm install
   node server.js
   ```

3. In another terminal, install and start the client:

   ```sh
   cd client
   npm install
   npm run dev
   ```

The Vite development server proxies `/api` requests to `http://localhost:5000`.

## Vercel deployment

Deploy from the repository root so Vercel can use the services and rewrites in
[`vercel.json`](./vercel.json). Add `MONGO_URI` in the Vercel project's
Environment Variables for every environment you deploy (Production, Preview,
and/or Development), then redeploy. Also ensure your MongoDB Atlas network
access rules allow connections from your Vercel deployment.

The frontend sends student requests to `/api/students`; Vercel routes those
requests to the Express service.
