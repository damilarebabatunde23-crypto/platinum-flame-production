import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Disc, Sparkles, Sliders, Play, Square } from 'lucide-react';
import { soundEngine } from '../utils/audioSystem';

export default function SoundscapePlayer({ compact = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('sub_bass');
  const [volume, setVolume] = useState(0.08);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setMode(state.currentMode);
      setVolume(state.volume);
    });
    return unsubscribe;
  }, []);

  const handleToggle = (selectedMode) => {
    soundEngine.toggle(selectedMode || mode);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    soundEngine.setMode(newMode);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  const modes = [
    {
      id: 'sub_bass',
      label: 'HOLLYWOOD SUB-BASS',
      sub: '36Hz – 110Hz Resonant Drone',
      icon: Radio,
      color: 'text-orange-400'
    },
    {
      id: 'projector',
      label: '35MM PROJECTOR & VINYL',
      sub: '24 FPS Mechanical Shutter & Room Hum',
      icon: Disc,
      color: 'text-amber-400'
    },
    {
      id: 'celestial',
      label: 'CELESTIAL SCI-FI CHORD',
      sub: 'Ethereal Dm9 Atmospheric Pad',
      icon: Sparkles,
      color: 'text-cyan-400'
    }
  ];

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <button
          onClick={() => handleToggle(mode)}
          className={`flex items-center space-x-1.5 text-[11px] font-mono tracking-wider ${
            isPlaying ? 'text-orange-400 font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          {isPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'ATMOSPHERE ACTIVE' : 'ENABLE AMBIENT AUDIO'}</span>
        </button>

        {isPlaying && (
          <div className="flex items-center space-x-0.5 pl-1">
            <span className="w-1 h-3 bg-orange-400 animate-pulse rounded-full" />
            <span className="w-1 h-4 bg-amber-400 animate-pulse delay-75 rounded-full" />
            <span className="w-1 h-2 bg-orange-500 animate-pulse delay-150 rounded-full" />
            <span className="w-1 h-3.5 bg-yellow-400 animate-pulse delay-100 rounded-full" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0c0e15] to-[#07080a] border border-white/10 shadow-2xl p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header (Fully Responsive on Mobile) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-orange-400 animate-pulse' : 'text-zinc-400'}`} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white tracking-wider sm:tracking-widest uppercase flex flex-wrap items-center gap-1.5">
              <span>DOLBY ATMOS SOUNDSCAPE</span>
              {isPlaying && (
                <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[9px] font-bold">
                  ON AIR
                </span>
              )}
            </div>
            <div className="text-[10px] font-sans text-zinc-400">
              Interactive Web Audio acoustic environment
            </div>
          </div>
        </div>

        {/* Master Play/Stop Button */}
        <button
          onClick={() => handleToggle(mode)}
          className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition flex items-center justify-center space-x-2 shadow-lg ${
            isPlaying
              ? 'bg-orange-500 text-black hover:bg-orange-400 shadow-orange-950/40'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>MUTE SOUNDSCAPE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY SOUNDSCAPE</span>
            </>
          )}
        </button>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = isPlaying && mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                if (!isPlaying) {
                  soundEngine.start(m.id);
                } else {
                  handleModeChange(m.id);
                }
              }}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                isActive
                  ? 'bg-orange-500/15 border-orange-500/60 shadow-lg shadow-orange-950/30'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? m.color : 'text-zinc-500'}`} />
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                )}
              </div>
              <div>
                <div className={`text-[11px] font-mono font-bold tracking-wider ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                  {m.label}
                </div>
                <div className="text-[10px] font-sans text-zinc-500 leading-tight mt-0.5">
                  {m.sub}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Equalizer & Volume Slider */}
      <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Animated Visualizer bars */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-2">
            SPECTRUM:
          </span>
          {[12, 24, 18, 30, 14, 28, 20, 32, 16, 22, 10, 26, 18, 14].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying ? 'bg-gradient-to-t from-orange-600 to-amber-300' : 'bg-zinc-800'
              }`}
              style={{
                height: isPlaying ? `${Math.max(6, (h * (volume * 10)) % 28 + 6)}px` : '4px',
                animation: isPlaying ? `pulse 1.2s infinite ease-in-out ${i * 0.08}s` : 'none'
              }}
            />
          ))}
        </div>

        {/* Volume slider */}
        <div className="flex items-center space-x-3">
          <Sliders className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase">VOLUME</span>
          <input
            type="range"
            min="0"
            max="0.25"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 sm:w-32 accent-orange-500 cursor-pointer h-1 bg-zinc-800 rounded-lg"
          />
          <span className="text-[10px] font-mono text-zinc-400 w-8">
            {Math.round((volume / 0.25) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
