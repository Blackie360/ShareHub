"use client";
import { app } from '@/firebaseconfig';
import { getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react'

const FilePreview = ({params}) => {
  const db = getFirestoreFirestore(appp);
    useEffect(()=>{

        console.log(params?.fileId)
    },[])
    const 
  return (
    <div>
      preview
    </div>
  )
}

export default FilePreview
