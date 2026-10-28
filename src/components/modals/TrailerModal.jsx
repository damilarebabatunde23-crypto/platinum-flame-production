import React, { useEffect } from 'react';
import { X, Play, Film, Award, Sparkles, Volume2 } from 'lucide-react';
import ActionMovieTrailer from '../ActionMovieTrailer';

export default function TrailerModal({ film, isOpen, onClose }) {
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
        className="relative w-full max-w-5xl bg-[#090b10] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-orange-950/70 my-auto flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky/Fixed Header with prominent CANCEL / CLOSE button */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0e111a] border-b border-white/15">
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold truncate">
                PLATINUM FLAME PRODUCTION LLC
              </span>
              <span className="hidden sm:inline text-zinc-600">•</span>
              <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest truncate">
                OFFICIAL ACTION THEATRICAL TRAILER
              </span>
            </div>
          </div>

          {/* Prominent High-Contrast Cancel / Close Button */}
          <button
            onClick={onClose}
            className="shrink-0 ml-3 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-red-950/60 transition-all transform active:scale-95 cursor-pointer border border-red-400/40"
            title="Cancel and close trailer (or press Escape)"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span className="tracking-wider">CANCEL / CLOSE</span>
          </button>
        </div>

        {/* Action Movie Trailer Player */}
        <div className="relative aspect-video w-full bg-black overflow-hidden shrink-0">
          <ActionMovieTrailer autoPlay={true} muted={false} />
        </div>

        {/* Bottom Film Details & Secondary Close Bar */}
        <div className="p-4 sm:p-5 bg-[#0a0c13] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-y-auto">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40 uppercase">
                {film.title}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">{film.genre}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">DIR. {film.director}</span>
            </div>
            <div className="text-xs font-mono text-amber-200">
              <span className="text-zinc-500 font-semibold uppercase">STARRING: </span>
              {film.cast ? film.cast.join(' • ') : 'Christian Bale • Cate Blanchett • Cillian Murphy • Florence Pugh'}
            </div>
          </div>

          {/* Bottom Secondary Big Cancel Button */}
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 border border-white/20 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>CLOSE TRAILER</span>
          </button>
        </div>
      </div>
    </div>
  );
}
