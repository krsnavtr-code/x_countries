import React, { useState, useEffect } from "react";

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
    <div className="app">
      {error && <p>Error: {error}</p>}
      <div className="countries">
        {countries.map((country) => (
          <Country
            key={country.name.common}
            name={country.name.common}
            flag={country.flags[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryFlag;
