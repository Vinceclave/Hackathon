const express = require('express');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const tapRoutes = require('./routes/tapRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const redemptionRoutes = require('./routes/redemptionRoutes');
const businessRoutes = require('./routes/businessRoutes');
const cors = require('cors')
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Use the user routes for authentication
app.use('/api/users', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', tapRoutes);
app.use('/api', rewardRoutes);
app.use('/api', redemptionRoutes);
app.use('/api', businessRoutes);

// Default error handler for any unhandled routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
