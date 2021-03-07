const POSSIBLE_MOVES = 3

class Algorithm {
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

  static calculateNumBinaryDigitsForSteps(numSteps) {
    return Math.ceil(this._getBaseLog(2, POSSIBLE_MOVES)) * numSteps
  }

  static _getBaseLog(base, y) {
    return Math.log(y) / Math.log(base);
  }
}

export default Algorithm