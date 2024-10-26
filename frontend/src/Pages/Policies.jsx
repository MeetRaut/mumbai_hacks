import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Policies = () => {
  const [policies, setPolicies] = useState([]); // State to hold policies data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  const fetchPolicies = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.get('http://localhost:5000/api/government/policies', {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Bearer token in headers
          'Content-Type': 'application/json', // Set content type to application/json
        },
      });

      console.log('API Response:', response.data); // Log the response data
      setPolicies(response.data.policies); // Set policies from API response
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while fetching policies');
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchPolicies(); // Fetch policies on component mount
  }, []);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Policies Reformed</h2>
      {loading ? ( // Show loading state
        <p>Loading policies...</p>
      ) : error ? ( // Show error if any
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {policies.map((policy) => (
            <div
              key={policy._id} // Use `_id` as the unique identifier
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold">{policy.policy}</h3> {/* Use `policy` as the title */}
              <p>Description not provided.</p> {/* Placeholder for description */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Policies;
