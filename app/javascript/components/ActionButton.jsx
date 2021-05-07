import React from 'react'

function ActionButton(props) {
  const isExecutionInProgress = props.isExecutionInProgress;
  const clickHandler = props.clickHandler;
  let storyButtonDisplay = props.hide ? { visibility: "hidden" } : {}
  if (isExecutionInProgress) {
    return (
      <button className="action-button" onClick={clickHandler} disabled style={storyButtonDisplay}>
        Execution in progress...
      </button>
    )
  }
  else {
    return (
      <button className="action-button" onClick={clickHandler} style={storyButtonDisplay}>
        {props.text}
      </button>
    )
  }
}

export default ActionButton;