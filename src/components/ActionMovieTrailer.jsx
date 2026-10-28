import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Sparkles, Film, Award, Shield, Zap, Crosshair } from 'lucide-react';

/**
 * ActionMovieTrailer
 * A high-octane human action movie trailer (John Wick / Sicario / Mission Impossible style)
 * for PLATINUM FLAME PRODUCTION LLC.
 *
 * Features:
 *  - Real human firearm combat, tactical room-clearing, martial arts & stunts (NO CARTOONS)
 *  - Official Platinum Flame Production LLC studio vanity bumper
 *  - Hollywood star billing: Keanu Reeves, Christian Bale, Charlize Theron, Donnie Yen
 *  - Dynamic action sound design (sub-bass impacts, gun recoil pulses, orchestral risers)
 *  - Seamless cuts between tactical breach, close-quarters gun-fu, and explosive stunts
 *  - Live track selector allowing users to switch between action sequences
 */

const ACTION_TRACKS = [
  { id: 'tactical', label: 'Tactical Breach', src: '/videos/action-tactical.mp4' },
  { id: 'gun', label: 'Gun-Fu Firearm Duel', src: '/videos/action-gun.mp4' },
  { id: 'combat', label: 'Hand-to-Hand Combat', src: '/videos/action-combat.mp4' },
  { id: 'soldier', label: 'Urban Assault', src: '/videos/action-soldier.mp4' },
  { id: 'explosion', label: 'Explosive Charge', src: '/videos/action-explosion.mp4' }
];

