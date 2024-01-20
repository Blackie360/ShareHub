// _component/email-template.jsx
import * as React from 'react';

const EmailTemplate = ({ emailToSend, userName, fileName, fileSize, fileType, shortLink }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  return (
    <div>
      <h1>Welcome, {userName.split("@")[0]}!</h1>
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
