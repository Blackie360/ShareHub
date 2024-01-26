// FileItem.jsx
import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { Eye, Download } from 'lucide-react';
import Lottie from 'react-lottie';
import animationData from 'public/file.json';

const FileItem = ({ file }) => {
  const { user } = useUser();
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDownload = () => {
    // Check if the entered password matches the file's password
    if (password === file?.password) {
      // Password is correct, perform download action
      console.log('Password is correct. Downloading...');
      setIsPasswordCorrect(true);
      // Add your download logic here
    } else {
      // Password is incorrect
      console.log('Password is incorrect. Download failed.');
      setIsPasswordCorrect(false);
    }
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
            <p className="text-gray-500">From: <span className="inline-block text-purple-700  rounded px-2 py-1 mr-2">
                {userName}
              </span></p>
          </div>
          </>
        )}
      </div>

      {/* Lottie Animation */}
      <div className="mb-6">
        <Lottie options={lottieOptions} height={300} width={300} />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          className="border border-gray-300 p-2 w-full"
        />
        {!isPasswordCorrect && (
          <p className="text-red-500 mt-2">Incorrect password. Please try again.</p>
        )}
      </div>

      {/* Download and View Online Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleDownload}
          className="flex items-center text-blue-500 hover:underline"
        >
          <Download className='w-12 h-12'/> Download
        </button>
        <button className="flex items-center text-blue-500 hover:underline">
          <Eye className="mr-1 w-12 h-12" /> View Online
        </button>
      </div>
    </div>
  );
}

export default FileItem;
