const Testurl = "https://api.openweathermap.org/data/2.5/weather?q=seattle&units=imperial&appid=8ffb62dfa9631cd0e94104bfe1a49201"

const forecast = "https://api.openweathermap.org/data/2.5/forecast?id=5809844&units=imperial&appid=8ffb62dfa9631cd0e94104bfe1a49201"

const UV = "http://api.openweathermap.org/data/2.5/uvi?appid=8ffb62dfa9631cd0e94104bfe1a49201&lat=47.61&lon=-122.33"

const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
const forecastUnits = "&units=imperial"
const forecastAPI= "&appid="
const localForecast = "http://api.openweathermap.org/data/2.5/forecast?"

const UVurl = "http://api.openweathermap.org/data/2.5/uvi?appid="


const oneCall = "https://api.openweathermap.org/data/2.5/onecall?"
const local = "https://api.openweathermap.org/data/2.5/weather?"
const lat = "lat="
const long = "&lon="
const hourly = "&exclude=hourly,daily&appid="

const url = "https://api.openweathermap.org/data/2.5/weather?q="
const units = "&units=imperial&appid="
const api = "8ffb62dfa9631cd0e94104bfe1a49201"

var citytext = $("#city-input")
var submitBtn = $("#city-submit")
var cities = []

function currentDate () {
    var currentTime = moment().format('MMMM Do YYYY, h:mm a');

    $("#currentDay").text(currentTime);
  }
  
setInterval(currentDate,1000);

currentDate();

var options = {

  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
}

function error(err) {
    alert("Please select a city")
}


function success(pos) {
    
    var localLat = pos.coords.latitude
    var localLon = pos.coords.longitude

    console.log(localLat)
    console.log(localLon)

    var queryURL = local + lat + localLat + long + localLon + units + api
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response)

        var cityName = response.name
        var temperature = response.main.temp
        var humidity= response.main.humidity
        var wind = response.wind.speed
        var icon = response.weather[0].icon
        
        $("#city-name").text(cityName)
        
        $("#temp").text("Temperature: " + temperature)
        
        $("#humid").text("Humidity: " + humidity + "%")
        
        $("#wSpeed").text("Wind Speed: " + wind)
        
        $("#wIcon").attr( "src", 'https://openweathermap.org/img/w/' + icon + '.png')

        

        var UVquery = UVurl + api + lat + localLat + long + localLon;
        
        $.ajax({
            url: UVquery,
            method: "GET"
        }).then(function(response) {
            var uvDiv = $("#uv")
            var uvIndex = response.value
            uvDiv.text("UV Index: " + uvIndex)
            // console.log(response);

            if (uvIndex < 3) {
                uvDiv.attr('style', 'background-color: green; color: white; width: 120px;');
            } else if (uvIndex < 6) {
                uvDiv.attr('style', 'background-color: yellow; width: 120px;');
            } else if (uvIndex < 8) {
                uvDiv.attr('style', 'background-color: orange; width: 120px;');
            } else if (uvIndex < 11) {
                uvDiv.attr('style', 'background-color: red; color: white; width: 120px;');
            } else {
                uvDiv.attr('style', 'background-color: purple; color: white; width: 120px;');
            }

    })

    var forecastQuery = localForecast + lat + localLat + long + localLon + forecastUnits + forecastAPI + api

    console.log(forecastQuery)
    $.ajax({
        url: forecastQuery,
        method:"GET"
    }).then(function(response) {
        console.log(response)
        for ( var i =0; i<5; i++) {

            var cardElement = $("<div class=card>").attr("id", i).addClass("forecast")
            cardElement.appendTo("#days");
            
            var cardTitle = $("<div class=card-title>")
            var day = moment().add(i, "days").format("l")
            cardTitle.text(day)
            cardTitle.appendTo(cardElement)

            var cardBody = $("<div class=card-body>")

            var iconCast = response.list[i].weather[0].icon
            var pIcon = $("<img>").attr("src",  'https://openweathermap.org/img/w/' + iconCast + '.png')
            pIcon.appendTo(cardBody)

            var tempCast = response.list[i].main.temp
            var pTemp = $("<p>" + "Temperature: " + tempCast + "</p>")
            pTemp.appendTo(cardBody)
        
            var humidCast= response.list[i].main.humidity
            var pHumid = $("<p>" + "Humidty: " + humidCast + "%" + "</p>")
            pHumid.appendTo(cardBody)
            
            var windCast = response.list[i].wind.speed
            var pWind = $("<p>" + "Wind speed: " + windCast + "</p>")
            pWind.appendTo(cardBody)

            cardBody.appendTo(cardElement)
    
            }
            // console.log(today)
    })
 

    })
}



navigator.geolocation.getCurrentPosition(success, error, options)

