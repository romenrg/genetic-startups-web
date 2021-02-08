import React, { Component } from 'react'

class Map extends Component {
  render() {
    const cellWidthHeight = 81
    const cssValues = {
      "--numCols": this.props.numCols,
      "--gridWidth": cellWidthHeight*this.props.numCols+"px"
    }
    var cells = []
    for (var i = 0; i < this.props.numRows * this.props.numCols; i++) {
      cells.push(<div className="cell">{i}</div>)
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