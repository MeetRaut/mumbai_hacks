import React from 'react';

// Sample data for the issues (replace with actual data as needed)
const issues = [
  {
    id: 1,
    area: 'Goregaon',
    description: 'Increased reports of harassment in the area.',
    measures: 'Increased police patrols and community awareness programs.',
  },
  {
    id: 2,
    area: 'Bandra',
    description: 'Rise in incidents of theft at night.',
    measures: 'Installation of streetlights and CCTV cameras.',
  },
  {
    id: 3,
    area: 'Andheri',
    description: 'Reported cases of domestic violence.',
    measures: 'Support hotlines and legal aid for victims.',
  },
  {
    id: 4,
    area: 'Dadar',
    description: 'Unsafe public transport routes reported.',
    measures: 'Review of transport schedules and security checks.',
  },
];

const IssueCard = ({ issue, onDeclareUnsafe, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold">{issue.area}</h3>
      <p className="mt-2 text-gray-600">{issue.description}</p>
      <h4 className="mt-4 font-semibold">Measures Taken:</h4>
      <p className="text-gray-700">{issue.measures}</p>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={() => onDeclareUnsafe(issue.id)}
        >
          Declare Unsafe
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={() => onDelete(issue.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const ViewIssues = () => {
  const handleDeclareUnsafe = (id) => {
    console.log(`Issue with ID ${id} declared unsafe.`);
    // Add functionality to update the issue status in the backend or state management
  };

  const handleDelete = (id) => {
    console.log(`Issue with ID ${id} deleted.`);
    // Add functionality to remove the issue from the backend or state management
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Reported Issues</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onDeclareUnsafe={handleDeclareUnsafe}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewIssues;
