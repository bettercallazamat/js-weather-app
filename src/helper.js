import comments from './comments';

const modal = document.querySelector('.modal');

const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

const kelvinToFahrenheit = (kelvin) => Math.round(((kelvin - 273.15) * 9) / 5 + 32);

const weatherIcon = (info) => {
  const spanElement = document.createElement('span');
  if (info === 'Clouds') {
    spanElement.innerHTML = '<i class="fas fa-cloud"></i>';
  } else if (info === 'Thunderstorm') {
    spanElement.innerHTML = '<i class="fas fa-poo-storm"></i>';
  } else if (info === 'Drizzle') {
    spanElement.innerHTML = '<i class="fas fa-cloud-rain"></i>';
  } else if (info === 'Rain') {
    spanElement.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
  } else if (info === 'Snow') {
    spanElement.innerHTML = '<i class="fas fa-snowflake"></i>';
  } else if (info === 'Clear') {
    spanElement.innerHTML = '<i class="fas fa-meteor"></i>';
  } else {
    spanElement.innerHTML = '<i class="fas fa-bomb"></i>';
  }

  return spanElement;
};

const generateComment = (temp, celsius) => {
  if (celsius === true && temp > 300) {
    return comments.hot[Math.floor(Math.random() * comments.hot.length)];
  } if (celsius === true && temp <= 300 && temp > 285) {
    return comments.normal[Math.floor(Math.random() * comments.normal.length)];
  }
  return comments.cold[Math.floor(Math.random() * comments.cold.length)];
};

const refreshBtn = (data, render) => {
  const refresh = document.createElement('span');
  refresh.innerHTML = '<i class="fas fa-sync"></i>';
  refresh.classList.add('refresh-btn');

  refresh.addEventListener('click', (e) => {
    e.preventDefault();
    render(data);
  });

  return refresh;
};

const openModal = (modal, content) => {
  const exitModal = document.querySelector('.exit-modal');
  const modalContent = document.querySelector('.modal-content');
  const modalMessage = document.createElement('p');

  modal.style.display = 'block';
  modalMessage.textContent = content;
  modalContent.append(modalMessage, exitModal);

  exitModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
};

document.addEventListener('keydown', (e) => {
  const { keyCode } = e;
  if (keyCode === 27) {
    modal.style.display = 'none';
  }
});

export {
  kelvinToCelsius,
  kelvinToFahrenheit,
  weatherIcon,
  generateComment,
  refreshBtn,
  openModal,
  modal,
};