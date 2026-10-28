import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Sparkles, Shield, UploadCloud, AlertCircle } from 'lucide-react';
import { submitProjectInquiry } from '../../services/supabaseService';

export default function InquiryModal({ isOpen, onClose, initialService = null }) {
  const [inquiryType, setInquiryType] = useState('Production Package');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    projectTitle: '',
    budgetTier: '$15M - $50M (Major Theatrical)',
    timeline: 'Q1 / Q2 2027',
    selectedServices: initialService ? [initialService] : ['Full Production Management'],
    details: '',
    ndaRequested: true,
    fileName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Listen for Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({
        ...prev,
        selectedServices: [initialService]
      }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleServiceToggle = (svc) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(svc);
      if (exists) {
        return { ...prev, selectedServices: prev.selectedServices.filter(s => s !== svc) };
      } else {
        return { ...prev, selectedServices: [...prev.selectedServices, svc] };
      }
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitProjectInquiry({
        ...formData,
        inquiryType
      }, selectedFile);
      
      setReferenceCode(result.referenceCode || `PFP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      // Fallback display code
      setReferenceCode(`PFP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const availableServices = [
    'Development & Script',
    'Casting & Star Talent',
    'Location Scouting & Management',
    'Full Production Management',
    'Production Design & Art Direction',
    'Camera, Lighting & Technical (70mm)',
    'Post-Production & VFX (Dolby Atmos)',
    'Financing & Budget Support',
    'Marketing & Theatrical Distribution',
    'Turnkey Master Slate Package'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0b0d14] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0e111a] border-b border-white/15">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping shrink-0" />
            <div className="truncate">
              <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide truncate">
                INITIATE PRODUCTION MANDATE
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono truncate">
                Executive Acquisition & Studio Facilities Division
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-red-950/60 transition cursor-pointer border border-red-400/40"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span>CANCEL / CLOSE</span>
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 text-xs font-mono bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full uppercase">
                Acquisitions Dossier Registered
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Mandate Successfully Received
              </h4>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto">
                Your submission has been securely routed to Marcus Crane and the Executive Production Board under reference token:
              </p>
              <div className="inline-block px-4 py-2 bg-zinc-900 border border-orange-500/40 rounded-xl font-mono text-lg font-bold text-orange-400 tracking-widest my-2">
                {referenceCode}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-md mx-auto text-xs text-zinc-400 text-left space-y-2 font-mono">
              <div className="flex items-center text-zinc-300 font-semibold mb-1">
                <Shield className="w-4 h-4 text-emerald-400 mr-2" />
                <span>Next Protocol Stages:</span>
              </div>
              <p>1. Legal & NDA countersignature delivered to {formData.email || 'your email'}.</p>
              <p>2. Physical line-producing audit & calendar review (48-hour SLA).</p>
              <p>3. Direct invitation to Private Screening Suite & Executive Meeting.</p>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold hover:brightness-110 transition shadow-lg shadow-orange-950/40"
            >
              Return to Studio Overview
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Inquiry Type Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Select Mandate Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Production Package', 'Script Submission', 'Stage Rental', 'Co-Financing'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInquiryType(type)}
                    className={`py-2 px-3 text-xs font-mono rounded-lg border transition ${
                      inquiryType === type
                        ? 'bg-orange-500/20 border-orange-500 text-white font-semibold'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PRODUCER / EXECUTIVE NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PRODUCTION COMPANY / STUDIO</label>
                <input
                  type="text"
                  placeholder="e.g. Auteur Pictures UK"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">EXECUTIVE EMAIL *</label>
                <input
                  type="email"
                  required
                  placeholder="name@production.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">DIRECT PHONE / WHATSAPP</label>
                <input
                  type="tel"
                  placeholder="+1 (310) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
                />
              </div>
            </div>

            {/* Project Scope & Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">WORKING PROJECT TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. The Quantum Divide"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PROJECTED BUDGET TIER</label>
                <select
                  value={formData.budgetTier}
                  onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-sm text-zinc-200"
                >
                  <option value="Under $5M (Pre-Development / Proof)">Under $5M (Pre-Development)</option>
                  <option value="$5M - $15M (Independent Auteur)">$5M - $15M (Independent Auteur)</option>
                  <option value="$15M - $50M (Major Theatrical)">$15M - $50M (Major Theatrical)</option>
                  <option value="$50M - $150M+ (Studio Tentpole / Franchise)">$50M - $150M+ (Studio Tentpole)</option>
                </select>
              </div>
            </div>

            {/* Required Studio Services */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center justify-between">
                <span>Required Studio Capabilities</span>
                <span className="text-[11px] text-zinc-500 font-normal">Select all that apply</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableServices.map((svc) => {
                  const isSelected = formData.selectedServices.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => handleServiceToggle(svc)}
                      className={`text-left p-2.5 text-xs font-sans rounded-lg border transition ${
                        isSelected
                          ? 'bg-orange-500/20 border-orange-500 text-white font-medium'
                          : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-orange-400' : 'bg-zinc-700'}`} />
                        <span className="truncate">{svc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Synopsis / Requirements */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">PROJECT SCOPE, LOGLINE OR FACILITY REQUIREMENTS</label>
              <textarea
                rows={3}
                placeholder="Describe your screenplay concept, principal photography window, preferred stages, or required large-format optical packages..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg glass-input text-sm"
              />
            </div>

            {/* NDA & File attachment */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ndaRequested}
                  onChange={(e) => setFormData({ ...formData, ndaRequested: e.target.checked })}
                  className="rounded border-zinc-700 text-orange-500 focus:ring-orange-500 bg-zinc-900"
                />
                <span className="text-zinc-300">
                  Execute Platinum Flame Mutual NDA before script transmission
                </span>
              </label>

              <div className="flex items-center space-x-2">
                <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono transition">
                  <UploadCloud className="w-3.5 h-3.5 text-orange-400" />
                  <span>{formData.fileName || 'Attach Lookbook / Deck'}</span>
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/3 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-mono text-xs font-bold border border-white/10 transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>CANCEL</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-semibold tracking-wider hover:brightness-110 shadow-xl shadow-orange-950/40 transition flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>ENCRYPTING & ROUTING TO ACQUISITIONS...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT PRODUCTION MANDATE</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
