import { useState } from 'react';
import {
  TrendingUp,
  Play,
  Pause,
  Download,
  FileText,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  BarChart3,
  DollarSign,
  Briefcase,
  ArrowUpRight,
  Radio,
  Clock,
  Star,
  Shield,
  Mail,
  Phone,
  Building2,
  Film,
  Award,
} from 'lucide-react';
import {
  investorMetrics,
  earningsSegmentBreakdown,
  slateRoiGuidance,
  regulatoryFilings,
  analystCoverage,
  irRoadshows,
} from '../data/investorData';

/* ─── Waveform bars (decorative) ─── */
const WaveformBars = ({ isPlaying }) => {
  const bars = Array.from({ length: 40 }, (_, i) => {
    const height = 20 + Math.abs(Math.sin(i * 0.45) * 48 + Math.cos(i * 0.3) * 18);
    return Math.max(8, Math.min(68, height));
  });

  return (
    <div className="flex items-center gap-[2px] h-16 px-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full flex-shrink-0 transition-all duration-300 ${
            i < 21
              ? 'bg-orange-400'
              : isPlaying
              ? 'bg-white/30 animate-pulse'
              : 'bg-white/20'
          }`}
          style={{
            height: `${h}%`,
            animationDelay: isPlaying ? `${(i % 8) * 100}ms` : '0ms',
          }}
        />
      ))}
    </div>
  );
};

/* ─── Section label ─── */
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-[3px] h-5 bg-orange-500 rounded-full flex-shrink-0" />
    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-400">
      {children}
    </span>
  </div>
);

/* ─── Filing badge color ─── */
const filingBadgeClass = (type) => {
  if (type.includes('10-K')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  if (type.includes('10-Q')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  if (type.includes('8-K')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  if (type.includes('DEF14A')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  return 'bg-zinc-700/40 text-zinc-300 border-zinc-600/30';
};

/* ─── Rating badge color ─── */
const ratingClass = (rating) => {
  if (rating === 'OUTPERFORM' || rating === 'OVERWEIGHT')
    return 'text-emerald-400 bg-emerald-500/10';
  if (rating === 'BUY') return 'text-sky-400 bg-sky-500/10';
  return 'text-zinc-400 bg-zinc-700/20';
};

/* ─── Roadshow status badge ─── */
const statusBadgeClass = (status) => {
  if (status === 'Webcast Available') return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  if (status === 'Registration Open') return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  if (status === 'Live Webcast Stream') return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
  return 'bg-zinc-700/20 text-zinc-400 border-zinc-600/30';
};

/* ════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
════════════════════════════════════════════════════════════ */
export default function InvestorRelationsPage({ setActivePage, onOpenInquiry }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedYear, setSelectedYear] = useState('FY2025');

  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    aum: '',
    email: '',
    phone: '',
    inquiryType: '',
  });

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onOpenInquiry) onOpenInquiry(formData);
  };

  const slides = [
    { time: '00:00', title: 'Opening Remarks & Q3 Snapshot' },
    { time: '18:30', title: 'Segment Revenue Deep Dive' },
    { time: '42:00', title: '2027 Slate Preview' },
    { time: '78:00', title: 'Q&A Session' },
  ];

  const yearCols = {
    'FY2024': { key: 'fy24', label: 'FY2024' },
    'FY2025': { key: 'fy25', label: 'FY2025' },
    'FY2026 Target': { key: 'fy26Target', label: 'FY2026 Target' },
  };

  return (
    <div className="min-h-screen pt-24" style={{ background: '#07080a' }}>

      {/* ══════════════════════════════════════════
          1. HERO HEADER
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(249,115,22,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07080a]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20">
          {/* ── Ticker strip ── */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <span className="font-mono text-xs tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-sm">
              NYSE: PLFM
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white tracking-tight">
                {investorMetrics.stockPrice}
              </span>
              <span className="text-emerald-400 font-mono text-sm font-semibold">
                {investorMetrics.dailyChange}
              </span>
            </div>
            <span className="font-mono text-[11px] text-zinc-400 border-l border-white/10 pl-4">
              52-WK RANGE&nbsp;&nbsp;{investorMetrics.range52Wk}
            </span>
          </div>

          {/* ── Main headline ── */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-2">
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent block">
                DISCIPLINED CAPITAL.
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent block">
                MONUMENTAL RETURN.
              </span>
            </h1>
          </div>

          <p className="max-w-2xl text-zinc-400 text-base leading-relaxed mb-10">
            Platinum Flame Production LLC delivers institutional-grade investment frameworks
            underpinned by a world-class cinematic slate, vertically integrated post-production
            infrastructure, and disciplined capital allocation — engineered for monumental,
            durable shareholder value creation.
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs tracking-widest px-6 py-3 transition-all duration-200 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              <Download size={14} />
              DOWNLOAD INVESTOR DECK
            </button>
            <button
              onClick={onOpenInquiry}
              className="flex items-center gap-2 border border-white/20 hover:border-orange-500/50 text-white font-mono text-xs tracking-widest px-6 py-3 transition-all duration-200 hover:bg-white/[0.03]"
            >
              <Users size={14} />
              REQUEST ANALYST MEETING
            </button>
          </div>

          {/* ── Metric Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Enterprise Value',
                value: investorMetrics.enterpriseValue,
                sub: investorMetrics.equityValue + ' Equity Value',
                icon: Building2,
              },
              {
                label: 'Annual Revenue',
                value: investorMetrics.annualRevenue,
                sub: investorMetrics.revenueGrowth,
                icon: TrendingUp,
              },
              {
                label: 'Diluted EPS',
                value: investorMetrics.dilutedEps,
                sub: investorMetrics.epsBeat,
                icon: DollarSign,
              },
              {
                label: 'Free Cash Flow',
                value: investorMetrics.freeCashFlow,
                sub: investorMetrics.cashConversion,
                icon: BarChart3,
              },
            ].map((card) => (
              <div
                key={card.label}
                className="relative p-5 rounded-sm"
                style={{ background: '#0c0e15', borderTop: '2px solid #F97316' }}
              >
                <card.icon size={16} className="text-orange-400 mb-3 opacity-70" />
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-1">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-white tracking-tight mb-1">{card.value}</p>
                <p className="font-mono text-[10px] text-zinc-500">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. Q3 2026 FINANCIAL RESULTS WEBCAST
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <SectionLabel>Q3 2026 Financial Results Webcast & Executive Remarks</SectionLabel>

        <div
          className="rounded-sm border border-white/[0.08] overflow-hidden"
          style={{ background: '#0c0e15' }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Audio Player */}
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              {/* Live badge */}
              <div className="flex items-center gap-2 mb-6">
                <Radio size={12} className="text-orange-400" />
                <span className="font-mono text-[10px] tracking-widest text-orange-400 uppercase">
                  On-Demand Replay
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">Q3 FY2026 Earnings Webcast</h3>
              <p className="text-zinc-500 text-sm mb-6">
                Executive Remarks &mdash; Marcus Vance (CEO) &amp; Harrison Cole (CFO)
              </p>

              {/* Waveform */}
              <div className="rounded-sm bg-black/40 border border-white/[0.06] mb-5 overflow-hidden">
                <WaveformBars isPlaying={isPlaying} />
              </div>

              {/* Controls row */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center flex-shrink-0 transition-colors duration-200 shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                >
                  {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
                </button>

                <div className="flex-1">
                  {/* Progress bar */}
                  <div className="h-[2px] bg-white/10 rounded-full mb-2 relative overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-orange-500 rounded-full transition-all duration-700"
                      style={{ width: isPlaying ? '53%' : '53%' }}
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 bg-orange-400 w-2 h-2 rounded-full" style={{ left: 'calc(53% - 4px)' }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-[10px] text-zinc-400 flex items-center gap-1">
                      <Clock size={9} /> 47:23
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">89:14</span>
                  </div>
                </div>
              </div>

              {/* Speakers */}
              <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 gap-3">
                {['Marcus Vance — CEO & Founder', 'Harrison Cole — CFO'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    <span className="text-zinc-400 text-xs">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Slide Index */}
            <div className="p-8">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-6">
                Synchronized Slide Index
              </p>
              <div className="space-y-3">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`w-full text-left flex items-start gap-4 p-4 rounded-sm border transition-all duration-200 ${
                      activeSlide === i
                        ? 'border-orange-500/40 bg-orange-500/[0.07]'
                        : 'border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]'
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] flex-shrink-0 mt-0.5 ${
                        activeSlide === i ? 'text-orange-400' : 'text-zinc-500'
                      }`}
                    >
                      {slide.time}
                    </span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${activeSlide === i ? 'text-white' : 'text-zinc-300'}`}>
                        {slide.title}
                      </p>
                      {activeSlide === i && (
                        <p className="text-[11px] text-orange-400 font-mono mt-1 tracking-wide">
                          ▶ NOW PLAYING
                        </p>
                      )}
                    </div>
                    <span className={`font-mono text-[10px] tracking-wider ${activeSlide === i ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      SLIDE {String(i + 1).padStart(2, '0')}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/[0.06] flex gap-3">
                <button className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white border border-white/10 hover:border-white/25 px-3 py-2 rounded-sm transition-all">
                  <Download size={11} /> TRANSCRIPT PDF
                </button>
                <button className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white border border-white/10 hover:border-white/25 px-3 py-2 rounded-sm transition-all">
                  <ExternalLink size={11} /> SLIDE DECK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CONSOLIDATED FINANCIAL HIGHLIGHTS
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <SectionLabel>Consolidated Financial Highlights & Segment Breakdown</SectionLabel>
            <h2 className="text-3xl font-bold text-white mt-2">
              Revenue &amp; EBITDA Segment Analysis
            </h2>
          </div>
          {/* Year Toggle */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-[#0c0e15] border border-white/[0.12] text-white font-mono text-xs tracking-widest px-4 py-2.5 pr-10 rounded-sm focus:outline-none focus:border-orange-500/50 cursor-pointer"
            >
              <option>FY2024</option>
              <option>FY2025</option>
              <option>FY2026 Target</option>
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-sm border border-white/[0.08]">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr style={{ background: '#0c0e15' }} className="border-b border-white/[0.08]">
                {['Segment', 'FY2024', 'FY2025', 'FY2026 Target', 'YoY Growth'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-left font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {earningsSegmentBreakdown.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/[0.05] transition-colors ${
                    row.highlight
                      ? 'bg-orange-500/[0.06] border-orange-500/10'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="px-5 py-4">
                    <span className={`text-sm ${row.highlight ? 'text-white font-semibold' : 'text-zinc-300'}`}>
                      {row.segment}
                    </span>
                  </td>
                  {['fy24', 'fy25', 'fy26Target'].map((key) => (
                    <td
                      key={key}
                      className={`px-5 py-4 font-mono text-sm ${
                        row.highlight ? 'text-amber-300 font-semibold' : 'text-zinc-400'
                      } ${
                        (key === 'fy25' && selectedYear === 'FY2025') ||
                        (key === 'fy24' && selectedYear === 'FY2024') ||
                        (key === 'fy26Target' && selectedYear === 'FY2026 Target')
                          ? 'text-white'
                          : ''
                      }`}
                    >
                      {row[key]}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                      {row.yoy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-mono text-[10px] text-zinc-600 tracking-wide">
          ⓘ Prepared in accordance with US GAAP under PwC LLP audit certification
        </p>
      </section>

      {/* ══════════════════════════════════════════
          4. PRODUCTION SLATE GUIDANCE & ROI
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-white/[0.06]">
        <SectionLabel>2025–2027 Production Slate Guidance & ROI Forecast</SectionLabel>
        <h2 className="text-3xl font-bold text-white mb-10">
          Institutional Slate ROI Projections
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {slateRoiGuidance.map((film) => (
            <div
              key={film.id}
              className="group relative rounded-sm overflow-hidden border border-white/[0.08] hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              style={{ background: '#0c0e15' }}
            >
              {/* Backdrop */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-[#0c0e15]/50 to-transparent" />
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[9px] tracking-widest uppercase bg-orange-500/90 text-white px-2 py-1 rounded-sm">
                    {film.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-0.5">{film.title}</h3>
                <p className="text-zinc-500 text-xs mb-4">
                  Dir. {film.director} &nbsp;·&nbsp; DOP: {film.dop}
                </p>

                <div className="space-y-2.5 mb-4">
                  {[
                    { label: 'Production Budget', value: film.budget },
                    { label: 'Projected Box Office', value: film.projectedBoxOffice },
                    { label: 'Target ROI', value: film.targetRoi },
                    { label: 'Release Target', value: film.releaseTarget },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="font-mono text-[10px] tracking-wide text-zinc-500 uppercase">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <Award size={11} className="text-amber-400" />
                    <span className="font-mono text-[10px] text-amber-400 tracking-wide">
                      {film.targetRoi} PROJECTED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. REGULATORY VAULT & FILINGS
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-white/[0.06]">
        <SectionLabel>Audited Regulatory Vault & Filings</SectionLabel>
        <h2 className="text-3xl font-bold text-white mb-10">SEC Filings &amp; Disclosures</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {regulatoryFilings.map((filing, i) => (
            <div
              key={i}
              className="p-6 rounded-sm border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200"
              style={{ background: '#0c0e15' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span
                  className={`font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm border ${filingBadgeClass(
                    filing.type
                  )}`}
                >
                  {filing.type}
                </span>
                <div className="flex items-center gap-1 text-zinc-600">
                  <Shield size={11} />
                  <span className="font-mono text-[9px] tracking-wide">SEC EDGAR</span>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{filing.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-5">{filing.desc}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] text-zinc-500">{filing.date}</p>
                  <p className="font-mono text-[9px] text-zinc-600 mt-0.5">{filing.fileSize}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-sm transition-all">
                    <Download size={10} /> DOWNLOAD PDF
                  </button>
                  <button className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-sm transition-all">
                    <ExternalLink size={10} /> VIEW INLINE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. ANALYST COVERAGE & CONSENSUS
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-white/[0.06]">
        <SectionLabel>Sell-Side Analyst Coverage & Consensus Estimates</SectionLabel>
        <h2 className="text-3xl font-bold text-white mb-10">Analyst Coverage Universe</h2>

        {/* Consensus Summary */}
        <div
          className="flex flex-wrap gap-8 items-center p-6 rounded-sm border border-amber-500/20 mb-10"
          style={{ background: 'rgba(245,158,11,0.04)' }}
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-1">
              Consensus Price Target
            </p>
            <p className="text-3xl font-bold text-white">$150.00</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-1">
              Consensus Rating
            </p>
            <p className="text-xl font-bold text-emerald-400 tracking-wide">STRONG BUY</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-1">
              Coverage Count
            </p>
            <p className="text-3xl font-bold text-white">4</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div className="flex gap-2">
            {['OUTPERFORM', 'OVERWEIGHT', 'BUY'].map((r) => (
              <span
                key={r}
                className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm ${ratingClass(r)}`}
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Analyst Table */}
        <div className="overflow-x-auto rounded-sm border border-white/[0.08]">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr style={{ background: '#0c0e15' }} className="border-b border-white/[0.08]">
                {['Investment Bank', 'Lead Analyst', 'Rating', 'Price Target', 'Updated'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {analystCoverage.map((analyst, i) => (
                <tr
                  key={i}
                  className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-4 text-white font-semibold text-sm">{analyst.firm}</td>
                  <td className="px-5 py-4 text-zinc-400 text-sm">{analyst.analyst}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm ${ratingClass(
                        analyst.rating
                      )}`}
                    >
                      {analyst.rating}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-white font-semibold">
                    {analyst.targetPrice}
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-zinc-500">{analyst.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. IR EVENTS & ROADSHOWS
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-white/[0.06]">
        <SectionLabel>Upcoming IR Events & Roadshows</SectionLabel>
        <h2 className="text-3xl font-bold text-white mb-10">
          Investor Calendar &amp; Buyside Desk
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Events */}
          <div className="space-y-4">
            {irRoadshows.map((event, i) => (
              <div
                key={i}
                className="p-5 rounded-sm border border-white/[0.08] hover:border-orange-500/20 transition-all duration-200"
                style={{ background: '#0c0e15' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Calendar size={18} className="text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-white leading-snug">{event.title}</h3>
                      <span
                        className={`flex-shrink-0 font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm border ${statusBadgeClass(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                        <Clock size={10} className="text-zinc-600" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                        <MapPin size={10} className="text-zinc-600" /> {event.location}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 flex items-center gap-1.5">
                      <Users size={10} className="text-zinc-600 flex-shrink-0" />
                      {event.speakers}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div
            className="p-7 rounded-sm border border-white/[0.08]"
            style={{ background: '#0c0e15' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={14} className="text-orange-400" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-orange-400">
                Accredited Shareholder & Buyside Desk
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-6">Direct IR Access Request</h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] tracking-widest uppercase text-zinc-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="Jonathan Mercer"
                    className="w-full bg-black/30 border border-white/10 text-white text-sm px-4 py-2.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-widest uppercase text-zinc-500 mb-1.5">
                    Institution / Fund Name
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleFormChange}
                    placeholder="Blackrock Asset Management"
                    className="w-full bg-black/30 border border-white/10 text-white text-sm px-4 py-2.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] tracking-widest uppercase text-zinc-500 mb-1.5">
                  AUM Classification
                </label>
                <div className="relative">
                  <select
                    name="aum"
                    value={formData.aum}
                    onChange={handleFormChange}
                    className="w-full appearance-none bg-black/30 border border-white/10 text-white text-sm px-4 py-2.5 pr-10 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                  >
                    <option value="" disabled>Select AUM range</option>
                    <option>&lt;$100M</option>
                    <option>$100M–$1B</option>
                    <option>&gt;$1B</option>
                    <option>Sovereign/Pension</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] tracking-widest uppercase text-zinc-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="j.mercer@fund.com"
                    className="w-full bg-black/30 border border-white/10 text-white text-sm px-4 py-2.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-widest uppercase text-zinc-500 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+1 (212) 000-0000"
                    className="w-full bg-black/30 border border-white/10 text-white text-sm px-4 py-2.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] tracking-widest uppercase text-zinc-500 mb-1.5">
                  Nature of Inquiry
                </label>
                <div className="relative">
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleFormChange}
                    className="w-full appearance-none bg-black/30 border border-white/10 text-white text-sm px-4 py-2.5 pr-10 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                  >
                    <option value="" disabled>Select inquiry type</option>
                    <option>Earnings Q&amp;A</option>
                    <option>NDR Roadshow Request</option>
                    <option>Block Trade Desk</option>
                    <option>ESG &amp; Governance</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs tracking-[0.25em] uppercase py-3.5 rounded-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 mt-2"
              >
                <ArrowUpRight size={14} />
                SUBMIT TO IR DESK
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. IR FOOTER / CONTACT CTA
      ══════════════════════════════════════════ */}
      <section
        className="mt-8 border-t border-white/[0.08]"
        style={{ background: '#0c0e15' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <SectionLabel>Investor Relations Contact</SectionLabel>
              <h2 className="text-2xl font-bold text-white mb-4">
                Direct Lines to Our IR Team
              </h2>
              <div className="space-y-2">
                <a
                  href="mailto:mypersonalemailboxln@gmail.com"
                  className="flex items-center gap-2.5 text-zinc-300 hover:text-orange-400 transition-colors group"
                >
                  <Mail size={14} className="text-orange-400 flex-shrink-0" />
                  <span className="font-mono text-sm group-hover:underline">
                    mypersonalemailboxln@gmail.com
                  </span>
                </a>
                <a
                  href="tel:+19072052163"
                  className="flex items-center gap-2.5 text-zinc-300 hover:text-orange-400 transition-colors group"
                >
                  <Phone size={14} className="text-orange-400 flex-shrink-0" />
                  <span className="font-mono text-sm group-hover:underline">
                    +1 907-205-2163
                  </span>
                </a>
                <div className="flex items-center gap-2.5 text-zinc-400 text-xs font-mono pt-1">
                  <MapPin size={14} className="text-amber-400 flex-shrink-0" />
                  <span>1809 Forest Avenue, New York, NY 10001 USA</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActivePage && setActivePage('contact')}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs tracking-widest px-6 py-3 transition-all duration-200 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]"
              >
                <Mail size={13} />
                CONTACT US
              </button>
              <button className="flex items-center gap-2 border border-white/20 hover:border-orange-500/40 text-white font-mono text-xs tracking-widest px-6 py-3 transition-all duration-200 hover:bg-white/[0.02]">
                <Film size={13} />
                INVESTOR PORTAL
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap gap-x-8 gap-y-2 text-zinc-600 font-mono text-[10px] tracking-wide">
            <span>© 2026 Platinum Flame Production LLC</span>
            <span>NYSE: PLFM</span>
            <span>{investorMetrics.creditRating}</span>
            <span>Shares Outstanding: {investorMetrics.sharesOutstanding}</span>
            <span>Dividend: {investorMetrics.dividendYield}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
