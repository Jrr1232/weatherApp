var city;
var pastCities = []

// function for local storage 
// capture value from form and save to local storage

function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

function cityHistory() {
    var pastCity = document.getElementById("form").value



    var retString = localStorage.getItem("key");
    var retArray = retString ? JSON.parse(retString) : [];

    if (pastCity !== "") {
        pastCities.push(pastCity);
        var string = JSON.stringify(pastCities.concat(retArray)); // Combine new city with existing data
        localStorage.setItem("key", string);
    }

    var array3 = arrayUnique(pastCities.concat(pastCity))
    console.log(array3)



    newArray = [...new Set(retArray)]
    console.log(newArray)

    var button1 = document.getElementById("button1");
    if (button1.innerText === "") {
        button1.innerText = array3.length >= 1 ? array3[0] : "";
    }

    var button2 = document.getElementById("button2");
    if (button2.innerText === "") {
        button2.innerText = array3.length >= 2 ? array3[1] : "";
    }

    var button3 = document.getElementById("button3");
    if (button3.innerText === "") {
        button3.innerText = array3.length >= 3 ? array3[2] : "";
    }

    var button4 = document.getElementById("button4");
    if (button4.innerText === "") {
        button4.innerText = array3.length >= 4 ? array3[3] : "";
    }

    var button5 = document.getElementById("button5");
    if (button5.innerText === "") {
        button5.innerText = array3.length >= 5 ? array3[4] : "";
    }

    var button6 = document.getElementById("button6");
    if (button6.innerText === "") {
        button6.innerText = array3.length >= 6 ? array3[5] : "";
    }

    var button7 = document.getElementById("button7");
    if (button7.innerText === "") {
        button7.innerText = array3.length >= 7 ? array3[6] : "";
    }

    var button8 = document.getElementById("button8");
    if (button8.innerText === "") {
        button8.innerText = array3.length >= 8 ? array3[7] : "";
    }
}




function display() {
    var retString = localStorage.getItem("key")
    var retArray = JSON.parse(retString)
    newArray = [...new Set(retArray)]
    document.getElementById("button1").innerText = newArray.length >= 1 ? newArray[0] : "";
    document.getElementById("button2").innerText = newArray.length >= 2 ? newArray[1] : "";
    document.getElementById("button3").innerText = newArray.length >= 3 ? newArray[2] : "";
    document.getElementById("button4").innerText = newArray.length >= 4 ? newArray[3] : "";
    document.getElementById("button5").innerText = newArray.length >= 5 ? newArray[4] : "";
    document.getElementById("button6").innerText = newArray.length >= 6 ? newArray[5] : "";
    document.getElementById("button7").innerText = newArray.length >= 7 ? newArray[6] : "";
    document.getElementById("button8").innerText = newArray.length >= 8 ? newArray[7] : "";

}
// retrieve it from local storage
// set the innertext of citybutton to local storage 

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
                    var delimiter = ' '

                    var tokens = dateFormatted.split(delimiter).slice(0, 4)
                    result2 = tokens.join(delimiter);
                    // console.log(result2)



                    var weatherIcon = data.list[y].weather[0].icon
                    document.getElementById(card).children[1].innerHTML = `<img src="Develop/icons/${weatherIcon}.png">`

                    Math.round(data.list[0].wind.speed * 100) / 100
                    document.getElementById(card).children[0].innerHTML = "<h2><b>" + result2 + "</b></h2>"
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

        document.getElementById("forecast-header").innerHTML = "<h2>5-Day Forecast: </h2>"



        getApi()


    }
    )
})
var searchButton = document.getElementById("search")
searchButton.addEventListener('click', () => {
    document.getElementById("forecast-header").innerHTML = "<h2>5-Day Forecast: </h2>"
    var inputCity = document.getElementById("form").value;
    city = inputCity
    getApi();
    cityHistory()


}

)
display()

