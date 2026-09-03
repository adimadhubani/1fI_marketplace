import React from 'react';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product, onSelect }) {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const discountPercent = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div
      onClick={() => onSelect && onSelect(product.slug)}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/40 shadow-soft hover:shadow-elevated transition-all duration-300 group flex flex-col"
    >
      {/* Image container */}
      <div className="relative h-48 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Brand pill */}
        <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {product.brand}
        </span>

        {/* Discount badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 right-3 bg-accent text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Info container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-base font-bold text-textPrimary group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-textSecondary line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs line-through text-textSecondary">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>

          {/* Starting EMI pill */}
          {product.starting_emi && (
            <div className="mt-2 flex items-center justify-between p-2 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent fill-accent" />
                <span className="text-xs font-semibold text-textSecondary">
                  EMI starts at
                </span>
                <span className="text-xs font-extrabold text-primary">
                  {formatPrice(product.starting_emi)}/mo
                </span>
              </div>
              <span className="text-[10px] font-bold text-gold uppercase">0% Fee</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button className="w-full py-2.5 px-3 rounded-xl bg-primary group-hover:bg-secondary text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm">
          <span>Shop now</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
