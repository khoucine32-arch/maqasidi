const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');

// تقييم فقهي افتراضي حسب نوع المنتج
const fiqhByType = {
    'مرابحة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'إجارة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'مضاربة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'مشاركة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'صكوك': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'تورق': { contractValid: true, noRiba: false, noGharar: true, noMaysir: false, noInvalidConditions: true, controversial: true, controversyNote: 'التورق المصرفي محل خلاف بين العلماء: بعضهم يمنعه لأنه حيلة للربا، وبعضهم يجيزه بشروط.' },
    'سلم': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'استصناع': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'قرض حسن': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'بطاقة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'تحويل': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'كفالة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'تأمين': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'حساب توفير': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'وديعة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'شهادة': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' },
    'حساب هدف': { contractValid: true, noRiba: true, noGharar: true, noMaysir: true, noInvalidConditions: true, controversial: false, controversyNote: '' }
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
            
            // بناء كائن fiqhGateData بالكامل
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
                references: ['المدونة', 'بداية المجتهد', 'قواعد الفقه المالكي'],
                madhahib: [
                    { school: 'مالكي', ruling: fiqh.controversial ? 'ممنوع' : 'جائز', reasoning: fiqh.controversial ? 'سد الذريعة' : 'الأصل الإباحة' },
                    { school: 'حنفي', ruling: 'جائز بشروط', reasoning: 'إذا كان البيع حقيقياً' },
                    { school: 'شافعي', ruling: 'مكروه', reasoning: 'إذا لم تكن هناك حاجة حقيقية' },
                    { school: 'حنبلي', ruling: 'جائز', reasoning: 'إذا لم يشترط المشتري على البائع شراء السلعة' }
                ]
            };

            // تحديث المنتج
            await Product.findByIdAndUpdate(product._id, { fiqhGate: fiqhGateData });
            updatedCount++;

            console.log(`✅ ${product.name} (${product.type})`);
            console.log(`   ✅ فقهياً: ${fiqhGateData.passed ? 'مقبول' : 'مرفوض'}`);
            if (fiqhGateData.controversial) {
                console.log(`   ⚠️ ملاحظة: محل خلاف`);
            }
            console.log('');
        }

        console.log(`\n🎉 تم تحديث ${updatedCount} منتجاً بنجاح!`);
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ خطأ:', error.message);
        process.exit(1);
    }
}

seedFiqhGate();