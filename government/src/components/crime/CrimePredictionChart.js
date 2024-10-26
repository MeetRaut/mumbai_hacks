import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CrimePredictionChart = ({ data, actualData }) => {
  const combinedData = [...actualData, ...data];

  return (
    <LineChart width={500} height={300} data={combinedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalCrimesAgainstWomen" stroke="#ff7300" />
<Line type="monotone" dataKey="predictedCrimesAgainstWomen" stroke="#82ca9d" />

    </LineChart>
  );
};

export default CrimePredictionChart;
