import React from 'react';
import { Store, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PayingTo({
  merchantName = "Imagine Store - Apple & Premium Tech Reseller",
  merchantAddress = "Shop 14, 100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038",
  onContinue,
  selectedPlan,
  disabled = false
}) {
  return (
    <div className="mx-4 my-4 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
      <div className="text-[11px] font-bold text-textSecondary uppercase tracking-wider mb-2">
        PAYING TO:
      </div>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
          <Store className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-textPrimary leading-tight">
              {merchantName}
            </h4>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-1.5 py-0.2 rounded shrink-0">
              Verified
            </span>
          </div>

          <p className="text-xs text-textSecondary mt-1 flex items-start gap-1 leading-relaxed">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400 mt-0.5" />
            <span>{merchantAddress}</span>
          </p>
        </div>
      </div>

      {/* Trust Guarantee Note */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Direct merchant settlement via 1Fi Capital & Portfolio Escrow</span>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={disabled}
        className={`w-full mt-4 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-95 text-white active:scale-[0.99] shadow-primary/20'
        }`}
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
