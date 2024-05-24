import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { description } from '@/utils/desc';

export default function Navbar() {
  return (
    <nav className='flex justify-between m-3 p-3'>
        <div className='flex font-bold text-xl'>
            <FontAwesomeIcon icon={faLock} className='h-6 w-6 pr-2'/>
            <h2 className='text-blue-400'>Pass</h2>
            <h2>Guard</h2>
        </div>
        <div>
            <ul className='flex gap-3'>
                <Link href='about'><li className='text-base font-medium'>About</li></Link>
                <Link href={description.github} rel="noopener noreferrer" target="_blank">
                  <li>
                    <FontAwesomeIcon icon={faGithub} className='overflow-hidden h-6 w-6'/>
                  </li>
                </Link>
            </ul>
        </div>
    </nav>
  )
}
