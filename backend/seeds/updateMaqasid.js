// ==========================================
// تحديث بيانات Maqasid Score لـ 5 منتجات
// ==========================================

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');
const { calculateMaqasidScore } = require('../utils/maqasidCalculator');

// ==========================================
// بيانات Maqasid Score لكل منتج
// ==========================================
const productsData = [
    {
        name: 'مرابحة السيارة',
        data: {
            gate: { g1: true, g2: true, g3: true, passed: true },
            indicators: {
                W1: 2, W2: 2, W3: 1, W4: 2,
                J1: 2, J2: 1, J3: 2, J4: 1,
                E1: 2, E2: 2, E3: 1,
                T1: 2, T2: 2, T3: 2, T4: 2,
                A1: 1, A2: 1, A3: 2
            },
            evidenceGrade: 'A',
            sourceUrl: 'https://www.salam-bank.dz/',
            verifiedAt: new Date(),
            reviewer: 'فريق مقاصدي',
            methodologyVersion: '0.1'
        }
    },
    {
        name: 'إجارة منتهية بالتمليك',
        data: {
            gate: { g1: true, g2: true, g3: true, passed: true },
            indicators: {
                W1: 2, W2: 1, W3: 1, W4: 2,
                J1: 2, J2: 2, J3: 2, J4: 1,
                E1: 2, E2: 2, E3: 2,
                T1: 2, T2: 2, T3: 2, T4: 2,
                A1: 2, A2: 2, A3: 2
            },
            evidenceGrade: 'A',
            sourceUrl: 'https://www.salam-bank.dz/',
            verifiedAt: new Date(),
            reviewer: 'فريق مقاصدي',
            methodologyVersion: '0.1'
        }
    },
    {
        name: 'مضاربة مطلقة',
        data: {
            gate: { g1: true, g2: true, g3: true, passed: true },
            indicators: {
                W1: 1, W2: 1, W3: 0, W4: 2,
                J1: 2, J2: 2, J3: 2, J4: 2,
                E1: 2, E2: 2, E3: 1,
                T1: 1, T2: 1, T3: 2, T4: 2,
                A1: 1, A2: 1, A3: 1
            },
            evidenceGrade: 'B',
            sourceUrl: 'https://www.salam-bank.dz/',
            verifiedAt: new Date(),
            reviewer: 'فريق مقاصدي',
            methodologyVersion: '0.1'
        }
    },
    {
        name: 'صكوك الإجارة',
        data: {
            gate: { g1: true, g2: true, g3: true, passed: true },
            indicators: {
                W1: 2, W2: 2, W3: 1, W4: 2,
                J1: 2, J2: 2, J3: 2, J4: 2,
                E1: 2, E2: 2, E3: 2,
                T1: 2, T2: 2, T3: 2, T4: 2,
                A1: 2, A2: 2, A3: 2
            },
            evidenceGrade: 'A',
            sourceUrl: 'https://www.baraka-bank.dz/',
            verifiedAt: new Date(),
            reviewer: 'فريق مقاصدي',
            methodologyVersion: '0.1'
        }
    },
    {
        name: 'التورق',
        data: {
            gate: { g1: true, g2: true, g3: true, passed: true },
            indicators: {
                W1: 1, W2: 1, W3: 0, W4: 0,
                J1: 1, J2: 1, J3: 1, J4: 1,
                E1: 0, E2: 0, E3: 1,
                T1: 1, T2: 1, T3: 1, T4: 1,
                A1: 1, A2: 1, A3: 1
            },
            evidenceGrade: 'B',
            sourceUrl: 'https://www.salam-bank.dz/',
            verifiedAt: new Date(),
            reviewer: 'فريق مقاصدي',
            methodologyVersion: '0.1'
        }
    }
];

// ==========================================
// تحديث المنتجات
// ==========================================
async function updateAllProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ تم الاتصال بـ MongoDB\n');
        
        for (const item of productsData) {
            const product = await Product.findOne({ name: item.name });
            
            if (!product) {
                console.log('❌ غير موجود: ' + item.name);
                continue;
            }
            
            const calculated = calculateMaqasidScore({ maqasid: item.data });
            
            item.data.axes = calculated.axes;
            item.data.total = calculated.total;
            item.data.grade = calculated.grade;
            
            await Product.findOneAndUpdate(
                { name: item.name },
                { maqasid: item.data },
                { returnDocument: 'after' }
            );
            
            console.log('✅ ' + item.name);
            console.log('   📊 ' + calculated.total + '/100 | 🏆 ' + calculated.grade);
            console.log('   📈 W:' + calculated.axes.wealth + ' J:' + calculated.axes.fairness + ' E:' + calculated.axes.circulation + ' T:' + calculated.axes.transparency + ' A:' + calculated.axes.accessibility);
            console.log('');
        }
        
        console.log('🎉 تم تحديث جميع المنتجات بنجاح!');
        await mongoose.connection.close();
        process.exit(0);
        
    } catch (error) {
        console.error('❌ خطأ:', error.message);
        process.exit(1);
    }
}

updateAllProducts();