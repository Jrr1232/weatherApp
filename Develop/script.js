var city;


function getApi() {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fe8147776c65b4759543702231439089`)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            for (var i = 0; i <= 32; i += 8) {




                var array = data.list[1].dt_txt.split(" ")

                var dateFormatted = array[0]




                var weatherIcon = data.list[1].weather[0].icon
                var name = city + " " + "(" + dateFormatted + ")";
                var humidity = data.list[1].main.humidity
                var windSpeed = Math.round(data.list[1].wind.speed * 100) / 100
                // populate 5-day forcast div by looping
                // set innerHTML of the 5 cards to each of these values
                weekOutlook("card-1", 1)
                weekOutlook("card-2", 9)
                weekOutlook("card-3", 17)
                weekOutlook("card-4", 25)
                weekOutlook("card-5", 33)


                // Testing


                // console.log("Time is: ", data.list[i].dt_txt);
                // console.log("Temperature is: ", data.list[i].main.temp + "F");
                // console.log("Humidity is: ", data.list[i].main.humidity);
                // console.log("Wind speed is :", parseInt(data.list[i].wind.speed));
                // console.log(data);
                // console.log(data.list[0].dt_txt)

                var farenheit = (parseInt((data.list[0].main.temp - 273.15) * 9 / 5 + 32))
                setHTML(name, farenheit, humidity, windSpeed, weatherIcon);

                function weekOutlook(card, y) {

                    var date = new Date(data.list[y].dt_txt)
                    var dateFormatted = date.toString()
                    var array = dateFormatted.split("18")
                    console.log(array)
                    var day = array[0]


                    var weatherIcon = data.list[y].weather[0].icon
                    document.getElementById(card).children[1].innerHTML = `<img src="Develop/icons/${weatherIcon}.png">`

                    Math.round(data.list[0].wind.speed * 100) / 100
                    document.getElementById(card).children[0].innerHTML = "<h2><b>" + day + "</b></h2>"
                    document.getElementById(card).children[2].innerHTML = "<h4><b>" + "Temp:" + " " + Math.round(((data.list[y].main.temp - 273.15) * 9 / 5 + 32) * 100) / 100 + " " + "F°" + "</b ></h4 > "
                    document.getElementById(card).children[3].innerHTML = "<h4><b>" + "Humidity: " + data.list[y].main.humidity + "%" + "</b ></h4 > "
                    document.getElementById(card).children[4].innerHTML = "<h4><b>" + "Wind:" + " " + Math.round(data.list[y].wind.speed * 100) / 100 + " " + "MPH" + "</b></h4>"

                    // document.getElementById(card).children[1].innerHTML = `<img src="Develop/icons/${icon}.png">`
                }



            }

        });

}

// function weekOutlook(card) {

//     var test = document.getElementById(card).children[0].innerHTML;
//     console.log(test)
//     document.getElementById(card).children[0].innerHTML = "<h2><b>" + name + "</b></h2>"
//     document.getElementById(card).children[2].innerHTML = "<h4><b>" + "Temp:" + " " + temp + " " + "F°" + "</b></h4>"
//     document.getElementById(card).children[3].innerHTML = "<h4><b>" + "Humidity: " + humidity + "%" + "</b ></h4 > "
//     document.getElementById(card).children[4].innerHTML = "<h4><b>" + "Wind:" + " " + speed + " " + "MPH" + "</b></h4>"
//     document.getElementById(card).children[1].innerHTML = `<img src="Develop/icons/${icon}.png">`
// }
// weekOutlook("card-1")


function setHTML(name, temp, humidity, speed, icon) {
    document.getElementById("city-name").innerHTML = "<h2><b>" + name + "</b></h2>"
    document.getElementById("city-temp").innerHTML = "<h4><b>" + "Temp:" + " " + temp + " " + "F°" + "</b></h4>"
    document.getElementById("city-humidity").innerHTML = "<h4><b>" + "Humidity: " + humidity + "%" + "</b ></h4 > "
    document.getElementById("wind-speed").innerHTML = "<h4><b>" + "Wind:" + " " + speed + " " + "MPH" + "</b></h4>"
    document.getElementById("weather-icon").innerHTML = `<img src="Develop/icons/${icon}.png">`




}
var buttons = document.querySelectorAll('.cityButton');
buttons.forEach(button => {
    button.addEventListener('click', function setApi() {
        city = this.innerText;



        getApi()

    }
    )
})
var searchButton = document.getElementById("search")
searchButton.addEventListener('click', () => {

    var inputCity = document.getElementById("form").value;
    city = inputCity
    getApi();

}

)

