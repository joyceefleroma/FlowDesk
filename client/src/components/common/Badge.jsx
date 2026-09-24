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
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    // Priorities
    low: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    medium: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
    high: 'bg-rose-950/60 text-rose-300 border-rose-500/30',
    urgent: 'bg-purple-950/60 text-purple-300 border-purple-500/30 animate-pulse',
    // Statuses
    todo: 'bg-slate-800/80 text-slate-300 border-slate-700',
    in_progress: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30',
    completed: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    overdue: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
    // Execution
    success: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    failed: 'bg-rose-950/60 text-rose-300 border-rose-500/30',
    skipped: 'bg-slate-800 text-slate-400 border-slate-700',
    // Triggers / Custom
    cyan: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
    purple: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
  };

  const dotColors = {
    low: 'bg-emerald-400',
    medium: 'bg-amber-400',
    high: 'bg-rose-400',
    urgent: 'bg-purple-400',
    todo: 'bg-slate-400',
    in_progress: 'bg-indigo-400',
    completed: 'bg-emerald-400',
    overdue: 'bg-rose-400',
    success: 'bg-emerald-400',
    failed: 'bg-rose-400',
    skipped: 'bg-slate-400',
    cyan: 'bg-cyan-400',
    purple: 'bg-purple-400',
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
