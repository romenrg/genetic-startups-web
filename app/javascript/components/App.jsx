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
            <div className="title-div">
              <h1><Link to="/">Genetic Startups</Link></h1>
              <span className="caption">Genetic Algorithms learning to navigate the bumpy world of startups</span>
            </div>
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
              <Route path="/info/map">
                <Info initialTabIndex="1"/>
              </Route>
              <Route path="/info/algorithm">
                <Info initialTabIndex="2"/>
              </Route>
              <Route path="/info/architecture">
                <Info initialTabIndex="3"/>
              </Route>
              <Route path="/info/usage">
                <Info initialTabIndex="4"/>
              </Route>
              <Route path="/info/contributing">
                <Info initialTabIndex="5"/>
              </Route>
              <Route path="/info">
                <Info initialTabIndex="0"/>
              </Route>
              <Route path="/">
                <Map areSettingsShown={areSettingsShown} setAreSettingsShown={setAreSettingsShown}/>
              </Route>
            </Switch>
          </div>
          <footer>
            Genetic Algorithms learning to navigate the bumpy world of startups, by <a href="https://www.romenrg.com">romenrg</a>.
            Refer to <Link to="/info">information</Link> for more details.
          </footer>
        </div>
      </Router>
    </>
  );
};

export default App;
