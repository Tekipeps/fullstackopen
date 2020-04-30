import React from "react";

const Weather = ({ newWeather }) => {
  if (newWeather) {
    return (
      <div>
        <h2>weather in {newWeather.location.name}</h2>
        <p>
          <strong>temperature: </strong>
        </p>
        <img
          src={newWeather.current.weather_icons[0]}
          alt={"weather icon"}
        ></img>
        <p>
          {newWeather.current.temperature}
          <strong>wind: </strong>
          {newWeather.current.wind_speed} mph direction{" "}
          {newWeather.current.wind_dir}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default Weather;
