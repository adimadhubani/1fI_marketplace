import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  selectedStorage,
  selectedColor,
  selectedPlan,
  finalPrice
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-lightGray">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary text-gold flex items-center justify-center font-bold text-xs">
              1Fi
            </div>
            <h3 className="text-sm font-bold text-textPrimary">
              {isSuccess ? 'Order Confirmed!' : 'EMI Plan Summary'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-extrabold text-primary">Congratulations!</h4>
              <p className="text-xs text-textSecondary max-w-xs mx-auto">
                Your EMI plan for <span className="font-bold text-primary">{product.name}</span> has been approved with 1Fi Mutual Fund backing.
              </p>

              <div className="p-4 bg-lightGray rounded-2xl text-left border border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-textSecondary">
                  <span>Monthly EMI:</span>
                  <span className="font-bold text-primary">{formatPrice(selectedPlan.monthly_payment)}/mo</span>
                </div>
                <div className="flex justify-between text-textSecondary">
                  <span>Tenure:</span>
                  <span className="font-bold text-primary">{selectedPlan.tenure_months} Months</span>
                </div>
                <div className="flex justify-between text-textSecondary">
                  <span>First EMI Due:</span>
                  <span className="font-bold text-emerald-600">30 days from delivery</span>
                </div>
                <div className="flex justify-between text-textSecondary">
                  <span>Mutual Fund Portfolio Status:</span>
                  <span className="font-bold text-primary">Active & Compounding</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full mt-4 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-secondary transition-all"
              >
                Back to Marketplace
              </button>
            </div>
          ) : (
            <>
              {/* Product mini card */}
              <div className="flex items-center gap-3 p-3 bg-lightGray rounded-xl border border-gray-100">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-primary">{product.name}</h4>
                  <p className="text-[11px] text-textSecondary">
                    {selectedStorage?.value || '256GB'} · {selectedColor?.value || 'Default'}
                  </p>
                  <p className="text-xs font-extrabold text-primary mt-0.5">
                    {formatPrice(finalPrice)}
                  </p>
                </div>
              </div>

              {/* Selected Plan Details */}
              <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/[0.02] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-textSecondary">Tenure Selected:</span>
                  <span className="font-bold text-textPrimary">{selectedPlan?.tenure_months} Months</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-textSecondary">Interest Rate:</span>
                  <span className="font-bold text-emerald-600">{selectedPlan?.interest_rate}% p.a.</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-textSecondary">Monthly Installment:</span>
                  <span className="text-base font-extrabold text-primary">
                    {formatPrice(selectedPlan?.monthly_payment)} /mo
                  </span>
                </div>
                {selectedPlan?.cashback && (
                  <div className="pt-2 border-t border-gray-200 text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedPlan.cashback} applied!</span>
                  </div>
                )}
              </div>

              {/* MF benefit pill */}
              <div className="flex items-center gap-2 p-2.5 bg-gold/10 text-primary rounded-xl border border-gold/30 text-xs">
                <TrendingUp className="w-4 h-4 text-gold shrink-0" />
                <span className="text-[11px] font-medium">
                  Your mutual fund units remain invested & growing while 1Fi finances your device.
                </span>
              </div>

              {/* Merchant acknowledgment */}
              <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Authorized Apple/Brand reseller fulfillment with 1-year warranty.</span>
              </div>

              {/* Confirm CTA */}
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary via-secondary to-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all"
              >
                {isProcessing ? (
                  <span>Securing your EMI...</span>
                ) : (
                  <>
                    <span>Confirm & Pay via 1Fi</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
