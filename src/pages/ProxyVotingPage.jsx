import { useState } from "react";
import {
  Lock,
  CheckCircle,
  Circle,
  ChevronRight,
  FileText,
  Shield,
  Users,
  X,
  Download,
  AlertCircle,
} from "lucide-react";

const VoteButton = ({ label, selected, onClick, variant = "default" }) => {
  const base =
    "font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200 border";
  if (selected) {
    return (
      <button
        onClick={onClick}
        className={`${base} bg-orange-500 border-orange-500 text-white`}
      >
        {label}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${base} bg-transparent border-white/20 text-zinc-400 hover:border-orange-500/50 hover:text-white`}
    >
      {label}
    </button>
  );
};

const BoardRecommendation = ({ text }) => (
  <div className="flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500">
      Board Recommends:{" "}
      <span className="text-orange-400 font-bold">{text}</span>
    </span>
  </div>
);

const ProposalCard = ({ number, type, title, children, voted }) => (
  <div
    className={`bg-[#0c0e15] rounded-xl border transition-all duration-300 ${
      voted
        ? "border-orange-500/30"
        : "border-white/[0.08] hover:border-white/[0.12]"
    }`}
  >
    <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-orange-400 border border-orange-500/30 px-2 py-0.5">
          PROPOSAL {number}
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600">
          {type}
        </span>
      </div>
      {voted ? (
        <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-green-400">
          <CheckCircle size={10} />
          VOTE CAST
        </div>
      ) : (
        <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600">
          <Circle size={10} />
          PENDING
        </div>
      )}
    </div>
    <div className="px-6 py-6">{children}</div>
  </div>
);

export default function ProxyVotingPage({ setActivePage }) {
  const [votes, setVotes] = useState({ p1: null, p2: null, p3: null });
  const [certified, setCertified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setVote = (proposal, value) =>
    setVotes((v) => ({ ...v, [proposal]: v[proposal] === value ? null : value }));

  const castedCount = Object.values(votes).filter(Boolean).length;
  const progressPct = (castedCount / 3) * 100;

  const handleSubmit = () => {
    if (certified && castedCount === 3) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white pb-24">
      {/* ── STATUS BAR ──────────────────────────────────────────────────── */}
      <div className="bg-orange-500 px-6 py-2 flex items-center justify-between flex-wrap gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          SEC FORM DEF 14A // ACCREDITED ELECTRONIC PROXY
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-orange-100">
          CIK: 0001928410 • CUSIP: 72749A 108
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-orange-100">
            Save Draft
          </span>
          <button
            onClick={() => setActivePage && setActivePage("governance")}
            className="font-mono text-[10px] text-orange-100 hover:text-white transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="pt-24 max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-0.5 h-4 bg-orange-500" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-400">
                2026 Annual Shareholder Meeting
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Official Electronic Proxy<br />Voting Portal
            </h1>
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-500">
                <span className="text-zinc-600">●</span>
                Thursday, May 14, 2026 • 10:03 AM PST
              </div>
              <div className="font-mono text-[10px] tracking-[0.1em] text-zinc-600 leading-relaxed">
                Pinewood Gate 12 Proscenium Auditorium, London
                &amp; NYSE Floor Direct Telecast
              </div>
            </div>
          </div>

          {/* Crypto session token */}
          <div className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-5 min-w-[260px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Lock size={12} className="text-orange-400" />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-600">
                Cryptographic Session Token
              </span>
            </div>
            <div className="font-mono text-sm text-white font-bold tracking-wider mb-2">
              BALLOT #PF-PROXY-2026-9942B
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-zinc-500">
                256-BIT SEC-VERIFIED ENCRYPTION
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── REGISTERED ENTITY CARD ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div
          className="rounded-xl p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(249,115,22,0.35) 0%, rgba(245,158,11,0.12) 50%, transparent 100%)",
          }}
        >
          <div className="bg-[#0c0e15] rounded-xl p-6 md:p-8 grid md:grid-cols-3 gap-6 items-center">
            {/* Entity */}
            <div>
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-600 mb-2">
                Registered Fiduciary Entity
              </div>
              <div className="font-serif text-xl font-bold text-white mb-1">
                Vanguard Fiduciary Trust //<br />Global Allocations
              </div>
              <div className="font-mono text-[10px] tracking-[0.1em] text-zinc-500">
                Accredit Account ID: 48840-9081-JS-PFP
              </div>
            </div>

            {/* Shares */}
            <div className="text-center md:border-x md:border-white/[0.08] md:px-6">
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-600 mb-2">
                Voting Common Shares
              </div>
              <div className="font-serif text-4xl font-bold text-white mb-1">
                2,450,000
              </div>
              <div className="font-mono text-[10px] tracking-[0.1em] text-zinc-500">
                0.18% Outstanding Float
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600">
                  Ballot Progress
                </span>
                <span className="font-mono text-[10px] text-orange-400">
                  {castedCount} of 3 Cast
                </span>
              </div>
              <div className="h-2 bg-[#111318] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600">
                RECORD DATE:{" "}
                <span className="text-zinc-400">MARCH 20, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROPOSALS ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 space-y-6 mb-10">

        {/* PROPOSAL 01 */}
        <ProposalCard
          number="01"
          type="Management Proposal"
          title="Director Elections"
          voted={!!votes.p1}
        >
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Election of Class III Directors (Three-Year Mandate Expiring 2029)
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Shareholders are asked to elect three Class III directors to serve
            until the 2029 Annual Meeting and until their successors are duly
            elected and qualified.
          </p>

          {/* Director mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {[
              {
                initials: "HD",
                name: "Dame Helen Davenport",
                title: "Independent Board Chair",
              },
              {
                initials: "MV",
                name: "Marcus Vance",
                title: "Founder & Chief Executive Officer",
              },
              {
                initials: "KT",
                name: "Dr. Kenjiro Takahashi",
                title: "CTO & Head of Stage Pipeline",
              },
            ].map((d) => (
              <div
                key={d.initials}
                className="bg-[#111318] border border-white/[0.06] rounded-lg p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-[#07080a] border border-white/10 rounded flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs text-zinc-400">
                    {d.initials}
                  </span>
                </div>
                <div>
                  <div className="text-white text-sm font-medium leading-tight">
                    {d.name}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.1em] text-zinc-600 mt-0.5 leading-tight">
                    {d.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-orange-400 hover:text-orange-300 transition-colors mb-6">
            <ExternalLinkIcon />
            Inspect Biographical Dossiers &amp; Committee Assignments
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 flex-wrap">
              {["FOR ALL", "WITHHOLD ALL", "SPLIT VOTE"].map((label) => (
                <VoteButton
                  key={label}
                  label={label}
                  selected={votes.p1 === label}
                  onClick={() => setVote("p1", label)}
                />
              ))}
            </div>
            <div className="ml-auto">
              <BoardRecommendation text="FOR ALL" />
            </div>
          </div>
        </ProposalCard>

        {/* PROPOSAL 02 */}
        <ProposalCard
          number="02"
          type="Advisory Governance"
          title="Say-on-Pay"
          voted={!!votes.p2}
        >
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Advisory Vote on Executive Compensation ("Say-on-Pay Resolution")
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            In accordance with Section 14A of the Securities Exchange Act of
            1934, shareholders are invited to cast a non-binding advisory vote
            to approve the compensation of the Company's named executive
            officers as disclosed in the proxy statement. The Compensation
            Committee has structured the 2025 executive compensation program
            around three long-term performance metrics: Total Shareholder
            Return (TSR), Free Cash Flow Conversion, and Slate ROI Multiple —
            all subject to a three-year vesting cliff.
          </p>
          <button className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-orange-400 hover:text-orange-300 transition-colors mb-6">
            <ExternalLinkIcon />
            Review Compensation Tables in DEF-14A Filing
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 flex-wrap">
              {["FOR", "AGAINST", "ABSTAIN"].map((label) => (
                <VoteButton
                  key={label}
                  label={label}
                  selected={votes.p2 === label}
                  onClick={() => setVote("p2", label)}
                />
              ))}
            </div>
            <div className="ml-auto">
              <BoardRecommendation text="FOR" />
            </div>
          </div>
        </ProposalCard>

        {/* PROPOSAL 03 */}
        <ProposalCard
          number="03"
          type="Audit Committee"
          title="Auditor Ratification"
          voted={!!votes.p3}
        >
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Ratification of PricewaterhouseCoopers LLP as Independent
            Registered Public Accounting Firm
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            The Audit Committee recommends ratification of PricewaterhouseCoopers
            LLP as the Company's independent registered public accounting firm
            for the fiscal year ending December 31, 2026. PwC has served as
            the Company's auditor since 2019. Total fees paid in fiscal 2025
            were \$4.8 million, comprising \$3.9 million Audit Fees, \$0.6 million
            Audit-Related Fees, and \$0.3 million Tax Fees. No financial
            information systems design or non-audit consulting services were
            engaged.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 flex-wrap">
              {["FOR", "AGAINST", "ABSTAIN"].map((label) => (
                <VoteButton
                  key={label}
                  label={label}
                  selected={votes.p3 === label}
                  onClick={() => setVote("p3", label)}
                />
              ))}
            </div>
            <div className="ml-auto">
              <BoardRecommendation text="FOR" />
            </div>
          </div>
        </ProposalCard>
      </div>

      {/* ── CERTIFICATION & SIGNATURE ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="bg-[#0c0e15] border border-white/[0.08] rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={16} className="text-orange-400" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-400">
              Certification &amp; Authorized Signature
            </span>
          </div>

          {/* Legal cert box */}
          <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-5 mb-6">
            <p className="text-zinc-300 text-sm leading-relaxed">
              I hereby certify under penalty of perjury that I am authorized to
              execute voting rights for the{" "}
              <strong className="text-white">2,450,000 Common Shares</strong>{" "}
              registered under CUSIP 72749A 108 as of the Record Date (March
              20, 2026), and that this electronic proxy submission satisfies{" "}
              <strong className="text-white">SEC Rule 14a-4</strong> and all
              applicable requirements of the Securities Exchange Act of 1934,
              as amended.
            </p>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer mb-6 group">
            <div
              onClick={() => setCertified((c) => !c)}
              className={`w-5 h-5 mt-0.5 border rounded flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                certified
                  ? "bg-orange-500 border-orange-500"
                  : "border-white/20 bg-transparent group-hover:border-orange-500/50"
              }`}
            >
              {certified && <CheckCircle size={12} className="text-white" />}
            </div>
            <span className="text-zinc-300 text-sm leading-relaxed">
              I confirm that the above certification is true and correct, that
              I have read the full Proxy Statement, and that I am duly
              authorized to execute this electronic ballot on behalf of the
              registered fiduciary entity.
            </span>
          </label>

          {/* Signatory field */}
          <div className="mb-8">
            <label className="block font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-600 mb-2">
              Authorized Signatory Name &amp; Title
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#111318] border border-white/10 rounded px-4 py-3 flex items-center gap-3">
                <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                <span className="text-zinc-300 text-sm font-medium">
                  Harrison Cole, Managing Trustee
                </span>
              </div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-green-400 border border-green-500/30 px-3 py-3 rounded">
                VERIFIED
              </div>
            </div>
          </div>

          {/* Submission warning if not all voted */}
          {castedCount < 3 && (
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] tracking-[0.15em] uppercase text-amber-400">
              <AlertCircle size={12} />
              {3 - castedCount} proposal{3 - castedCount !== 1 ? "s" : ""}{" "}
              awaiting vote before submission
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-300 border border-white/20 px-6 py-3 hover:border-white/40 hover:text-white transition-all duration-200 flex items-center gap-2 rounded">
              <FileText size={12} />
              Export Ballot (PDF)
            </button>
            <button className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-300 border border-white/20 px-6 py-3 hover:border-white/40 hover:text-white transition-all duration-200 flex items-center gap-2 rounded">
              <Users size={12} />
              Assign Proxy to Chair
            </button>
            <button
              onClick={handleSubmit}
              disabled={!certified || castedCount < 3}
              className={`font-mono text-[10px] tracking-[0.2em] uppercase px-8 py-3 rounded flex items-center gap-2 transition-all duration-200 ${
                certified && castedCount === 3
                  ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/[0.04]"
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle size={12} />
                  Ballot Transmitted
                </>
              ) : (
                <>
                  <Lock size={12} />
                  Sign &amp; Transmit Ballot
                </>
              )}
            </button>
          </div>

          {submitted && (
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-green-400">
              <CheckCircle size={12} />
              Ballot successfully submitted — Confirmation ref:{" "}
              <span className="text-green-300">
                PFP-2026-{Math.floor(Math.random() * 999999)
                  .toString()
                  .padStart(6, "0")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER TELEMETRY BAR ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0c0e15] border-t border-white/[0.06] px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 z-50">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-zinc-600">
            Brookridge Financial Solutions &amp; NYSE Shareholder Gateway
            Telemetry:{" "}
            <span className="text-green-400">Active</span>
          </span>
        </div>
        <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-zinc-600">
          Corporate Secretary Helpline:{" "}
          <span className="text-zinc-400">+1 (310) 648-0144</span>
        </div>
        <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-zinc-600">
          Protocol:{" "}
          <span className="text-amber-400">ISO 20022 MX-PROXY</span>
        </div>
      </div>
    </div>
  );
}

// Inline micro-icon to avoid import bloat
function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
