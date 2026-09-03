import React from 'react';
import { ArrowLeft, Share2, ShieldCheck } from 'lucide-react';

export default function Header({ brand, showBack = false, onBack }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '1Fi Marketplace',
        text: 'Check out mutual fund backed smartphone EMI plans on 1Fi!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-primary text-white px-4 py-3 shadow-md">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={onBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center font-bold text-xs text-gold">
              1Fi
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-normal text-gray-300">Pay using</span>
              <span className="text-xs font-bold tracking-wider text-gold">1Fi</span>
              {brand && (
                <>
                  <span className="text-gray-400 text-xs">|</span>
                  <span className="text-xs font-semibold text-white px-2 py-0.5 rounded-full bg-secondary/80 border border-white/10">
                    {brand}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Security badge & Share */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            <span>MF Backed</span>
          </div>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-gray-300 hover:text-white"
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
