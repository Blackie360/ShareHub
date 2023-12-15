"use client"
import React, { useState} from 'react'
import { Upload } from 'lucide-react'
import {File} from 'lucide-react'
import {Shield} from 'lucide-react'
import Image from 'next/image'

const SideNav = () => {
  const menuList = [
    {
      id:1,
      name: 'Upload',
      icon: Upload,
      path: '/upload'
    },
    {
      id:2,
      name: 'file',
      icon: File,
      path: '/files'
    },
    {
      id:3,
      name: 'Upgrade',
      icon: Shield,
      path: '/upgrade'
    }
  ]
  const [activeIndex, setActiveIndex]= useState(0);

  return (
    <div className='bg-white text-black shadow-sm border-r h-full'>
      <div className=' p-5 border-b'>
        <Image 
        src='/logo.svg'
        width={100}
        height={100}
        alt='logo'
        />
      </div>
     <div className='flex flex-col float-left w-full'>
     {menuList.map((item, index) => (
        <div key={item.id} className='flex items-center p-5 border-b'>
          <button 
          className={`flex gap-2 p-4 px-0 hover:bg-gray-100 w-full text-xl text-gray-500
          ${activeIndex == index? 'bg-blue-200 text-blue-900': null}`}
          onClick={() => setActiveIndex(index)}
          >
          <item.icon className='mr-3' size={20} />
          <span>{item.name}</span>
          </button>
        </div>
      ))}
     </div>
    </div>
  )
}

export default SideNav
