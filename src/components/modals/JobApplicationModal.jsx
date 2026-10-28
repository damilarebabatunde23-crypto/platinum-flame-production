import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Briefcase, UploadCloud, Shield, Loader2 } from 'lucide-react';
import { submitJobApplication } from '../../services/supabaseService';

export default function JobApplicationModal({ isOpen, onClose, job }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    resumeName: '',
    coverNote: ''
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

  if (!isOpen || !job) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitJobApplication({
        ...formData,
        job
      }, resumeFile);
      setReferenceCode(result.referenceCode);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Job application error:', err);
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
        className="relative w-full max-w-xl bg-[#0b0d14] border border-white/20 rounded-2xl shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0e111a] border-b border-white/15">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <Briefcase className="w-4 h-4 text-orange-400 shrink-0" />
            <div className="truncate">
              <h3 className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
                APPLICATION: {job.title}
              </h3>
              <p className="text-[11px] font-mono text-zinc-400 truncate">
                {job.department} • {job.location}
              </p>
            </div>
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
              Candidacy Transmitted
            </h4>
            <p className="text-sm text-zinc-300 max-w-md mx-auto">
              Your application for <strong className="text-orange-400">{job.title}</strong> has been routed to our Studio Talent Acquisition board.
            </p>
            {referenceCode && (
              <div className="inline-block px-4 py-1.5 bg-zinc-900 border border-orange-500/40 rounded-xl font-mono text-xs text-orange-400 tracking-wider">
                APPLICATION REF: {referenceCode}
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
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">CANDIDATE NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  placeholder="candidate@cinema.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PHONE NUMBER</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PORTFOLIO / SHOWREEL / IMDB</label>
                <input
                  type="url"
                  placeholder="https://artstation.com/ or IMDB link"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/15 hover:border-orange-500/40 cursor-pointer text-center block transition">
                <UploadCloud className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <span className="text-xs font-mono text-zinc-300 block">
                  {formData.resumeName || 'Upload Resume / CV / Guild Card (PDF)'}
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
              <label className="block text-xs font-mono text-zinc-400 mb-1">COVER NOTE / NOTABLE CREDITS</label>
              <textarea
                rows={3}
                placeholder="Detail your most technically demanding feature film achievements..."
                value={formData.coverNote}
                onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
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
                    <span>TRANSMITTING CANDIDACY...</span>
                  </>
                ) : (
                  <span>TRANSMIT APPLICATION DOSSIER</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
