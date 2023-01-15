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
//week 5
function displayWeatherCondition(response) {
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
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
