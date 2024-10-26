import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import axios from "axios";
import './AudioRecorder.css'; // Import the CSS file for styles

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const recorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/mp3",
        numberOfAudioChannels: 1,
      });
      recorder.startRecording();
      recorderRef.current = recorder;
      setRecording(true);
    } catch (error) {
      console.error("Error accessing audio devices:", error);
      alert("Could not access the microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    recorderRef.current.stopRecording(() => {
      const audioBlob = recorderRef.current.getBlob();
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
      setRecording(false);
    });
  };

  const handleUpload = async () => {
    if (!audioURL) {
      alert("Please record an audio first.");
      return;
    }

    setLoading(true);
    const audioBlob = recorderRef.current.getBlob();
    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded_audio.mp3");

    try {
      const transcriptionRes = await axios.post(
        "http://localhost:5003/transcribe",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(transcriptionRes.data.transcription);
      setSummary(transcriptionRes.data.transcription);
    } catch (error) {
      console.error("Error processing audio file:", error);
      setSummary("There was an error processing your audio file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audio-recorder">
      <h2>Audio Recorder</h2>
      <div className="button-container">
        <button className="record-button" onClick={startRecording} disabled={recording}>
          Start Recording
        </button>
        <button className="record-button" onClick={stopRecording} disabled={!recording}>
          Stop Recording
        </button>
        <button className="upload-button" onClick={handleUpload} disabled={!audioURL || loading}>
          Upload Audio
        </button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {summary && <p className="summary">Transcription: {summary}</p>}
      {audioURL && <audio controls src={audioURL} />}
      <button ><a href="/sentiment">Sentiment analysis</a></button>
    </div>
  );
};

export default AudioRecorder;
