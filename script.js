async function fetchData(){
    try{
        const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code&timezone=Europe%2FBerlin&forecast_days=1&timeformat=unixtime");
        
        if(!response.ok){ 
            throw new Error ("Could not fetch resource");
        }
        // if the response not okay => error
        
        const data = await response.json();
        console.log(data)


        const timestamp = data.current.time; // e.g. 1693000000
        const date = new Date(timestamp * 1000); // convert seconds → ms
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
        const year = String(date.getFullYear()).slice(-2);
        //ChatGPT retten einfax Leben xd
 

        document.getElementById("time").innerHTML  = hours + ":" + minutes + ", " + day + "." + month + "." + year;

        document.getElementById("temperature").innerHTML = data.current.temperature_2m;
        document.getElementById("temperatureUnit").innerHTML = data.current_units.temperature_2m;

        document.getElementById("iconWeather").innerHTML  = data.current.weather_code;

        document.getElementById("apparentTemperature").innerHTML = data.current.apparent_temperature;
        document.getElementById("apparentTemperatureUnit").innerHTML = data.current_units.apparent_temperature;

        document.getElementById("wind").innerHTML  = data.current.wind_speed_10m;
        document.getElementById("windUnit").innerHTML  = data.current_units.wind_speed_10m;

        document.getElementById("precipitation").innerHTML  = data.current.precipitation;
        document.getElementById("precipitationUnit").innerHTML  = data.current_units.precipitation;

        document.getElementById("humidity").innerHTML  = data.current.relative_humidity_2m;
        document.getElementById("humidityUnit").innerHTML  = data.current_units.relative_humidity_2m;

    }

    catch(error){
        console.error(error)
    }

}

fetchData();


/*
        const temperature = data.current.temperature_2m;
        const apparentTemperature = data.current.apparent_temperature;
        const precipitation = data.current.precipitation;
        const humidity = data.current.relative_humidity_2m;
        const time = data.current.time;
        const weatherCode = data.current.weather_code;
        const wind = data.current.wind_speed_10m;

        console.log(temperature + " " + apparentTemperature + " " + precipitation + " " + humidity + " " + time + " " + weatherCode + " " + wind)
        */