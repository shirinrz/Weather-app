let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = date.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let year = date.getFullYear();
let month = months[date.getMonth()];
let rightDate = date.getDate();

document.querySelector("#day_time").innerHTML = ` ${day}, ${hour} : ${min} `;
let fullTime = document.querySelector("#fulltime");
fullTime.innerHTML = `${year}/${month}/${rightDate}  ,   ${hour}:${min}`;

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class="row">`;

  forecast.forEach(function (dailyForcast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="date-forcaste">${formatForecastDay(dailyForcast.dt)}</div> 
        <img
        src="http://openweathermap.org/img/wn/${
          dailyForcast.weather[0].icon
        }@2x.png"
        alt=""
        width="45"
          />
        <div class="weather-forecast-temp">
        <span id="forecast-temp-max">${Math.round(
          dailyForcast.temp.max
        )}°</span>
        <span id="forecast-temp-min"> ${Math.round(
          dailyForcast.temp.min
        )}°</span>
        </div>
      </div>
   `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector(
    "#changeCity"
  ).innerHTML = `${response.data.name} , ${response.data.sys.country} `;
  let degree = document.querySelector("#realDegree");
  degree.innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#descripsion").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  getForcast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let change = document.querySelector("#changeCity");
  change.innerHTML = ` ${city.value}`;
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", search);

// current location button

function locationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrlC = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlC).then(showTemperature);
}

function navigateCurrentLocation() {
  navigator.geolocation.getCurrentPosition(locationTemp);
}

let currentPositionTemp = document.querySelector("#currentLocation");
currentPositionTemp.addEventListener("click", navigateCurrentLocation);

//convert C to F
function changeCtoF(event) {
  event.preventDefault();
  let fahrenheiTemperature = document.querySelector("#realDegree");
  convertC.classList.remove("active");
  convertF.classList.add("active");

  fahrenheiTemperature.innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
}

function changeFtoC(event) {
  event.preventDefault();
  convertF.classList.remove("active");
  convertC.classList.add("active");
  let cTemperature = document.querySelector("#realDegree");
  cTemperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let convertF = document.querySelector("#fahrenheit");
convertF.addEventListener("click", changeCtoF);

let convertC = document.querySelector("#celsius");
convertC.addEventListener("click", changeFtoC);

navigateCurrentLocation();
