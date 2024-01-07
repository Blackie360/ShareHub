"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { app } from '@/firebaseconfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore'; 
import { useUser } from "@clerk/nextjs";
import UploadForm from './_components/UploadForm';

const Upload = () => {

  const { user } = useUser();

  const [fileDocId, setFileDocId] = useState('');
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [progress, setProgress] = useState();

  const router = useRouter();

  const db = getFirestore(app);

  const randomString = () => {
    const length = 10;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const uploadFile = async (file) => {
    try {
      const metadata = { contentType: file.type };
      const storageRef = ref(getStorage(app), 'file-upload/' + file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on('state_changed', snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);

        if (uploadTask.snapshot.state === "success") {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            saveInfo(file, downloadURL);
          });
        }
      });

    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const saveInfo = async (file, downloadURL) => {
    
    const docId = randomString();

    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: downloadURL,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + randomString()
    });

    router.push('/preview/' + docId);

  };

  return (
    <div>
      <h2>Upload and Share</h2>

      <UploadForm
        uploadBtnClick={(file) => uploadFile(file)}
        progress={progress} 
      />

    </div>
  );

};

export default Upload;