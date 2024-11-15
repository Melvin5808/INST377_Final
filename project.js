const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f172a6cf66f108b8baa3d30867938624';

async function fetchWeather() {
    const city = document.getElementById('citySearch').value.trim();
    
    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    const url = `${weatherAPI}?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    const temperatureCelsius = data.main.temp;
    const temperatureFahrenheit = (temperatureCelsius * 9 / 5) + 32;
    const feelsLikeCelsius = data.main.feels_like;
    const feelsLikeFahrenheit = (feelsLikeCelsius * 9 / 5) + 32;

    const weatherResult = document.getElementById('weatherResult');

    const heading = document.createElement('h3');
    heading.textContent = `Weather in ${data.name}, ${data.sys.country}`;
    weatherResult.appendChild(heading);

    const temp = document.createElement('p');
    temp.innerHTML = `<strong>Temperature:</strong> ${temperatureFahrenheit.toFixed(2)}°F / ${temperatureCelsius}°C`;
    weatherResult.appendChild(temp);
    
    const feelsLike = document.createElement('p');
    feelsLike.innerHTML = `<strong>Feels Like:</strong> ${feelsLikeFahrenheit.toFixed(2)}°F / ${feelsLikeCelsius}°C`;
    weatherResult.appendChild(feelsLike);
    
    const wind = document.createElement('p');
    wind.innerHTML = `<strong>Wind Speed:</strong> ${data.wind.speed} m/s`;
    weatherResult.appendChild(wind);
    
    const humidity = document.createElement('p');
    humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;
    weatherResult.appendChild(humidity);

    weatherResult.appendChild(weatherDescription);
}