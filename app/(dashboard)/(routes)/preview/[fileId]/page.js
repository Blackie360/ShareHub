"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftSquare } from 'lucide-react';
import FileInform from '../component/FileInform';
import FileShareForm from '../component/FileShareForm';

import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '@/firebaseconfig';

const FilePreview = ({ params }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState();

  useEffect(() => {
    console.log(params?.fileId);
    params?.fileId && getFileInfo();
  }, []);

  const getFileInfo = async () => {
    const docRef = doc(db, 'uploadedFile', params?.fileId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setFile(docSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const onPasswordSave = async (password) => {
    const docRef = doc(db, 'uploadedFile', params?.fileId);

    await updateDoc(docRef, {
      password: password,
    });

   
    const updatedDoc = await getDoc(docRef);
    console.log('Updated Document:', updatedDoc.data())
   
  };

  return (
    <div>
      <Link href='/upload' className='flex gap-3'>
        <ArrowLeftSquare w-12 h-12 />
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
        <FileInform file={file} />
        <FileShareForm file={file} onPasswordSave={(password) => onPasswordSave(password)} />
      </div>
    </div>
  );
};

export default FilePreview;
