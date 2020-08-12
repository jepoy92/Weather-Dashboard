console.log("Helko world!");

var url = "https://api.openweathermap.org/data/2.5/weather?q=seattle&units=imperial&appid=97e1348e87bfbee5fd6bae1ca77e4dfa"

fetch(url).then(res => {
     return res.json();
}).then(function(res) {
    console.log(res);
});