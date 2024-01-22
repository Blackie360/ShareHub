import React from 'react';

const EmailTemplate = ({ fileName, fileSize, fileType, shortLink, userName }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  return (
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900 shadow-md rounded-md">
      <main className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Hi there,</h2>

        <p className="leading-loose text-gray-600 dark:text-gray-300">
          {fileName ? (
            <>
              <span className="block mb-2">{userName} has shared a file with you:</span>
              <div className="flex items-center mb-2">
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
          <button
            onClick={() => window.open(shortLink, '_blank')}
            className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            View File
          </button>
        )}

        <p className="mt-8 text-gray-600 dark:text-gray-300">Thanks,</p>
      </main>

      <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p>
          This email was sent to you. If you'd rather not receive this kind of email, you can{' '}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            unsubscribe
          </a>{' '}
          or{' '}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            manage your email preferences
          </a>
          .
        </p>

        <p className="mt-3">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </footer>
    </section>
  );
};

export default EmailTemplate;
