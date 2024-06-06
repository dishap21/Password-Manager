import React from 'react';
import { comps } from '@/utils/comps';
import { UserAuth } from '../context/AuthContext';

export default function Comp1() {
  const { user } = UserAuth();
  const passLength = user.passwords.length;
  return (
    <div className='flex flex-col space-y-1 h-fit m-3 md:w-1/3 p-5 rounded-2xl bg-zinc-100'>
        <p className='text-green-500 text-4xl pb-2'>{ passLength }</p>
        <p className='font-bold text-lg text-black'>{ comps.text }</p>
        <p className='text-gray-400'>{ comps.desc} </p>
    </div>
  )
}
