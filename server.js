// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Optional: If you have static files, place them in a 'public' folder or similar
// app.use(express.static('public'));

// Example route
app.get('/', (req, res) => {
  res.send('Hello from your Vercel Express server!');
});

// In production, Vercel sets process.env.PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
