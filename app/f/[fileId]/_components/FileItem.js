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
    // Check if password protection is enabled and the entered password matches the file's password
    if (!file.password || (password === file.password)) {
      // Password is correct or no password is set, perform download action

      // Construct the download link
      const downloadLink = document.createElement('a');
      downloadLink.href = file.fileUrl;
      downloadLink.download = file.fileName;

      // Append the link to the document and trigger the click event
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Remove the link from the document
      document.body.removeChild(downloadLink);

      console.log('Password is correct. Downloading...');
      setIsPasswordCorrect(true);
    } else {
      // Password is incorrect
      console.log('Password is incorrect. Download failed.');
      setIsPasswordCorrect(false);
    }
  };

  const handleViewOnline = () => {
    // Check if password protection is enabled and the entered password matches the file's password
    if (!file.password || (password === file.password)) {
      // Password is correct or no password is set, redirect to the file URL for viewing online
      console.log('Password is correct. Redirecting to view online...');
      setIsPasswordCorrect(true);
      window.location.href = file.fileUrl;
    } else {
      // Password is incorrect
      console.log('Password is incorrect. View online failed.');
      setIsPasswordCorrect(false);
    }
  };

  return (
    <div className={`bg-white shadow-md p-8 rounded-md mb-8 w-full md:w-1/2 lg:w-1/3 xl:w-1/4
      ${isPasswordCorrect ? 'border-green-500' : 'border-red-500'}`}>
      {/* File Share Information */}
      <div className="mb-6">
        {userName && (
          <>
            <div className="text-lg font-semibold">
              <p className="text-lg font-semibold">
                <span className={`inline-block rounded px-2 py-1 mr-2
                  ${isPasswordCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                  {userName}
                </span> shared a file with you
              </p>
              <p className="text-gray-600">{fileType} - {fileSize} Bytes</p>
              <p className="text-gray-500">
                From:
                <span className={`inline-block rounded px-2 py-1 mr-2
                  ${isPasswordCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                  {userName}
                </span>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Lottie Animation */}
      <div className="mb-6">
        <Lottie options={lottieOptions} height={300} width={300} />
      </div>

      {/* Password Input (conditionally rendered) */}
      {file && file.password && file.password.length > 3 && (
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            className={`border p-2 w-full ${isPasswordCorrect ? 'border-green-500' : 'border-red-500'}`}
          />
          {!isPasswordCorrect && (
            <p className="text-red-500 mt-2">Incorrect password. Please try again.</p>
          )}
        </div>
      )}

      {/* Download and View Online Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleDownload}
          className={`flex items-center text-blue-500 hover:underline
            ${isPasswordCorrect ? 'hover:bg-green-100' : 'hover:bg-red-100'}`}
        >
          <Download className='w-12 h-12'/> Download
        </button>
        <button
          onClick={handleViewOnline}
          className={`flex items-center text-blue-500 hover:underline
            ${isPasswordCorrect ? 'hover:bg-green-100' : 'hover:bg-red-100'}`}
        >
          <Eye className="mr-1 w-12 h-12" /> View Online
        </button>
      </div>
    </div>
  );
};

export default FileItem;
