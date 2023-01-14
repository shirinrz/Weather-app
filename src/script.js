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
let year = date.getFullYear();
let month = date.getMonth();
let rightDate = date.getDate();

document.querySelector("#day_time").innerHTML = ` ${day}, ${hour} : ${min} `;
let fullTime = document.querySelector("#fulltime");
fullTime.innerHTML = `${year}/${month}/${rightDate}    ${hour}:${min}`;

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class="row">`;
  days = ["Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="date-forcaste">${day}</div>
        <img
        src="http://openweathermap.org/img/wn/04d@2x.png"
        alt=""
        width="40"
          />
        <div class="weather-forecast-temp">
        <span id="forecast-temp-max">18°</span>
        <span id="forecast-temp-min"> 12°</span>
        </div>
      </div>
   `;
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
function navigateCurrentLocation() {
  navigator.geolocation.getCurrentPosition(locationTemp);
}
function locationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrlC = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlC).then(showTemperature);
}

let currentPositionTemp = document.querySelector("#currentLocation");
currentPositionTemp.addEventListener("click", navigateCurrentLocation);

//convert C to F
function changeCtoF(event) {
  event.preventDefault();
  let fahrenheiTemperature = document.querySelector("#realDegree");
  convertC.classList.remove("active");
  convertF.classList.add("active");
  //let tempF = convert.innerHTML; // choose degree from html//
  //tempF = Number(tempF); // because innerHTML is a string I should change it to integer value//
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
