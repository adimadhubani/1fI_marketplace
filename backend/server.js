const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for all requests (support local dev & production frontend URLs)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: '1Fi Marketplace API',
    timestamp: new Date().toISOString(),
    postgresConnected: Boolean(process.env.DATABASE_URL)
  });
});

// Mount Products Route
app.use('/api/products', productsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 1Fi Marketplace Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/products`);
});

module.exports = app;
