import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'red',
  trend,
  className = '',
}) => {
  const colorMap = {
    red: {
      bg: 'bg-red-600/15',
      border: 'border-red-500/30',
      text: 'text-red-400',
      glow: 'shadow-glow',
    },
    white: {
      bg: 'bg-white/10',
      border: 'border-white/25',
      text: 'text-white',
      glow: 'shadow-glow-white',
    },
    rose: {
      bg: 'bg-rose-600/15',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      glow: 'shadow-glow-ruby',
    },
    crimson: {
      bg: 'bg-red-950/60',
      border: 'border-red-600/40',
      text: 'text-red-300',
      glow: 'shadow-[0_0_20px_rgba(190,18,60,0.35)]',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/25',
      text: 'text-amber-300',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
    },
    indigo: {
      bg: 'bg-red-600/15',
      border: 'border-red-500/30',
      text: 'text-red-400',
      glow: 'shadow-glow',
    },
    cyan: {
      bg: 'bg-white/10',
      border: 'border-white/20',
      text: 'text-white',
      glow: 'shadow-glow-white',
    },
    emerald: {
      bg: 'bg-red-500/15',
      border: 'border-red-400/30',
      text: 'text-red-300',
      glow: 'shadow-glow',
    },
  };

  const scheme = colorMap[color] || colorMap.red;

  return (
    <div
      className={twMerge(
        clsx(
          'glass-panel rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:border-white/25 hover:shadow-glow relative overflow-hidden group',
          className
        )
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl border ${scheme.bg} ${scheme.border} ${scheme.text} ${scheme.glow} group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-slate-300">
          <span className={trend.positive ? 'text-red-400 font-bold' : 'text-slate-400 font-bold'}>
            {trend.value}
          </span>
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );
};
