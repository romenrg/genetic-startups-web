import React, { Component } from 'react'

class Map extends Component {
  render() {
    const cssValues = {
      "--numCols": '6',
      "--gridWidth": '486px'
    }
    let className = 'map';
    return (
      <div className={className}>
        <div className="grid-container" style={cssValues}>
          <div className="cell">A</div>
          <div className="cell">B</div>
          <div className="cell">C</div>
          <div className="cell">D</div>
          <div className="cell">E</div>
          <div className="cell">F</div>
          <div className="cell">G</div>
          <div className="cell">H</div>
          <div className="cell">I</div>
          <div className="cell">J</div>
          <div className="cell">K</div>
          <div className="cell">L</div>
        </div>
      </div>
    )
  }
}

export default Map