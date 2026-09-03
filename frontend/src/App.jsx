import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Smartphone, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Extract slug from /products/:slug
  const productMatch = currentPath.match(/^\/products\/([a-zA-Z0-9_-]+)/);
  const currentSlug = productMatch ? productMatch[1] : null;

  return (
    <div className="min-h-screen bg-neutral-900 text-textPrimary flex flex-col items-center">
      {/* Top Desktop Navigation & Quick Evaluator Switcher */}
      <div className="w-full bg-primary border-b border-white/10 px-4 py-2.5 text-white">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-gradient-to-tr from-accent to-gold text-primary font-black flex items-center justify-center text-xs">
              1Fi
            </span>
            <span className="font-bold tracking-wide">1Fi Marketplace Assignment</span>
            <span className="hidden sm:inline-block text-[10px] bg-white/10 text-gold px-2 py-0.5 rounded-full">
              Full-Stack Demo
            </span>
          </div>

          {/* Quick Route Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => navigate('/')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                currentPath === '/'
                  ? 'bg-gold text-primary font-bold shadow-sm'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All Products (Home)
            </button>
            <button
              onClick={() => navigate('/products/iphone-17-pro')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                currentSlug === 'iphone-17-pro'
                  ? 'bg-gold text-primary font-bold shadow-sm'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              iPhone 17 Pro
            </button>
            <button
              onClick={() => navigate('/products/samsung-s24-ultra')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                currentSlug === 'samsung-s24-ultra'
                  ? 'bg-gold text-primary font-bold shadow-sm'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Samsung S24 Ultra
            </button>
            <button
              onClick={() => navigate('/products/oneplus-13')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                currentSlug === 'oneplus-13'
                  ? 'bg-gold text-primary font-bold shadow-sm'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              OnePlus 13
            </button>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <main className="w-full flex-1 flex justify-center py-0 sm:py-6">
        <div className="w-full max-w-md bg-appBg sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-300 sm:border-gray-800">
          {currentSlug ? (
            <ProductPage slug={currentSlug} onNavigate={navigate} />
          ) : (
            <HomePage onNavigate={navigate} />
          )}
        </div>
      </main>
    </div>
  );
}
