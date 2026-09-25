import React, { useState, useEffect } from 'react';
import { WorkflowUniverseCanvas } from '../components/three/WorkflowUniverseCanvas';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroScene } from '../components/landing/HeroScene';
import { ProblemSection } from '../components/landing/ProblemSection';
import { WorkflowConceptSection } from '../components/landing/WorkflowConceptSection';
import { TaskManagementSection } from '../components/landing/TaskManagementSection';
import { AutomationEngineSection } from '../components/landing/AutomationEngineSection';
import { AutomationHistorySection } from '../components/landing/AutomationHistorySection';
import { AnalyticsSection } from '../components/landing/AnalyticsSection';
import { FinalCTASection } from '../components/landing/FinalCTASection';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(Math.max(currentScroll / totalScroll, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080204] text-white selection:bg-brand-red selection:text-white relative overflow-x-hidden font-sans">
      {/* 3D WebGL Digital Workflow Universe Background Canvas */}
      <WorkflowUniverseCanvas scrollProgress={scrollProgress} />

      {/* Floating Ambient Glow Accents */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Navigation Bar */}
      <LandingNavbar />

      {/* 8 Cinematic FlowDesk Scenes */}
      <main className="relative z-10">
        {/* Scene 1: Hero */}
        <HeroScene />

        {/* Scene 2: The Problem */}
        <ProblemSection />

        {/* Scene 3: Workflow Concept */}
        <WorkflowConceptSection />

        {/* Scene 4: Task Management */}
        <TaskManagementSection />

        {/* Scene 5: Automation Engine */}
        <AutomationEngineSection />

        {/* Scene 6: Automation History & Telemetry */}
        <AutomationHistorySection />

        {/* Scene 7: Analytics */}
        <AnalyticsSection />

        {/* Scene 8: Final CTA */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};
