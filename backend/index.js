import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import axios from 'axios';
import cookieParser from "cookie-parser";
import { loginUser } from './controllers/authController.js';



const url = `http://localhost:8000`;

const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // frontend origin
  credentials: true,
  maxAge: 14400,
}));
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/authRoutes.js";
import moodRoutes from './routes/moodRoutes.js';
import userRoutes from './routes/userRoutes.js';


app.use("/api/auth", authRoutes);  
app.use('/api/mood', moodRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
  connectDb();
});
