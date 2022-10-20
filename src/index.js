let currentDate = document.querySelector("#currentDate");
let currentHour = document.querySelector("#currentHour");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thur", "Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `   
    <div class="col-sm-2 weekday">
                ${day}<br /><img
                  src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
                  alt="sunny"
                  width="30px"
                />
                <br /><span class="forecastmax">50</span
                ><span class="forecastmin"> 25</span>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
let feelsLike;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `8cd9be374c7c96c39a9fe73f4bf2f055`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//Search Weather by City

function displayWeather(response) {
  console.log(response.data);
  let h1 = document.querySelector("#mainCity");
  let TempElement = document.querySelector("#todaytemp");
  let descriptionElement = document.querySelector("#description");
  let feelslikeElement = document.querySelector("#feels");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector(`#icon`);

  celciusTemp = response.data.main.temp;
  h1.innerHTML = response.data.name;
  TempElement.innerHTML = `${Math.round(response.data.main.temp)}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLike = Math.round(response.data.main.feels_like);
  feelslikeElement.innerHTML = `Feels like:${feelsLike}°`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
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
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celciusTemp * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#todaytemp");
  temperatureElement.innerHTML = fahrenheitTemp;
  let feelslikeElement = document.querySelector("#feels");
  feelslikeElement.innerHTML = `Feels like: ${Math.round(
    (feelsLike * 9) / 5 + 32
  )}°`;
}

function showCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todaytemp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
  let feelslikeElement = document.querySelector("#feels");
  feelslikeElement.innerHTML = `Feels like: ${feelsLike}°`;
}
let celciusTemp = null;

let locationButton = document.querySelector("#here");
locationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

search("New York");
