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
      const uploadTask = uploadBytesResumable(storageRef, file, file.type);

      uploadTask.on('state_changed', snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      }, error => {
        console.error('Error uploading file:', error.message);
      }, async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          saveInfo(file, downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error.message);
        }
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const saveInfo = async (file, downloadURL) => {
    try {
      const docId = randomString();
      const userId = user?.id || randomString(); // Use user ID if available, otherwise generate a random one

      const docRef = doc(db, "uploadedFile", docId);

      await setDoc(docRef, {
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
        fileUrl: downloadURL,
        userId: userId, 
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        password: '',
        id: docId,
        shortUrl: process.env.NEXT_PUBLIC_BASE_URL + randomString()
      });

      console.log("Document successfully written!");

      router.push('/preview/' + docId);
    } catch (error) {
      console.error('Error saving document:', error);
    }
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