import React, { useState } from "react";

export default function Search({
  setHasError,
  setIsLoading,
  setSearchHistory
}) {
  const [cityName, setCityName] = useState("");

  function fetchData() {
    setIsLoading(true);
    setHasError(false);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d8ecce8bfd1e439e197b78060887efc9`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then(data => {
        setSearchHistory(currentCities => [data, ...currentCities]);
        setIsLoading(false);
        setHasError(false);
      })
      .catch(err => {
        setHasError(true);
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search a city"
        value={cityName}
        onChange={e => setCityName(e.target.value)}
      />
      <button onClick={fetchData}>Search</button>
    </div>
  );
}
