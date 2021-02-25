import React, { Component } from 'react'
import Advisor from "images/cells/advisor_greedy.jpg"

class Map extends Component {
  render() {
    const cellWidthHeight = 81
    const cssValues = {
      "--numCols": this.props.numCols,
      "--gridWidth": cellWidthHeight*this.props.numCols+"px"
    }
    var cells = []
    for (var i = 0; i < this.props.numRows * this.props.numCols; i++) {
      cells.push(<div className="cell"><img src={Advisor}/></div>)
    }
    let className = 'map';
    return (
      <div className={className}>
        <div className="grid-container" style={cssValues}>
          {cells}
        </div>
      </div>
    )
  }
}

export default Map