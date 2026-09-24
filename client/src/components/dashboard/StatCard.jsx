import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'indigo',
  trend,
  className = '',
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      glow: 'shadow-glow',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      text: 'text-cyan-400',
      glow: 'shadow-glow-cyan',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      text: 'text-purple-400',
      glow: 'shadow-glow-purple',
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      glow: 'shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)]',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      glow: 'shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      className={twMerge(
        clsx(
          'glass-panel rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:border-white/20 relative overflow-hidden',
          className
        )
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${scheme.bg} ${scheme.border} ${scheme.text} ${scheme.glow}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-400">
          <span className={trend.positive ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
            {trend.value}
          </span>
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );
};
