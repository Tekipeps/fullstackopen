import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from './components/Countries'

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <Countries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter}/>
    </div>
  );
};

export default App;
