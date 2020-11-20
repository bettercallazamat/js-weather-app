import {
  kelvinToCelsius, kelvinToFahrenheit, weatherIcon, generateComment, refreshBtn, openModal, modal,
} from './helper';
import config from './config'
import './styles/reset.css';
import './styles/style.css';

const form = document.getElementById('form');
const cityInput = document.getElementById('city-input');
const citySubmit = document.getElementById('city-submit');
const weatherCommentContainer = document.getElementById('weather-comment');
const weatherInfo = document.getElementById('weather-info');
const checkbox = document.getElementById('checkbox');

let celsius = true;
checkbox.checked = celsius;
weatherInfo.style.display = 'none';

let lastWeatherData;

const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}`,
      { mode: "cors" }
    );
    const weatherData = await response.json();

    const location = {
      country: weatherData.sys.country,
      city: weatherData.name,
    };
    const info = {
      main: weatherData.weather[0].main,
      desc: weatherData.weather[0].description,
    };
    const details = weatherData.main;
    const result = { location, info, details };
    lastWeatherData = result;
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const render = (data) => {
  while (weatherInfo.firstChild) {
    weatherInfo.removeChild(weatherInfo.firstChild);
  }
  while (weatherCommentContainer.firstChild) {
    weatherCommentContainer.removeChild(weatherCommentContainer.firstChild);
  }
  weatherInfo.style.display = 'block';

  const comment = document.createElement('p');
  const weatherContainer = document.createElement('div');
  const locationInfo = document.createElement('p');
  const lastUpdatedTime = document.createElement('p');
  const mainInfoContainer = document.createElement('div');
  const mainInfoContainerRight = document.createElement('div');
  const main = weatherIcon(data.info.main);
  const desc = document.createElement('span');
  const temp = document.createElement('span');
  const feelTemp = document.createElement('span');
  const refresh = refreshBtn(data, render);

  // CONTENT ADDING
  comment.textContent = generateComment(data.details.temp, celsius);
  locationInfo.textContent = `Weather in ${data.location.city}, ${data.location.country}`;
  lastUpdatedTime.textContent = 'Last updated XX:XX';
  lastUpdatedTime.textContent = `Last updated at ${new Date().toLocaleTimeString()}`;
  desc.textContent = data.info.desc;
  temp.textContent = `${celsius ? kelvinToCelsius(data.details.temp) : kelvinToFahrenheit(data.details.temp)}°`;
  feelTemp.textContent = `Feels like ${celsius ? kelvinToCelsius(data.details.feels_like) : kelvinToFahrenheit(data.details.feels_like)}°`;

  // CLASSES
  mainInfoContainer.classList.add('main-info-container');
  mainInfoContainerRight.classList.add('main-info-container-right');
  locationInfo.classList.add('location-text');
  main.classList.add('weather-icon');
  temp.classList.add('temp-text');
  desc.classList.add('weather-desc');


  // APPENDING
  weatherCommentContainer.appendChild(comment);
  mainInfoContainerRight.append(desc, feelTemp);
  mainInfoContainer.append(temp, main, mainInfoContainerRight);
  weatherContainer.append(locationInfo, lastUpdatedTime, mainInfoContainer, refresh);
  weatherInfo.appendChild(weatherContainer);
};

const dataProcessing = async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  form.reset();
  const data = await getWeatherData(city);
  if (data.error) {
    openModal('Please provide correct city name');
  } else {
    render(data);
  }
};

citySubmit.addEventListener('click', dataProcessing);

checkbox.addEventListener('change', () => {
  celsius = checkbox.checked;
  if (lastWeatherData !== undefined) {
    render(lastWeatherData);
  }
});