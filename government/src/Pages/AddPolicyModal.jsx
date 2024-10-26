import React, { useState } from 'react';

const AddPolicyModal = ({ isOpen, onClose, onSubmit }) => {
  const [policy, setPolicy] = useState('');

  const handlePolicyChange = (e) => {
    setPolicy(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (policy) {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log the token for debugging

        const response = await fetch('http://localhost:5000/api/government/post-policy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ policy }),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Get response body for detailed error message
          throw new Error(`Failed to submit policy: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        onSubmit(policy, data.generated_policy);
        setPolicy('');
        onClose();
      } catch (error) {
        console.error('Error submitting policy:', error);
      }
    }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Policy</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-lg font-bold mb-2" htmlFor="policy">
              Enter Policy
            </label>
            <input
              type="text"
              id="policy"
              value={policy}
              onChange={handlePolicyChange}
              placeholder="Enter a new policy"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-red-600 hover:text-red-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddPolicyModal;
