"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { getFirestore, collection, getDocs, where } from 'firebase/firestore';
import { app } from '@/firebaseconfig';

const Fetch = () => {
    const [allDocs, setAllDocs] = useState([]);
    const db = getFirestore(app);
    const { user } = useClerk();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                console.log("Executing fetchAll");
                if (!user) {
                    console.log("User not available, skipping fetch");
                    return;
                }

                const userEmail = user.primaryEmailAddress.emailAddress; // Change this based on Clerk user structure
                const userId = user.id || ''; 

                console.log("User ID:", userId);
                console.log("User Email:", userEmail);

                const querySnapshot = await getDocs(collection(db, 'uploadedFile'), where('file.userId', '==', userId));
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                setAllDocs(documents);
                console.log("Fetched Documents:", documents);
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        };

        fetchAll();
    }, [user]); // Trigger fetchAll when the user object changes

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
    );
}

export default Fetch;
