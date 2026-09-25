import React, { useState } from 'react';
import { Zap, Play, CheckCircle2, Sliders, ArrowDown, Sparkles, Filter, Bell, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const WorkflowConceptSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [simulated, setSimulated] = useState(false);

  const steps = [
    {
      badge: 'STEP 1: TRIGGER (WHEN)',
      title: 'Incoming Event Triggered',
      desc: 'An event occurs in your task workspace — such as task creation, status change, or approaching deadline.',
      example: 'Event: "Final Project Submission" deadline is 18 hours away',
      color: 'border-red-500 text-white bg-red-500/20',
    },
    {
      badge: 'STEP 2: CONDITION (IF)',
      title: 'Evaluating Custom Logic Rules',
      desc: 'FlowDesk evaluates the task against your defined conditions (status, priority, tag match, completion %).',
      example: 'Condition: status != "COMPLETED" AND priority == "MEDIUM"',
      color: 'border-amber-500 text-amber-200 bg-amber-500/20',
    },
    {
      badge: 'STEP 3: ACTION (THEN)',
      title: 'Automated Multi-Action Execution',
      desc: 'The platform executes sequential mutations: re-prioritizing tasks, creating reminders, adding tags.',
      example: 'Action: Bump priority to URGENT + Dispatch in-app push notification',
      color: 'border-yellow-400 text-white bg-yellow-400/20',
    },
  ];

  const handleSimulate = () => {
    setSimulated(false);
    setActiveStep(0);
    setTimeout(() => setActiveStep(1), 600);
    setTimeout(() => setActiveStep(2), 1200);
    setTimeout(() => setSimulated(true), 1800);
  };

  return (
    <section id="concept" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 px-3.5 py-1 rounded-full border border-amber-500/30 shadow-glow-yellow">
          Visual Rule Builder
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Build Workflows{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 bg-clip-text text-transparent">
            Without Writing Code
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl mx-auto">
          Create powerful automated personal workflows using an intuitive visual interface.
          Chain complex conditions and multi-step actions effortlessly.
        </p>
      </div>

      {/* Interactive Workflow Builder Stage */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 bg-[#140b0a]/85 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              Automated Rule Simulator
            </h3>
            <p className="text-xs text-white/60">Live execution of the Trigger $\rightarrow$ Condition $\rightarrow$ Action pipeline</p>
          </div>

          <Button
            variant="glow"
            size="sm"
            icon={Play}
            onClick={handleSimulate}
            className="font-bold self-start sm:self-auto shadow-glow-red"
          >
            Run Live Simulation
          </Button>
        </div>

        {/* 3 Steps Pipeline Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const isPast = activeStep > idx;

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl transition-all duration-300 relative border ${
                  isCurrent
                    ? 'border-amber-400/80 bg-gradient-to-b from-amber-500/20 to-red-500/20 shadow-glow-yellow scale-[1.02]'
                    : isPast
                    ? 'border-white/20 bg-white/[0.04]'
                    : 'border-white/10 bg-white/[0.02] opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 text-white">
                    {step.badge}
                  </span>
                  {isPast || simulated ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>

                <h4 className="text-base font-bold text-white tracking-tight">{step.title}</h4>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">{step.desc}</p>

                <div className="mt-5 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-white/80">
                  <span className="text-amber-300 font-bold">$ </span>
                  {step.example}
                </div>
              </div>
            );
          })}
        </div>

        {/* Output Banner */}
        {simulated && (
          <div className="mt-8 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white">Automation Result:</span>{' '}
                <span className="text-amber-200">
                  Task priority updated to URGENT, reminder created, execution logged in telemetry in 14ms.
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-yellow-300 bg-yellow-950/60 px-2.5 py-0.5 rounded border border-yellow-500/30 shrink-0">
              STATUS: SUCCESS (200)
            </span>
          </div>
        )}
      </div>
    </section>
  );
};


