fetchDataCurrentWeather("https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_gusts_10m,wind_speed_10m&timezone=Europe%2FBerlin&forecast_days=3&timeformat=unixtime");

function overlaySearchResults() {
    document.getElementById("weather").style.display = "none";
    document.getElementById("searchResults").style.display = "block";
}

function overlayWeatherElements() {
    document.getElementById("weather").style.display = "block";
    document.getElementById("searchResults").style.display = "none";
}

function setWeatherIcon(iconWeather, isDay) {
    if (iconWeather == 0 || iconWeather == 1) {

        if (isDay == 1) {
            document.getElementById("iconWeather").src = "img/01d.png";
        }
        else if (isDay == 0) {
            document.getElementById("iconWeather").src = "img/01n.png";
        }
        else {
            console.error(error)
        }
    }
    else if (iconWeather == 2 || iconWeather == 3) {
        document.getElementById("iconWeather").src = "img/02.png";
    }
    else if (iconWeather == 45 || iconWeather == 48) {
        document.getElementById("iconWeather").src = "img/45.png";
    }
    else if (iconWeather == 51 || iconWeather == 53 || iconWeather == 55) {
        document.getElementById("iconWeather").src = "img/51.png";
    }
    else if (iconWeather == 61 || iconWeather == 63 || iconWeather == 65 || iconWeather == 80 || iconWeather == 81 || iconWeather == 82) {
        document.getElementById("iconWeather").src = "img/45.png";
    }
    else if (iconWeather == 57 || iconWeather == 66 || iconWeather == 67) {
        document.getElementById("iconWeather").src = "img/66.png";
    }
    else if (iconWeather == 71 || iconWeather == 73 || iconWeather == 75 || iconWeather == 77) {
        document.getElementById("iconWeather").src = "img/45.png";
    }
    else if (iconWeather == 85 || iconWeather == 86) {
        document.getElementById("iconWeather").src = "img/85.png";
    }
    else if (iconWeather == 95) {
        document.getElementById("iconWeather").src = "img/95.png";
    }
    else if (iconWeather == 96 || iconWeather == 99) {
        document.getElementById("iconWeather").src = "img/96.png";
    }
    else {
        console.error(error)
    }

}

function setColorTheme(isDay) {
    if (isDay == 0) {
        const body = document.getElementById("body");
        body.style.backgroundColor = "#2d2f61";

        const weather = document.getElementById("app");
        weather.style.backgroundColor = "#ffffffb7";


        for (let i = 0; i <= 9; i++) {
            const cityCountry = document.getElementById("cityCountry" + i);
            if (cityCountry) {
                cityCountry.style.backgroundColor = "#2d2f6163";
            }
        }

        for (let i = 1; i <= 4; i++) {
            const more = document.getElementById("more" + i);
            if (more) {
                more.style.backgroundColor = "#2d2f6163";
            }
        }
        const inputSearch = document.getElementById("inputSearch");
        inputSearch.style.backgroundColor = "#2d2f6163";

        const btn1 = document.getElementById("btn1");
        btn1.style.backgroundColor = "#2d2f6163";
    }
    else if (isDay == 1) {
        const body = document.getElementById("body");
        body.style.backgroundColor = "#7ddaff";

        const weather = document.getElementById("app");
        weather.style.backgroundColor = "#ffffff9c";

        for (let i = 0; i <= 9; i++) {
            const cityCountry = document.getElementById("cityCountry" + i);
            if (cityCountry) {
                cityCountry.style.backgroundColor = "#7ddaff6f";
            }
        }

        const inputSearch = document.getElementById("inputSearch");
        inputSearch.style.backgroundColor = " #7ddaff6f";

        const btn1 = document.getElementById("btn1");
        btn1.style.backgroundColor = " #7ddaff6f";


        for (let i = 1; i <= 4; i++) {
            const more = document.getElementById("more" + i);
            if (more) {
                more.style.backgroundColor = "#7ddaff6f";
            }
        }
    }
    else {
        console.error(error)
    }

}

