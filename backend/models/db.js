const { Pool } = require('pg');
require('dotenv').config();

// Define in-memory mock data matching seed.sql for seamless fallback when DATABASE_URL is not yet connected
const fallbackData = {
  products: [
    {
      id: 1,
      name: 'iPhone 17 Pro',
      slug: 'iphone-17-pro',
      brand: 'Apple',
      mrp: 159900,
      price: 125900,
      image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      description: 'Titanium design with Ceramic Shield front. Powered by the next-gen Apple Silicon chip with advanced Pro camera system and Action button.'
    },
    {
      id: 2,
      name: 'Samsung S24 Ultra',
      slug: 'samsung-s24-ultra',
      brand: 'Samsung',
      mrp: 129999,
      price: 109999,
      image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      description: 'Galaxy AI is here. Epic titanium exterior with built-in S Pen, 200MP camera resolution, and all-day intelligent battery.'
    },
    {
      id: 3,
      name: 'OnePlus 13',
      slug: 'oneplus-13',
      brand: 'OnePlus',
      mrp: 89999,
      price: 79999,
      image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      description: 'Extreme power meets refined design. Hasselblad Camera for Mobile, 2K 120Hz ProXDR display with ultra-fast 100W SUPERVOOC charging.'
    }
  ],
  variants: [
    { id: 1, product_id: 1, type: 'storage', value: '256GB', display_name: '2026 · 256GB', price: 125900 },
    { id: 2, product_id: 1, type: 'storage', value: '512GB', display_name: '2026 · 512GB', price: 134900 },
    { id: 3, product_id: 1, type: 'color', value: 'Silver', display_name: 'Natural Titanium', price: null },
    { id: 4, product_id: 1, type: 'color', value: 'Black', display_name: 'Space Black', price: null },
    { id: 5, product_id: 1, type: 'color', value: 'Gold', display_name: 'Desert Titanium', price: null },

    { id: 6, product_id: 2, type: 'storage', value: '256GB', display_name: '2026 · 256GB', price: 109999 },
    { id: 7, product_id: 2, type: 'storage', value: '512GB', display_name: '2026 · 512GB', price: 119999 },
    { id: 8, product_id: 2, type: 'color', value: 'Cream', display_name: 'Titanium Yellow / Cream', price: null },
    { id: 9, product_id: 2, type: 'color', value: 'Violet', display_name: 'Titanium Violet', price: null },
    { id: 10, product_id: 2, type: 'color', value: 'Black', display_name: 'Titanium Black', price: null },

    { id: 11, product_id: 3, type: 'storage', value: '256GB', display_name: '2026 · 256GB', price: 79999 },
    { id: 12, product_id: 3, type: 'storage', value: '512GB', display_name: '2026 · 512GB', price: 89999 },
    { id: 13, product_id: 3, type: 'color', value: 'Emerald', display_name: 'Emerald Green', price: null },
    { id: 14, product_id: 3, type: 'color', value: 'Onyx', display_name: 'Midnight Onyx', price: null }
  ],
  emi_plans: [
    { id: 1, product_id: 1, tenure_months: 3, interest_rate: '10.00', monthly_payment: 42668, cashback: 'Flat ₹1,500 Cashback', is_recommended: false },
    { id: 2, product_id: 1, tenure_months: 6, interest_rate: '10.00', monthly_payment: 21600, cashback: 'Zero Processing Fee + ₹2,000 Voucher', is_recommended: true },
    { id: 3, product_id: 1, tenure_months: 12, interest_rate: '12.00', monthly_payment: 11200, cashback: 'Mutual Fund Growth Bonus', is_recommended: false },

    { id: 4, product_id: 2, tenure_months: 3, interest_rate: '10.00', monthly_payment: 37300, cashback: 'Flat ₹1,200 Cashback', is_recommended: false },
    { id: 5, product_id: 2, tenure_months: 6, interest_rate: '10.00', monthly_payment: 18900, cashback: 'Zero Processing Fee + ₹1,500 Voucher', is_recommended: true },
    { id: 6, product_id: 2, tenure_months: 12, interest_rate: '12.00', monthly_payment: 9800, cashback: 'Mutual Fund Growth Bonus', is_recommended: false },

    { id: 7, product_id: 3, tenure_months: 3, interest_rate: '10.00', monthly_payment: 27100, cashback: 'Flat ₹1,000 Cashback', is_recommended: false },
    { id: 8, product_id: 3, tenure_months: 6, interest_rate: '10.00', monthly_payment: 13700, cashback: 'Zero Processing Fee + ₹1,000 Voucher', is_recommended: true },
    { id: 9, product_id: 3, tenure_months: 12, interest_rate: '12.00', monthly_payment: 7100, cashback: 'Mutual Fund Growth Bonus', is_recommended: false }
  ]
};

let pool = null;
let isPostgresAvailable = false;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
    });

    // Test connection
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.warn('⚠️  PostgreSQL connection failed:', err.message);
        console.warn('⚡ Using built-in fallback dataset seamlessly.');
        isPostgresAvailable = false;
      } else {
        console.log('✅ Connected to PostgreSQL database at', res.rows[0].now);
        isPostgresAvailable = true;
      }
    });
  } catch (err) {
    console.warn('⚠️  Could not initialize PostgreSQL pool:', err.message);
    isPostgresAvailable = false;
  }
} else {
  console.log('ℹ️  No DATABASE_URL set. Running with fallback dataset.');
}

// Fallback helper queries
const queryFallback = (text, params = []) => {
  const normalized = text.toLowerCase();
  
  if (normalized.includes('select * from products where slug =') || normalized.includes('from products where slug = $1')) {
    const slug = params[0];
    const product = fallbackData.products.find(p => p.slug === slug);
    return { rows: product ? [product] : [] };
  }

  if (normalized.includes('from products') && !normalized.includes('where')) {
    return { rows: fallbackData.products };
  }

  if (normalized.includes('from variants where product_id = $1')) {
    const productId = params[0];
    const variants = fallbackData.variants.filter(v => v.product_id === productId);
    return { rows: variants };
  }

  if (normalized.includes('from emi_plans where product_id = $1')) {
    const productId = params[0];
    let emiPlans = fallbackData.emi_plans.filter(e => e.product_id === productId);
    if (normalized.includes('order by monthly_payment asc')) {
      emiPlans = [...emiPlans].sort((a, b) => a.monthly_payment - b.monthly_payment);
    } else {
      emiPlans = [...emiPlans].sort((a, b) => a.tenure_months - b.tenure_months);
    }
    if (normalized.includes('limit 1')) {
      emiPlans = emiPlans.slice(0, 1);
    }
    return { rows: emiPlans };
  }

  return { rows: [] };
};

const query = async (text, params) => {
  if (pool && isPostgresAvailable) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.warn('Query error on DB, falling back to mock data:', err.message);
      return queryFallback(text, params);
    }
  }
  return queryFallback(text, params);
};

module.exports = {
  query,
  pool,
  fallbackData
};
