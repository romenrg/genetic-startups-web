import React, { Component } from 'react'
import {Algorithm, AlgorithmConsts, AlgorithmVars} from "../algorithm/Algorithm";
import ActionButton from "./ActionButton";
import Output from "./Output";
import ACTIONS from "../algorithm/Actions";
import axios from "axios";
import SettingsPanel from "./SettingsPanel";
import DisplayOptions from "../algorithm/Display"
import {
  Link,
  withRouter
} from "react-router-dom";

const MapConsts = {
  DEFAULT_NUM_COLS: 20,
  DEFAULT_NUM_ROWS: 8
}

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        numCols: MapConsts.DEFAULT_NUM_COLS,
        numRows: MapConsts.DEFAULT_NUM_ROWS,
        cells: undefined
      },
      selectedIndividualPath: new Array(MapConsts.DEFAULT_NUM_ROWS * MapConsts.DEFAULT_NUM_COLS).fill(0),
      isExecutionInProgress: false,
      isEvolutionCompleted: false,
      display: DisplayOptions.DISPLAY_GENERATIONS_QUICK.value,
      outputMessages: []
    }
    this.selectedIndividualPerGen = []
    this.handleStartEvolutionClick = this.handleStartEvolutionClick.bind(this);
    this.handleNewMapClick = this.handleNewMapClick.bind(this);
    this.handleSetRowsCols = this.handleSetRowsCols.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this)
    this.handleStory = this.handleStory.bind(this)
  }

  componentDidMount() {
    this.fetchCellsData(MapConsts.DEFAULT_NUM_ROWS, MapConsts.DEFAULT_NUM_COLS).then(
      response => {
        let newData = {
          numCols: MapConsts.DEFAULT_NUM_COLS,
          numRows: MapConsts.DEFAULT_NUM_ROWS,
          cells: response.data
        }
        this.setState({
          data: newData,
          outputMessages: this.initialOutputMessage(newData)
        })
      }
    )
  }

  initialOutputMessage(data) {
    return [<>Map of {data.numCols} columns and {data.numRows} rows.
      Its cell values, in column-major order, are: <span className="array-data">[{data.cells.toString()}]</span>.
      <Link to="/info/map"><span className="output-help material-icons material-icons-outlined">help_outline</span></Link>
      <br/>
      For each individual solution, the first {Algorithm.calculateNumOfBinaryDigitsForStartCell(data.numRows)} genes
      will encode the "starting cell chromosome". Then, in groups of {Algorithm.calculateNumBinaryDigitsForEachStep()} genes,
      the remaining {Algorithm.getNumSteps(data)} "step chromosomes" will be encoded.
      <Link to="/info/algorithm"><span className="output-help material-icons material-icons-outlined">help_outline</span></Link>
      </>]
  }

  cellTagFromActionValue(action) {
    let cellClass = "cell-content cell-"+ACTIONS[action].name.toLowerCase().replace(/\s/g, '');
    return <div role="img" aria-label={ACTIONS[action].name} title={ACTIONS[action].name} className={cellClass}/>
  }

  drawBoard() {
    let cells = []
    if (this.state.data.cells) {
      for (let i = 0; i < this.state.data.numRows; i++) {
        for (let j = 0; j < this.state.data.numCols; j++) {
          let cellIndex = Algorithm.calculateOneDimensionalPos(i, j, this.state.data)
          let cellNumVisits = this.state.selectedIndividualPath[cellIndex]
          if (cellNumVisits) {
            cells.push(<div key={cellIndex} data-testid="visited-cell" className={"cell highlight-"+cellNumVisits}>{this.cellTagFromActionValue(Algorithm.getCellAction(i, j, this.state.data))}</div>)
          }
          else {
            cells.push(<div key={cellIndex} className="cell">{this.cellTagFromActionValue(Algorithm.getCellAction(i, j, this.state.data))}</div>)
          }
        }
      }
    }
    return cells
  }

  writeMessages() {
    let messages = []
    for (let i = 0; i < this.state.outputMessages.length; i++) {
      messages.push(<span key={i} className="line">{this.state.outputMessages[i]}</span>)
    }
    return messages;
  }

  generatePopulation(populationSize) {
    let numOfBinaryDigitsForStartCells = Algorithm.calculateNumOfBinaryDigitsForStartCell(this.state.data.numRows)
    let numOfBinaryDigitsForSteps = Algorithm.calculateNumBinaryDigitsForEachStep() * Algorithm.getNumSteps(this.state.data)
    let population = []
    for (let i = 0; i < populationSize; i++) {
      let individual = {
        genotype: [],
        from: "initialization"
      }
      for (let j = 0; j < numOfBinaryDigitsForStartCells + numOfBinaryDigitsForSteps; j++) {
        let gene = Math.round(Math.random())
        individual.genotype.push(gene)
      }
      population.push(individual)
    }
    this.population = population
  }

  sortPopulationByScore() {
    this.population.sort((a, b) => Algorithm.fitness(b.genotype, this.state.data) - Algorithm.fitness(a.genotype, this.state.data))
  }

  setBestCandidatePath(selectedIndividualPath) {
    this.setState({
      selectedIndividualPath: selectedIndividualPath
    })
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  storeBestCandidateOfGeneration(generation) {
    this.selectedIndividualPerGen.push({
      individual: this.population[0],
      score: Algorithm.fitness(this.population[0].genotype, this.state.data)
    })
    if (this.state.display !== DisplayOptions.DISPLAY_FINAL_INDIVIDUAL_ONLY.value || generation === AlgorithmVars.NUM_GENERATIONS - 1) {
      this.setState(state => {
        const outputMessages = [<>Selected Individual for generation {generation+1}:&nbsp;
                                 <span className="array-data">
                                   [{this.selectedIndividualPerGen[generation].individual.genotype}]
                                 </span>
                                 <Link to="/info/algorithm"><span className="output-help material-icons material-icons-outlined">help_outline</span></Link>, <br/>
                                 came from {this.selectedIndividualPerGen[generation].individual.from}, <br/>
                                 score: {this.selectedIndividualPerGen[generation].score}</>
                               ].concat(state.outputMessages)
        return { outputMessages }
      })
    }
  }

  async drawPathOfBestCandidate(storyCellValues) {
    let selectedIndividualPath = new Array(this.state.data.numRows * this.state.data.numCols).fill(0)
    this.setBestCandidatePath(selectedIndividualPath)
    if (storyCellValues) {
      await this.sleep(2000)
    }
    if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
      await this.sleep(1000)
    }
    else if (this.state.display === DisplayOptions.DISPLAY_GENERATIONS_QUICK.value) {
      await this.sleep(75)
    }
    let step = 0
    let movements = this.population[0].genotype.slice(Algorithm.calculateNumOfBinaryDigitsForStartCell(this.state.data.numRows), this.population[0].genotype.length)
    let cell = Algorithm.calculateStartingCell(this.population[0].genotype, this.state.data.numRows)
    do {
      if (Algorithm._isCellInMap(cell.row, cell.col, this.state.data)) {
        if (this.state.display !== DisplayOptions.DISPLAY_FINAL_INDIVIDUAL_ONLY || (step === Algorithm.getNumSteps(this.state.data)) || storyCellValues) {
          selectedIndividualPath[Algorithm.calculateOneDimensionalPos(cell.row, cell.col, this.state.data)] += 1
          this.setBestCandidatePath(selectedIndividualPath)
        }
        if (storyCellValues) {
          this.setState(state => {
            const outputMessages = [("Cell: ["+(cell.row+1)+","+(cell.col+1)+"] : "+
              ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name+" : "+
              storyCellValues[step].msg+" : "+
              storyCellValues[step].score
            )].concat(state.outputMessages)
            return { outputMessages }
          })
        }
        else if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
          this.setState(state => {
            const outputMessages = [("Cell: ["+(cell.row+1)+","+(cell.col+1)+"] : "+
                                    ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name+" : "+
                                    Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.state.data)))
                                   ].concat(state.outputMessages)
            return { outputMessages }
          })
        }
      }
      else {
        if (storyCellValues) {
          this.setState(state => {
            const outputMessages = [("Cell: [Out of bounds] : " +
              "You don't know where you are anymore : " +
              Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.state.data)))
            ].concat(state.outputMessages)
            return {outputMessages}
          })
        }
        else if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
          this.setState(state => {
            const outputMessages = [("Cell: [Out of bounds] : " +
              ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name + " : " +
              Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.state.data)))
            ].concat(state.outputMessages)
            return {outputMessages}
          })
        }
      }
      if (storyCellValues) {
        await this.sleep(3500)
      }
      else if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
        await this.sleep(750)
      }
      else if (this.state.display === DisplayOptions.DISPLAY_GENERATIONS_QUICK.value) {
        await this.sleep(50)
      }
      cell = Algorithm.calculateNextCell(cell, movements.slice(0, Algorithm.calculateNumBinaryDigitsForEachStep()))
      movements = movements.slice(Algorithm.calculateNumBinaryDigitsForEachStep(), movements.length)
      step++;
    } while (step < Algorithm.getNumSteps(this.state.data) + 1)
    return true
  }

  createNewGeneration() {
    let numIndividualsToSelect = Math.floor(this.population.length / 4)
    let numIndividualsPerOp = Math.floor((this.population.length - numIndividualsToSelect) / 2)
    let numIndividualsToCross = (numIndividualsPerOp % 2) === 0 ? numIndividualsPerOp : numIndividualsPerOp + 1
    let selectedIndividuals = Algorithm.selection(numIndividualsToSelect, this.population)
    let crossedIndividuals = Algorithm.crossover(numIndividualsToCross, this.population)
    let mutatedIndividuals = Algorithm.mutation(this.population.length - numIndividualsToSelect - numIndividualsToCross, this.population)
    this.population = selectedIndividuals.concat(crossedIndividuals).concat(mutatedIndividuals)
  }

  async handleStartEvolutionClick(e) {
    let oldData = JSON.parse(JSON.stringify(this.state.data));
    let bestCandidateOfMsg = ""
    if (this.state.display !== DisplayOptions.DISPLAY_FINAL_INDIVIDUAL_ONLY.value) {
      bestCandidateOfMsg = " of each generation"
    }
    const startAlgorithmMsg = [(<>Running our genetic algorithm:<br/>
      - Evolving over {AlgorithmVars.NUM_GENERATIONS} generations,<br/>
      - With a population of {AlgorithmVars.POPULATION_SIZE} individuals,<br/>
      - Displaying the best candidate {bestCandidateOfMsg}</>)
    ]
    this.setState({
        isExecutionInProgress: true,
        selectedIndividualPath: new Array(oldData.numRows * oldData.numCols).fill(0),
        outputMessages: startAlgorithmMsg.concat(this.state.outputMessages[this.state.outputMessages.length - 1])
    })
    await this.sleep(3500)
    this.selectedIndividualPerGen = [];
    this.generatePopulation(AlgorithmVars.POPULATION_SIZE)
    let generation = 0;
    do {
      this.sortPopulationByScore()
      this.storeBestCandidateOfGeneration(generation)
      await this.drawPathOfBestCandidate()
      generation++;
      if (generation < AlgorithmVars.NUM_GENERATIONS) {
        this.createNewGeneration()
      }
    } while (generation < AlgorithmVars.NUM_GENERATIONS)
    this.setState({isExecutionInProgress: false, isEvolutionCompleted: true})
  }

  async fetchCellsData(numRows, numCols) {
    return await axios.get('/api/v1/content?rows='+numRows+'&cols='+numCols);
  }

  generateNewMap(numRows, numCols) {
    this.fetchCellsData(numRows, numCols).then(
      response => {
        let newData = {
          numRows: numRows,
          numCols: numCols,
          cells: response.data,
        }
        this.setState({
          data: newData,
          selectedIndividualPath: new Array(numRows * numCols).fill(0),
          outputMessages: this.initialOutputMessage(newData)
        })
        this.selectedIndividualPerGen = [];
      }
    )
  }

  handleNewMapClick() {
    if (!this.state.isExecutionInProgress) {
      this.generateNewMap(this.state.data.numRows, this.state.data.numCols);
      this.setState({isEvolutionCompleted: false})
    }
    else {
      console.log("Cannot change number of rows and cols, since evolution is in progress. Please wait until it finishes.")
    }
  }

  handleSetRowsCols(numRows, numCols) {
    if (!this.state.isExecutionInProgress && (numRows !== this.state.data.numRows || numCols !== this.state.data.numCols)) {
      this.generateNewMap(numRows, numCols)
    }
    else if (this.state.isExecutionInProgress) {
      console.log("Cannot change number of rows and cols, since evolution is in progress. Please wait until it finishes.")
    }
    else {
      this.setState({
        selectedIndividualPath: new Array(numRows * numCols).fill(0),
        outputMessages: this.initialOutputMessage({numCols: numCols, numRows: numRows, cells: this.state.data.cells})
      })
    }
  }

  handleDisplay(value) {
    this.setState({
      display: value
    })
  }

  async handleStory() {
    this.setState({isExecutionInProgress: true})
    let selectedIndividual = this.selectedIndividualPerGen[AlgorithmVars.NUM_GENERATIONS - 1];
    let story = Algorithm.story(selectedIndividual.individual.genotype, this.state.data)
    this.setState(state => {
      const outputMessages = [<>Story based on the selected individual:
        <span className="array-data">
          [{selectedIndividual.individual.genotype}]
        </span>
        <Link to="/info/algorithm"><span className="output-help material-icons material-icons-outlined">help_outline</span></Link>
        .<br/>
        Average score: {selectedIndividual.score}</>]
        .concat(state.outputMessages[state.outputMessages.length - 1])
      return { outputMessages }
    })
    await this.drawPathOfBestCandidate(story.cellsValues)
    this.setState(state => {
      const outputMessages = [(<>Final story scores for&nbsp;
        <span className="array-data">
          [{selectedIndividual.individual.genotype}]
        </span>
        <Link to="/info/algorithm"><span className="output-help material-icons material-icons-outlined">help_outline</span></Link>
        :<br/>
        - Its calculated average score was {selectedIndividual.score};<br/>
        - But its actual story score has been {story.totalStoryScore}</>)
      ].concat(state.outputMessages)
      return { outputMessages }
    })
    this.setState({isExecutionInProgress: false})
  }

  render() {
    const gridWidthInVW = 90
    const cssValues = {
      "--numCols": this.state.data.numCols,
      "--gridWidth": gridWidthInVW+"vw",
      "--cellWidth": (gridWidthInVW / this.state.data.numCols)+"vw"
    }
    let cells = this.drawBoard();
    let messages = this.writeMessages();
    let className = 'map';
    let storyButton = <ActionButton clickHandler={this.handleStory} isExecutionInProgress={this.state.isExecutionInProgress} text="Tell story" hide={!this.state.isEvolutionCompleted}/>
    return (
      <>
        <div className="intro-container">
          <span className="intro-text">Here's a map for startups to navigate:</span>
          <Link className="intro-help" to="/info/map"><span className="material-icons material-icons-outlined">help_outline</span></Link>
        </div>
        <div className={className}>
          <div className="grid-container" style={cssValues}>
            {cells}
          </div>
          <div className="action-buttons">
            <ActionButton clickHandler={this.handleStartEvolutionClick} isExecutionInProgress={this.state.isExecutionInProgress} text="Run algorithm" />
            {storyButton}
            <ActionButton clickHandler={this.handleNewMapClick} isExecutionInProgress={this.state.isExecutionInProgress} text="New map" />
          </div>
          <Output>
            {messages}
          </Output>
          <SettingsPanel numRows={this.state.data.numRows} numCols={this.state.data.numCols}
                         display={this.state.display}
                         isExecutionInProgress={this.state.isExecutionInProgress}
                         handleSetRowsCols={this.handleSetRowsCols}
                         handleDisplay={this.handleDisplay}
                         areSettingsShown={this.props.areSettingsShown}
                         setAreSettingsShown={this.props.setAreSettingsShown}/>
        </div>
      </>
    )
  }
}

export default withRouter(Map)