import React, {useState} from 'react';
import Map from "./Map";
import Info from "./Info"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = (props) => {

  // const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div>
          <nav>
            <h1><Link to="/">Genetic Startups</Link></h1>
            <ul>
              <li>
                <Link to="/info">Info</Link>
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
