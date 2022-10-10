let currentDate = document.querySelector("#currentDate");
let currentHour = document.querySelector("#currentHour");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sun ", "Mon ", "Tues ", "Wed ", "Thur ", "Fri ", "Sat "];
let day = days[now.getDay()];
let months = [
  "January ",
  "February ",
  "March ",
  "April ",
  "May ",
  "June ",
  "July ",
  "August ",
  "September",
  "October ",
  "November ",
  "December ",
];

let month = months[now.getMonth()];
currentDate.innerHTML = `${day}, ${month}${date}, ${year}`;
currentHour.innerHTML = `${hours}:${minutes}`;
let mainCity = document.querySelector("#mainCity");

//Search Weather by City

function displayWeather(response) {
  console.log(response.data);
  let h1 = document.querySelector("#mainCity");
  let mainTemp = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${mainTemp}°c`;
}
function search(city) {
  let key = `260693d14bfef0618d9771c4a5f5a5bb`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function cityImput(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;

  search(city);
}

let searchCity = document.querySelector("#searchForm");
searchCity.addEventListener("submit", cityImput);

//current location
function showCurrentLocation(position) {
  let key = `260693d14bfef0618d9771c4a5f5a5bb`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getCurrentLocation);
