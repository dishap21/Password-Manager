import React from "react";
import { faClose, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dialog({ isOpen, onClose, title, message, confirmText, cancelText, onConfirm}) {
  if(!isOpen) return null;
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`${
        isOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} size="xl"/>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <FontAwesomeIcon icon={faCircleExclamation} className="h-10 w-10"/>
            <h3 className="mb-5 text-lg text-gray-700 font-semibold mt-3">
              {title}
            </h3>
            <p className="mb-5 text-gray-">
              {message}
            </p>
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button
              type="button"
              className="py-2.5 px-5 ml-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-300 border-gray-600 hover:text-white hover:bg-gray-700"
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
