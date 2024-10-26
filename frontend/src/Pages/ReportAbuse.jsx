import React, { useEffect, useState } from 'react';
import ReportIssueModal from './ReportIssueModal'; // Adjust the path as necessary
import Policies from './Policies'; // Adjust the path as necessary
import axios from 'axios';

const ViewUnsafeAreas = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [unsafeAreas, setUnsafeAreas] = useState([]); // State to hold unsafe areas
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fetchUnsafeAreas = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      console.log("Token:", token); // Log the token for verification
      
      const response = await axios.get('http://localhost:5000/api/unsafe-areas', {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Bearer token in headers
          'Content-Type': 'application/json', // Set content type to application/json
        },
      });
      
      setUnsafeAreas(response.data); // Set the fetched unsafe areas
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while fetching unsafe areas');
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchUnsafeAreas(); // Fetch unsafe areas on component mount
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        {/* Unsafe Areas Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-6">Areas Marked Unsafe</h2>
          {loading ? ( // Show loading state
            <p>Loading unsafe areas...</p>
          ) : error ? ( // Show error if any
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {unsafeAreas.map((unsafeArea) => (
                <div
                  key={unsafeArea._id} // Use the unique ID from your backend
                  className="bg-white p-4 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-bold">{unsafeArea.name}</h3>
                  <p>{unsafeArea.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Policies Section */}
        <div className="w-full md:w-1/2 p-4">
          <Policies />
        </div>
      </div>

      {/* Circular button to report an issue */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 bg-orange-600 text-white rounded-full p-4 shadow-lg hover:bg-orange-700 transition duration-200"
      >
        +
      </button>

      <ReportIssueModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ViewUnsafeAreas;
