# INST377 Final Project – Weather App 🌦️

## Project Description
This Weather App provides real-time weather information for cities worldwide. Users can:
- Search for specific cities to view current weather details (e.g., temperature, wind speed, humidity)
- Set a default location for quick and easy access
- Explore interactive charts to visualize weather data

Our main objective is to make weather insights accessible and visually engaging so people can plan their daily activities more effectively.

## Target Browsers and Platforms
- **Desktop Browsers**: Chrome, Firefox, Safari, Edge (latest versions)  
- **Mobile Browsers**: iOS Safari, Android Chrome  

Our responsive design ensures compatibility across different screen sizes.

---

# Developer Manual

## How to Install and Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (latest version recommended)
- npm (comes bundled with Node.js)

### Steps
1. **Clone the repository**  
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

2. Install dependencies:

npm install

3. Create an .env file in the root directory with the following content:

API_KEY='f172a6cf66f108b8baa3d30867938624'
You can replace the above string with your actual OpenWeatherMap API key if needed!

4. Start the application


Copy code
npm start
Once the server is running, open your browser and go to: http://localhost:3000

## Features
### Home Page

City Search Bar: Fetches real-time weather data for any city.

Weather Details: Displays temperature, wind speed, humidity, etc.

Charts: Interactive charts (using Chart.js) to visualize weather trends.

### About Page

Explains the app’s purpose, functionality, and the APIs used.

### Help Page

This page we made can guide new users through the application’s core features.
We may also include a short video tutorial for first-time visitors.

## API Endpoints
GET /weather:
Returns weather data for a user-specified city.

POST /default-location:
Saves or updates the user’s preferred default city in the backend.


## Known Bugs
Layout Issues on very small mobile devices (especially with map visualization).
API Rate Limits may cause occasional delays when the OpenWeatherMap API is under heavy load.

## Future Roadmap
Forecast Support: We could eventually add 3-day and 7-day weather forecasts.

User Login: An authentication system could be implemented for personalized settings.

Enhanced Styling: We could implement SCSS for better responsiveness and aesthetics.


## Credits
Team Members:

Melvin Vasquez-Gomez
Cara Dong
Jason Calix
Rishabh Banga

Instructor: Professor Dash (INST377, Section 0204)
