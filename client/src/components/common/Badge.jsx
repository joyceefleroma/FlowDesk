import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const variantStyles = {
    default: 'bg-white/5 text-slate-300 border-white/10 backdrop-blur-md',
    // Priorities in Red & White design
    low: 'bg-white/10 text-white border-white/20 backdrop-blur-md',
    medium: 'bg-rose-950/60 text-rose-300 border-rose-500/40 backdrop-blur-md',
    high: 'bg-red-950/70 text-red-200 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.25)] backdrop-blur-md',
    urgent: 'bg-gradient-to-r from-red-600/30 to-rose-600/30 text-white border-red-400/60 animate-pulse shadow-glow backdrop-blur-md font-bold',
    // Statuses
    todo: 'bg-white/5 text-slate-300 border-white/15 backdrop-blur-md',
    in_progress: 'bg-rose-900/40 text-rose-200 border-rose-500/40 backdrop-blur-md',
    completed: 'bg-red-500/20 text-red-200 border-red-400/40 backdrop-blur-md',
    overdue: 'bg-red-950/90 text-red-200 border-red-500 shadow-glow backdrop-blur-md font-semibold',
    // Execution
    success: 'bg-red-500/20 text-white border-red-400/50 backdrop-blur-md',
    failed: 'bg-red-950/80 text-red-300 border-red-600 backdrop-blur-md',
    skipped: 'bg-white/5 text-slate-400 border-white/10 backdrop-blur-md',
    // Highlights
    red: 'bg-red-600/20 text-red-200 border-red-500/40 backdrop-blur-md',
    white: 'bg-white text-slate-950 font-bold border-white backdrop-blur-md',
  };

  const dotColors = {
    low: 'bg-white',
    medium: 'bg-rose-400',
    high: 'bg-red-400',
    urgent: 'bg-red-500 animate-ping',
    todo: 'bg-slate-400',
    in_progress: 'bg-rose-400',
    completed: 'bg-red-400',
    overdue: 'bg-red-500',
    success: 'bg-red-400',
    failed: 'bg-red-600',
    skipped: 'bg-slate-400',
    red: 'bg-red-500',
    white: 'bg-white',
    default: 'bg-slate-400',
  };

  const normalizedVariant = variant.toLowerCase().replace('-', '_');
  const style = variantStyles[normalizedVariant] || variantStyles.default;
  const dotColor = dotColors[normalizedVariant] || dotColors.default;

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 font-medium rounded-full border shadow-sm',
          sizeStyles[size],
          style,
          className
        )
      )}
    >
      {dot && <span className={twMerge('w-1.5 h-1.5 rounded-full shrink-0', dotColor)} />}
      {children}
    </span>
  );
};
