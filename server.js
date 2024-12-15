const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://rqkwwyoaeswcmxqprmrl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxa3d3eW9hZXN3Y214cXBybXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3OTQ3MzUsImV4cCI6MjA0NzM3MDczNX0.lFCNsUJeZjfkpjqGpt7JMwrRFTwehd-WK4feasXTwf8';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/home.html', { root: __dirname });
});

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    res.status(400).json({ message: 'City is required' });
    return;
  }

  try {
    const apiKey = 'f172a6cf66f108b8baa3d30867938624'; 
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const weatherData = weatherResponse.data;
    res.status(200).json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      weather: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed
    });
  } catch (error) {
    console.log('Error fetching weather data:', error);
    res.status(500).json({ message: 'Unable to fetch weather data' });
  }
});

app.post('/weather-search', async (req, res) => {
  const { city } = req.body;
  
  if (!city) {
    res.status(400).json({ message: 'City is required' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('weather_searches')
      .insert({ city_name: city });

    if (error) {
      throw error;
    }
    res.status(201).json({ message: 'City search saved successfully', data });
  } catch (error) {
    console.log('Error saving city search:', error);
    res.status(500).json({ message: 'Unable to save city search' });
  }
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
