import React, { useState } from 'react';
import { 
  Newspaper, 
  Download, 
  Calendar, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  X, 
  Search, 
  SlidersHorizontal,
  Mail,
  Send,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { featuredDispatch, newsArticles, mediaKitAssets } from '../data/newsData';

export default function NewsPage({ onOpenInquiry }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL RELEASES');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  // Accreditation form state
  const [accredForm, setAccredForm] = useState({
    name: '',
    outlet: '',
    email: '',
    credentialType: 'Guild / Trade Press (Variety / THR / Deadline)',
    pressIdName: ''
  });
  const [accredSubmitted, setAccredSubmitted] = useState(false);

  // Newsletter subscribe
  const [embargoEmail, setEmbargoEmail] = useState('');
  const [embargoSubscribed, setEmbargoSubscribed] = useState(false);

  const filters = [
    'ALL RELEASES',
    'SLATE ANNOUNCEMENTS',
    'FESTIVAL WIRE',
    'TECHNICAL INNOVATION',
    'FINANCIAL ACCORD',
    'PRODUCTION WRAPS'
  ];

  const filteredNews = newsArticles.filter(a => {
    const matchesFilter = selectedFilter === 'ALL RELEASES' || a.category === selectedFilter;
    const matchesQuery = searchQuery === '' || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const handleDownload = (assetTitle) => {
    setDownloadSuccess(assetTitle);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleAccredSubmit = (e) => {
    e.preventDefault();
    setAccredSubmitted(true);
    setTimeout(() => setAccredSubmitted(false), 5000);
  };

  const handleEmbargoSubscribe = (e) => {
    e.preventDefault();
    if (embargoEmail) {
      setEmbargoSubscribed(true);
      setTimeout(() => setEmbargoSubscribed(false), 5000);
      setEmbargoEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 2: "THE STUDIO DISPATCH")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
                OFFICIAL COMMUNIQUÉS • FESTIVAL WIRE • SLATE GREENLIGHTS & PRESS RELEASES
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white uppercase">
              THE STUDIO <span className="font-serif italic font-normal flame-gradient-text">DISPATCH</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Authoritative dispatches, global slate greenlights, festival wire information, and high-fidelity cinematic assets from Platinum Flame Production LLC.
            </p>
          </div>

          {/* Search bar on right */}
          <div className="w-full lg:w-80 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="SEARCH DISPATCH ARCHIVES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs font-mono placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* 4 Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-white">142</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Wires (Historical Dispatches)</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-amber-400">84</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Laurels (Festival Selections)</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-emerald-400">24 Hours</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Media Response SLA</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-serif font-black text-orange-400">100% Active</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Global Media Accreditation</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HERO FEATURED DISPATCH (Aura Borealis Sci-Fi Epic)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#12141e] via-[#0d0f16] to-[#07080a] border border-orange-500/30 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual on left */}
            <div className="lg:col-span-6 aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 relative group">
              <img
                src={featuredDispatch.image}
                alt={featuredDispatch.title}
                className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded bg-orange-500 text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                  TENTPOLE GREENLIGHT
                </span>
              </div>
            </div>

            {/* Content on right */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400">
                <span className="text-orange-400 font-bold">{featuredDispatch.source}</span>
                <span>•</span>
                <span>{featuredDispatch.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                {featuredDispatch.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {featuredDispatch.summary}
              </p>

              <blockquote className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-orange-500 text-xs italic text-zinc-300 font-serif">
                "{featuredDispatch.quote}" — <span className="font-mono not-italic text-zinc-400">{featuredDispatch.quoteAuthor}</span>
              </blockquote>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedArticle(featuredDispatch)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition"
                >
                  READ FULL DISPATCH
                </button>

                <button
                  onClick={() => handleDownload('Aura Borealis Electronic Press Kit')}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-xs font-mono tracking-wider transition"
                >
                  DOWNLOAD EPK ASSET PACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ARCHIVE OF DISPATCHES (6 Articles matching Image 2)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ HISTORICAL REPOSITORY ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Archive of Dispatches
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider border transition ${
                selectedFilter === filter
                  ? 'bg-orange-500 text-black font-bold border-orange-500'
                  : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="rounded-2xl overflow-hidden bg-[#0c0e15] border border-white/10 hover:border-orange-500/40 transition duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-black/40" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-orange-400 border border-orange-500/30 uppercase font-bold">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center space-x-2">
                    <span className="text-amber-400">{article.source}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-sans line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-orange-400">
                  <span>READ DISPATCH</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          MEDIA ASSETS REPOSITORY (Matching Image 2 directly!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ DOWNLOADABLE ELECTRONIC PRESS KITS ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            MEDIA ASSETS REPOSITORY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            High-resolution broadcast assets, vector brand kits, architectural b-roll, and unit photography available to verified media outlets.
          </p>
        </div>

        {downloadSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Authorized asset packet downloaded: <strong>{downloadSuccess}</strong></span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mediaKitAssets.map((asset, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 hover:border-orange-500/30 transition flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">{asset.type}</span>
                <h4 className="font-serif font-bold text-base text-white">{asset.title}</h4>
                <div className="text-xs font-mono text-zinc-400">{asset.format} • {asset.size}</div>
              </div>

              <button
                onClick={() => handleDownload(asset.title)}
                className="p-3 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-black text-zinc-300 transition shrink-0 ml-4"
                title="Download Packet"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span className="text-zinc-400">NEED ARCHIVAL DCP EXECUTABLE PACKETS?</span>
          <button
            onClick={() => handleDownload('Master Studio Electronic Press Kit 14.2 GB')}
            className="text-orange-400 hover:text-orange-300 font-bold"
          >
            DOWNLOAD MASTER EPK (14.2 GB) ↗
          </button>
        </div>
      </section>

      {/* =========================================================================
          ACCREDITATION & DIRECT DESKS (Dual Section matching Image 2!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0e15] border border-white/10 shadow-2xl space-y-8">
          <div className="space-y-1">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ MEDIA VERIFICATION ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              ACCREDITATION & DIRECT DESKS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Application Form */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="font-serif font-bold text-lg text-white">
                Accredited Media Application
              </h4>

              {accredSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-serif font-bold text-white">Credentials Submitted</h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    Press team will verify your press pass and issue digital credentials within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAccredSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Journalist / Critic Full Name"
                      value={accredForm.name}
                      onChange={(e) => setAccredForm({ ...accredForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Publication / Media Outlet"
                      value={accredForm.outlet}
                      onChange={(e) => setAccredForm({ ...accredForm, outlet: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Official Editorial Email"
                      value={accredForm.email}
                      onChange={(e) => setAccredForm({ ...accredForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input"
                    />
                    <select
                      value={accredForm.credentialType}
                      onChange={(e) => setAccredForm({ ...accredForm, credentialType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg glass-input text-zinc-300 font-mono"
                    >
                      <option value="Guild / Trade Press (Variety / THR / Deadline)">Trade Press (Variety / THR)</option>
                      <option value="International Broadcaster (BBC / NHK / Canal+)">International Broadcaster</option>
                      <option value="Festival Accreditation Delegate">Festival Delegate</option>
                      <option value="Online Film Critic / Guild Member">Online Film Critic</option>
                    </select>
                  </div>

                  <label className="p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/15 block text-center cursor-pointer hover:border-orange-500/40 transition">
                    <span className="text-zinc-400 font-mono text-[11px]">
                      {accredForm.pressIdName || 'Upload Press Pass / Guild Card (PDF/JPG)'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setAccredForm({ ...accredForm, pressIdName: e.target.files?.[0]?.name || '' })}
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs font-mono tracking-wider transition"
                  >
                    SUBMIT ACCREDITATION REQUEST
                  </button>
                </form>
              )}
            </div>

            {/* Right: Direct Press Contacts */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080a10] border border-white/10 space-y-4 font-mono text-xs">
              <h4 className="font-serif font-bold text-base text-white">
                Global Press Desks
              </h4>

              <div className="space-y-3 text-zinc-300">
                <div className="py-2 border-b border-white/5">
                  <div className="text-zinc-500 text-[10px]">GLOBAL PRESS OFFICE (NEW YORK HQ):</div>
                  <div className="text-white font-medium">mypersonalemailboxln@gmail.com</div>
                  <div className="text-[11px] text-orange-400 font-bold">+1 907-205-2163</div>
                  <div className="text-[10px] text-zinc-400">1809 Forest Avenue, New York, NY 10001 USA</div>
                </div>

                <div className="py-2 border-b border-white/5">
                  <div className="text-zinc-500 text-[10px]">LONDON & EUROPEAN DESK:</div>
                  <div className="text-white font-medium">mypersonalemailboxln@gmail.com</div>
                  <div className="text-[11px] text-orange-400">+1 907-205-2163</div>
                </div>

                <div className="py-2 border-b border-white/5">
                  <div className="text-zinc-500 text-[10px]">TOKYO & ASIA WIRE:</div>
                  <div className="text-white font-medium">mypersonalemailboxln@gmail.com</div>
                  <div className="text-[11px] text-orange-400">+1 907-205-2163</div>
                </div>

                <div className="pt-2 text-zinc-400 text-[10px]">
                  EMERGENCY PRESS HOTLINE: <strong className="text-white">+1 907-205-2163</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM SUBSCRIBE TO EMBARGO DISPATCHES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#141722] via-[#0d0f15] to-[#07080a] border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-widest">
              CONFIDENTIAL EMBARGO LIST
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Subscribe to Embargo Dispatches
            </h3>
            <p className="text-xs text-zinc-400 font-sans">
              Receive password-protected advanced trailers, festival wire embargoes, and private screening invitations.
            </p>
          </div>

          {embargoSubscribed ? (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-xl">
              ✓ Subscribed to embargo transmissions.
            </div>
          ) : (
            <form onSubmit={handleEmbargoSubscribe} className="flex items-center space-x-2 w-full md:w-auto">
              <input
                type="email"
                required
                placeholder="journalist@media.com"
                value={embargoEmail}
                onChange={(e) => setEmbargoEmail(e.target.value)}
                className="px-4 py-2.5 rounded-xl glass-input text-xs font-mono w-full md:w-64"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-orange-500 text-black font-bold text-xs font-mono tracking-wider hover:brightness-110 transition shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl bg-[#0b0d14] border border-white/10 rounded-2xl shadow-2xl my-auto overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover filter brightness-85" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-orange-500/40 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-0.5 rounded bg-orange-500 text-black text-[10px] font-mono font-bold uppercase">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mt-1">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400 border-b border-white/10 pb-3">
                <span className="text-orange-400">{selectedArticle.source}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <div className="text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-line space-y-3">
                {selectedArticle.content}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500">AUTHORIZED STUDIO COMMUNIQUÉ</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-lg bg-orange-500 text-black font-bold"
                >
                  Close Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
