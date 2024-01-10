import React, { useState } from 'react';

const FileShareForm = ({ file }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shortLink, setShortLink] = useState('');

  const handleShare = async () => {
    try {
      // Assuming 'file' has the required properties like 'fileUrl'
      const longUrl = file?.fileUrl;

      if (longUrl) {
        const generatedShortLink = generateShortLink();
        setShortLink(generatedShortLink);

        // Copy short link to clipboard
        copyToClipboard(generatedShortLink);
      } else {
        console.error('File URL is missing.');
      }
    } catch (error) {
      // Handle error
      console.error('Error generating short link:', error.message);
    }
  };

  const generateShortLink = () => {
    // Placeholder logic for generating a short link
    // Replace this with your actual logic
    const randomString = () => Math.random().toString(36).substring(7);
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${randomString()}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Short link copied to clipboard:', text);
      })
      .catch((err) => {
        console.error('Error copying to clipboard:', err);
      });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      {shortLink && (
        <div className="mb-4">
          <p className="text-gray-600">
            Short Link: 
            {' '}
            <span className="font-semibold">
              <a href={shortLink} target="_blank" rel="noopener noreferrer">
                {shortLink}
              </a>
            </span>
            {' '}
            <button
              className="text-blue-500 underline cursor-pointer"
              onClick={() => copyToClipboard(shortLink)}
            >
              📋 Copy
            </button>
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Share File</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleShare}
      >
        Share File
      </button>
    </div>
  );
};

export default FileShareForm;
