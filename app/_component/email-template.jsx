const EmailTemplate = ({ responce, file }) => {
  const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

  return (
    <div>
      <h1> 
        Hi {responce?.emailToSend?.split("@"[0])}
        </h1>
      {file && (
        <div>
          <p>File Information:</p>
          <p>File Name: {responce.fileName}</p>
          <p>File Size: {bytesToMB(responce.fileSize)} MB</p>
          <p>File Type: {responce.fileType}</p>
          
        </div>
      )}
    </div>
  );
};

export default EmailTemplate;
