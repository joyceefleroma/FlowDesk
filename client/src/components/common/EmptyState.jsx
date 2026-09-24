import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl glass-panel border-dashed border-slate-700/80 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-glow">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h4 className="text-base sm:text-lg font-semibold text-white tracking-tight">{title}</h4>
      {description && <p className="text-xs sm:text-sm text-slate-400 max-w-sm mt-1.5 leading-relaxed">{description}</p>}
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="primary" onClick={onAction} icon={actionIcon}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
