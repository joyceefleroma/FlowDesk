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
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl glass-panel border-dashed border-red-500/30 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-glow">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h4 className="text-base sm:text-lg font-black text-white tracking-tight">{title}</h4>
      {description && <p className="text-xs sm:text-sm text-slate-300 max-w-sm mt-1.5 leading-relaxed">{description}</p>}
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
