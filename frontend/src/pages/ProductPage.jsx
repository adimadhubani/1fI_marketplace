import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import LimitCard from '../components/LimitCard';
import VariantSelector from '../components/VariantSelector';
import PriceSection from '../components/PriceSection';
import EMIPlan from '../components/EMIPlan';
import PayingTo from '../components/PayingTo';
import BrandPartners from '../components/BrandPartners';
import Why1Fi from '../components/Why1Fi';
import PaymentMethods from '../components/PaymentMethods';
import BottomNav from '../components/BottomNav';
import CheckoutModal from '../components/CheckoutModal';
import { ArrowLeft, Sparkles, Shield, ChevronRight, AlertCircle } from 'lucide-react';

export default function ProductPage({ slug, onNavigate }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected states
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customPrice, setCustomPrice] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${slug}`);
        if (!res.ok) {
          throw new Error(`Product '${slug}' not found`);
        }
        const data = await res.json();
        if (data.success && data.data) {
          const prod = data.data;
          setProduct(prod);

          // Default selection for storage (first storage option)
          if (prod.variants?.storage?.length > 0) {
            setSelectedStorage(prod.variants.storage[0]);
          }
          // Default selection for color (first color option)
          if (prod.variants?.color?.length > 0) {
            setSelectedColor(prod.variants.color[0]);
          }
          // Default selection for EMI plan (recommended plan or first plan)
          if (prod.emi_plans?.length > 0) {
            const recommended = prod.emi_plans.find((p) => p.is_recommended) || prod.emi_plans[0];
            setSelectedPlan(recommended);
          }
        } else {
          throw new Error(data.message || 'Failed to load product');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Current active price: either custom entered price, or selected storage variant price, or base product price
  const activePrice = customPrice !== null
    ? customPrice
    : (selectedStorage?.price || product?.price || 0);

  // Calculate dynamic monthly payment if storage variant changes price
  const activeEmiPlans = (product?.emi_plans || []).map((plan) => {
    if (!product || !product.price) return plan;
    // Calculate proportional payment if price changed with variant
    const priceRatio = activePrice / product.price;
    const dynamicPayment = Math.round(plan.monthly_payment * priceRatio);
    return {
      ...plan,
      monthly_payment: dynamicPayment
    };
  });

  // Keep selectedPlan updated with dynamic payment
  const currentSelectedPlan = selectedPlan
    ? activeEmiPlans.find((p) => p.id === selectedPlan.id) || selectedPlan
    : activeEmiPlans[0] || null;

  if (loading) {
    return (
      <div className="min-h-screen bg-appBg max-w-md mx-auto relative shadow-2xl border-x border-gray-200">
        <Header brand="Loading..." showBack={true} onBack={() => onNavigate('/')} />
        <div className="p-4 space-y-4">
          <div className="h-40 rounded-xl animate-shimmer" />
          <div className="h-64 rounded-2xl animate-shimmer" />
          <div className="h-20 rounded-xl animate-shimmer" />
          <div className="h-32 rounded-xl animate-shimmer" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-appBg max-w-md mx-auto relative shadow-2xl border-x border-gray-200 flex flex-col justify-center items-center p-6 text-center">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-primary">Product Not Found</h2>
        <p className="text-xs text-textSecondary mt-1 max-w-xs">{error || 'Could not locate this smartphone in our catalogue.'}</p>
        <button
          onClick={() => onNavigate('/')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-appBg text-textPrimary pb-28 max-w-md mx-auto relative shadow-2xl border-x border-gray-200">
      {/* 1. Header: "Pay using 1Fi" + Brand Name */}
      <Header
        brand={product.brand}
        showBack={true}
        onBack={() => onNavigate('/')}
      />

      {/* 2. Top Banner: 0% Interest & Limit Available Card */}
      <LimitCard limit={156091} />

      {/* Quick Navigation Breadcrumb / Product Switcher */}
      <div className="mx-4 mt-3 flex items-center gap-1 text-[11px] text-textSecondary overflow-x-auto no-scrollbar">
        <button onClick={() => onNavigate('/')} className="hover:text-primary underline shrink-0">
          Marketplace
        </button>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <span className="font-semibold text-textPrimary shrink-0">{product.name}</span>
      </div>

      {/* 3. Product Image Section: Full-width, clean, centered */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-6 shadow-soft border border-gray-100 flex flex-col items-center relative overflow-hidden">
        <div className="w-full h-64 flex items-center justify-center relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Selected color pill on image */}
        {selectedColor && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lightGray text-[11px] font-semibold text-textSecondary border border-gray-200">
            <span>Color:</span>
            <span className="text-textPrimary font-bold">{selectedColor.value}</span>
          </div>
        )}
      </div>

      {/* 4. Product Info & Name */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-soft border border-gray-100">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {product.brand} Flagship
            </span>
            <h1 className="text-2xl font-bold text-textPrimary mt-0.5 tracking-tight">
              {product.name}
            </h1>
          </div>
          <div className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            In Stock
          </div>
        </div>

        <p className="text-xs text-textSecondary mt-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* 5. SELECT YOUR VARIANT Section */}
      <div className="mx-4 mt-3 bg-white rounded-2xl shadow-soft border border-gray-100">
        <VariantSelector
          storageVariants={product.variants?.storage || []}
          colorVariants={product.variants?.color || []}
          selectedStorage={selectedStorage}
          onSelectStorage={(storage) => {
            setSelectedStorage(storage);
            setCustomPrice(null); // reset manual override when picking variant
          }}
          selectedColor={selectedColor}
          onSelectColor={(color) => setSelectedColor(color)}
        />
      </div>

      {/* 6. SUGGESTED AMOUNT & Price Section */}
      <PriceSection
        price={activePrice}
        mrp={product.mrp}
        onCustomPriceChange={(newPrice) => setCustomPrice(newPrice)}
      />

      {/* 7. EMI Plans Section */}
      <EMIPlan
        emiPlans={activeEmiPlans}
        selectedPlan={currentSelectedPlan}
        onSelectPlan={(plan) => setSelectedPlan(plan)}
        basePrice={activePrice}
      />

      {/* 8. PAYING TO: Section */}
      <PayingTo
        merchantName={
          product.brand === 'Apple'
            ? 'Imagine Store - Apple Authorised Reseller'
            : product.brand === 'Samsung'
              ? 'Samsung Smart Plaza - Official Store'
              : 'OnePlus Experience Store'
        }
        merchantAddress="Shop 14, 100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038"
        selectedPlan={currentSelectedPlan}
        onContinue={() => setIsCheckoutOpen(true)}
      />

      {/* 9. Don't Miss A Payment UPI / Auto-pay Section */}
      <PaymentMethods />

      {/* 10. OUR BRAND PARTNERS */}
      <BrandPartners />

      {/* 11. WHY PAY WITH 1Fi */}
      <Why1Fi />

      {/* Bottom Navigation (Fixed) */}
      <BottomNav
        activeTab="Shop"
        onTabChange={(tab, path) => {
          if (path) onNavigate(path);
        }}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
        selectedStorage={selectedStorage}
        selectedColor={selectedColor}
        selectedPlan={currentSelectedPlan}
        finalPrice={activePrice}
      />
    </div>
  );
}
