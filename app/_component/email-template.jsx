import * as React from 'react';

export const EmailTemplate = ({ firstName }) => (
  <div className="bg-gray-900 text-white p-8 rounded-md">
    <h1 className="text-4xl font-bold mb-4">Welcome to ShareHub, {firstName}!</h1>
    <p className="text-lg mb-4">
      You've received a file from ShareHub. Click the link below to access it.
    </p>
    <a
      href="#your_file_link"
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-block"
    >
      Access Your File
    </a>
    <p className="mt-4 text-sm">
      If you have any questions or concerns, please contact our support team.
    </p>
  </div>
);
