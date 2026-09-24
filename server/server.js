require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { initAutomationEngine } = require('./src/engine/engineCore');
const { startScheduler } = require('./src/scheduler/poller');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log('[FlowDesk Boot] Connecting to Database...');
  await connectDB();

  // Initialize Automation Engine Pub/Sub Listeners
  initAutomationEngine();

  // Start Scheduled Cron Poller
  startScheduler();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 FlowDesk Backend API & Automation Engine Active`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`====================================================`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('[FlowDesk] Gracefully shutting down server...');
    server.close(() => {
      console.log('[FlowDesk] HTTP Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
