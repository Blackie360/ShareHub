"use client";
import React, { useEffect, useState } from 'react';
import UploadForm from './_components/UploadForm';
import { app } from '@/firebaseconfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useUser } from "@clerk/nextjs";
import generateRandomString from '@/app/Actions/GenerateRandom';
import { useRouter } from 'next/navigation';

const Upload = () => {
  const router = useRouter();
  const { user } = useUser();
  const db = getFirestore(app);
  const [fileDocId, setFileDocId] = useState('');
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [progress, setProgress] = useState();
  const storage = getStorage(app);

  const uploadFile = async (file) => {
    try {
      const metadata = {
        contentType: file.type,
      };

      const storageRef = ref(storage, 'file-upload/' + file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);

          // Upload completed successfully, now we can get the download URL
          if (uploadTask.snapshot.state === "success") {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              saveInfo(file, downloadURL);
            });
          }
        },
        (error) => {
          console.error('Error during upload:', error.message);
        },
        () => {
          // Upload completed successfully
          console.log('File uploaded successfully');
          // You can add any additional logic here if needed
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  // Random string 
  const randomString = () => {
    const length = 10; // You can adjust the length as needed
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
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
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + generateRandomString()
    });
    setFileDocId(docId);
    setUploadCompleted(true);
  };

  useEffect(() => {
    if (fileDocId) {
      console.log("Redirecting...");
      setTimeout(() => {
        console.log("Trying to redirect now");
        router.push('/preview/' + fileDocId);
      }, 2000);
    }
  }, [fileDocId]);

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
