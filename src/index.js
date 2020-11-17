import { kelvinToCelsius, kelvinToFahrenheit } from './convertion'

const API_KEY = "abf028cd830f1fb143ca3f9b62071423"

const getWeatherData = async (city) => {
  let response;
  response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`, { mode: 'cors' });
  const weatherData = await response.json();
  
  const location = {
    country: weatherData.sys.country,
    city: weatherData.name
  }
  const info = {
    main: weatherData.weather[0].main,
    desc: weatherData.weather[0].description
  }
  const details = weatherData.main;

  const result = { location, info, details }

  // console.log(weatherData);
  console.log(result);

}

getWeatherData("London");