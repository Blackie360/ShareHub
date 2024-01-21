// FileShareForm.jsx

import React, { useState } from 'react';
import Globalapi from 'app/Actions/Globalapi';
import { useUser } from "@clerk/nextjs";
import { Eye, EyeOff } from 'lucide-react';

const FileShareForm = ({ file, onShare, onPasswordSave }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const user = useUser();

  const handleShare = async () => {
    try {
      const longUrl = file?.fileUrl;

      if (longUrl) {
        const generatedShortLink = generateShortLink();
        setShortLink(generatedShortLink);

        copyToClipboard(generatedShortLink);

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);

        const shareData = {
          email,
          password,
          shortLink: generatedShortLink,
        };

        onShare(shareData);
      } else {
        console.error('File URL is missing.');
      }
    } catch (error) {
      console.error('Error generating short link:', error.message);
    }
  };

  const generateShortLink = () => {
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

  const handlePasswordSave = () => {
    onPasswordSave(password);
  };

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file?.fileName,
      fileSize: file?.fileSize,
      fileType: file?.fileType,
      shortLink: shortLink,
    };

    Globalapi.SendEmail(data)
      .then((resp) => {
        console.log('Email API Response:', resp);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Share File</h2>

      <div className="mb-4">
        {shortLink && (
          <div className="mb-2">
            <p className="text-gray-600">
              Short Link:{' '}
              <span className="font-semibold">
                <a href={shortLink} target="_blank" rel="noopener noreferrer">
                  {shortLink}
                </a>
              </span>{' '}
              <button
                className="text-blue-500 underline cursor-pointer"
                onClick={() => {
                  copyToClipboard(shortLink);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
              >
                {isCopied ? 'Copied! 🎉' : '📋 Copy'}
              </button>
            </p>
          </div>
        )}

        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-600">Password</label>
        <div className="flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            className="mt-1 p-2 w-full border rounded-md pr-10"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button
          className="mt-2 text-sm text-blue-500 underline cursor-pointer rounded-md"
          onClick={handlePasswordSave}
        >
          Save Password
        </button>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => {
          handleShare();
          sendEmail();
        }}
      >
        Share File
      </button>
    </div>
  );
};

export default FileShareForm;
