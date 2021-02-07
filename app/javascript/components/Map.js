import React, { Component } from 'react'

class Map extends Component {
  render() {
    let className = 'map';
    return (
      <div className={className}>
        <div className="grid-container">
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
        </div>
      </div>
    )
  }
}

export default Map