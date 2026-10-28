import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Volume2, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Camera, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Phone, 
  Mail,
  Hammer,
  Shield,
  Briefcase,
  Lock,
  Compass,
  Sliders
} from 'lucide-react';
import { stagesData, globalHubsData, studioAmenitiesData } from '../data/locationsData';
import { locationsHeroVideo } from '../data/mediaAssets';

export default function LocationsPage({ onOpenInquiry, onOpenStageBooking }) {
  const [activeStageId, setActiveStageId] = useState('stage-01');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [activeHubId, setActiveHubId] = useState('los-angeles');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reserveForm, setReserveForm] = useState({
    name: '',
    email: '',
    company: '',
    stage: 'Stage 01: The Forge (LED Volume)',
    weeks: '6',
    date: '2027-03-01'
  });

  const activeStage = stagesData.find(s => s.id === activeStageId) || stagesData[0];
  const activeHub = globalHubsData.find(h => h.id === activeHubId) || globalHubsData[0];

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 2: "ARCHITECTURAL FORTRESSES FOR UNBOUNDED CINEMA")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            PLATINUM FLAME STUDIOS • SOUNDSTAGES • GLOBAL EXPEDITIONS
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase max-w-5xl mx-auto">
          ARCHITECTURAL FORTRESSES FOR <span className="flame-gradient-text">UNBOUNDED CINEMA</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed">
          Purpose-built soundstage facilities across Los Angeles, London, and Tokyo, coupled with an unmatched global scouting network across 40+ countries. Every square meter engineered for zero-compromise production.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenStageBooking(activeStage.name)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider shadow-lg shadow-orange-950/40 hover:brightness-110 transition flex items-center space-x-2"
          >
            <span>BOOK STAGE EXPLORATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenInquiry('Download Soundstage Tech Spec Sheet')}
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono tracking-wider transition flex items-center space-x-2"
          >
            <FileText className="w-4 h-4 text-orange-400" />
            <span>DOWNLOAD TECH SPEC SHEET (PDF)</span>
          </button>
        </div>

        {/* 5 Soundstage Quick Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-10 border-t border-white/10 text-center font-mono">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-bold text-white">06</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Soundstages (LA / UK)</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-bold text-amber-400">14</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Production Suites</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-bold text-orange-400">03</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">LED Volumes (Unreal 5.5)</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-bold text-emerald-400">45%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Qualifying Tax Credits</div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-bold text-cyan-400">NC-15</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Silent Acoustic Isolation</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          IMMERSIVE STAGE VISUALIZER (Matching Image 2 directly!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
                [ INTERACTIVE STAGE SPEC ]
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
                IMMERSIVE STAGE VISUALIZER
              </h2>
            </div>

            {/* Stage Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {stagesData.map((stg) => (
                <button
                  key={stg.id}
                  onClick={() => {
                    setActiveStageId(stg.id);
                    setActiveHotspot(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                    activeStageId === stg.id
                      ? 'bg-orange-500 text-black font-bold border-orange-500'
                      : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {stg.name.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Large Stage Visualizer Box with Live Video Background */}
          <div className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl aspect-[16/9] md:aspect-[21/9]">
            {activeStage.id === 'stage-01' ? (
              <video
                src={locationsHeroVideo}
                poster={activeStage.image}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover filter brightness-[0.7] contrast-115 scale-105"
              />
            ) : (
              <img
                src={activeStage.image}
                alt={activeStage.name}
                className="w-full h-full object-cover filter brightness-[0.75] contrast-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

            {/* Clickable Hotspots overlay */}
            {activeStage.hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                <button
                  onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500/90 text-black flex items-center justify-center font-bold text-xs shadow-lg shadow-orange-500/50 hover:scale-125 transition-transform animate-pulse"
                >
                  ✦
                </button>

                {/* Hotspot tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-[#0c0e15] border border-orange-500/50 shadow-2xl text-left z-30 transition-all pointer-events-none ${
                  activeHotspot?.id === spot.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                }`}>
                  <div className="font-mono text-xs font-bold text-orange-400">{spot.title}</div>
                  <div className="text-[11px] font-sans text-zinc-300 mt-1 leading-normal">{spot.desc}</div>
                </div>
              </div>
            ))}

            {/* Overlay Specs Card on Top Right */}
            <div className="absolute top-4 right-4 z-10 hidden sm:block">
              <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
                CLICK HOTSPOTS FOR ARCHITECTURAL SPEC
              </span>
            </div>

            {/* Bottom Specs Bar inside Visualizer */}
            <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-10 p-4 sm:p-6 rounded-2xl bg-[#0a0c12]/85 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
                  {activeStage.name} • {activeStage.type}
                </div>
                <div className="text-xs text-zinc-300 font-sans max-w-xl line-clamp-1 mt-0.5">
                  {activeStage.description}
                </div>
              </div>

              <div className="flex items-center space-x-6 text-xs font-mono">
                <div>
                  <div className="text-zinc-500">FOOTPRINT</div>
                  <div className="text-white font-bold">{activeStage.dimensions}</div>
                </div>
                <div>
                  <div className="text-zinc-500">CLEARANCE</div>
                  <div className="text-amber-400 font-bold">{activeStage.height}</div>
                </div>
                <div>
                  <div className="text-zinc-500">POWER</div>
                  <div className="text-zinc-200">{activeStage.power}</div>
                </div>
                <button
                  onClick={() => onOpenStageBooking(activeStage.name)}
                  className="px-4 py-2 rounded-lg bg-orange-500 text-black font-bold hover:brightness-110 transition shrink-0"
                >
                  RESERVE
                </button>
              </div>
            </div>
          </div>

          {/* 4 Stage Selector Thumbnail Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {stagesData.map((stage) => (
              <div
                key={stage.id}
                onClick={() => {
                  setActiveStageId(stage.id);
                  setActiveHotspot(null);
                }}
                className={`p-4 rounded-xl cursor-pointer border transition ${
                  activeStageId === stage.id
                    ? 'bg-orange-500/10 border-orange-500'
                    : 'bg-[#0c0e15] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-zinc-900">
                  <img src={stage.image} alt={stage.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-serif font-bold text-sm text-white">{stage.name}</div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1">{stage.dimensions} • {stage.height}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          GLOBAL PRODUCTION HUBS & TACTICAL SCOUTING (Matching Image 2)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ WORLD PRODUCTION HUBS ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              GLOBAL PRODUCTION HUBS & TACTICAL SCOUTING
            </h2>
            <p className="text-sm text-zinc-400 font-sans max-w-2xl">
              Platinum Flame operates 5 primary territorial production divisions, offering seamless access to high-value government tax rebates, union crews, and exotic terrain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Hubs Selector on Left (5 cards) */}
            <div className="lg:col-span-5 space-y-3">
              {globalHubsData.map((hub) => (
                <div
                  key={hub.id}
                  onClick={() => setActiveHubId(hub.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition flex items-center justify-between ${
                    activeHubId === hub.id
                      ? 'bg-orange-500/15 border-orange-500 text-white shadow-lg shadow-orange-950/20'
                      : 'bg-[#0c0e15] border-white/10 text-zinc-300 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-serif font-bold text-sm text-white">{hub.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                        {hub.country}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">{hub.taxCredit}</div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition ${activeHubId === hub.id ? 'text-orange-400 translate-x-1' : 'text-zinc-600'}`} />
                </div>
              ))}
            </div>

            {/* Selected Hub Interactive Dossier */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0b0d14] border border-white/10 space-y-6">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-white/10">
                <img src={activeHub.image} alt={activeHub.name} className="w-full h-full object-cover filter brightness-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-orange-500 text-black text-[10px] font-mono font-bold uppercase">
                      {activeHub.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                      {activeHub.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{activeHub.coordinates}</span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">FACILITIES:</span>
                  <span className="text-zinc-200">{activeHub.facilities}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">STAGE INVENTORY:</span>
                  <span className="text-zinc-200">{activeHub.stages}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">TAX INCENTIVE:</span>
                  <span className="text-emerald-400 font-bold">{activeHub.taxCredit}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">ADDRESS:</span>
                  <span className="text-zinc-300">{activeHub.address}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">DIRECT LINE:</span>
                  <span className="text-orange-400 font-semibold">{activeHub.phone}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onOpenStageBooking(activeHub.name)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 transition text-center"
                >
                  REQUEST STAGE RESERVATION AT {activeHub.city.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STUDIO AMENITIES & PRODUCTION ECOSYSTEM (Matching Image 2)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ STUDIO INFRASTRUCTURE ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            STUDIO AMENITIES & PRODUCTION ECOSYSTEM
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioAmenitiesData.map((amenity, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                {idx === 0 ? <Hammer className="w-5 h-5" /> : idx === 1 ? <Shield className="w-5 h-5" /> : idx === 2 ? <Briefcase className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <h4 className="font-serif font-bold text-base text-white">{amenity.title}</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{amenity.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          RESERVE STAGE SPACE & RECEIVE RATE CARD FORM (Matching Image 2 bottom)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#0d0f15] to-[#07080a] border border-orange-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
                [ STAGE AVAILABILITY & RESERVATION ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
                RESERVE STAGE SPACE & RECEIVE RATE CARD
              </h2>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                Stage availability is updated continuously across our Los Angeles and London campuses. Submit your target shoot window to receive immediate availability holds and confidential studio rate cards.
              </p>
              <div className="space-y-2 font-mono text-xs text-zinc-400 pt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Provisional 72-Hour Hold placed on submission</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Full CAD stage layout and rigging load charts included</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#080a0f] border border-white/10">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-white">Rate Card & Hold Dispatched</h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    Check your email for the complete architectural package.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReserveSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Producer / UPM Name"
                      value={reserveForm.name}
                      onChange={(e) => setReserveForm({ ...reserveForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Official Email"
                      value={reserveForm.email}
                      onChange={(e) => setReserveForm({ ...reserveForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={reserveForm.stage}
                      onChange={(e) => setReserveForm({ ...reserveForm, stage: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs text-zinc-300"
                    >
                      <option value="Stage 01: The Forge (LED Volume)">Stage 01: The Forge (LED Volume)</option>
                      <option value="Stage 02: The Titan Tank">Stage 02: The Titan Tank</option>
                      <option value="Stage 03: The Mega Lot">Stage 03: The Mega Lot</option>
                      <option value="Stage 04: The Arctic Outpost">Stage 04: Arctic Outpost</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Shoot Duration (e.g. 8 Weeks)"
                      value={reserveForm.weeks}
                      onChange={(e) => setReserveForm({ ...reserveForm, weeks: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition"
                  >
                    SUBMIT INQUIRY & RECEIVE RATE CARD
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
