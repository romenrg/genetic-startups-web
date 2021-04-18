import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ActionButton from "./ActionButton";
import DisplayOptions from "../algorithm/Display"

const SettingsPanel = (props) => {
  const [numRows, setNumRows] = useState(props.numRows);
  const [numCols, setNumCols] = useState(props.numCols);
  const [display, setDisplay] = useState(props.display);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSetRowsCols(parseInt(numRows), parseInt(numCols));
    props.handleDisplay(parseInt(display));
    props.setAreSettingsShown(false);
  };

  let selectOptions = Object.keys(DisplayOptions).map(key => {
    return (
      <option key={DisplayOptions[key].value} value={DisplayOptions[key].value}>{DisplayOptions[key].text}</option>
    )
  });

  return (
    <Transition.Root show={props.areSettingsShown} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={props.areSettingsShown} onClose={() => props.setAreSettingsShown(false)}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => props.setAreSettingsShown(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-2xl font-medium text-gray-900">Settings</Dialog.Title>
                  </div>
                  <div className="mt-5 relative flex-1 px-4 sm:px-6">
                    <form className="m-4">
                      <div className="mb-6 settings-map-size">
                        <h3 className="text-xl font-medium text-gray-900">Map size</h3>
                        <div className="flex flex-col mb-4">
                          <label htmlFor="num-rows-input" className="mb-2 font-medium text-grey-darkest">Number of
                            rows:</label>
                          <input type="number" name="num-rows-input" value={numRows}
                                 onChange={e => setNumRows(e.target.value)}
                                 className="border py-2 px-3 text-grey-darkest cursor-text"
                                 disabled={props.isEvolutionInProgress}/>
                        </div>
                        <div className="flex flex-col mb-4">
                          <label htmlFor="num-cols-input" className="mb-2 font-medium text-grey-darkest">Number of
                            columns:</label>
                          <input type="number" name="num-cols-input" value={numCols}
                                 onChange={e => setNumCols(e.target.value)}
                                 className="border py-2 px-3 text-grey-darkest cursor-text"
                                 disabled={props.isEvolutionInProgress}/>
                        </div>
                      </div>
                      <div className="mb-6 settings-display">
                        <h3 className="text-xl font-medium text-gray-900">Display</h3>
                        <div className="flex flex-col mb-4">
                          <label htmlFor="display-select" className="mb-2 font-medium text-grey-darkest">Choose
                            information to display:</label>
                          <select name="display-select" className="border py-2 px-3 text-grey-darkest cursor-pointer"
                                  value={display} onChange={e => setDisplay(e.target.value)}
                                  disabled={props.isEvolutionInProgress}>
                            {selectOptions}
                          </select>
                        </div>
                      </div>
                      <ActionButton clickHandler={handleSubmit} isEvolutionInProgress={props.isEvolutionInProgress}
                                    text="Save changes"/>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
};

export default SettingsPanel;
