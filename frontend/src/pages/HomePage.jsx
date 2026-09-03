import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import LimitCard from '../components/LimitCard';
import ProductCard from '../components/ProductCard';
import BrandPartners from '../components/BrandPartners';
import Why1Fi from '../components/Why1Fi';
import PaymentMethods from '../components/PaymentMethods';
import BottomNav from '../components/BottomNav';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export default function HomePage({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error(data.message || 'Error loading products');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-appBg text-textPrimary pb-24 max-w-md mx-auto relative shadow-2xl border-x border-gray-200">
      {/* 1Fi Header */}
      <Header brand="Marketplace" showBack={false} />

      {/* Credit Limit Available Card */}
      <LimitCard limit={156091} />

      {/* Hero Banner */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-r from-secondary to-primary text-white shadow-soft relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold bg-gold/20 px-2 py-0.5 rounded-full border border-gold/40">
            Exclusive 1Fi Launch
          </span>
          <h2 className="text-xl font-black mt-2 leading-tight">
            Upgrade Today.<br />
            <span className="text-gold">Pay via Mutual Funds.</span>
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-[280px]">
            Keep your investments compounding while enjoying zero-foreclosure smartphone EMIs.
          </p>
        </div>
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-accent/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Featured Smartphones */}
      <div className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-textPrimary">
              Popular Smartphones
            </h2>
            <p className="text-xs text-textSecondary">
              Direct brand warranty & instant 1Fi EMI approval
            </p>
          </div>
          <span className="text-xs font-semibold text-accent flex items-center gap-1">
            3 Models
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl animate-shimmer border border-gray-200"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center space-y-2">
            <p className="text-xs font-semibold">{error}</p>
            <button
              onClick={fetchProducts}
              className="text-xs font-bold text-red-800 underline flex items-center gap-1 mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(slug) => onNavigate(`/products/${slug}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Brand Partners */}
      <BrandPartners />

      {/* Why Pay with 1Fi */}
      <Why1Fi />

      {/* Auto-pay payment methods */}
      <PaymentMethods />

      {/* Bottom Navigation */}
      <BottomNav
        activeTab="Shop"
        onTabChange={(tab, path) => {
          if (path) onNavigate(path);
        }}
      />
    </div>
  );
}
