import { useState } from "react";
import React from 'react';
import AlertMsg from "./AlertMsg";
import FilePreview from "./FilePreview";
import ProgressiveBar from "./ProgressiveBar";

const UploadForm = ({ uploadBtnClick, progress }) => {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const onFileSelect = (file) => {
    if (!file) {
      return;
    }

    const allowedFileTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedFileTypes.includes(file.type)) {
      setErrorMsg("Invalid file type. Please upload SVG, PNG, JPG, GIF, PDF, or DOC files.");
      setFile(null);
      return;
    }

    if (file.size > 5000000) {
      setErrorMsg("Maximum file size allowed is 5MB.");
      setFile(null);
      return;
    }

    setErrorMsg(null);
    setFile(file);
  };

  return (
    <div className='text-center'>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-slate-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 outline-dashed outline-2 outline-offset-2">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-4 text-purple-500 dark:text-purple-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-lg text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or <span className="text-purple-500 text-xl"> drag </span>and   <span className="text-purple-500 text-xl"> drop</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, GIF, PDF, or DOC (MAX: 5MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden"
            onChange={(event) => onFileSelect(event.target.files[0])} />
        </label>
      </div>

      {errorMsg ? <AlertMsg msg={errorMsg} /> : null}
      {file ? <FilePreview file={file} removeFile={() => setFile(null)} /> : null}

      {progress > 0 ? <ProgressiveBar progress={progress} /> : <button disabled={!file} className='p-2 bg-purple-500 text-white w-[30%] rounded-full mt-5 disabled:bg-gray-500'
        onClick={() => uploadBtnClick(file)}>
        Upload
      </button>}
    </div>
  );
}

export default UploadForm;
