const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration (you can adjust the 'origin' based on your frontend setup)
const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Connect to database
connectDB();

// Use user routes for authentication (register and login)
app.use('/api', userRoutes); // Prefix with '/api' to better organize your routes

// Default error handler for any unhandled routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 5000; // Change port if needed
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
