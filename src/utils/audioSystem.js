// Advanced Synthetic Cinematic Ambient Soundscape & Score Engine using Web Audio API
class CinematicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentMode = 'sub_bass'; // 'sub_bass' | 'projector' | 'celestial'
    this.masterGain = null;
    this.activeNodes = [];
    this.analyser = null;
    this.volume = 0.08;
    this.listeners = new Set();
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      currentMode: this.currentMode,
      volume: this.volume
    }));
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
    this.notify();
  }

  setMode(mode) {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.start(mode);
    }
    this.notify();
  }

  toggle(mode = null) {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying && (!mode || mode === this.currentMode)) {
      this.stop();
      return false;
    } else {
      this.start(mode || this.currentMode);
      return true;
    }
  }

  start(mode = 'sub_bass') {
    this.init();
    this.stop();
    this.currentMode = mode;

    if (mode === 'sub_bass') {
      this.startSubBassMode();
    } else if (mode === 'projector') {
      this.startProjectorMode();
    } else if (mode === 'celestial') {
      this.startCelestialMode();
    }

    this.isPlaying = true;
    this.notify();
  }

  // Preset 1: Deep Hollywood Sub-Bass Drone (Hans Zimmer / Inception style)
  startSubBassMode() {
    const freqs = [36.71, 55.0, 73.42, 110.0];
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, this.ctx.currentTime);
    filter.connect(this.masterGain);

    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      // Subtle detune for rich phasing
      osc.detune.setValueAtTime((idx - 1.5) * 4, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.activeNodes.push(osc, gain);
    });
  }

  // Preset 2: 35mm Carbon-Arc Projector Rhythm + Vinyl Film Hum
  startProjectorMode() {
    // White noise generator for vintage film grain crackle
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to sound like soft vinyl & room mechanicals
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(800, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    whiteNoise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    whiteNoise.start();

    // 24 FPS projector shutter mechanical rhythm (24Hz pulsed click)
    const shutterOsc = this.ctx.createOscillator();
    shutterOsc.type = 'sine';
    shutterOsc.frequency.setValueAtTime(48, this.ctx.currentTime);

    const shutterGain = this.ctx.createGain();
    shutterGain.gain.setValueAtTime(0.012, this.ctx.currentTime);

    shutterOsc.connect(shutterGain);
    shutterGain.connect(this.masterGain);
    shutterOsc.start();

    this.activeNodes.push(whiteNoise, bandpass, noiseGain, shutterOsc, shutterGain);
  }

  // Preset 3: Ethereal Sci-Fi Celestial Pad (Chords: Dm9 - Fmaj7 - Bbmaj7)
  startCelestialMode() {
    const chordFreqs = [146.83, 174.61, 220.00, 261.63, 329.63]; // D3, F3, A3, C4, E4
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, this.ctx.currentTime);
    filter.connect(this.masterGain);

    chordFreqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      osc.detune.setValueAtTime(Math.sin(idx) * 6, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.018, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.activeNodes.push(osc, gain);
    });
  }

  // Play a brief high-production cinematic sting / chord for film cards
  playFilmScoreSting(key = 'D') {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const baseF = key === 'D' ? 73.42 : key === 'A' ? 110.0 : 65.41;
    const notes = [baseF, baseF * 1.5, baseF * 2, baseF * 2.5];

    const masterSting = this.ctx.createGain();
    masterSting.gain.setValueAtTime(0.06, this.ctx.currentTime);
    masterSting.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.2);
    masterSting.connect(this.ctx.destination);

    notes.forEach((f) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 3.0);

      osc.connect(filter);
      filter.connect(masterSting);
      osc.start();
      osc.stop(this.ctx.currentTime + 3.2);
    });
  }

  stop() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.notify();
  }
}

export const soundEngine = new CinematicAudioEngine();
