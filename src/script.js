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

function search(event) {
  //debugger;
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let change = document.querySelector("#changeCity");
  change.innerHTML = ` ${city.value}`;
  let apiKey = "0865769520c78b96f50156d7932472e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  document.querySelector(
    "#changeCity"
  ).innerHTML = `${response.data.name} , ${response.data.sys.country} `;
  let degree = document.querySelector("#realDegree");
  degree.innerHTML = Math.round(response.data.main.temp);

  celsiusTemperature = Math.round(response.data.main.temp);

  console.log(response.data);
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
  let apiKey = "0865769520c78b96f50156d7932472e4";
  let apiUrlC = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlC).then(showTemperature);
}

let currentPositionTemp = document.querySelector("#currentLocation");
currentPositionTemp.addEventListener("click", navigateCurrentLocation);
navigateCurrentLocation();

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
