// "use client"
// import { useEffect, useState } from 'react';
// import { getStorage, ref, listAll } from 'firebase/storage';

// const Files = () => {
//   // State to hold the list of files
//   const [files, setFiles] = useState([]);

//   // Effect to fetch the list of files from Firebase Storage
//   useEffect(() => {
//     const storage = getStorage();
//     const storageRef = ref(storage, 'uploadedFile'); // Update 'files' to your actual storage path

//     listAll(storageRef)
//       .then((result) => {
//         const filePromises = result.items.map((itemRef) => {
//           return itemRef.getMetadata().then((metadata) => {
//             return {
//               name: metadata.name,
//               size: metadata.size,
//               type: metadata.contentType,
//               downloadUrl: metadata.fullPath, // Use this URL for file download or linking
//             };
//           });
//         });

//         // Resolve all file promises
//         return Promise.all(filePromises);
//       })
//       .then((files) => {
//         setFiles(files);
//       })
//       .catch((error) => {
//         console.error('Error listing files:', error);
//       });
//   }, []); // Ensure the effect runs only once during component mount

//   // Render the list of files
//   return (
//     <div>
//       <h2>List of Uploaded Files</h2>
//       <ul>
//         {files.map((file, index) => (
//           <li key={index}>
//             <p>Name: {file.name}</p>
//             <p>Size: {file.size} bytes</p>
//             <p>Type: {file.type}</p>
//             <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
//               Download File
//             </a>
//             {/* Add your logic for viewing files here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Export the component
// export default Files;
