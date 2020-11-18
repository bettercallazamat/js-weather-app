import comments from './comments';

const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

const kelvinToFahrenheit = (kelvin) => Math.round(((kelvin - 273.15) * 9) / 5 + 32);

const weatherIcon = (info) => {
  const spanElement = document.createElement('span')
  if (info = "Clouds") {
    spanElement.innerHTML = '<i class="fas fa-cloud"></i>'
  } else if (info = "Thunderstorm") {
    spanElement.innerHTML = '<i class="fas fa-poo-storm"></i>'
  } else if (info = "Drizzle") {
    spanElement.innerHTML = '<i class="fas fa-cloud-rain"></i>'
  } else if (info = "Rain") {
    spanElement.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>'
  } else if (info = "Snow") {
    spanElement.innerHTML = '<i class="fas fa-snowflake"></i>'
  } else if (info = "Clear") {
    spanElement.innerHTML = '<i class="fas fa-meteor"></i>'
  } else {
    spanElement.innerHTML = '<i class="fas fa-bomb"></i>'
  }

  return spanElement;
}

const generateComment = (temp, celsius) => {
  if (celsius === true && temp > 20) {
    return comments.hot[Math.round(Math.random() * comments.hot.length)];
  } else if (celsius === true && temp <= 20 && temp > 14) {
    return comments.normal[Math.round(Math.random() * comments.normal.length)];
  } else {
    return comments.cold[Math.round(Math.random() * comments.cold.length)];
  }
}

const refreshBtn = (data, render) => {
  const refresh = document.createElement('span')
  refresh.innerHTML = '<i class="fas fa-sync"></i>';
  refresh.classList.add('refresh-btn')

  refresh.addEventListener('click', (e) => {
    e.preventDefault();
    render(data);
  })

  return refresh;
}

export { kelvinToCelsius, kelvinToFahrenheit, weatherIcon, generateComment, refreshBtn }