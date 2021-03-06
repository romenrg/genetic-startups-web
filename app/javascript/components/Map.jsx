import React, { Component } from 'react'
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
const POSSIBLE_MOVES = 4

class Map extends Component {

  constructor(props) {
    super(props)
    this.numSteps = this.props.numCols + this.props.numRows // TODO: Maybe another prp in future
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

  getCellValue(row, col) {
    return this.props.matrix[col * this.props.numRows + row]
  }

  createBoard() {
    var cells = []
    for (var i = 0; i < this.props.numRows; i++) {
      for (var j = 0; j < this.props.numCols; j++) {
        cells.push(<div className="cell">{this.getCellContentFromValue(this.getCellValue(i, j))}</div>)
      }
    }
    return cells
  }

  getBaseLog(base, y) {
    return Math.log(y) / Math.log(base);
  }

  generatePopulation(populationSize) {
    let numOfBinaryDigitsForStartCells = Math.ceil(this.getBaseLog(2, this.props.numRows))
    let numOfBinaryDigitsForSteps = Math.ceil(this.getBaseLog(2, POSSIBLE_MOVES)) * this.numSteps
    alert("Population size: "+populationSize+"\n"+
          "Number of rows: "+this.props.numRows+"\n"+
          "Number of binary digits for start cell: "+numOfBinaryDigitsForStartCells+"\n"+
          "Number of cols: "+this.props.numCols+"\n"+
          "Number of steps: "+this.numSteps+"\n"+
          "Number of binary digits for steps: "+numOfBinaryDigitsForSteps)
  }

  handleStartEvolutionClick(e) {
    this.generatePopulation(DEFAULT_POPULATION_SIZE)
  }

  render() {
    const cellWidthHeight = 81
    const cssValues = {
      "--numCols": this.props.numCols,
      "--gridWidth": cellWidthHeight*this.props.numCols+"px"
    }
    var cells = this.createBoard();
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