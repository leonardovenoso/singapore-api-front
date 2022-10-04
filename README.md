# Problem to solve
Allow the user to choose a date and time, then show a list of locations with traffic cam photos for the specified date and time.
APIs:
* Traffic Images: https://data.gov.sg/dataset/traffic-images
* Weather Forecast: https://data.gov.sg/dataset/weather-forecast

# Assumptions
* The friendly coordinate name is obtained by calculating the shortest distance from the traffic location point to the weather information areas. The algorithm used is haversine.
* The above algorithm does not consider hills, roads, traffic lights, etc.
* All the weather legends are from: https://www.weather.gov.sg/weather-forecast-2hrnowcast-2/. The kind of weather name can be converted into icon URLs.

# Requirements
OS: Mac 12.5.1
NodeJS v14.18.2

# Run and install
npm install
npm start

# Run unit tests
npm run test

# Run coverage
npm run test:coverage

