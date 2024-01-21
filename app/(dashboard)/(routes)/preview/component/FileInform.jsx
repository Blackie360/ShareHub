import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Spinner2 } from 'react-lucide';

const FileInform = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  useEffect(() => {
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // For PDF or DOC files, use the first page as the preview
        setPreviewUrl(`/api/pdf-preview?url=${encodeURIComponent(file.fileUrl)}`);
      } else {
        // For other file types, use the original file as the preview
        setPreviewUrl(file.fileUrl);
      }
    }
  }, [file]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>File Information</h2>
      {loading && <Spinner2 className="w-8 h-8 text-purple-500 animate-spin" />}
      <div className={`relative w-full h-64 mb-4 ${loading ? 'hidden' : ''}`}>
        <Image
          src={previewUrl}
          alt={`Uploaded File - ${file.fileName}`}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          onLoad={handleImageLoad}
        />
      </div>
      <p>File Name: {file.fileName}</p>
      <p>File Size: {bytesToMB(file.fileSize)} MB</p>
    </div>
  );
};

export default FileInform;
