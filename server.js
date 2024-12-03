const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle name saving to file
app.post('/save-names', (req, res) => {
    const { name1, name2 } = req.body;

    if (!name1 || !name2) {
        return res.status(400).send('Both names are required');
    }

    const logEntry = `Name1: ${name1}, Name2: ${name2}, Date: ${new Date().toISOString()}\n`;

    // Save the names to the local file system on Render
    fs.appendFile('names_log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error saving names to file:', err);
            return res.status(500).send('Failed to save names');
        }
        console.log('Names saved to file successfully');
        res.status(200).send('Names saved successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});