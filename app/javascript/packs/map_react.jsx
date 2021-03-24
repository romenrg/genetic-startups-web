// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from "../components/App";

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById("map_props")
  const numRows = parseInt(node.getAttribute('numRows'))
  const numCols = parseInt(node.getAttribute('numCols'))
  const cells = node.getAttribute('cells').split(' ').map(Number)
  const data = {
    numRows: numRows,
    numCols: numCols,
    cells: cells,
  }
  ReactDOM.render(
    <App data={data}/>,
    document.getElementById('react-app-container'),
  )
})
