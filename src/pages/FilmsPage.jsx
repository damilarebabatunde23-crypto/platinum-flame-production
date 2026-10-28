import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Film, 
  Grid, 
  List, 
  Award, 
  Sparkles, 
  Download, 
  TrendingUp, 
  Camera, 
  Tv, 
  Clock, 
  Eye, 
  Share2, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { filmsData } from '../data/filmsData';
import { filmPreviewVideos, filmsHeroVideo, filmsHeroFallback } from '../data/mediaAssets';
import { soundEngine } from '../utils/audioSystem';

export default function FilmsPage({ onScreenTrailer, onSelectFilm, onOpenInquiry }) {
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedStillIndex, setSelectedStillIndex] = useState(0);
  const [spotlightPlaying, setSpotlightPlaying] = useState(false);
  const [spotlightMuted, setSpotlightMuted] = useState(true);
  const [hoveredFilmId, setHoveredFilmId] = useState(null);
  const [activeStingFilmId, setActiveStingFilmId] = useState(null);
  const spotlightVideoRef = useRef(null);

  const toggleSpotlightPlay = (e) => {
    e.stopPropagation();
    if (spotlightVideoRef.current) {
      if (spotlightVideoRef.current.paused) {
        spotlightVideoRef.current.play();
        setSpotlightPlaying(true);
      } else {
        spotlightVideoRef.current.pause();
        setSpotlightPlaying(false);
      }
    }
  };

  const toggleSpotlightMute = (e) => {
    e.stopPropagation();
    if (spotlightVideoRef.current) {
      spotlightVideoRef.current.muted = !spotlightVideoRef.current.muted;
      setSpotlightMuted(spotlightVideoRef.current.muted);
    }
  };

  const handlePlaySting = (e, film) => {
    e.stopPropagation();
    setActiveStingFilmId(film.id);
    const key = film.id.includes('chronos') ? 'D' : film.id.includes('obsidian') ? 'A' : 'C';
    soundEngine.playFilmScoreSting(key);
    setTimeout(() => {
      setActiveStingFilmId(null);
    }, 3200);
  };

  // Tentpole Spotlight Film: The Obsidian Crown
  const spotlightFilm = filmsData.find(f => f.id === 'the-obsidian-crown') || filmsData[1];

  const genres = [
    'ALL',
    'SCI-FI',
    'PSYCHOLOGICAL THRILLER',
    'HISTORICAL EPIC',
    'NOIR DRAMA'
  ];

  const statuses = [
    'ALL',
    'In Theaters',
    'Streaming Worldwide',
    'Post-Production',
    'Festival Circuit',
    'Legacy Vault'
  ];

  const years = ['ALL', '2026', '2025', '2024', 'Legacy'];

  const filteredFilms = filmsData.filter(film => {
    const matchesGenre = selectedGenre === 'ALL' || film.genre.toUpperCase().includes(selectedGenre);
    const matchesStatus = selectedStatus === 'ALL' || film.status === selectedStatus;
    const matchesYear = selectedYear === 'ALL' || 
      (selectedYear === 'Legacy' ? parseInt(film.year) < 2024 : film.year === selectedYear);
    return matchesGenre && matchesStatus && matchesYear;
  });

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 1: "THE STUDIO SLATE")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
                ARCHIVE & ACTIVE CANON • VOL. IX
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white uppercase">
              THE STUDIO <span className="flame-gradient-text">SLATE</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              An archive of bold storytelling, revolutionary visuals, and cultural milestones engineered across world stages and photochemical celluloid.
            </p>
          </div>

          {/* Slate Stats Counters */}
          <div className="flex items-center space-x-8 shrink-0 font-mono text-right">
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-black text-white">34</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Feature Titles</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-black text-amber-400">18</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Academy Noms</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-black text-emerald-400">4.8B</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Global Box Office</div>
            </div>
          </div>
        </div>

        {/* Filters and Layout Switcher */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Genre Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider border transition ${
                    selectedGenre === genre
                      ? 'bg-orange-500 text-black font-bold border-orange-500'
                      : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {genre === 'ALL' ? 'ALL GENRES' : genre}
                </button>
              ))}
            </div>

            {/* Grid / Table Toggle */}
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-white/[0.04] border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Secondary Status & Year Filters */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center space-x-2">
              <span className="text-zinc-600">STATUS:</span>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-2.5 py-1 rounded ${
                      selectedStatus === st
                        ? 'text-orange-400 font-bold bg-orange-500/10 border border-orange-500/30'
                        : 'hover:text-zinc-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FILM CARDS GRID (Matching Image 1: Chronos Prime, Velvet Sovereign, etc.)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFilms.map((film, index) => {
              const previewVideo = filmPreviewVideos[index % filmPreviewVideos.length];
              const isHovered = hoveredFilmId === film.id;
              const isPlayingSting = activeStingFilmId === film.id;

              return (
                <div
                  key={film.id}
                  onMouseEnter={() => setHoveredFilmId(film.id)}
                  onMouseLeave={() => setHoveredFilmId(null)}
                  className="group rounded-2xl overflow-hidden bg-[#0c0e15] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Poster / Backdrop with Video on Hover */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <video
                      src={previewVideo}
                      muted
                      loop
                      autoPlay={isHovered}
                      playsInline
                      preload="none"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        isHovered ? 'opacity-100 scale-105' : 'opacity-0'
                      }`}
                      style={{ filter: 'brightness(0.9) contrast(1.15)' }}
                    />
                    <img
                      src={film.backdrop || film.poster}
                      alt={film.title}
                      className={`w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition duration-500 ${
                        isHovered ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-black/60 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-orange-400 border border-orange-500/30 uppercase">
                        {film.badge || '70MM RELEASE'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                        {film.rtRating}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-[10px] font-mono text-zinc-300 z-10">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span className="uppercase">{film.status}</span>
                    </div>

                    {isHovered && (
                      <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-orange-500/40 text-[9px] font-mono text-orange-400">
                        VIDEO PREVIEW
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="text-orange-400">{film.genre}</span>
                        <span>{film.runtime}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide group-hover:text-amber-200 transition">
                        {film.title}
                      </h3>

                      {/* Starring A-List Cast */}
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center space-x-1.5 text-[11px] font-mono">
                        <span className="text-orange-400 font-bold uppercase text-[9px] shrink-0">STARRING:</span>
                        <span className="text-amber-200 font-medium truncate">{film.cast.slice(0, 3).join(' • ')}</span>
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                        {film.synopsis}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
                      <div className="flex justify-between">
                        <span className="text-zinc-600">DIRECTOR:</span>
                        <span className="text-zinc-200 font-medium">{film.director}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">ASPECT:</span>
                        <span className="text-zinc-200">{film.aspectRatio}</span>
                      </div>
                    </div>

                    {/* Audio Score Audition & Action buttons */}
                    <div className="pt-2 space-y-2">
                      <button
                        onClick={(e) => handlePlaySting(e, film)}
                        className={`w-full py-1.5 rounded-lg border text-xs font-mono transition flex items-center justify-center space-x-1.5 ${
                          isPlayingSting
                            ? 'bg-orange-500/20 border-orange-500/60 text-orange-400 font-bold'
                            : 'bg-white/[0.03] hover:bg-white/10 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                        title="Audition orchestral film score motif"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isPlayingSting ? 'animate-pulse text-orange-400' : ''}`} />
                        <span>{isPlayingSting ? 'AUDITIONING DOLBY MOTIF...' : 'AUDITION SCORE MOTIF'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onScreenTrailer(film)}
                          className="flex-1 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-mono text-xs font-bold tracking-wider transition flex items-center justify-center space-x-1.5 shadow-md shadow-orange-950/30"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>TRAILER</span>
                        </button>
                        <button
                          onClick={() => onSelectFilm(film)}
                          className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs transition"
                          title="View Details"
                        >
                          DOSSIER
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-2xl bg-[#0c0e15] border border-white/10">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#12141c] border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Film Title</th>
                  <th className="p-4">Genre</th>
                  <th className="p-4">Director</th>
                  <th className="p-4">Optical Format</th>
                  <th className="p-4">Runtime</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {filteredFilms.map((film) => (
                  <tr key={film.id} className="hover:bg-white/[0.02] transition">
                    <td className="p-4 font-serif font-bold text-white text-sm">
                      {film.title}
                    </td>
                    <td className="p-4 text-orange-400">{film.genre}</td>
                    <td className="p-4 text-zinc-200">{film.director}</td>
                    <td className="p-4 text-zinc-400">{film.aspectRatio}</td>
                    <td className="p-4">{film.runtime}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px]">
                        {film.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => onScreenTrailer(film)}
                        className="px-3 py-1 rounded bg-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-black border border-orange-500/30 transition text-[11px]"
                      >
                        Trailer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* =========================================================================
          FEATURED SPOTLIGHT: THE OBSIDIAN CROWN (Directly from Image 1!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12141e] via-[#0d0f16] to-[#07080a] border border-orange-500/30 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="inline-block px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
                FEATURED SPOTLIGHT • TENTPOLE RELEASE
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
                THE OBSIDIAN CROWN
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl font-sans">
                A transcendent psychological thriller tracing the ascension of a prodigy chess grandmaster entangled in cold-war quantum computing espionage across Vienna and Reykjavik.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => onScreenTrailer(spotlightFilm)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition"
              >
                SCREEN IN PRIVATE THEATER
              </button>
              <button
                onClick={() => onSelectFilm(spotlightFilm)}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 font-mono text-xs tracking-wider transition"
              >
                PRESS DOSSIER (EPK)
              </button>
            </div>
          </div>

          {/* Interactive Player Frame & Technical Slate Dossier Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Player Frame on Left with LIVE Video Player */}
            <div className="lg:col-span-7 space-y-4">
              <div 
                className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 group shadow-2xl"
              >
                <video
                  ref={spotlightVideoRef}
                  src={spotlightFilm.trailerUrl || filmsHeroVideo}
                  poster={spotlightFilm.backdrop || spotlightFilm.poster}
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Big center play icon if not playing */}
                {!spotlightPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs">
                    <button
                      onClick={toggleSpotlightPlay}
                      className="w-16 h-16 rounded-full bg-orange-500 text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition transform"
                    >
                      <Play className="w-7 h-7 fill-current translate-x-0.5" />
                    </button>
                  </div>
                )}

                {/* Controls overlay */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs font-mono text-zinc-300 z-10">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleSpotlightPlay}
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-orange-500 hover:text-black border border-white/10 transition"
                    >
                      {spotlightPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                    <button
                      onClick={toggleSpotlightMute}
                      className={`p-1.5 rounded-lg border transition ${
                        spotlightMuted ? 'bg-black/70 border-white/10 text-zinc-400' : 'bg-orange-500/20 border-orange-500 text-orange-400'
                      }`}
                    >
                      {spotlightMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <span className="px-2.5 py-1 rounded bg-black/80 border border-white/10 text-orange-400 font-bold hidden sm:inline">
                      TEASER 01 • 4K DOLBY ATMOS
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onScreenTrailer(spotlightFilm)}
                      className="px-3 py-1 rounded bg-orange-500 text-black font-bold text-[11px] hover:bg-orange-400 transition"
                    >
                      CINEMA MODE
                    </button>
                  </div>
                </div>
              </div>

              {/* Stills strip */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>PRODUCTION STILLS • UNIT PHOTOGRAPHY</span>
                  <span className="text-orange-400">01 / 18</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {spotlightFilm.stills.map((still, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectFilm(spotlightFilm)}
                      className="aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer group"
                    >
                      <img
                        src={still}
                        alt="Still"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Slate Dossier on Right */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#090b12] border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-zinc-400 font-bold uppercase tracking-wider">
                  PRODUCTION SLATE RECORD APP/2026/09
                </span>
                <span className="text-[10px] font-mono text-orange-400">VERIFIED</span>
              </div>

              {/* Cannes Laureate quote */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-serif text-amber-200 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-amber-300 font-mono text-[11px]">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Palme d'Or Contender</span>
                </div>
                <p className="italic">
                  "A tour de force of cinematic choreography and tension." — Cahiers du Cinéma
                </p>
              </div>

              {/* Credits */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">DIRECTOR:</span>
                  <span className="text-white font-medium">{spotlightFilm.director}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">DOP:</span>
                  <span className="text-zinc-200">{spotlightFilm.dop}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">ORIGINAL SCORE:</span>
                  <span className="text-zinc-200">{spotlightFilm.composer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">PRINCIPAL CAMERAS:</span>
                  <span className="text-zinc-200">{spotlightFilm.cameras}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">COLOR PIPELINE:</span>
                  <span className="text-zinc-200">{spotlightFilm.colorPipeline}</span>
                </div>
              </div>

              {/* Box office trajectory simulation */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">DOMESTIC VS WORLDWIDE TRAJECTORY:</span>
                  <span className="text-emerald-400 font-bold">$384.2M</span>
                </div>

                {/* Simulated Curve Line */}
                <div className="h-10 w-full flex items-end space-x-2 pt-2">
                  <div className="flex-1 bg-zinc-800 h-2 rounded-t" title="Week 01" />
                  <div className="flex-1 bg-zinc-700 h-4 rounded-t" title="Week 04" />
                  <div className="flex-1 bg-amber-500/60 h-7 rounded-t" title="Week 08" />
                  <div className="flex-1 bg-orange-500 h-9 rounded-t shadow-[0_0_8px_rgba(249,115,22,0.8)]" title="Week 12" />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>Week 01 ($56M)</span>
                  <span>Week 04 ($175M)</span>
                  <span>Week 12 ($384M)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LEGACY VAULT & ACCOLADES (Matching Image 1 bottom)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ THE HERITAGE COLLECTION ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
            LEGACY VAULT & ACCOLADES
          </h2>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl">
            Two decades of redefining cinematic craft. Download authorized exhibition DCP manifests and comprehensive press packets.
          </p>
        </div>

        {/* 4 Accolade metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Award className="w-6 h-6 text-amber-400" />
            <div className="text-2xl font-serif font-bold text-white">06 Oscars</div>
            <p className="text-xs text-zinc-400 font-sans">
              Including Best Picture, Cinematography, Sound Design, and Visual Effects.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Award className="w-6 h-6 text-orange-400" />
            <div className="text-2xl font-serif font-bold text-white">12 BAFTAs</div>
            <p className="text-xs text-zinc-400 font-sans">
              Recognized across UK production stages for Outstanding British Film and Design.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Award className="w-6 h-6 text-amber-300" />
            <div className="text-2xl font-serif font-bold text-white">04 Golden Globes</div>
            <p className="text-xs text-zinc-400 font-sans">
              Best Dramatic Motion Picture and Best Original Score honors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-2">
            <Tv className="w-6 h-6 text-cyan-400" />
            <div className="text-2xl font-serif font-bold text-white">100% 4K DCP</div>
            <p className="text-xs text-zinc-400 font-sans">
              Complete library preserved on archival 70mm and uncompressed Master DCI packages.
            </p>
          </div>
        </div>

        {/* Restored Masterworks: The Criterion Canon */}
        <div className="p-8 rounded-2xl bg-[#0a0c12] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2 font-mono text-xs text-white font-bold uppercase tracking-wider">
              <Film className="w-4 h-4 text-orange-400" />
              <span>Restored Masterworks (The Criterion Canon)</span>
            </div>
            <button
              onClick={() => onOpenInquiry('Master Vault Access')}
              className="text-xs font-mono text-orange-400 hover:text-orange-300"
            >
              REQUEST MASTER ACCESS ↗
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="font-serif font-bold text-white text-base">Aura Borealis</div>
              <div className="text-[11px] font-mono text-zinc-400">1998 • Dir. Julian Croft</div>
              <div className="text-xs text-amber-400 font-mono">Oscar Winner • 4K Remaster</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="font-serif font-bold text-white text-base">The Berlin Wire</div>
              <div className="text-[11px] font-mono text-zinc-400">2004 • Dir. Astrid Meyer</div>
              <div className="text-xs text-orange-400 font-mono">BAFTA Winner • Atmos Mix</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="font-serif font-bold text-white text-base">Cortex Nexus</div>
              <div className="text-[11px] font-mono text-zinc-400">2012 • Dir. Marcus Vance</div>
              <div className="text-xs text-cyan-400 font-mono">Cannes Jury Prize • IMAX HDR</div>
            </div>
          </div>
        </div>

        {/* Download Global Press & Exhibition Kits Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#141722] to-[#0a0c12] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                Download Global Press & Exhibition Kits
              </h4>
              <p className="text-xs text-zinc-400 font-sans">
                High-resolution key art assets, production notes, sound cues, and guild screening credentials.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenInquiry('Download EPK Pack')}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-semibold tracking-wider transition shrink-0"
          >
            DOWNLOAD EPK PACK (14.2 GB)
          </button>
        </div>
      </section>
    </div>
  );
}
