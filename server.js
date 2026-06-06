const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initializeDatabase } = require('./database');
const profileRoutes = require('./routes/profiles');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/profiles', profileRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.send('GitHub Profile Analyzer API is running.');
});

// Initialize DB and start server
const startServer = async () => {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
