import * as React from 'react'
import {render} from '@testing-library/react'
import Map from "../Map";

describe("Map component tests", () => {
  it("First JS test", () => {
      expect(true).toBeTruthy()
  });
  it("There should be a 'numRows * numCols' number of cells", () => {
    render(<Map numRows="4" numCols="2" matrix="0 0 0 0 0 0 0 0"/>)
    expect(document.querySelectorAll(".cell").length).toBe(8)
  });
});
