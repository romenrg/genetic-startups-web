// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Map from "../components/Map";

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById("map_props")
  const numRows = node.getAttribute('numRows')
  const numCols = node.getAttribute('numCols')
  const matrix = node.getAttribute('matrix').split(' ').map(Number)
  ReactDOM.render(
    <Map numRows={numRows} numCols={numCols} matrix={matrix}/>,
    document.getElementById('main'),
  )
})
