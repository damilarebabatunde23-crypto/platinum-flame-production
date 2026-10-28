import React, { useState, useRef } from 'react';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  Film, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Calendar,
  Building,
  Quote,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { teamData, studioMilestones, studioPillars } from '../data/teamData';
import { aboutHeroVideo, aboutHeroFallback } from '../data/mediaAssets';

export default function AboutPage({ onOpenInquiry, setActivePage }) {
  const [activeDecadeIndex, setActiveDecadeIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const activeMilestone = studioMilestones[activeDecadeIndex];

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setVideoMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 5: "THE ARCHITECTURE OF IMAGINATION")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            THE HISTORIC CANON • ARCHIVE & PRINCIPLES • ESTABLISHED 1996
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase max-w-5xl mx-auto">
          THE ARCHITECTURE OF <span className="flame-gradient-text">IMAGINATION</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed">
          Founded on the conviction that great films are forged, not manufactured. Platinum Flame Production LLC unites the highest technical mastery with pure directorial vision across soundstages, locations, and post-production laboratories worldwide.
        </p>

        {/* Studio Box Office & Heritage Counter */}
        <div className="flex items-center justify-center space-x-8 pt-4 font-mono">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white">34+</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Masterworks</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-400">$4.82B</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Global Box Office</div>
          </div>
        </div>

        {/* Hero Stage Video Banner */}
        <div className="relative mt-8 rounded-3xl overflow-hidden aspect-[21/9] bg-zinc-950 border border-white/10 shadow-2xl group">
          <video
            ref={videoRef}
            src={aboutHeroVideo}
            poster={aboutHeroFallback}
            muted={videoMuted}
            loop
            autoPlay
            playsInline
            className="w-full h-full object-cover filter brightness-80 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-black/40 pointer-events-none" />

          {/* Floating Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
            <button
              onClick={toggleVideoPlay}
              className="p-2 rounded-lg bg-black/60 hover:bg-orange-500 hover:text-black border border-white/10 text-white transition backdrop-blur-md"
            >
              {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={toggleVideoMute}
              className={`p-2 rounded-lg border transition backdrop-blur-md ${
                videoMuted ? 'bg-black/60 border-white/10 text-zinc-400' : 'bg-orange-500/20 border-orange-500 text-orange-400'
              }`}
            >
              {videoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-300 z-10">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>SUNSET LOT STAGE 04 • PRINCIPAL PHOTOGRAPHY ACTIVE</span>
            </span>
            <span className="hidden sm:inline">ACES 1.3 PHOTOCHEMICAL MASTER PIPELINE • 4K PRORES</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: FROM ROGUE UNDERGROUND ATELIER TO GLOBAL AUTHORITY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ ORIGIN & TRAJECTORY ]
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              FROM ROGUE UNDERGROUND ATELIER TO GLOBAL CINEMA AUTHORITY
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              In 1996, in a shuttered aeronautical hangar in Burbank, California, Platinum Flame began with a rebellious provocation: Hollywood studios had surrendered poetry to spreadsheets. Our founders pooled their resources to buy two 35mm cameras, an editing flatbed, and 20,000 feet of Kodak raw stock.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Three decades later, our footprint encompasses 28 state-of-the-art soundstages, three dedicated LED volumes, and a global guild network spanning Los Angeles, London, and Tokyo. Yet our core principle remains unchanged: we exist to serve the auteur, to engineer the impossible, and to preserve cinema as the supreme temple of human drama.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-300 space-y-1">
              <div className="text-orange-400 font-bold">TOTAL END-TO-END CREATIVE INTEGRATION</div>
              <p className="text-zinc-400">
                Zero handoff friction between screenplay draft, soundstage production, photochemical color grade, and global 4K theatrical exhibition.
              </p>
            </div>
          </div>

          {/* Right: Studio footprint cards */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-orange-400 font-bold">
                <span>NEW YORK — GLOBAL HEADQUARTERS</span>
                <span className="text-[10px] bg-orange-500/10 px-2 py-0.5 rounded">STUDIO HQ</span>
              </div>
              <p className="text-zinc-200 font-medium">1809 Forest Avenue, New York, NY 10001 USA</p>
              <div className="text-zinc-400 text-[11px] font-mono">+1 907-205-2163 • mypersonalemailboxln@gmail.com</div>
              <div className="text-zinc-500 text-[11px]">Executive Suites • 28,000 sq ft LED Volume • 4K Barco Laser Screening Suite</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>PINEWOOD — THE TITAN HANGAR</span>
                <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded">UK GATE</span>
              </div>
              <p className="text-zinc-300">Pinewood Gate 12, Iver Heath, UK</p>
              <div className="text-zinc-500 text-[11px]">34,000 sq ft Water Tank • 34% UK AVEC Incentive Qualified</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-cyan-400 font-bold">
                <span>TOKYO — ROPPONGI LIGHT LAB</span>
                <span className="text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded">ASIA PACIFIC</span>
              </div>
              <p className="text-zinc-300">Roppongi Hills Atelier, Minato City, Tokyo</p>
              <div className="text-zinc-500 text-[11px]">Motion Capture Research • J-LOD Government Incentive Unit</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE FOUR PILLARS OF PURE AUTHORSHIP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ STUDIO DOCTRINE ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            THE FOUR PILLARS OF PURE AUTHORSHIP
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioPillars.map((pillar) => (
            <div key={pillar.number} className="p-8 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-4 relative overflow-hidden group hover:border-orange-500/30 transition">
              <span className="font-mono text-3xl font-black text-zinc-700 group-hover:text-orange-500/60 transition">
                {pillar.number}
              </span>
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition">
                {pillar.title}
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: COMPLETE 360° END-TO-END PIPELINE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#0d0f15] to-[#07080a] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
                [ PRODUCTION ARCHITECTURE ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
                COMPLETE 360° END-TO-END PIPELINE
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Traditional studios subcontract 80% of their operations to fragmented vendors. Platinum Flame owns and commands the entire lifecycle: from initial writer packaging and practical set construction to proprietary VFX simulation, 9.1.6 Dolby Atmos mix, and 4K DCP theatrical mastering.
              </p>

              <div className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>Phase 1: Inception, Writers Room & IP Rights Clearance</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Phase 2: Soundstage Principal Photography & Practical Stunts</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Phase 3: 70mm Photochemical Laboratory & Dolby Atmos Mix</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Phase 4: Global Theatrical P&A, Cannes/Venice & IMAX Windowing</span>
                </div>
              </div>
            </div>

            {/* Orbital Visualizer Graphic */}
            <div className="lg:col-span-6 flex items-center justify-center p-6">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-dashed border-orange-500/30 flex items-center justify-center animate-spin-slow">
                <div className="w-56 h-56 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-orange-500/10 border border-orange-500/40 flex flex-col items-center justify-center text-center p-2">
                    <span className="font-serif font-bold text-white text-xs tracking-widest uppercase">PLATINUM</span>
                    <span className="font-mono text-[9px] text-orange-400">CORE CANON</span>
                  </div>
                </div>

                {/* Satellite Points */}
                <span className="absolute top-0 -translate-y-1/2 px-2.5 py-1 rounded bg-zinc-900 border border-orange-500 text-[10px] font-mono text-orange-400 font-bold">
                  01 INCEPTION
                </span>
                <span className="absolute right-0 translate-x-1/2 px-2.5 py-1 rounded bg-zinc-900 border border-amber-500 text-[10px] font-mono text-amber-400 font-bold">
                  02 PHYSICAL
                </span>
                <span className="absolute bottom-0 translate-y-1/2 px-2.5 py-1 rounded bg-zinc-900 border border-cyan-500 text-[10px] font-mono text-cyan-400 font-bold">
                  03 POST-MASTER
                </span>
                <span className="absolute left-0 -translate-x-1/2 px-2.5 py-1 rounded bg-zinc-900 border border-emerald-500 text-[10px] font-mono text-emerald-400 font-bold">
                  04 EXHIBITION
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: STUDIO MILESTONES: 1996 — 2026 (Matching Image 5)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ HISTORICAL CHRONOLOGY ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              STUDIO MILESTONES: 1996 — 2026
            </h2>
          </div>

          {/* Decade tabs */}
          <div className="flex flex-wrap gap-2">
            {studioMilestones.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setActiveDecadeIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                  activeDecadeIndex === idx
                    ? 'bg-orange-500 text-black font-bold border-orange-500'
                    : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20'
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Milestone Card with photo */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0e15] border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold">
              YEAR {activeMilestone.year}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {activeMilestone.title}
            </h3>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {activeMilestone.desc}
            </p>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{activeMilestone.highlight}</span>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[16/10] bg-black border border-white/10">
            <img
              src={activeMilestone.image}
              alt={activeMilestone.title}
              className="w-full h-full object-cover filter brightness-85"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE HALL OF ACCOLADES (Matching Image 5)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-12">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ INSTITUTIONAL RECOGNITION ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
            THE HALL OF ACCOLADES
          </h2>
          <p className="text-sm text-zinc-400 font-sans max-w-xl mx-auto">
            Our productions have claimed cinema's most prestigious laurels, validated by guilds and international film academies.
          </p>
        </div>

        {/* 4 Accolade Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Award className="w-8 h-8 text-amber-400 mx-auto" />
            <div className="text-4xl font-serif font-black text-white">24</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-widest">Academy Awards</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Award className="w-8 h-8 text-orange-400 mx-auto" />
            <div className="text-4xl font-serif font-black text-white">38</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-widest">BAFTA Accolades</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Award className="w-8 h-8 text-amber-300 mx-auto" />
            <div className="text-4xl font-serif font-black text-white">19</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-widest">Golden Globes</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
            <div className="text-4xl font-serif font-black text-white">08</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-widest">Cannes Laureates</div>
          </div>
        </div>

        {/* Trade Industry Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0a0c12] border border-white/10 space-y-3 font-serif">
            <div className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">VARIETY</div>
            <p className="text-xs italic text-zinc-300 leading-relaxed">
              "Platinum Flame has quietly emerged as the gold standard for dramatic ambition, proving that big-budget cinema can still possess an auteur soul."
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a0c12] border border-white/10 space-y-3 font-serif">
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">THE HOLLYWOOD REPORTER</div>
            <p className="text-xs italic text-zinc-300 leading-relaxed">
              "Their virtual production and large-format pipeline is without peer. When directors want absolute fidelity, this is where they shoot."
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a0c12] border border-white/10 space-y-3 font-serif">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">DEADLINE</div>
            <p className="text-xs italic text-zinc-300 leading-relaxed">
              "Few production houses command the respect of both Hollywood executives and Cannes jury presidents. Platinum Flame stands alone."
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: EXECUTIVE LEADERSHIP & BOARD (Matching Image 5)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ STUDIO ARCHITECTS ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            EXECUTIVE LEADERSHIP & BOARD
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.slice(0, 4).map((leader) => (
            <div key={leader.id} className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-4 group hover:border-orange-500/30 transition">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition">
                  {leader.name}
                </h3>
                <p className="text-[11px] font-mono text-orange-400">
                  {leader.title}
                </p>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-3 font-sans leading-relaxed">
                {leader.bio}
              </p>

              <div className="pt-2 text-[10px] font-mono text-zinc-500 border-t border-white/5">
                NOTABLE: {leader.credits.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PARTNER WITH THE VANGUARD CTA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#0d0f15] to-[#07080a] border border-orange-500/30 shadow-2xl text-center space-y-6">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ NEXT GENERATION SLATE ]
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide max-w-3xl mx-auto">
            PARTNER WITH THE VANGUARD OF MOTION PICTURES.
          </h2>

          <p className="text-sm text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Enter private discussions for co-production, stage availability, or full-service turnkey packaging. Our executive acquisitions board reviews every submission directly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenInquiry('Partner Co-Production')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition"
            >
              START PRODUCTION SLATE
            </button>

            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono tracking-wider transition"
            >
              SUBMIT ACQUISITION DECK
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
