import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from "./routes/payment.route.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// IMPORTANT: Stripe webhook needs the raw body BEFORE express.json() processes it.
// If JSON parses it first, signature verification will always fail.
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// All other routes use standard JSON parsing
app.use(express.json());

// Connect to MongoDB (Middleware for all requests to ensure DB is connected)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    next(error); // Pass to Express centralized error handler
  }
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.get("/", (_, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server (DB is connected on first request via middleware)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
