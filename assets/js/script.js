console.log("this page works!")

// link api using the native request 
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// exclude: minutely, hourly, alerts
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// add perameter for imperial fareignheight units=imperial
// tested the api+my key and was able to return data: https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial
// need to get data for current, next 5 days 
// var apiKey = 'f35848bb6c7b565a35f30b45519c3d76'; // my api key from weather app

// get 5 day forecast based on lat/long from current weather API
function get5DayForecast(lat, long) {
    console.log('getting 5 day forecast for', lat, long)
    // call this api to get the forecast
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var domain = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial";
    
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
          var imageID = "http://openweathermap.org/img/wn/"+ response.daily[i].weather[0].icon + "@2x.png";
        
          // To Do: var nextDayDate = (date + i);
          // var nextDayTemp = document.getElementById("nextDayTemp" + i);
          var nextDayTemp = document.getElementById("nextDayTemp" + i);
          var nextDayWind = document.getElementById("nextDayWind" + i);
          var nextDayHumidity = document.getElementById("nextDayHumidity" + i);
          // UV works 
          var cityUV = document.getElementById("cityUV");

          document.getElementById(i).src=imageID;
  
          nextDayTemp.textContent = response.daily[i].temp.day;
          nextDayWind.textContent = response.daily[i].wind_speed;
          nextDayHumidity.textContent = response.daily[i].humidity;
          cityUV.textContent = response.current.uvi;

          }
       
      })
}


// pass user input to weather API 

function search () {

  var city = document.getElementById("userData").value;
    console.log(city); 

  // // store value
  // var cityListEl = $('list-group-item')
  // // store element html
  // var cityList = [];
  // // create array from userData inputs (city value)
  // cityList [0] = city;
  // // start at 0 array item

  // localStorage.setItem("cityList", JSON.stringify(city));
  // // for (var i=0; localStorage.length; i++) {
  // //   cityListEl.append.textContent.localStorage.key(i)
  // // };


    // fetch data from the api from current weather based on the city using perameters  api key and imperial units
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f35848bb6c7b565a35f30b45519c3d76&units=imperial';
    
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
        get5DayForecast(response.coord.lat, response.coord.lon)

      })

}

// var storedCity = localStorage.getItem(city);
// console.log("")


// // get user input from search
// function search () {
//   // get value from input
    

  // // get local storage 
  //   var cityListEl = $('list-group-item');
  //   var cityList = [];
  //   if (localStorage.length < 5) {
  //     for (var i=0; i < localStoraage.length; i++) {
  //       cityListEl.append ('<li class="list-group-item">' + localStorage.key(i) + localStorage.getItem(localStorage.key(i)) + '</li>')
        
  //       // localStorage.setItem("cityList",JSON.stringify(cityList));
  //   console.log(cityList);

    // if (cityList.length < 5) {
    //   for (var i=0; i < userData.length; i++) {
    //     console.log()
    //   }
    // }
  
  // TODO: store city in local storage
// }

// listen()


// search for city based on today's date

// current/future (5day conditions display)

// color for favorability (Favorable, Moderate, Severe)

// view future weather conditions for display city

// 5 day forecast with date, icon, temp, wind, humidity

// click on past & it displays (local storage)

// localStorage.setItem ("city", JSON.stringify(city));

// function

// var cityList = localStorage.getItem("city");
// var listItems = document.querySelectorAll(".list-group-item");

// localStorage.setItem("city", JSON.stringify(city));



// function storeDataLocally () {
//   var city = document.getElementById("userData").value;
//     console.log(city);
  
//     localStorage.setItem(userData.value(), JSON.stringify(userData.value()));
//      localStorage.getItem()
// }


// //tried to do jQuery to link local storage 
// $("#userData").click(function(){
//   console.log("Clicked the save button", $(this));
// })

// get value


// function lastSearch () {
//   var recentSearch = userData
//   recentSearch.push($("userData").val());
//   localStorage.setItem(userData.value, JSON.stringify(userData));
//   console.log(userData.value);
// }

// function storeDataLocally () {
//   var city = document.getElementById("userData").value;
//     console.log(city);
  
//     localStorage.setItem(userData.value(), JSON.stringify(userData.value()));
//      localStorage.getItem()
// }
