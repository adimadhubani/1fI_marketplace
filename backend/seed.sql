-- Drop existing tables if they exist
DROP TABLE IF EXISTS emi_plans CASCADE;
DROP TABLE IF EXISTS variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  brand VARCHAR(100),
  mrp INTEGER NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create variants table
CREATE TABLE variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'storage' or 'color'
  value VARCHAR(100) NOT NULL,
  display_name VARCHAR(255),
  price INTEGER, -- variant-specific price if different
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create emi_plans table
CREATE TABLE emi_plans (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  tenure_months INTEGER NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  monthly_payment INTEGER NOT NULL,
  cashback VARCHAR(100),
  is_recommended BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Product 1: iPhone 17 Pro
INSERT INTO products (id, name, slug, brand, mrp, price, image_url, description)
VALUES (
  1,
  'iPhone 17 Pro',
  'iphone-17-pro',
  'Apple',
  159900,
  125900,
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
  'Titanium design with Ceramic Shield front. Powered by the next-gen Apple Silicon chip with advanced Pro camera system and Action button.'
);

-- Product 1 Variants
INSERT INTO variants (product_id, type, value, display_name, price) VALUES
(1, 'storage', '256GB', '2026 · 256GB', 125900),
(1, 'storage', '512GB', '2026 · 512GB', 134900),
(1, 'color', 'Silver', 'Natural Titanium', NULL),
(1, 'color', 'Black', 'Space Black', NULL),
(1, 'color', 'Gold', 'Desert Titanium', NULL);

-- Product 1 EMI Plans
INSERT INTO emi_plans (product_id, tenure_months, interest_rate, monthly_payment, cashback, is_recommended) VALUES
(1, 3, 10.00, 42668, 'Flat ₹1,500 Cashback', false),
(1, 6, 10.00, 21600, 'Zero Processing Fee + ₹2,000 Voucher', true),
(1, 12, 12.00, 11200, 'Mutual Fund Growth Bonus', false);

-- Insert Product 2: Samsung S24 Ultra
INSERT INTO products (id, name, slug, brand, mrp, price, image_url, description)
VALUES (
  2,
  'Samsung S24 Ultra',
  'samsung-s24-ultra',
  'Samsung',
  129999,
  109999,
  'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
  'Galaxy AI is here. Epic titanium exterior with built-in S Pen, 200MP camera resolution, and all-day intelligent battery.'
);

-- Product 2 Variants
INSERT INTO variants (product_id, type, value, display_name, price) VALUES
(2, 'storage', '256GB', '2026 · 256GB', 109999),
(2, 'storage', '512GB', '2026 · 512GB', 119999),
(2, 'color', 'Cream', 'Titanium Yellow / Cream', NULL),
(2, 'color', 'Violet', 'Titanium Violet', NULL),
(2, 'color', 'Black', 'Titanium Black', NULL);

-- Product 2 EMI Plans
INSERT INTO emi_plans (product_id, tenure_months, interest_rate, monthly_payment, cashback, is_recommended) VALUES
(2, 3, 10.00, 37300, 'Flat ₹1,200 Cashback', false),
(2, 6, 10.00, 18900, 'Zero Processing Fee + ₹1,500 Voucher', true),
(2, 12, 12.00, 9800, 'Mutual Fund Growth Bonus', false);

-- Insert Product 3: OnePlus 13
INSERT INTO products (id, name, slug, brand, mrp, price, image_url, description)
VALUES (
  3,
  'OnePlus 13',
  'oneplus-13',
  'OnePlus',
  89999,
  79999,
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
  'Extreme power meets refined design. Hasselblad Camera for Mobile, 2K 120Hz ProXDR display with ultra-fast 100W SUPERVOOC charging.'
);

-- Product 3 Variants
INSERT INTO variants (product_id, type, value, display_name, price) VALUES
(3, 'storage', '256GB', '2026 · 256GB', 79999),
(3, 'storage', '512GB', '2026 · 512GB', 89999),
(3, 'color', 'Emerald', 'Emerald Green', NULL),
(3, 'color', 'Onyx', 'Midnight Onyx', NULL);

-- Product 3 EMI Plans
INSERT INTO emi_plans (product_id, tenure_months, interest_rate, monthly_payment, cashback, is_recommended) VALUES
(3, 3, 10.00, 27100, 'Flat ₹1,000 Cashback', false),
(3, 6, 10.00, 13700, 'Zero Processing Fee + ₹1,000 Voucher', true),
(3, 12, 12.00, 7100, 'Mutual Fund Growth Bonus', false);

-- Reset sequence IDs
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('variants_id_seq', (SELECT MAX(id) FROM variants));
SELECT setval('emi_plans_id_seq', (SELECT MAX(id) FROM emi_plans));
