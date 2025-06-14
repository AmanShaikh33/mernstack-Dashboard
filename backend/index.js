import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const app = express();

// ✅ CORS Setup — Allow both local and deployed frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.onrender.com' // 🔁 Replace this once your frontend is deployed
  ],
  credentials: true,
  maxAge: 14400,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from './routes/moodRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use("/api/auth", authRoutes);  
app.use('/api/mood', moodRoutes);
app.use('/api/user', userRoutes);

app.get("/", (req, res) => {
  res.send("🟢 Backend is live on Render!");
});

// Server start
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  connectDb();
});
