import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Document, Page } from 'react-pdf';

const FileInform = ({ file, pdfPreviewUrl }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
  const [filePreview, setFilePreview] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    if (pdfPreviewUrl) {
      console.log('PDF Preview URL:', pdfPreviewUrl);
      setFilePreview(pdfPreviewUrl);
    } else if (file?.fileUrl) {
      console.log('Image/File URL:', file.fileUrl);
      setFilePreview(file.fileUrl);
    }
  }, [pdfPreviewUrl, file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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
          {fileType === 'application/pdf' ? (
            <Document file={filePreview} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={1} width={200} />
            </Document>
          ) : (
            <Image
              src={filePreview}
              alt={`File Preview - ${fileName}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          )}
        </div>
      ) : (
        <div>No preview available </div>
      )}
      <p>File Name: {fileName}</p>
      <p>File Size: {bytesToMB(fileSize)} MB</p>
      <p>File Type: {fileType}</p>
      {numPages && <p>Number of Pages: {numPages}</p>}
    </div>
  );
};

export default FileInform;
