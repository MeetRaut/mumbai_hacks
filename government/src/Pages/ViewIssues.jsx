import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddIssueModal from './AddIssueModal'; // Adjust the path if necessary

const ViewIssues = () => {
    const [issues, setIssues] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch issues from API
    const fetchIssues = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No token found. User may not be logged in.');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/government/policies', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('API Response:', response.data); // Log the full API response

            const policies = response.data.policies;

            if (!Array.isArray(policies)) {
                setError('Policies is not an array.');
                return;
            }

            // Assuming the data structure is correct as shown in the user-provided JSON
            setIssues(policies); // Directly set the policies as issues

        } catch (error) {
            setError('Error fetching issues. Please try again later.');
            console.error('Error fetching issues:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues(); // Fetch issues on component mount
    }, []);

    const handleNewIssueSubmit = (newIssue) => {
        console.log('New Issue Submitted:', newIssue);
        setIsModalOpen(false); // Close the modal after submission
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6">Reported Issues</h2>

            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {issues.length > 0 ? (
                    issues.map((issue, index) => (
                        <IssueCard key={index} issue={issue} />
                    ))
                ) : (
                    !loading && <p className="text-gray-600">No reported issues available.</p>
                )}
            </div>

            {/* Floating Action Button */}
            <button
                className="fixed bottom-6 right-6 bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-orange-700 transition duration-200"
                onClick={() => setIsModalOpen(true)}
            >
                +
            </button>

            {/* Import and use the AddIssueModal */}
            <AddIssueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleNewIssueSubmit}
            />
        </div>
    );
};

const IssueCard = ({ issue }) => {
  return (
      <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold">Reported by: {issue.email || 'Unknown Email'}</h3>
          <h4 className="mt-4 font-semibold">Reports:</h4>
          {Array.isArray(issue.reports) && issue.reports.length > 0 ? (
              issue.reports.map((report) => (
                  <div key={report._id} className="mt-2">
                      <p className="text-gray-700">Area: {issue.area}</p>
                      <p className="text-gray-600">Reported At: {new Date(report.reportedAt).toLocaleString()}</p>
                  </div>
              ))
          ) : (
              <p className="text-gray-600">No reports available for this user.</p>
          )}
      </div>
  );
};


export default ViewIssues;
