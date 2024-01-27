"use client"
import React, { useState, useEffect } from 'react';
import { app } from '@/firebaseconfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Fetch = () => {
    const [allDocs, setAllDocs] = useState([]);
    const db = getFirestore(app);

    // Function to fetch all docs
    const fetchAll = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'uploadedFile'));
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data());
            });
            setAllDocs(documents);
            console.log(documents);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchAll();
    }, []); // Empty dependency array ensures the effect runs once when the component mounts

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Fetched Documents</h1>

            {allDocs.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {allDocs.map((doc, index) => (
                        <div key={index} className="bg-gray-200 p-4 rounded-md">
                            {/* Adjust the structure based on your document data */}
                            {doc.userName && <p>User Name: {doc.userName}</p>}
                            {doc.userEmail && <p>User Email: {doc.userEmail}</p>}
                            {doc.fileName && <p>File Name: {doc.fileName}</p>}
                            {doc.fileType && <p>File Type: {doc.fileType}</p>}
                            {/* Add more fields as needed */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Fetch;