import {Algorithm} from "../Algorithm";

describe("Algorithm tests", () => {
  it("binaryToDecimal", () => {
    expect(Algorithm.binaryToDecimal([1,1,1])).toBe(7)
  });
  it("calculateNumOfBinaryDigitsForStartCell", () => {
    expect(Algorithm.calculateNumOfBinaryDigitsForStartCell(10)).toBe(4)
  });
  it("calculateNumBinaryDigitsForSteps", () => {
    expect(Algorithm.calculateNumBinaryDigitsForEachStep()).toBe(2)
  })
  it("calculateStartingCell (within range)", () => {
    expect(Algorithm.calculateStartingCell([1,0,0,1,1], 3)).toEqual({row: 2, col: 0})
  })
  it("calculateStartingCell (outside range, should be circular)", () => {
    expect(Algorithm.calculateStartingCell([1,1,0,1,1], 3)).toEqual({row: 0, col: 0})
  })
  it("calculateNextCell (2 option for move right)", () => {
    expect(Algorithm.calculateNextCell({ row: 1, col: 1}, [1,0])).toEqual({row: 1, col: 2})
  })
  it("getCellAction", () => {
    let mapData = {numRows: 2, numCols: 2, cells: [0, 1, 2, 0]}
    let actionNumber = Algorithm.getCellAction(0, 1, mapData)
    expect(actionNumber).toBe(2)
  })
  it("fitness",() => {
    let mapData = {numRows: 2, numCols: 2, cells: [0, 1, 2, 0]}
    let score = Algorithm.fitness([0, 0, 1, 0, 0, 1, 1, 0, 0], mapData)
    expect(score).toBe(3)
  })
  it("calculateScore", () =>{
    expect(Algorithm.calculateScore(0)).toBe(0)
    expect(Algorithm.calculateScore(1)).toBe(-32)
    expect(Algorithm.calculateScore(2)).toBe(-15)
    expect(Algorithm.calculateScore(3)).toBe(10)
    expect(Algorithm.calculateScore(4)).toBe(29)
    expect(Algorithm.calculateScore(5)).toBe(41)
    expect(Algorithm.calculateScore(6)).toBe(77)
    expect(Algorithm.calculateScore(7)).toBe(-2)
    expect(Algorithm.calculateScore(8)).toBe(104)
    expect(Algorithm.calculateScore(9)).toBe(-55)
  })
});