// Import necessary modules
"use client";
import React, { useEffect, useState } from 'react';
import UploadForm from './_components/UploadForm';
import { app } from '@/firebaseconfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/router';

// Define the Upload component
const Upload = () => {
  const { user } = useUser();
  const db = getFirestore(app);
  const [fileDocId, setFileDocId] = useState('');
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [progress, setProgress] = useState();

  // Function to upload a file
  const uploadFile = async (file) => {
    try {
      const metadata = {
        contentType: file.type,
      };

      const storageRef = ref(getStorage(app), 'file-upload/' + file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);

          if (uploadTask.snapshot.state === "success") {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              saveInfo(file, downloadURL);
            });
          }
        },
        (error) => {
          console.error('Error during upload:', error.message);
        },
        () => {
          console.log('File uploaded successfully');
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  // Function to generate a random string
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

  // Function to save file information
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
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + randomString(),
    });
    setFileDocId(docId);
    setUploadCompleted(true);
  };

  const router = useRouter();

  // useEffect to handle redirection after upload completion
  useEffect(() => {
    const redirectUser = async () => {
      if (uploadCompleted) {
        console.log("Redirecting...");
        try {
          await router.push('/preview/' + fileDocId);
          console.log("Redirected successfully");
        } catch (error) {
          console.error("Error redirecting:", error.message);
        }
      }
    };

    redirectUser();
  }, [uploadCompleted, fileDocId, router]);

  // Render the UploadForm component
  return (
    <div className="p-5 px-8 md:px-8">
      <h2 className="text-[20px] text-center m-5">
        <strong>
          Start <span className="text-purple-700">Uploading</span> file and{' '}
          <span className="text-purple-700">share</span>
        </strong>
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
    </div>
  );
};

export default Upload;
