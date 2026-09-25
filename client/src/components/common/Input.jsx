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
        <label htmlFor={inputId} className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative rounded-xl">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={twMerge(
            clsx(
              'w-full rounded-xl bg-black/40 border border-white/15 text-white text-sm px-3.5 py-2.5 transition-all duration-200 placeholder:text-slate-500 backdrop-blur-md',
              'focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/25 focus:bg-black/60 shadow-inner',
              Icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
              className
            )
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400 mt-1.5 font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
