const apiKey = "https://api.open-meteo.com/v1/forecast"; // Public API

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const errorMessage = document.getElementById("errorMessage");

// Fetch coordinates using Open Meteo geocoding API
async function getCoordinates(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

// Fetch weather data using async/await
async function getWeather(city) {
  try {
    errorMessage.style.display = "none";
    weatherInfo.style.display = "none";

    const { latitude, longitude, name, country } = await getCoordinates(city);

    const response = await fetch(
      `${apiKey}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await response.json();

    if (!data.current_weather) {
      throw new Error("Weather data unavailable");
    }

    // Display data dynamically
    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = `${data.current_weather.temperature}°C`;

    const weatherCode = data.current_weather.weathercode;
    let conditionText = "Clear Sky";
    if (weatherCode >= 1 && weatherCode <= 3) conditionText = "Partly Cloudy";
    else if (weatherCode >= 45 && weatherCode <= 48) conditionText = "Fog";
    else if (weatherCode >= 51 && weatherCode <= 67) conditionText = "Rainy";
    else if (weatherCode >= 71 && weatherCode <= 77) conditionText = "Snow";
    else if (weatherCode >= 80) conditionText = "Stormy";

    description.textContent = `Condition: ${conditionText}`;
    weatherInfo.style.display = "block";

    // Save to localStorage
    localStorage.setItem("lastCity", city);
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
}

// Event listener for button
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    errorMessage.textContent = "Please enter a city name!";
    errorMessage.style.display = "block";
    return;
  }
  getWeather(city);
});

// Load last searched city
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
  }
});