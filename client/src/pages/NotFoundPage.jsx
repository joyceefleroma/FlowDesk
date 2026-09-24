import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center p-6 text-center selection:bg-indigo-500 selection:text-white">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 shadow-glow">
        <Zap className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-white tracking-tight font-mono">404</h1>
      <h2 className="text-xl font-bold text-white mt-2">Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-sm mt-2 leading-relaxed">
        The task, workflow, or route you are attempting to access does not exist or has been removed.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="glow" icon={Home}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
