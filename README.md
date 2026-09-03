# 1Fi Marketplace Assignment - Full-Stack Product Page

> A full-stack web application replicating the **1Fi mobile app design** where users can explore flagship smartphones with EMI plans backed by mutual funds. Features dynamic variant selection, real-time pricing recalculation, collapsible EMI plans, and PostgreSQL integration via Neon.tech.

---

## 📸 Features

- ✅ **Pixel-Perfect 1Fi UI** - Dark navy (`#1a1a2e`), accent pink/red (`#e94560`), and gold (`#d4af37`)
- ✅ **Dynamic Variant Selector** - Storage (256GB/512GB) & Color finishes with live price updates
- ✅ **Mutual Fund Backed EMIs** - 3/6/12 months tenure with interest rates & cashback
- ✅ **Limit Available Card** - `₹1,56,091 REMAINING TO SPEND` with MF growth badge
- ✅ **0% Interest Banner** - Partner brand subsidized EMI offers
- ✅ **UPI Auto-pay** - GPay, PhonePe, Paytm, BHIM UPI integration
- ✅ **Brand Partners** - Apple, Samsung, OnePlus, Reliance Digital, Croma, Vijay Sales
- ✅ **Checkout & Confirmation** - Interactive modal with mutual fund pledge details
- ✅ **Bottom Navigation** - Home, Shop, EMI Due, Limit, Profile (active "Shop" tab)
- ✅ **Responsive** - Mobile-first design optimized for all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Tailwind CSS v3, Vite, Lucide React Icons |
| **Backend** | Node.js, Express.js, `pg` (PostgreSQL client), CORS, Dotenv |
| **Database** | PostgreSQL (hosted on [Neon.tech](https://neon.tech/)) |
| **Deployment** | Frontend: [Vercel](https://vercel.com/) / Backend: [Render](https://render.com/) |

---

## 🗄️ Database Schema

### ER Diagram

```mermaid
erDiagram
    PRODUCTS ||--o{ VARIANTS : "has variants"
    PRODUCTS ||--o{ EMI_PLANS : "offers plans"

    PRODUCTS {
        serial id PK
        varchar name
        varchar slug UK
        varchar brand
        integer mrp
        integer price
        text image_url
        text description
        timestamp created_at
    }

    VARIANTS {
        serial id PK
        integer product_id FK
        varchar type
        varchar value
        varchar display_name
        integer price
        timestamp created_at
    }

    EMI_PLANS {
        serial id PK
        integer product_id FK
        integer tenure_months
        decimal interest_rate
        integer monthly_payment
        varchar cashback
        boolean is_recommended
        timestamp created_at
    }
```

### Table Definitions

<details>
<summary>Click to expand SQL schema</summary>

```sql
-- Products table
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

-- Variants table
CREATE TABLE variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'storage' or 'color'
  value VARCHAR(100) NOT NULL,
  display_name VARCHAR(255),
  price INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EMI Plans table
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
```
</details>

### Seed Data

3 products with variants and EMI plans:

| Product | Storage Variants | Color Variants | EMI Plans |
|---------|------------------|----------------|-----------|
| **iPhone 17 Pro** | 256GB, 512GB | Silver, Black, Gold | 3mo (10%), 6mo (10% ★), 12mo (12%) |
| **Samsung S24 Ultra** | 256GB, 512GB | Cream, Violet, Black | 3mo (10%), 6mo (10% ★), 12mo (12%) |
| **OnePlus 13** | 256GB, 512GB | Emerald, Onyx | 3mo (10%), 6mo (10% ★), 12mo (12%) |
🚀 Quick Start
Prerequisites
Node.js (v18+)

npm (v9+)

PostgreSQL (Neon.tech or local)

1. Clone the Repository
bash
git clone https://github.com/your-username/1fi-marketplace.git
cd 1fi-marketplace
2. Backend Setup
bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Add your Neon.tech connection string in .env
# DATABASE_URL=postgresql://username:password@ep-xyz.neon.tech/neondb?sslmode=require

# Seed the database (optional - or run seed.sql manually in Neon SQL Editor)
npm run seed

# Start backend server
npm run dev
Backend runs on http://localhost:5001

3. Frontend Setup
bash
# In a new terminal
cd frontend
npm install

# Create .env file
cp .env.example .env

# Add backend URL
# VITE_API_URL=http://localhost:5001

# Start frontend server
npm run dev
Frontend runs on http://localhost:5174

📡 API Endpoints
Base URL: http://localhost:5001/api

GET /products
Returns list of all products with starting EMI.

bash
curl http://localhost:5001/api/products
<details> <summary>📋 Example Response</summary>
json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "mrp": 159900,
      "price": 125900,
      "image_url": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "description": "Titanium design with Ceramic Shield front...",
      "starting_emi": 11200,
      "variants_count": 5
    }
  ]
}
</details>
GET /products/:slug
Returns detailed product with variants and EMI plans.

