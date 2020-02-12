import React, { useState } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  function removeCity(id) {
    setSearchHistory(searchHistory.filter(city => city.id !== id));
  }

  return (
    <div className="App">
      <h1> Weather </h1>

      <Router>
        <Switch>
          <Route path="/:id">
            <Forecast />
          </Route>
          <Route path="/">
            <Search
              setSearchHistory={setSearchHistory}
              setIsLoading={setIsLoading}
              setHasError={setHasError}
            />
            {hasError && <p>An error happened!</p>}
            {isLoading && <p>Loading...</p>}
            {searchHistory.map(city => (
              <Weather removeCity={removeCity} key={city.id} city={city} />
            ))}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
