from flask import Flask, request, jsonify
from groq import Groq
from flask_cors import CORS




app = Flask(__name__)
CORS(app)

# Initialize the Groq client
client = Groq(api_key="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")

@app.route('/api/policy', methods=['POST'])
def generate_policy():
    data = request.json
    user_policy = data.get('policy', '')

    # Call the AI model with the user's input
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": user_policy}],
        model="llama3-8b-8192",
    )

    # Extract the generated policy
    generated_policy = chat_completion.choices[0].message.content

    return jsonify({"generated_policy": generated_policy})

if __name__ == '__main__':
    app.run(debug=True, port=5002)  # Set debug=False for production
