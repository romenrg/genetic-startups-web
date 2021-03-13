import React from 'react'

function StartButton(props) {
  const isEvolutionInProgress = props.isEvolutionInProgress;
  const clickHandler = props.clickHandler;
  if (isEvolutionInProgress) {
    return (
      <button className="start-button" onClick={clickHandler} disabled>
        Evolution in progress
      </button>
    )
  }
  else {
    return (
      <button className="start-button" onClick={clickHandler}>
        Start Evolution
      </button>
    )
  }
}

export default StartButton;