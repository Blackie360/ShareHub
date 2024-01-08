"use client";
import { app } from '@/firebaseconfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react'

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
      preview
    </div>
  )
}

export default FilePreview
