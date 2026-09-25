import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Play, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroScene = () => {
  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] pt-36 pb-24 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
      {/* Pill Badge with Red & Amber Glow */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/15 via-amber-500/15 to-white/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-8 shadow-glow-yellow backdrop-blur-xl animate-in fade-in duration-700">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        <span>Next-Generation Workflow Automation & Orchestration</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.06] max-w-4xl mx-auto">
        Automate Your Workflow.{' '}
        <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
          Focus on What Matters.
        </span>
      </h1>

      {/* Hero Description */}
      <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-7 leading-relaxed font-normal">
        FlowDesk helps you manage tasks and automate repetitive workflows using triggers, conditions, and actions.
      </p>

      {/* CTA Buttons in Clean Uniform Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto">
        <Link to="/register" className="w-full sm:w-auto">
          <Button variant="glow" size="lg" icon={Flame} className="w-full sm:w-auto text-base px-9 py-4 font-bold h-12 shadow-glow-red">
            Get Started Free
          </Button>
        </Link>
        <a href="#concept" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" icon={Play} className="w-full sm:w-auto text-base px-8 py-4 h-12 border-white/20 hover:border-amber-400/60 hover:text-amber-300">
            Explore Workflows
          </Button>
        </a>
      </div>

      {/* Quick Value Metrics */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/10 text-xs text-white/60">
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Event-Driven Triggers</span>
        </span>
        <span className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-red-400" />
          <span>Real-Time Execution</span>
        </span>
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Zero Code Required</span>
        </span>
      </div>
    </section>
  );
};


