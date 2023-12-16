"use client"
import React from 'react'
import UploadForm from './_components/UploadForm'

const upload = () => {
  return (
    <div className='p-5 px-8 md:px-8'>
      <h2 className='text-[20px] text-center m-5'>
        <strong >Start <span className='text-purple-700'>Uploading</span> file  and <span className='text-purple-700'>share</span> </strong>
      </h2>
     <UploadForm />
    </div>
  )
}

export default upload
