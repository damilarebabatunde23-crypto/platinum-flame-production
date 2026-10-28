import React, { useEffect } from 'react';
import { X, Play, Film, Award, Camera, User, Calendar, Clock, DollarSign, Share2 } from 'lucide-react';

export default function FilmDetailModal({ film, isOpen, onClose, onScreenTrailer }) {
  // Listen for Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !film) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#090b12] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/70 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Fixed Header Bar — ALWAYS VISIBLE, NEVER SCROLLS OUT OF VIEW */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0e111a]/95 backdrop-blur-md border-b border-white/15">
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping shrink-0" />
            <div className="truncate">
              <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
                ACTION PRODUCTION DOSSIER:
              </span>
              <span className="ml-2 font-serif font-bold text-white text-sm sm:text-base truncate">
                {film.title}
              </span>
            </div>
          </div>

          {/* Prominent High-Contrast Cancel / Close Button */}
          <button
            onClick={onClose}
            className="shrink-0 ml-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-red-950/60 transition-all transform active:scale-95 cursor-pointer border border-red-400/40"
            title="Cancel and close dossier (or press Escape)"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span className="tracking-wider">CANCEL / CLOSE</span>
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1">
          {/* Hero Backdrop with Action Poster Overlay */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10">
            <img 
              src={film.backdrop || film.poster} 
              alt={film.title}
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-[#090b12]/50 to-transparent" />

            {/* Quick Header Badges over Image */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-orange-500 text-black rounded uppercase">
                    {film.badge || 'ACTION RELEASE'}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-mono bg-white/10 text-zinc-200 border border-white/10 rounded">
                    {film.rtRating}
                  </span>
                  <span className="text-xs font-mono text-zinc-300">
                    {film.aspectRatio}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-wide">
                  {film.title}
                </h2>
                {film.tagline && (
                  <p className="text-xs sm:text-sm font-serif italic text-amber-300/90">
                    "{film.tagline}"
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onScreenTrailer) onScreenTrailer(film);
                }}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold hover:brightness-110 shadow-lg shadow-orange-950/40 transition shrink-0 cursor-pointer font-mono text-xs"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>PLAY ACTION TRAILER</span>
              </button>
            </div>
          </div>

          {/* Metadata Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs">
            <div>
              <div className="text-zinc-500 text-[10px] uppercase">RUNTIME</div>
              <div className="text-white font-semibold mt-1">{film.runtime}</div>
            </div>
            <div>
              <div className="text-zinc-500 text-[10px] uppercase">YEAR</div>
              <div className="text-white font-semibold mt-1">{film.year}</div>
            </div>
            <div>
              <div className="text-zinc-500 text-[10px] uppercase">GENRE</div>
              <div className="text-orange-400 font-semibold mt-1 truncate">{film.genre}</div>
            </div>
            <div>
              <div className="text-zinc-500 text-[10px] uppercase">GLOBAL BOX OFFICE</div>
              <div className="text-emerald-400 font-semibold mt-1">{film.boxOffice || '$500M+'}</div>
            </div>
          </div>

          {/* Synopsis & Action Logline */}
          <div className="space-y-2 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
              [ HIGH-OCTANE NARRATIVE & ACTION SYNOPSIS ]
            </h4>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
              {film.synopsis}
            </p>
          </div>

          {/* Key Cast & Crew Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center space-x-2">
                <User className="w-4 h-4 text-orange-400" />
                <span>Command & Creative Direction</span>
              </h4>
              <div className="space-y-2 text-xs sm:text-sm font-sans">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500 font-mono text-xs">DIRECTOR</span>
                  <span className="text-white font-medium">{film.director}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500 font-mono text-xs">DIRECTOR OF PHOTOGRAPHY</span>
                  <span className="text-zinc-200">{film.dop}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500 font-mono text-xs">ACTION SCORE</span>
                  <span className="text-zinc-200">{film.composer}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center space-x-2">
                <Camera className="w-4 h-4 text-orange-400" />
                <span>Tactical & Optical Pipeline</span>
              </h4>
              <div className="space-y-2 text-xs sm:text-sm font-sans">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500 font-mono text-xs">CAMERA RIG</span>
                  <span className="text-zinc-200">{film.cameras}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500 font-mono text-xs">COLOR PIPELINE</span>
                  <span className="text-zinc-200">{film.colorPipeline}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500 font-mono text-xs">THEATRICAL FORMAT</span>
                  <span className="text-zinc-200">{film.aspectRatio}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cast Members */}
          {film.cast && film.cast.length > 0 && (
            <div className="space-y-3 p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
                [ A-LIST ACTION CAST ENSEMBLE ]
              </h4>
              <div className="flex flex-wrap gap-2">
                {film.cast.map((actor, idx) => (
                  <span 
                    key={idx}
                    className="px-3.5 py-1.5 text-xs font-mono bg-black/60 border border-orange-500/30 rounded-lg text-amber-200 font-bold"
                  >
                    ★ {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Production Stills */}
          {film.stills && film.stills.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Production Frames & 70mm Stunts
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {film.stills.map((stillUrl, i) => (
                  <div key={i} className="aspect-video rounded-xl overflow-hidden border border-white/10 group">
                    <img 
                      src={stillUrl} 
                      alt={`Still ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {film.awards && film.awards.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center space-x-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs font-mono text-amber-200">
                <span className="font-bold text-amber-300">ACCOLADES & STUNT HONORS:</span> {film.awards.join(' • ')}
              </div>
            </div>
          )}
        </div>

        {/* Sticky/Fixed Footer Action Bar with CANCEL / CLOSE Button */}
        <div className="sticky bottom-0 z-50 flex items-center justify-between p-4 sm:p-5 bg-[#0b0d14] border-t border-white/15">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white font-mono text-xs font-bold flex items-center space-x-2 border border-white/20 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>CANCEL & CLOSE DOSSIER</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onScreenTrailer) onScreenTrailer(film);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-mono text-xs font-bold flex items-center space-x-2 shadow-lg shadow-orange-950/50 transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>WATCH ACTION TRAILER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