function displayWeatherResults () {
    var city = $(this).attr("data-name")
    var queryURL = url + city + units + api

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var cityName = response.name
        var temperature = response.main.temp
        var humidity= response.main.humidity
        var wind = response.wind.speed
        var icon = response.weather[0].icon
        
        $("#city-name").text(cityName)
        
        $("#temp").text("Temperature: " + temperature)
        
        $("#humid").text("Humidity: " + humidity + "%")
        
        $("#wSpeed").text("Wind Speed: " + wind)
        
        $("#wIcon").attr( "src", 'https://openweathermap.org/img/w/' + icon + '.png')

        var globalLat = response.coord.lat
        var globalLon = response.coord.lon
        var UVquery = UVurl + api + lat + globalLat + long + globalLon;
        
        $.ajax({
            url: UVquery,
            method: "GET"
        }).then(function(response) {
            var uvDiv = $("#uv")
            var uvIndex = response.value
            uvDiv.text("UV Index: " + uvIndex)
            // console.log(response);

            if (uvIndex < 3) {
                uvDiv.attr('style', 'background-color: green; color: white; width: 120px;');
            } else if (uvIndex < 6) {
                uvDiv.attr('style', 'background-color: yellow; width: 120px;');
            } else if (uvIndex < 8) {
                uvDiv.attr('style', 'background-color: orange; width: 120px;');
            } else if (uvIndex < 11) {
                uvDiv.attr('style', 'background-color: red; color: white; width: 120px;');
            } else {
                uvDiv.attr('style', 'background-color: purple; color: white; width: 120px;');
            }

    })

    var forecastQuery = forecastUrl + city + forecastUnits + forecastAPI + api

    $.ajax({
        url: forecastQuery,
        method:"GET"
    }).then(function(response) {
        console.log(response)
        for ( var i =0; i<5; i++) {

            var cardElement = $("<div class=card>").attr("id", i)
            cardElement.appendTo("#days");
            
            var cardTitle = $("<div class=card-title>")
            var day = moment().add(i, "days").format("l")
            cardTitle.text(day)
            cardTitle.appendTo(cardElement)

            var cardBody = $("<div class=card-body>")

            var iconCast = response.list[i].weather[0].icon
            var pIcon = $("<img>").attr("src",  'https://openweathermap.org/img/w/' + iconCast + '.png')
            pIcon.appendTo(cardBody)

            var tempCast = response.list[i].main.temp
            var pTemp = $("<p>" + "Temperature: " + tempCast + "</p>")
            pTemp.appendTo(cardBody)
        
            var humidCast= response.list[i].main.humidity
            var pHumid = $("<p>" + "Humidty: " + humidCast + "%" + "</p>")
            pHumid.appendTo(cardBody)
            
            var windCast = response.list[i].wind.speed
            var pWind = $("<p>" + "Wind speed: " + windCast + "</p>")
            pWind.appendTo(cardBody)

            cardBody.appendTo(cardElement)
    
            }
            // console.log(today)
    })
 

    })
}


fetch(forecast).then(res => {
     return res.json();
}).then(function(res) {
    console.log(res.list[1].main.temp);
});



function renderCities () {
    $(".cities").empty();

    renderSavedCities();

    for (var i = 0; i < cities.length; i++) {
        
        var selectedCities = $("<button>")
        selectedCities.addClass("selectedCities")
        selectedCities.attr("data-name", cities[i])
        selectedCities.text(cities[i]).attr("value", i).attr("id", i)
        $(".cities").prepend(selectedCities)

        // if (selectedCities.val() != selectedCities.val()) {
            
        // }
        localStorage.setItem(selectedCities.val(),cities[i])
        // var get = localStorage.getItem(JSON.parse(selectedCities.val()))
        // var newButton = $("<button>").addClass("selectedCities").attr("data-name", get)
        // newButton.text(get).attr("value", i).attr("id", i)
        // $(".cities").prepend(newButton)
    }
    
    
    // renderSavedCities();
    // var Id = $(this).val()
    // var input = $(`#${Id}`).val()
    // localStorage.setItem(Id,input)
}

function renderSavedCities () {
    
    for (var i = 0; i < localStorage.length; i++) {
        var get = localStorage.getItem(localStorage.key(i))
        console.log(get)
        var newButton = $("<button>").addClass("selectedCities").attr("data-name", get)
        newButton.text(get).attr("value", i).attr("id", i)
        $(".cities").prepend(newButton)
    }

    // var storedCity = JSON.parse(JSON.stringify(localStorage.getItem("cities")))
    // var newButton = $("<button>").attr("data-name", storedCity).text(stored)
    // $(".cities").prepend(newButton)
}


// function init() {
//     var storedSearch = JSON.parse(localStorage.getItem("cities"));
//     console.log(storedSearch)
// }

// init();

$("#city-submit").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var city = $("#city-input").val().trim();
    // The movie from the textbox is then added to our array
    cities.push(city);


    // calling renderButtons which handles the processing of our movie array
    // renderSavedCities();
    displayWeatherResults();
    renderCities();
  });

  $(document).on("click", ".selectedCities", displayWeatherResults);

  renderCities();


