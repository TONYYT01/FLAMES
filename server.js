const express = require('express');
const fs = require('fs');
const AWS = require('aws-sdk');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// AWS S3 Configuration (Optional for persistent storage)
const s3 = new AWS.S3({
    accessKeyId: 'your-access-key-id', // replace with your AWS access key ID
    secretAccessKey: 'your-secret-access-key', // replace with your AWS secret access key
    region: 'us-east-1' // replace with your AWS S3 region
});
const bucketName = 'your-s3-bucket-name'; // replace with your S3 bucket name

// Route to handle name saving to file or S3
app.post('/save-names', (req, res) => {
    const { name1, name2 } = req.body;

    if (!name1 || !name2) {
        return res.status(400).send('Both names are required');
    }

    const logEntry = `Name1: ${name1}, Name2: ${name2}, Date: ${new Date().toISOString()}\n`;

    // Option 1: Save to Ephemeral File System (Temporary on Render)
    // Save the names to the local file system on Render
    fs.appendFile('names_log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error saving names to file:', err);
            return res.status(500).send('Failed to save names to file');
        }
        console.log('Names saved to file successfully');
    });

    // Option 2: Save to AWS S3 for Persistent Storage (Optional)
    const s3Params = {
        Bucket: bucketName,
        Key: 'names_log.txt',
        Body: logEntry,
        ACL: 'private',
        ContentType: 'text/plain'
    };

    s3.upload(s3Params, (err, data) => {
        if (err) {
            console.error('Error uploading to S3:', err);
            return res.status(500).send('Failed to save names to S3');
        }
        console.log('Names saved to S3 successfully');
    });

    // Send success response
    res.status(200).send('Names saved successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});