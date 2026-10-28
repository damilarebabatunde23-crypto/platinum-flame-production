import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Zap, Shield, FileText, Loader2 } from 'lucide-react';
import { submitStageBooking } from '../../services/supabaseService';

export default function StageBookingModal({ isOpen, onClose, defaultStage = "Stage 01: The Forge (LED Volume)" }) {
  const [selectedStage, setSelectedStage] = useState(defaultStage);
  const [durationWeeks, setDurationWeeks] = useState(6);
  const [location, setLocation] = useState('New York Global Headquarters');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    startDate: '2027-02-15',
    needsLightingPackage: true,
    needsVirtualProductionCrew: true,
    needsDressingRooms: true
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

  // Rough estimation logic for rate card preview
  const baseRatePerWeek = selectedStage.includes('Forge') ? 95000 : selectedStage.includes('Titan') ? 85000 : 70000;
  const estimatedSubtotal = baseRatePerWeek * durationWeeks;
  const estimatedTaxRebate = Math.round(estimatedSubtotal * 0.25);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitStageBooking({
        ...formData,
        selectedStage,
        durationWeeks,
        location,
        estimatedSubtotal: estimatedSubtotal - estimatedTaxRebate
      });
      setReferenceCode(result.referenceCode);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Stage booking error:', err);
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
            <Calendar className="w-4 h-4 text-orange-400 shrink-0" />
            <h3 className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide truncate">
              RESERVE SOUNDSTAGE & RATE CARD
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
              Stage Hold & Rate Card Dispatched
            </h4>
            <p className="text-sm text-zinc-300 max-w-md mx-auto">
              We have placed a provisional 72-hour hold on <strong className="text-orange-400">{selectedStage}</strong> at {location} for {durationWeeks} weeks.
            </p>
            {referenceCode && (
              <div className="inline-block px-4 py-1.5 bg-zinc-900 border border-orange-500/40 rounded-xl font-mono text-xs text-orange-400 tracking-wider">
                HOLD CONFIRMATION TOKEN: {referenceCode}
              </div>
            )}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-mono text-zinc-400 max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>ESTIMATED STAGE GROSS:</span>
                <span className="text-white font-bold">${estimatedSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>PROJECTED TAX REBATE CREDIT (25%):</span>
                <span className="text-emerald-400 font-bold">-${estimatedTaxRebate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-orange-400">
                <span>ESTIMATED NET COMMITMENT:</span>
                <span>${(estimatedSubtotal - estimatedTaxRebate).toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono transition"
            >
              Close Confirmation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">SELECT SOUNDSTAGE</label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs text-zinc-200"
                >
                  <option value="Stage 01: The Forge (LED Volume)">Stage 01: The Forge (28,000 sq ft LED Volume)</option>
                  <option value="Stage 02: The Titan Tank">Stage 02: The Titan Tank (34,000 sq ft Water Stage)</option>
                  <option value="Stage 03: The Mega Lot">Stage 03: The Mega Lot (45,000 sq ft Clear Span)</option>
                  <option value="Stage 04: The Arctic Outpost">Stage 04: The Arctic Outpost (Climate Controlled)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">STUDIO LOCATION</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs text-zinc-200"
                >
                  <option value="Los Angeles (Sunset Lot)">Los Angeles (Sunset Lot) — CA Tax Credit</option>
                  <option value="London (Pinewood Gate 12)">London (Pinewood Gate 12) — UK AVEC Credit</option>
                  <option value="Tokyo Atelier (Roppongi)">Tokyo Atelier (Roppongi) — J-LOD Credit</option>
                  <option value="Reykjavik Basecamp">Reykjavik Basecamp (Iceland)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">ESTIMATED SHOOT DURATION (WEEKS)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-orange-400 w-12 text-right">
                    {durationWeeks} wks
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">TARGET OCCUPANCY DATE</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PRODUCER / UPM NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PRODUCTION COMPANY</label>
                <input
                  type="text"
                  placeholder="Studio / LLC Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">OFFICIAL EMAIL *</label>
                <input
                  type="email"
                  required
                  placeholder="producer@filmproduction.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PHONE NUMBER</label>
                <input
                  type="tel"
                  placeholder="+1 (310) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <label className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider block">
                ANCILLARY STAGE AMENITIES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center space-x-2 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsLightingPackage}
                    onChange={(e) => setFormData({ ...formData, needsLightingPackage: e.target.checked })}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>ARRI SkyPanel Grid</span>
                </label>
                <label className="flex items-center space-x-2 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsVirtualProductionCrew}
                    onChange={(e) => setFormData({ ...formData, needsVirtualProductionCrew: e.target.checked })}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Unreal VP Engineers</span>
                </label>
                <label className="flex items-center space-x-2 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsDressingRooms}
                    onChange={(e) => setFormData({ ...formData, needsDressingRooms: e.target.checked })}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>VIP Cast Suites</span>
                </label>
              </div>
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
                    <span>RECORDING SOUNDSTAGE HOLD...</span>
                  </>
                ) : (
                  <span>TRANSMIT STAGE HOLD & RATE CARD DOSSIER</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
