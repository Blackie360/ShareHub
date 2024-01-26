"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebase from 'firebaseconfig'
const Files = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Fetch the list of files from Firebase Storage
    const storageRef = firebase.storage().ref();

    storageRef.listAll()
      .then((result) => {
        const files = result.items.map((item) => ({
          id: item.name,
          fileName: item.name,
          // Add more file details as needed
        }));
        setFileList(files);
      })
      .catch((error) => console.error('Error fetching files from Firebase Storage:', error));
  }, []);

  return (
    <div>
      <h1>File List</h1>
      <ul>
        {fileList.map((file) => (
          <li key={file.id}>
            <p>{file.fileName}</p>
            <Link href={`/preview/${file.id}`}>
              <a>View</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Files;
