import React, { useState } from "react";
import axios from "axios";

function AddVegetables() {
  const [vegetables, setVegetables] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/add-vegetables", {
        [vegetables]: 1, // Example: {"Broccoli": 1}
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error adding vegetables:", error);
    }
  };

  return (
    <div>
      <h2>Add Available Vegetables</h2>
      <input
        type="text"
        value={vegetables}
        onChange={(e) => setVegetables(e.target.value)}
        placeholder="Enter vegetables (e.g., Spinach, Broccoli)"
      />
      <button onClick={handleSubmit}>Add</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddVegetables;
