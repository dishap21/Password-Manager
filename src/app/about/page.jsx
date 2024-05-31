import React from 'react';
import { aboutApp } from '@/utils/about';
import Link from 'next/link';
import { description } from '@/utils/desc';
import Image from 'next/image';

export default function about() {
  return (
    <div className='container mx-auto my-5 pr-10 pl-10 flex flex-col justify-center items-center'>
        <p className='font-bold text-4xl text-center'>{ aboutApp.title }</p>
        <p className='mt-3 font-medium text-center'>{ aboutApp.intro }</p>
        <div className='md:flex md:gap-4'>
            <Image
            src='/images/lock.png'
            alt="Lock"
            width={600}
            height={600}
            />
            <div className='pt-4'>
                <p className='mt-5 text-2xl text-center font-semibold'> Features </p>
                <ul className='text-center mb-5'>
                    { aboutApp.features.map((data, ind) => (
                            <li key={ind} className='gap-2 m-4'>
                                <p className='font-semibold text-lg'>{ data.key }:</p>
                                <p className='text-base'>{ data.value }</p>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
        <p className='mt-3 font-medium text-center'>{ aboutApp.outro }</p>
        <Link href={description.self} rel="noopener noreferrer" target="_blank">
            <p className='max-w-fit mt-3 text-xl font-bold text-blue-400 hover:text-blue-700 hover:border-b-2 hover:border-zinc-950'>
                { aboutApp.credits }
            </p>
        </Link>
    </div>
  )
}
