import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CustomPieChart = ({ data = [], colors = [] }) => {
  const COLORS = colors.length > 0 ? colors : data.map(item => item.color);

  // Label Logic
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-black text-xs md:text-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] pointer-events-none"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const color = payload[0].payload.fill;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-2xl border border-white/10 z-50">
           <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 5px ${color}`}}></div>
                <p className="font-bold text-white text-sm">{payload[0].name}</p>
           </div>
          <p className="text-sm text-slate-200 font-bold">
            ₱{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, item) => sum + (item.amount || item.value || 0), 0);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      
      {/* CHART SECTION */}
      <div className="w-full h-[250px] relative shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={115}
              fill="#8884d8"
              dataKey="amount"
              // CHANGED: Solid White Border
              stroke="#ffffff" 
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:brightness-125 transition-all cursor-pointer outline-none filter drop-shadow-lg"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND SECTION */}
      <div className="w-full flex flex-col gap-3">
        {data.map((item, index) => {
           const val = item.amount || item.value || 0;
           const percentage = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
           const color = COLORS[index % COLORS.length];
           
           return (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-xl bg-[#0f172a]/60 border border-white/5 hover:bg-white/10 transition-all group w-full hover:border-[color:var(--hover-color)]"
              style={{ "--hover-color": color }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full shadow-[0_0_12px_currentColor]"
                  style={{ backgroundColor: color, color: color }}
                />
                <span className="font-semibold text-slate-200 text-sm md:text-base">{item.name}</span>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-white text-sm md:text-base">₱{val.toLocaleString()}</p>
                <p className="text-xs text-slate-400 font-medium">{percentage}%</p>
              </div>
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default CustomPieChart;