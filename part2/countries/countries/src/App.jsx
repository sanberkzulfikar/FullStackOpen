import { useEffect, useState } from "react";
import axios, { all } from "axios";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <input value={searchValue} onChange={handleChange}></input>
      {countries[0]}
    </div>
  );
};

export default App;
