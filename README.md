# INST377_Final Project
Weather App 🌦️

Project Description
This Weather App provides real-time weather information for cities worldwide. Users can:
- Search for specific cities to view current weather details, such as temperature, wind speed, and atmospheric conditions.
- offers a default location feature for easy access
- View visual weather data representations using interactive charts.

Our goal is to make weather data easily accessible and visually engaging for the general public to plan their daily activities effectively.

Target Browsers and Platforms
  Desktop Browsers: Chrome, Firefox, Safari, Edge (latest versions)
  Mobile Browsers: iOS Safari, Android Chrome
Responsive design ensures compatibility with multiple screen sizes.

APIs Used
OpenWeatherMap API:
Provides real-time weather data, including:
- Current temperature
- Feels-like temperature
- Wind speed
- Humidity levels
  
Example API Call:
Copy code
https://api.openweathermap.org/data/2.5/weather?q=London&appid='f172a6cf66f108b8baa3d30867938624'

Backend APIs:
- GET /weather: Fetches weather data from the backend database.
- POST /default-location: Updates the user’s preferred default location.
  
How to Install and Run Locally
Prerequisites
- Node.js (latest version recommended)
- npm (comes with Node.js)
  
Steps
1. Clone the repository:

git clone https://github.com/your-username/weather-app.git
cd weather-app

2. Install dependencies:


npm install
Create an .env file in the root directory with the following content:

3. Set environment variables
makefile
API_KEY='f172a6cf66f108b8baa3d30867938624'

4. Start the application:

npm start
Open your browser and go to http://localhost:3000.

Our Features
Home Page:
- City search bar to fetch real-time weather.
- Display weather details, such as temperature, wind speed, and humidity.
- Interactive weather chart using Chart.js.
About Page:
- Overview of the app’s purpose and functionality.
- Links to the APIs used.
Help Page:
- Step-by-step guide on how to use the app.
- Video demonstration for first-time users.

Developer Manual
How to Run Tests
Use the following command to run tests (if implemented):
bash
Copy code
npm test
API Endpoints
- GET /weather: Retrieves weather data for a user-specified city.
- POST /default-location: Saves the user’s default weather location.
Known Bugs
- Map visualization may have minor layout issues on smaller mobile devices.
- API rate limit may cause delays during high traffic.
Future Roadmap
1. Add support for weather forecasts (3-day, 7-day).
2. Implement a user login system for personalized settings.
3. Enhance responsiveness with SCSS.

Deployment
The app is live on Vercel. Access it here:
Live Weather App

Credits
Team Members:
Melvin Vasquez-Gomez, 
Cara Dong, 
Jason Calix, 
Rishabh Banga, 

Supervised by: Professor Dash
-INST377, Section 0204
