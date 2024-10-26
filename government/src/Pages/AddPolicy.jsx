import React, { useState } from 'react';

const AddPolicy = ({ onAddPolicy }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      onAddPolicy({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-2">Add New Policy</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Policy Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Policy Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Policy
      </button>
    </form>
  );
};

export default AddPolicy;