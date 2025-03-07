from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)

# Enable CORS properly
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Hugging Face API Token (Use an environment variable for security)
HF_API_TOKEN = ""  # Set this in your environment

# Store available vegetables
vegetable_inventory = {}

@app.route("/add-vegetables", methods=["POST"])
def add_vegetables():
    data = request.json
    vegetable_inventory.update(data)
    return jsonify({"message": "Vegetables added!", "inventory": vegetable_inventory})

@app.route("/generate-meal-plan", methods=["POST"])
def generate_meal_plan():
    try:
        available_vegetables = ", ".join(vegetable_inventory.keys())
        prompt = f"Suggest a PCOS-friendly meal plan along with recipe and ingredients using these vegetables: {available_vegetables}. Ensure balanced nutrients."

        headers = {
            "Authorization": f"Bearer {HF_API_TOKEN}",
            "Content-Type": "application/json"
        }
        url = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"

        response = requests.post(url, headers=headers, json={"inputs": prompt})
        print("Response Status Code:", response.status_code)
        print("Response Text:", response.text)  # ✅ Debugging

        if response.status_code == 200:
            return jsonify({"meal_plan": response.json()}), 200
        else:
            return jsonify({"error": f"Hugging Face API Error {response.status_code}", "details": response.text}), 500
    except Exception as e:
        print("Error:", str(e))  # ✅ Print error for debugging
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
