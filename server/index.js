const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

connectDB();

// Use user routes
app.use('/', userRoutes); // No prefix

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
