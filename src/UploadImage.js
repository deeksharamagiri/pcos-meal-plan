import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [detectedVegetables, setDetectedVegetables] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      setDetectedVegetables(response.data.vegetables);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to detect vegetables.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Vegetable Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Detect"}
      </button>
      {detectedVegetables.length > 0 && (
        <div>
          <h3>Detected Vegetables:</h3>
          <ul>
            {detectedVegetables.map((veg, index) => (
              <li key={index}>{veg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
