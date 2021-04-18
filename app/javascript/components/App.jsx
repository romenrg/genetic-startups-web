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
  const [areSettingsShown, setAreSettingsShown] = useState(false);

  return (
    <>
      <Router>
        <div className="react-app">
          <nav>
            <h1><Link to="/">Genetic Startups</Link></h1>
            <ul>
              <li>
                <Link to="/info">Information</Link>
              </li>
              <li>
                <a onClick={() => setAreSettingsShown(true)}>Settings</a>
              </li>
            </ul>
          </nav>
          <div id="main">
            <Switch>
              <Route path="/info">
                <Info />
              </Route>
              <Route path="/">
                <Map areSettingsShown={areSettingsShown} setAreSettingsShown={setAreSettingsShown}/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
