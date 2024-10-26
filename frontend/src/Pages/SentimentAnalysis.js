// SentimentAnalysis.js
import React, { useState } from 'react';
import axios from 'axios';

const SentimentAnalysis = () => {
    const [inputText, setInputText] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSentiment('');

        try {
            const response = await axios.post('http://localhost:5004/analyze', {
                audio_text: inputText,
            });
            setSentiment(response.data.sentiment_analysis);
        } catch (err) {
            setError(err.response ? err.response.data.error : 'An error occurred');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    value={inputText}
                    onChange={handleInputChange}
                    rows="5"
                    className="border p-2 w-full"
                    placeholder="Enter text for sentiment analysis"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 mt-2 rounded"
                >
                    Analyze Sentiment
                </button>
            </form>
            {sentiment && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Sentiment Analysis Result:</h2>
                    <p className="bg-gray-100 p-2">{sentiment}</p>
                </div>
            )}
            {error && (
                <div className="mt-4">
                    <h2 className="text-red-600">{error}</h2>
                </div>
            )}
        </div>
    );
};

export default SentimentAnalysis;
