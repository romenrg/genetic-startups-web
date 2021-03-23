import React, { Component } from 'react'
import {Algorithm, AlgorithmConsts} from "../algorithm/Algorithm";
import ActionButton from "./ActionButton";
import Output from "./Output";
import ACTIONS from "../algorithm/Actions";
import axios from "axios";

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      selectedIndividualPath: new Array(this.props.data.numRows * this.props.data.numCols).fill(0),
      isEvolutionInProgress: false,
      outputMessages: ["Map of "+this.props.data.numCols+" cols x "+this.props.data.numRows+" rows. Cells values are: ["+this.props.data.cells+"]"]
    }
    this.selectedIndividualPerGen = []
    this.handleStartEvolutionClick = this.handleStartEvolutionClick.bind(this);
    this.handleNewMapClick = this.handleNewMapClick.bind(this);
  }

  cellTagFromActionValue(action) {
    let cellClass = "cell-content cell-"+ACTIONS[action].name
    return <div className={cellClass}/>
  }

  drawBoard() {
    let cells = []
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
    alert("Population size: "+populationSize+"\n"+
      "Number of rows: "+this.state.data.numRows+"\n"+
      "Number of binary digits for start cell: "+numOfBinaryDigitsForStartCells+"\n"+
      "Number of cols: "+this.state.data.numCols+"\n"+
      "Number of steps: "+Algorithm.getNumSteps(this.state.data)+"\n"+
      "Number of binary digits for steps: "+numOfBinaryDigitsForSteps+"\n"+
      "Population[0]: "+this.population[0])
  }

//TODO: Fitness needs to access the map matrix, probably extract shared pieces to a 3rd class "MapData"?
  sortPopulationByScore() {
    console.log("BEFORE SORTING -----------")
    for (let i = 0; i < this.population.length; i++) {
      console.log(i+":\n - "+this.population[i]+"\n - "+Algorithm.fitness(this.population[i], this.state.data))
    }
    console.log("SORTING -----------")
    this.population.sort((a, b) => Algorithm.fitness(b, this.state.data) - Algorithm.fitness(a, this.state.data))
    console.log("AFTER SORTING -----------")
    for (let i = 0; i < this.population.length; i++) {
      console.log(i+":\n - "+this.population[i]+"\n - "+Algorithm.fitness(this.population[i], this.state.data))
    }
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

  async handleNewMapClick(e) {
    const response = await axios.get('/api/v1/content?rows='+this.state.data.numRows+'&cols='+this.state.data.numCols);
    let newData = {
      numRows: this.state.data.numRows,
      numCols: this.state.data.numCols,
      cells: response.data,
  }
    console.log("Response: "+response)
    this.setState({data: newData })
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
      </div>
    )
  }
}

export default Map