// CrimeNavbar.jsx
import React from 'react';

const CrimeNavbar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4 bg-gray-200 p-2 rounded-lg shadow-md">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            activeTab === tab ? 'bg-orange-600 text-white' : 'bg-white text-gray-800'
          } hover:bg-orange-500 hover:text-white`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default CrimeNavbar;