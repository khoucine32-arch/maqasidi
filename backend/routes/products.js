const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { calculateMaqasidScore, checkFiqhGate } = require('../utils/maqasidCalculator');

// ==========================================
// 1. جلب جميع المنتجات
// ==========================================
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ==========================================
// 2. جلب منتج واحد بالـ ID
// ==========================================
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'المنتج غير موجود'
            });
        }
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ==========================================
// 3. Maqasid Score - البحث بالاسم
// ==========================================
router.get('/by-name/:name/maqasid', async (req, res) => {
    try {
        const productName = decodeURIComponent(req.params.name);
        const product = await Product.findOne({ name: productName });
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'المنتج غير موجود: ' + productName
            });
        }
        
        const score = calculateMaqasidScore(product);
        
        res.json({
            success: true,
            product: {
                id: product._id,
                name: product.name,
                bank: product.bank
            },
            maqasid: score
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ==========================================
// 4. البوابة الفقهية (Fiqh Gate) - البحث بالاسم
// ==========================================
router.get('/by-name/:name/fiqh', async (req, res) => {
    try {
        const productName = decodeURIComponent(req.params.name);
        const product = await Product.findOne({ name: productName });
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'المنتج غير موجود: ' + productName
            });
        }
        
        const fiqhGate = checkFiqhGate(product);
        
        res.json({
            success: true,
            product: {
                id: product._id,
                name: product.name,
                bank: product.bank
            },
            fiqhGate: fiqhGate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;