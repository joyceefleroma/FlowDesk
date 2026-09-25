import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0507] flex flex-col items-center justify-center p-6 text-center selection:bg-brand-red selection:text-white relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-16 h-16 rounded-2xl bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-lightRed mb-6 shadow-glow-red z-10">
        <Zap className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-white tracking-tight font-mono z-10">404</h1>
      <h2 className="text-xl font-bold text-white mt-2 z-10">Page Not Found</h2>
      <p className="text-sm text-white/60 max-w-sm mt-2 leading-relaxed z-10">
        The task, workflow, or route you are attempting to access does not exist or has been removed.
      </p>
      <div className="mt-8 flex items-center gap-3 z-10">
        <Link to="/dashboard">
          <Button variant="glow" icon={Home}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
