import React, {useState} from 'react';
import ACTIONS from "../algorithm/Actions";
import {Algorithm} from "../algorithm/Algorithm";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Action = (props) => {
  let values = props.action.values.map((value, i) => {
    return (
      <div className="info-item-value" key={i}>
        <span className="info-item-value-number">{value.score}: </span>
        <span className="info-item-value-msg">{value.msg}</span>
      </div>
    )
  })
  return (
    <>
      <div className={"info-item-image-container "+props.evenOrOddRow}>
        <div className={"info-item-image cell-"+props.action.name}/>
      </div>
      <span className={props.evenOrOddRow}>{props.action.name}</span>
      <div className={"info-item-values-list "+props.evenOrOddRow}>
        {values}
      </div>
      <span className={props.evenOrOddRow}>{Algorithm.calculateScore(props.actionIndex)}</span>
      <span className={props.evenOrOddRow}>{props.action.description}</span>
    </>
  );
};

const Info = () => {
  const [tabIndex, setTabIndex] = useState(0);

  let actionsInfo = []
  ACTIONS.forEach( (action, i) => {
    let evenOrOddRow = i % 2 ? "even-row" : "odd-row"
    actionsInfo.push(<Action action={action} evenOrOddRow={evenOrOddRow} actionIndex={i} key={i}/>)
  })

  return (
    <div id="info">
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <h2 className="section-title">Information</h2>
        <TabList>
          <Tab>Introduction</Tab>
          <Tab>The map</Tab>
          <Tab>Algorithm details</Tab>
          <Tab>Using the application</Tab>
        </TabList>

        <TabPanel>
          <div id="info-intro" className="tab-panel">
            <h2>Introduction</h2>
            <p>This application is based on Genetic Algorithms, representing possible lives of startups.
               The algorithm improves startup choices over generations, to achieve the most successful outcome possible;
               in a map where investors, product launches, team members, sad news and sales, among other options, appear.</p>
            <h3>About Genetic Algorithms</h3>
            <p>In the field of artificial intelligence, Genetic algorithms are grouped in the larger class of evolutionary
              algorithms (EA). Are often used as a search heuristic, to generate solutions to optimization problems. </p>
            <p>Genetic Algorithms use techniques inspired by natural evolution, such as selection, crossover and mutation,
              in order to evolve a random population of possible solutions into better and better solutions, over generations.</p>
            <h3>The problem of Startup life evolution</h3>
            <p>Startups are surrounded with huge uncertainty and have limited resources and time to find product/market-fit.
              Besides, the life of a startup is full of challenges and tough choices. As founders, we must be very careful
              when choosing one path or another.</p>
            <p>In this application, we generate random "maps" that represent the space of possible choices for the
              life of a startup. Since time and resources are limited, finding the best path possible is key to success.
              Pursuing that goal, we have developed a genetic algorithm that tries to pick the best possible outcome
              for the startup, learning with each new generation.</p>
            <p>Learn more about the map the dedicated information tab <a onClick={() => setTabIndex(1)}>"The map"</a>.</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="info-cell-types" className="tab-panel">
            <h2>The map</h2>
            <p>As a starting point, we generate a random map that represents the space of possible choices for the
            life of your startup.</p>
            <h3>Cell types</h3>
            <p>In the map, different cell types appear. Each one represents a possible event in the life of a
              startup, having a different impact. For that reason, each type has 10 possible values,
              and a score (calculated as the average of those possible values):</p>
            <div className="info-grid">
              <span className="info-item-title">Element</span>
              <span className="info-item-title">Name</span>
              <span className="info-item-title">Possible values</span>
              <span className="info-item-title">Score</span>
              <span className="info-item-title">Description</span>
              {actionsInfo}
            </div>
            <h3>Probabilities per quarter</h3>
            <p>The map is divided in quarters. Each quarter has different probabilities for the different types of cells: </p>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="info-alg-details" className="tab-panel">
            <h2>Algorithm details</h2>
            <p>The key aspects of applying genetic algorithms to this problem are:</p>
            <ol>
              <li>defining how individuals are represented,</li>
              <li>defining the selection, crossover and mutation operations,</li>
              <li>the fitness function, used to evaluate individuals</li>
            </ol>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="info-using-app" className="tab-panel">
            <h2>Using the application</h2>
            <p>The main features opf this application are:</p>
            <ol className="text-list">
              <li>Generating a random map (either reloading the page or clicking the "Generate new map" button</li>
              <li>Customize settings: map size (rows and columns) and information to display:</li>
              <ul className="text-list">
                <li>Show all information: </li>
                <li>Quick loop over generations: </li>
                <li>Only show final individual: </li>
              </ul>
              <li>Start the evolution, clicking the corresponding button</li>
            </ol>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Info;
