const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle incoming names
app.post('/save-names', (req, res) => {
    const { name1, name2 } = req.body;

    if (!name1 || !name2) {
        return res.status(400).send('Both names are required');
    }

    // Log names directly to the console
    console.log(`Received Names - Name1: ${name1}, Name2: ${name2}`);
    
    res.status(200).send('Names received successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});