function unixToTime(timestamp) {
    const date = new Date(timestamp * 1000); // convert seconds → ms
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
    const year = String(date.getFullYear()).slice(-2);
    document.getElementById("time").innerHTML = hours + ":" + minutes + ", " + day + "." + month + "." + year;
    //ChatGPT retten einfax Leben xd 
}

function btn1() {
    const input = document.getElementById("inputSearch");
    if (input.value.trim() === "") {
        alert("Bitte Stadt eingeben!");
        console.error(error);
    } else {
        fetchDataCity();
    }
}

async function fetchDataCurrentWeather(weatherApiLink) {
    try {
        const response = await fetch(weatherApiLink);

        if (!response.ok) {
            throw new Error("Could not fetch resource"); // if the response not okay => error
        }
        overlayWeatherElements();

        const data = await response.json();

        setColorTheme(data.current.is_day);
        setWeatherIcon(data.current.weather_code, data.current.is_day);
        unixToTime(data.current.time);

        document.getElementById("temperature").innerHTML = data.current.temperature_2m.toFixed(0);
        document.getElementById("temperatureUnit").innerHTML = data.current_units.temperature_2m;
        document.getElementById("apparentTemperature").innerHTML = data.current.apparent_temperature.toFixed(0);
        document.getElementById("apparentTemperatureUnit").innerHTML = data.current_units.apparent_temperature;
        document.getElementById("wind").innerHTML = data.current.wind_speed_10m.toFixed(0);
        document.getElementById("windUnit").innerHTML = data.current_units.wind_speed_10m;
        document.getElementById("windGust").innerHTML = data.current.wind_gusts_10m.toFixed(0);
        document.getElementById("windGustUnit").innerHTML = data.current_units.wind_gusts_10m;
        document.getElementById("precipitation").innerHTML = data.current.precipitation;
        document.getElementById("precipitationUnit").innerHTML = data.current_units.precipitation;
        document.getElementById("humidity").innerHTML = data.current.relative_humidity_2m.toFixed(0);
        document.getElementById("humidityUnit").innerHTML = data.current_units.relative_humidity_2m;
    }

    catch (error) {
        console.error(error)
    }

}

async function fetchDataCity() {
    for (let i = 0; i < 10; i++) {
        document.getElementById("cityCountry" + i).style.display = "grid"
    }

    const city = document.getElementById("inputSearch").value;
    const cityApiLink = "https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=10&language=de&format=json";

    try {
        const response = await fetch(cityApiLink);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        if (!data.results || !Array.isArray(data.results)) {
            // "results" array is missing or not an array
              alert("Es sind keine Wetterdaten zu Ihrer Suche vorhanden! Bitte kontrollieren Sie, ob Ihre Eingabe richtig war, oder versuchen Sie es mit einer anderen Stadt.")
        }
        else {
            overlaySearchResults();

            for (let i = 0; i < 10; i++) {
                if (data.results[i]) {
                    document.getElementById("cityName" + i).innerHTML = data.results[i].name + " (" + data.results[i].admin1 + "), " + data.results[i].country;
                } else {
                    document.getElementById("cityCountry" + i).style.display = "none"
                }


            }
        }


    }

    catch (error) {
        console.error(error)
    }


}

async function chooseCity(n) {
    const city = document.getElementById("inputSearch").value;
    const cityApiLink = "https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=10&language=de&format=json";

    try {
        const response = await fetch(cityApiLink);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        fetchDataCurrentWeather("https://api.open-meteo.com/v1/forecast?latitude=" + data.results[n].latitude + "&longitude=" + data.results[n].longitude + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_gusts_10m,wind_speed_10m&timezone=auto&forecast_days=3&timeformat=unixtime");
    }

    catch (error) {
        console.error(error)
    }


}