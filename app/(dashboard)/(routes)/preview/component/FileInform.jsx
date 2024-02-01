import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const FileInform = ({ file, pdfPreviewUrl }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    setFilePreview(pdfPreviewUrl || file?.fileUrl);
  }, [pdfPreviewUrl, file]);

  if (!filePreview) {
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
      {fileType === 'application/pdf' ? (
        <iframe
          title={`PDF Preview - ${fileName}`}
          src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(filePreview)}`}
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        />
      ) : (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={filePreview}
            alt={`File Preview - ${fileName}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}
      <p>File Name: {fileName}</p>
      <p>File Size: {bytesToMB(fileSize)} MB</p>
      <p>File Type: {fileType}</p>
    </div>
  );
};

export default FileInform;
