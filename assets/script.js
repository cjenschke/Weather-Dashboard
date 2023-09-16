const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const forecastInfo = document.getElementById('forecastInfo');
const apiKey = '45fbf3ab9f66b35b8a2d225399ff949c';

searchButton.addEventListener('click', function(){
   const city = cityInput.value;
   getWeatherData(city);
    //log city that was searched in console
    console.log('Search for ' + city);
});

function getWeatherData(city){
    //API request to retrieve weather data for city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const currentWeather =  {
            temperature: data.main.temp,
            weatherDescription: data.weather[0].description,
            iconUrl: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity
        };
        console.log(currentWeather);

        weatherInfo.innerHTML = '<h2>Current Weather in ' + city + '</h2>' +
        '<p>Temperature: ' + currentWeather.temperature + '°C</p>' +
        '<p>Weather: ' + currentWeather.weatherDescription + '</p>' +
        '<img src="' + currentWeather.iconUrl + '" alt="Weather Icon">' +
        '<p>Wind Speed: ' + currentWeather.windSpeed + ' m/s</p>' +
        '<p>Humidity: ' + currentWeather.humidity + '%</p>';
    });
};


