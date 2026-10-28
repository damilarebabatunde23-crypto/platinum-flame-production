import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Play, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  Film, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  Calculator,
  Grid,
  List,
  Sliders,
  DollarSign,
  Quote
} from 'lucide-react';
import { talentRoster, castingWorkflowSteps, directorsVerdicts } from '../data/talentData';

export default function TalentPage({ onOpenInquiry, onOpenTalentModal }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid');

  // Star Attachment Feasibility Estimator state
  const [targetBudget, setTargetBudget] = useState(45); // Millions
  const [starCount, setStarCount] = useState(2);
  const [genre, setGenre] = useState('Psychological Thriller');

  // Producer form state
  const [producerForm, setProducerForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    targetRoles: '',
    budget: '$15M - $50M',
    nda: true
  });
  const [producerSubmitted, setProducerSubmitted] = useState(false);

  // Performer form state
  const [talentForm, setTalentForm] = useState({
    name: '',
    agency: '',
    email: '',
    phone: '',
    reelUrl: '',
    category: 'Lead Dramatic Actor',
    headshotFile: ''
  });
  const [talentSubmitted, setTalentSubmitted] = useState(false);

  // Calculations for Estimator
  const talentBudgetMin = Math.round(targetBudget * 0.35);
  const talentBudgetMax = Math.round(targetBudget * 0.44);
  const preSalesMultiplier = targetBudget > 50 ? '2.15x' : targetBudget > 25 ? '1.85x' : '1.45x';
  const packagingDays = starCount === 1 ? '10 – 14 Days' : '14 – 21 Days';
  const foreignPotential = targetBudget > 50 ? '55% – 70%' : '40% – 65%';

  const filters = [
    'ALL TALENT',
    'LEAD DRAMATIC ACTORS',
    'LEAD ACTRESSES',
    'CHARACTER & ENSEMBLE',
    'STUNT & ACTION SPECIALISTS'
  ];

  const filteredTalent = selectedFilter === 'ALL TALENT'
    ? talentRoster
    : talentRoster.filter(t => t.category === selectedFilter || t.role.toUpperCase().includes(selectedFilter.replace('LEAD ', '')));

  const handleProducerSubmit = (e) => {
    e.preventDefault();
    setProducerSubmitted(true);
    setTimeout(() => setProducerSubmitted(false), 5000);
  };

  const handleTalentSubmit = (e) => {
    e.preventDefault();
    setTalentSubmitted(true);
    setTimeout(() => setTalentSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 4 from new upload: "THE SOULS OF CINEMA: STAR ATTACHMENT")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            EXCLUSIVE ROSTER • A-LIST TALENT PACKAGING • SAG-AFTRA & EQUITY SANCTIONED
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase max-w-5xl mx-auto leading-tight">
          THE SOULS OF CINEMA: <span className="flame-gradient-text">STAR ATTACHMENT</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed">
          Direct relationship management with top-tier agencies worldwide. From headline talent packaging and global pre-sales collateral to bespoke SAG-AFTRA guild deal structures and on-set talent liaison.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenInquiry('Star Attachment Packaging')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider shadow-lg shadow-orange-950/40 hover:brightness-110 transition flex items-center space-x-2"
          >
            <span>START STAR ATTACHMENT</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('casting-portals');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono tracking-wider transition flex items-center space-x-2"
          >
            <UploadCloud className="w-4 h-4 text-orange-400" />
            <span>SUBMIT TALENT REEL / EPK</span>
          </button>
        </div>

        {/* 4 Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-center font-mono">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-white">2,500+</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Top-Tier Talent Network</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-amber-400">48</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Academy/BAFTA Laurels</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-emerald-400">100%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Guild Compliance (SAG/Equity)</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-orange-400">14-Day</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Expedited Star Packaging SLA</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STAR TALENT DOSSIER SECTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ ARCHIVE OF TIER-1 ATTACHMENTS ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              STAR TALENT DOSSIER
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Access to private agency direct contact sheets, recent festival screenings, and upcoming production holds for 2026/27.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-white/[0.04] border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition border ${
                selectedFilter === filter
                  ? 'bg-orange-500 text-black font-bold border-orange-500'
                  : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Star Talent Cards (6 items) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTalent.map((star) => (
              <div
                key={star.id}
                className="rounded-2xl overflow-hidden bg-[#0c0e15] border border-white/10 hover:border-orange-500/40 transition duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={star.headshot}
                    alt={star.name}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-black/40" />

                  <div className="absolute top-3 inset-x-3 flex justify-between items-center text-[10px] font-mono">
                    <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-orange-400 border border-orange-500/30 uppercase font-bold">
                      {star.accolades}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10">
                      {star.guild}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <div className="text-xs font-mono text-amber-300 font-semibold uppercase">{star.role}</div>
                    <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                      {star.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {star.bio}
                  </p>

                  <div className="space-y-1 pt-3 border-t border-white/5 font-mono text-[11px] text-zinc-400">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">RECENT PROJECT:</span>
                      <span className="text-white font-medium">{star.recentProject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">REPRESENTATION:</span>
                      <span className="text-zinc-200">{star.representation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">STATUS:</span>
                      <span className="text-orange-400 font-semibold">{star.releaseYear}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenInquiry(`Star Attachment Inquiry: ${star.name}`)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition text-center"
                    >
                      REQUEST AVAILABILITY
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-[#0c0e15] border border-white/10">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#12141c] border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Performer</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Accolades</th>
                  <th className="p-4">Representation</th>
                  <th className="p-4">Recent Slate</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {filteredTalent.map((star) => (
                  <tr key={star.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-serif font-bold text-white text-sm">{star.name}</td>
                    <td className="p-4 text-orange-400">{star.role}</td>
                    <td className="p-4 text-amber-300">{star.accolades}</td>
                    <td className="p-4 text-zinc-400">{star.representation}</td>
                    <td className="p-4 text-zinc-200">{star.recentProject}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onOpenInquiry(`Star Attachment: ${star.name}`)}
                        className="px-3 py-1 bg-orange-500 text-black rounded font-bold text-xs"
                      >
                        Inquire
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
          HOW WE PACKAGE TIER-1 CAST FOR PRODUCTION SLATES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#0d0f15] to-[#07080a] border border-white/10 shadow-2xl space-y-10">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ PROVEN TALENT PACKAGING PIPELINE ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              HOW WE PACKAGE TIER-1 CAST FOR PRODUCTION SLATES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              From character attachment analytics to closed escrow agreements under SAG-AFTRA, Equity, and international treaties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {castingWorkflowSteps.map((step) => (
              <div key={step.step} className="p-6 rounded-2xl bg-[#090b11] border border-white/10 space-y-3 relative">
                <span className="font-mono text-2xl font-black text-orange-500/80">
                  {step.step}
                </span>
                <h4 className="font-serif font-bold text-base text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE TOOL: STAR ATTACHMENT FEASIBILITY ESTIMATOR
          (Seen directly in Image 4!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0e15] border border-orange-500/30 shadow-2xl space-y-8">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ REAL-TIME PRODUCTION ALGORITHM ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              Star Attachment Feasibility Estimator
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              Calibrate projected talent costs and minimum guarantee (MG) pre-sales potential against overall production capitalization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">TOTAL PRODUCTION BUDGET TIER:</span>
                  <span className="text-orange-400 font-bold">${targetBudget}M USD</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>$10M (Indie Dramatic)</span>
                  <span>$45M (Theatrical Core)</span>
                  <span>$150M+ (Franchise Tentpole)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">LEAD STAR ATTACHMENT COUNT</label>
                  <select
                    value={starCount}
                    onChange={(e) => setStarCount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs font-mono"
                  >
                    <option value={1}>1 A-List Lead</option>
                    <option value={2}>2 A-List Leads (Ensemble Duo)</option>
                    <option value={3}>3+ Multi-Star Ensemble Slate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">CINEMATIC GENRE PROFILE</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs font-mono"
                  >
                    <option value="Psychological Thriller">Psychological Thriller</option>
                    <option value="Sci-Fi / Space Epic">Sci-Fi / Space Epic</option>
                    <option value="Historical War Drama">Historical War Drama</option>
                    <option value="Noir Crime Franchise">Noir Crime Franchise</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080a10] border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-zinc-400">ESTIMATED TALENT ALLOCATION:</span>
                <span className="text-xl font-serif font-bold text-orange-400">
                  ${talentBudgetMin}M – ${talentBudgetMax}M
                </span>
              </div>

              <div className="space-y-2.5 text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">PROJECTED DOMESTIC PRE-SALES:</span>
                  <span className="text-emerald-400 font-bold">{preSalesMultiplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">PACKAGING TIME WINDOW:</span>
                  <span className="text-white font-medium">{packagingDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">FOREIGN MG POTENTIAL:</span>
                  <span className="text-amber-400 font-bold">{foreignPotential}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenInquiry(`Star Attachment Estimate: $${targetBudget}M Budget`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs tracking-wider transition text-center"
              >
                GENERATE STAR ATTACHMENT REPORT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEDICATED CASTING PORTALS (Dual Forms matching Image 4!)
          ========================================================================= */}
      <section id="casting-portals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ SECURE SLATE PIPELINE ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            DEDICATED CASTING PORTALS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Two distinct channels for screenplay attachments and prospective talent submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Form: For Producers & Filmmakers */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0e15] border border-white/10 space-y-5">
            <div className="space-y-1 border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-widest">
                PORTAL 01: PRODUCERS & DIRECTORS
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                Request Tier-1 Talent Packaging
              </h3>
            </div>

            {producerSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-serif font-bold text-white">Breakdown Received</h4>
                <p className="text-xs text-zinc-400 font-mono">
                  Our casting bureau will contact your team within 24 hours under NDA.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProducerSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Producer Name"
                    value={producerForm.name}
                    onChange={(e) => setProducerForm({ ...producerForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                  <input
                    type="text"
                    placeholder="Studio / Production Company"
                    value={producerForm.company}
                    onChange={(e) => setProducerForm({ ...producerForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Executive Email"
                    value={producerForm.email}
                    onChange={(e) => setProducerForm({ ...producerForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                  <input
                    type="tel"
                    placeholder="Direct Phone Line"
                    value={producerForm.phone}
                    onChange={(e) => setProducerForm({ ...producerForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder="Target star roles, desired archetypes, or character breakdowns..."
                  value={producerForm.targetRoles}
                  onChange={(e) => setProducerForm({ ...producerForm, targetRoles: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input"
                />

                <label className="flex items-center space-x-2 text-[11px] text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={producerForm.nda}
                    onChange={(e) => setProducerForm({ ...producerForm, nda: e.target.checked })}
                    className="rounded text-orange-500"
                  />
                  <span>Execute Mutual Studio NDA before script delivery</span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs font-mono tracking-wider transition"
                >
                  SUBMIT CASTING BREAKDOWN & NDA
                </button>
              </form>
            )}
          </div>

          {/* Right Form: For Talent & Representation */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0e15] border border-white/10 space-y-5">
            <div className="space-y-1 border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">
                PORTAL 02: TALENT & REPRESENTATION
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                Submit Performer Profile / Showreel EPK
              </h3>
            </div>

            {talentSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-serif font-bold text-white">Profile Transmitted</h4>
                <p className="text-xs text-zinc-400 font-mono">
                  Indexed into our active 2026/27 audition roster.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTalentSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Performer Full Name"
                    value={talentForm.name}
                    onChange={(e) => setTalentForm({ ...talentForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                  <input
                    type="text"
                    placeholder="Agency / Management Firm"
                    value={talentForm.agency}
                    onChange={(e) => setTalentForm({ ...talentForm, agency: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Representative Email"
                    value={talentForm.email}
                    onChange={(e) => setTalentForm({ ...talentForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                  <input
                    type="url"
                    placeholder="Vimeo / YouTube Showreel URL"
                    value={talentForm.reelUrl}
                    onChange={(e) => setTalentForm({ ...talentForm, reelUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />
                </div>

                <select
                  value={talentForm.category}
                  onChange={(e) => setTalentForm({ ...talentForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-zinc-300"
                >
                  <option value="Lead Dramatic Actor">Lead Dramatic Actor</option>
                  <option value="Lead Actress">Lead Actress</option>
                  <option value="Supporting Ensemble">Supporting Ensemble</option>
                  <option value="Stunt / Combat Specialist">Stunt / Combat Specialist</option>
                </select>

                <label className="p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/15 block text-center cursor-pointer hover:border-orange-500/40 transition">
                  <span className="text-zinc-400 font-mono text-[11px]">
                    {talentForm.headshotFile || 'Upload 8x10 Headshot & CV (PDF/JPG)'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setTalentForm({ ...talentForm, headshotFile: e.target.files?.[0]?.name || '' })}
                  />
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs font-mono tracking-wider transition"
                >
                  TRANSMIT PROFILE FOR 2026/27 SLATE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE DIRECTORS' VERDICT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-6">
        <div className="space-y-1 text-center">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ AUTEUR PERSPECTIVE ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            THE DIRECTORS' VERDICT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directorsVerdicts.map((verdict, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3 font-serif">
              <Quote className="w-5 h-5 text-orange-400" />
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "{verdict.quote}"
              </p>
              <div className="pt-2 border-t border-white/5 font-mono text-[11px]">
                <div className="text-white font-bold">{verdict.name}</div>
                <div className="text-zinc-500">{verdict.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BAR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#141722] to-[#0a0c12] border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-white">
              NEED IMMEDIATE CONFIDENTIAL ATTACHMENT?
            </h3>
            <p className="text-xs text-zinc-400 font-sans">
              Direct pipeline to agency partners across Los Angeles, London, and Tokyo.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry('Urgent Star Attachment')}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-mono text-xs font-bold tracking-wider transition shrink-0"
          >
            FAST-TRACK STAR INQUIRY
          </button>
        </div>
      </section>
    </div>
  );
}
