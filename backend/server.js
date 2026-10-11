// ==========================================
// خادم مقاصدي - Backend API
// ==========================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Middleware
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// الاتصال بـ MongoDB
// ==========================================
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ تم الاتصال بـ MongoDB بنجاح!'))
    .catch((err) => console.error('❌ فشل الاتصال بـ MongoDB:', err.message));

// ==========================================
// Routes (المسارات)
// ==========================================
const productsRoute = require('./routes/products');
app.use('/api/products', productsRoute);

// ==========================================
// اختبار الخادم
// ==========================================
app.get('/', (req, res) => {
    res.json({
        message: 'مرحباً بك في API منصة مقاصدي',
        status: 'active',
        version: '1.0.0'
    });
});

// ==========================================
// تشغيل الخادم
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على المنفذ: ${PORT}`);
    console.log(`🌐 الرابط: http://localhost:${PORT}`);
});