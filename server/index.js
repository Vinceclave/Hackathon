const express = require('express');
const bodyParser = require('body-parser')
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const barberRoutes = require('./routes/barberRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes')
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
app.use('/api', barberRoutes); // Services API routes
app.use('/api', appointmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
