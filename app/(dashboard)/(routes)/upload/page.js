// Use dynamic import for useRouter and import useRouterReady directly
"use client"
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import UploadForm from './_components/UploadForm';
import { app } from '@/firebaseconfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useUser } from "@clerk/nextjs";

// Use dynamic import for useRouter
const useRouter = dynamic(() => import('next/router').then(mod => mod.useRouter), { ssr: false });
const useRouterReady = dynamic(() => import('next/router').then(mod => mod.useRouterReady), { ssr: false });

const Upload = () => {
  const { user } = useUser();
  const router = useRouter();
  const routerReady = useRouterReady();

  const [fileDocId, setFileDocId] = useState('');
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [progress, setProgress] = useState();

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
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + randomString()
    });

    setFileDocId(docId);
    setUploadCompleted(true);

  };

  useEffect(() => {
    console.log('redirecting started');

    if (fileDocId && router) {
      console.log('redirecting...');
      router.push('/preview/' + fileDocId);
    }

  }, [fileDocId, router]);

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
