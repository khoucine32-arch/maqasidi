// ==========================================
// سكريبت إضافة المنتجات إلى قاعدة البيانات
// ==========================================

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');

// ==========================================
// بيانات 17 منتجاً
// ==========================================
const products = [
    // ===== منتجات التمويل =====
    {
        name: 'مرابحة السيارة',
        category: 'تمويل',
        type: 'مرابحة',
        bank: 'مصرف السلام الجزائر',
        amount: '500,000 - 5,000,000 دج',
        duration: '12 - 60 شهراً',
        rate: '6% سنوياً',
        rating: 4.8,
        icon: 'fa-car'
    },
    {
        name: 'مرابحة الأجهزة الإلكترونية',
        category: 'تمويل',
        type: 'مرابحة',
        bank: 'بنك البركة الجزائري',
        amount: '100,000 - 2,000,000 دج',
        duration: '6 - 36 شهراً',
        rate: '7% سنوياً',
        rating: 4.6,
        icon: 'fa-laptop'
    },
    {
        name: 'مرابحة العقار',
        category: 'تمويل',
        type: 'مرابحة',
        bank: 'مصرف السلام الجزائر',
        amount: '2,000,000 - 20,000,000 دج',
        duration: '36 - 180 شهراً',
        rate: '5.5% سنوياً',
        rating: 4.7,
        icon: 'fa-building'
    },
    {
        name: 'إجارة منتهية بالتمليك',
        category: 'تمويل',
        type: 'إجارة',
        bank: 'مصرف السلام الجزائر',
        amount: '2,000,000 - 20,000,000 دج',
        duration: '36 - 84 شهراً',
        rate: 'متغير حسب العقد',
        rating: 4.3,
        icon: 'fa-house'
    },
    {
        name: 'مشاركة متنامية',
        category: 'تمويل',
        type: 'مشاركة',
        bank: 'بنك البركة الجزائري',
        amount: '5,000,000 - 50,000,000 دج',
        duration: '36 - 120 شهراً',
        rate: 'متفق عليها',
        rating: 4.4,
        icon: 'fa-handshake'
    },
    {
        name: 'الاستصناع',
        category: 'تمويل',
        type: 'استصناع',
        bank: 'مصرف السلام الجزائر',
        amount: '5,000,000 - 100,000,000 دج',
        duration: '12 - 60 شهراً',
        rate: 'حسب المواصفات',
        rating: 4.6,
        icon: 'fa-industry'
    },
    {
        name: 'السلم',
        category: 'تمويل',
        type: 'سلم',
        bank: 'بنك البركة الجزائري',
        amount: '1,000,000 - 20,000,000 دج',
        duration: '3 - 12 شهراً',
        rate: 'حسب السلعة',
        rating: 4.4,
        icon: 'fa-seedling'
    },
    {
        name: 'التورق',
        category: 'تمويل',
        type: 'تورق',
        bank: 'مصرف السلام الجزائر',
        amount: '500,000 - 10,000,000 دج',
        duration: '12 - 60 شهراً',
        rate: 'محل خلاف',
        rating: 3.5,
        icon: 'fa-arrows-rotate'
    },
    // ===== منتجات الاستثمار =====
    {
        name: 'صكوك الإجارة',
        category: 'استثمار',
        type: 'صكوك',
        bank: 'بنك البركة الجزائري',
        amount: '1,000,000 - 10,000,000 دج',
        duration: '24 - 60 شهراً',
        rate: '7% متوقع',
        rating: 4.5,
        icon: 'fa-certificate'
    },
    {
        name: 'مضاربة مطلقة',
        category: 'استثمار',
        type: 'مضاربة',
        bank: 'مصرف السلام الجزائر',
        amount: '1,000,000 - 10,000,000 دج',
        duration: '12 - 60 شهراً',
        rate: 'نسبة متغيرة',
        rating: 4.5,
        icon: 'fa-chart-line'
    },
    {
        name: 'صكوك المضاربة',
        category: 'استثمار',
        type: 'صكوك',
        bank: 'مصرف السلام الجزائر',
        amount: '500,000 - 5,000,000 دج',
        duration: '12 - 48 شهراً',
        rate: '8% سنوياً',
        rating: 4.6,
        icon: 'fa-certificate'
    },
    // ===== منتجات الادخار =====
    {
        name: 'حساب التوفير',
        category: 'ادخار',
        type: 'حساب توفير',
        bank: 'بنك البركة الجزائري',
        amount: '10,000 - 10,000,000 دج',
        duration: 'مرن',
        rate: 'حسب المضاربة',
        rating: 4.5,
        icon: 'fa-coins'
    },
    {
        name: 'وديعة استثمارية',
        category: 'ادخار',
        type: 'وديعة',
        bank: 'مصرف السلام الجزائر',
        amount: '100,000 - 50,000,000 دج',
        duration: '3 - 24 شهراً',
        rate: 'حسب العقد',
        rating: 4.6,
        icon: 'fa-vault'
    },
    {
        name: 'قرض حسن',
        category: 'ادخار',
        type: 'قرض حسن',
        bank: 'مصرف السلام الجزائر',
        amount: '10,000 - 500,000 دج',
        duration: '6 - 36 شهراً',
        rate: '0% (بدون فوائد)',
        rating: 4.8,
        icon: 'fa-hand-holding-heart'
    },
    // ===== الخدمات المصرفية =====
    {
        name: 'بطاقة المرابحة',
        category: 'خدمات',
        type: 'بطاقة',
        bank: 'بنك البركة الجزائري',
        amount: '50,000 - 2,000,000 دج',
        duration: 'حسب الدفع',
        rate: 'حسب الدفع',
        rating: 4.5,
        icon: 'fa-credit-card'
    },
    {
        name: 'التأمين التكافلي',
        category: 'خدمات',
        type: 'تأمين',
        bank: 'سلام تكافل الجزائر',
        amount: 'حسب الوثيقة',
        duration: 'حسب الوثيقة',
        rate: 'حسب الوثيقة',
        rating: 4.7,
        icon: 'fa-shield-halved'
    },
    {
        name: 'التحويلات المالية',
        category: 'خدمات',
        type: 'تحويل',
        bank: 'بنك البركة الجزائري',
        amount: '0.5% - 1%',
        duration: 'فوري / 24 ساعة',
        rate: 'عمولة',
        rating: 4.6,
        icon: 'fa-money-bill-transfer'
    }
];

// ==========================================
// دالة إضافة المنتجات
// ==========================================
async function seedDatabase() {
    try {
        // الاتصال بقاعدة البيانات
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ تم الاتصال بـ MongoDB');

        // حذف المنتجات القديمة
        await Product.deleteMany({});
        console.log('🗑️ تم حذف المنتجات القديمة');

        // إضافة المنتجات الجديدة
        const result = await Product.insertMany(products);
        console.log(`✅ تم إضافة ${result.length} منتجاً بنجاح!`);

        // إغلاق الاتصال
        await mongoose.connection.close();
        console.log('🔌 تم إغلاق الاتصال');
        process.exit(0);

    } catch (error) {
        console.error('❌ خطأ:', error.message);
        process.exit(1);
    }
}

// تشغيل الدالة
seedDatabase();