import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export default function BrandPartners() {
  const partners = [
    { name: 'Apple', logo: ' Apple', type: 'Official Partner', color: 'bg-black text-white' },
    { name: 'Samsung', logo: 'SAMSUNG', type: 'Direct Tie-up', color: 'bg-blue-900 text-white' },
    { name: 'OnePlus', logo: '1+ ONEPLUS', type: 'Direct Tie-up', color: 'bg-red-700 text-white' },
    { name: 'Reliance Digital', logo: 'Reliance digital', type: 'Retail Network', color: 'bg-red-600 text-white' },
    { name: 'Croma', logo: 'croma', type: 'Retail Network', color: 'bg-teal-700 text-white' },
    { name: 'Vijay Sales', logo: 'VIJAY SALES', type: 'Retail Network', color: 'bg-amber-700 text-white' },
  ];

  return (
    <div className="mx-4 my-4 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-gold" />
          <h3 className="text-xs font-bold text-textPrimary uppercase tracking-wider">
            OUR BRAND PARTNERS
          </h3>
        </div>
        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
          100% Genuine Warranty
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-gray-100 bg-lightGray hover:border-gray-300 transition-all text-center"
          >
            <span className="text-xs font-black tracking-tight text-primary">
              {partner.logo}
            </span>
            <span className="text-[9px] text-textSecondary mt-0.5 font-medium">
              {partner.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
