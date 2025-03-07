import React, { useState } from "react";
import axios from "axios";

function MealPlan() {
  const [mealPlan, setMealPlan] = useState("");

  const fetchMealPlan = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-meal-plan");
      setMealPlan(response.data.meal_plan);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };

  return (
    <div>
      <h2>PCOS-Friendly Meal Plan</h2>
      <button onClick={fetchMealPlan}>Generate Meal Plan</button>
      {mealPlan && <pre>{JSON.stringify(mealPlan, null, 2)}</pre>}
    </div>
  );
}

export default MealPlan;
