console.log("this page works!")

// link api using the native request 
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// exclude: minutely, hourly, alerts
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// add perameter for imperial fareignheight units=imperial
// tested the api+my key and was able to return data: https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial
// need to get data for current, next 5 days 

var apiKey = 'f35848bb6c7b565a35f30b45519c3d76'; // my api key from weather app
var request = getRequestFrom;
var getRequestFrom = 'https://api.openweathermap.org/geo/1.0/direct?q=&limit=5&appid';  // how to i structure this

// var fetchBtn = document.getElementByClassName(btn);


function get5DayForecast(lat, long) {
    console.log('getting 5 day forecast for', lat, long)
    // call this api to get the forecast
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var domain = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial";

    fetch(domain)
    .then(function (response) {
        return response.json();
      })
      .then(function (response) {
          // response.list[0].weather.description

          for (let i = 0; i < 5; i++) {
               // imzge soource needs we need to update the icon part of this x
          // http://openweathermap.org/img/wn/10d@2x.png 
          var imageID = "http://openweathermap.org/img/wn/"+ response.list[i].weather[0].icon + "@2x.png";

          document.getElementById(i).src=imageID
          }
        
        //   note to self to HTML next items before javascript

       
      })
}



// get user input from search
// pass user input to weather API 
function search () {
    // get value from input
    var city = document.getElementById("userData").value;
    console.log(city);

    // fetch data from the api
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial';
    
    fetch(url)

    // parse data (Object usable data)
    .then(function (response) {
        return response.json();
      })
      .then(function (response) {

        // set data on html elements
        var cityName = document.getElementById("cityName");
        var cityTemp = document.getElementById("cityTemp");
        var cityWind = document.getElementById("cityWind");
        var cityHumidity = document.getElementById("cityHumidity");
        var cityUV = document.getElementById("cityUV");

        cityName.textContent = response.name;
        cityTemp.textContent = response.main.temp;

        // get 5 day forecast
        get5DayForecast(response.coord.lat, response.coord.lon)

      })

}








// listen()


// search for city based on today's date

// current/future (5day conditions display)

// present: city name, date, weather icon, temp, humidity, wind speed, UV

// color for favorability (Favorable, Moderate, Severe)

// view future weather conditions for display city

// 5 day forecast with date, icon, temp, wind, humidity

// click on past & it displays (local storage)

