const API_URL = "http://api.openweathermap.org/data/2.5/weather?";

function getWeather(position){
    // const API_CURRENT = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    // const API_SEARCH = `q=${position}`;
    let WHICH_URL = `${typeof(position) === "object" ? `lat=${position.coords.latitude}&lon=${position.coords.longitude}` : `q=${position}`}`;
    let weather;
    fetch(`${API_URL}${WHICH_URL}${config.API_KEY}`)
        .then(res => res.json())
        .then(data => weather = data)
        .then(() => formatWeather(weather))
        .catch(err => console.log(err));
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
      } else { 
        return "Geolocation is not supported by this browser.";
      }
}

function formatWeather(weather) {
    document.getElementById("weather__currentLocation").innerHTML = `${weather.name}, ${weather.sys.country}`;
    document.getElementById("weather__icon").src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    document.getElementById("weather__currentDescription").innerHTML = weather.weather[0].main;
    document.getElementById("weather__currentTemp").innerHTML = Math.round(weather.main.temp);
    document.getElementById("weather__currentHigh").innerHTML = Math.round(weather.main.temp_max);
    document.getElementById("weather__currentLow").innerHTML = Math.round(weather.main.temp_min);
}

function searchWeather() {
    let searchLocation = document.getElementsByTagName("input")[0].value;
    getWeather(searchLocation);
}

document.addEventListener('DOMContentLoaded', function() {
    getLocation();
}, false);