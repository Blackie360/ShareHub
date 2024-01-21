import React from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const FileInform = ({ file }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  if (!file) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
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
      <p>File Size: {bytesToMB(file.fileSize)} MB</p>
    </div>
  );
};

export default FileInform;
