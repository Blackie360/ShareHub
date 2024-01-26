// FileItem.jsx
import React from 'react';
import { useUser } from "@clerk/nextjs";
import { Eye } from 'lucide-react';
import Lottie from 'react-lottie';
import animationData from 'public/file.json';

const FileItem = ({ file }) => {
  const { user } = useUser();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-md mb-4">
      {/* File Share Information */}
      <div className="mb-4">
        {user && (
          <>
            <p className="text-lg font-semibold">{user.username} shared a file with you</p>
            <p className="text-gray-600">{file?.fileType} - {file?.fileSize} MB</p>
            <p className="text-gray-500">From: {user.username} </p>
          </>
        )}
      </div>

      {/* Lottie Animation */}
      <div className="mb-4">
        <Lottie options={{ loop: true, autoplay: true, animationData }} height={64} width={64} />
      </div>

      {/* Download and View Online Actions */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center text-blue-500 hover:underline">
          Download
        </button>
        <button className="flex items-center text-blue-500 hover:underline">
          <Eye className="mr-1" /> View Online
        </button>
      </div>
    </div>
  );
}

export default FileItem;
