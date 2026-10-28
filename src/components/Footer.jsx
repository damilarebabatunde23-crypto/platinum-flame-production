import React, { useState } from 'react';
import { Award, Shield, CheckCircle2, Send, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer({ setActivePage, onOpenInquiry }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.08] text-zinc-400 font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-orange-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Main 4-column upper layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-800 to-black p-0.5 border border-white/20 shadow-md">
                <div className="w-full h-full rounded-[10px] bg-[#07080a] flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-base">✦</span>
                </div>
              </div>
              <div>
                <span className="font-serif font-bold text-white text-base tracking-[0.2em] block">
                  PLATINUM FLAME
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase -mt-0.5 flex items-center space-x-1">
                  <span>PRODUCTION</span>
                  <span className="text-orange-400 font-bold">LLC</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Igniting Cinema. From Spark to Screen. An auteur motion picture house engineering visionary dramatic masterworks across soundstages, locations, and post-production laboratories worldwide.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400/90 pt-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="tracking-wider uppercase text-[11px] font-semibold">
                ACADEMY & BAFTA ACCREDITED STUDIO
              </span>
            </div>
          </div>

          {/* Global Headquarters */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-white font-bold tracking-wider uppercase flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>GLOBAL HEADQUARTERS</span>
            </div>
            <p className="text-zinc-400">1809 Forest Avenue<br />New York, NY 10001 USA</p>
            <p className="text-zinc-200 font-bold">+1 907-205-2163</p>
            <p className="text-orange-400 text-[11px] truncate">mypersonalemailboxln@gmail.com</p>
          </div>

          {/* London Studio */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-white font-bold tracking-wider uppercase flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>LONDON GATEWAY</span>
            </div>
            <p className="text-zinc-400">Pinewood Gate 12<br />Iver Heath, UK</p>
            <p className="text-zinc-300 font-medium">+1 907-205-2163</p>
            <p className="text-zinc-400 text-[11px]">mypersonalemailboxln@gmail.com</p>
          </div>

          {/* Studio Dispatch Newsletter */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-white font-bold tracking-wider uppercase">
              STUDIO DISPATCH
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-normal">
              Exclusive principal photography previews and private screening invitations.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Private credentials enrolled.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
                <input
                  type="email"
                  required
                  placeholder="executive@production.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-orange-500 text-white hover:text-black font-mono text-xs font-bold transition shrink-0"
                >
                  JOIN
                </button>
              </form>
            )}

            <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-500">
              <button onClick={() => navigateTo('news')} className="hover:text-zinc-300 uppercase">
                DISPATCHES
              </button>
              <span>•</span>
              <button onClick={() => navigateTo('news')} className="hover:text-zinc-300 uppercase">
                PRESS
              </button>
              <span>•</span>
              <button onClick={() => navigateTo('careers')} className="hover:text-zinc-300 uppercase">
                CAREERS
              </button>
            </div>
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-b border-white/[0.06] text-xs">
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-3">
              The Studio Slate
            </h4>
            <ul className="space-y-2 text-zinc-400 font-sans">
              <li><button onClick={() => navigateTo('films')} className="hover:text-orange-400 transition">Chronos Prime (70mm IMAX)</button></li>
              <li><button onClick={() => navigateTo('films')} className="hover:text-orange-400 transition">The Obsidian Crown (Cannes)</button></li>
              <li><button onClick={() => navigateTo('films')} className="hover:text-orange-400 transition">Velvet Sovereign</button></li>
              <li><button onClick={() => navigateTo('films')} className="hover:text-orange-400 transition">Iron Dynasty</button></li>
              <li><button onClick={() => navigateTo('films')} className="hover:text-orange-400 transition">Criterion Restored Masterworks</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-3">
              Studio Capabilities
            </h4>
            <ul className="space-y-2 text-zinc-400 font-sans">
              <li><button onClick={() => navigateTo('services')} className="hover:text-orange-400 transition">Development & Script Packaging</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-orange-400 transition">Star Talent & SAG Casting</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-orange-400 transition">Large Format 70mm & Optics</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-orange-400 transition">Post, VFX & Dolby Atmos 9.1.6</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-orange-400 transition">The Platinum Master Slate</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-3">
              Infrastructure & Hubs
            </h4>
            <ul className="space-y-2 text-zinc-400 font-sans">
              <li><button onClick={() => navigateTo('locations')} className="hover:text-orange-400 transition">Stage 01: The Forge (LED Volume)</button></li>
              <li><button onClick={() => navigateTo('locations')} className="hover:text-orange-400 transition">Stage 02: The Titan Tank</button></li>
              <li><button onClick={() => navigateTo('locations')} className="hover:text-orange-400 transition">Stage 03: The Mega Lot</button></li>
              <li><button onClick={() => navigateTo('locations')} className="hover:text-orange-400 transition">Global Scouting & Tax Credits</button></li>
              <li><button onClick={() => navigateTo('locations')} className="hover:text-orange-400 transition">Stage Reservation & Rate Card</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-3">
              Studio Authority
            </h4>
            <ul className="space-y-2 text-zinc-400 font-sans">
              <li><button onClick={() => navigateTo('about')} className="hover:text-orange-400 transition">The Architecture of Imagination</button></li>
              <li><button onClick={() => navigateTo('team')} className="hover:text-orange-400 transition">Executive Leadership & Board</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-orange-400 transition">Hall of Accolades & Oscars</button></li>
              <li><button onClick={() => navigateTo('careers')} className="hover:text-orange-400 transition">Open Studio Positions</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-orange-400 transition">Project Acquisitions & Submissions</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div>
            © 2026 Platinum Flame Production LLC. All cinematic rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => navigateTo('contact')} className="hover:text-zinc-300">
              PRIVACY & LEGAL
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-zinc-300">
              GUILD COMPLIANCE
            </button>
            <button onClick={() => navigateTo('locations')} className="hover:text-zinc-300">
              SOUNDSTAGES
            </button>
            <button onClick={() => onOpenInquiry()} className="text-orange-400 hover:text-orange-300 font-bold">
              START PROJECT ↗
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
