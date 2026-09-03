import React from 'react';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

export default function LimitCard({ limit = 156091 }) {
  const formattedLimit = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(limit);

  return (
    <div className="mx-4 mt-3 space-y-2">
      {/* 0% Interest Top Banner */}
      <div className="bg-gradient-to-r from-accent via-rose-600 to-accent text-white px-3 py-1.5 rounded-t-xl text-xs font-semibold flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>0% INTEREST EMI AVAILABLE</span>
        </div>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
          Limited Time
        </span>
      </div>

      {/* Limit Available Card */}
      <div className="bg-gradient-to-br from-secondary via-primary to-secondary text-white p-4 rounded-b-xl rounded-t-none shadow-soft border border-white/5 relative overflow-hidden -mt-2">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium tracking-wide">
              <span>LIMIT AVAILABLE</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-2xl font-extrabold text-white mt-0.5 tracking-tight flex items-baseline gap-1">
              <span>{formattedLimit}</span>
            </div>
            <p className="text-[11px] text-gray-300 mt-0.5 font-medium tracking-wider">
              REMAINING TO SPEND
            </p>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 bg-gold/20 text-gold text-[10px] font-semibold px-2.5 py-1 rounded-full border border-gold/40">
              <TrendingUp className="w-3 h-3" />
              <span>MF Growth: +14.2%</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Backed by Portfolio</p>
          </div>
        </div>

        {/* Limit Bar indicator */}
        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Instant Pre-approval with your Mutual Funds</span>
          </div>
          <span className="text-gold font-semibold hover:underline cursor-pointer">
            Manage &gt;
          </span>
        </div>
      </div>
    </div>
  );
}
