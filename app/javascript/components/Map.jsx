import React, { Component } from 'react'
import {Algorithm, AlgorithmConsts} from "../algorithm/Algorithm";
import ActionButton from "./ActionButton";
import Output from "./Output";
import ACTIONS from "../algorithm/Actions";
import axios from "axios";
import SettingsPanel from "./SettingsPanel";

const MapConsts = {
  DEFAULT_NUM_COLS: 16,
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
      isEvolutionInProgress: false,
      outputMessages: []
    }
    this.selectedIndividualPerGen = []
    this.handleStartEvolutionClick = this.handleStartEvolutionClick.bind(this);
    this.handleNewMapClick = this.handleNewMapClick.bind(this);
    this.handleSetRowsCols = this.handleSetRowsCols.bind(this);
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
          let cellNumVisits = this.state.selectedIndividualPath[Algorithm.calculateOneDimensionalPos(i, j, this.state.data)]
          if (cellNumVisits) {
            cells.push(<div data-testid="visited-cell" className={"cell highlight-"+cellNumVisits}>{this.cellTagFromActionValue(Algorithm.getCellAction(i, j, this.state.data))}</div>)
          }
          else {
            cells.push(<div className="cell">{this.cellTagFromActionValue(Algorithm.getCellAction(i, j, this.state.data))}</div>)
          }
        }
      }
    }
    return cells
  }

  writeMessages() {
    let messages = []
    for (let i = 0; i < this.state.outputMessages.length; i++) {
      messages.push(<span className="line">{this.state.outputMessages[i]}</span>)
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
    this.setState(state => {
      const outputMessages = [("Selected Individual for generation "+generation+": ["+
                              this.selectedIndividualPerGen[generation].individual+"]. Score:"+
                              this.selectedIndividualPerGen[generation].score)
                             ].concat(state.outputMessages)
      return { outputMessages }
    })
  }

  async drawPathOfBestCandidate() {
    await this.sleep(1000)
    let selectedIndividualPath = new Array(this.state.data.numRows * this.state.data.numCols).fill(0)
    let step = 0
    let movements = this.population[0].slice(Algorithm.calculateNumOfBinaryDigitsForStartCell(this.state.data.numRows), this.population[0].length)
    let cell = Algorithm.calculateStartingCell(this.population[0], this.state.data.numRows)
    do {
      if (Algorithm._isCellInMap(cell.row, cell.col, this.state.data)) {
        selectedIndividualPath[Algorithm.calculateOneDimensionalPos(cell.row, cell.col, this.state.data)] += 1
        this.setBestCandidatePath(selectedIndividualPath)
        this.setState(state => {
          const outputMessages = [("Cell: ["+cell.row+","+cell.col+"] : "+
                                  ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name+" : "+
                                  Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.state.data)))
                                 ].concat(state.outputMessages)
          return { outputMessages }
        })
      }
      else {
        this.setState(state => {
          const outputMessages = [("Cell: [Out of bounds] : "+
            ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.state.data)].name+" : "+
            Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.state.data)))
          ].concat(state.outputMessages)
          return { outputMessages }
        })
      }
      await this.sleep(1000)
      cell = Algorithm.calculateNextCell(cell, movements.slice(0, Algorithm.calculateNumBinaryDigitsForEachStep()))
      movements = movements.slice(Algorithm.calculateNumBinaryDigitsForEachStep(), movements.length)
      step++;
    } while (step < Algorithm.getNumSteps(this.state.data) + 1)
    return true
  }

  createNewGeneration() {
    let numIndividualsToSelect = this.population.length / 3
    let numIndividualsToCross = (numIndividualsToSelect % 2) === 0 ? numIndividualsToSelect : numIndividualsToSelect + 1
    let selectedIndividuals = Algorithm.selection(numIndividualsToSelect, this.population)
    let crossedIndividuals = Algorithm.crossover(numIndividualsToCross, this.population)
    let mutatedIndividuals = Algorithm.mutation(this.population.length - numIndividualsToSelect - numIndividualsToCross, this.population)
    this.population = selectedIndividuals.concat(crossedIndividuals).concat(mutatedIndividuals)
  }

  async handleStartEvolutionClick(e) {
    this.setState({isEvolutionInProgress: true})
    this.generatePopulation(AlgorithmConsts.DEFAULT_POPULATION_SIZE)
    let generation = 0;
    do {
      this.sortPopulationByScore()
      this.storeBestCandidateOfGeneration(generation)
      await this.drawPathOfBestCandidate()
      this.createNewGeneration()
      generation++;
    } while (generation < AlgorithmConsts.NUM_GENERATIONS)
    this.setState({isEvolutionInProgress: false})
  }

  async fetchCellsData(numRows, numCols) {
    return await axios.get('/api/v1/content?rows='+numRows+'&cols='+numCols);
  }

  handleNewMapClick() {
    this.fetchCellsData(this.state.data.numRows, this.state.data.numCols).then(
      response => {
        let newData = {
          numRows: this.state.data.numRows,
          numCols: this.state.data.numCols,
          cells: response.data,
        }
        this.setState({
          data: newData,
          outputMessages: ["Map of "+newData.numCols+" cols x "+newData.numRows+" rows. Cells values are: ["+newData.cells+"]"]
        })
      }
    )
  }

  handleSetRowsCols(numRows, numCols) {
    if (!this.state.isEvolutionInProgress) {
      this.fetchCellsData(numRows, numCols).then(
        response => {
          let newData = {
            numRows: numRows,
            numCols: numCols,
            cells: response.data,
          }
          this.setState({
            data: newData,
            outputMessages: ["Map of "+newData.numCols+" cols x "+newData.numRows+" rows. Cells values are: ["+newData.cells+"]"]
          })
        }
      )
    }
    else {
      console.log("Cannot change number of rows and cols, since evolution is in progress. Please wait until it finishes.")
    }
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
    let settings = this.props.displaySettings ? <SettingsPanel numRows={this.state.data.numRows} numCols={this.state.data.numCols} handleSetRowsCols={this.handleSetRowsCols} /> : undefined;
    return (
      <div className={className}>
        <div className="grid-container" style={cssValues}>
          {cells}
        </div>
        <div className="action-buttons">
          <ActionButton clickHandler={this.handleStartEvolutionClick} isEvolutionInProgress={this.state.isEvolutionInProgress} text="Start evolution" />
          <ActionButton clickHandler={this.handleNewMapClick} isEvolutionInProgress={this.state.isEvolutionInProgress} text="Generate new map" />
        </div>
        <Output>
          {messages}
        </Output>
        {settings}
      </div>
    )
  }
}

export default Map