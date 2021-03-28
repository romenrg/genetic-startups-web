import React, {useState} from 'react';
import Map from "./Map";
import Info from "./Info"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <div className="react-app">
          <nav>
            <h1><Link to="/">Genetic Startups</Link></h1>
            <ul>
              <li>
                <Link to="/info">Algorithm details</Link>
              </li>
            </ul>
          </nav>
          <div id="main">
            <Switch>
              <Route path="/info">
                <Info />
              </Route>
              <Route path="/">
                <Map />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
