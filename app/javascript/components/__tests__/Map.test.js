import React from 'react'
import { render, fireEvent, screen, waitForElement, waitFor } from '@testing-library/react'
import Map from "../Map";
import { createServer } from "miragejs"

let server

beforeAll(() => {
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

afterAll(() => {
  server.shutdown()
})

describe("Map component tests", () => {
  it("There should be a 'numRows * numCols' number of cells", async () => {
    const { container } = render(<Map areSettingsShown={false} setAreSettingsShown={undefined}/>)
    await waitFor(() => {
      expect(container.querySelectorAll(".cell").length).toBe(128)
    })
  });
  it("There should be visited classes when evolution has started", async () => {
    const { container } = render(<Map areSettingsShown={false} setAreSettingsShown={undefined}/>)
    await waitFor(() => {
      expect(container.querySelectorAll(".cell").length).toBe(128)
    })
    fireEvent.click(screen.getByText('Start evolution'))
    const visitedCells = await screen.findAllByTestId("visited-cell")
    let numVisitedCells = visitedCells.length
    expect(numVisitedCells).toBeGreaterThan(0)
  });
});
