import React from 'react';
import ACTIONS from "../algorithm/Actions";
import {Algorithm} from "../algorithm/Algorithm";

const Info = () => {
  let actionsInfo = []
  ACTIONS.forEach( (action, i) => {
    let evenRow = i % 2 ? "even-row" : "odd-row"
    let values = action.values.map(value => {
      return (
        <div className="info-item-value">
          <span className="info-item-value-number">{value.score}: </span>
          <span className="info-item-value-msg">{value.msg}</span>
        </div>
      )
    })
    actionsInfo.push(<>
                       <div className={"info-item-image-container "+evenRow}>
                         <div className={"info-item-image cell-"+action.name}/>
                       </div>
                       <span className={evenRow}>{action.name}</span>
                       <div className={"info-item-values-list "+evenRow}>
                         {values}
                       </div>
                       <span className={evenRow}>{Algorithm.calculateScore(i)}</span>
                       <span className={evenRow}>{action.description}</span>
                     </>)
  })
  return (
    <div id="info">
      <h2>Algorithm details</h2>
      <p>In the map, multiple different cell types can be found. Each type represents a possible event in the life of the
         startup. And each one can have different impacts on the startup. For that reason, each one has 10 possible values
         and a score (the average of those possible values).</p>
      <div className="info-grid">
        <span className="info-item-title">Element</span>
        <span className="info-item-title">Name</span>
        <span className="info-item-title">Possible values</span>
        <span className="info-item-title">Score</span>
        <span className="info-item-title">Description</span>
        {actionsInfo}
      </div>
    </div>
  );
};

export default Info;
