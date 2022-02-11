console.log("this page works!");
// this homework is still in progress:
// TODO: day 1-5 forecast add dates
// TODO: UV index color not working

//******************* GLOBAL VARIABLES***********************

var previousSearchedCities = JSON.parse(localStorage.getItem("cityList"));
var searchBtn = $("#search-city");
var today = new Date();
var date = today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

//******************** FUNCTIONS ******************************

// get date
document.getElementById("displayDate").innerHTML = date;

// store cities in aside
if (previousSearchedCities === null) {
  //assign a blank array
  previousSearchedCities = [];
}
//console.log("Searched ", previousSearchedCities);

// get 5 day forecast based on lat/long from current weather API
function get5DayForecast(lat, long) {
  console.log("getting 5 day forecast for", lat, long);

  // call this api to get the forecast
  var domain =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial";

  fetch(domain)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // loop for 5 day forecast
      for (let i = 0; i < 5; i++) {
        // http://openweathermap.org/img/wn/10d@2x.png
        // icon is working across loop
        // variable to get image
        var imageID =
          "http://openweathermap.org/img/wn/" +
          response.daily[i].weather[0].icon +
          "@2x.png";

        // var nextDayTemp = document.getElementById("nextDayTemp" + i);
        var nextDayTemp = document.getElementById("nextDayTemp" + i);
        var nextDayWind = document.getElementById("nextDayWind" + i);
        var nextDayHumidity = document.getElementById("nextDayHumidity" + i);
        // UV works
        var cityUV = document.getElementById("cityUV");

        document.getElementById(i).src = imageID;

        nextDayTemp.textContent = response.daily[i].temp.day;
        nextDayWind.textContent = response.daily[i].wind_speed;
        nextDayHumidity.textContent = response.daily[i].humidity;
        cityUV.textContent = response.daily[0].uvi;

        // style UV index (Not Working)
        let cityUvEl = jumboColor;
        if (cityUV > 0 && cityUV < 2) {
          cityUvEl.addClass("low");
        } else if (cityUV > 2 && cityUV < 5) {
          cityUvEl.addClass("medium");
        } else if (cityUV > 5) {
          cityUvEl.addClass("high");
        }
      }
    });
}

// pass user input to weather API
function search(city) {
  console.log(city);

  // fetch data from the api from current weather based on the city using perameters  api key and imperial units
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial";

  fetch(url)
    // parse data (Object usable data becomes usable)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // set data on html elements
      var cityName = document.getElementById("cityName");
      var cityTemp = document.getElementById("cityTemp");
      var cityWind = document.getElementById("cityWind");
      var cityHumidity = document.getElementById("cityHumidity");

      cityName.textContent = response.name;
      cityTemp.textContent = response.main.temp;
      cityWind.textContent = response.wind.speed;
      cityHumidity.textContent = response.main.humidity;

      // get 5 day forecast from lat/long
      get5DayForecast(response.coord.lat, response.coord.lon);

      //append the new city to the previous searched list
      previousSearchedCities.push(city);
      //save it to local storage
      localStorage.setItem("cityList", JSON.stringify(previousSearchedCities));
    });
}

// store value (which is already defined) as an array
function populateStorage() {
  var loopCount = 0;
  if (previousSearchedCities.length > 5) {
    loopCount = 5;
  } else {
    loopCount = previousSearchedCities.length;
  }

  // where length of array is less than 5 cities
  // TODO (not working)
  for (var i = 0; i < loopCount; i++) {
    console.log("city list value ", previousSearchedCities[i]);
    //creating a li tag
    var liElement = $("<li>");
    //styling the li element
    liElement.addClass("list-group-item");
    //setting the value for the li tag
    liElement.text(previousSearchedCities[i]);
    console.log(i, liElement, loopCount);
    //append it the ul tag
    $("#search-list").append(liElement);
  }
}

//when page loads create by recent search list if values exists
populateStorage();

//*****************EVENT LISTENERS**********************

searchBtn.on("click", function () {
  var city = document.getElementById("userData").value;
  search(city);
});

//on click event of li tag
$("#search-list > li").click(function (event) {
  console.log("li tag is clicked", $(this).text());
  search($(this).text());
});
