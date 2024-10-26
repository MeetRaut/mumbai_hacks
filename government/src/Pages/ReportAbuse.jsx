import React, { useState } from 'react';
import ReportIssueModal from './ReportIssueModal'; // Adjust the path as necessary
import Policies from './Policies'; // Adjust the path as necessary

const ViewUnsafeAreas = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Sample unsafe areas data
  const unsafeAreas = [
    { id: 1, area: 'Goregaon', description: 'Increased reports of harassment in this area.' },
    { id: 2, area: 'Bandra', description: 'Reported cases of theft and vandalism.' },
    { id: 3, area: 'Dadar', description: 'Unsafe for women during late hours.' },
    { id: 4, area: 'Andheri', description: 'Frequent incidents of groping reported.' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        {/* Unsafe Areas Section */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-6">Areas Marked Unsafe </h2>
          <div className="grid grid-cols-1 gap-4">
            {unsafeAreas.map((unsafeArea) => (
              <div
                key={unsafeArea.id}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold">{unsafeArea.area}</h3>
                <p>{unsafeArea.description}</p>
              </div>
            ))}
          </div>
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
