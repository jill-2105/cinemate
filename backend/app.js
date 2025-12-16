const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const reviewerRoutes = require('./routes/reviewers.js');
const movieRoutes = require('./routes/movies.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();

// CORS configuration - allow Vercel frontend origin and localhost:3000 for development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost:3000 for development
    if (origin === 'http://localhost:3000') return callback(null, true);
    
    // Allow Vercel preview and production deployments
    // Vercel URLs typically match pattern: https://*.vercel.app
    if (origin.includes('vercel.app')) return callback(null, true);
    
    // Allow requests from same origin (same-origin requests)
    // Reject all other origins for security
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

const dbLink = process.env.MONGODB_URI;

if (process.env.NODE_ENV !== 'test') {
mongoose
  .connect(dbLink)
  .then(() => console.log('Database Connection Successful'))
  .catch((err) => console.log(err));
}

app.use('/reviewers', reviewerRoutes);
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

app.get('/test', (req, res) => {
  return res.send('Heyy there');
});

const PORT = 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
