"use client";
import { app } from '@/firebaseconfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftSquare } from 'lucide-react';
import FileInform from '../component/FileInform';
import FileShareForm from '../component/FileShareForm';

const FilePreview = ({params}) => {
  const db = getFirestore(app);
  const [file, setFile] = useState();
    useEffect(()=>{

        console.log(params?.fileId)
        params?.fileId&& getFileInfo();
    },[])
    const getFileInfo=async()=>{
      const docRef = doc(db, "uploadedFile", params?.fileId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setFile(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  return (
    <div>
     <Link href='/upload' className='flex gap-3'>  <ArrowLeftSquare /> </Link>
     <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
      <FileInform file={file} />
      <FileShareForm file={file} />
     </div>
    </div>
  )
}

export default FilePreview
