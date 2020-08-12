function renderWeather(response) {
    // var cityName = $('#search-input').val();
    var cityName = response.name;
    // Display city name, date, & weather icon
    $('#city-output').text(cityName + " (" + moment().format('M/D/YYYY) '));
    $('#wicon').attr('src', 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png');

    // Display the current temperature
    $('#temp-output').text('Temperature: ' + response.main.temp + String.fromCharCode(176) + "F");
    // Display current humidity
    $('#humidity-output').text('Humidity: ' + response.main.humidity + '%');
    // Display current windspeed
    $('#wind-output').text('Wind Speed: ' + response.wind.speed + ' MPH');

    // Get the lat & lon values
    var cityLat  = response.coord.lat;
    var cityLon  = response.coord.lon;

    // Building query URL to retrieve UV Index based on city searched
    var queryUVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLon;

    $.ajax({
        url: queryUVURL,
        method: "GET",
    }).then(function (response) {
        var uvIndex = response.value;
        var uvOutput = $('#uv-output')
        uvOutput.text(uvIndex);
        // Change background color based on UV Index
        if (uvIndex < 3) {
            uvOutput.attr('style', 'background-color: green; color: white;');
        } else if (uvIndex < 6) {
            uvOutput.attr('style', 'background-color: yellow;');
        } else if (uvIndex < 8) {
            uvOutput.attr('style', 'background-color: orange;');
        } else if (uvIndex < 11) {
            uvOutput.attr('style', 'background-color: red; color: white;');
        } else {
            uvOutput.attr('style', 'background-color: purple; color: white;');
        }
    });

    // renderForecast();
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
    $('#forecast').empty();
    $.ajax({
        url: forecastURL,
        method: "GET",
    }).then(function (response) {
        var nextForecast = response.list;
        renderForecast(nextForecast);
    });
}