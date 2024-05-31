import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PassDrawer({ isVisible, toggleDrawer }) {
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } bg-white w-80 dark:bg-white`}
    >
      <p className="inline-flex items-center mb-6 text-lg font-semibold text-gray-500 dark:text-gray-900">
        Edit Password
      </p>
      <button
        type="button"
        onClick={toggleDrawer}
        className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <FontAwesomeIcon icon={faClose} size="xl" className=""/>
        <span className="sr-only">Close menu</span>
      </button>
      <form className="mb-6">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-black"
          >
            Website
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-black"
          >
            Username
          </label>
          <input
            type="text"
            id="subject"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Let us know how we can help you"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
          ></input>
        </div>
        <button
          type="submit"
          className="text-white w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 block"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
