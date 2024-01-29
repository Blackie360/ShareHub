"use client";
import React, { useState } from 'react';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { Upload, File, Shield } from 'lucide-react';  // Import all icons at once

const ToHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  return (
    <div className='flex flex-col md:flex-row p-5 border-b justify-items-start gap-4'>
 
  <div className='md:hidden text-left'>
    <AlignJustify className='cursor-pointer' onClick={toggleMobileMenu} />
  </div>

  

 
  <div className="lg:flex lg:items-end lg:justify-end md:text-right items-end">
  <UserButton className="lg:mt-4" />
</div>


  
  <div className={`md:hidden ${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col items-center mt-4`}>
    {menuList.map((item) => (
      <div key={item.id} className='mb-2 text-gray-700 hover:text-gray-900 flex items-center cursor-pointer' onClick={() => window.location.href = item.path}>
        <item.icon className='mr-2' />
        <span>{item.name}</span>
      </div>
    ))}
  </div>
</div>

  );
};

export default ToHeader;
