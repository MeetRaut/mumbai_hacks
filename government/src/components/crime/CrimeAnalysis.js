import React, { useState, useEffect } from 'react';
import Navbar from './CrimeNavbar';
import MurderRateChart from './MurderRateChart';
import AssaultTypesChart from './AssaultTypesChart';
import CrimePredictionChart from './CrimePredictionChart'
import data from './crimeAnalysis.json'

const CrimeAnalysisComp = () => {
  const [state, setState] = useState('');
  const [analysisData, setAnalysisData] = useState({});
  const [activeTab, setActiveTab] = useState('Murder Rate');
  const [error, setError] = useState('');

  useEffect(() => {
    if (state) {
      const selectedData = data[state];
      console.log("Selected data:", selectedData); // For debugging
      if (!selectedData) {
        // setError('No data available for this state.');
        return;
      }
  

      const murderRate = selectedData.map(item => ({
        year: item.YEAR,
        state_murder: item.MURDER,
        other_states_murder: 0
      }));

      const assaultTypes = {
        "Sexual Assault": selectedData.reduce((total, item) => total + item["Sexual Assault"], 0),
        "CUSTODIAL Assault": selectedData.reduce((total, item) => total + item["CUSTODIAL Assault"], 0),
        "OTHER Assault": selectedData.reduce((total, item) => total + item["OTHER Assault"], 0),
      };

      const totalCrimes = selectedData.map(item => ({
        year: item.YEAR,
        totalCrimesAgainstWomen: item["Sexual Assault"] + item["CUSTODIAL Assault"] + item["OTHER Assault"],
      }));

      const predictedCrimes = predictCrimes(totalCrimes);

      setAnalysisData({
        murder_rate: murderRate,
        assault_types: assaultTypes,
        total_crimes: totalCrimes,
        predicted_crimes: predictedCrimes,
      });
    }
  }, [state]);

  const predictCrimes = (totalCrimes) => {
    const years = totalCrimes.map(item => item.year);
    const total = totalCrimes.map(item => item.totalCrimesAgainstWomen);
    
    const sumX = years.reduce((acc, val) => acc + val, 0);
    const sumY = total.reduce((acc, val) => acc + val, 0);
    const sumXY = years.reduce((acc, val, idx) => acc + (val * total[idx]), 0);
    const sumXX = years.reduce((acc, val) => acc + (val * val), 0);
    const n = years.length;

    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    const predictedData = [];
    const lastYear = Math.max(...years);
    
    for (let i = 1; i <= 5; i++) {
      const year = lastYear + i;
      const basePrediction = Math.round(m * year + b);
      const fluctuation = Math.round((Math.random() - 0.5) * 50); // Increased fluctuation range to -50 to +50
      const predictedValue = Math.max(0, basePrediction + fluctuation);
      predictedData.push({ year, predictedCrimesAgainstWomen: predictedValue });
    }
    
    return predictedData;
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveTab('Murder Rate');
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Murder Rate':
        return <MurderRateChart data={analysisData.murder_rate || []} />;
      case 'Assault Types':
        return <AssaultTypesChart data={analysisData.assault_types || {}} />;
      case 'Crime Prediction':
        return (
          <CrimePredictionChart 
            data={analysisData.predicted_crimes || []} 
            actualData={analysisData.total_crimes || []} 
          />
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4">Crime Analysis</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mb-6">
        <input
          type="text"
          value={state}
          onChange={handleStateChange}
          placeholder="Enter state name (e.g., Maharashtra)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Navbar 
        tabs={['Murder Rate', 'Assault Types', 'Crime Prediction']} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <div className="mt-6 w-full max-w-md">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CrimeAnalysisComp;
