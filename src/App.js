import React, { useState } from "react";
import axios from "axios";

function App() {
    const [vegetable, setVegetable] = useState("");
    const [inventory, setInventory] = useState([]);
    const [mealPlan, setMealPlan] = useState("");

    // Add Vegetables API Call
    const addVegetable = async () => {
        if (!vegetable) return;

        const response = await fetch("http://127.0.0.1:5000/add-vegetables", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [vegetable]: true }),
        });

        const data = await response.json();
        setInventory(Object.keys(data.inventory));
        setVegetable("");
    };

    const fetchMealPlan = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/generate-meal-plan");
        console.log("Meal Plan API Response:", response.data); // Debug API response
    
        // Ensure meal_plan exists and is not empty
        if (response.data.meal_plan && response.data.meal_plan.length > 0) {
          setMealPlan(response.data.meal_plan[0]?.generated_text || "Meal plan generated, but no text available.");
        } else {
          setMealPlan("No meal plan generated.");
        }
      } catch (error) {
        console.error("Error fetching meal plan:", error);
        setMealPlan("Error fetching meal plan. Please try again.");
      }
    };
    

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>PCOS Meal Planner</h1>

            {/* Input for Adding Vegetables */}
            <h2>Add Available Vegetables</h2>
            <input
                type="text"
                value={vegetable}
                onChange={(e) => setVegetable(e.target.value)}
                placeholder="Enter a vegetable"
            />
            <button onClick={addVegetable}>Add</button>

            {/* Display Inventory */}
            <p>Available Vegetables: {inventory.join(", ")}</p>

            {/* Generate Meal Plan */}
            <h2>PCOS-Friendly Meal Plan</h2>
            <button onClick={fetchMealPlan}>Generate Meal Plan</button>

            {/* Display Meal Plan */}
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                {mealPlan}
            </pre>
        </div>
    );
}

export default App;
