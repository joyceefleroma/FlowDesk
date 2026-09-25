import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'The Problem', href: '#problem' },
    { label: 'Workflows', href: '#concept' },
    { label: 'Tasks', href: '#tasks' },
    { label: 'Engine', href: '#engine' },
    { label: 'Telemetry', href: '#telemetry' },
    { label: 'Analytics', href: '#analytics' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0506]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-500 via-amber-500 to-yellow-300 flex items-center justify-center text-white shadow-glow-yellow group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              FlowDesk
              <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PRO
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-amber-300 hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="hover:text-amber-300">
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="glow" size="sm" icon={ArrowRight} className="shadow-glow-red font-bold">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 text-white/80 hover:text-amber-300 rounded-xl hover:bg-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0607]/95 backdrop-blur-3xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-amber-300 hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Log In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="glow" size="md" icon={ArrowRight} className="w-full shadow-glow-red">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

