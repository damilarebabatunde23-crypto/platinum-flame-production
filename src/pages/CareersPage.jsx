import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Search,
  UploadCloud,
  Quote,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { atelierPrinciples, atelierSpaces, openRequisitions, artisanReflections } from '../data/careersData';

export default function CareersPage({ onOpenJobModal }) {
  const [selectedDept, setSelectedDept] = useState('ALL DEPARTMENTS');
  const [searchQuery, setSearchQuery] = useState('');

  // General application form state
  const [generalSubmitted, setGeneralSubmitted] = useState(false);
  const [generalFormData, setGeneralFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'Camera & Optics',
    portfolio: '',
    resumeName: ''
  });

  const departments = [
    'ALL DEPARTMENTS',
    'VIRTUAL PRODUCTION',
    'POST-PRODUCTION',
    'CAMERA & OPTICS',
    'ART DEPARTMENT',
    'SOUND & MUSIC',
    'FINANCE & LEGAL'
  ];

  const filteredJobs = openRequisitions.filter(job => {
    const matchesDept = selectedDept === 'ALL DEPARTMENTS' || job.department === selectedDept;
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleGeneralSubmit = (e) => {
    e.preventDefault();
    setGeneralSubmitted(true);
    setTimeout(() => setGeneralSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 5: "FORGE THE FUTURE OF CINEMA.")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            STUDIO CULTURE • ARTISAN TRADITION • OPEN REQUISITIONS
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase max-w-5xl mx-auto">
          FORGE THE FUTURE <span className="flame-gradient-text">OF CINEMA.</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed">
          We do not believe in disposable content. We believe in building cinematic cathedrals that endure for generations. Platinum Flame recruits artisans, technical innovators, and production visionaries who demand creative sovereignty.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              const el = document.getElementById('open-requisitions');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider shadow-lg shadow-orange-950/40 hover:brightness-110 transition flex items-center space-x-2"
          >
            <span>EXPLORE OPEN REQUISITIONS</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('talent-gateway');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono tracking-wider transition"
          >
            STUDIO APPRENTICESHIP PROGRAM
          </button>
        </div>

        {/* 4 Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-center font-mono">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-white">4 Continents</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Active Studio Hubs & Lots</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-amber-400">98.4%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Artisan Career Longevity</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-emerald-400">100%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Guild Health & Pension Trust</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-orange-400">Tier 1</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Union Scale Baseline</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE PRINCIPLES OF OUR ATELIER (4 Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ STUDIO ETHOS ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            THE PRINCIPLES OF OUR ATELIER
          </h2>
          <p className="text-xs text-zinc-400 font-sans">
            Guiding the artisans, engineers, and visionaries who build our motion picture universe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {atelierPrinciples.map((p) => (
            <div key={p.num} className="p-8 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3 relative overflow-hidden group hover:border-orange-500/30 transition">
              <span className="font-mono text-2xl font-black text-orange-500/70">{p.num}</span>
              <h4 className="font-serif font-bold text-base text-white group-hover:text-amber-200 transition">{p.title}</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INSIDE THE STUDIO ATELIER (4 Feature Cards matching Image 5!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ PHYSICAL INFRASTRUCTURE ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            INSIDE THE STUDIO ATELIER
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {atelierSpaces.map((space, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-[#0c0e15] border border-white/10 group hover:border-orange-500/30 transition flex flex-col justify-between"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-black relative">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-transparent" />
              </div>

              <div className="p-6 space-y-2">
                <div className="text-[11px] font-mono text-orange-400 font-bold uppercase">{space.subtitle}</div>
                <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-200 transition">
                  {space.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          OPEN STUDIO REQUISITIONS (Matching Image 5 directly!)
          ========================================================================= */}
      <section id="open-requisitions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ CURRENT VACANCIES ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              OPEN STUDIO REQUISITIONS
            </h2>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by skill or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl glass-input text-xs font-mono"
            />
          </div>
        </div>

        {/* Department filters */}
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider border transition ${
                selectedDept === dept
                  ? 'bg-orange-500 text-black font-bold border-orange-500'
                  : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* 6 Requisition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0c0e15] border border-white/10 hover:border-orange-500/40 transition duration-300 space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase font-bold">
                    {job.department}
                  </span>
                  <span className="text-zinc-500">{job.type}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-200 transition">
                  {job.title}
                </h3>

                <div className="flex items-center space-x-1 text-xs font-mono text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{job.location}</span>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {job.summary}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {job.compensation}
                  </span>

                  <button
                    onClick={() => onOpenJobModal(job)}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-mono text-xs font-bold tracking-wider transition"
                  >
                    APPLY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ARTISAN REFLECTIONS (Matching Image 5)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-6">
        <div className="space-y-1 text-center">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ VOICES FROM THE STAGES ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            ARTISAN REFLECTIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artisanReflections.map((ref, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3 font-serif">
              <Quote className="w-5 h-5 text-orange-400" />
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "{ref.quote}"
              </p>
              <div className="pt-2 border-t border-white/5 font-mono text-[11px]">
                <div className="text-white font-bold">{ref.name}</div>
                <div className="text-zinc-500">{ref.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          THE CONFIDENTIAL TALENT GATEWAY (General Application matching Image 5!)
          ========================================================================= */}
      <section id="talent-gateway" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#0d0f15] to-[#07080a] border border-orange-500/30 shadow-2xl space-y-6">
          <div className="space-y-1 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ UNSOLICITED ARTISAN DOSSIER ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              THE CONFIDENTIAL TALENT GATEWAY
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              Don't see your exact discipline listed? Our studio talent directors continuously scout master craftspeople across cinematography, sound design, sculptors, and virtual pipeline engineers.
            </p>
          </div>

          {generalSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-serif font-bold text-white">Dossier Registered</h4>
              <p className="text-xs text-zinc-400 font-mono">
                Your portfolio has been indexed into our studio artisan database.
              </p>
            </div>
          ) : (
            <form onSubmit={handleGeneralSubmit} className="max-w-3xl mx-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Artisan Full Name"
                  value={generalFormData.name}
                  onChange={(e) => setGeneralFormData({ ...generalFormData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg glass-input"
                />
                <input
                  type="email"
                  required
                  placeholder="Official Email Address"
                  value={generalFormData.email}
                  onChange={(e) => setGeneralFormData({ ...generalFormData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg glass-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={generalFormData.discipline}
                  onChange={(e) => setGeneralFormData({ ...generalFormData, discipline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg glass-input text-zinc-300 font-mono"
                >
                  <option value="Camera & Optics">Camera & Optics Engineering</option>
                  <option value="Virtual Production & Unreal">Virtual Production & Unreal Engines</option>
                  <option value="Physical Set Construction">Physical Set Construction & Scenic</option>
                  <option value="Post-Production & VFX">Post-Production, Color & VFX</option>
                  <option value="Sound Design & Dolby Atmos">Sound Design & Dolby Atmos</option>
                  <option value="Production Accounting & Guild Legal">Production Accounting & Guild Legal</option>
                </select>

                <input
                  type="url"
                  placeholder="Portfolio / ArtStation / IMDB Link"
                  value={generalFormData.portfolio}
                  onChange={(e) => setGeneralFormData({ ...generalFormData, portfolio: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg glass-input"
                />
              </div>

              <label className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/15 block text-center cursor-pointer hover:border-orange-500/40 transition">
                <UploadCloud className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <span className="text-zinc-300 font-mono text-[11px] block">
                  {generalFormData.resumeName || 'Upload Resume, Reel Links or Guild Cards (PDF max 25MB)'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setGeneralFormData({ ...generalFormData, resumeName: e.target.files?.[0]?.name || '' })}
                />
              </label>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs font-mono tracking-wider transition"
              >
                TRANSMIT CONFIDENTIAL ARTISAN PROFILE
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0e15] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-white">
              READY TO SHAPE THE LEGACY OF CINEMA?
            </h3>
            <p className="text-xs text-zinc-400 font-sans">
              Our studio lots are actively staffing for the 2026/27 feature slate across Hollywood and London.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('open-requisitions');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-xl bg-orange-500 text-black font-bold text-xs font-mono"
            >
              EXPLORE OPEN ROLES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
