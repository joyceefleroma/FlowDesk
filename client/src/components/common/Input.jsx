import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative rounded-xl">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={twMerge(
            clsx(
              'w-full rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-100 text-sm px-3.5 py-2.5 transition-all duration-200 placeholder:text-slate-500',
              'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
              Icon && 'pl-10',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400 mt-1.5 font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
