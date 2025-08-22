async function fetchData(){
    try{
        const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code&timezone=Europe%2FBerlin&forecast_days=1");
        
        if(!response.ok){ 
            throw new Error ("Could not fetch resource");
        }
        // if the response not okay => error
        
        const data = await response.json();
        console.log(data);
    }

    catch(error){
        console.error(error)
    }

}
