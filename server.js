const express = require('express');
const fetch = require('node-fetch');

const app = express();

const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f172a6cf66f108b8baa3d30867938624';

app.get('/api/currentWeather/:city', async (req, res) => {
  const city = req.params.city;
  const weatherUrl = `${weatherAPI}?q=${city}&appid=${API_KEY}`;

  try {
    const response = await fetch(weatherUrl);

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      throw new Error('Weather data not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
