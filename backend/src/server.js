import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security headers
app.use(helmet());

// Allow only the frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Request-data parsers
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Request limiting
app.use(rateLimiter);

// Development request logger
app.use((req, res, next) => {
  console.log(`Request method: ${req.method} | URL: ${req.url}`);

  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});

connectDB();

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  res.status(500).json({
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
