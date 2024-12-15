// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


// Example route
app.get('/', (req, res) => {
  res.send('Hello from your Vercel Express server!');
});

// In production, Vercel will process.env.PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
