import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({
    temperature: "",
    wind: "",
    icon: "",
  });

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch countries, please try again later.");
      });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const city = countriesToShow[0].capital[0];
      weatherData(city);
    }
  }, [countriesToShow]);

  const weatherData = (city) => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no
    `
      )
      .then((response) => {
        const temperature = response.data.current.temp_c;
        const wind = response.data.current.wind_kph;
        const icon = response.data.current.condition.icon;
        setWeather({ temperature: temperature, wind: wind, icon: icon });
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = (countryName) => {
    setInputValue(countryName);
  };

  return (
    <div>
      <label htmlFor="country">find countries: </label>
      <input value={inputValue} onChange={handleChange} id="country" />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {countriesToShow.length > 10 && inputValue ? (
          <p>Too many matches, specify another filter</p>
        ) : countriesToShow.length === 1 && inputValue ? (
          <div>
            <h1>{countriesToShow[0].name.common}</h1>
            <p>
              capital {countriesToShow[0].capital[0]}
              <br />
              area {countriesToShow[0].area}
            </p>
            <h2>languages: </h2>
            <ul>
              {Object.values(countriesToShow[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <p>
              <img
                src={countriesToShow[0].flags.png}
                alt={countriesToShow[0].flags.alt}
              />
            </p>
            <h2>Weather in {countriesToShow[0].capital[0]}</h2>
            <p>temperature: {weather.temperature} Celcius</p>
            <p>
              <img src={weather.icon} alt="weather icon" />
            </p>
            <p>wind: {weather.wind} km/h</p>
          </div>
        ) : inputValue ? (
          <ul>
            {countriesToShow.map((country) => (
              <li key={country.name.official}>
                {country.name.common}{" "}
                <button onClick={() => handleClick(country.name.common)}>
                  show
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default App;
