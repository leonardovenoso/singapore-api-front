const WEATHER_API = 'https://api.data.gov.sg/v1//environment/2-hour-weather-forecast';

export const fetchWeather = async (time) => {
  const resp = await fetch(`${WEATHER_API}?date_time=${time}`);
  const json = await resp.json();
  return json;
};
