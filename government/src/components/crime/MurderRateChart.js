import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MurderRateChart = ({ data }) => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="state_murder" stroke="#8884d8" />
    <Line type="monotone" dataKey="other_states_murder" stroke="#82ca9d" />
  </LineChart>
);

export default MurderRateChart;
