import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const AssaultTypesChart = ({ data }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default AssaultTypesChart;