bash
curl http://localhost:5001/api/products/iphone-17-pro
<details> <summary>📋 Example Response</summary>
json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "mrp": 159900,
    "price": 125900,
    "image_url": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    "description": "Titanium design with Ceramic Shield front...",
    "variants": {
      "storage": [
        { "value": "256GB", "price": 125900 },
        { "value": "512GB", "price": 134900 }
      ],
      "color": [
        { "value": "Silver", "display_name": "Natural Titanium" },
        { "value": "Black", "display_name": "Space Black" },
        { "value": "Gold", "display_name": "Desert Titanium" }
      ]
    },
    "emi_plans": [
      { "tenure_months": 3, "interest_rate": "10.00", "monthly_payment": 42668 },
      { "tenure_months": 6, "interest_rate": "10.00", "monthly_payment": 21600, "is_recommended": true },
      { "tenure_months": 12, "interest_rate": "12.00", "monthly_payment": 11200 }
    ]
  }
}
</details>
GET /products/:slug/emi-plans
Returns only EMI plans for a product.

bash
curl http://localhost:5001/api/products/iphone-17-pro/emi-plans
🌐 Deployment Instructions
1. Database Setup on Neon.tech
Go to Neon.tech and create a free project

Copy your pooled connection string from Connection Details

Run backend/seed.sql in Neon SQL Editor OR use:

bash
DATABASE_URL="your_neon_url" npm run seed
2. Backend Deployment on Render
Push code to GitHub

Go to Render.com → New Web Service

Connect GitHub repo

Configure:

Root Directory: backend

Build Command: npm install

Start Command: npm start

Add Environment Variables:

DATABASE_URL: Your Neon.tech connection string

PORT: 10000

NODE_ENV: production

Deploy

3. Frontend Deployment on Vercel
Go to Vercel.com → Add New Project

Connect GitHub repo

Configure:

Root Directory: frontend

Framework Preset: Vite

Build Command: npm run build

Output Directory: dist

Add Environment Variable:

VITE_API_URL: Your Render backend URL (e.g., https://fi-backend.onrender.com)

Deploy

📁 Project Structure
text
1fi-marketplace/
├── backend/
│   ├── models/
│   │   └── db.js              # PostgreSQL connection pool
│   ├── routes/
│   │   └── products.js        # API routes
│   ├── scripts/
│   │   └── seed.js            # Database seeder
│   ├── .env.example
│   ├── package.json
│   ├── seed.sql               # Schema + seed data
│   └── server.js              # Express entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BottomNav.jsx
│   │   │   ├── BrandPartners.jsx
│   │   │   ├── CheckoutModal.jsx
│   │   │   ├── EMIPlan.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── LimitCard.jsx
│   │   │   ├── PayingTo.jsx
│   │   │   ├── PaymentMethods.jsx
│   │   │   ├── PriceSection.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── VariantSelector.jsx
│   │   │   └── Why1Fi.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── ProductPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
📝 Assignment Deliverables
Deliverable	Status
✅ GitHub Repository	Link
✅ Database Schema & Seed Data	backend/seed.sql
✅ README.md	Complete
✅ Deployed Demo	Frontend / Backend
✅ Video Demo	[Google Drive/YouTube Link]
👨‍💻 Author
Your Name
GitHub: @your-username
Email: your.email@example.com

📄 License
This project was created as part of the 1Fi SDE Intern Assignment.

🙏 Acknowledgments
1Fi for the UI/UX design reference

Snapmint for EMI plan inspiration

Neon.tech for free PostgreSQL hosting

Unsplash for product images

text

---

## ✅ **Ismein kya hai?**

| Section | Status |
|---------|--------|
| Title + Description | ✅ |
| Features list | ✅ |
| Tech Stack table | ✅ |
| ER Diagram | ✅ |
| SQL Schema | ✅ |
| Seed Data summary | ✅ |
| Quick Start guide | ✅ |
| API Documentation | ✅ |
| Deployment guide | ✅ |
| Project Structure | ✅ |
| Deliverables checklist | ✅ |
| Author section | ✅ |

---


## 📤 **Save and Push**

```bash



