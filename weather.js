import axios from "axios"

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&current=wind_speed_10m,temperature_2m,relative_humidity_2m,weather_code&timezone=Europe%2FBerlin&timeformat=unixtime

export function getWeather(lat, lot, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&current=wind_speed_10m,temperature_2m,relative_humidity_2m,weather_code&timezone=Europe%2FBerlin&timeformat=unixtime", 
        {
            params: {
                latitude: lat, 
                longitude: lon,
                timezone
            },
        }
    )


}