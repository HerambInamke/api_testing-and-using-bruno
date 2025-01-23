const express = require('express');
const { resolve } = require('path');
const data = require('./data.json');

const app = express();
const port = 3010;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('static'));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API: Retrieve Students Above Threshold
app.post('/students/above', (req, res) => {
    const { threshold } = req.body;

    // Input validation
    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({ message: 'Invalid threshold value. Please provide a positive number.' });
    }

    // Filter students who meet the criteria
    const filteredStudents = data.filter(student => student.total > threshold);

    // Response
    res.status(200).json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total,
        })),
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
