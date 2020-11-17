const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

const kelvinToFahrenheit = (kelvin) => Math.round(((kelvin - 273.15) * 9) / 5 + 32);

export { kelvinToCelsius, kelvinToFahrenheit }