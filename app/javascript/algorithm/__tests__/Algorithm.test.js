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
  it("calculateNextCell (2nd option for move right)", () => {
    expect(Algorithm.calculateNextCell({ row: 1, col: 1}, [1,0])).toEqual({row: 1, col: 2})
  })
  it("getCellAction", () => {
    let mapData = {numRows: 2, numCols: 2, cells: [0, 1, 2, 0]}
    let actionNumber = Algorithm.getCellAction(0, 1, mapData)
    expect(actionNumber).toBe(2)
  })
  it("getCellAction (outside map)", () => {
    let mapData = {numRows: 2, numCols: 2, cells: [0, 1, 2, 0]}
    let actionNumber = Algorithm.getCellAction(2, 1, mapData)
    expect(actionNumber).toBe(9)
  })
  it("fitness",() => {
    let mapData = {numRows: 2, numCols: 2, cells: [0, 3, 6, 0]}
    let score = Algorithm.fitness([0, 0, 1, 0, 0, 1, 1, 0, 0], mapData)
    expect(score).toBe(32)
  })
  it("fitness (goes outside map after first move)",() => {
    let mapData = {numRows: 2, numCols: 2, cells: [0, 1, 2, 0]}
    let score = Algorithm.fitness([0, 1, 1, 1, 1, 1, 1, 1, 1], mapData)
    expect(score).toBe(-220)
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
  it("selection", () => {
    let population = [[0, 0, 1, 0, 0, 1, 1, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1]]
    expect(Algorithm.selection(1, population)).toEqual([[0, 0, 1, 0, 0, 1, 1, 0, 0]])
  })
  it("crossover", () => {
    let population = [[0, 0, 1, 0, 0, 1, 1, 0, 0], [1, 0, 0, 0, 1, 1, 1, 0, 0]]
    let crossoverResult = Algorithm.crossover(2, population)
    expect(crossoverResult.length).toBe(2)
    expect(crossoverResult).toContainEqual([0, 0, 1, 0, 1, 1, 1, 0, 0])
    expect(crossoverResult).toContainEqual([1, 0, 0, 0, 0, 1, 1, 0, 0])
  })
  it("mutation", () => {
    let population = [[0, 0, 1, 0, 0, 1, 1, 0, 0]]
    let mutationResult = Algorithm.mutation(1, population)
    expect(mutationResult.length).toBe(1)
    let countDifferences = 0
    for (let i = 0; i < population[0].length; i++) {
      if (population[0][i] !== mutationResult[0][i]) {
        countDifferences++
      }
    }
    expect(countDifferences).toBe(1)
  })
});