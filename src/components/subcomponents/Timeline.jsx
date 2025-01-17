/* eslint-disable react/prop-types */
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Timeline = ({ data }) => (
  <div title="Registration Trend">
    Hello from timeline
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.countByYear}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#3B82F6"
          name="New Registrations"
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#60A5FA"
          name="Cumulative"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Timeline;