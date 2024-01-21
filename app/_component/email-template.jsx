import React from 'react';
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';

const EmailTemplate = ({ fileName, fileSize, fileType, shortLink }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
  const user = useUser();

  return (
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
      <header>
        <a href="#">
          {/* Replace the src attribute with the path to your folder or cloud icon */}
          <Image width={20} height={20} className="w-auto h-7 sm:h-8" src="public/folder.webp" alt="Folder Icon" />
        </a>
      </header>

      <main className="mt-8">
        <h2 className="text-gray-700 dark:text-gray-200">Hi {user.email.split('@')[0] || 'User'},</h2>

        <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
          {fileName ? (
            <>
              <span>Someone has shared a file with you:</span>
              <div className="flex items-center mt-2">
                {/* Replace the svg element with the icon of your file type */}
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 19.02V5c0-1.104-.896-2-2-2H5c-1.104 0-2 .896-2 2v14.02M5 4v16.02c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V4M7 8h2m4 0h2m-6 4h12m-7 4l7-7" />
                </svg>
                <span className="font-semibold">{fileName}</span>
              </div>
              <p className="mt-2">File Size: {bytesToMB(fileSize)} MB</p>
              <p>File Type: {fileType}</p>
              <p>Short Link: {shortLink}</p>
            </>
          ) : (
            <span>You have a new message!</span>
          )}
        </p>

        {fileName && (
          <button className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            View File
          </button>
        )}

        <p className="mt-8 text-gray-600 dark:text-gray-300">
          Thanks, <br />
          {user.email && `${user.email.split('@')[0]} team`}
        </p>
      </main>

      <footer className="mt-8">
        <p className="text-gray-500 dark:text-gray-400">
          This email was sent to{' '}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank">
            {user.email}
          </a>
          . If you'd rather not receive this kind of email, you can{' '}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            unsubscribe
          </a>{' '}
          or{' '}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            manage your email preferences
          </a>
          .
        </p>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>
    </section>
  );
};

export default EmailTemplate;
