import React from 'react'

function ActionButton(props) {
  const isEvolutionInProgress = props.isEvolutionInProgress;
  const clickHandler = props.clickHandler;
  let storyButtonDisplay = props.hide ? { visibility: "hidden" } : {}
  if (isEvolutionInProgress) {
    return (
      <button className="action-button" onClick={clickHandler} disabled style={storyButtonDisplay}>
        Evolution in progress...
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