import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './database/db.js';

// Load env variables
dotenv.config();

const app = express();

// ✅ CORS Setup for frontend deployed on Render
const corsOptions = {
  origin: "https://mern-frontend-9h2x.onrender.com", // frontend URL
  credentials: true, // allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ✅ Handle preflight requests
app.options("*", cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from './routes/moodRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/user", userRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🟢 Backend is live on Render!");
});

// ✅ Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  connectDb();
});
