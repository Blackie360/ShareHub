import React from 'react';
import Image from 'next/image';

const EmailTemplate = ({ firstName, file }) => {
  return (
    <div className="max-w-screen-md mx-auto p-4 border border-gray-300 rounded-md">
      <div className="text-center mb-6">
        <Image src="https://img.freepik.com/free-vector/blue-folder-with-information-about-employee-3d-illustration-cartoon-drawing-folder-with-files-documents-3d-style-white-background-business-recruitment-management-organization-concept_778687-707.jpg?w=740&t=st=1705417637~exp=1705418237~hmac=608fed0d847e081a79561dd4d9bdb73374e388d651451c839a98a10859bd9262" 
        alt="Logo" className="w-20 h-20 mx-auto mb-2" />
        <p className="text-xl font-bold">Message from Sharehub</p>
      </div>

      <div className="mb-4">
        <p className="text-lg">Hello, {firstName}!</p>
        <p className="text-gray-600 mt-2">You have received a file through Sharehub.</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <p className="text-lg font-semibold">File Information:</p>
        <p className="text-gray-600 mt-2">File Name: {file?.fileName}</p>
        <p className="text-gray-600">File Size: {file?.fileSize}</p>
      </div>

      <div className="text-center">
        <p className="text-gray-600">
          This message is from Sharehub. Please do not reply to this email.
        </p>
      </div>
    </div>
  );
};

export default EmailTemplate;
