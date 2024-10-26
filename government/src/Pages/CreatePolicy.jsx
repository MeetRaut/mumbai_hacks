import React, { useState } from 'react';
import AddPolicyModal from './AddPolicyModal'; // Adjust the path as necessary
import axios from 'axios'; // Import axios for API calls

const CreatePolicy = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [inputPolicy, setInputPolicy] = useState(''); // State for input policy

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePolicySubmit = async () => {
    try {
      // Send the input policy to the Flask API
      const response = await axios.post('http://localhost:5002/api/policy', 
        { policy: inputPolicy },
        { headers: { 'Content-Type': 'application/json' } } // Set content type
      );

      const generatedPolicy = response.data.generated_policy;
      setPolicies([...policies, { text: inputPolicy, generated: generatedPolicy }]);
      setInputPolicy(''); // Clear the input after submission
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error generating policy:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Create Policy</h2>
      
      {/* Input for user policy */}
      <textarea
        value={inputPolicy}
        onChange={(e) => setInputPolicy(e.target.value)}
        placeholder="Enter your policy..."
        className="w-full max-w-md h-24 p-2 border rounded-lg mb-4 border-gray-300"
      />

      {/* Submit Button */}
      <button
        onClick={handlePolicySubmit}
        className="bg-blue-600 text-white rounded-lg p-2 mb-4 hover:bg-blue-700 transition duration-200"
      >
        Submit Policy
      </button>

      {/* Display submitted policies */}
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4">Policies Created</h3>
        <ul className="bg-white shadow rounded-lg p-4">
          {policies.map((policy, index) => (
            <li key={index} className="mb-3 p-2 border-b last:border-b-0">
              <strong>User Policy:</strong> {policy.text}
              <br />
              <strong>Generated Policy:</strong> {policy.generated}
            </li>
          ))}
        </ul>
      </div>

      {/* Circular button to add a new policy */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 bg-orange-600 text-white rounded-full p-4 shadow-lg hover:bg-orange-700 transition duration-200"
      >
        +
      </button>

      {/* AddPolicyModal for user input */}
      <AddPolicyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePolicySubmit} // You might need to adjust this if you still want to keep the modal's functionality
        inputPolicy={inputPolicy} // Pass the current inputPolicy state
        setInputPolicy={setInputPolicy} // Pass the setter function
      />
    </div>
  );
};

export default CreatePolicy;
