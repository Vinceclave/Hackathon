const express = require('express');
const bodyParser = require('body-parser')
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to database
connectDB();

// Use user routes
app.use('/', userRoutes); // No prefix
app.use('/api', serviceRoutes); // Services API routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
