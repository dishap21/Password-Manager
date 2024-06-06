import React from 'react';
import { comps2 } from '@/utils/comps';
import { UserAuth } from '../context/AuthContext';

export default function Comp2() {
  const { user } = UserAuth();
  const passLength = user.passwords.length;
  return (
    <div className='flex flex-col space-y-1 h-fit m-3 md:w-1/3 p-5 rounded-2xl bg-zinc-100'>
        <p className='text-red-600 text-4xl pb-2'>{ passLength }</p>
        <p className='font-bold text-lg text-black'>{ comps2.text }</p>
        <p className='text-gray-400'>{ comps2.desc} </p>
    </div>
  )
}
