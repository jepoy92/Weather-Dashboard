const Testurl = "https://api.openweathermap.org/data/2.5/weather?q=seattle&units=imperial&appid=8ffb62dfa9631cd0e94104bfe1a49201"

const forecast = "https://api.openweathermap.org/data/2.5/forecast?id=5809844&units=imperial&appid=8ffb62dfa9631cd0e94104bfe1a49201"

const UV = "http://api.openweathermap.org/data/2.5/uvi?appid=8ffb62dfa9631cd0e94104bfe1a49201&lat=47.61&lon=-122.33"

const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
const forecastUnits = "&units=imperial"
const forecastAPI= "&appid="

const UVurl = "http://api.openweathermap.org/data/2.5/uvi?appid="


const oneCall = "https://api.openweathermap.org/data/2.5/onecall?"
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
        // var lat = response.coord.lat
        // var lon = response.coord.lon
        
        $("#city-name").text(cityName)
        
        $("#temp").text("Temperature: " + temperature)
        
        $("#humid").text("Humidity: " + humidity)
        
        $("#wSpeed").text("Wind Speed: " + wind)
        
        $("#wIcon").attr( "src", 'https://openweathermap.org/img/w/' + icon + '.png')

        var lat = response.coord.lat
        var lon = response.coord.lon
        var UVquery = UVurl + api + "&lat=" + lat + "&lon=" + lon;
        
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
        // var UVquery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + api + "&lat=" + cityLat + "&lon=" + cityLon;

    })

    var forecastQuery = forecastUrl + city + forecastUnits + forecastAPI + api

    $.ajax({
        url: forecastQuery,
        method:"GET"
    }).then(function(response) {
        console.log(response)
        // for ( var i =0; i<5; i++) {

            var cardElement = $("<div class=card>")
            cardElement.appendTo("#days");
            
            var cardTitle = $("<div class=card-title>")
            var day = moment().add(0, "days").format("l")
            // cardTitle.text(day)
            // cardTitle.appendTo(cardElement)

            $("#day1").text(day)

            var cardBody = $("<div class=card-body>")

            var iconCast = response.list[0].weather[0].icon
            var pIcon = $("<img>").attr("src",  'https://openweathermap.org/img/w/' + iconCast + '.png').attr("alt", "icon representing current weather")
            pIcon.appendTo(cardBody)

            $("#icon1").attr("src",  'https://openweathermap.org/img/w/' + iconCast + '.png').attr("alt", "icon representing current weather")

            var tempCast = response.list[0].main.temp
            var pTemp = $("<p>" + "Temperature: " + tempCast + "</p>")
            pTemp.appendTo(cardBody)
        
            var humidCast= response.list[0].main.humidity
            var pHumid = $("<p>" + "Humidty: " + humidCast + "%" + "</p>")
            pHumid.appendTo(cardBody)
            
            var windCast = response.list[0].wind.speed
            var pWind = $("<p>" + "Wind speed: " + windCast + "</p>")
            pWind.appendTo(cardBody)

            cardBody.appendTo(cardElement)
    
            // }
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
    $("#cities").empty();

    for (var i = 0; i < cities.length; i++) {
        
        var selectedCities = $("<button>")
        selectedCities.addClass("selectedCities")
        selectedCities.attr("data-name", cities[i])
        selectedCities.text(cities[i])
        $("#cities").prepend(selectedCities)
    }

}

$("#city-submit").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var city = $("#city-input").val().trim();
    // The movie from the textbox is then added to our array
    cities.push(city);

    localStorage.setItem("cities", JSON.stringify(cities));
    // calling renderButtons which handles the processing of our movie array
    displayWeatherResults();
    renderCities();
  });

  $(document).on("click", ".selectedCities", displayWeatherResults);

  renderCities();


