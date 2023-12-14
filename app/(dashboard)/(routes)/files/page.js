import React from 'react'
import { UserButton } from "@clerk/nextjs";
const files = () => {
  return (
    <div>
      file
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default files
