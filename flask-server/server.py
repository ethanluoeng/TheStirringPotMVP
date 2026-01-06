import logging
from flask import Flask, render_template, request, jsonify
from gemini_setup import recipy_array_generator_gemini

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', handlers=[logging.StreamHandler()])

app = Flask(__name__)

# Route for the home page
@app.route("/")
def index():
    logging.info("Rendering home page.")
    try:
        return render_template("index.html")
    except Exception as e:
        logging.error(f"Error rendering home page: {e}")
        return "An error occurred while loading the page", 500

# Route for generating recipe
@app.route("/generate_recipe", methods=["POST"])
def generate_recipe():
    try:
        data = request.get_json()
        text = data.get("text", "")
        logging.info(f"Received text for recipe generation: {text}")
        recipe_array = recipy_array_generator_gemini(text)
        return jsonify({"instructions": recipe_array})
    except Exception as e:
        logging.error(f"Error generating recipe: {e}")
        return jsonify({"error": "An error occurred while generating the recipe"}), 500

# Run the Flask app
if __name__ == "__main__":
    try:
        logging.info("Starting Flask application...")
        app.run(port=5000,debug=True)
    except Exception as e:
        logging.error(f"Error starting Flask application: {e}")