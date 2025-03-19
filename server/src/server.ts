require("dotenv").config();

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// Database import
import connectToDatabase from "./database/db";

// Route imports
import authRouter from "./routes/auth-route";
import databaseRouter from "./routes/database-route";
import actionsRouter from "./routes/actions-route";
import paymentRouter from "./routes/payment-route";
import webhookRouter from "./routes/webhooks-route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/webhook", webhookRouter);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Database connection
connectToDatabase();

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/database", databaseRouter);
app.use("/api/actions", actionsRouter);
app.use("/api/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
