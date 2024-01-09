import React from 'react';
import Image from 'next/image';

const FileInform = ({ fileUrl, fileName, fileSize }) => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">File Information</h2>
     
      <div className="relative w-full h-64 mb-4">
        <Image
          src={fileUrl}
          alt="Uploaded File"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      
      <p className="text-gray-600">File Name: {fileName}</p>
      <p className="text-gray-600">File Size: {fileSize}</p>
    
    </div>
  );
};

export default FileInform;
