import React, { useState } from 'react';
import { Pencil, Check, X, Tag } from 'lucide-react';

export default function PriceSection({ price, mrp, onCustomPriceChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [customValue, setCustomValue] = useState(price);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const discountAmount = mrp > price ? mrp - price : 0;
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handleSave = () => {
    const num = parseInt(customValue, 10);
    if (!isNaN(num) && num > 0) {
      if (onCustomPriceChange) onCustomPriceChange(num);
    }
    setIsEditing(false);
  };

  return (
    <div className="mx-4 my-3 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-textSecondary uppercase tracking-wider">
            SUGGESTED AMOUNT
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
            Best Deal
          </span>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setCustomValue(price);
              setIsEditing(true);
            }
          }}
          className="flex items-center gap-1 text-xs text-textSecondary hover:text-primary transition-colors p-1"
          title="Edit amount"
        >
          {isEditing ? (
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Done
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </span>
          )}
        </button>
      </div>

      <div className="mt-2 flex items-baseline gap-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">₹</span>
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="border-2 border-primary rounded-lg px-2 py-1 text-xl font-extrabold w-36 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-3xl font-extrabold text-primary tracking-tight">
            {formatPrice(price)}
          </div>
        )}

        {mrp && mrp > price && (
          <div className="flex items-center gap-2">
            <span className="text-sm line-through text-textSecondary">
              {formatPrice(mrp)}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {discountPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {discountAmount > 0 && (
        <div className="mt-2 text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
          <Tag className="w-3.5 h-3.5" />
          <span>You save {formatPrice(discountAmount)} with 1Fi Exclusive Member Pricing</span>
        </div>
      )}
    </div>
  );
}
