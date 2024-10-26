import React from 'react';

// Sample policies data
const policies = [
  { id: 1, title: 'Women Safety Act', description: 'A legislation aimed at protecting women from violence and harassment.' },
  { id: 2, title: 'Emergency Response Program', description: 'A quick response program for emergencies reported by women.' },
  { id: 3, title: 'Community Safety Initiatives', description: 'Programs designed to increase community vigilance and safety for women.' },
  { id: 4, title: 'Awareness Campaigns', description: 'Campaigns to educate the public about women’s rights and safety.' },
];

const Policies = () => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Policies Reformed</h2>
      <div className="grid grid-cols-1 gap-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold">{policy.title}</h3>
            <p>{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
