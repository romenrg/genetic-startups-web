import React from 'react'

function ActionButton(props) {
  const isExecutionInProgress = props.isExecutionInProgress;
  const clickHandler = props.clickHandler;
  let storyButtonHiddenClass = props.hide ? "action-button-hidden" : ""
  if (isExecutionInProgress) {
    return (
      <button className={"action-button " + storyButtonHiddenClass} onClick={clickHandler} disabled>
        Execution in progress...
      </button>
    )
  }
  else {
    return (
      <button className={"action-button " + storyButtonHiddenClass} onClick={clickHandler}>
        {props.text}
      </button>
    )
  }
}

export default ActionButton;