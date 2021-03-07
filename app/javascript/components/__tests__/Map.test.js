import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Map from "../Map";

describe("Map component tests", () => {
  it("First JS test", () => {
      expect(true).toBeTruthy()
  });
  it("There should be a 'numRows * numCols' number of cells", () => {
    render(<Map numRows="4" numCols="2" matrix="0 0 0 0 0 0 0 0"/>)
    expect(document.querySelectorAll(".cell").length).toBe(8)
  });
  it("", () => {
    render(<Map numRows="4" numCols="2" matrix="0 0 0 0 0 0 0 0"/>)
    fireEvent.click(screen.getByText('Start Evolution'))
    expect(document.querySelectorAll(".cell.highlight").length).toBeGreaterThan(0)
    // expect(document.querySelectorAll(".cell.highlight").length).toBe(0)
  });
});
