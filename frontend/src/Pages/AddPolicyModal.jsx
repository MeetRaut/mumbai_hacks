import React, { useState } from 'react';
import Modal from 'react-modal';

const AddPolicyModal = ({ isOpen, onClose }) => {
  const [newPolicy, setNewPolicy] = useState('');

  const handlePolicyChange = (e) => {
    setNewPolicy(e.target.value);
  };

  const handleAddPolicySubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the logic to publish the new policy
    console.log("Policy to publish:", newPolicy);
    // Close the modal after submission
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Policy"
      className="w-full max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-6">Add New Policy</h2>
      <form onSubmit={handleAddPolicySubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="newPolicy">
            Policy to Publish
          </label>
          <input
            type="text"
            id="newPolicy"
            value={newPolicy}
            onChange={handlePolicyChange}
            placeholder="Enter policy details"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200"
        >
          Publish
        </button>
      </form>
    </Modal>
  );
};

export default AddPolicyModal;
