let now = new Date();
let h3 = document.querySelector(".day-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${hour}`;
}
let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();

h3.innerHTML = ` ${day}, ${hour} : ${min} `;
let fullTime = document.querySelector(".fulltime");
fullTime.innerHTML = `${year}/${month}/${date}    ${hour}:${min}`;

function search(event) {
  debugger;
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
  console.log(response.data);
  document.querySelector("#descripsion").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
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

let currentTemp = document.querySelector("#currentLocation");
currentTemp.addEventListener("click", navigateCurrentLocation);

//tabdil C to F
function changeCtoF(event) {
  event.preventDefault();
  let convert = document.querySelector("#realDegree");
  let tempF = convert.innerHTML; // inja bayad daraje roentekhab konam//
  tempF = Number(tempF); // be integer tabdil mikonam baraye etminan bishtar chon innerhtml string hast//
  convert.innerHTML = Math.round((tempF * 9) / 5 + 32);
}

function changeFtoC(event) {
  event.preventDefault();
  let convert = document.querySelector("#realDegree");
  let tempc = convert.innerHTML;
  tempc = Number(tempc);
  convert.innerHTML = Math.round(((tempc - 32) * 5) / 9);
}
let convertF = document.querySelector("#fahrenheit");
convertF.addEventListener("click", changeCtoF);

let convertC = document.querySelector("#celsius");
convertC.addEventListener("click", changeFtoC);
