import React from 'react';

export default function PassCard() {
  return (
    <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-black">Add Password</h5>
        <div>
            <label for="website" className="w-full block mb-2 text-sm font-medium text-black">Website Link</label>
            <input type="text" name="website" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://company.com" required />
        </div>
        <div>
            <label for="uname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Username</label>
            <input type="text" name="uname" id="uname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="passAlpha_09" required />
        </div>
        <div>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
            <input type="text" name="password" id="password" placeholder="••••••••"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Save Password</button>
    </form>
  )
};