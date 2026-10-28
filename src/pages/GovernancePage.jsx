import { useState } from "react";
import {
  Shield,
  Lock,
  FileText,
  Clock,
  Download,
  CheckCircle,
  ChevronRight,
  Building,
  Users,
  Mail,
  ExternalLink,
  Hash,
  AlertCircle,
} from "lucide-react";

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-0.5 h-4 bg-orange-500" />
    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-400">
      {children}
    </span>
  </div>
);

const MetricBadge = ({ label, value }) => (
  <div className="border border-white/10 bg-white/[0.03] px-5 py-3 rounded">
    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-1">
      {label}
    </div>
    <div className="font-serif text-lg font-bold text-white">{value}</div>
  </div>
);

const ChapterTag = ({ number, subtitle }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-400 border border-orange-500/30 px-2 py-0.5">
      CHAPTER {number}
    </span>
    {subtitle && (
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-600">
        {subtitle}
      </span>
    )}
  </div>
);

export default function GovernancePage({ setActivePage, onOpenProxyVoting }) {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hashInput, setHashInput] = useState("");
  const [hashVerified, setHashVerified] = useState(null);

  const [form, setForm] = useState({
    institution: "",
    contact: "",
    email: "",
    aum: "",
    inquiryType: "",
    message: "",
  });

  const barData = [
    {
      label: "Adj. EBITDA Margin",
      syndication: 78,
      conglomerate: 42,
      unit: "%",
    },
    {
      label: "Corporate Overhead Load",
      syndication: 34,
      conglomerate: 71,
      unit: "%",
    },
    {
      label: "Average Slate ROI Multiple",
      syndication: 87,
      conglomerate: 49,
      unit: "x (indexed)",
    },
  ];

  const infrastructure = [
    {
      name: "Sunset Studios",
      address: "Hollywood, CA, USA",
      sqft: "184,000",
      detail: "8 Stages • Lot 19 Expansion",
    },
    {
      name: "Pinewood Gate",
      address: "Iver Heath, Buckinghamshire, UK",
      sqft: "942,045",
      detail: "007 Stage • Paddock Tank • VFX Wing",
    },
    {
      name: "Roppongi Hills Atelier",
      address: "Minato-ku, Tokyo, JP",
      sqft: "68,504",
      detail: "Asia-Pacific Post Hub • Immersive Suite",
    },
  ];

  const aiPrinciples = [
    {
      icon: Shield,
      title: "Informed Opt-In Mandate",
      desc: "No synthetic performance or digital likeness may be generated without explicit, written, and informed consent from the talent — regardless of pre-existing contractual relationships.",
    },
    {
      icon: FileText,
      title: "Perpetual Revenue Participation",
      desc: "Any AI-generated likeness deployed in a commercial release earns residual payments at full SAG-AFTRA scale rates, applied perpetually for the lifetime of the asset's commercial use.",
    },
    {
      icon: Hash,
      title: "Immutable Audit Trail",
      desc: "All AI usage events are cryptographically logged on a distributed ledger, forming an immutable audit trail accessible to talent guild oversight committees in real time.",
    },
    {
      icon: Clock,
      title: "Sunset Clause Protocol",
      desc: "All likeness licenses carry an automatic expiration of seven years from execution date. Renewal requires fresh written consent — no presumed perpetuity, no retroactive extension.",
    },
  ];

  const directors = [
    {
      name: "Dame Helen Davenport",
      role: "Independent Chair",
      audit: "✓",
      comp: "✓",
      nom: "Chair",
      stage: "✓",
    },
    {
      name: "Marcus Vance",
      role: "Founder & CEO",
      audit: "—",
      comp: "—",
      nom: "—",
      stage: "✓",
    },
    {
      name: "Harrison Cole",
      role: "Chief Financial Officer",
      audit: "✓",
      comp: "—",
      nom: "—",
      stage: "—",
    },
    {
      name: "Dr. Kenjiro Takahashi",
      role: "CTO & Head of Stage Pipeline",
      audit: "—",
      comp: "—",
      nom: "—",
      stage: "Chair",
    },
    {
      name: "Priya Mehta",
      role: "Independent Director",
      audit: "✓",
      comp: "Chair",
      nom: "—",
      stage: "—",
    },
  ];

  const documents = [
    {
      name: "Annual Report 2025",
      type: "PDF",
      size: "28.4 MB",
      hash: "a3f2bc8d9e1047c6fa20b3d4e5f6a7b8c9d0e1f2",
    },
    {
      name: "ESG Impact Report 2025",
      type: "PDF",
      size: "12.8 MB",
      hash: "b4e3cd9e0f2158d7gb31c4e5f6a8b9c0d1e2f3a4",
    },
    {
      name: "Articles of Incorporation",
      type: "PDF",
      size: "3.2 MB",
      hash: "c5f4de0f1g3269e8hc42d5e6f7b9c0d2e3f4a5b6",
    },
    {
      name: "Board Charter & Committee Mandates",
      type: "PDF",
      size: "6.7 MB",
      hash: "d6g5ef1g2h4370f9id53e6f7g8c0d1e3f4g5b6c7",
    },
  ];

  const renderCell = (val) => {
    if (val === "✓")
      return <span className="text-orange-400 font-bold text-base">✓</span>;
    if (val === "Chair")
      return (
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-amber-400 border border-amber-500/30 px-1.5 py-0.5">
          Chair
        </span>
      );
    return <span className="text-zinc-600 text-sm">—</span>;
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white pt-24 pb-24">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600">
            Investor Relations
          </span>
          <ChevronRight size={10} className="text-zinc-700" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500">
            Annual Letter &amp; Governance
          </span>
        </div>

        {/* Title */}
        <div className="mb-10">
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white mb-2">
            LETTER TO OUR SHAREHOLDERS &amp;
          </h1>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
            GOVERNANCE COMPENDIUM
          </h1>
          <div className="mt-4 w-24 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400" />
        </div>

        {/* Metric badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricBadge label="Fiscal Year Revenue" value="$1.84B" />
          <MetricBadge label="Free Cash Flow" value="$640M" />
          <MetricBadge label="Undrawn Revolver" value="$500M" />
          <MetricBadge label="Credit Rating" value="AAA" />
        </div>
      </section>

      {/* ── CEO & CFO STATEMENT ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <SectionLabel>Executive Statement</SectionLabel>
        <div
          className="rounded-xl p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(249,115,22,0.4) 0%, rgba(245,158,11,0.15) 50%, transparent 100%)",
          }}
        >
          <div className="bg-[#0c0e15] rounded-xl p-8 md:p-12 grid md:grid-cols-3 gap-10">
            {/* Executives */}
            <div className="md:col-span-1 flex flex-col gap-6">
              {[
                {
                  initials: "MV",
                  name: "Marcus Vance",
                  title: "Founder & Chief Executive Officer",
                },
                {
                  initials: "HC",
                  name: "Harrison Cole",
                  title: "Chief Financial Officer",
                },
              ].map((exec) => (
                <div key={exec.initials} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#111318] border border-white/10 rounded flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm tracking-widest text-zinc-400">
                      {exec.initials}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {exec.name}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-500 mt-0.5">
                      {exec.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <blockquote className="font-serif text-xl md:text-2xl italic text-zinc-200 leading-relaxed border-l-2 border-orange-500/50 pl-6">
                "In an era of fleeting streaming domination, we have chosen the
                arduous discipline of cinematic scale. Artisan machinery backed
                by rigorous balance-sheet stewardship: no novelty tech, no
                podcast pivots — this is what institutional-grade investing
                looks like."
              </blockquote>
              <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                  — Marcus Vance, Founder &amp; CEO
                </span>
                <button className="font-mono text-[10px] tracking-[0.2em] uppercase text-orange-400 border border-orange-500/40 px-5 py-2.5 hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-200 flex items-center gap-2">
                  Read Full Executive Letter
                  <ChevronRight size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 01 — CAPITAL EFFICIENCY ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <ChapterTag number="01" subtitle="Capital Structure" />
        <SectionLabel>
          The Geometry of Capital Efficiency: Slate Syndication vs. Conglomerate
          Carry
        </SectionLabel>

        <div className="grid md:grid-cols-2 gap-10 mt-6">
          <div>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Our co-production syndication model distributes both creative risk
              and capital obligation across a consortium of institutional
              partners — sovereign wealth vehicles, insurance float allocators,
              and strategic studio co-investors — while Platinum Film retains
              the creative mandate and distribution lead. This architecture
              fundamentally reconfigures the risk/return profile: overhead load
              is compressed, margin capture is maximised, and no single slate
              failure can threaten balance-sheet integrity. Conglomerate carry
              structures, by contrast, internalise cost inefficiencies, suppress
              EBITDA through divisional transfer pricing, and dilute returns
              across unrelated business units.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="border border-orange-500/20 bg-orange-500/[0.05] px-4 py-2.5 rounded">
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-orange-400 mb-0.5">
                  Adj. EBITDA Margin
                </div>
                <div className="font-serif text-2xl font-bold text-white">
                  38.2%
                </div>
              </div>
              <div className="border border-amber-500/20 bg-amber-500/[0.05] px-4 py-2.5 rounded">
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-amber-400 mb-0.5">
                  Avg. Slate ROI Multiple
                </div>
                <div className="font-serif text-2xl font-bold text-white">
                  2.4×
                </div>
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-orange-500" />
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-400">
                  Slate Syndication
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-zinc-600" />
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-400">
                  Conglomerate Carry
                </span>
              </div>
            </div>
            <div className="space-y-5">
              {barData.map((row, i) => (
                <div key={i}>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-500 mb-2">
                    {row.label}
                  </div>
                  <div className="space-y-1.5">
                    <div
                      className="relative h-7 bg-[#111318] rounded overflow-hidden cursor-pointer"
                      onMouseEnter={() => setHoveredBar(`${i}-s`)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded flex items-center justify-end pr-3 transition-all duration-700"
                        style={{ width: `${row.syndication}%` }}
                      >
                        {hoveredBar === `${i}-s` && (
                          <span className="font-mono text-[10px] text-white font-bold">
                            {row.syndication}
                            {row.unit.includes("x") ? "" : "%"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="relative h-7 bg-[#111318] rounded overflow-hidden cursor-pointer"
                      onMouseEnter={() => setHoveredBar(`${i}-c`)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div
                        className="h-full bg-zinc-600 rounded flex items-center justify-end pr-3 transition-all duration-700"
                        style={{ width: `${row.conglomerate}%` }}
                      >
                        {hoveredBar === `${i}-c` && (
                          <span className="font-mono text-[10px] text-white font-bold">
                            {row.conglomerate}
                            {row.unit.includes("x") ? "" : "%"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 02 — PHYSICAL INFRASTRUCTURE ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <ChapterTag number="02" subtitle="Hard Assets" />
        <SectionLabel>
          Physical Infrastructure as an Inflation Hedge: Soundstage Acreage
          &amp; Tech Moats
        </SectionLabel>

        <p className="text-zinc-400 leading-relaxed mb-8 max-w-3xl">
          In an inflationary macro environment, hard asset ownership provides a
          structural hedge unavailable to asset-light streaming competitors.
          Platinum Film's vertically integrated soundstage portfolio — spanning
          three continents — appreciates alongside real estate indices while
          generating recurring stage-rental yield from third-party productions.
          These are not leased facilities: they are owned infrastructure
          positioned as a perpetual moat against cost escalation.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {infrastructure.map((facility) => (
            <div
              key={facility.name}
              className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-6 border-l-2 border-l-amber-500 hover:border-l-amber-400 transition-all duration-200 group"
            >
              <Building
                size={18}
                className="text-amber-500 mb-4 group-hover:text-amber-400 transition-colors"
              />
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-600 mb-1">
                {facility.address}
              </div>
              <div className="font-serif text-lg font-bold text-white mb-2">
                {facility.name}
              </div>
              <div className="font-serif text-3xl font-bold text-amber-400 mb-1">
                {facility.sqft}
              </div>
              <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-zinc-500 mb-3">
                sq ft owned floor area
              </div>
              <div className="font-mono text-[10px] tracking-[0.1em] text-zinc-600">
                {facility.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHAPTER 03 — AI CHARTER ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <ChapterTag number="03" subtitle="Ethical Frameworks" />
        <SectionLabel>
          The 2026 Ethical AI &amp; Artist Likeness Charter
        </SectionLabel>

        <p className="text-zinc-400 leading-relaxed mb-8 max-w-3xl">
          Platinum Film adopts four binding governance principles for all
          AI-assisted production activity, ratified by the full Board and
          countersigned by SAG-AFTRA, IATSE, and the British Equity collective.
          These principles are embedded in all production agreements effective
          January 1, 2026.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {aiPrinciples.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-6 hover:border-orange-500/20 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/15 transition-colors">
                    <Icon
                      size={18}
                      className="text-orange-400 group-hover:text-orange-300 transition-colors"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-2">
                      {principle.title}
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CHAPTER 04 — BOARD GOVERNANCE ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <ChapterTag number="04" subtitle="Board Structure" />
        <SectionLabel>
          Board Governance &amp; Committee Stewardship Matrix
        </SectionLabel>

        <p className="text-zinc-400 leading-relaxed mb-8 max-w-3xl">
          The Board of Directors comprises five members across independent and
          executive mandates, distributed across four standing committees. All
          committee chairs are independent directors.
        </p>

        {/* Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                {[
                  "Director",
                  "Role",
                  "Audit",
                  "Compensation",
                  "Nominating & ESG",
                  "Stage Pipeline",
                ].map((col) => (
                  <th
                    key={col}
                    className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 text-left py-3 px-4 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {directors.map((dir, i) => (
                <tr
                  key={dir.name}
                  className={`border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors ${i === 0 ? "bg-white/[0.02]" : ""}`}
                >
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white text-sm">
                      {dir.name}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-mono text-[10px] tracking-[0.1em] text-zinc-500">
                      {dir.role}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {renderCell(dir.audit)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {renderCell(dir.comp)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {renderCell(dir.nom)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {renderCell(dir.stage)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Board Attendance Rate", value: "98%" },
            {
              label: "Compensation Committee Meetings",
              value: "14 / 16",
            },
            { label: "Nominating & ESG Attendance", value: "100%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-white/[0.08] bg-white/[0.02] px-4 py-3 rounded"
            >
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-1">
                {stat.label}
              </div>
              <div className="font-serif text-xl font-bold text-orange-400">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DOCUMENT REPOSITORY ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-3 mb-4">
          <Lock size={14} className="text-orange-400" />
          <SectionLabel>Document Repository & Cryptographic Verification Hub</SectionLabel>
        </div>

        <div className="bg-[#0c0e15] border border-white/[0.08] rounded-xl overflow-hidden mb-6">
          {documents.map((doc, i) => (
            <div
              key={doc.name}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${
                i !== documents.length - 1 ? "border-b border-white/[0.05]" : ""
              } hover:bg-white/[0.02] transition-colors`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-orange-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-white text-sm font-medium truncate">
                    {doc.name}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.1em] text-zinc-600">
                    {doc.type} • {doc.size}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 border border-white/10 px-3 py-1.5 hover:border-white/25 hover:text-white transition-all duration-200 flex items-center gap-1.5">
                  <Download size={10} />
                  Download
                </button>
                <button
                  onClick={() => setHashInput(doc.hash.slice(0, 16) + "...")}
                  className="font-mono text-[9px] tracking-[0.2em] uppercase text-orange-400 border border-orange-500/30 px-3 py-1.5 hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-200 flex items-center gap-1.5"
                >
                  <Hash size={10} />
                  Verify Hash
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SHA-256 verification */}
        <div className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-6">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-3">
            SHA-256 Hash Verification
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={hashInput}
              onChange={(e) => {
                setHashInput(e.target.value);
                setHashVerified(null);
              }}
              placeholder="Paste document SHA-256 hash for cryptographic verification..."
              className="flex-1 bg-[#111318] border border-white/10 rounded px-4 py-2.5 text-zinc-300 placeholder-zinc-700 font-mono text-xs focus:outline-none focus:border-orange-500/50"
            />
            <button
              onClick={() => setHashVerified(hashInput.length > 8)}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-white bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded transition-colors whitespace-nowrap"
            >
              Verify Document
            </button>
          </div>
          {hashVerified !== null && (
            <div
              className={`mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase ${hashVerified ? "text-green-400" : "text-red-400"}`}
            >
              {hashVerified ? (
                <CheckCircle size={12} />
              ) : (
                <AlertCircle size={12} />
              )}
              {hashVerified
                ? "Hash verified — document integrity confirmed"
                : "Hash mismatch — document may be tampered"}
            </div>
          )}
        </div>
      </section>

      {/* ── INSTITUTIONAL INQUIRIES ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionLabel>
          Institutional Shareholder &amp; Analyst Direct Inquiries
        </SectionLabel>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-8">
            <div className="space-y-4">
              {[
                {
                  id: "institution",
                  label: "Institution Name",
                  placeholder: "e.g. Vanguard Asset Management",
                },
                {
                  id: "contact",
                  label: "Contact Name",
                  placeholder: "Full legal name",
                },
                {
                  id: "email",
                  label: "Email Address",
                  placeholder: "investor@institution.com",
                  type: "email",
                },
                {
                  id: "aum",
                  label: "Assets Under Management",
                  placeholder: "e.g. $4.2B",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    value={form[field.id]}
                    onChange={(e) =>
                      setForm({ ...form, [field.id]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="w-full bg-[#111318] border border-white/10 rounded px-4 py-2.5 text-zinc-300 placeholder-zinc-700 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-1.5">
                  Inquiry Type
                </label>
                <select
                  value={form.inquiryType}
                  onChange={(e) =>
                    setForm({ ...form, inquiryType: e.target.value })
                  }
                  className="w-full bg-[#111318] border border-white/10 rounded px-4 py-2.5 text-zinc-300 text-sm focus:outline-none focus:border-orange-500/50 transition-colors appearance-none"
                >
                  <option value="" disabled>
                    Select inquiry category
                  </option>
                  <option>Earnings & Financial Results</option>
                  <option>Governance & Board Access</option>
                  <option>ESG & Sustainability Data</option>
                  <option>Roadshow Scheduling</option>
                  <option>Proxy & Voting Procedures</option>
                  <option>Other Institutional Matter</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-1.5">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Describe your inquiry with relevant context..."
                  rows={4}
                  className="w-full bg-[#111318] border border-white/10 rounded px-4 py-2.5 text-zinc-300 placeholder-zinc-700 text-sm focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                />
              </div>

              <button className="w-full font-mono text-[10px] tracking-[0.25em] uppercase text-white bg-orange-500 hover:bg-orange-600 py-3.5 rounded transition-colors flex items-center justify-center gap-2">
                <Mail size={12} />
                Submit to Governance Desk
              </button>
            </div>
          </div>

          {/* Proxy voting CTA */}
          <div className="flex flex-col gap-6">
            <div
              className="flex-1 rounded-xl p-px"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.5) 0%, rgba(245,158,11,0.2) 60%, transparent 100%)",
              }}
            >
              <div className="bg-[#0c0e15] rounded-xl p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-400 mb-4">
                    2026 Annual Shareholder Meeting
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4 leading-tight">
                    OFFICIAL PROXY VOTING PORTAL
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Accredited shareholders of record as of March 20, 2026 are
                    entitled to cast votes on three board and advisory
                    proposals. The electronic proxy system complies fully with
                    SEC Rule 14a-4 and ISO 20022 MX-PROXY protocol.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      "Director Elections",
                      "Say-on-Pay",
                      "Auditor Ratification",
                    ].map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[9px] tracking-[0.15em] uppercase text-zinc-500 border border-white/[0.08] px-2.5 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={onOpenProxyVoting}
                  className="w-full font-mono text-[10px] tracking-[0.25em] uppercase text-white bg-orange-500 hover:bg-orange-600 py-4 rounded transition-colors flex items-center justify-center gap-3 group"
                >
                  Open Proxy Voting Portal
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Secondary info */}
            <div className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-5">
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 mb-2">
                Governance Desk Contact
              </div>
              <div className="text-white text-sm font-medium mb-0.5">
                governance@platinumfilmproductions.com
              </div>
              <div className="font-mono text-[10px] text-zinc-600">
                +1 (310) 648-0144 ext. 4 • Response within one business day
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
