import React from 'react';

const EmailTemplate = ({ firstName, file }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    {file && (
      <div>
        <p>File Information:</p>
        <p>File Name: {file.fileName}</p>
        <p>File Size: {file.fileSize}</p>
        {/* Add any other file information you want to display */}
      </div>
    )}
  </div>
);

export default EmailTemplate;
