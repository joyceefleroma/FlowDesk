import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'animate-pulse rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md',
          className
        )
      )}
      {...props}
    />
  );
};
