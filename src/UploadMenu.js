import React, { useState } from "react";
import { uploadMenu } from "../services/api";

const UploadMenu = () => {
  const [file, setFile] = useState(null);
  const [suggestions, setSuggestions] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadMenu(formData);
    setSuggestions(response.data.suggestions);
  };

  return (
    <div>
      <h2>Upload Restaurant Menu</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Analyze Menu</button>
      <p>{suggestions}</p>
    </div>
  );
};

export default UploadMenu;
