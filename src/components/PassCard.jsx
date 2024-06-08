import { UserAuth } from '@/app/context/AuthContext';
import axios from 'axios';
import { NextResponse } from 'next/server';
import React, { useState } from 'react';
import Toast from './Toast';

export default function PassCard() {
  const {user} = UserAuth();
  const uid = user._id;
  const [website, setWebsite] = useState('');
  const [uName, setUName] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const savePassword = async (e) => {
    //e.preventDefault();
    try{
      const response = axios.post('api/savePassword', {uid, website, uName, password});
      if((await response).status==200){
        handleShowToast();
        console.log("Successfull");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
      return NextResponse.json({message: "Password saved successfully."}, {status: 200})
    }catch(error){
      console.log(error);
      return NextResponse.json({message: "error storing password."}, {status: 500})
    }
  };


  return (
    <form className="space-y-6" action={ savePassword }>
      {showToast && (
          <Toast
            message="Password saved successfully."
            show={showToast}
            onClose={() => setShowToast(false)}
          />
      )}
        <h5 className="text-xl font-medium text-black">Add Password</h5>
        <div>
            <label for="website" className="w-full block mb-2 text-sm font-medium text-black">Website Link</label>
            <input type="text" name="website" value={website} id="website" onChange={(e) => setWebsite(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://company.com" required />
        </div>
        <div>
            <label for="uname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Username</label>
            <input type="text" name="uname" value={uName} id="uname" onChange={(e) => setUName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="passAlpha_09" required />
        </div>
        <div>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
            <input type="text" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Save Password</button>
    </form>
  )
};