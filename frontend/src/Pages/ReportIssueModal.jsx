import React, { useState } from 'react';
import axios from 'axios';

const ReportIssueModal = ({ isOpen, onClose }) => {
  const [area, setArea] = useState(''); // State for area input
  const [description, setDescription] = useState(''); // State for description input
  const [error, setError] = useState(null); // State to hold any error messages
  const [success, setSuccess] = useState(null); // State to hold success messages

  if (!isOpen) return null; // Don't render if not open

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log('Submitting report...'); // Log before sending request
    console.log('Area:', area); // Log area input
    console.log('Description:', description); // Log description input

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.post(
        'http://localhost:5000/api/unsafe-areas/report-unsafe-area',
        { area, description }, // Data to send
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the Bearer token in headers
            'Content-Type': 'application/json', // Set content type to application/json
          },
        }
      );

      console.log('Response received:', response.data); // Log response data
      setSuccess(response.data.message); // Set success message
      setArea(''); // Reset area input
      setDescription(''); // Reset description input
      setError(null); // Reset error message
    } catch (error) {
      console.log('Error occurred:', error.response?.data); // Log error response
      setError(error.response?.data?.message || 'An error occurred while reporting the issue');
      setSuccess(null); // Reset success message
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Report an Issue</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="area">
              Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={area} // Controlled input
              onChange={(e) => setArea(e.target.value)} // Update state on change
              placeholder="Enter the area"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description} // Controlled input
              onChange={(e) => setDescription(e.target.value)} // Update state on change
              placeholder="Describe the issue"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              rows="4"
              required
            />
          </div>
          {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200"
          >
            Submit
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportIssueModal;
