import React from 'react'

const EmailTemplate = () => {
  return (
    <div className="bg-gray-100 p-4">
      <p className="text-lg font-bold">File Sharing Notification</p>
      <p className="text-gray-700">
        Dear User, you have received a file via our file-sharing app.
      </p>
      <a
        href="https://your-file-link"
        className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download File
      </a>
    </div>
  );
};

export default EmailTemplate;