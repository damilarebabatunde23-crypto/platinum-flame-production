import React, { useState, useEffect } from 'react';
import { X, Lock, KeyRound, ShieldAlert, CheckCircle, ArrowRight, Eye, Film, Loader2 } from 'lucide-react';
import { verifyClientPortalAccess } from '../../services/supabaseService';

export default function ClientPortalModal({ isOpen, onClose }) {
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientTier, setClientTier] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError(true);
      setErrorMessage('Please enter your studio access token.');
      return;
    }

    setIsValidating(true);
    setError(false);

    try {
      const result = await verifyClientPortalAccess(accessCode);
      if (result.valid) {
        setIsAuthenticated(true);
        setClientTier(result.tier || 'Executive Producer / Distributor');
      } else {
        setError(true);
        setErrorMessage(result.error || 'Invalid or expired studio security code.');
      }
    } catch (err) {
      console.error('Portal auth error:', err);
      setError(true);
      setErrorMessage('Verification failed. Use demo access code below.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleDemoAccess = () => {
    setAccessCode('VIP-AUTEUR-2026');
    setClientTier('VIP Executive Screening Access');
    setIsAuthenticated(true);
    setError(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0b0d14] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0e111a] border-b border-white/15">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <Lock className="w-4 h-4 text-orange-400 shrink-0" />
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-200 font-semibold truncate">
              CLIENT PORTAL
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

        {isAuthenticated ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <div className="text-xs font-mono">
                <div className="font-bold">STUDIO CREDENTIALS AUTHENTICATED</div>
                <div className="text-emerald-300/80">Active Session: Executive Production Portal</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Available Production Feeds & Dailies
              </h4>
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/30 transition flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <Film className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="text-sm font-sans font-medium text-white group-hover:text-orange-400 transition">
                        The Obsidian Crown — Dailies (Day 34)
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        Camera Unit A & B • 4K ACES Rec.709 Proxies
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                    STREAM
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/30 transition flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-sm font-sans font-medium text-white group-hover:text-amber-400 transition">
                        Production Ledger & Cost-to-Complete
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        Movie Magic Live Ledger • Verified by Film Finances
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                    VIEW
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/30 transition flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-sm font-sans font-medium text-white group-hover:text-cyan-400 transition">
                        Soundstage 01 (LED Volume) Live Camera Feed
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        Los Angeles Sunset Lot • 3 Units Active
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-mono bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded animate-pulse">
                    LIVE
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono transition"
            >
              Sign Out of Secure Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto text-orange-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif font-bold text-white">
                Institutional Studio Access
              </h4>
              <p className="text-xs text-zinc-400 font-sans">
                Enter your encrypted VIP Passcode or production token to review live dailies, budgets, and soundstage schedules.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMessage || 'Please enter a valid studio passkey or click Demo Access below.'}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                STUDIO PRODUCTION TOKEN / 2FA KEY
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg glass-input text-sm tracking-widest font-mono"
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
                disabled={isValidating}
                className="w-full sm:w-2/3 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:brightness-110 shadow-lg shadow-orange-950/40 transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>VALIDATING STUDIO TOKEN...</span>
                  </>
                ) : (
                  <span>AUTHENTICATE</span>
                )}
              </button>
            </div>

            <div className="pt-2 text-center border-t border-white/5">
              <button
                type="button"
                onClick={handleDemoAccess}
                className="text-xs font-mono text-orange-400 hover:text-orange-300 underline underline-offset-4"
              >
                Access with VIP Executive Demo Token
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
