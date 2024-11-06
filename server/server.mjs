import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Define a route to fetch quotes from ZenQuotes API
app.get('/quotes', async (req, res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes/');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
