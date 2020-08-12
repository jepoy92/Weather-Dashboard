const Testurl = "https://api.openweathermap.org/data/2.5/weather?q=seattle&units=imperial&appid=8ffb62dfa9631cd0e94104bfe1a49201"

const forecast = "https://api.openweathermap.org/data/2.5/forecast?id=5809844&appid=8ffb62dfa9631cd0e94104bfe1a49201"

const UV = "http://api.openweathermap.org/data/2.5/uvi?appid=8ffb62dfa9631cd0e94104bfe1a49201&lat=47.61&lon=-122.33"

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?id="
const forecastUnit = "&units=imperial&appid="

const UVurl = "http://api.openweathermap.org/data/2.5/uvi?appid="


const oneCall = "https://api.openweathermap.org/data/2.5/onecall?
const lat = "lat="
const long = "&lon="
const hourly = "&exclude=hourly,daily&appid="

const url = "https://api.openweathermap.org/data/2.5/weather?q="
const units = "&units=imperial&appid="
const api = "8ffb62dfa9631cd0e94104bfe1a49201"

var citytext = $("#city-input")
var submitBtn = $("#city-submit")
var cities = []

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
        
        $("#humid").text("Humidity: " + humidity)
        
        $("#wSpeed").text("Wind Speed: " + wind)
        
        $("#wIcon").attr( "src", 'https://openweathermap.org/img/w/' + icon + '.png')

    })

    // $.ajax({
    //     url:UVurl,
    //     method: "GET"
    // }).then(function(response) {
    //     var longR = response.coord.lon 
    //     var latR = response.coord.lat

    // //     console.log(longR);
        

    // })
}

function displayUV () {
    $.ajax({
        url:UVur,
        method: "GET"
    }).then(function(response) {
        var uvI = response.value 
        $("#uv").text(uvI)

})}

fetch(UV).then(res => {
     return res.json();
}).then(function(res) {
    console.log(res);
});



function renderCities () {
    $("#cities").empty();

    for (var i = 0; i < cities.length; i++) {
        
        var selectedCities = $("<button>")
        selectedCities.addClass("selectedCities")
        selectedCities.attr("data-name", cities[i])
        selectedCities.text(cities[i])
        $("#cities").prepend(selectedCities)
        localStorage.setItem("cities", cities[i])
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

    localStorage.setItem("cities", city)
    // calling renderButtons which handles the processing of our movie array
    displayWeatherResults();
    renderCities();
  });

  $(document).on("click", ".selectedCities", displayWeatherResults);

  renderCities();


