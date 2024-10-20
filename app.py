from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import openai

app = Flask(__name__)
CORS(app)  # Enable CORS globally

# Get the OpenAI API key from Heroku environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate-gift', methods=['POST'])
def generate_gift():
    data = request.json
    user_input = data.get('input')

    if not user_input:
        return jsonify({'error': 'No input provided'}), 400

    try:
        # Custom prompt engineering
        prompt = f"Give me a list of 10 products that I could buy from an online retailer for someone based on the following description about them. Provide the suggestions as a comma separated list, with no other text surrounding it. If you cannot derive any understanding from the description, like if the user enters nonsense, just instead return a list of 10 popular items that anyone would like, in the same format as described before\n\nDescription: {user_input}"

        # Send the input to OpenAI's API
        response = openai.Completion.create(
            engine="text-davinci-003",  # Choose the engine you want to use
            prompt=prompt,
            max_tokens=100  # Adjust the number of tokens based on your needs
        )

        # Extract the response text from the OpenAI response
        suggestions = response.choices[0].text.strip()

        # Return the response to the frontend
        return jsonify({'message': suggestions})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
