import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, LayoutDashboard, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export const FinalCTASection = () => {
  return (
    <section id="cta" className="py-24 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto relative z-10 text-center">
      <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-amber-500/40 bg-gradient-to-b from-[#1c0f0a]/95 to-[#120807]/95 backdrop-blur-3xl shadow-glow-yellow relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-6 shadow-glow-yellow">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Transform Your Productivity Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
          Stop Managing Every Little Task.
        </h2>

        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mt-6 leading-relaxed">
          Let FlowDesk automate the repetitive work so you can focus on what matters.
        </p>

        {/* Dual Actions in Clean Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="glow" size="lg" icon={Flame} className="w-full sm:w-auto text-base px-9 py-4 font-bold shadow-glow-red h-12">
              Start Building Workflows
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" icon={LayoutDashboard} className="w-full sm:w-auto text-base px-8 py-4 h-12 border-white/20 hover:border-amber-400/60 hover:text-amber-300">
              View Live Dashboard
            </Button>
          </Link>
        </div>

        {/* Guarantee Bullet Points */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-yellow-400" />
            Pre-built workflow templates
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-red-400" />
            Full audit log telemetry
          </span>
        </div>
      </div>
    </section>
  );
};


