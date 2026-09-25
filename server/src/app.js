const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const apiRouter = require('./routes/apiRouter');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Trust proxy for Render/Vercel reverse proxies (accurate req.ip and rate-limiting)
app.set('trust proxy', 1);

// Security and utility middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Allows flexible CDN font/script loading in production
  crossOriginEmbedderPolicy: false,
}));

// Robust Universal CORS handling for Localhost, Vercel preview/production, and Render
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile, server-to-server, Postman)
    if (!origin) return callback(null, true);

    // Allow localhost, 127.0.0.1 on any port
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    // Allow all Vercel deployment and preview URLs (*.vercel.app)
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // Allow Render domains (*.onrender.com)
    if (/^https:\/\/.*\.onrender\.com$/.test(origin)) {
      return callback(null, true);
    }

    // Allow custom CLIENT_URL environment variables
    if (process.env.CLIENT_URL) {
      const allowed = process.env.CLIENT_URL.split(',').map((u) => u.trim());
      if (allowed.includes('*') || allowed.includes(origin)) {
        return callback(null, true);
      }
    }

    // Default permissive reflection for production resilience
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['Authorization', 'Set-Cookie'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Explicit preflight handler
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    if (origin) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'true');
    } else {
      res.header('Access-Control-Allow-Origin', '*');
    }
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Accept,Origin,Cache-Control,Pragma');
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount API routes with global rate limiter
app.use('/api/v1', apiLimiter, apiRouter);

// Serve frontend static build if present in production
const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// 404 catch-all for unmatched API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist.`
    }
  });
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;
