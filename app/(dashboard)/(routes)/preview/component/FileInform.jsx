import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const FileInform = ({ file, pdfPreviewUrl }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (pdfPreviewUrl) {
      console.log('PDF Preview URL:', pdfPreviewUrl);
      setFilePreview(pdfPreviewUrl);
    } else if (file?.fileUrl) {
      console.log('Image/File URL:', file.fileUrl);
      setFilePreview(file.fileUrl);
    }
  }, [pdfPreviewUrl, file]);
  

  if (!file) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  const { fileName, fileSize, fileType } = file;

  return (
    <div>
      <h2>File Information</h2>
      {filePreview ? (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={filePreview}
            alt={`File Preview - ${fileName}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      ) : (
        <div>No preview available for this file type</div>
      )}
      <p>File Name: {fileName}</p>
      <p>File Size: {bytesToMB(fileSize)} MB</p>
      <p>File Type: {fileType}</p>
    </div>
  );
};

export default FileInform;
