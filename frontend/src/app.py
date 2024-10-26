from flask import Flask, request, jsonify
from groq import Groq
import os

app = Flask(__name__)

# Initialize Groq client
client = Groq(api_key="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")

@app.route('/api/policy', methods=['POST'])
def create_policy():
    data = request.json
    policy_input = data.get('policy', '')

    # Call Groq to generate the response
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": policy_input}],
        model="llama3-8b-8192"
    )

    generated_policy = chat_completion.choices[0].message.content
    return jsonify({"generated_policy": generated_policy})

if __name__ == '__main__':
    app.run(port=6100, debug=True)  # Run on port 6100
