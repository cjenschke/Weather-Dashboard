const searchButton=document.getElementById('searchButton');
const cityInput=document.getElementById('cityInput');
const weatherInfo=document.getElementById('weatherInfo');

searchButton.addEventListener('click', function(){
    const city=cityInput.value;
    getWeatherData(city);
    console.log('Search for ' + city);
});

function getWeatherData(city){
    //API request to retrieve weather data for city
}