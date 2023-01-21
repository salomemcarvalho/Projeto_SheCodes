// Mudança da Cidade
function submitCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#type-city");
  let newCity = document.querySelector("#new-city");
  newCity.innerHTML = `${changeCity.value}`;
}
let enterCity = document.querySelector("#search-form");
enterCity.addEventListener("submit", submitCity);
// Mudança da Hora
let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayMonth = now.getDate();
let month = now.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let day = days[now.getDay()];

let date = document.querySelector("#date-details");
date.innerHTML = `${day} ${dayMonth} ${months[month]} ${hour}:${minute}`;
// Mudar para C e F
function CelusToFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  let farenheitTemp = temperature.innerHTML;
  temperature.innerHTML = `70`;
}
let farenheit = document.querySelector("#fahrenheit-link");
farenheit.addEventListener("click", CelusToFarenheit);
// Mudar para C e F
function FarenheitToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  let celsiusTemp = temperature.innerHTML;
  temperature.innerHTML = `21`;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", FarenheitToCelsius);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//week 5
function displayWeatherCondition(response) {
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#here-temp");
currentLocationButton.addEventListener("click", getCurrentLocation);
//Por o forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<span Class="weather-forecast-date">${day}</span>
         <img 
      src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="*" width="20">
          <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-actual">18º</span>
          </div>
          `;
  });
  forecastElement.innerHTML = forecastHTML;
}
