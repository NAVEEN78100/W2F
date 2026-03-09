import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.js";
import topicRoutes from "./routes/topics.js";
import articleRoutes from "./routes/articles.js";
import supportFeedbackRoutes from "./routes/supportFeedback.js";
import grievancesRoutes from "./routes/grievances.js";
import generalFeedbackRoutes from "./routes/generalFeedback.js";
import bugBountyRoutes from "./routes/bugBounty.js";
import articleFeedbackRoutes from "./routes/articleFeedback.js";
import topicFeedbackRoutes from "./routes/topicFeedback.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "5001", 10);

console.log(`Configured PORT: ${PORT}`);

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static files from uploads directory
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "backend/uploads")),
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error("MongoDB URI:", process.env.MONGODB_URI);
  });

// Health check (before routes, no auth required)
app.get("/api/health", (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  res.json({
    status: "OK",
    message: "Server is running",
    mongoConnected: mongoStatus === 1,
    mongoStatus: mongoStatus,
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/support-feedback", supportFeedbackRoutes);
app.use("/api/grievances", grievancesRoutes);
app.use("/api/general-feedback", generalFeedbackRoutes);
app.use("/api/bug-bounty", bugBountyRoutes);
app.use("/api/article-feedback", articleFeedbackRoutes);
app.use("/api/topic-feedback", topicFeedbackRoutes);

// 404 handler
app.use((req, res) => {
  console.warn(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    status: err.status || 500,
  });
});

const maxRetries = 10;
let attempt = 0;

function startServer(port) {
  const server = http.createServer(app);

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && attempt < maxRetries) {
      attempt += 1;
      const nextPort = Number(port) + 1;
      console.warn(
        `Port ${port} in use — retrying with port ${nextPort} (attempt ${attempt})`,
      );
      // Try the next port
      startServer(nextPort);
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });

  server.listen(port, "localhost", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer(PORT);
