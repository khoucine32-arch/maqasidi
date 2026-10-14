// ==========================================
// تحديث بيانات Maqasid Score لمنتج تجريبي
// ==========================================

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');
const { calculateMaqasidScore } = require('../utils/maqasidCalculator');

const PRODUCT_NAME = 'مرابحة السيارة';  // ID مرابحة السيارة

async function updateProduct() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ تم الاتصال بـ MongoDB');
        
        // بيانات Maqasid Score التجريبية لمرابحة السيارة
        const maqasidData = {
            gate: {
                g1: true,   // شهادة شرعية موجودة
                g2: true,   // عقد نموذجي متاح
                g3: true,   // منتج فعلي في السوق
                passed: true
            },
            indicators: {
                // محور حفظ المال (W)
                W1: 2,  // التكلفة معلنة بدقة
                W2: 2,  // الرسوم محددة
                W3: 1,  // السداد المبكر مسموح
                W4: 2,  // آلية الربح واضحة
                
                // محور العدل (J)
                J1: 2,  // المخاطر موثقة
                J2: 1,  // غرامة التأخير موضحة
                J3: 2,  // الإمهال موجود
                J4: 1,  // قناة شكاوى محدودة
                
                // محور الرواج (E)
                E1: 2,  // مرتبط بأصل حقيقي (سيارة)
                E2: 2,  // يخدم الاقتصاد
                E3: 1,  // التوزيع متوسط
                
                // محور الشفافية (T)
                T1: 2,  // العقد منشور
                T2: 2,  // الشهادة موثقة
                T3: 2,  // الشروط كاملة
                T4: 2,  // بيانات حديثة
                
                // محور يُسر العمل (A)
                A1: 1,  // 8 مستندات
                A2: 1,  // 30 يوم
                A3: 2   // طلب رقمي متاح
            },
            evidenceGrade: 'A',
            sourceUrl: 'https://www.salam-bank.dz/',
            verifiedAt: new Date(),
            reviewer: 'فريق مقاصدي',
            methodologyVersion: '0.1'
        };
        
        // احسب Maqasid Score
        const calculated = calculateMaqasidScore({ maqasid: maqasidData });
        
        // حدّث البيانات
        maqasidData.axes = calculated.axes;
        maqasidData.total = calculated.total;
        maqasidData.grade = calculated.grade;
        
        // احفظ في قاعدة البيانات
        const updated = await Product.findOneAndUpdate(
    { name: PRODUCT_NAME },
    { maqasid: maqasidData },
    { returnDocument: 'after' }
);
        
        if (!updated) {
            console.log('❌ المنتج غير موجود');
            process.exit(1);
        }
        
        console.log('✅ تم تحديث بيانات Maqasid Score');
        console.log('📊 النتيجة:', calculated.total + '/100');
        console.log('🏆 التصنيف:', calculated.grade);
        console.log('📈 المحاور:', calculated.axes);
        
        await mongoose.connection.close();
        console.log('🔌 تم إغلاق الاتصال');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ خطأ:', error.message);
        process.exit(1);
    }
}

updateProduct();