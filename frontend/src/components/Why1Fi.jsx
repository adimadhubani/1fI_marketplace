import React from 'react';
import { Percent, TrendingUp, Zap, CheckCircle } from 'lucide-react';

export default function Why1Fi() {
  const benefits = [
    {
      icon: Percent,
      title: '0% Interest EMI',
      subtitle: 'No hidden interest fees with 1Fi partner brand subsidies.',
      tag: 'Zero Extra Cost',
      accentColor: 'text-accent bg-accent/10',
    },
    {
      icon: TrendingUp,
      title: 'Keep Growing',
      subtitle: 'Never liquidate your mutual funds. Your wealth keeps compounding in market while you pay low monthly EMIs.',
      tag: 'Compounding Intact',
      accentColor: 'text-gold bg-gold/10',
    },
    {
      icon: Zap,
      title: 'Quickest Approvals',
      subtitle: '30-second seamless paperless approval verified against your verified MF holdings.',
      tag: 'Instant Digital',
      accentColor: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <div className="mx-4 my-4 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-textPrimary uppercase tracking-wider">
          WHY PAY WITH 1Fi
        </h3>
        <span className="text-[10px] text-gray-500 font-medium">Smart Finance</span>
      </div>

      <div className="space-y-3">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-lightGray/50 hover:bg-lightGray transition-all"
            >
              <div className={`p-2 rounded-xl shrink-0 ${benefit.accentColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-textPrimary">{benefit.title}</h4>
                  <span className="text-[9px] font-semibold text-textSecondary bg-white px-2 py-0.5 rounded border border-gray-200">
                    {benefit.tag}
                  </span>
                </div>
                <p className="text-[11px] text-textSecondary mt-1 leading-relaxed">
                  {benefit.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
