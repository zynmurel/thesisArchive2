import React, { useEffect, useState } from "react";

const FileUploadComponent = () => {
  const [file, setFile] = useState<any>(null);
  const [base64String, setBase64String] = useState<any>(null);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    console.log(base64String);
  }, [base64String]);

  const handleConvertToBase64 = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result?.split(",")[1];
        setBase64String(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && <p>Selected File: {file.name}</p>}
      <button onClick={handleConvertToBase64}>Convert to Base64</button>
      {base64String && <p>Base64 String: {base64String}</p>}
    </div>
  );
};

export default FileUploadComponent;
