import React from "react";
import Country from "./Country";
const Countries = ({ countries, newFilter, setNewFilter}) => {
  const filter = countries.filter((country) => {
    return country.name.toLowerCase().includes(newFilter.toLowerCase());
  });
  if (filter.length === 1) {
    return (
      <div>
        {filter.map((country) => (
          <Country key={country.name} country={country} />
        ))}
      </div>
    );
  } else if (filter.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <div>
        {filter.map((country) => (
          <div key={country.name}>
            <p>{country.name}</p>
            <button onClick={() => setNewFilter(country.name)}>show</button>
          </div>
        ))}
      </div>
    );
  }
};

export default Countries;
