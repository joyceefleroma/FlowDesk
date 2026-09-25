import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const PriorityDonutChart = ({ data = [] }) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  // Red & White tailored color palette for priority
  const redWhiteColors = {
    Low: '#ffffff',
    Medium: '#fda4af',
    High: '#ef4444',
    Urgent: '#991b1b',
  };

  const chartData = data.map((d) => ({
    ...d,
    color: redWhiteColors[d.name] || d.color || '#ef4444',
  }));

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col h-[340px] shadow-glow">
      <div>
        <h4 className="text-sm sm:text-base font-black text-white tracking-tight">Active Priority Breakdown</h4>
        <p className="text-xs text-slate-300">Distribution of pending tasks by urgency</p>
      </div>

      <div className="flex-1 flex items-center justify-center relative min-h-0">
        {total === 0 ? (
          <div className="text-center text-xs text-slate-400">No active tasks</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 6, 12, 0.95)',
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    borderRadius: '16px',
                    fontSize: '12px',
                    color: '#ffffff',
                    backdropFilter: 'blur(16px)',
                  }}
                />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-white">{total}</span>
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Active</span>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300 font-medium">{item.name}</span>
            </div>
            <span className="font-bold text-white font-mono">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
