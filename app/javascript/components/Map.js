import React, { Component } from 'react'

class Map extends Component {
  render() {
    let className = 'map';
    return (
      <div className={className}>
        <div className="grid">
          <div className="row">
            <div className="col">A</div>
            <div className="col">B</div>
            <div className="col">C</div>
            <div className="col">D</div>
            <div className="col">E</div>
          </div>
          <div className="row">
            <div className="col">F</div>
            <div className="col">G</div>
            <div className="col">H</div>
            <div className="col">I</div>
            <div className="col">J</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Map