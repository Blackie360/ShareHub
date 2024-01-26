"use client";

import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebaseconfig";
import FileItem from "./_components/FileItem";  

const FileView = ({ params }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState();

  useEffect(() => {
    params?.fileId && getFileInfo();
  }, [params?.fileId]);

  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFile(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="bg-slate-100 h-screen w-full flex justify-center items-center flex-col gap-4">
      <FileItem file={file} />
    </div>
  );
};

export default FileView;
