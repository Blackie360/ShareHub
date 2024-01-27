"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { app } from '@/firebaseconfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Fetch = () => {
    const [allDocs, setAllDocs] = useState([]);
    const db = getFirestore(app);

    
    const fetchAll = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'uploadedFile'));
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            setAllDocs(documents);
            console.log(documents);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }

   
    useEffect(() => {
        fetchAll();
    }, []); 

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Fetched Documents</h1>

            {allDocs.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {allDocs.map((doc) => (
                        <div key={doc.id} className="bg-gray-200 p-4 rounded-md">
                            {/* Adjust the structure based on your document data */}
                            {doc.userName && <p>User Name: {doc.userName}</p>}
                            {doc.userEmail && <p>User Email: {doc.userEmail}</p>}
                            {doc.fileName && <p>File Name: {doc.fileName}</p>}
                            {doc.fileType && <p>File Type: {doc.fileType}</p>}
                            
                            
                            {doc.fileUrl && (
                                <Link href={`/preview/${doc.id}`}>
                                    <div className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2 inline-block">View</div>
                                </Link>
                            )}
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
