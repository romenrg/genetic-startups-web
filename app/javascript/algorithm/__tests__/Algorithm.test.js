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
});