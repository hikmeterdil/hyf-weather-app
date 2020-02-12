import React from "react";
import { Link } from "react-router-dom";

export default function Weather({ city, removeCity }) {
  return (
    <div className="weather-cont">
      <div className="weather">
        <Link to={"/" + city.id}>5 Days Forecast</Link>
        <h2 className="name" key={city.sys.id}>
          {city.name}, {city.sys.country}
        </h2>
        <h3 className="condition">{city.weather[0].main}</h3>
        <p className="condition">{city.weather[0].description}</p>
        <p className="para">min-temp: {city.main.temp_min}</p>
        <p className="para">max-temp: {city.main.temp_max}</p>
        <p className="para">
          location: {city.coord.lon}, {city.coord.lat}
        </p>
        <button onClick={() => removeCity(city.id)}>Remove</button>
      </div>
    </div>
  );
}
