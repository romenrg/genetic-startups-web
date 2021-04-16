import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ActionButton from "./ActionButton";
import DisplayOptions from "../algorithm/Display"

const SettingsPanel = (props) => {
  const history = useHistory();
  const [numRows, setNumRows] = useState(props.numRows);
  const [numCols, setNumCols] = useState(props.numCols);
  const [display, setDisplay] = useState(props.display);
  const handleOnClose = useCallback(() => history.push('/'), [history]);
  const handleEscKeydown = useCallback((event) => {
    if(event.keyCode === 27) {
      handleOnClose();
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSetRowsCols(parseInt(numRows), parseInt(numCols));
    console.log("Display is: "+display)
    props.handleDisplay(parseInt(display));
    handleOnClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown, false);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown, false);
    };
  }, []);

  let selectOptions = Object.keys(DisplayOptions).map(key => {
    return (
      <option value={DisplayOptions[key].value}>{DisplayOptions[key].text}</option>
    )
  });

  return (
    <section className="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
              <button className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={handleOnClose}>
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 sm:px-6">
                <h2 className="text-2xl font-medium text-gray-900" id="slide-over-title">
                  Settings
                </h2>
              </div>
              <div className="mt-5 relative flex-1 px-4 sm:px-6">
                <div className="absolute inset-0 px-4 sm:px-6">
                  <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true">
                    <form className="m-4">
                      <div className="mb-6 settings-map-size">
                        <h3 className="text-xl font-medium text-gray-900">Map size</h3>
                        <div className="flex flex-col mb-4">
                          <label for="num-rows-input" className="mb-2 font-medium text-grey-darkest">Number of rows:</label>
                          <input type="number" name="num-rows-input" value={numRows} onChange={e => setNumRows(e.target.value)}
                                 className="border py-2 px-3 text-grey-darkest cursor-text" disabled={props.isEvolutionInProgress} />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label for="num-cols-input" className="mb-2 font-medium text-grey-darkest">Number of columns:</label>
                          <input type="number" name="num-cols-input" value={numCols}  onChange={e => setNumCols(e.target.value)}
                                 className="border py-2 px-3 text-grey-darkest cursor-text" disabled={props.isEvolutionInProgress} />
                        </div>
                      </div>
                      <div className="mb-6 settings-display">
                        <h3 className="text-xl font-medium text-gray-900">Display</h3>
                        <div className="flex flex-col mb-4">
                          <label htmlFor="display-select" className="mb-2 font-medium text-grey-darkest">Choose information to display:</label>
                          <select name="display-select" className="border py-2 px-3 text-grey-darkest cursor-pointer"
                                  value={display} onChange={e => setDisplay(e.target.value)} disabled={props.isEvolutionInProgress}>
                            {selectOptions}
                          </select>
                        </div>
                      </div>
                      <ActionButton clickHandler={handleSubmit} isEvolutionInProgress={props.isEvolutionInProgress} text="Save changes" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPanel;
