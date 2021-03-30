import React, {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const SettingsPanel = () => {
  const history = useHistory();
  const handleOnClose = useCallback(() => history.push('/'), [history]);
  const handleEscKeydown = useCallback((event) => {
    if(event.keyCode === 27) {
      handleOnClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown, false);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown, false);
    };
  }, []);

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
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                  Settings
                </h2>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div className="absolute inset-0 px-4 sm:px-6">
                  <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true"></div>
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
