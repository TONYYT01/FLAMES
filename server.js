const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Endpoint to handle incoming names
app.post('/save-names', (req, res) => {
    const { name1, name2 } = req.body;

    if (!name1 || !name2) {
        console.log('Invalid input: One or both names are missing.');
        return res.status(400).send('Both names are required');
    }

    console.log(`Received Names - Name1: ${name1}, Name2: ${name2}`);
    res.status(200).send('Names received successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});