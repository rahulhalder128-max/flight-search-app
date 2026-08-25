// =============================================================================
// Flight Search Application - Backend Entry Point
// =============================================================================
// Express server for flight search API integrations
// =============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./db'); // Will create later
const flightRoutes = require('./routes/flightRoutes');

const app = express();

// =============================================================================
// Middleware
// =============================================================================

// Security headers
app.use(helmet());

// CORS configuration - adjust for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173', // Vite default port
  credentials: true
}));

// Rate limiting - prevent API abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Flight Search API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/v1/flights', flightRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

// =============================================================================
// Server Start
// =============================================================================

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Flight Search API running on port ${PORT}`);
  console.log(`📅 Environment: ${process.env.NODE_ENV}`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📡 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💥 Process terminated');
    process.exit(0);
  });
});

module.exports = { app, server };