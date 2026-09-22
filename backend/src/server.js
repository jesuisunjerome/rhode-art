import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from "./routes/payment.route.js";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import logger from "./config/logger.js";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
app.disable("x-powered-by"); // Remove x-powered-by header to prevent information disclosure
app.use(helmet()); // Add extra layer of security for our API

// Middleware
app.use(express.urlencoded({ extended: true, limit: "100mb" }))
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Rate Limiting Global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Maximo 1000 peticiones cada 15 minutos
  message: { message: "Demasiadas peticiones desde esta IP, intente más tarde." },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(globalLimiter)

// Rate Limiting específico para Autenticación (Previene fuerza bruta)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Solo 20 intentos de autenticación cada 15 minutos
  message: { message: "Demasiados intentos de autenticación, intente en 15 minutos." },
})

// Middleware inteligente de conexión a BD
app.use(async (_, res, next) => {
  // En servidor tradicional o en Serverless "caliente", readyState === 1 es true.
  // Pasa de inmediato síncronamente: 0ms de latencia, 0 sobrecarga.
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    // 503 (Service Unavailable) es el código HTTP correcto cuando la BD no responde
    logger.error(`Database connection middleware error: ${error.message}`);
    res.status(503).json({ message: "Base de datos temporalmente inaccesible. Reintente en un momento." });
  }
});

// IMPORTANT: Stripe webhook needs the raw body BEFORE express.json() processes it.
// If JSON parses it first, signature verification will always fail.
app.use("/api/payments/webhook/stripe", express.raw({ type: "application/json" }));

// For all other routes, use JSON body parser with increased limit
app.use(express.json({ limit: "100mb" }));

// Sanitización de NoSQL Injection (reemplaza o elimina keys con '$' y '.')
// Debe ir DESPUÉS de express.json() para que req.body ya esté parseado
app.use((req, _, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body)
  if (req.params) req.params = mongoSanitize.sanitize(req.params)
  if (req.query) {
    const sanitizedQuery = mongoSanitize.sanitize(req.query)
    Object.defineProperty(req, 'query', {
      value: sanitizedQuery,
      writable: true,
      enumerable: true,
      configurable: true
    })
  }
  next()
})

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.get("/", (_, res) => {
  res.send(
    `API is running... CLIENT_URL: ${process.env.CLIENT_URL} BACKEND_URL: ${process.env.BACKEND_URL}, PORT: ${process.env.PORT}`,
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  let status = err.status || 500
  let message = err.message || "Error interno del servidor"

  // si el error es de tipo Valdiation Error de mongoose, le sacamos el detalle de los errores
  if (err.name === "ValidationError") {
    status = 400
    const errors = Object.values(err.errors).map(error => error.message)
    message = errors.join(", ")
  }

  if (err.name === "CastError") {
    status = 400
    message = `Valor inválido para el campo: ${err.path}`;
  }

  if (err.code === 11000) {
    status = 400
    const field = Object.keys(err.keyValue || {})[0] || "campo";
    message = `El ${field} ya existe y debe ser único.`;
  }

  res.status(status).json({ message })
})

// Función de arranque para servidor tradicional (VPS, Render, Railway, Docker, Local)
const startServer = async () => {
  try {
    await connectDB(); // Conectar a BD primero antes de abrir el puerto

    // Levantar servidor
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1); // En servidor tradicional sale del proceso, en serverless solo cierra la conexión a BD.
  }
}

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY)
if (!isServerless) {
  await startServer();
}

// Exportar app para que plataformas serverless (ej: Vercel) puedan montarla directamente
export default app;
