from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import assemblyai as aai
import os

# Initialize the Flask application
from flask_cors import CORS




app = Flask(__name__)
CORS(app)

# Set AssemblyAI API key
aai.settings.api_key = "4c87bf9600b94bfaa164582e406818d2"

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided."}), 400

    audio_file = request.files['audio']
    audio_filename = secure_filename(audio_file.filename)  # Secure the filename
    audio_path = os.path.join(os.getcwd(), 'recorded_audio.mp3')  # Save as mp3

    try:
        # Save the audio file temporarily
        audio_file.save(audio_path)
        print(f"Audio file saved to: {audio_path}")

        # Initialize AssemblyAI's transcriber and upload the audio file
        transcriber = aai.Transcriber()
        upload_url = transcriber.upload_file(audio_path)

        # Perform transcription using the uploaded file URL
        transcript = transcriber.transcribe(upload_url)

        # Console log the transcription
        if transcript.error:
            print(f"Transcription error: {transcript.error}")
            return jsonify({"error": transcript.error}), 500

        print(f"Transcription: {transcript.text}")  # Log transcription to console

        # Keep the saved audio file
        print("Audio file retained at:", audio_path)

        return jsonify({"transcription": transcript.text})

    except Exception as e:
        print(f"Error saving or processing the audio file: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5003)
