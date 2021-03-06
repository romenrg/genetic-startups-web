import React from "react";
import ACTIONS from "./Actions";

let AlgorithmVars = {
  POPULATION_SIZE: 100,
  NUM_GENERATIONS: 20
}

const AlgorithmConsts = {
  POSSIBLE_MOVES: 3,
  CELL_OUT_OF_MAP_ACTION: 9
}

class Algorithm {

  static selectRandomValue(action) {
    let randomValueIndex = Math.floor(Math.random() * ACTIONS[action].values.length)
    return ACTIONS[action].values[randomValueIndex]
  }

  static story(individualGenotype, mapData) {
    let cellsValues = []
    let totalStoryScore = 0;
    let step = 0;
    let cell = this.calculateStartingCell(individualGenotype, mapData.numRows)
    let movements = individualGenotype.slice(this.calculateNumOfBinaryDigitsForStartCell(mapData.numRows), individualGenotype.length)
    do {
      let selectedRandomValue = this.selectRandomValue(Algorithm.getCellAction(cell.row, cell.col, mapData))
      cellsValues.push(selectedRandomValue)
      totalStoryScore += selectedRandomValue.score;
      cell = Algorithm.calculateNextCell(cell, movements.slice(0, this.calculateNumBinaryDigitsForEachStep()))
      movements = movements.slice(Algorithm.calculateNumBinaryDigitsForEachStep(), movements.length)
      step++;
    } while (step < Algorithm.getNumSteps(mapData) + 1)
    return {cellsValues: cellsValues, totalStoryScore: totalStoryScore}
  }

  static fitness(individualGenotype, mapData) {
    let score = 0;
    let step = 0;
    let cell = this.calculateStartingCell(individualGenotype, mapData.numRows)
    let movements = individualGenotype.slice(this.calculateNumOfBinaryDigitsForStartCell(mapData.numRows), individualGenotype.length)
    do {
      score += Algorithm.calculateScore(Algorithm.getCellAction(cell.row, cell.col, mapData));
      cell = Algorithm.calculateNextCell(cell, movements.slice(0, this.calculateNumBinaryDigitsForEachStep()))
      movements = movements.slice(Algorithm.calculateNumBinaryDigitsForEachStep(), movements.length)
      step++;
    } while (step < Algorithm.getNumSteps(mapData) + 1)
    return score;
  }

  static selection(numIndividuals, sortedPopulation) {
    return sortedPopulation.slice(0, numIndividuals).map( x => {
      x.from = "selection"
      return x
    })
  }

  static crossover(numIndividuals, sortedPopulation) {
    let individualLength = sortedPopulation[0].genotype.length
    let splitIndex = Math.floor(individualLength / 2)
    let resultingIndividuals = []
    for (let i = 0; i < numIndividuals; i+=2) {
      let tmpCrossedIndividualGenotype
      let randomIndexFirstIndividual = Math.floor(Math.random() * sortedPopulation.length)
      let randomIndexSecondIndividual = Math.floor(Math.random() * sortedPopulation.length)
      while (sortedPopulation.length > 1 && randomIndexSecondIndividual === randomIndexFirstIndividual)
        randomIndexSecondIndividual = Math.floor(Math.random() * sortedPopulation.length)
      tmpCrossedIndividualGenotype = sortedPopulation[randomIndexFirstIndividual].genotype.slice(0, splitIndex)
      tmpCrossedIndividualGenotype = tmpCrossedIndividualGenotype.concat(sortedPopulation[randomIndexSecondIndividual].genotype.slice(splitIndex, individualLength))
      resultingIndividuals.push({genotype: tmpCrossedIndividualGenotype, from: "crossover"})
      tmpCrossedIndividualGenotype = sortedPopulation[randomIndexSecondIndividual].genotype.slice(0, splitIndex)
      tmpCrossedIndividualGenotype = tmpCrossedIndividualGenotype.concat(sortedPopulation[randomIndexFirstIndividual].genotype.slice(splitIndex, individualLength))
      resultingIndividuals.push({genotype: tmpCrossedIndividualGenotype, from: "crossover"})
    }
    return resultingIndividuals
  }

