"use client"  
import {app} from "@/firebaseconfig"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import React, {useEffect, useState} from "react"
import FileItem from "./component/FileItem"



const FileView = ({params}) => {
    const db =getFirestore(app);
    const [file, setFile] = useState();
   
    useEffect(()=>{
        params?.fileId && getFileInfo();
    },[])
    const getFileInfo=async()=>{
        const docRef = doc(db, "uploadedFile", params?.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setFile(docsnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            
        }
    }
  return (
    <div className="bg-slate-100 h-screen w-full flex justify-center items-center flex-col gap-4">
        <FileItem file={file}/>
    </div>
  )
}

export default FileView