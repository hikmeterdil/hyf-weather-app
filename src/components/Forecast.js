import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function Forecast() {
  const [forecastData, setForecastData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();
  const URL = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=d8ecce8bfd1e439e197b78060887efc9`;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setForecastData(data);
        setIsLoading(false);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  },[URL]);

  return (
    <div>
      <Link to="/">GO HOME YANKEES</Link>
      {hasError && <p>An error happened!</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AreaChart
          width={700}
          height={400}
          data={forecastData.list}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt_txt" />
          <YAxis dataKey="main.temp" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="main.temp"
            stroke="#8884d8"
            fill="#ffa342"
          />
        </AreaChart>
      )}
    </div>
  );
}
