console.log("this page works!");
// this homework is still in progress:
// TODO: return date of event
// TODO: save search results to aside
// TODO: color UV index

//******************* GLOBAL VARIABLES

var previousSearchedCities = JSON.parse(localStorage.getItem("cityList"));
if (previousSearchedCities === null) {
  //assign a blank array
  previousSearchedCities = [];
}
//console.log("Searched ", previousSearchedCities);

var searchBtn = $("#search-city");

// ***************** FUNCTIONS ******************************

// get 5 day forecast based on lat/long from current weather API
function get5DayForecast(lat, long) {
  console.log("getting 5 day forecast for", lat, long);
  // call this api to get the forecast
  // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
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
      // response.list[0].weather.description
      // var imageID = "http://openweathermap.org/img/wn/"+ response.list[i].weather[0].icon + "@2x.png";
      // loop for 5 day forecast
      for (let i = 0; i < 5; i++) {
        // http://openweathermap.org/img/wn/10d@2x.png
        // icon is working across loop
        // variable to get image
        var imageID =
          "http://openweathermap.org/img/wn/" +
          response.daily[i].weather[0].icon +
          "@2x.png";

        // To Do: var nextDayDate = (date + i);
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
        cityUV.textContent = response.current.uvi;

        // UV value 0-5 color yellow, 6-7 orange, 8-10 red
        // var jumboColorEl =$("jumboColor");
        // if(cityUV >= "0" && cityUV >= "3"){
        //    jumboColorEl.addClass("low"); //color jumbotron yellow
        // }
        // else if ()
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

function populateStorage() {
  // store value (which is already defined) as an array
  // store element html
  // create array from userData inputs (city value)

  var loopCount = 0;
  if (previousSearchedCities.length > 5) {
    loopCount = 5;
  } else {
    loopCount = previousSearchedCities.length;
  }

  // where length of array is less than 5
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

//**** EVENT LISTENERS

searchBtn.on("click", function () {
  var city = document.getElementById("userData").value;
  search(city);
});

//on click event of li tag
$("#search-list > li").click(function (event) {
  console.log("li tag is clicked", $(this).text());
  search($(this).text());
});