export default function ActionMovieTrailer({ 
  autoPlay = false, 
  muted = false, 
  onClose = null,
  isHero = false 
}) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(32); // 32-second high-energy action trailer
  const [phase, setPhase] = useState('bumper'); // 'bumper' | 'teaser' | 'action' | 'stars' | 'title' | 'credits'
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-switch action video cuts matching trailer progression
  const phaseVideoSrc = {
    bumper: '/videos/action-tactical.mp4',
    teaser: '/videos/action-tactical.mp4',
    action: '/videos/action-gun.mp4',
    stars: '/videos/action-combat.mp4',
    title: '/videos/action-explosion.mp4',
    credits: '/videos/action-police.mp4'
  };

  const activeVideoSrc = ACTION_TRACKS[currentTrackIndex]?.src || phaseVideoSrc[phase];

  // Trigger cinematic sound design for trailer phases
  const playSoundEffect = (type) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      if (type === 'impact') {
        // Deep Hollywood Inception / John Wick sub-bass boom
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(65, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 1.8);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, now);
        filter.frequency.exponentialRampToValueAtTime(40, now + 1.8);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.2);
      } else if (type === 'gunshot') {
        // High-velocity tactical gunshot thump
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'riser') {
        // Action tension riser
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 2.5);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 2.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.8);
      } else if (type === 'hit') {
        // Metallic orchestral brass hit
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(146.8, now); // D3
        osc2.frequency.setValueAtTime(220.0, now); // A3

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.2);
        osc2.stop(now + 1.2);
      }
    } catch (e) {}
  };

  // Main Trailer Timeline Sequence (32 seconds total)
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= duration) {
            return 0; // loop trailer
          }
          return next;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  // Phase controller based on timecode
  useEffect(() => {
    if (currentTime < 4.5) {
      if (phase !== 'bumper') {
        setPhase('bumper');
        playSoundEffect('impact');
      }
    } else if (currentTime < 11.0) {
      if (phase !== 'teaser') {
        setPhase('teaser');
        playSoundEffect('gunshot');
      }
    } else if (currentTime < 18.0) {
      if (phase !== 'action') {
        setPhase('action');
        playSoundEffect('hit');
      }
    } else if (currentTime < 24.0) {
      if (phase !== 'stars') {
        setPhase('stars');
        playSoundEffect('impact');
      }
    } else if (currentTime < 28.5) {
      if (phase !== 'title') {
        setPhase('title');
        playSoundEffect('impact');
      }
    } else {
      if (phase !== 'credits') {
        setPhase('credits');
      }
    }
  }, [currentTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (!next) {
      playSoundEffect('impact');
    }
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setCurrentTime(ratio * duration);
  };

  return (
    <div className={`relative w-full overflow-hidden bg-black ${isHero ? 'h-full min-h-[96vh]' : 'aspect-video rounded-2xl border border-white/20 shadow-2xl'}`}>
      {/* ─────────────────────────────────────────────────────────────
          REAL HUMAN ACTION FOOTAGE (John Wick Style Guns & Combat)
          ───────────────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        key={activeVideoSrc}
        src={activeVideoSrc}
        muted={isMuted}
        autoPlay={isPlaying}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-110 transition-opacity duration-500"
      />

      {/* ─────────────────────────────────────────────────────────────
          CINEMATIC VIGNETTE & LETTERBOX BARS (2.39:1 SCOPE)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-black/90 z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-12 sm:h-16 bg-black/90 z-20 pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          TOP ACTION CUT SELECTOR BAR (JOHN WICK STYLE LIVE SWITCHER)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-3 sm:top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono font-bold text-orange-400 uppercase tracking-widest bg-black/80 px-2.5 py-1 rounded-lg border border-orange-500/30">
            REAL ACTION TRAILER • JOHN WICK COMBAT STYLE
          </span>
        </div>

        {/* Action Clips Switcher Tabs */}
        <div className="hidden md:flex items-center space-x-1.5 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/15">
          {ACTION_TRACKS.map((track, i) => (
            <button
              key={track.id}
              onClick={() => setCurrentTrackIndex(i)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition cursor-pointer ${
                currentTrackIndex === i
                  ? 'bg-orange-500 text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {track.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TRAILER TIMELINE SEQUENCES WITH "PLATINUM FLAME PRODUCTION LLC"
          ───────────────────────────────────────────────────────────── */}

      {/* 1. STUDIO BUMPER: 0.0s – 4.5s */}
      {phase === 'bumper' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 px-4 text-center animate-in fade-in duration-500">
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-zinc-800 to-black p-1 border border-white/30 shadow-[0_0_50px_rgba(249,115,22,0.8)] animate-pulse">
              <div className="w-full h-full rounded-[14px] bg-[#07080a] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[0_0_16px_rgba(249,115,22,1)]">
                  <circle cx="50" cy="50" r="46" stroke="#CBD5E1" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M50 14 C58 28 72 38 72 58 C72 74 61 84 50 86 C39 84 28 74 28 58 C28 38 42 28 50 14 Z" fill="url(#trailerFlame)" />
                  <path d="M50 34 C54 44 62 50 62 62 C62 70 56 76 50 78 C44 76 38 70 38 62 C38 50 46 44 50 34 Z" fill="#07080a" />
                  <path d="M50 44 C52 50 56 54 56 62 C56 66 53 69 50 70 C47 69 44 66 44 62 C44 54 48 50 50 44 Z" fill="url(#trailerFlame)" />
                  <circle cx="50" cy="58" r="3" fill="#fff" />
                  <defs>
                    <linearGradient id="trailerFlame" x1="0%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="60%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#FDE047" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_4px_30px_rgba(255,255,255,0.4)]">
              PLATINUM FLAME
            </h2>
            <div className="font-mono text-base sm:text-2xl tracking-[0.4em] text-orange-400 font-black uppercase">
              PRODUCTION <span className="text-white border-b-2 border-orange-500 pb-0.5">LLC</span>
            </div>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-zinc-400 uppercase pt-2">
              “IGNITING CINEMA. FROM SPARK TO SCREEN.”
            </p>
          </div>
        </div>
      )}

      {/* 2. TEASER SETUP: 4.5s – 11.0s (John Wick Continental Underworld) */}
      {phase === 'teaser' && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-14 bg-gradient-to-t from-black/95 via-transparent to-black/40 pointer-events-none">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-500/60 backdrop-blur-md">
              <Crosshair className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-mono font-bold text-red-300 uppercase tracking-widest">
                A PLATINUM FLAME PRODUCTION LLC THEATRICAL TENTPOLE
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
              “WHEN THE CONTRACT IS ISSUED, NO ONE SURVIVES THE NIGHT.”
            </h3>
            <p className="font-mono text-xs sm:text-sm text-amber-300 font-semibold">
              FEATURING CHOREOGRAPHY BY 87ELEVEN ACTION DESIGN • 70MM ARRI ALEXA 65
            </p>
          </div>
        </div>
      )}

      {/* 3. HIGH-OCTANE GUN-FU & CLOSE COMBAT MONTAGE: 11.0s – 18.0s */}
      {phase === 'action' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none">
          <div className="text-center space-y-4">
            <div className="text-xs sm:text-sm font-mono tracking-[0.5em] text-orange-400 font-bold uppercase drop-shadow-lg">
              [ REAL GUN-FU • REAL STUNTS • REAL COMBAT ]
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white tracking-wider uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
              PREPARE FOR WAR
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-lg bg-black/85 border border-red-500/40 text-xs font-mono text-red-400 font-bold">
              100% PRACTICAL ACTION • ZERO CGI DOUBLES
            </div>
          </div>
        </div>
      )}

      {/* 4. A-LIST ACTION STARS BILLING: 18.0s – 24.0s (John Wick style credits) */}
      {phase === 'stars' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 p-6 text-center">
          <div className="text-xs font-mono text-orange-400 tracking-[0.4em] uppercase mb-4">
            STARRING HOLLYWOOD'S PREMIER ACTION ICONS
          </div>
          <div className="space-y-3 font-serif font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-wide">
            <div className="text-amber-200 drop-shadow-xl">KEANU REEVES</div>
            <div className="text-white drop-shadow-xl">CHRISTIAN BALE</div>
            <div className="text-amber-200 drop-shadow-xl">CHARLIZE THERON</div>
            <div className="text-white drop-shadow-xl">DONNIE YEN</div>
          </div>
          <div className="mt-6 text-xs font-mono text-zinc-300 tracking-widest uppercase">
            AND CILLIAN MURPHY
          </div>
        </div>
      )}

      {/* 5. MOVIE TITLE REVEAL: 24.0s – 28.5s */}
      {phase === 'title' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 p-6 text-center animate-in zoom-in-95 duration-500">
          <div className="text-xs font-mono text-orange-400 tracking-[0.4em] uppercase mb-2">
            PLATINUM FLAME PRODUCTION LLC PRESENTS
          </div>
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-serif font-black text-white tracking-tight uppercase drop-shadow-[0_4px_40px_rgba(249,115,22,1)]">
            THE OBSIDIAN <span className="flame-gradient-text">CROWN</span>
          </h1>
          <div className="font-mono text-sm sm:text-xl tracking-[0.3em] text-red-400 uppercase font-black mt-2">
            APEX PROTOCOL
          </div>
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-zinc-300 uppercase mt-4">
            IN THE CROSSHAIRS, RETREAT IS NOT AN OPTION
          </p>
          <div className="mt-6 inline-flex items-center space-x-3 px-5 py-2 rounded-xl bg-orange-500/20 border border-orange-500/50 text-orange-300 font-mono text-xs font-bold">
            <Award className="w-4 h-4 text-orange-400" />
            <span>WORLDWIDE THEATRICAL RELEASE • IMAX 70MM</span>
          </div>
        </div>
      )}

      {/* 6. THEATRICAL BILLING BLOCK & DATES: 28.5s – 32.0s */}
      {phase === 'credits' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/95 p-6 text-center">
          <div className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
            NOVEMBER 2026
          </div>
          <div className="text-sm sm:text-lg font-mono text-orange-400 font-bold tracking-widest uppercase mb-4">
            EXPERIENCE IT IN IMAX 70MM & DOLBY CINEMA
          </div>

          <div className="max-w-2xl text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed border-y border-white/10 py-3 my-2">
            PLATINUM FLAME PRODUCTION LLC PRESENTS IN ASSOCIATION WITH 87ELEVEN ACTION DESIGN "THE OBSIDIAN CROWN: APEX PROTOCOL"<br />
            STARRING KEANU REEVES CHRISTIAN BALE CHARLIZE THERON DONNIE YEN CILLIAN MURPHY<br />
            ACTION CHOREOGRAPHY BY 87ELEVEN MUSIC BY TYLER BATES & LUDWIG GÖRANSSON EDITOR ELÍSABET RONALDSDÓTTIR ACE<br />
            DIRECTOR OF PHOTOGRAPHY DAN LAUSTSEN ASC DFF EXECUTIVE PRODUCERS CHAD STAHELSKI DAVID ALEXANDER<br />
            PRODUCED BY MARCUS VANCE DIRECTED BY DAVID ALEXANDER
          </div>

          <div className="text-[10px] font-mono text-zinc-400 tracking-wider mt-2">
            COPYRIGHT © 2026 PLATINUM FLAME PRODUCTION LLC. ALL RIGHTS RESERVED.
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          ACTION TRAILER HUD CONTROLS
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-3 sm:bottom-5 inset-x-4 sm:inset-x-8 z-40 flex flex-col space-y-2 pointer-events-auto">
        {/* Scrubber Bar */}
        <div 
          onClick={handleSeek}
          className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group"
        >
          <div 
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 rounded-full transition-all duration-100"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        {/* Buttons Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-white">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={togglePlay}
              className="p-1.5 sm:p-2 rounded-lg bg-black/70 hover:bg-orange-500 hover:text-black border border-white/20 transition flex items-center space-x-1 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="hidden sm:inline text-[10px] font-bold uppercase">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>

            <button
              onClick={toggleMute}
              className={`p-1.5 sm:p-2 rounded-lg border transition flex items-center space-x-1 cursor-pointer ${
                isMuted ? 'bg-black/70 border-white/20 text-zinc-400' : 'bg-orange-500/20 border-orange-500 text-orange-400 font-bold'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
              <span className="text-[10px] font-bold uppercase">
                {isMuted ? 'UNMUTE TRAILER AUDIO' : 'AUDIO ACTIVE'}
              </span>
            </button>

            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-black/60 border border-white/10 text-zinc-300 text-[10px]">
              {Math.floor(currentTime)}s / {duration}s
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase hidden sm:inline">
              JOHN WICK ACTION STYLE
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase hidden md:inline">
              PLATINUM FLAME PRODUCTION LLC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
