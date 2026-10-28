import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield, Sparkles, ChevronRight, Lock } from 'lucide-react';
import { soundEngine } from '../utils/audioSystem';

export default function Navbar({ activePage, setActivePage, onOpenInquiry, onOpenClientPortal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    const unsub = soundEngine.subscribe((state) => {
      setIsAudioActive(state.isPlaying);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsub();
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'films', label: 'OUR FILMS' },
    { id: 'services', label: 'SERVICES' },
    { id: 'investor-relations', label: 'INVESTOR RELATIONS' },
    { id: 'governance', label: 'ANNUAL LETTER & GOVERNANCE' },
    { id: 'talent', label: 'TALENT' },
    { id: 'locations', label: 'LOCATIONS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'team', label: 'OUR TEAM' },
    { id: 'news', label: 'NEWS & PRESS' },
    { id: 'careers', label: 'CAREERS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const newState = soundEngine.toggle();
    setIsAudioActive(newState);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07080a]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group"
          >
            {/* Logo Emblem Icon */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-black p-0.5 border border-white/20 group-hover:border-orange-500/60 shadow-lg shadow-orange-950/20 transition-all">
              <div className="w-full h-full rounded-[10px] bg-[#07080a] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-7 h-7 filter drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                  <defs>
                    <linearGradient id="navFlame" x1="0%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="60%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#FDE047" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" stroke="#94A3B8" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M50 14 C58 28 72 38 72 58 C72 74 61 84 50 86 C39 84 28 74 28 58 C28 38 42 28 50 14 Z" fill="url(#navFlame)" />
                  <path d="M50 34 C54 44 62 50 62 62 C62 70 56 76 50 78 C44 76 38 70 38 62 C38 50 46 44 50 34 Z" fill="#07080a" />
                  <path d="M50 44 C52 50 56 54 56 62 C56 66 53 69 50 70 C47 69 44 66 44 62 C44 54 48 50 50 44 Z" fill="url(#navFlame)" />
                  <circle cx="50" cy="58" r="2.5" fill="#fff" />
                </svg>
              </div>
            </div>

            <div>
              <div className="font-serif font-bold text-xs sm:text-base tracking-[0.15em] sm:tracking-[0.2em] text-white group-hover:text-amber-200 transition leading-tight">
                PLATINUM FLAME
              </div>
              <div className="text-[8px] sm:text-[9px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-zinc-400 uppercase -mt-0.5 flex items-center space-x-1">
                <span>PRODUCTION</span>
                <span className="text-orange-400 font-bold">LLC</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Cinematic Audio Soundscape Toggle */}
            <button
              onClick={toggleSound}
              title={isAudioActive ? 'Mute Studio Ambient Soundscape' : 'Play Studio Ambient Soundscape'}
              className={`px-2.5 py-1.5 rounded-lg border text-xs transition flex items-center space-x-1.5 ${
                isAudioActive
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400 font-bold shadow-md shadow-orange-950/40'
                  : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline font-mono text-[10px] tracking-wider uppercase">
                {isAudioActive ? 'AUDIO ON' : 'SOUND'}
              </span>
              {isAudioActive && (
                <div className="flex items-center space-x-0.5 ml-1">
                  <span className="w-0.5 h-3 bg-orange-400 animate-pulse rounded-full" />
                  <span className="w-0.5 h-2 bg-amber-300 animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-3.5 bg-orange-500 animate-pulse delay-150 rounded-full" />
                </div>
              )}
            </button>

            {/* Client Portal Button */}
            <button
              onClick={onOpenClientPortal}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono tracking-wider text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/10 rounded-lg transition"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>CLIENT PORTAL</span>
            </button>

            {/* Start Project CTA Button */}
            <button
              onClick={() => onOpenInquiry()}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#EA580C] text-black font-semibold text-xs font-mono tracking-wider shadow-lg shadow-orange-950/40 hover:brightness-110 active:scale-95 transition"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>START PROJECT</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#07080a]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 xl:hidden overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="space-y-1 py-4 border-b border-white/10">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-3 px-4 rounded-xl flex items-center justify-between text-sm font-mono tracking-wider uppercase transition ${
                    isActive
                      ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-orange-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenClientPortal();
              }}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-mono tracking-wider flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>ACCESS CLIENT PORTAL</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider shadow-lg shadow-orange-950/40 flex items-center justify-center space-x-2"
            >
              <span>START YOUR PROJECT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-auto pt-8 text-center text-xs text-zinc-500 font-mono">
            Platinum Flame Production LLC • Hollywood • London • Tokyo
          </div>
        </div>
      )}
    </>
  );
}
