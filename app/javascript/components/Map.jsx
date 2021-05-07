import React, { Component } from 'react'
import {Algorithm, AlgorithmConsts, AlgorithmVars} from "../algorithm/Algorithm";
import ActionButton from "./ActionButton";
import Output from "./Output";
import ACTIONS from "../algorithm/Actions";
import axios from "axios";
import SettingsPanel from "./SettingsPanel";
import DisplayOptions from "../algorithm/Display"

const MapConsts = {
  DEFAULT_NUM_COLS: 18,
  DEFAULT_NUM_ROWS: 7
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
        this.setState({
          data: {
            numCols: MapConsts.DEFAULT_NUM_COLS,
            numRows: MapConsts.DEFAULT_NUM_ROWS,
            cells: response.data
          },
          outputMessages: ["Map of "+MapConsts.DEFAULT_NUM_COLS+" cols x "+MapConsts.DEFAULT_NUM_ROWS+" rows. Cells values are: ["+response.data+"]"]
        })
      }
    )
  }

  cellTagFromActionValue(action) {
    let cellClass = "cell-content cell-"+ACTIONS[action].name
    return <div className={cellClass}/>
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
      let individual = []
      for (let j = 0; j < numOfBinaryDigitsForStartCells + numOfBinaryDigitsForSteps; j++) {
        let chromosome = Math.round(Math.random())
        individual.push(chromosome)
      }
      population.push(individual)
    }
    this.population = population
  }

  sortPopulationByScore() {
    this.population.sort((a, b) => Algorithm.fitness(b, this.state.data) - Algorithm.fitness(a, this.state.data))
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
      score: Algorithm.fitness(this.population[0], this.state.data)
    })
    if (this.state.display !== DisplayOptions.DISPLAY_FINAL_INDIVIDUAL_ONLY.value || generation === AlgorithmVars.NUM_GENERATIONS - 1) {
      this.setState(state => {
        const outputMessages = [("Selected Individual for generation "+generation+": ["+
                                this.selectedIndividualPerGen[generation].individual+"]. Score:"+
                                this.selectedIndividualPerGen[generation].score)
                               ].concat(state.outputMessages)
        return { outputMessages }
      })
    }
  }

  async drawPathOfBestCandidate(storyCellValues) {
    let selectedIndividualPath = new Array(this.state.data.numRows * this.state.data.numCols).fill(0)
    this.setBestCandidatePath(selectedIndividualPath)
    if (storyCellValues) {
      await this.sleep(1500)
    }
    if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
      await this.sleep(500)
    }
    else if (this.state.display === DisplayOptions.DISPLAY_GENERATIONS_QUICK.value) {
      await this.sleep(50)
    }
    let step = 0
    let movements = this.population[0].slice(Algorithm.calculateNumOfBinaryDigitsForStartCell(this.state.data.numRows), this.population[0].length)
    let cell = Algorithm.calculateStartingCell(this.population[0], this.state.data.numRows)
    do {
      if (Algorithm._isCellInMap(cell.row, cell.col, this.state.data)) {
        if (this.state.display !== DisplayOptions.DISPLAY_FINAL_INDIVIDUAL_ONLY || (step === Algorithm.getNumSteps(this.state.data)) || storyCellValues) {
          selectedIndividualPath[Algorithm.calculateOneDimensionalPos(cell.row, cell.col, this.state.data)] += 1
          this.setBestCandidatePath(selectedIndividualPath)
        }
        if (storyCellValues) {
          this.setState(state => {
            const outputMessages = [("Cell: ["+cell.row+","+cell.col+"] : "+
              ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name+" : "+
              storyCellValues[step].msg+" : "+
              storyCellValues[step].score
            )].concat(state.outputMessages)
            return { outputMessages }
          })
        }
        else if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
          this.setState(state => {
            const outputMessages = [("Cell: ["+cell.row+","+cell.col+"] : "+
                                    ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name+" : "+
                                    Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.state.data)))
                                   ].concat(state.outputMessages)
            return { outputMessages }
          })
        }
      }
      else if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
        this.setState(state => {
          const outputMessages = [("Cell: [Out of bounds] : "+
            ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name+" : "+
            Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.state.data)))
          ].concat(state.outputMessages)
          return { outputMessages }
        })
      }
      if (storyCellValues) {
        await this.sleep(1500)
      }
      else if (this.state.display === DisplayOptions.DISPLAY_ALL.value) {
        await this.sleep(500)
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
    this.setState({
        isExecutionInProgress: true,
        selectedIndividualPath: new Array(oldData.numRows * oldData.numCols).fill(0),
        outputMessages: ["Map of "+oldData.numCols+" cols x "+oldData.numRows+" rows. Cells values are: ["+oldData.cells+"]"]
    })
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
          outputMessages: ["Map of "+newData.numCols+" cols x "+newData.numRows+" rows. Cells values are: ["+newData.cells+"]"]
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
        outputMessages: ["Map of "+numCols+" cols x "+numRows+" rows. Cells values are: ["+this.state.data.cells+"]"]
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
    let story = Algorithm.story(selectedIndividual.individual, this.state.data)
    this.setState(state => {
      const outputMessages = [("Story based on the selected individual: ["+
        selectedIndividual.individual+"], which has an average score of:"+
        selectedIndividual.score
      )].concat(state.outputMessages)
      return { outputMessages }
    })
    await this.drawPathOfBestCandidate(story.cellsValues)
    this.setState(state => {
      const outputMessages = [("Final story scores for: ["+
        selectedIndividual.individual+"]. Started with an individual with average score:"+
        selectedIndividual.score+"; And got an actual story score of:"+
        story.totalStoryScore)
      ].concat(state.outputMessages)
      return { outputMessages }
    })
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
    let storyButton = <ActionButton clickHandler={this.handleStory} isExecutionInProgress={this.state.isExecutionInProgress} text="Tell the story" hide={!this.state.isEvolutionCompleted}/>
    return (
      <>
        <p>Here's the world your startup will learn to navigate:</p>
        <div className={className}>
          <div className="grid-container" style={cssValues}>
            {cells}
          </div>
          <div className="action-buttons">
            <ActionButton clickHandler={this.handleStartEvolutionClick} isExecutionInProgress={this.state.isExecutionInProgress} text="Start evolution" />
            {storyButton}
            <ActionButton clickHandler={this.handleNewMapClick} isExecutionInProgress={this.state.isExecutionInProgress} text="Generate new map" />
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

export default Map