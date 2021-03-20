import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Map from "../Map";

describe("Map component tests", () => {
  it("There should be a 'numRows * numCols' number of cells", () => {
    render(<Map data = { { numRows:4, numCols:2, cells:[0, 0, 0, 0, 0, 0, 0, 0] } }/>)
    expect(document.querySelectorAll(".cell").length).toBe(8)
  });
  it("There should be visited classes when evolution has started", () => {
    const { map } = render(<Map data = { { numRows:4, numCols:2, cells:[0, 1, 0, 2, 0, 1, 0, 0] } }/>)
    fireEvent.click(screen.getByText('Start Evolution'))
    let numVisitedCells = screen.getAllByTestId("visited-cell")
    expect(numVisitedCells.length).toBeGreaterThan(0)
  });
});
