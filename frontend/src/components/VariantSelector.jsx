import React from 'react';
import { Check } from 'lucide-react';

export default function VariantSelector({
  storageVariants = [],
  colorVariants = [],
  selectedStorage,
  onSelectStorage,
  selectedColor,
  onSelectColor
}) {
  const formatPrice = (amount) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Color mapping helper for visual circles
  const getColorHex = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('silver') || lower.includes('natural')) return '#d1d5db';
    if (lower.includes('black') || lower.includes('onyx') || lower.includes('space')) return '#18181b';
    if (lower.includes('gold') || lower.includes('desert')) return '#d4af37';
    if (lower.includes('cream') || lower.includes('yellow')) return '#fef08a';
    if (lower.includes('violet') || lower.includes('purple')) return '#7c3aed';
    if (lower.includes('emerald') || lower.includes('green')) return '#059669';
    return '#64748b';
  };

  return (
    <div className="space-y-4 px-4 py-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-wider text-textPrimary uppercase">
          SELECT YOUR VARIANT
        </h3>
        <span className="text-[11px] text-textSecondary">
          {selectedStorage ? selectedStorage.value : ''} {selectedColor ? `· ${selectedColor.value}` : ''}
        </span>
      </div>

      {/* Storage Variants */}
      <div>
        <label className="text-[11px] font-semibold text-textSecondary uppercase tracking-wider block mb-2">
          Storage Option
        </label>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {storageVariants.map((variant) => {
            const isSelected = selectedStorage?.id === variant.id;
            return (
              <button
                key={variant.id}
                onClick={() => onSelectStorage(variant)}
                className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
                <div className="text-xs font-semibold text-textPrimary">
                  {variant.display_name || variant.value}
                </div>
                <div className="text-xs font-bold text-primary mt-1">
                  {formatPrice(variant.price)}
                </div>
                <div className="text-[10px] text-textSecondary mt-0.5">
                  Available in Stock
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Variants */}
      <div>
        <label className="text-[11px] font-semibold text-textSecondary uppercase tracking-wider block mb-2">
          Color Finish
        </label>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {colorVariants.map((variant) => {
            const isSelected = selectedColor?.id === variant.id;
            const colorHex = getColorHex(variant.value);

            return (
              <button
                key={variant.id}
                onClick={() => onSelectColor(variant)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Swatch circle */}
                <span
                  className="w-5 h-5 rounded-full border border-black/20 shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: colorHex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 ${
                        ['cream', 'yellow', 'silver', 'white'].some((c) =>
                          variant.value.toLowerCase().includes(c)
                        )
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    />
                  )}
                </span>
                <div>
                  <span className="text-xs font-medium text-textPrimary block">
                    {variant.value}
                  </span>
                  {variant.display_name && variant.display_name !== variant.value && (
                    <span className="text-[10px] text-textSecondary block">
                      {variant.display_name}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
