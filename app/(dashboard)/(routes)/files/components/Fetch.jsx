"use client";
import React, { useState, useEffect } from 'react';
import { app } from '@/firebaseconfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Fetch = () => {
    const [allDocs, setAllDocs] = useState([]);
    const [singleDoc, setSingleDoc] = useState({});
    const db = getFirestore(app);

    // Function to fetch all docs
    const fetchAll = async (e) => {
        e.preventDefault();
        try {
            const querySnapshot = await getDocs(collection(db, 'uploadedFile'));
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push(doc.data());
            });
            setAllDocs(documents);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }

    // Use useEffect to log changes in the allDocs state
    useEffect(() => {
        console.log(allDocs);
    }, [allDocs]);

    return (
        <div>
            <button onClick={fetchAll}>Fetch</button>
        </div>
    )
}

export default Fetch;
