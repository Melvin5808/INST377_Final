const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f172a6cf66f108b8baa3d30867938624';
let weatherChart;

async function fetchWeather() {
    const city = document.getElementById('citySearch').value.trim();

    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    const url = `${weatherAPI}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById('weatherInfo').style.display = 'block';
    displayWeatherChart(data);
    displayCityMap(data);

}

function displayWeatherChart(data) {
    const ctx = document.getElementById('weatherChart');
    const temperatureFahrenheit = (data.main.temp * 9) / 5 + 32;
    const feelsLikeFahrenheit = (data.main.feels_like * 9) / 5 + 32;
    const windSpeed = data.wind.speed;
    const labels = ['Temperature (°F)', 'Feels Like (°F)', 'Wind Speed (m/s)'];
    const chartData = [temperatureFahrenheit, feelsLikeFahrenheit, windSpeed];
    if (weatherChart) {
        weatherChart.destroy();
    }
    weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Weather Data for ${data.name}, ${data.sys.country}`,
                data: chartData,
                backgroundColor: [
                    'green',
                    'purple',
                    'orange'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    font: {
                        weight: 'bold'
                    },
                    formatter: (value) => value.toFixed(0)
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}
let map;

function displayCityMap(data) {
    const cityLatitude = data.coord.lat;
    const cityLongitude = data.coord.lon;

    if (map) {
        map.remove();
    }

    map = L.map('cityMap').setView([cityLatitude, cityLongitude], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([cityLatitude, cityLongitude]).addTo(map)
        .bindPopup(`<b>${data.name}</b><br>${data.sys.country}`)
        .openPopup();
}

function transition(event) {
    event.preventDefault();
    const targetUrl = event.currentTarget.href;
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500);
}

let default_locals = [];
let idx = 0;

async function fetchDefaultLocations() {
    const response = await fetch('http://localhost:3000/api/getWeatherData');
    default_locals = await response.json();
    console.log(default_locals)

    const location = default_locals[idx]
    console.log('location', location)

    const city = location.city_name
    const country = location.country_code
    const url = `${weatherAPI}?q=${city},${country}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const weather = await res.json();
    console.log('data', weather)

    document.getElementById('weatherInfo').style.display = 'block'
    displayWeatherChart(weather)
    displayCityMap(weather)

}

function switchDefault() {
    idx = (idx + 1)
    if (idx === 5) {
        idx = 0;
    }
    fetchDefaultLocations();
}

async function handleFormSubmit() {
    const city_name = document.getElementById('city_name').value;
    const country_code = document.getElementById('country_code').value;

    if (!city_name || !country_code) {
        alert('Both fields are required');
        return;
    }

    const requestBody = { city_name, country_code };
    console.log('Body:', requestBody);

    const response = await fetch('http://localhost:3000/api/addDefaultLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    console.log('Res:', response);

    const responseData = await response.json();
    console.log('Res', responseData);

    if (response.ok) {
        alert('Working');
    } else {
        alert(`Error: ${responseData.error || responseData.message}`);
    }

}


const { createClient } = require('@supabase/supabase-js');
const express = require('express');

const supabaseUrl = 'https://iqqndgjmbmcfkwchulkw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxcW5kZ2ptYm1jZmt3Y2h1bGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMzE5ODgsImV4cCI6MjA0NzcwNzk4OH0.3XGcXn0eL7b4163Rmy81vPXYAlQJIJ8jqGiMReH2nTo';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
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

