const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

async function runSeed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Error: DATABASE_URL is not set in environment or .env file.');
    console.error('Please add DATABASE_URL="postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require"');
    process.exit(1);
  }

  console.log('Connecting to database...');
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false }
  });

  try {
    const seedSqlPath = path.join(__dirname, '../seed.sql');
    const seedSql = fs.readFileSync(seedSqlPath, 'utf8');

    console.log('Executing seed.sql statements...');
    await pool.query(seedSql);

    console.log('✅ Database seeded successfully with products, variants, and EMI plans!');

    const productsCount = await pool.query('SELECT count(*) FROM products');
    const variantsCount = await pool.query('SELECT count(*) FROM variants');
    const emiCount = await pool.query('SELECT count(*) FROM emi_plans');

    console.log(`📊 Summary:
    - Products: ${productsCount.rows[0].count}
    - Variants: ${variantsCount.rows[0].count}
    - EMI Plans: ${emiCount.rows[0].count}
    `);
  } catch (err) {
    console.error('❌ Failed to execute seed SQL:', err);
  } finally {
    await pool.end();
  }
}

runSeed();
