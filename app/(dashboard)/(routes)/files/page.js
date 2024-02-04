"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "@/firebaseconfig"; 
import { useRouter } from 'next/navigation';


const Files = () => {
  const { user } = useUser();
  const [userFiles, setUserFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("User ID:", user.id);
      fetchUserFiles();
    }
  }, [user]);

  const fetchUserFiles = async () => {
    try {
      const db = getFirestore(app);
      const filesCollection = collection(db, "uploadedFile");

      const q = query(filesCollection, where("userId", "==", user.id));
      const querySnapshot = await getDocs(q);

      const files = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserFiles(files);
    } catch (error) {
      console.error("Error fetching user files:", error);
    }
  };

  const handleViewClick = (fileId) => {
    
    router.push(`/preview/${fileId}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Files</h1>
      <ul className="space-y-4">
        {userFiles.map((file) => (
          <li
            key={file.id}
            className="flex items-center justify-between p-4 bg-white rounded shadow-md"
          >
            <span className="text-gray-800">{file.fileName}</span>
           
            <button
              onClick={() => handleViewClick(file.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Files;