const express = require('express');
const router = express.Router();
const db = require('../models/db');

/**
 * GET /api/products
 * Returns list of all products with variant counts and starting EMI
 */
router.get('/', async (req, res) => {
  try {
    const productsResult = await db.query('SELECT * FROM products ORDER BY id ASC');
    const products = productsResult.rows;

    // Attach lowest EMI plan for each product for quick display on product list
    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        const emiResult = await db.query(
          'SELECT * FROM emi_plans WHERE product_id = $1 ORDER BY monthly_payment ASC LIMIT 1',
          [product.id]
        );
        const lowestPlan = emiResult.rows[0] || null;

        const variantsResult = await db.query(
          'SELECT * FROM variants WHERE product_id = $1',
          [product.id]
        );

        return {
          ...product,
          starting_emi: lowestPlan ? lowestPlan.monthly_payment : null,
          lowest_tenure: lowestPlan ? lowestPlan.tenure_months : null,
          variants_count: variantsResult.rows.length
        };
      })
    );

    res.json({
      success: true,
      data: enrichedProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      error: error.message
    });
  }
});

/**
 * GET /api/products/:slug
 * Returns single product with all variants and EMI plans
 */
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const productResult = await db.query(
      'SELECT * FROM products WHERE slug = $1',
      [slug]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Product with slug '${slug}' not found`
      });
    }

    const product = productResult.rows[0];

    // Fetch variants
    const variantsResult = await db.query(
      'SELECT * FROM variants WHERE product_id = $1 ORDER BY id ASC',
      [product.id]
    );

    // Group variants by type ('storage' and 'color')
    const variants = variantsResult.rows;
    const storageVariants = variants.filter((v) => v.type === 'storage');
    const colorVariants = variants.filter((v) => v.type === 'color');

    // Fetch EMI plans
    const emiResult = await db.query(
      'SELECT * FROM emi_plans WHERE product_id = $1 ORDER BY tenure_months ASC',
      [product.id]
    );
    const emiPlans = emiResult.rows;

    const startingEmi = emiPlans.length > 0
      ? Math.min(...emiPlans.map(p => p.monthly_payment))
      : null;

    res.json({
      success: true,
      data: {
        ...product,
        starting_emi: startingEmi,
        variants: {
          all: variants,
          storage: storageVariants,
          color: colorVariants
        },
        emi_plans: emiPlans
      }
    });
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve product details',
      error: error.message
    });
  }
});

/**
 * GET /api/products/:slug/emi-plans
 * Returns only EMI plans for a specific product
 */
router.get('/:slug/emi-plans', async (req, res) => {
  const { slug } = req.params;

  try {
    const productResult = await db.query(
      'SELECT id, name, slug, price FROM products WHERE slug = $1',
      [slug]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Product with slug '${slug}' not found`
      });
    }

    const product = productResult.rows[0];

    const emiResult = await db.query(
      'SELECT * FROM emi_plans WHERE product_id = $1 ORDER BY tenure_months ASC',
      [product.id]
    );

    res.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        base_price: product.price
      },
      data: emiResult.rows
    });
  } catch (error) {
    console.error(`Error fetching EMI plans for ${slug}:`, error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve EMI plans',
      error: error.message
    });
  }
});

module.exports = router;
