fetchData();

async function fetchData(){
    try{
        const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_gusts_10m,wind_speed_10m&timezone=Europe%2FBerlin&forecast_days=3&timeformat=unixtime");
        
        if(!response.ok){ 
            throw new Error ("Could not fetch resource"); // if the response not okay => error
        }
    
        const data = await response.json();

        const timestamp = data.current.time; // e.g. 1693000000
        const date = new Date(timestamp * 1000); // convert seconds → ms
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
        const year = String(date.getFullYear()).slice(-2);
        document.getElementById("time").innerHTML  = hours + ":" + minutes + ", " + day + "." + month + "." + year;  
        //ChatGPT retten einfax Leben xd 
       
        document.getElementById("temperature").innerHTML = data.current.temperature_2m.toFixed(0) ;
        document.getElementById("temperatureUnit").innerHTML = data.current_units.temperature_2m;
        document.getElementById("apparentTemperature").innerHTML = data.current.apparent_temperature.toFixed(0);
        document.getElementById("apparentTemperatureUnit").innerHTML = data.current_units.apparent_temperature;
        document.getElementById("wind").innerHTML  = data.current.wind_speed_10m.toFixed(0);
        document.getElementById("windUnit").innerHTML  = data.current_units.wind_speed_10m;
        document.getElementById("windGust").innerHTML  = data.current.wind_gusts_10m.toFixed(0);
        document.getElementById("windGustUnit").innerHTML  = data.current_units.wind_gusts_10m;
        document.getElementById("precipitation").innerHTML  = data.current.precipitation;
        document.getElementById("precipitationUnit").innerHTML  = data.current_units.precipitation;
        document.getElementById("humidity").innerHTML  = data.current.relative_humidity_2m.toFixed(0);
        document.getElementById("humidityUnit").innerHTML  = data.current_units.relative_humidity_2m;

        const iconWeather = data.current.weather_code;

        if ([0, 1].includes(iconWeather)) { 
            const dayNight = data.current.is_day; 

            if (dayNight == 1){
                document.getElementById("iconWeather").src = "img/01d.png";
            }
            else if (dayNight == 0) {
              document.getElementById("iconWeather").src = "img/01n.png";  
            }
            else{
                alert("Error bei Anzeige des Icons")
            }
        }
        else if ([2, 3].includes(iconWeather)) {
            document.getElementById("iconWeather").src = "img/02.png";       
        }
        else if ([45, 48].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/45.png";       
        }
        else if ([51, 53, 55, ].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/51.png";        
        }
        else if ([61, 63, 65, 80, 81, 82].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/45.png";       
        }
        else if ([57, 66, 67].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/66.png";        
        } 
        else if ([71, 73, 75, 77].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/45.png";        
        }
        else if ([85,86 ].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/85.png";         
        }
        else if ([95].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/95.png";         
        }
        else if ([96, 99].includes(iconWeather)){
            document.getElementById("iconWeather").src = "img/96.png";     
        }
        else{
            alert("Error bei Anzeige des Icons")
        }
    }

    catch(error){
        console.error(error)
    }

}