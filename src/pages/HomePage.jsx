import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause,
  ArrowRight, 
  Award, 
  Film, 
  Sparkles, 
  Layers, 
  Camera, 
  Users, 
  MapPin, 
  Tv, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  PhoneCall, 
  FileText,
  CheckCircle2,
  Send,
  Volume2,
  VolumeX,
  Maximize2,
  Disc,
  Radio,
  Sliders,
  Eye,
  Loader2
} from 'lucide-react';
import { submitProjectInquiry } from '../services/supabaseService';
import { filmsData } from '../data/filmsData';
import { 
  heroVideoOptions,
  homeReelVideo,
  homeReelFallback,
  homeCTAVideo,
  homeCTAFallback,
  filmPreviewVideos
} from '../data/mediaAssets';
import SoundscapePlayer from '../components/SoundscapePlayer';
import ActionMovieTrailer from '../components/ActionMovieTrailer';
import { soundEngine } from '../utils/audioSystem';

export default function HomePage({ setActivePage, onOpenInquiry, onScreenTrailer, onSelectFilm }) {
  const [filterGenre, setFilterGenre] = useState('ALL');
  const [quickFormSubmitted, setQuickFormSubmitted] = useState(false);
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);
  const [quickReferenceCode, setQuickReferenceCode] = useState('');
  const [quickFormData, setQuickFormData] = useState({
    name: '',
    email: '',
    type: 'Theatrical Feature Film',
    budget: '$15M - $50M',
    details: ''
  });

  // Hero Video State
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [heroVideoError, setHeroVideoError] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroMuted, setHeroMuted] = useState(true);
  const [hoveredFilmId, setHoveredFilmId] = useState(null);
  const [activeStingFilmId, setActiveStingFilmId] = useState(null);

  // Timecode simulation
  const [timecode, setTimecode] = useState('00:01:24:18');

  // Interactive Cinema Player State (middle section)
  const [theatreMode, setTheatreMode] = useState('trailer'); // 'trailer' | 'cinematography'
  const [cinemaPlaying, setCinemaPlaying] = useState(false);
  const [cinemaAspectRatio, setCinemaAspectRatio] = useState('2.39:1'); // '2.39:1' | '1.43:1' | '16:9'
  const [cinemaChapter, setCinemaChapter] = useState(0);

  const heroVideoRef = useRef(null);
  const cinemaVideoRef = useRef(null);

  const activeHero = heroVideoOptions[activeHeroIndex];

  // Update timecode counter
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const frames = Math.floor((now.getMilliseconds() / 1000) * 24).toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTimecode(`01:${minutes}:${seconds}:${frames}`);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // When activeHeroIndex changes, reload video
  useEffect(() => {
    setHeroVideoReady(false);
    setHeroVideoError(false);
    if (heroVideoRef.current) {
      heroVideoRef.current.load();
      heroVideoRef.current.play().catch(() => {});
    }
  }, [activeHeroIndex]);

  const toggleHeroPlay = () => {
    if (heroVideoRef.current) {
      if (heroVideoRef.current.paused) {
        heroVideoRef.current.play();
        setHeroPaused(false);
      } else {
        heroVideoRef.current.pause();
        setHeroPaused(true);
      }
    }
  };

  const toggleHeroMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setHeroMuted(heroVideoRef.current.muted);
    }
  };

  const toggleCinemaPlay = () => {
    if (cinemaVideoRef.current) {
      if (cinemaVideoRef.current.paused) {
        cinemaVideoRef.current.play();
        setCinemaPlaying(true);
      } else {
        cinemaVideoRef.current.pause();
        setCinemaPlaying(false);
      }
    }
  };

  const handlePlaySting = (film) => {
    setActiveStingFilmId(film.id);
    const key = film.id.includes('chronos') ? 'D' : film.id.includes('obsidian') ? 'A' : 'C';
    soundEngine.playFilmScoreSting(key);
    setTimeout(() => {
      setActiveStingFilmId(null);
    }, 3200);
  };

  const featuredFilms = filmsData.slice(0, 4);

  const filteredFilms = filterGenre === 'ALL'
    ? featuredFilms
    : filmsData.filter(f => f.genre.toUpperCase().includes(filterGenre.toUpperCase()));

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    setIsQuickSubmitting(true);
    try {
      const result = await submitProjectInquiry({
        name: quickFormData.name,
        email: quickFormData.email,
        budgetTier: quickFormData.budget,
        details: quickFormData.details,
        selectedServices: [quickFormData.type],
        projectTitle: `${quickFormData.name}'s Fast Submission`
      });
      setQuickReferenceCode(result.referenceCode);
      setQuickFormSubmitted(true);
      setQuickFormData({ name: '', email: '', type: 'Theatrical Feature Film', budget: '$15M - $50M', details: '' });
    } catch (err) {
      console.error('Fast submit error:', err);
      setQuickFormSubmitted(true);
    } finally {
      setIsQuickSubmitting(false);
    }
  };

  const servicesPreview = [
    {
      num: "01",
      title: "Development & Script",
      desc: "Oscar-caliber script doctoring, writers room packaging, historical research, and commercial budget modeling.",
      tag: "Pre-Production",
      serviceId: "development-script"
    },
    {
      num: "02",
      title: "Casting & Star Talent",
      desc: "Direct packaging with premier talent agencies (CAA, WME, UTA), international stunt units, and guild negotiations.",
      tag: "Ensemble Packaging",
      serviceId: "casting-talent"
    },
    {
      num: "03",
      title: "Soundstages & Scouting",
      desc: "Purpose-built soundstage lots across Hollywood, London, and Tokyo plus expedition scouting in 40+ countries.",
      tag: "Facilities & Locations",
      serviceId: "locations-scouting"
    },
    {
      num: "04",
      title: "Virtual Production & LED",
      desc: "Flagship 28,000 sq ft Stage 01 volume with real-time Unreal 5.5 rendering, camera tracking, and photochemical bridge.",
      tag: "ICVFX Stage",
      serviceId: "post-production-vfx"
    },
    {
      num: "05",
      title: "VFX & Color Mastering",
      desc: "Barco 4K laser projection grading suites, organic CGI simulations, and Meyer Sound 9.1.6 Dolby Atmos mixing.",
      tag: "Optical Finishing",
      serviceId: "post-production-vfx"
    },
    {
      num: "06",
      title: "Theatrical Distribution",
      desc: "Direct relationships with IMAX and global distributors, festival premiere campaigns, and Dolby Cinema marketing.",
      tag: "Worldwide P&A",
      serviceId: "marketing-distribution"
    }
  ];

  const cinemaChapters = [
    { title: "01. THE OBSIDIAN CROWN", time: "00:00", desc: "Christian Bale & Cate Blanchett • Palme d'Or Winner 70mm" },
    { title: "02. AURA BOREALIS", time: "01:45", desc: "Leonardo DiCaprio & Zendaya • Arctic IMAX 15/70mm" },
    { title: "03. VELVET SOVEREIGN", time: "03:12", desc: "Timothée Chalamet & Ana de Armas • European Crime Heist" },
    { title: "04. CHRONOS: PRIME", time: "04:30", desc: "Oscar Isaac & Charlize Theron • 70mm Quantum Master" }
  ];

  return (
    <div className="relative min-h-screen bg-[#07080a] text-zinc-100 overflow-hidden">
      {/* =========================================================================
          HERO SECTION: Full-screen cinematic VIDEO backdrop (Universal Pictures Clarity)
          ========================================================================= */}
      <section className="relative min-h-[96vh] sm:min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Video Layer — 100% Clear, Vivid, & Unobscured */}
        <div className="absolute inset-0 z-0">
          {!heroVideoError && (
            <video
              ref={heroVideoRef}
              src={activeHero.src}
              poster={activeHero.poster}
              muted={heroMuted}
              loop
              autoPlay
              playsInline
              preload="auto"
              onCanPlay={() => setHeroVideoReady(true)}
              onError={() => setHeroVideoError(true)}
              className="w-full h-full object-cover transition-opacity duration-700"
              style={{
                filter: 'brightness(0.95) contrast(1.05) saturate(1.05)',
                opacity: heroVideoReady ? 1 : 0.8,
              }}
            />
          )}

          {/* High-Res Static Poster Fallback */}
          <img
            src={activeHero.poster}
            alt="Cinematic Background"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{
              filter: 'brightness(0.95) contrast(1.05)',
              opacity: heroVideoReady && !heroVideoError ? 0 : 1,
            }}
          />

          {/* Minimalist Studio Vignette — Video Remains 100% Clear in the Center */}
          {/* Top subtle bar for navbar contrast */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
          
          {/* Bottom gentle blend into the studio dark floor */}
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#07080a] via-[#07080a]/70 to-transparent pointer-events-none" />
          
          {/* Subtle side edges vignette */}
          <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 pointer-events-none" />

          {/* Film Perforations simulation overlay (top and bottom edges) */}
          <div className="absolute top-0 inset-x-0 h-5 flex overflow-hidden opacity-25 pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="flex-1 mx-0.5 my-1 bg-white/40 rounded-sm" />
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-0 h-5 flex overflow-hidden opacity-25 pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="flex-1 mx-0.5 my-1 bg-white/40 rounded-sm" />
            ))}
          </div>
        </div>

        {/* Top-Right Telemetry & Timecode HUD */}
        <div className="absolute top-28 right-6 z-20 hidden md:flex items-center space-x-3 text-[11px] font-mono">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-zinc-400">REC</span>
            <span className="text-white font-bold">{timecode}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-amber-400 font-bold">
            4K UHD 24FPS
          </div>
        </div>

        {/* Main Hero Typography & Content (Universal Pictures Style Blockbuster Clarity) */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          {/* Universal Style Active Reel Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-amber-300 font-bold uppercase">
              {activeHero.tagline || 'ESTABLISHED 1996 • HOLLYWOOD • LONDON • TOKYO'}
            </span>
          </div>

          {/* Studio Crest Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-black p-1 border border-white/30 shadow-2xl shadow-orange-950/60 group hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
              <div className="w-full h-full rounded-[14px] bg-[#07080a] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-12 h-12 filter drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
                  <circle cx="50" cy="50" r="46" stroke="#CBD5E1" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M50 14 C58 28 72 38 72 58 C72 74 61 84 50 86 C39 84 28 74 28 58 C28 38 42 28 50 14 Z" fill="url(#heroFlame)" />
                  <path d="M50 34 C54 44 62 50 62 62 C62 70 56 76 50 78 C44 76 38 70 38 62 C38 50 46 44 50 34 Z" fill="#07080a" />
                  <path d="M50 44 C52 50 56 54 56 62 C56 66 53 69 50 70 C47 69 44 66 44 62 C44 54 48 50 50 44 Z" fill="url(#heroFlame)" />
                  <circle cx="50" cy="58" r="3" fill="#fff" />
                  <defs>
                    <linearGradient id="heroFlame" x1="0%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="60%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#FDE047" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Main Title & Suffix (LLC MUST BE LAST) with Blockbuster Drop Shadows */}
          <div className="space-y-4 px-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black tracking-tight text-white uppercase leading-[1.08] drop-shadow-[0_6px_24px_rgba(0,0,0,0.95)] break-words">
              PLATINUM FLAME<br />
              <span className="flame-gradient-text">PRODUCTION</span>{' '}
              <span className="text-orange-400 font-mono text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest align-middle inline-block">LLC</span>
            </h1>

            <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase text-zinc-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
              “Igniting Cinema. From Spark to Screen.”
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenInquiry()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#EA580C] text-black font-semibold text-sm font-mono tracking-wider shadow-2xl shadow-orange-950/70 hover:brightness-110 active:scale-95 transition flex items-center justify-center space-x-2"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActivePage('films');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/60 hover:bg-black/80 text-white font-mono text-sm tracking-wider border border-white/20 backdrop-blur-md transition flex items-center justify-center space-x-2 shadow-xl"
            >
              <Film className="w-4 h-4 text-orange-400" />
              <span>VIEW OUR FILMS</span>
            </button>

            <button
              onClick={() => onScreenTrailer(featuredFilms[0])}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500/25 to-amber-500/20 hover:from-orange-500/35 hover:to-amber-500/30 text-orange-200 font-mono text-sm tracking-wider border border-orange-500/60 backdrop-blur-md transition flex items-center justify-center space-x-2.5 shadow-2xl shadow-orange-950/50 group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <Play className="w-4 h-4 fill-current text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold">PLAY ACTION TRAILER (PLATINUM FLAME LLC)</span>
            </button>
          </div>

          {/* Hero Bottom Bar: Video Switcher & Audio Controls (Fully Responsive on All Devices) */}
          <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 max-w-4xl mx-auto w-full px-2">
            {/* 3 Video Track Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 w-full lg:w-auto">
              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase px-2 hidden sm:inline">
                REEL STREAM:
              </span>
              {heroVideoOptions.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveHeroIndex(i)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition ${
                    activeHeroIndex === i
                      ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-950/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt.name.split('.')[1] || opt.name}
                </button>
              ))}
            </div>

            {/* Video Playback & Audio Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={toggleHeroPlay}
                className="p-2 px-3 rounded-xl bg-black/70 border border-white/15 text-zinc-300 hover:text-white transition flex items-center space-x-1.5 text-xs font-mono"
                title={heroPaused ? "Resume Hero Video" : "Pause Hero Video"}
              >
                {heroPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                <span className="text-[10px] uppercase font-bold">{heroPaused ? 'PLAY' : 'PAUSE'}</span>
              </button>

              <button
                onClick={toggleHeroMute}
                className={`p-2 px-3 rounded-xl border transition flex items-center space-x-1.5 text-xs font-mono ${
                  heroMuted
                    ? 'bg-black/70 border-white/15 text-zinc-400 hover:text-white'
                    : 'bg-orange-500/20 border-orange-500/60 text-orange-400 font-bold shadow-md shadow-orange-950/30'
                }`}
                title={heroMuted ? "Unmute Hero Audio" : "Mute Hero Audio"}
              >
                {heroMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
                <span className="text-[10px] uppercase font-bold">
                  {heroMuted ? 'UNMUTE AUDIO' : 'AUDIO ON'}
                </span>
              </button>

              {/* Compact Soundscape Atmosphere Trigger */}
              <SoundscapePlayer compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE AUDIO SUITE: DOLBY ATMOS SYNTHETIC SOUNDSCAPE (EXPANDABLE)
          ========================================================================= */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6 relative z-20">
        <SoundscapePlayer compact={false} />
      </section>

      {/* =========================================================================
          STUDIO MANIFESTO & LIVE SLATE TELEMETRY
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-white/[0.08] bg-[#090b10]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Studio Editorial Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ MANIFESTO 01 ]
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              A powerhouse studio engineering{' '}
              <span className="flame-gradient-text">cinematic spectacles</span>, narrative masterworks, and next-generation global franchises.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans font-normal">
              From our soundstage campuses in Hollywood and London to custom-curated LED volumes in Tokyo, Platinum Flame operates with an uncompromising ethos: total creative sovereignty backed by heavyweight infrastructure. We merge classical photochemical emulsion with cutting-edge real-time virtual engines, delivering unforgettable theatrical journeys to audiences worldwide.
            </p>

            <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>UNCOMPROMISED ARTISTIC CONTROL</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>70MM & DCI-P3 LABS</span>
              </div>
            </div>
          </div>

          {/* Right: Live Studio Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0e111a] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-mono text-xs text-zinc-300 font-bold uppercase tracking-wider">
                    PRODUCTION STATUS: ACTIVE SLATE 2026/27
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE
                </span>
              </div>

              <div className="py-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">MASTER FILMING:</span>
                  <span className="text-white font-medium">3 Units On Location (LA, Pinewood, Iceland)</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">SOUNDSTAGE OCCUPANCY:</span>
                  <span className="text-amber-400 font-bold">88% Capacity</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">ACTIVE VFX SHOTS:</span>
                  <span className="text-cyan-400 font-medium">4,120 Rendering (Unreal 5.5 Cluster)</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">AUDIO MASTERING:</span>
                  <span className="text-white font-medium">Stage B Dolby Atmos 9.1.6 Array</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>VERIFIED STUDIO INFRASTRUCTURE</span>
                <span className="text-orange-400 font-semibold">TISAX TIER 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STUDIO STATS BAR
          ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#07080a] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-serif font-black text-white">180+</div>
            <div className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Films Produced</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-serif font-black text-amber-400">42</div>
            <div className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Oscar Nominations</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-serif font-black text-white">2,500+</div>
            <div className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Talent & Crew Network</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-serif font-black text-orange-400">28</div>
            <div className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Global Soundstages</div>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-1">
            <div className="text-3xl sm:text-5xl font-serif font-black text-emerald-400">$4.8B</div>
            <div className="text-xs font-mono tracking-wider text-zinc-400 uppercase">Global Box Office</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 4K CINEMA THEATRE (MIDDLE VIDEO SHOWCASE)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050608] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
                [ CINEMA PROSCENIUM & THEATRE ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
                STUDIO PRODUCTION THEATRE
              </h2>
              <p className="text-sm text-zinc-400 font-sans max-w-xl">
                Experience real action cinema engineered by Platinum Flame Production LLC starring Academy Award winners with explosive sound design.
              </p>
            </div>

            {/* Stream Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2 bg-black/70 p-1.5 rounded-2xl border border-white/15">
              <button
                onClick={() => setTheatreMode('trailer')}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition flex items-center space-x-2 ${
                  theatreMode === 'trailer'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold shadow-lg shadow-orange-950/50'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                <span>ACTION TRAILER (PLATINUM FLAME LLC)</span>
              </button>

              <button
                onClick={() => setTheatreMode('cinematography')}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition ${
                  theatreMode === 'cinematography'
                    ? 'bg-orange-500 text-black font-bold shadow-lg shadow-orange-950/50'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                70MM SCOPE SHOWREEL
              </button>

              {theatreMode === 'cinematography' && (
                <div className="hidden sm:flex items-center space-x-1 pl-2 border-l border-white/10">
                  {['2.39:1', '1.43:1', '16:9'].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setCinemaAspectRatio(ratio)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                        cinemaAspectRatio === ratio
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Master Video Display Canvas */}
          {theatreMode === 'trailer' ? (
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <ActionMovieTrailer autoPlay={false} muted={false} />
            </div>
          ) : (
            <div className="relative rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group">
              {/* Aspect Container */}
              <div
                className={`relative w-full mx-auto transition-all duration-500 ${
                  cinemaAspectRatio === '2.39:1'
                    ? 'aspect-[2.39/1]'
                    : cinemaAspectRatio === '1.43:1'
                    ? 'aspect-[1.43/1] max-w-4xl'
                    : 'aspect-video'
                }`}
              >
                <video
                  ref={cinemaVideoRef}
                  src={homeReelVideo}
                  poster={homeReelFallback}
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover filter brightness-100 contrast-105"
                />

                {/* Subtle Bottom Controls Gradient Only */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

                {/* Center Play Button Overlay (Clear, No Blur) */}
                {!cinemaPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button
                      onClick={toggleCinemaPlay}
                      className="w-20 h-20 rounded-full bg-orange-500 text-black flex items-center justify-center shadow-2xl shadow-orange-950/80 hover:scale-110 active:scale-95 transition-all pointer-events-auto group"
                      title="Play 4K Master Video"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>
                )}

                {/* Bottom Video HUD Controller */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col space-y-3 z-10">
                  {/* Scrub Bar */}
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group/scrub">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 w-1/3 rounded-full relative">
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover/scrub:opacity-100 transition" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={toggleCinemaPlay}
                        className="p-1.5 rounded-lg bg-black/60 hover:bg-orange-500 hover:text-black text-white border border-white/20 transition"
                      >
                        {cinemaPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <span className="text-zinc-200 font-bold">{timecode}</span>
                      <span className="text-zinc-500">/</span>
                      <span className="text-zinc-400">00:08:45:00</span>
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-[10px]">
                        DOLBY ATMOS 9.1.6
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-zinc-300">
                      <span className="text-[10px] uppercase hidden sm:inline font-bold text-amber-400">4K PRORES 4444 XQ</span>
                      <button
                        onClick={() => onScreenTrailer(featuredFilms[0])}
                        className="hover:text-white flex items-center space-x-1 p-1 bg-black/60 rounded border border-white/10"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] hidden sm:inline">FULLSCREEN</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter Selectors Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cinemaChapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCinemaChapter(idx);
                  if (cinemaVideoRef.current) {
                    cinemaVideoRef.current.currentTime = idx * 60;
                    cinemaVideoRef.current.play();
                    setCinemaPlaying(true);
                  }
                }}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                  cinemaChapter === idx
                    ? 'bg-orange-500/10 border-orange-500/50 shadow-lg'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${cinemaChapter === idx ? 'text-orange-400' : 'text-zinc-300'}`}>
                    {ch.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{ch.time}</span>
                </div>
                <div className="text-[11px] font-sans text-zinc-400 leading-tight">
                  {ch.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPLETE PRODUCTION PIPELINE (SERVICES OVERVIEW)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ ARCHITECTURE OF PRODUCTION ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
              COMPLETE PRODUCTION PIPELINE
            </h2>
            <p className="text-sm text-zinc-400 font-sans">
              End-to-end execution from development and packaging through soundstages, VFX, and global theatrical distribution.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 text-xs font-mono text-orange-400 hover:text-orange-300 font-semibold uppercase tracking-wider group"
          >
            <span>EXPLORE ALL 10 SERVICES</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesPreview.map((svc) => (
            <div
              key={svc.num}
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-8 rounded-2xl glass-card cursor-pointer group hover:border-orange-500/40 relative overflow-hidden flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-orange-400 font-bold px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                    {svc.tag}
                  </span>
                  <span className="font-mono text-2xl font-black text-zinc-700 group-hover:text-zinc-500 transition">
                    {svc.num}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-200 transition">
                  {svc.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {svc.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-orange-400 transition">
                <span>INQUIRE CAPABILITY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FEATURED ACTION MOTION PICTURES (ACTION MOVIES & BOX OFFICE SLATE)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header & Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
                [ MASTERPIECE GALLERY & BOX OFFICE ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
                FEATURED ACTION MOTION PICTURES
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl">
                High-octane tentpoles engineered by Platinum Flame Production LLC starring Hollywood's biggest action icons. Click any film for full dossier or trailer.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'ACTION', 'TACTICAL', 'SCI-FI ACTION', 'HEIST'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setFilterGenre(genre)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-lg border transition ${
                    filterGenre === genre
                      ? 'bg-orange-500 text-black font-bold border-orange-500 shadow-md shadow-orange-950/40'
                      : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Action Films Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFilms.map((film, index) => {
              const previewVideo = filmPreviewVideos[index % filmPreviewVideos.length];
              const isHovered = hoveredFilmId === film.id;
              const isPlayingSting = activeStingFilmId === film.id;

              return (
                <div
                  key={film.id}
                  onMouseEnter={() => setHoveredFilmId(film.id)}
                  onMouseLeave={() => setHoveredFilmId(null)}
                  className="group relative rounded-2xl overflow-hidden bg-[#0d0f17] border border-white/10 hover:border-orange-500/50 transition duration-500 flex flex-col justify-between shadow-2xl"
                >
                  {/* Poster / Backdrop with Video Layer on Hover */}
                  <div 
                    onClick={() => onSelectFilm(film)}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-black cursor-pointer"
                  >
                    {/* Hover Looping Video — 100% Bright, Vivid & Clear */}
                    <video
                      src={previewVideo}
                      muted
                      loop
                      autoPlay={isHovered}
                      playsInline
                      preload="none"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0'
                      }`}
                      style={{ filter: 'brightness(1.0) contrast(1.05)' }}
                    />

                    {/* Static Image Base */}
                    <img
                      src={film.backdrop || film.poster}
                      alt={film.title}
                      className={`w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition duration-500 ${
                        isHovered ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    
                    {/* Bottom-only subtle vignette for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0d0f17] via-[#0d0f17]/40 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono font-bold text-orange-400 border border-orange-500/40 uppercase">
                        {film.badge || 'ACTION TENTPOLE'}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-zinc-200 border border-white/10 font-bold">
                        {film.rtRating}
                      </span>
                    </div>

                    {/* Live Preview Indicator Badge on hover */}
                    {isHovered && (
                      <div className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-orange-500/50 flex items-center space-x-1.5 text-[10px] font-mono text-orange-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                        <span>ACTION PREVIEW LIVE</span>
                      </div>
                    )}

                    {/* Trailer Play Trigger Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onScreenTrailer(film);
                        }}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-mono text-xs font-bold flex items-center space-x-2 shadow-2xl hover:scale-105 transition transform cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>SCREEN ACTION TRAILER</span>
                      </button>
                    </div>
                  </div>

                  {/* Film Description Body with A-List Star Cast */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-bold border border-orange-500/30">
                        {film.genre}
                      </span>
                      <span>•</span>
                      <span>{film.runtime}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">{film.status}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectFilm(film)}
                      className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide group-hover:text-amber-200 transition cursor-pointer"
                    >
                      {film.title}
                    </h3>

                    {/* Prominent A-List Star Cast Line */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center space-x-2 text-xs font-mono">
                      <span className="text-orange-400 font-bold uppercase shrink-0 text-[10px] tracking-wider">ACTION CAST:</span>
                      <span className="text-amber-200 font-medium truncate">
                        {film.cast.slice(0, 3).join(' • ')}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 font-sans">
                      {film.synopsis}
                    </p>

                    <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-[11px] font-mono text-zinc-400">
                      <div>
                        <span className="text-zinc-500">DIRECTOR:</span> {film.director}
                      </div>
                      <div>
                        <span className="text-zinc-500">ASPECT:</span> {film.aspectRatio}
                      </div>
                    </div>

                    {/* Action Bar with clear, high-contrast buttons */}
                    <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5">
                      <button
                        onClick={() => handlePlaySting(film)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition cursor-pointer ${
                          isPlayingSting
                            ? 'bg-orange-500/20 border-orange-500/60 text-orange-400 font-bold'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                        }`}
                        title="Audition orchestral film score motif"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isPlayingSting ? 'animate-pulse text-orange-400' : ''}`} />
                        <span>{isPlayingSting ? 'SCORING...' : 'SCORE MOTIF'}</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onSelectFilm(film)}
                          className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-bold transition flex items-center space-x-1.5 border border-white/15 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-zinc-400" />
                          <span>DOSSIER</span>
                        </button>

                        <button
                          onClick={() => onScreenTrailer(film)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-mono text-xs font-bold transition flex items-center space-x-1.5 shadow-lg shadow-orange-950/40 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>TRAILER</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => {
                setActivePage('films');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white font-mono text-xs tracking-wider transition inline-flex items-center space-x-2"
            >
              <span>ACCESS FULL SLATE ARCHIVE & CRITERION VAULT (34 TITLES)</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAST INQUIRY CTA: VIDEO-BACKED "BRING YOUR VISION TO THE SILVER SCREEN"
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Thermal Lava Video Backdrop */}
        <video
          src={homeCTAVideo}
          poster={homeCTAFallback}
          muted
          loop
          autoPlay
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.18) saturate(0.8)' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <img
          src={homeCTAFallback}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.18)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#07080a]/90 via-[#10131d]/80 to-[#07080a]/90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left pitch */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
                  [ FAST-TRACK PRODUCTION ACQUISITION ]
                </span>

                <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
                  BRING YOUR VISION TO THE <span className="flame-gradient-text">SILVER SCREEN</span>
                </h2>

                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Whether you are packaging a $150M theatrical tentpole, seeking priority soundstage space, or need a turn-key post-production master, our executive acquisitions board reviews every submission within 48 hours.
                </p>

                <div className="pt-2 space-y-3 font-mono text-xs">
                  <div className="flex items-center space-x-3 text-zinc-300">
                    <PhoneCall className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>DIRECT EXECUTIVE LINE: <strong className="text-white">+1 907-205-2163</strong></span>
                  </div>

                  <div className="flex items-center space-x-3 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping shrink-0" />
                    <span>OFFICIAL EMAIL: <strong className="text-orange-400">mypersonalemailboxln@gmail.com</strong></span>
                  </div>

                  <div className="flex items-center space-x-3 text-zinc-300">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>STUDIO HQ: <strong className="text-zinc-200">1809 Forest Avenue, New York, NY 10001 USA</strong></span>
                  </div>

                  <div className="flex items-center space-x-3 text-zinc-300">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AUTOMATIC MUTUAL NDA ENCRYPTION (MPAA / TISAX TIER 3)</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onOpenInquiry()}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-mono text-xs tracking-wider transition"
                  >
                    REQUEST FULL STUDIO RATE CARD DOSSIER (PDF)
                  </button>
                </div>
              </div>

              {/* Right Fast Form */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#080a0f]/80 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                      FAST PRODUCTION SUBMISSION
                    </span>
                    <span className="text-[10px] font-mono text-orange-400">PAGE 01</span>
                  </div>

                  {quickFormSubmitted ? (
                    <div className="py-8 text-center space-y-3">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                      <h4 className="text-lg font-serif font-bold text-white">Transmitted to Acquisitions</h4>
                      {quickReferenceCode && (
                        <div className="inline-block px-3 py-1 bg-zinc-900 border border-orange-500/40 rounded-lg font-mono text-xs text-orange-400">
                          DOSSIER TOKEN: {quickReferenceCode}
                        </div>
                      )}
                      <p className="text-xs text-zinc-400 font-mono">
                        Our executive board has received your parameters. Expect direct communication shortly.
                      </p>
                      <button
                        onClick={() => setQuickFormSubmitted(false)}
                        className="text-xs font-mono text-orange-400 hover:underline pt-2 block mx-auto"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleQuickSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Producer / Executive Name"
                          value={quickFormData.name}
                          onChange={(e) => setQuickFormData({ ...quickFormData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="email"
                          required
                          placeholder="Executive Email"
                          value={quickFormData.email}
                          onChange={(e) => setQuickFormData({ ...quickFormData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                        />

                        <select
                          value={quickFormData.budget}
                          onChange={(e) => setQuickFormData({ ...quickFormData, budget: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-xs text-zinc-300"
                        >
                          <option value="Under $5M">Under $5M</option>
                          <option value="$5M - $15M">$5M - $15M</option>
                          <option value="$15M - $50M">$15M - $50M</option>
                          <option value="$50M - $150M+">$50M - $150M+</option>
                        </select>
                      </div>

                      <div>
                        <textarea
                          rows={3}
                          required
                          placeholder="Brief overview of project concept, preferred shooting dates, or soundstage requirements..."
                          value={quickFormData.details}
                          onChange={(e) => setQuickFormData({ ...quickFormData, details: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isQuickSubmitting}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {isQuickSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>TRANSMITTING TO ACQUISITIONS...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>SUBMIT TO ACQUISITIONS TEAM</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
