import React, { Component } from 'react'
import {Algorithm, AlgorithmConsts} from "../algorithm/Algorithm";
import StartButton from "./StartButton";
import Output from "./Output";
import ACTIONS from "../algorithm/Actions";

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndividualPath: new Array(this.props.data.numRows * this.props.data.numCols).fill(0),
      isEvolutionInProgress: false,
      outputMessages: ["Map of "+this.props.data.numCols+" cols x "+this.props.data.numRows+" rows. Cells values are: ["+this.props.data.cells+"]"]
    }
    this.selectedIndividualPerGen = []
    this.handleStartEvolutionClick = this.handleStartEvolutionClick.bind(this);
  }

  cellTagFromActionValue(action) {
    let cellClass = "cell-content cell-"+ACTIONS[action].name
    return <div className={cellClass}/>
  }

  drawBoard() {
    let cells = []
    for (let i = 0; i < this.props.data.numRows; i++) {
      for (let j = 0; j < this.props.data.numCols; j++) {
        let cellNumVisits = this.state.selectedIndividualPath[Algorithm.calculateOneDimensionalPos(i, j, this.props.data)]
        if (cellNumVisits) {
          cells.push(<div data-testid="visited-cell" className={"cell highlight-"+cellNumVisits}>{this.cellTagFromActionValue(Algorithm.getCellAction(i, j, this.props.data))}</div>)
        }
        else {
          cells.push(<div className="cell">{this.cellTagFromActionValue(Algorithm.getCellAction(i, j, this.props.data))}</div>)
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
    let numOfBinaryDigitsForStartCells = Algorithm.calculateNumOfBinaryDigitsForStartCell(this.props.data.numRows)
    let numOfBinaryDigitsForSteps = Algorithm.calculateNumBinaryDigitsForEachStep() * Algorithm.getNumSteps(this.props.data)
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
      "Number of rows: "+this.props.data.numRows+"\n"+
      "Number of binary digits for start cell: "+numOfBinaryDigitsForStartCells+"\n"+
      "Number of cols: "+this.props.data.numCols+"\n"+
      "Number of steps: "+Algorithm.getNumSteps(this.props.data)+"\n"+
      "Number of binary digits for steps: "+numOfBinaryDigitsForSteps+"\n"+
      "Population[0]: "+this.population[0])
  }

//TODO: Fitness needs to access the map matrix, probably extract shared pieces to a 3rd class "MapData"?
  sortPopulationByScore() {
    console.log("BEFORE SORTING -----------")
    for (let i = 0; i < this.population.length; i++) {
      console.log(i+":\n - "+this.population[i]+"\n - "+Algorithm.fitness(this.population[i], this.props.data))
    }
    console.log("SORTING -----------")
    this.population.sort((a, b) => Algorithm.fitness(b, this.props.data) - Algorithm.fitness(a, this.props.data))
    console.log("AFTER SORTING -----------")
    for (let i = 0; i < this.population.length; i++) {
      console.log(i+":\n - "+this.population[i]+"\n - "+Algorithm.fitness(this.population[i], this.props.data))
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
      score: Algorithm.fitness(this.population[0], this.props.data)
    })
    this.setState(state => {
      const outputMessages = state.outputMessages.concat("Selected Individual for generation "+generation+": ["+
                                                         this.selectedIndividualPerGen[generation].individual+"]. Score:"+
                                                         this.selectedIndividualPerGen[generation].score)
      return { outputMessages }
    })
  }

  async drawPathOfBestCandidate() {
    // await this.sleep(500)
    let selectedIndividualPath = new Array(this.props.data.numRows * this.props.data.numCols).fill(0)
    let step = 0
    let movements = this.population[0].slice(Algorithm.calculateNumOfBinaryDigitsForStartCell(this.props.data.numRows), this.population[0].length)
    let cell = Algorithm.calculateStartingCell(this.population[0], this.props.data.numRows)
    do {
      selectedIndividualPath[Algorithm.calculateOneDimensionalPos(cell.row, cell.col, this.props.data)] += 1
      this.setBestCandidatePath(selectedIndividualPath)
      this.setState(state => {
        const outputMessages = state.outputMessages.concat("Cell: ["+cell.col+","+cell.row+"] : "+
                               ACTIONS[Algorithm.getCellAction(cell.row, cell.col, this.props.data)].name+" : "+
                               Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, this.props.data)))
        return { outputMessages }
      })
      await this.sleep(1000)
      cell = Algorithm.calculateNextCell(cell, movements.slice(0, Algorithm.calculateNumBinaryDigitsForEachStep()))
      movements = movements.slice(Algorithm.calculateNumBinaryDigitsForEachStep(), movements.length)
      step++;
    } while (step < Algorithm.getNumSteps(this.props.data) + 1)
    return true
  }

  async handleStartEvolutionClick(e) {
    this.setState({isEvolutionInProgress: true})
    this.generatePopulation(AlgorithmConsts.DEFAULT_POPULATION_SIZE)
    let generation = 0;
    do {
      this.sortPopulationByScore()
      this.storeBestCandidateOfGeneration(generation)
      await this.drawPathOfBestCandidate()
      generation++;
    } while (generation < AlgorithmConsts.NUM_GENERATIONS)
    this.setState({isEvolutionInProgress: false})
  }

  render() {
    const gridWidthInVW = 90
    const cssValues = {
      "--numCols": this.props.data.numCols,
      "--gridWidth": gridWidthInVW+"vw",
      "--cellWidth": (gridWidthInVW / this.props.data.numCols)+"vw"
    }
    let cells = this.drawBoard();
    let messages = this.writeMessages();
    let className = 'map';
    return (
      <div className={className}>
        <div className="grid-container" style={cssValues}>
          {cells}
        </div>
        <StartButton clickHandler={this.handleStartEvolutionClick} isEvolutionInProgress={this.state.isEvolutionInProgress}/>
        <Output>
          {messages}
        </Output>
      </div>
    )
  }
}

export default Map