"use client"
import React, { useState } from 'react'
import { app } from '@/firebaseconfig';
import { Firestore } from 'firebase/firestore';
const Fetch = () => {
    const [allDocs, setAllDocs]=useState([]);
    const [singleDoc, setSingleDoc]=useState({});
t
    const db=Firestore();

    //function to fetch all docs
    function fetchAll(e){
      e.preventDefault();
      db.collection("uploadedFile").get().then((snapshot)=>{
         if (snapshot.docs.length>0){
          snapshot.docs.forEach((doc)=>{
            setAllDocs((prev)=>{
              return [...prev, doc.data()];
            });

          }); 
         }
      });
      console.log(allDocs);

    }
  return (
    <div>
      file
    </div>
  )
}

export default Fetch
