import React, { useState } from 'react';
import AddPolicyModal from './AddPolicyModal'; // Adjust the path as necessary

const CreatePolicy = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [policy, setPolicy] = useState('');
  const [policies, setPolicies] = useState([]);
  const [generatedPolicy, setGeneratedPolicy] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePolicyChange = (e) => {
    setPolicy(e.target.value);
  };

  const handlePolicySubmit = async (e) => {
    e.preventDefault();
    if (policy) {
      try {
        const response = await fetch('/api/policy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ policy }),
        });

        const data = await response.json();
        // Append both the submitted and generated policies to the list
        setPolicies([...policies, { text: policy, generated: data.generated_policy }]);
        setPolicy(''); // Clear the input field
      } catch (error) {
        console.error('Error submitting policy:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Create Policy</h2>
      
      <form onSubmit={handlePolicySubmit} className="space-y-4 w-full max-w-md mb-6">
        <div>
          <label className="text-xl font-bold mb-4" style={{ marginBottom: '1rem' }} htmlFor="policy">
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

      {/* Display submitted policies */}
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4">Policies Created</h3>
        <ul className="space-y-2">
          {policies.map((p, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <strong>Submitted Policy:</strong> {p.text}
              <br />
              {p.generated && (
                <>
                  <strong>Generated Policy:</strong> {p.generated}
                </>
              )}
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

      <AddPolicyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CreatePolicy;
