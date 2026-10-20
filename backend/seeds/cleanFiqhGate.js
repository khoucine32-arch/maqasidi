const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');

async function cleanFiqhGate() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ متصل بـ MongoDB');

        // حذف حقل fiqhGate من جميع المنتجات
        const result = await Product.updateMany(
            {},
            { $unset: { fiqhGate: "" } }
        );

        console.log(`🗑️ تم مسح fiqhGate من ${result.modifiedCount} منتجاً`);
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ خطأ:', error.message);
        process.exit(1);
    }
}

cleanFiqhGate();