"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

import { Upload } from 'lucide-react';
import { File } from 'lucide-react';
import { Shield } from 'lucide-react';
import Image from 'next/image';

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: 'Upload',
      path: '/upload',
      icon: Upload 
    },
    {
      id: 2,
      name: 'Files',
      path: '/files',
      icon: File
    },
    {
      id: 3,
      name: 'Upgrade',
      path: '/upgrade',
      icon: Shield
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='bg-white text-black shadow-sm border-r h-full'>
     
      <div className='p-5 border-b'>
        <Image src='/folder.png' width={100} height={100} alt='logo' />
      </div>


      
      <div className='flex flex-col w-full lg:w-56'>
        {menuList.map((item, index) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`flex items-center p-5 border-b cursor-pointer
                ${activeIndex === index ? 'bg-blue-200 text-blue-900' : 'hover:bg-gray-100'}`}
              onClick={() => handleMenuItemClick(index)}
            >
              <div className='flex lg:gap-2 p-4 px-0 text-xl text-gray-500'>
                <item.icon />
                <span>{item.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
