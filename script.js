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

        if (iconWeather == 0 || iconWeather == 1) { 
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
        else if (iconWeather == 2 || iconWeather == 3) {
            document.getElementById("iconWeather").src = "img/02.png";       
        }
        else if (iconWeather == 45 || iconWeather == 48){
            document.getElementById("iconWeather").src = "img/45.png";       
        }
        else if (iconWeather == 51 || iconWeather == 53|| iconWeather == 55){
            document.getElementById("iconWeather").src = "img/51.png";        
        }
        else if (iconWeather == 61 || iconWeather == 63|| iconWeather == 65 || iconWeather == 80 || iconWeather == 81|| iconWeather == 82){
            document.getElementById("iconWeather").src = "img/45.png";       
        }
        else if (iconWeather == 57 || iconWeather == 66|| iconWeather == 67){
            document.getElementById("iconWeather").src = "img/66.png";        
        } 
        else if (iconWeather == 71 || iconWeather == 73|| iconWeather == 75 || iconWeather == 77){
            document.getElementById("iconWeather").src = "img/45.png";        
        }
        else if (iconWeather == 85 || iconWeather == 86){
            document.getElementById("iconWeather").src = "img/85.png";         
        }
        else if (iconWeather == 95){
            document.getElementById("iconWeather").src = "img/95.png";         
        }
        else if (iconWeather == 96 || iconWeather == 99){
            document.getElementById("iconWeather").src = "img/96.png";     
        }
        else{
            alert("Error, kein passendes Icon verfügbar")
        }
    }

    catch(error){
        console.error(error)
    }

}