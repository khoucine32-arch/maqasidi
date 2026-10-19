// ==========================================
// إضافة البوابة الفقهية لجميع المنتجات
// ==========================================

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');

// تقييم فقهي افتراضي حسب نوع المنتج
const fiqhByType = {
    'مرابحة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'إجارة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'مضاربة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'مشاركة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'صكوك': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'تورق': { contractValid: true, noRiba: false, noGharar: true, noMaysir: false, noInvalidConditions: true, controversial: true, controversyNote: 'التورق المصرفي محل خلاف بين العلماء: بعضهم يمنعه لأنه حيلة للربا، وبعضهم يجيزه بشروط.' },
    'سلم': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'استصناع': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'قرض حسن': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'بطاقة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'تحويل': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'كفالة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'تأمين': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'حساب توفير': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'وديعة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'شهادة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false },
    'حساب هدف': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false }
};

async function seedFiqhGate() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ تم الاتصال بـ MongoDB\n');

        const products = await Product.find();
        console.log(`📦 عدد المنتجات: ${products.length}\n`);

        let updatedCount = 0;

        for (const product of products) {
            const fiqh = fiqhByType[product.type] || fiqhByType['مرابحة'];
            
            const fiqhGateData = {
                contractValid: fiqh.contractValid,
                noRiba: fiqh.noRiba,
                noGharar: fiqh.noGharar,
                noMaysir: fiqh.noMaysir,
                noInvalidConditions: fiqh.noInvalidConditions,
                passed: fiqh.contractValid && fiqh.noRiba && fiqh.noGharar && fiqh.noMaysir && fiqh.noInvalidConditions,
                school: 'مالكي',
                controversial: fiqh.controversial || false,
                controversyNote: fiqh.controversyNote || '',
                references: ['المدونة', 'بداية المجتهد', 'قواعد الفقه المالكي']
            };

            await Product.findByIdAndUpdate(product._id, { fiqhGate: fiqhGateData });
            updatedCount++;

            console.log(`✅ ${product.name} (${product.type})`);
            console.log(`   ✅ فقهياً: ${fiqhGateData.passed ? 'مقبول' : 'مرفوض'}`);
            if (fiqhGateData.controversial) {
                console.log(`   ⚠️ ملاحظة: محل خلاف`);
            }
            console.log('');
        }

        console.log(`\n🎉 تم إضافة البوابة الفقهية لـ ${updatedCount} منتجاً!`);
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ خطأ:', error.message);
        process.exit(1);
    }
}

seedFiqhGate();