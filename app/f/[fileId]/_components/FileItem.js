// FileItem.jsx
import React from 'react';
import { useUser } from "@clerk/nextjs";
import { Eye } from 'lucide-react';
import Lottie from 'react-lottie';
import animationData from 'public/file.json';

const FileItem = ({ file }) => {
  const { user } = useUser();

  // Check if user is available from Clerk or use default values
  const userName = user?.username || file?.userName || "Anonymous User";
  const fileType = file?.fileType || "Unknown Type";
  const fileSize = file?.fileSize || "Unknown Size";

  // Lottie animation options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <div className="bg-white  shadow-md p-8 rounded-md mb-8 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      {/* File Share Information */}
      <div className="mb-6">
        {userName && (
          <>
          <div className="text-lg font-semibold">
            <p className="text-lg font-semibold"><span className="inline-block text-purple-700  rounded px-2 py-1 mr-2">
                {userName}
              </span> shared a file with you</p>
            <p className="text-gray-600">{fileType} - {fileSize} Bytes</p>
            <p className="text-gray-500">From: {userName}</p>
            </div>
          </>
        )}
      </div>

      {/* Lottie Animation */}
      <div className="mb-6">
        <Lottie options={lottieOptions} height={128} width={128} />
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
