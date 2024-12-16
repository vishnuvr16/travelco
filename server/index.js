import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js"
import connectDB from "./db/dbconfig.js";

const app = express();
dotenv.config();    

// Wait for database connection before starting the server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Configure CORS
    app.use(cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }));

    app.use(express.json());
    app.use(cookieParser());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/tours', tourRoutes);
    app.use('/api/bookings',bookingRoutes)

    //! Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ 
        message: 'Something went wrong!', 
        error: process.env.NODE_ENV === 'production' ? {} : err.message 
      });
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process if the DB connection fails
  }
};

// Start the server
startServer();
