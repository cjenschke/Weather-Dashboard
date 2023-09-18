const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const forecastInfo = document.getElementById('forecastInfo');
const recentCitiesList = document.getElementById('recentCitiesList');
const apiKey = '45fbf3ab9f66b35b8a2d225399ff949c';
const maxCities = 5

//Load the last entered city from localStorage
const lastCitySearch = localStorage.getItem('recentCities');

// Event listener for search button
searchButton.addEventListener('click', function(){
    // Toggle backround from being hidden
    background.classList.toggle('hidden');
   const city = cityInput.value;
   getWeatherData(city);
   saveRecentCity(city);// Save the searched city
   displayRecentCities();//Display the updated list of searched cities

    //log city that was searched in console
    console.log('Search for ' + city);
});
// API request to get weather data
function getWeatherData(city){

    //API request for current weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        // Pull weather data from response
        const currentWeather =  {
            temperature: data.main.temp,
            weatherDescription: data.weather[0].description,
            iconUrl: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
        };
        console.log('Current Weather:',currentWeather);

        // Display current weather in HTML
        weatherInfo.innerHTML = '<h2>Current Weather in ' + city + '</h2>' +
        '<p>Temperature: ' + currentWeather.temperature + '°C</p>' +
        '<p>Weather: ' + currentWeather.weatherDescription + '</p>' +
        '<img src="' + currentWeather.iconUrl + '" alt="Weather Icon">' +
        '<p>Wind Speed: ' + currentWeather.windSpeed + ' m/s</p>' +
        '<p>Humidity: ' + currentWeather.humidity + '%</p>';

        // API request for 5 day forecast
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function(response){
    return response.json();
    })
    .then(function (data){
    const forecast = data.list;

        // Clean previous forecast info
    forecastInfo.innerHTML = '';

    for (let i= 0; i < forecast.length; i += 8){
        const forecastWeather = {
            date: new Date(forecast[i].dt * 1000).toLocaleDateString(),
            iconUrl: `https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`,
                            temperature: forecast[i].main.temp,
                            windSpeed: forecast[i].wind.speed,
                            humidity: forecast[i].main.humidity
        };

        // Display forecast in HTML
        forecastInfo.innerHTML += '<li>' +
        '<div>Date: ' + forecastWeather.date + '</div>' +
        '<div>Weather Icon: <img src="' + forecastWeather.iconUrl + '" alt="Weather Icon"></div>' +
        '<div>Temperature: ' + forecastWeather.temperature + '°C</div>' +
        '<div>Wind Speed: ' + forecastWeather.windSpeed + ' m/s</div>' +
        '<div>Humidity: ' + forecastWeather.humidity + '%</div>' +
        '</li>';
    }
    })

    .catch(function (error){
    console.error('Error fetching forecast data', error);
    });
})
.catch(function (error) {
    console.error('Error fetching current weather data:', error);
 });
}
  // Save recent searched cities
function saveRecentCity(city){
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];
    const index = recentCities.indexOf(city);
    if (index !== -1){
        recentCities.splice(index, 1);
    }
    recentCities.unshift(city);
    recentCities = recentCities.slice(0, maxCities);
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
}
    // Display recent searched cities
function displayRecentCities(){
    recentCitiesList.innerHTML='';
    let recentCites = JSON.parse(localStorage.getItem('recentCities')) || [];
    for (const city of recentCites){
        const savedCityButton = document.createElement('savedCityButton');
        savedCityButton.textContent = city;
        savedCityButton.addEventListener('click', function(){
            getWeatherData(city);
        });
        recentCitiesList.appendChild(savedCityButton);
    }
}

displayRecentCities();