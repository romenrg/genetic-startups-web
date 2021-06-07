import React, {useState, useEffect} from 'react';
import ACTIONS from "../algorithm/Actions";
import {Algorithm} from "../algorithm/Algorithm";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";
import { HashLink } from 'react-router-hash-link';
import {
  Link,
  withRouter
} from "react-router-dom";
import FrontEndDiagram from "images/GeneticStartups_ReactComponents.png"
import BackEndDiagram from "images/GeneticStartups_RailsComponents.png"

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
        <div className={"info-item-image cell-"+props.action.name.toLowerCase().replace(/\s/g, '')}/>
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


const ActionProbabilities = (props) => {
  return (
    <>
      <div className={props.evenOrOddRow}>{ACTIONS[props.actionIndex].name}</div>
      <div className={props.evenOrOddRow}>{props.probabilities[0][props.actionIndex]}%</div>
      <div className={props.evenOrOddRow}>{props.probabilities[1][props.actionIndex]}%</div>
      <div className={props.evenOrOddRow}>{props.probabilities[2][props.actionIndex]}%</div>
      <div className={props.evenOrOddRow}>{props.probabilities[3][props.actionIndex]}%</div>
    </>
  )
}


const Info = (props) => {
  const [probabilities, setProbabilities] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/probabilities').then(
      response => {
        setProbabilities(response.data)
      }
    )
  }, []);

  let actionsInfo = []
  ACTIONS.forEach( (action, i) => {
    let evenOrOddRow = i % 2 ? "even-row" : "odd-row"
    actionsInfo.push(<Action action={action} evenOrOddRow={evenOrOddRow} actionIndex={i} key={i}/>)
  })

  let probabilitiesInfo = []
  if (probabilities.length > 0) {
    for (let i = 0; i < probabilities[0].length; i++) {
      let evenOrOddRow = i % 2 ? "even-row" : "odd-row"
      probabilitiesInfo.push(<ActionProbabilities evenOrOddRow={evenOrOddRow} probabilities={probabilities}
                                                  actionIndex={i} key={i}></ActionProbabilities>)
    }
  }

  const changeTabs = (index) => {
    switch (index) {
      case 0:
        props.history.push("/info");
        break;
      case 1:
        props.history.push("/info/map");
        break;
      case 2:
        props.history.push("/info/algorithm");
        break;
      case 3:
        props.history.push("/info/architecture");
        break;
      case 4:
        props.history.push("/info/usage");
        break;
      case 5:
        props.history.push("/info/contributing");
        break;
    }
  }

  return (
    <div id="info">
      <Tabs selectedIndex={parseInt(props.initialTabIndex)} onSelect={index => changeTabs(index)}>
        <h2 className="section-title">Information</h2>
        <TabList>
          <Tab>Introduction</Tab>
          <Tab>The map</Tab>
          <Tab>Algorithm details</Tab>
          <Tab>Architecture</Tab>
          <Tab>Using the application</Tab>
          <Tab>Contributing</Tab>
        </TabList>

        <TabPanel>
          <div id="info-intro" className="tab-panel">
            <h3>Introduction</h3>
            <p>This application, by <a href="https://www.romenrg.com">romenrg</a>, is based on Genetic Algorithms. It
               calculates possible lives of a startup, given a random reality represented as a map.</p>
            <p>The algorithm improves choices over generations, trying to achieve the most successful outcome possible
               for the startup; in a map where investors, product launches, team members, sad news and sales, among
              other events, appear.</p>
            <h4>About Genetic Algorithms</h4>
            <p>Within the field of Artificial Intelligence (AI), Genetic Algorithms (GA) are grouped in the larger class of evolutionary
              algorithms. And are often used as a search heuristic, to generate solutions to optimization problems. </p>
            <p>Genetic Algorithms use techniques inspired by natural evolution, such as selection, crossover and mutation;
              in order to evolve a random population of possible solutions into better ones, over generations.</p>
            <p>Learn more about our implementation in the <Link to="/info/map">"Algorithm details"</Link> tab.</p>
            <h4>The problem of Startup life choices</h4>
            <p>Startups are surrounded with huge uncertainty and have limited resources and time to find product/market-fit
              and become sustainable businesses. Besides, the life of a startup is full of challenges and tough choices.
              As founders, we must be very careful choosing one path over another, when making decisions.</p>
            <p>In this application, we generate random maps that represent the space of possible choices for the
              life of the startup. Since finding the best path possible is key to success, we have developed a Genetic
              Algorithm that improves choices over generations.</p>
            <p>Learn more about the map the dedicated information tab <Link to="/info/map">"The map"</Link>.</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="info-cell-types" className="tab-panel">
            <h3>The map</h3>
            <p>As a starting point, we generate a random map that represents the space of possible choices for the
            life of the startup.</p>
            <p>From an implementation perspective, this map is represented as an array of integers. The array actually
               represents a matrix, in <a href="https://en.wikipedia.org/wiki/Row-_and_column-major_order#:~:text=In%20row%2Dmajor%20order%2C%20the,column%20in%20column%2Dmajor%20order.">
               column-major order</a>. The values of its elements represent the actions, based on their order in the
               "cell-types" table below <em>(e.g. 0 = "none"; 1 = "advisor",...).</em></p>
            <p>The key aspects of the creation of the map are:</p>
            <ul className="text-list">
              <li><HashLink to="#cell-types">Cell types (actions)</HashLink></li>
              <li><HashLink to="#action-probabilities">Action probabilities per quarter</HashLink></li>
            </ul>
            <h4 id="cell-types">Cell types (actions)</h4>
            <p>In the map, different cell types (faces / "emojis") appear. Each one represents a possible event in the life of a
              startup, having a different impact. For that reason, each type has 10 possible values,
              and a score (calculated as the average of those possible values):</p>
            <div className="info-grid actions-grid">
              <span className="info-item-title">Element</span>
              <span className="info-item-title">Name</span>
              <span className="info-item-title">Possible values</span>
              <span className="info-item-title">Score</span>
              <span className="info-item-title">Description</span>
              {actionsInfo}
            </div>
            <h4 id="action-probabilities">Action probabilities per quarter</h4>
            <p>The map is divided in quarters. Each quarter has different probabilities for the different types of cells: </p>
            <div className="info-grid probabilities-grid">
              <span className="info-item-title">Action</span>
              <span className="info-item-title">First quarter</span>
              <span className="info-item-title">Second quarter</span>
              <span className="info-item-title">Third quarter</span>
              <span className="info-item-title">Fourth quarter</span>
              {probabilitiesInfo}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="info-alg-details" className="tab-panel">
            <h3>Algorithm details</h3>
            <p>The key aspects of applying genetic algorithms to this problem are:</p>
            <ol className="text-list">
              <li>Defining how individuals are represented,</li>
              <li>Designing the selection, crossover and mutation operations, and</li>
              <li>Building the fitness function, used to evaluate individuals</li>
            </ol>
            <h4>Population: defining chromosomes (encoding start cell & movements in genes)</h4>
            <p>Our evolutionary algorithm starts by defining a random population of individual potential solutions at
               the beginning.</p>
            <p>Each one of those potential solutions (each individual) is defined as a binary array, represented as a set
              of genes (each either a "0" or a "1"). These genes are grouped in chromosomes, encoding both the start
              cell and the movements of each individual.</p>
            <p>As an example, given a map of 3 columns and 3 rows, we would allow each startup to take 5 steps
               (i.e. floor[numSteps(3) * 1.75]). So, in this case, one possible element of the population could be:
               "010001".</p>
            <p>In this example, since we have 3 rows, there are 3 possible start positions, which means we need to use
               two binary digits (two genes) for the chromosome that represents the starting cell. So, that's what the
               first two genes represent. The rest of the genes, in pairs, represent the movements chromosomes. Since
               moving backwards is not allowed, we have decided that both "00" and "10" mean "move right"; while "01"
               means "move down" and "11" means "move up".</p>
            <h4>Operations: selection, crossover and mutation</h4>
            <p>After the initial random population is created, the elements are evaluated and sorted based on their
              "fitness". The best candidate is selected and displayed.</p>
            <p>Then, a new generation has to be created. Every new generation is calculated by
               performing 3 operations:</p>
            <ul className="text-list">
              <li>Selection: The algorithm picks the top 25% candidates (according to their "fitness" score) and passes
                  them directly to the next generation.</li>
              <li>Crossover: When the selection is done, the crossover operation is executed by the algorithm,
                  randomly picking pairs of elements, amounting to a total of ~50% of the remaining individuals that will
                  represent the new generation. Each selected pair of individuals is combined, generating two new
                  elements, by using the first half of the genes of one of the original two individuals, and the second
                  half of the other one.</li>
              <li>Mutation: The remaining elements of the new generation will be generated by mutating random existing
                  individuals. In our case, the mutation consists of changing a random gene to them; producing
                  mutated individuals.</li>
            </ul>
            <h4>Fitness function</h4>
            <p>The fitness function gives a score to each candidate individual, by taking into account the scores of the
               cells that the individual would visit (based on their chromosomes configuration, as explained above).</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="info-architecture" className="tab-panel">
            <h3>Architecture</h3>
            <p>This application is composed of</p>
            <ol className="text-list">
              <li>A Rails backend application, which exposes a REST API; and</li>
              <li>A React frontend application</li>
            </ol>
            <h4>The Rails backend</h4>
            <p>The backend Rails application includes the functionality to generate random maps and is also in
               charge of rendering the index page, which then will load the React application.</p>
            <p>It also exposes the API. Its operations include the "probabilities" endpoint, that returns the
               probabilities each action has of appearing, per quarter of the map. And it also includes the main
               "content" endpoint (the one used to generate the random content of a map, given the number of rows and
               columns, as parameters).</p>
            <img src={BackEndDiagram}/>
            <h4>The React frontend</h4>
            <p>The React applications is written in Javascript and is composed of several components, as described in
              the following diagram:</p>
            <img src={FrontEndDiagram}/>
            <p>On the styling side, the Sass CSS pre-processor is used, along with our custom styles and the Tailwind
               CSS and UI frameworks.</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="info-using-app" className="tab-panel">
            <h3>Using the application</h3>
            <p>The main features of this application are:</p>
            <ol className="text-list">
              <li>Generating a random map, by either:</li>
              <ul className="text-list">
                <li>Reloading the page; or</li>
                <li>Clicking the "New map" button</li>
              </ul>
              <li>Customizing settings:</li>
              <ul className="text-list">
                <li>Map size (rows and columns)</li>
                <li>Information to display (all details, quick loop per generation or only final solution) </li>
                <li>Algorithm config (population size and number of generations)</li>
              </ul>
              <li>Running the algorithm, by clicking the corresponding button. This will:</li>
              <ul className="text-list">
                <li>Generate a random population of solutions for the given map</li>
                <li>Iterate, evolving the population for the given number of generations</li>
                <li>For each generation, selection, crossover and mutation will occur, producing an updated population</li>
              </ul>
              <li>Telling a story:</li>
              <ul className="text-list">
                <li>After the evolution has finished, a final solution will be selected as the best candidate life (set
                    of choices) for the startup</li>
                <li>During the evolution, we are using the average scores for each cell action, but for the story we will
                    use specific values for each action, describing what a real life story could be for the startup</li>
                <li>As a result, an actual score for the story will be provided, which will differ from the score
                    obtained during evolution. This actual score represents a unique story for the startup, calculated
                    by picking specific values for events (actions), rather than the average action scores</li>
              </ul>
            </ol>
          </div>
        </TabPanel>
        <TabPanel>
          <div id="contributing" className="tab-panel">
            <h3>Contributing</h3>
            <p>Genetic Startups is open source software. It is also a work in progress and a hobby project, so many
               improvements can be made.</p>
            <p>Constructive contributions are welcome. Please refer to the <a href="https://github.com/romenrg/genetic-startups-web/blob/main/CONTRIBUTING.md">
               contributing guidelines in the GitHub repository</a> for more information on how to contribute.</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default withRouter(Info);
