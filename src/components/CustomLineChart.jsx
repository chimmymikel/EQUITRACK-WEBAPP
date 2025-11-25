import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart 
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="name" 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => `₱${value.toLocaleString()}`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
          formatter={(value) => [`₱${value.toLocaleString()}`, 'Income']}
          labelStyle={{ color: '#9CA3AF' }}
        />
        <Legend 
          wrapperStyle={{ fontSize: '12px' }}
          iconType="line"
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#10B981" 
          strokeWidth={2}
          dot={{ fill: '#10B981', r: 4 }}
          activeDot={{ r: 6 }}
          name="Income"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;