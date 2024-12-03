const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/save-names', (req, res) => {
    const { name1, name2 } = req.body;

    if (!name1 || !name2) {
        return res.status(400).send('Invalid input');
    }

    const logEntry = `Name1: ${name1}, Name2: ${name2}, Date: ${new Date().toISOString()}\n`;

    // Append to file
    fs.appendFile('names_log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error saving names:', err);
            return res.status(500).send('Failed to save names');
        }
        res.status(200).send('Names saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
