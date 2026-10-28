import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Compass, 
  Clapperboard, 
  Layers, 
  Camera, 
  Sparkles, 
  TrendingUp, 
  Megaphone, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Calculator, 
  Sliders, 
  Clock, 
  ShieldCheck, 
  DollarSign
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { servicesHeroVideo, servicesHeroFallback } from '../data/mediaAssets';

export default function ServicesPage({ onOpenInquiry }) {
  // Production Scope & Estimator Widget state
  const [budgetTier, setBudgetTier] = useState(45); // in Millions USD
  const [selectedAddons, setSelectedAddons] = useState({
    scriptDoctor: true,
    stuntPackage: true,
    largeFormat70mm: true,
    unrealLED: false,
    dolbyAtmos: true,
    globalScouting: false
  });

  const toggleAddon = (key) => {
    setSelectedAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Dynamic calculations based on slider and addons
  const addonCount = Object.values(selectedAddons).filter(Boolean).length;
  const estimatedWeeks = Math.round(16 + (budgetTier * 0.25) + (addonCount * 2));
  const estimatedCrew = Math.round(60 + (budgetTier * 1.8) + (addonCount * 15));
  const taxCreditPercentage = budgetTier > 50 ? 34 : budgetTier > 25 ? 30 : 25;
  const estimatedTaxSavings = Math.round((budgetTier * (taxCreditPercentage / 100)) * 10) / 10;

  const iconMap = {
    FileText: FileText,
    Users: Users,
    Compass: Compass,
    Clapperboard: Clapperboard,
    Layers: Layers,
    Camera: Camera,
    Sparkles: Sparkles,
    TrendingUp: TrendingUp,
    Megaphone: Megaphone,
    Award: Award
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER WITH CINEMATIC VIDEO BACKDROP
          ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
        {/* Subtle Video Background behind header */}
        <div className="absolute inset-0 -top-28 -z-10 overflow-hidden rounded-3xl opacity-20 pointer-events-none">
          <video
            src={servicesHeroVideo}
            poster={servicesHeroFallback}
            muted
            loop
            autoPlay
            playsInline
            className="w-full h-full object-cover filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]" />
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            PLATINUM PRODUCTION INFRASTRUCTURE • FROM CONCEPT TO SILVER SCREEN
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase max-w-5xl mx-auto">
          END-TO-END PRODUCTION <span className="flame-gradient-text">CAPABILITIES</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed">
          From greenlight packaging and Oscar-caliber script development to massive practical set builds, 70mm cinematography, cutting-edge LED virtual production, and worldwide theatrical delivery.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenInquiry('Complete Full-Service Package')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider shadow-lg shadow-orange-950/40 hover:brightness-110 transition flex items-center space-x-2"
          >
            <span>REQUEST COMPREHENSIVE QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const element = document.getElementById('scope-calculator');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono tracking-wider transition flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4 text-orange-400" />
            <span>ESTIMATE PRODUCTION SCOPE</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          DETAILED 10 SERVICES BREAKDOWN
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {servicesData.map((svc, index) => {
          const IconComponent = iconMap[svc.icon] || Clapperboard;
          const isMasterTier = svc.id === 'complete-full-service';

          return (
            <div
              key={svc.id}
              id={svc.id}
              className={`rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                isMasterTier
                  ? 'bg-gradient-to-br from-[#161a26] via-[#0f1118] to-[#07080a] border-orange-500/40 shadow-2xl shadow-orange-950/30 p-8 sm:p-12'
                  : 'bg-[#0b0d14] border-white/10 hover:border-white/20 p-6 sm:p-10'
              }`}
            >
              {isMasterTier && (
                <div className="absolute top-0 right-0 px-6 py-1.5 bg-gradient-to-l from-orange-500 to-amber-500 text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-bl-xl shadow-lg">
                  FLAGSHIP 360° TURNKEY SLATE
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left col: Title, Tag, Number, Description */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-bold text-orange-400 px-2.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                      SERVICE {svc.number}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      {svc.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                      {svc.title}
                    </h2>
                    <p className="text-xs font-mono text-amber-300/80">
                      {svc.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {svc.detailedDesc || svc.shortDesc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      <span>TIMELINE: <strong className="text-zinc-200">{svc.timeline}</strong></span>
                    </div>
                    <div>
                      <span>TYPICAL SCOPE: <strong className="text-zinc-200">{svc.typicalBudgetRange}</strong></span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => onOpenInquiry(svc.title)}
                      className="px-6 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 hover:text-black border border-orange-500/30 text-orange-400 font-mono text-xs font-bold tracking-wider transition flex items-center space-x-2"
                    >
                      <span>INQUIRE THIS SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right col: 4 Key Capabilities & Deliverables */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-400" />
                    <span>Core Deliverables & Technical Execution</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.keyCapabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5"
                      >
                        <div className="text-xs font-mono font-bold text-white flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                          <span>{cap.name}</span>
                        </div>
                        <p className="text-[11px] font-sans text-zinc-400 leading-normal">
                          {cap.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Gear & Systems tags */}
                  {svc.technicalGear && (
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      <span className="text-zinc-500 uppercase tracking-wider">STUDIO GEAR:</span>
                      {svc.technicalGear.map((gear, gIdx) => (
                        <span
                          key={gIdx}
                          className="px-2.5 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10"
                        >
                          {gear}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* =========================================================================
          INTERACTIVE TOOL: ESTIMATE PRODUCTION SCOPE & RESOURCE FOOTPRINT
          (Matching Image 4 directly!)
          ========================================================================= */}
      <section id="scope-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#0d0f15] to-[#07080a] border border-orange-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ INTERACTIVE STUDIO TOOL ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
              ESTIMATE PRODUCTION SCOPE & RESOURCE FOOTPRINT
            </h2>
            <p className="text-sm text-zinc-400 font-sans">
              Calibrate your anticipated budget tier and optional technology add-ons to forecast production timeline, crew allocation, and eligible tax credit rebates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Slider for Budget Tier */}
              <div className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">
                    TARGET BUDGET TIER
                  </span>
                  <span className="text-2xl font-serif font-bold text-orange-400 font-mono">
                    ${budgetTier}M USD
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />

                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>$5M (Indie Auteur)</span>
                  <span>$45M (Mid-Tier Theatrical)</span>
                  <span>$150M+ (Global Tentpole)</span>
                </div>
              </div>

              {/* Addon Toggles */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                  Select Production Enhancements
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'scriptDoctor', title: 'Script Doctor / Writers Room', cost: '+$450K' },
                    { key: 'stuntPackage', title: 'Stunt & Action Rigging Unit', cost: '+$1.2M' },
                    { key: 'largeFormat70mm', title: '65mm/70mm Large Format Fleet', cost: '+$850K' },
                    { key: 'unrealLED', title: 'Unreal 5.5 Virtual LED Volume', cost: '+$2.4M' },
                    { key: 'dolbyAtmos', title: 'Dolby Atmos 9.1.6 Master Mix', cost: '+$600K' },
                    { key: 'globalScouting', title: 'Global Tactical Expedition Unit', cost: '+$750K' }
                  ].map((addon) => {
                    const active = selectedAddons[addon.key];
                    return (
                      <button
                        key={addon.key}
                        type="button"
                        onClick={() => toggleAddon(addon.key)}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                          active
                            ? 'bg-orange-500/15 border-orange-500 text-white'
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-medium font-sans">{addon.title}</div>
                          <div className="text-[10px] font-mono text-zinc-500">{addon.cost}</div>
                        </div>
                        <span className={`w-2.5 h-2.5 rounded-full ${active ? 'bg-orange-400' : 'bg-zinc-700'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Telemetry / Results Output */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#080a10] border border-white/15 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-white font-bold uppercase tracking-wider">
                  FORECASTED RESOURCE PROFILE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
                  ESTIMATION
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">PRODUCTION TIMELINE:</span>
                  <span className="text-white font-bold text-sm">~{estimatedWeeks} Weeks</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">CREW & ARTIST FOOTPRINT:</span>
                  <span className="text-white font-bold text-sm">~{estimatedCrew} Professionals</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">QUALIFYING TAX REBATE ({taxCreditPercentage}%):</span>
                  <span className="text-emerald-400 font-bold text-sm">~${estimatedTaxSavings}M Savings</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">MASTER QC DELIVERY:</span>
                  <span className="text-orange-400 font-bold">4K DCI DCP + 70mm Print</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenInquiry(`Estimate Package: $${budgetTier}M Slate`)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition flex items-center justify-center space-x-2"
                >
                  <span>READY TO PACKAGE THIS BUDGET? BOOK AUDIT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
