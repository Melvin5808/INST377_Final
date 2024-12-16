const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});


const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://iqqndgjmbmcfkwchulkw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcW5kZ2ptYm1jZmt3Y2h1bGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMzE5ODgsImV4cCI6MjA0NzcwNzk4OH0.3XGcXn0eL7b4163Rmy81vPXYAlQJIJ8jqGiMReH2nTo';
const supabase = createClient(supabaseUrl, supabaseKey);


const PORT = 3000;
app.use(express.json());


app.get('/api/getWeatherData', async (req, res) => {
  const { data, error } = await supabase
    .from('Default_Locations')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
});


app.post('/api/addDefaultLocation', async (req, res) => {
  const { city_name, country_code } = req.body;

  if (!city_name || !country_code) {
    return res.status(400).json({ error: 'city and country code needed' });
  }

  const { data, error } = await supabase
    .from('Default_Locations')
    .insert([{ city_name, country_code }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: 'Location added', data });
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



