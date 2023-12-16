"use client";
import React from 'react';
import UploadForm from './_components/UploadForm';
import { app } from '@/firebaseconfig';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const Upload = () => {
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

  return (
    <div className="p-5 px-8 md:px-8">
      <h2 className="text-[20px] text-center m-5">
        <strong>
          Start <span className="text-purple-700">Uploading</span> file and{' '}
          <span className="text-purple-700">share</span>
        </strong>
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} />
    </div>
  );
};

export default Upload;
