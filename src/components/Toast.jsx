import { faXmark, faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Toast({message, show, onClose}) {
  if(!show){
    return null;
  }
  return (
    <div className="fixed top-4 right-4 z-50">
      <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-600 bg-white rounded-lg shadow text-xl space-x-3" role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-7 h-7 text-blue-500 bg-blue-100 rounded-lg">
          <FontAwesomeIcon icon={faGears} />
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <FontAwesomeIcon icon={faXmark} className='h-6 w-6'/>
        </button>
      </div>
    </div>
  );
};
