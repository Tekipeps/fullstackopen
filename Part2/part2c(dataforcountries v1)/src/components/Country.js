import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [newWeather, setNewWeather] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`;

  useEffect(() => {
    axios.get(URL).then((response) => {
      setNewWeather(response.data);
    });
  }, [URL]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width={70}></img>
      <Weather newWeather={newWeather} />
    </div>
  );
};

export default Country;
