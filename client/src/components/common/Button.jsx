import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080204] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 backdrop-blur-md cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5 font-semibold',
    icon: 'p-2 rounded-xl',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white shadow-glow hover:shadow-glow-lg focus:ring-red-500 border border-red-400/40',
    glow: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-glow-lg focus:ring-red-500 border border-white/30 font-bold',
    white: 'bg-white hover:bg-slate-100 text-slate-950 shadow-glow-white border border-white font-bold focus:ring-white',
    secondary: 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 focus:ring-red-500',
    outline: 'bg-transparent hover:bg-red-500/10 text-slate-200 hover:text-white border border-red-500/40 hover:border-red-400 focus:ring-red-500',
    danger: 'bg-red-700/80 hover:bg-red-600 text-white shadow-lg shadow-red-700/30 focus:ring-red-500 border border-red-500/40',
    ghost: 'bg-transparent hover:bg-white/10 text-slate-300 hover:text-white focus:ring-red-500',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
    </button>
  );
};
