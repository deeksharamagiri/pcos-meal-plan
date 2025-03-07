import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const uploadImage = (formData) => axios.post(`${API_URL}/upload`, formData);
export const uploadMenu = (formData) => axios.post(`${API_URL}/upload_menu`, formData);
export const MealPlan = (data) => axios.post(`${API_URL}/meal_plan`, data);
