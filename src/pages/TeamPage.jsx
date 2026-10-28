import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Download, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  Lock,
  Building,
  Send
} from 'lucide-react';
import { executiveCommittee, boardOfGovernors, studioCharter } from '../data/teamData';

export default function TeamPage({ onOpenInquiry }) {
  const [instFormSubmitted, setInstFormSubmitted] = useState(false);
  const [instFormData, setInstFormData] = useState({
    entity: '',
    rep: '',
    email: '',
    phone: '',
    matter: 'Institutional Co-Production Capital',
    brief: ''
  });

  const handleInstSubmit = (e) => {
    e.preventDefault();
    setInstFormSubmitted(true);
    setTimeout(() => setInstFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 3: "ARCHITECTS OF MONUMENTAL CINEMA")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            EXECUTIVE GOVERNANCE • PRODUCTION BOARD • MASTERS OF CELLULOID
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase max-w-5xl mx-auto">
          ARCHITECTS OF <span className="flame-gradient-text">MONUMENTAL CINEMA</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed">
          Our executive committee and independent board of governors unite over a century of motion picture leadership, safeguarding artistic sovereignty while deploying institutional capital with surgical precision.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenInquiry('Executive Governance Prospectus')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider shadow-lg shadow-orange-950/40 hover:brightness-110 transition"
          >
            EXECUTIVE GOVERNANCE PROSPECTUS
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('studio-charter');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-xs font-mono tracking-wider transition"
          >
            VIEW CHARTER & FIDUCIARY METRICS
          </button>
        </div>

        {/* 4 Governance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-center font-mono">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-white">$1.45B</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Active Production Assets</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-emerald-400">$18.2B</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Career Lifetime Box Office</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-amber-400">64 / 19</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Oscars Won / Nominated</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-orange-400">AAA</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Completion Bond Rating</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXECUTIVE COMMITTEE (6 Members)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ SENIOR STUDIO LEADERSHIP ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            EXECUTIVE COMMITTEE
          </h2>
          <p className="text-xs text-zinc-400 font-sans">
            Guiding capital deployment, physical production safety, and theatrical windowing across all divisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {executiveCommittee.map((exec) => (
            <div
              key={exec.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0c0e15] border border-white/10 hover:border-orange-500/30 transition duration-300 flex flex-col sm:flex-row gap-6 group"
            >
              <div className="sm:w-44 shrink-0 aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5">
                <img
                  src={exec.image}
                  alt={exec.name}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold uppercase">
                      {exec.division}
                    </span>
                    <span className="text-zinc-500">{exec.tenure}</span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition">
                    {exec.name}
                  </h3>

                  <div className="text-xs font-mono text-zinc-400">{exec.title}</div>

                  <p className="text-xs text-zinc-300 font-sans leading-relaxed pt-1">
                    {exec.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="truncate">NOTABLE: {exec.credits.join(', ')}</span>
                  <button
                    onClick={() => onOpenInquiry(`Executive Contact: ${exec.name}`)}
                    className="text-orange-400 hover:text-orange-300 shrink-0 ml-2"
                  >
                    CONTACT ↗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INDEPENDENT BOARD OF GOVERNORS (4 Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ FIDUCIARY OVERSIGHT ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            INDEPENDENT BOARD OF GOVERNORS
          </h2>
          <p className="text-xs text-zinc-400 font-sans">
            Providing external audit rigor, guild ethics governance, and artistic integrity counsel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardOfGovernors.map((gov) => (
            <div
              key={gov.id}
              className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-4 group hover:border-orange-500/30 transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 border border-white/5">
                  <img
                    src={gov.image}
                    alt={gov.name}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">{gov.role}</span>
                  <h4 className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition">
                    {gov.name}
                  </h4>
                  <div className="text-[11px] font-mono text-zinc-400">{gov.title}</div>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {gov.bio}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                INDEPENDENT VOTING GOVERNOR
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          THE PLATINUM FLAME CHARTER (4 Pillars)
          ========================================================================= */}
      <section id="studio-charter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="text-center space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ GOVERNANCE DOCTRINE ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            THE PLATINUM FLAME CHARTER
          </h2>
          <p className="text-xs text-zinc-400 font-sans max-w-xl mx-auto">
            Codified principles binding executive leadership and production teams to absolute artistic and financial fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioCharter.map((c) => (
            <div key={c.num} className="p-8 rounded-2xl bg-[#0c0e15] border border-white/10 space-y-3 relative overflow-hidden group hover:border-orange-500/30 transition">
              <span className="font-mono text-2xl font-black text-orange-500/70">{c.num}</span>
              <h4 className="font-serif font-bold text-base text-white group-hover:text-amber-200 transition">{c.title}</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          DOCUMENT VAULT & INSTITUTIONAL INQUIRIES (Matching Image 3)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12141c] via-[#0d0f15] to-[#07080a] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Document Vault */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-xs text-orange-400 uppercase font-bold tracking-widest">
                  CONFIDENTIAL ARCHIVE
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Document Vault & Dispatches
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Institutional partners, sovereign funds, and legal teams may access accredited governance documents under NDA.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { title: "2026 Studio Governance Prospectus & Charter", size: "18.4 MB PDF" },
                  { title: "Audited Production Asset Valuation ($1.45B Ledger)", size: "24.1 MB PDF" },
                  { title: "Universal Guild Accord & Collective Bargaining Summary", size: "8.6 MB PDF" },
                  { title: "Completion Bond Underwriting Protocols (AAA Rating)", size: "12.3 MB PDF" }
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenInquiry(`Document Request: ${doc.title}`)}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-orange-500/40 cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-orange-400" />
                      <div>
                        <div className="text-xs font-mono font-medium text-white">{doc.title}</div>
                        <div className="text-[10px] font-mono text-zinc-500">{doc.size}</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-zinc-400 hover:text-white" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Institutional Inquiry Form */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#080a0f] border border-white/10 space-y-4">
              <div className="space-y-1 border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-widest">
                  EXECUTIVE PRIVATE DESK
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  Institutional Inquiries
                </h4>
              </div>

              {instFormSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-serif font-bold text-white">Inquiry Transmitted</h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    Assigned directly to Harrison Ford Croft, Head of Legal & Business Affairs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInstSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Institutional Entity / Fund Name"
                      value={instFormData.entity}
                      onChange={(e) => setInstFormData({ ...instFormData, entity: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Legal Representative Name"
                      value={instFormData.rep}
                      onChange={(e) => setInstFormData({ ...instFormData, rep: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email Address"
                      value={instFormData.email}
                      onChange={(e) => setInstFormData({ ...instFormData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input"
                    />
                    <input
                      type="tel"
                      placeholder="Direct Contact Line"
                      value={instFormData.phone}
                      onChange={(e) => setInstFormData({ ...instFormData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input"
                    />
                  </div>

                  <select
                    value={instFormData.matter}
                    onChange={(e) => setInstFormData({ ...instFormData, matter: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input text-zinc-300 font-mono"
                  >
                    <option value="Institutional Co-Production Capital">Institutional Co-Production Capital</option>
                    <option value="Private Equity Slate Investment">Private Equity Slate Investment</option>
                    <option value="Legal & Treaty Compliance">Legal & Treaty Compliance</option>
                    <option value="Board Governance Consultation">Board Governance Consultation</option>
                  </select>

                  <textarea
                    rows={3}
                    placeholder="Provide overview of institutional matter or proposed co-financing mandate..."
                    value={instFormData.brief}
                    onChange={(e) => setInstFormData({ ...instFormData, brief: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg glass-input"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs font-mono tracking-wider transition"
                  >
                    SUBMIT INSTITUTIONAL INQUIRY
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