  static mutation(numIndividuals, sortedPopulation) {
    let resultingIndividuals = []
    for (let i = 0; i < numIndividuals; i++) {
      let randomIndexIndividualToMutate = Math.floor(Math.random() * sortedPopulation.length)
      let tmpIndividualGenotypeToMutate = [...sortedPopulation[randomIndexIndividualToMutate].genotype]
      let indexOfRandomGeneToMutate = Math.floor(Math.random() * tmpIndividualGenotypeToMutate.length)
      tmpIndividualGenotypeToMutate[indexOfRandomGeneToMutate] = (1 - tmpIndividualGenotypeToMutate[indexOfRandomGeneToMutate])
      resultingIndividuals.push({genotype: tmpIndividualGenotypeToMutate, from: "mutation"})
    }
    return resultingIndividuals
  }

  static calculateScore(action) {
    const sumObj = ACTIONS[action].values.reduce((partialsum, nextValue) => {
      partialsum = {score: partialsum.score + nextValue.score}
      return partialsum
    });
    return sumObj.score / ACTIONS[action].values.length
  }

  static calculateStartingCell(individualGenotype, numRows) {
    let numOfBinaryDigitsForStartingRow = this.calculateNumOfBinaryDigitsForStartCell(numRows)
    let startRowInBinary = individualGenotype.slice(0,numOfBinaryDigitsForStartingRow)
    let potentialStartRowInDecimal = this.binaryToDecimal(startRowInBinary)
    let startRowInDecimal = potentialStartRowInDecimal % numRows
    let startCell = { row: startRowInDecimal, col: 0}
    return startCell
  }

  static calculateNextCell(previousCell, movement) {
    let newCell = { row: previousCell.row, col: previousCell.col }
    if (this._isMovingRight(movement)) {
      newCell.col += 1;
    }
    else if (this._isMovingDown(movement)) {
      newCell.row += 1;
    }
    else if (this._isMovingLeft(movement)) {
      newCell.col -= 1;
    }
    else if (this._isMovingUp(movement)) {
      newCell.row -= 1;
    }
    return newCell
  }

  static binaryToDecimal(binary) {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
      if (binary[(binary.length - i) - 1] === 1) {
        decimal += 2 ** i;
      }
    }
    return decimal
  };

  static calculateNumOfBinaryDigitsForStartCell(numRows) {
    return Math.ceil(this._getBaseLog(2, numRows))
  }

  static calculateNumBinaryDigitsForEachStep() {
    return Math.ceil(this._getBaseLog(2, AlgorithmConsts.POSSIBLE_MOVES))
  }

  static getNumSteps(mapData) {
    return Math.floor(mapData.numCols * 1.75)
  }

  static calculateOneDimensionalPos(row, col, mapData) {
    return col * mapData.numRows + row;
  }

  static getCellAction(row, col, mapData) {
    if (this._isCellInMap(row, col, mapData)) {
      return mapData.cells[Algorithm.calculateOneDimensionalPos(row, col, mapData)]
    }
    else {
      return AlgorithmConsts.CELL_OUT_OF_MAP_ACTION
    }
  }

  static _isCellInMap(row, col, mapData) {
    return ((row >= 0) && (col >= 0) && (row < mapData.numRows) && (col < mapData.numCols))
  }

  static _getBaseLog(base, y) {
    return Math.log(y) / Math.log(base);
  }

  static _isMovingRight(movement) {
    return ((movement[0] === 0) && (movement[1] === 0)) || ((movement[0] === 1) && (movement[1] === 0));
  }

  static _isMovingDown(movement) {
    return (movement[0] === 0) && (movement[1] === 1);
  }

  static _isMovingLeft(movement) {
    return false;
  }

  static _isMovingUp(movement) {
    return (movement[0] === 1) && (movement[1] === 1);
  }
}

export {
  Algorithm,
  AlgorithmConsts,
  AlgorithmVars
}