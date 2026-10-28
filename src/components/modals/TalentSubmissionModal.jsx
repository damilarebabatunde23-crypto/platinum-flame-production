import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, User, UploadCloud, Video, Shield, Award, Loader2 } from 'lucide-react';
import { submitTalentSubmission } from '../../services/supabaseService';

export default function TalentSubmissionModal({ isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [headshotFile, setHeadshotFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    talentName: '',
    agency: '',
    agentContact: '',
    email: '',
    phone: '',
    guildStatus: 'SAG-AFTRA Eligible',
    primaryCategory: 'Lead Dramatic Actor',
    reelUrl: '',
    headshotName: '',
    resumeName: '',
    bioNotes: ''
  });

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

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitTalentSubmission(formData, headshotFile, resumeFile);
      setReferenceCode(result.referenceCode);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Talent submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0b0d14] border border-white/20 rounded-2xl shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0e111a] border-b border-white/15">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <User className="w-4 h-4 text-orange-400 shrink-0" />
            <h3 className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide truncate">
              TALENT & CASTING SUBMISSION PORTAL
            </h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-md transition cursor-pointer border border-red-400/40"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span>CANCEL / CLOSE</span>
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-white">
              Casting Profile Registered
            </h4>
            <p className="text-sm text-zinc-300 max-w-md mx-auto">
              Your profile and showreel have been indexed into Platinum Flame's proprietary talent database for active 2026/2027 slate auditions.
            </p>
            {referenceCode && (
              <div className="inline-block px-4 py-1.5 bg-zinc-900 border border-orange-500/40 rounded-xl font-mono text-xs text-orange-400 tracking-wider">
                AUDITION ID: {referenceCode}
              </div>
            )}
            <div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono transition"
              >
                Return to Talent Hub
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PERFORMER FULL NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juliette Moreau"
                  value={formData.talentName}
                  onChange={(e) => setFormData({ ...formData, talentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">GUILD AFFILIATION</label>
                <select
                  value={formData.guildStatus}
                  onChange={(e) => setFormData({ ...formData, guildStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs text-zinc-200"
                >
                  <option value="SAG-AFTRA Full Member">SAG-AFTRA Full Member</option>
                  <option value="SAG-AFTRA Eligible">SAG-AFTRA Eligible</option>
                  <option value="UK Equity">UK Equity</option>
                  <option value="ACTRA (Canada)">ACTRA (Canada)</option>
                  <option value="Non-Union / International">Non-Union / International</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">TALENT AGENCY / MANAGEMENT</label>
                <input
                  type="text"
                  placeholder="e.g. CAA / WME / Independent"
                  value={formData.agency}
                  onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PRIMARY CATEGORY</label>
                <select
                  value={formData.primaryCategory}
                  onChange={(e) => setFormData({ ...formData, primaryCategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs text-zinc-200"
                >
                  <option value="Lead Dramatic Actor">Lead Dramatic Actor</option>
                  <option value="Lead Dramatic Actress">Lead Dramatic Actress</option>
                  <option value="Supporting Character Actor">Supporting Character Actor</option>
                  <option value="Stunt Coordinator & Specialist">Stunt Coordinator & Specialist</option>
                  <option value="Voice & Motion Capture Artist">Voice & Motion Capture Artist</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">REPRESENTATIVE EMAIL *</label>
                <input
                  type="email"
                  required
                  placeholder="agent@agency.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">SHOWREEL LINK (VIMEO / YOUTUBE)</label>
                <input
                  type="url"
                  placeholder="https://vimeo.com/showreel"
                  value={formData.reelUrl}
                  onChange={(e) => setFormData({ ...formData, reelUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/15 hover:border-orange-500/40 cursor-pointer text-center block transition">
                <UploadCloud className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <span className="text-xs font-mono text-zinc-300 block">
                  {formData.headshotName || 'Upload 8x10 Headshot (JPG/PNG)'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setHeadshotFile(f);
                      setFormData(prev => ({ ...prev, headshotName: f.name }));
                    }
                  }}
                />
              </label>

              <label className="p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/15 hover:border-orange-500/40 cursor-pointer text-center block transition">
                <UploadCloud className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-xs font-mono text-zinc-300 block">
                  {formData.resumeName || 'Upload Actor Resume / CV (PDF)'}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setResumeFile(f);
                      setFormData(prev => ({ ...prev, resumeName: f.name }));
                    }
                  }}
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">KEY ACCREDITATIONS & NOTABLE CREDITS</label>
              <textarea
                rows={2}
                placeholder="List recent feature/television credits, dialect training, or martial arts specialties..."
                value={formData.bioNotes}
                onChange={(e) => setFormData({ ...formData, bioNotes: e.target.value })}
                className="w-full px-3 py-2 rounded-lg glass-input text-xs"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/3 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs font-mono tracking-wider border border-white/10 transition flex items-center justify-center space-x-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>CANCEL</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>TRANSMITTING CASTING PROFILE...</span>
                  </>
                ) : (
                  <span>SUBMIT TO CASTING DIRECTORS</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
