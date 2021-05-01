import React from 'react'
import { render, fireEvent, screen, waitForElement } from '@testing-library/react'
import Map from "../Map";
import { createServer } from "miragejs"

let server

beforeEach(() => {
  server = createServer()
  server.get('/api/v1/content', () => [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
  ])
})

afterEach(() => {
  server.shutdown()
})

describe("Map component tests", () => {
  it("There should be a 'numRows * numCols' number of cells", async () => {
    // render(<Map data = { { numRows:4, numCols:2, cells:[0, 0, 0, 0, 0, 0, 0, 0] } }/>)
    const { container } = render(<Map areSettingsShown={false} setAreSettingsShown={undefined}/>)
    await waitForElement(() => container.querySelector('.cell'))
    // areSettingsShown={areSettingsShown} setAreSettingsShown={setAreSettingsShown}
    expect(document.querySelectorAll(".cell").length).toBe(128)
  });
  it("There should be visited classes when evolution has started", async () => {
    // render(<Map data = { { numRows:4, numCols:2, cells:[0, 1, 0, 2, 0, 1, 0, 0] } }/>)
    const { container } = render(<Map areSettingsShown={false} setAreSettingsShown={undefined}/>)
    await waitForElement(() => container.querySelector('.cell'))
    fireEvent.click(screen.getByText('Start evolution'))
    await waitForElement(() => screen.getAllByTestId("visited-cell"))
    let numVisitedCells = screen.getAllByTestId("visited-cell").length
    expect(numVisitedCells).toBeGreaterThan(0)
  });
});
