import React from 'react'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

const ToHeader = () => {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden'/>
      <Image src='/logo.svg' width={100} height={100} alt='logo' 
      className='md:hidden'/>
      <UserButton />

    </div>
  )
}

export default ToHeader
