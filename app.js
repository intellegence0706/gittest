const apiKey = '5d7f62175b3759a534154b07102286bb';
const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const resultDiv = document.getElementById('weather-result');
const errorMsg = document.getElementById('error-message');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  resultDiv.classList.add('hidden');
  errorMsg.classList.add('hidden');

  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  console.log('Fetching weather from:', url);

  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) {
      console.error('Fetch failed:', res.status, await res.text());
      throw new Error('City not found');
    }
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
});

function displayWeather(data) {
  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('temp').textContent = Math.round(data.main.temp);
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('wind').textContent = data.wind.speed;
  resultDiv.classList.remove('hidden');
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}
