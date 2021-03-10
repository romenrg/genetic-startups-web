const POSSIBLE_MOVES = 3

class Algorithm {
  static fitness(map, individual) {
    let score = 0;
    let step = 0;
    let cell = this.calculateStartingCell(individual, map.props.numRows)
    let movements = individual.slice(this.calculateNumOfBinaryDigitsForStartCell(map.props.numRows), individual.length)
    do {
      score += map.getCellValue(cell.row, cell.col); //TODO: Should be the actual value, not the action num
      cell = Algorithm.calculateNextCell(cell, movements.slice(0, this.calculateNumBinaryDigitsForEachStep()))
      movements = movements.slice(Algorithm.calculateNumBinaryDigitsForEachStep(), movements.length)
      step++;
    } while (step < map.numSteps + 1)
    return score;
  }

  static calculateStartingCell(individual, numRows) {
    let numOfBinaryDigitsForStartingRow = this.calculateNumOfBinaryDigitsForStartCell(numRows)
    let startRowInBinary = individual.slice(0,numOfBinaryDigitsForStartingRow)
    let potentialStartRowInDecimal = this.binaryToDecimal(startRowInBinary)
    let startRowInDecimal = potentialStartRowInDecimal % numRows
    let startCell = { row: startRowInDecimal, col: 0}
    return startCell
  }

  //TODO: If out of bounds, don't move?
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
    return Math.ceil(this._getBaseLog(2, POSSIBLE_MOVES))
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

export default Algorithm