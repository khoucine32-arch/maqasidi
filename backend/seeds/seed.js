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
    },    // ===== منتجات التمويل الجديدة =====
    {
        name: 'مرابحة التعليم',
        category: 'تمويل',
        type: 'مرابحة',
        bank: 'مصرف السلام الجزائر',
        amount: '50,000 - 2,000,000 دج',
        duration: '6 - 48 شهراً',
        rate: '5% سنوياً',
        rating: 4.7,
        icon: 'fa-graduation-cap'
    },
    {
        name: 'مرابحة السفر',
        category: 'تمويل',
        type: 'مرابحة',
        bank: 'بنك البركة الجزائري',
        amount: '30,000 - 500,000 دج',
        duration: '3 - 24 شهراً',
        rate: '6.5% سنوياً',
        rating: 4.4,
        icon: 'fa-plane'
    },
    {
        name: 'إجارة المعدات',
        category: 'تمويل',
        type: 'إجارة',
        bank: 'مصرف السلام الجزائر',
        amount: '500,000 - 30,000,000 دج',
        duration: '12 - 84 شهراً',
        rate: 'متغير حسب العقد',
        rating: 4.5,
        icon: 'fa-tools'
    },
    {
        name: 'إجارة الطائرات',
        category: 'تمويل',
        type: 'إجارة',
        bank: 'بنك البركة الجزائري',
        amount: '10,000,000 - 500,000,000 دج',
        duration: '36 - 120 شهراً',
        rate: 'حسب العقد',
        rating: 4.6,
        icon: 'fa-plane-departure'
    },
    {
        name: 'مشاركة عقارية',
        category: 'تمويل',
        type: 'مشاركة',
        bank: 'مصرف السلام الجزائر',
        amount: '5,000,000 - 100,000,000 دج',
        duration: '60 - 240 شهراً',
        rate: 'متفق عليها',
        rating: 4.7,
        icon: 'fa-building'
    },
    {
        name: 'مضاربة مقيدة',
        category: 'تمويل',
        type: 'مضاربة',
        bank: 'بنك البركة الجزائري',
        amount: '1,000,000 - 20,000,000 دج',
        duration: '12 - 60 شهراً',
        rate: 'نسبة متغيرة',
        rating: 4.5,
        icon: 'fa-chart-line'
    },
    {
        name: 'استصناع المباني',
        category: 'تمويل',
        type: 'استصناع',
        bank: 'مصرف السلام الجزائر',
        amount: '10,000,000 - 500,000,000 دج',
        duration: '24 - 120 شهراً',
        rate: 'حسب المواصفات',
        rating: 4.8,
        icon: 'fa-hard-hat'
    },
    {
        name: 'سلم زراعي',
        category: 'تمويل',
        type: 'سلم',
        bank: 'بنك البركة الجزائري',
        amount: '500,000 - 10,000,000 دج',
        duration: '3 - 18 شهراً',
        rate: 'حسب المحصول',
        rating: 4.4,
        icon: 'fa-wheat-awn'
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
        // ===== منتجات الاستثمار الجديدة =====
    {
        name: 'صكوك المرابحة',
        category: 'استثمار',
        type: 'صكوك',
        bank: 'مصرف السلام الجزائر',
        amount: '1,000,000 - 20,000,000 دج',
        duration: '24 - 84 شهراً',
        rate: '6.5% متوقع',
        rating: 4.6,
        icon: 'fa-file-invoice-dollar'
    },
    {
        name: 'صكوك المشاركة',
        category: 'استثمار',
        type: 'صكوك',
        bank: 'بنك البركة الجزائري',
        amount: '500,000 - 15,000,000 دج',
        duration: '36 - 96 شهراً',
        rate: 'نسبة متغيرة',
        rating: 4.7,
        icon: 'fa-handshake-angle'
    },
    {
        name: 'صناديق الاستثمار الإسلامية',
        category: 'استثمار',
        type: 'صناديق',
        bank: 'مصرف السلام الجزائر',
        amount: '100,000 - 10,000,000 دج',
        duration: 'مرن',
        rate: 'حسب الأداء',
        rating: 4.5,
        icon: 'fa-chart-pie'
    },
    {
        name: 'الريت الإسلامي',
        category: 'استثمار',
        type: 'ريت',
        bank: 'بنك البركة الجزائري',
        amount: '500,000 - 50,000,000 دج',
        duration: '60 - 240 شهراً',
        rate: '7% متوقع',
        rating: 4.6,
        icon: 'fa-city'
    },
    {
        name: 'محفظة استثمارية متنوعة',
        category: 'استثمار',
        type: 'محفظة',
        bank: 'مصرف السلام الجزائر',
        amount: '1,000,000 - 100,000,000 دج',
        duration: '12 - 120 شهراً',
        rate: 'متفق عليها',
        rating: 4.4,
        icon: 'fa-briefcase'
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
        // ===== منتجات الادخار الجديدة =====
    {
        name: 'حساب ادخار الأطفال',
        category: 'ادخار',
        type: 'حساب ادخار',
        bank: 'بنك البركة الجزائري',
        amount: '5,000 - 500,000 دج',
        duration: 'مرن',
        rate: 'حسب المضاربة',
        rating: 4.7,
        icon: 'fa-child'
    },
    {
        name: 'حساب استثمار متعدد العملات',
        category: 'ادخار',
        type: 'حساب استثمار',
        bank: 'مصرف السلام الجزائر',
        amount: '50,000 - 10,000,000 دج',
        duration: '6 - 60 شهراً',
        rate: 'حسب العملة',
        rating: 4.5,
        icon: 'fa-coins'
    },
    {
        name: 'شهادة استثمار إسلامية',
        category: 'ادخار',
        type: 'شهادة',
        bank: 'بنك البركة الجزائري',
        amount: '100,000 - 20,000,000 دج',
        duration: '12 - 60 شهراً',
        rate: '6% سنوياً',
        rating: 4.6,
        icon: 'fa-certificate'
    },
    {
        name: 'وديعة لأجل',
        category: 'ادخار',
        type: 'وديعة',
        bank: 'مصرف السلام الجزائر',
        amount: '100,000 - 50,000,000 دج',
        duration: '3 - 24 شهراً',
        rate: 'حسب المدة',
        rating: 4.5,
        icon: 'fa-clock'
    },
    {
        name: 'حساب الحج والعمرة',
        category: 'ادخار',
        type: 'حساب هدف',
        bank: 'بنك البركة الجزائري',
        amount: '10,000 - 2,000,000 دج',
        duration: 'مرن',
        rate: 'حسب المضاربة',
        rating: 4.8,
        icon: 'fa-kaaba'
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
    },
        // ===== خدمات مصرفية جديدة =====
    {
        name: 'بطاقة السحب الإسلامي',
        category: 'خدمات',
        type: 'بطاقة',
        bank: 'مصرف السلام الجزائر',
        amount: 'حسب الرصيد',
        duration: 'حسب الرصيد',
        rate: 'مجانية',
        rating: 4.6,
        icon: 'fa-credit-card'
    },
    {
        name: 'بطاقة الائتمان الذهبية',
        category: 'خدمات',
        type: 'بطاقة',
        bank: 'بنك البركة الجزائري',
        amount: '100,000 - 5,000,000 دج',
        duration: 'حسب الدفع',
        rate: 'حسب الدفع',
        rating: 4.5,
        icon: 'fa-gem'
    },
    {
        name: 'تحويلات دولية',
        category: 'خدمات',
        type: 'تحويل',
        bank: 'مصرف السلام الجزائر',
        amount: 'حسب المبلغ',
        duration: 'فوري / 48 ساعة',
        rate: '0.5% - 2%',
        rating: 4.7,
        icon: 'fa-globe'
    },
    {
        name: 'ضمانات مصرفية (كفالة)',
        category: 'خدمات',
        type: 'كفالة',
        bank: 'بنك البركة الجزائري',
        amount: '500,000 - 50,000,000 دج',
        duration: 'حسب العقد',
        rate: '1% - 2% سنوياً',
        rating: 4.5,
        icon: 'fa-file-signature'
    },
    {
        name: 'صرافة العملات',
        category: 'خدمات',
        type: 'صرافة',
        bank: 'مصرف السلام الجزائر',
        amount: 'حسب العملة',
        duration: 'فوري',
        rate: 'حسب السوق',
        rating: 4.4,
        icon: 'fa-exchange-alt'
    },
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