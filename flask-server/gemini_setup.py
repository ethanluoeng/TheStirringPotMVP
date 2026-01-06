import logging
from dotenv import load_dotenv
import os
from google import genai
import json
import typing_extensions as typing

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', handlers=[logging.StreamHandler()])

# Define Recipe Step Datatype
class RecipeStep(typing.TypedDict):
    step_number: int
    instruction: str
    timer: int

# Load environment variables
try:
    load_dotenv()
    logging.info("Environment variables loaded successfully.")
except Exception as e:
    logging.error(f"Error loading environment variables: {e}")

# Initialize Gemini API client
try:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    client = genai.Client(api_key=GOOGLE_API_KEY)
    logging.info("Gemini API client initialized successfully.")
except Exception as e:
    logging.error(f"Error initializing Gemini API client: {e}")

def recipy_array_generator_gemini(text):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents="Convert the following text into a list of recipe steps with step_number, instruction, and time_minutes fields: " + text,
            config={
                "response_mime_type": "application/json",
                "response_schema": list[RecipeStep],
            }
        )
        logging.info("Recipe steps generated successfully.")
        return json.loads(response.text)
    except Exception as e:
        logging.error(f"Error generating recipe steps: {e}")
        return None