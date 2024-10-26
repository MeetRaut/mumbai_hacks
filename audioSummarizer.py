from flask import Flask, request, jsonify
from groq import Groq

from flask_cors import CORS




app = Flask(__name__)
CORS(app)

client = Groq(api_key="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")

@app.route('/analyze', methods=['POST'])  # Changed endpoint name
def analyze_audio():
    data = request.json
    audio_text = data.get("audio_text", "")

    if not audio_text:
        return jsonify({"error": "No audio text provided"}), 400

    # Analyzing sentiment instead of summarizing
    chat_completion = client.chat.completions.create(
        messages=[{
            "role": "user",
            "content": f"Please summarize this call in 2 lines and give sentiment analysis in 2 3 words: {audio_text}",
        }],
        model="llama3-8b-8192",
    )

    response = chat_completion.choices[0].message.content
    return jsonify({"sentiment_analysis": response})  # Return sentiment analysis

if __name__ == '__main__':
    app.run(debug=True, port=5004)
