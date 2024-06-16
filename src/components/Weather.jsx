import React, {useEffect, useRef, useState} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import sun_icon from '../assets/sun.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

const Weather = () => {
    const inputRef = useRef()

    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
    }

    const [weatherData, setWeatherData] = useState(false);
    const search = async(city) => {
        if (city === ''){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9bae3febadb0779dd5f0688e0ffdbd6b`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location : data.name,
                icon : icon,
            })
        } catch(error){

        }
    }

useEffect(() => {
    search();
},[])

  return (
    <div className='main'>
        <div className='weather'>
        <h1 className='head1'>Weather</h1>
        <div className='search-bar'>
            <input id='input' ref={inputRef} type='text' placeholder='search' />
            <img  src={search_icon} alt='search' onClick={() => search(inputRef.current.value)}/>
        </div>
            <img src={sun_icon} alt='cloud' />
            <p className='text'>{weatherData.temperature}°C</p>
            <p>{weatherData.location}</p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity_icon} alt="humidity" />
                    <div>
                        <p className='text'>{weatherData.humidity}</p>
                        <span className='hum'>Humidity</span>
                    </div>
                    <img src={wind_icon} alt="humidity" />
                    <div>
                        <p>{weatherData.windSpeed}</p>
                        <span className='win'>Wind</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
