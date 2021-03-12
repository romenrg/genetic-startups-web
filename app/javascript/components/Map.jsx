import React, { Component } from 'react'
import Algorithm from "../algorithm/Algorithm";
import Advisor from "images/cells/advisor_greedy.jpg"
import Circus from "images/cells/startups_circus.jpg"
import Team from "images/cells/entrepreneur_team.jpg"
import Product from "images/cells/product_release.jpg"
import Feedback from "images/cells/entrepreneur_customer_feedback.jpg"
import Investor from "images/cells/investor.jpg"
import Doubts from "images/cells/entrepreneur_starting.jpg"
import Sales from "images/cells/entrepreneur_success.jpg"
import BadNews from "images/cells/entrepreneur_failure.jpg"

const DEFAULT_POPULATION_SIZE = 25

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = { selectedIndividualPath: new Array(this.props.data.numRows * this.props.data.numCols) }
    this.handleStartEvolutionClick = this.handleStartEvolutionClick.bind(this);
  }

  getCellContentFromValue(value) {
    let image = <div className='cell-none'></div>
    switch (value) {
      case 1:
        image = <img src={Advisor}/>
        break;
      case 2:
        image = <img src={Circus}/>
        break;
      case 3:
        image = <img src={Team}/>
        break;
      case 4:
        image = <img src={Product}/>
        break;
      case 5:
        image = <img src={Feedback}/>
        break;
      case 6:
        image = <img src={Investor}/>
        break;
      case 7:
        image = <img src={Doubts}/>
        break;
      case 8:
        image = <img src={Sales}/>
        break;
      case 9:
        image = <img src={BadNews}/>
        break;
    }
    return image
  }

  drawBoard() {
    var cells = []
    for (var i = 0; i < this.props.data.numRows; i++) {
      for (var j = 0; j < this.props.data.numCols; j++) {
        let cellClasses = "cell"
        if (this.state.selectedIndividualPath[Algorithm.calculateOneDimensionalPos(i, j, this.props.data)]) {
          cellClasses += " highlight"
        }
        cells.push(<div className={cellClasses}>{this.getCellContentFromValue(Algorithm.getCellAction(i, j, this.props.data))}</div>)
      }
    }
    return cells
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

  async selectBestCandidate() {
    this.selectedIndividual = this.population[0]
    let selectedIndividualPath = new Array(this.props.data.numRows * this.props.data.numCols)
    let step = 0
    let movements = this.selectedIndividual.slice(Algorithm.calculateNumOfBinaryDigitsForStartCell(this.props.data.numRows), this.selectedIndividual.length)
    let cell = Algorithm.calculateStartingCell(this.selectedIndividual, this.props.data.numRows)
    do {
      selectedIndividualPath[Algorithm.calculateOneDimensionalPos(cell.row, cell.col, this.props.data)] = true
      this.setBestCandidatePath(selectedIndividualPath)
      await this.sleep(1000)
      cell = Algorithm.calculateNextCell(cell, movements.slice(0, Algorithm.calculateNumBinaryDigitsForEachStep()))
      movements = movements.slice(Algorithm.calculateNumBinaryDigitsForEachStep(), movements.length)
      step++;
    } while (step < Algorithm.getNumSteps(this.props.data) + 1)
  }

  handleStartEvolutionClick(e) {
    this.generatePopulation(DEFAULT_POPULATION_SIZE)
    this.sortPopulationByScore()
    this.selectBestCandidate()
  }

  render() {
    const cellWidthHeight = 81
    const cssValues = {
      "--numCols": this.props.data.numCols,
      "--gridWidth": cellWidthHeight*this.props.data.numCols+"px"
    }
    let cells = this.drawBoard();
    let className = 'map';
    return (
      <div className={className}>
        <div className="grid-container" style={cssValues}>
          {cells}
        </div>
        <button className="start-button" onClick={this.handleStartEvolutionClick}>
          Start Evolution
        </button>
      </div>
    )
  }
}

export default Map