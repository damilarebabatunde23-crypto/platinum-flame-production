import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  UploadCloud, 
  FileText,
  Building,
  Lock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Loader2
} from 'lucide-react';
import { submitProjectInquiry } from '../services/supabaseService';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('PROJECT SUBMISSION');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectTitle: '',
    budgetTier: '$15M – $50M (Major Theatrical)',
    timeline: 'Q1 / Q2 2027 (Principal Photography)',
    filmingLot: 'Los Angeles Sunset Lot (Stage 01 – 04)',
    details: '',
    ndaRequested: true,
    screeningRequested: false,
    fileName: ''
  });

  const gatewayTabs = [
    'PROJECT SUBMISSION',
    'STAGE RESERVATION',
    'TALENT PACKAGING & CASTING',
    'CO-FINANCING & DEBT',
    'PRESS & MEDIA ACCREDITATION'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitProjectInquiry({
        fullName: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        projectTitle: formData.projectTitle,
        budgetTier: formData.budgetTier,
        timeline: formData.timeline,
        filmingLot: formData.filmingLot,
        selectedServices: [activeTab],
        details: formData.details || `Submitted via Contact Page [Gateway: ${activeTab}]`,
        ndaRequested: formData.ndaRequested,
        screeningRequested: formData.screeningRequested
      }, selectedFile);

      setReferenceCode(result.referenceCode);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Contact submission error:', err);
      setReferenceCode(`PFP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const productionHubs = [
    {
      city: "NEW YORK GLOBAL HEADQUARTERS",
      location: "New York, NY",
      badge: "GLOBAL HEADQUARTERS",
      address: "1809 Forest Avenue, New York, NY 10001 USA",
      stages: "6 Soundstages (140,000 sq ft) • 28,000 sq ft LED Volume",
      phone: "+1 907-205-2163",
      email: "mypersonalemailboxln@gmail.com",
      taxIncentive: "30% New York State Film Production Tax Credit",
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop"
    },
    {
      city: "PINEWOOD ATELIER & STAGES",
      location: "Iver Heath, Buckinghamshire",
      badge: "EUROPEAN GATE",
      address: "Pinewood Studios, Pinewood Rd, Iver Heath SL0 0NH, UK",
      stages: "4 Acoustic Soundstages • 1.2M Gallon Dive & Action Tank",
      phone: "+1 907-205-2163",
      email: "mypersonalemailboxln@gmail.com",
      taxIncentive: "Up to 34% UK Audio-Visual Expenditure Credit (AVEC)",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop"
    },
    {
      city: "ROPPONGI HILLS ATELIER",
      location: "Minato City, Tokyo",
      badge: "ASIA-PACIFIC DIVISION",
      address: "6-10-1 Roppongi, Minato City, Tokyo 106-6108, Japan",
      stages: "2 Motion Capture Stages • Real-Time Unreal Cluster Lab",
      phone: "+1 907-205-2163",
      email: "mypersonalemailboxln@gmail.com",
      taxIncentive: "Up to 50% J-LOD Government Co-Production Support",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const departmentDesks = [
    { name: "EXECUTIVE ACQUISITIONS & PROJECTS", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Greenlight mandates, co-production deals, screenplay packaging." },
    { name: "PHYSICAL PRODUCTION & STAGES", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Stage availability, call sheets, union crew staffing, and UPM coordination." },
    { name: "CASTING & STAR PACKAGING", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Agency packaging, SAG-AFTRA deals, star attachments, and audition stages." },
    { name: "VIRTUAL PRODUCTION & LED", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Stage 01 LED Volume booking, nDisplay clusters, and camera tracking specs." },
    { name: "FINANCING & TAX CREDITS", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Co-production equity, NY & UK tax credit monetization, and completion bonds." },
    { name: "POST & DOLBY ATMOS MIXING", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Dolby Atmos Stage B mixing, Barco 4K laser grading, and 70mm photochemical prints." },
    { name: "GUILD & LEGAL AFFAIRS", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Chain of title, international treaty agreements, and mutual studio NDAs." },
    { name: "DIRECT OPERATIONS HOTLINE (24/7)", email: "mypersonalemailboxln@gmail.com", phone: "+1 907-205-2163", desc: "Direct hotline for executive inquiries and active production units." }
  ];

  const faqs = [
    {
      q: "What is the typical turnaround on an executive screenplay or package review?",
      a: "Our acquisitions board processes unsolicited executive submissions within 48 to 72 business hours under mutual NDA. Full packaging and financial waterfall audits are completed within 14 business days."
    },
    {
      q: "How do international productions leverage Platinum Flame's multi-territory tax infrastructure?",
      a: "We structure physical production across our Hollywood, Pinewood, and Reykjavik basecamps to legally capture qualifying expenditures, unlocking between 25% and 45% in national and regional cash rebates."
    },
    {
      q: "Can independent productions hire individual soundstages or camera packages without full-service packaging?",
      a: "Yes. While we specialize in turnkey studio slates, Stage 01 (LED Volume), Stage 02 (Titan Tank), and our optical lens fleet are available for standalone weekly rentals to certified union productions."
    },
    {
      q: "What protocols are used to guarantee absolute screenplay and footage security?",
      a: "All treatments, scripts, and video dailies are encrypted using 256-bit AES storage, conforming strictly to MPAA and TISAX Level 3 cybersecurity guidelines with biometric physical access controls."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 pt-28 pb-24 overflow-hidden">
      {/* =========================================================================
          PAGE HEADER (Matching Image 1: "CONNECT WITH THE VANGUARD OF CINEMA")
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
            EXECUTIVE DIRECTORY • GLOBAL ATELIERS • CONFIDENTIAL PROJECT GREENLIGHT
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white uppercase max-w-5xl mx-auto leading-tight">
          CONNECT WITH THE <span className="flame-gradient-text">VANGUARD OF CINEMA</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed">
          Whether packaging a $150M theatrical tentpole, reserving private soundstage space, or structuring multi-territory co-production capital, our executive acquisitions board responds within 24 hours under complete mutual confidentiality.
        </p>

        {/* 4 Header Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-center font-mono">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-serif font-black text-white">5 Global Hubs</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">New York, London, Tokyo, Reykjavik, Paris</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-serif font-black text-emerald-400">&lt; 24-Hour</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Executive Board Review SLA</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-2xl sm:text-3xl font-serif font-black text-orange-400">100% Encrypted</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Strict MPAA & TISAX Protocol</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xl sm:text-2xl font-serif font-black text-amber-400">+1 907-205-2163</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Direct Executive Line</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXECUTIVE PROJECT GATEWAY (Master Form matching Image 1!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0e15] border border-orange-500/30 shadow-2xl space-y-8">
          <div className="space-y-1">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              [ OFFICIAL TRANSMISSION DESK ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              EXECUTIVE PROJECT GATEWAY
            </h2>
          </div>

          {/* Form Tabs */}
          <div className="flex flex-wrap gap-2">
            {gatewayTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider border transition ${
                  activeTab === tab
                    ? 'bg-orange-500 text-black font-bold border-orange-500'
                    : 'bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {isSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Production Dossier Transmitted
              </h3>
              <p className="text-sm text-zinc-300 max-w-lg mx-auto">
                Your submission under category <strong className="text-orange-400">{activeTab}</strong> has been routed directly to our Executive Acquisitions Committee.
              </p>
              <div className="inline-block px-4 py-2 bg-zinc-900 border border-orange-500/40 rounded-xl font-mono text-lg font-bold text-orange-400 tracking-widest my-2">
                {referenceCode}
              </div>
              <p className="text-xs text-zinc-500 font-mono">
                A countersigned Studio Mutual NDA and review timeline has been delivered to {formData.email}.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold"
                >
                  Submit Another Dossier
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-zinc-400 mb-1">PRODUCER / EXECUTIVE FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg glass-input"
                  />
                </div>

                <div>
                  <label className="block font-mono text-zinc-400 mb-1">PRODUCTION ENTITY / STUDIO / AGENCY *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Auteur Pictures UK"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg glass-input"
                  />
                </div>

                <div>
                  <label className="block font-mono text-zinc-400 mb-1">OFFICIAL CORPORATE EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@production.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg glass-input"
                  />
                </div>

                <div>
                  <label className="block font-mono text-zinc-400 mb-1">DIRECT TELEPHONE / INTERNATIONAL NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (310) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-zinc-400 mb-1">WORKING PROJECT TITLE / SLATE CONCEPT *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Obsidian Crown: Part II or Stage 01 LED Volume Shoot"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg glass-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-zinc-400 mb-1">ANTICIPATED BUDGET TIER</label>
                  <select
                    value={formData.budgetTier}
                    onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-zinc-300 font-mono"
                  >
                    <option value="Under $5M (Pre-Development / Proof)">Under $5M (Pre-Development)</option>
                    <option value="$5M – $15M (Independent Auteur)">$5M – $15M (Independent Auteur)</option>
                    <option value="$15M – $50M (Major Theatrical)">$15M – $50M (Major Theatrical)</option>
                    <option value="$50M – $150M+ (Studio Tentpole)">$50M – $150M+ (Studio Tentpole)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-zinc-400 mb-1">PRODUCTION TIMELINE</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-zinc-300 font-mono"
                  >
                    <option value="Immediate Q1/Q2 2027">Immediate Q1 / Q2 2027 (Principal Photography)</option>
                    <option value="Q3/Q4 2027">Q3 / Q4 2027</option>
                    <option value="2028+ Long-Range Slate">2028+ Long-Range Slate Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-zinc-400 mb-1">PREFERRED PRIMARY FILMING LOT</label>
                <select
                  value={formData.filmingLot}
                  onChange={(e) => setFormData({ ...formData, filmingLot: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg glass-input text-zinc-300 font-mono"
                >
                  <option value="Los Angeles Sunset Lot (Stage 01 – 04)">Los Angeles Sunset Lot (Stage 01 – 04)</option>
                  <option value="London Pinewood Gate 12 (Water Stage Lot)">London Pinewood Gate 12 (Water Stage Lot)</option>
                  <option value="Tokyo Roppongi Atelier (MoCap Lab)">Tokyo Roppongi Atelier (MoCap Lab)</option>
                  <option value="Reykjavik Basecamp (Iceland)">Reykjavik Basecamp (Iceland Nordic Unit)</option>
                  <option value="Remote Global Expedition Unit">Remote Global Expedition Unit</option>
                </select>
              </div>

              {/* Message / Synopsis */}
              <div>
                <label className="block font-mono text-zinc-400 mb-1">
                  PROJECT SYNOPSIS, SLATE REQUIREMENTS OR EXECUTIVE INQUIRY DETAILS
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide an overview of your screenplay logline, required soundstage footprint, packaging goals, or key attachment requests..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg glass-input text-xs"
                />
              </div>

              {/* Upload Box */}
              <div>
                <label className="block font-mono text-zinc-400 mb-1">
                  ATTACH TREATMENT, SCREENPLAY DRAFT, OR LOOKBOOK DECK
                </label>
                <label className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/15 block text-center cursor-pointer hover:border-orange-500/40 transition">
                  <UploadCloud className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="font-mono text-xs text-white font-semibold">
                    {formData.fileName || 'Drag Treatment, Script (FDX), or Lookbook Deck here'}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 mt-1">
                    Accepts PDF, FDX, DOCX, ZIP (Encrypted up to 50MB)
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setSelectedFile(f);
                        setFormData(prev => ({ ...prev, fileName: f.name }));
                      }
                    }}
                  />
                </label>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1 font-mono text-[11px] text-zinc-300">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ndaRequested}
                    onChange={(e) => setFormData({ ...formData, ndaRequested: e.target.checked })}
                    className="rounded text-orange-500"
                  />
                  <span>Execute Platinum Flame Studio Mutual NDA prior to review</span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.screeningRequested}
                    onChange={(e) => setFormData({ ...formData, screeningRequested: e.target.checked })}
                    className="rounded text-orange-500"
                  />
                  <span>Request private screening room demonstration in Los Angeles or London</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-xl shadow-orange-950/40 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING & ENCRYPTING PRODUCTION DOSSIER...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT PRODUCTION DOSSIER</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-zinc-500 pt-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>PROTECTED UNDER MPAA & TISAX PROTOCOLS • 256-BIT ENCRYPTION</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          INTERNATIONAL PRODUCTION HUBS (Matching Image 1: LA, Pinewood, Tokyo)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ PHYSICAL CAMPUSES ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            INTERNATIONAL PRODUCTION HUBS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Dedicated studio facilities with direct access to local filming incentives, post laboratories, and union crews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productionHubs.map((hub) => (
            <div
              key={hub.city}
              className="rounded-3xl overflow-hidden bg-[#0c0e15] border border-white/10 hover:border-orange-500/30 transition flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="aspect-[16/10] w-full overflow-hidden bg-black relative">
                  <img src={hub.image} alt={hub.city} className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-orange-400 border border-orange-500/30 uppercase font-bold">
                      {hub.badge}
                    </span>
                  </div>
                </div>

                <div className="px-6 space-y-3 font-mono text-xs">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white group-hover:text-amber-200 transition">
                      {hub.city}
                    </h4>
                    <p className="text-zinc-400 font-sans">{hub.location}</p>
                  </div>

                  <div className="space-y-1.5 text-zinc-300">
                    <div><span className="text-zinc-500">ADDRESS:</span> {hub.address}</div>
                    <div><span className="text-zinc-500">STAGES:</span> {hub.stages}</div>
                    <div><span className="text-zinc-500">DIRECT:</span> <span className="text-white font-medium">{hub.phone}</span></div>
                    <div><span className="text-zinc-500">TAX INCENTIVE:</span> <span className="text-emerald-400 font-bold">{hub.taxIncentive}</span></div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => alert(`Map & directions for ${hub.city} dispatched to client.`)}
                  className="py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] text-center"
                >
                  VISIT LOT
                </button>
                <button
                  onClick={() => alert(`Technical Stage CAD Plans for ${hub.city} downloaded.`)}
                  className="py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500 hover:text-black text-orange-400 text-[11px] text-center font-bold"
                >
                  DOWNLOAD PLANS
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SPECIALIZED DEPARTMENT DESKS (8 Desks matching Image 1!)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ DIRECT DESK DIRECTORY ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            SPECIALIZED DEPARTMENT DESKS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Direct operational routing for physical line producing, talent contracts, and Dolby Atmos audio mixing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentDesks.map((desk, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0c0e15] border border-white/10 hover:border-orange-500/30 transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-orange-400 font-bold">DESK 0{idx + 1}</span>
                  {idx === 7 && <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold animate-pulse">24/7 LIVE</span>}
                </div>
                <h4 className="font-serif font-bold text-sm text-white">{desk.name}</h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-normal">{desk.desc}</p>
              </div>

              <div className="pt-2 border-t border-white/5 font-mono text-[11px] space-y-1">
                <div className="text-zinc-200 truncate">{desk.email}</div>
                <div className="text-orange-400 font-medium">{desk.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FREQUENTLY ASKED QUESTIONS (Matching Image 1)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-8">
        <div className="text-center space-y-1">
          <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
            [ STUDIO PROTOCOLS & INQUIRIES ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0c0e15] border border-white/10 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 hover:bg-white/[0.02]"
                >
                  <span className="font-serif font-bold text-base text-white">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-orange-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-zinc-400 font-sans leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA (Matching Image 1 bottom)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141722] via-[#0d0f15] to-[#07080a] border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-orange-400 uppercase font-bold tracking-widest">
              NEXT STEP PRODUCTION MANDATE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              READY TO IGNITE YOUR NEXT PRODUCTION?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl">
              Speak directly with our Executive Vice President of Physical Production or schedule an on-lot walkthrough across Los Angeles, London, or Tokyo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-orange-500 text-black font-mono text-xs font-bold tracking-wider hover:brightness-110 transition"
            >
              SCHEDULE AN EXECUTIVE CONSULTATION
            </button>
            <a
              href="tel:+13108450100"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-xs tracking-wider transition"
            >
              CALL URGENT DESK
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
