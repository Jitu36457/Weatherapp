import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "99b89c6eca6cc4cc543aa7c0a4549ec9";

  const fetchWeather = async () => {

    if (!city) {
      setError("Please enter city name");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'99b89c6eca6cc4cc543aa7c0a4549ec9'}&units=metric`
      );

      setWeather(response.data);
      setError("");

    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">

      <h1>Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">

          <h2>{weather.name}, {weather.sys.country}</h2>

         

          <h3>{weather.main.temp} °C</h3>
          <p>{weather.weather[0].description}</p>

          <div className="extra-info">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
          </div>

        </div>
      )}

    </div>
  );
}