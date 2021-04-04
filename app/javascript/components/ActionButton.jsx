import React from 'react'

function ActionButton(props) {
  const isEvolutionInProgress = props.isEvolutionInProgress;
  const clickHandler = props.clickHandler;
  if (isEvolutionInProgress) {
    return (
      <button className="action-button" onClick={clickHandler} disabled>
        Evolution in progress...
      </button>
    )
  }
  else {
    return (
      <button className="action-button" onClick={clickHandler}>
        {props.text}
      </button>
    )
  }
}

export default ActionButton;