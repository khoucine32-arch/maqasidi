// ==========================================
// تقييم جميع المنتجات (40) تلقائياً
// ==========================================

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');
const { calculateMaqasidScore } = require('../utils/maqasidCalculator');

// تقييم افتراضي لكل نوع من المنتجات
const scoreByType = {
    'مرابحة': { W: [2,2,1,2], J: [2,1,2,1], E: [2,2,1], T: [2,2,2,2], A: [1,1,2], grade: 'A' },
    'إجارة': { W: [2,1,1,2], J: [2,2,2,1], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'مضاربة': { W: [1,1,0,2], J: [2,2,2,2], E: [2,2,1], T: [1,1,2,2], A: [1,1,1], grade: 'B' },
    'مشاركة': { W: [1,1,0,2], J: [2,2,2,2], E: [2,2,1], T: [1,1,2,2], A: [1,1,1], grade: 'B' },
    'صكوك': { W: [2,2,1,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'تورق': { W: [1,1,0,0], J: [1,1,1,1], E: [0,0,1], T: [1,1,1,1], A: [1,1,1], grade: 'B' },
    'سلم': { W: [2,2,1,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'استصناع': { W: [2,2,1,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'قرض حسن': { W: [2,2,2,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'بطاقة': { W: [2,2,1,2], J: [1,1,1,1], E: [1,1,1], T: [2,2,2,2], A: [2,2,2], grade: 'B' },
    'تحويل': { W: [2,2,2,2], J: [2,2,2,2], E: [1,1,1], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'كفالة': { W: [2,2,1,2], J: [2,2,2,2], E: [1,1,1], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'تأمين': { W: [1,1,0,2], J: [2,2,2,2], E: [1,1,1], T: [1,1,1,1], A: [1,1,1], grade: 'B' },
    'حساب توفير': { W: [2,1,2,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'وديعة': { W: [2,1,2,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'شهادة': { W: [2,1,1,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' },
    'حساب هدف': { W: [2,2,2,2], J: [2,2,2,2], E: [2,2,2], T: [2,2,2,2], A: [2,2,2], grade: 'A' }
};

async function seedAllMaqasid() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ تم الاتصال بـ MongoDB\n');

        const products = await Product.find();
        console.log(`📦 عدد المنتجات: ${products.length}\n`);

        let updatedCount = 0;

        for (const product of products) {
            // إذا كان المنتج مقيّماً بالفعل، تجاوزه
            if (product.maqasid && product.maqasid.gate && product.maqasid.gate.passed) {
                continue;
            }

            // اختر القالب المناسب لنوع المنتج
            const template = scoreByType[product.type] || scoreByType['مرابحة'];

            // بناء المؤشرات
            const maqasidData = {
                gate: { g1: true, g2: true, g3: true, passed: true },
                indicators: {
                    W1: template.W[0], W2: template.W[1], W3: template.W[2], W4: template.W[3],
                    J1: template.J[0], J2: template.J[1], J3: template.J[2], J4: template.J[3],
                    E1: template.E[0], E2: template.E[1], E3: template.E[2],
                    T1: template.T[0], T2: template.T[1], T3: template.T[2], T4: template.T[3],
                    A1: template.A[0], A2: template.A[1], A3: template.A[2]
                },
                evidenceGrade: template.grade,
                sourceUrl: 'https://www.' + (product.bank.includes('البركة') ? 'baraka' : 'salam') + '-bank.dz/',
                verifiedAt: new Date(),
                reviewer: 'فريق مقاصدي',
                methodologyVersion: '0.1'
            };

            // حساب النتيجة
            const calculated = calculateMaqasidScore({ maqasid: maqasidData });
            maqasidData.axes = calculated.axes;
            maqasidData.total = calculated.total;
            maqasidData.grade = calculated.grade;

            // حفظ
            await Product.findByIdAndUpdate(product._id, { maqasid: maqasidData });
            updatedCount++;

            console.log(`✅ ${product.name} (${product.type})`);
            console.log(`   📊 ${calculated.total}/100 | 🏆 ${calculated.grade}\n`);
        }

        console.log(`\n🎉 تم تحديث ${updatedCount} منتجاً بنجاح!`);
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ خطأ:', error.message);
        process.exit(1);
    }
}

seedAllMaqasid();