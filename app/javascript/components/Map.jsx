import React, { Component } from 'react'
import {Algorithm, AlgorithmConsts} from "../algorithm/Algorithm";
import StartButton from "./StartButton";
import Output from "./Output";

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndividualPath: new Array(this.props.data.numRows * this.props.data.numCols).fill(0),
      isEvolutionInProgress: false,
      outputMessages: ["Map -> numCols:"+this.props.data.numCols+"; numRows:"+this.props.data.numRows+"; cells: ["+this.props.data.cells+"]"]
    }
    this.selectedIndividualPerGen =[]
    this.handleStartEvolutionClick = this.handleStartEvolutionClick.bind(this);
  }

  cellTagFromActionValue(value) {
    let cellClass = "cell-content "
    switch (value) {
      case 1:
        cellClass += "cell-advisor"
        break;
      case 2:
        cellClass += "cell-circus"
        break;
      case 3:
        cellClass += "cell-team"
        break;
      case 4:
        cellClass += "cell-product"
        break;
      case 5:
        cellClass += "cell-feedback"
        break;
      case 6:
        cellClass += "cell-investor"
        break;
      case 7:
        cellClass += "cell-doubts"
        break;
      case 8:
        cellClass += "cell-sales"
        break;
      case 9:
        cellClass += "cell-badnews"
        break;
      default:
        cellClass += "cell-none"
        break
    }
    return <div className={cellClass}/>
  }

  drawBoard() {
    let cells = []
    for (let i = 0; i < this.props.data.numRows; i++) {
      for (let j = 0; j < this.props.data.numCols; j++) {
        let cellClasses = "cell"
        let cellNumVisits = this.state.selectedIndividualPath[Algorithm.calculateOneDimensionalPos(i, j, this.props.data)]
        if (cellNumVisits) {
          cellClasses += " highlight-"+cellNumVisits
        }
        cells.push(<div className={cellClasses}>{this.cellTagFromActionValue(Algorithm.getCellAction(i, j, this.props.data))}</div>)
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
    this.setState({
      outputMessages: this.state.outputMessages.concat("Selected Individual for generation "+generation+": ["+
                                                       this.selectedIndividualPerGen[generation].individual+"]. Score:"+
                                                       this.selectedIndividualPerGen[generation].score)
    })
  }

  async drawPathOfBestCandidate() {
    let selectedIndividualPath = new Array(this.props.data.numRows * this.props.data.numCols).fill(0)
    let step = 0
    let movements = this.population[0].slice(Algorithm.calculateNumOfBinaryDigitsForStartCell(this.props.data.numRows), this.population[0].length)
    let cell = Algorithm.calculateStartingCell(this.population[0], this.props.data.numRows)
    do {
      selectedIndividualPath[Algorithm.calculateOneDimensionalPos(cell.row, cell.col, this.props.data)] += 1
      this.setBestCandidatePath(selectedIndividualPath)
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