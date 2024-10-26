// AddIssueModal.js
import React, { useState } from 'react';

const AddIssueModal = ({ isOpen, onClose, onSubmit }) => {
  const [newIssue, setNewIssue] = useState({ location: '', user: '', measures: '', policies: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newIssue); // Pass the new issue to the parent
    setNewIssue({ location: '', user: '', measures: '', policies: '' }); // Reset the form
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Declare Unsafe</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="location"
            value={newIssue.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
          <input
            type="text"
            name="user"
            value={newIssue.user}
            onChange={handleInputChange}
            placeholder="User"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
          <textarea
            name="measures"
            value={newIssue.measures}
            onChange={handleInputChange}
            placeholder="Measures Taken"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
          <textarea
            name="policies"
            value={newIssue.policies}
            onChange={handleInputChange}
            placeholder="Policies Reformed"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIssueModal;
