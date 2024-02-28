import React, { useState, useEffect } from "react";
import style from "./CountryFlag.module.css";

const Country = ({ name, flag }) => (
  <div className="country">
    <img src={flag} alt={`Flag of ${name}`} />
    <p>{name}</p>
  </div>
);
const CountryFlag = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div className={style.container}>
        {countries.map((country) => (
          <div key={country.name.common} className={style.card}>
            <img
              src={country.flags.png}
              alt={country.flags.alt}
              className={style.flag}
            />
            <h4>{country.name.common}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryFlag;
