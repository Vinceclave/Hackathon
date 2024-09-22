const express = require('express');
const cors = require('cors');
const db = require('./database/dbConnection');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Get all customers
app.get('/Customers', (req, res) => {
    const sql = 'SELECT * FROM Customers';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.post('/Customers', (req, res) => {
    const { first_name, last_name, phone_number } = req.body;
    console.log(res)

    // Insert customer into database
    const query = 'INSERT INTO Customers (first_name, last_name, phone_number) VALUES (?, ?, ?)';
    db.run(query, [first_name, last_name, phone_number], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error inserting customer' });
        }
        res.status(201).json({ message: 'Customer created', id: this.lastID });
    });
});


// Root route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
