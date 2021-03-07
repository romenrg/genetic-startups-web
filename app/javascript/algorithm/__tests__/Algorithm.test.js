import Algorithm from "../Algorithm";

describe("Algorithm tests", () => {
  it("binaryToDecimal", () => {
    expect(Algorithm.binaryToDecimal([1,1,1])).toBe(7)
  });
  it("calculateNumOfBinaryDigitsForStartCell", () => {
    expect(Algorithm.calculateNumOfBinaryDigitsForStartCell(10)).toBe(4)
  });
  it("calculateNumBinaryDigitsForSteps", () => {
    expect(Algorithm.calculateNumBinaryDigitsForSteps(47)).toBe(94)
  })
  it("calculateStartingCell (within range)", () => {
    expect(Algorithm.calculateStartingCell([1,0,0,1,1], 3)).toEqual({row: 2, col: 0})
  })
  it("calculateStartingCell (outside range, should be circular)", () => {
    expect(Algorithm.calculateStartingCell([1,1,0,1,1], 3)).toEqual({row: 0, col: 0})
  })
});