// _component/email-template.jsx

import React from 'react';
import { useUser } from "@clerk/nextjs";

const EmailTemplate = ({ userName, fileName, fileSize, fileType, shortLink }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  const formattedUserName = userName ? userName.split('@')[0] : ''; 

  return (
    <div>
      <h1>Welcome, {formattedUserName || 'User'}!</h1>
      {fileName && (
        <div>
          <p>File Information:</p>
          <p>File Name: {fileName}</p>
          <p>File Size: {bytesToMB(fileSize)} MB</p>
          <p>File Type: {fileType}</p>
          <p>Short Link: {shortLink}</p>
        </div>
      )}
    </div>
  );
};

export default EmailTemplate;