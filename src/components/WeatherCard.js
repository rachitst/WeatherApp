import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "../apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import FiveDayForecast from "./FiveDayForecast";

function WeatherCard(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const handleSearch = () => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          query !== "[object Object]" ? query : ""
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        setError("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        if (query !== "") {
          setError({ message: "Not Found", query: query });
        }
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };
  useEffect(() => {
    handleSearch("delhi");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <div className="title">
          <h3>{props.weather}</h3>
        </div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={handleSearch}
              alt=""
            />
          </div>
        </div>
        <ul className="forebox">
          {typeof weather.main != "undefined" ? (
            <div>
              <br></br>{" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt=""
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{"  "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
              <br></br>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
      <div className="title">
        <h4>5-Day Forecast for : {weather.name}</h4>
      </div>
      <div className="fiveday">
        {typeof weather.main !== "undefined" && (
          <FiveDayForecast cityName={weather.name} />
        )}
      </div>
      <br />
      <br />
    </div>
  );
}
export default WeatherCard;
