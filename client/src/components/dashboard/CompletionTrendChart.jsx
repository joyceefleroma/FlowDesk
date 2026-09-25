import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const CompletionTrendChart = ({ data = [] }) => {
  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col h-[340px] shadow-glow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm sm:text-base font-black text-white tracking-tight">Task Velocity Trend</h4>
          <p className="text-xs text-slate-300">Created vs. completed tasks over the past 7 days</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-glow" />
            <span className="text-white font-medium">Created</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-glow-white" />
            <span className="text-white font-medium">Completed</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCreatedRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCompletedWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 6, 12, 0.95)',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                borderRadius: '16px',
                fontSize: '12px',
                boxShadow: '0 10px 30px -5px rgba(239, 68, 68, 0.3)',
                color: '#ffffff',
                backdropFilter: 'blur(16px)',
              }}
            />
            <Area
              type="monotone"
              dataKey="created"
              stroke="#ef4444"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorCreatedRed)"
              name="Created"
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#ffffff"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorCompletedWhite)"
              name="Completed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
