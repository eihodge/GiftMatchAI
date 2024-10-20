
from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Set OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate-gift', methods=['POST'])
def generate_gift():
    data = request.json
    user_input = data.get('input')

    # Generate gift suggestions using OpenAI
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Suggest gift ideas for: {user_input}",
        max_tokens=100
    )

    suggestions = response.choices[0].text.strip()
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run()
