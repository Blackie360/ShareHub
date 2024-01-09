
import React from 'react';
import Image from 'next/image';

const FileInform = ({ file }) => {
  if (!file) {
    return <div>Loading...</div>;
  }

  const { fileUrl, fileName, fileSize } = file;

  return (
    <div>
      <h2>File Information</h2>
      <div className="relative w-full h-64 mb-4">
        <Image
          src={fileUrl}
          alt={`Uploaded File - ${fileName}`}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <p>File Name: {fileName}</p>
      <p>File Size: {fileSize} bytes</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default FileInform;
