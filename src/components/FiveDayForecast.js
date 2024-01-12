import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "../apiKeys";

function FiveDayForecast({ cityName }) {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `${apiKeys.base}forecast?q=${cityName}&units=metric&APPID=${apiKeys.key}`
        );

        const filteredForecast = response.data.list.filter(
          (item, index) => index % 8 === 0
        );

        setForecast(filteredForecast);
        setError("");
      } catch (error) {
        console.log(error);
        setForecast([]);
        setError({ message: "Not Found", query: cityName });
      }
    };

    fetchForecast();
  }, [cityName]);

  return (
    <>
      <div className="forecast">
        <div className="horizontal-forecast">
          {forecast.length > 0 ? (
            forecast.map((item, index) => (
              <div key={index} className="forecast-item">
                <br />
                <p>{item.dt_txt}</p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt=""
                />
                <p>
                  {Math.round(item.main.temp)}°c ({item.weather[0].main})
                </p>
              </div>
            ))
          ) : (
            <p>
              {error.query} {error.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default FiveDayForecast;
