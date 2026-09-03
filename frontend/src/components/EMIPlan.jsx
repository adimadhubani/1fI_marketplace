import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Award, Zap, Percent } from 'lucide-react';

export default function EMIPlan({
  emiPlans = [],
  selectedPlan,
  onSelectPlan,
  basePrice
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Find lowest monthly payment
  const lowestEmi = emiPlans.length > 0
    ? Math.min(...emiPlans.map((p) => p.monthly_payment))
    : null;

  return (
    <div className="mx-4 my-3 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
      {/* Header bar with Starts at ₹... and Hide/Show toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
              EMI Plans
            </span>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              MF Backed
            </span>
          </div>
          {lowestEmi && (
            <div className="text-sm font-extrabold text-primary mt-0.5">
              Starts at <span className="text-accent">{formatPrice(lowestEmi)}</span>
              <span className="text-xs font-normal text-textSecondary">/mo</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors px-2 py-1 rounded-lg hover:bg-accent/5"
        >
          <span>{isExpanded ? 'Hide plans' : 'View plans'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Plans List */}
      {isExpanded && (
        <div className="mt-3 space-y-3">
          {emiPlans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;
            const isRecommended = plan.is_recommended;

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan)}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all relative ${
                  isSelected
                    ? 'border-primary bg-primary/[0.02] ring-2 ring-primary/20 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-gold via-amber-500 to-gold text-primary text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-amber-300">
                    <Award className="w-3 h-3 text-primary" />
                    <span>RECOMMENDED</span>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Radio circle */}
                    <div className="mt-0.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-400 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>

                    <div>
                      {/* Tenure and Interest */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-textPrimary">
                          {plan.tenure_months} months
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs font-semibold text-textSecondary">
                          {plan.interest_rate}% p.a.
                        </span>
                      </div>

                      {/* Monthly payment */}
                      <div className="text-base font-extrabold text-primary mt-1">
                        {formatPrice(plan.monthly_payment)}{' '}
                        <span className="text-xs font-normal text-textSecondary">/mo</span>
                      </div>

                      {/* Benefits / Cashback tag */}
                      {plan.cashback && (
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                          <span>{plan.cashback}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total calculation indicator */}
                  <div className="text-right">
                    <div className="text-[10px] text-textSecondary">Total Amount</div>
                    <div className="text-xs font-semibold text-textPrimary">
                      {formatPrice(plan.monthly_payment * plan.tenure_months)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      Includes 1Fi MF subsidy
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
