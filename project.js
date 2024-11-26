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


// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://iqqndgjmbmcfkwchulkw.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

// const express = require('express');
// const app = express();
// const PORT = 3000;

// app.get('/api/getWeatherData', async (req, res) => {
//     const { data, error } = await supabase
//         .from('weather_data')
//         .select('*');

//     if (error) {
//         return res.status(500).json({ error: error.message });
//     }
//     res.status(200).json(data);
// });
// fff