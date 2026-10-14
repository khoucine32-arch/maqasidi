const mongoose = require('mongoose');

// ==========================================
// نموذج المنتج مع Maqasid Score
// ==========================================

const productSchema = new mongoose.Schema({
    // ===== البيانات الأساسية =====
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['تمويل', 'استثمار', 'ادخار', 'خدمات']
    },
    type: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    amount: String,
    duration: String,
    rate: String,
    icon: String,
    
    // ===== التقييم بالنجوم (القديم - يبقى كمرجع) =====
    rating: {
        type: Number,
        default: 0
    },
    
    // ===== Maqasid Score (الجديد) =====
    maqasid: {
        // ----- البوابة الدخول -----
        gate: {
            g1: { type: Boolean, default: false },  // شهادة شرعية
            g2: { type: Boolean, default: false },  // عقد نموذجي
            g3: { type: Boolean, default: false },  // منتج فعلي
            passed: { type: Boolean, default: false }
        },
        
        // ----- المؤشرات (كل مؤشر: 0 أو 1 أو 2) -----
        indicators: {
            // محور حفظ المال (W)
            W1: { type: Number, default: 0, min: 0, max: 2 },  // إعلان التكلفة
            W2: { type: Number, default: 0, min: 0, max: 2 },  // الرسوم
            W3: { type: Number, default: 0, min: 0, max: 2 },  // السداد المبكر
            W4: { type: Number, default: 0, min: 0, max: 2 },  // آلية الربح
            
            // محور العدل (J)
            J1: { type: Number, default: 0, min: 0, max: 2 },  // توثيق المخاطر
            J2: { type: Number, default: 0, min: 0, max: 2 },  // غرامة التأخير
            J3: { type: Number, default: 0, min: 0, max: 2 },  // الإمهال
            J4: { type: Number, default: 0, min: 0, max: 2 },  // قناة الشكاوى
            
            // محور الرواج الاقتصادي (E)
            E1: { type: Number, default: 0, min: 0, max: 2 },  // ارتباط بأصل
            E2: { type: Number, default: 0, min: 0, max: 2 },  // توجيه اقتصادي
            E3: { type: Number, default: 0, min: 0, max: 2 },  // التوزيع الجغرافي
            
            // محور الشفافية (T)
            T1: { type: Number, default: 0, min: 0, max: 2 },  // نشر العقد
            T2: { type: Number, default: 0, min: 0, max: 2 },  // شهادة المطابقة
            T3: { type: Number, default: 0, min: 0, max: 2 },  // نشر الشروط
            T4: { type: Number, default: 0, min: 0, max: 2 },  // حداثة البيانات
            
            // محور يُسر العمل (A)
            A1: { type: Number, default: 0, min: 0, max: 2 },  // المستندات
            A2: { type: Number, default: 0, min: 0, max: 2 },  // مدة الرد
            A3: { type: Number, default: 0, min: 0, max: 2 }   // الطلب الرقمي
        },
        
        // ----- درجات المحاور (تُحسب تلقائياً) -----
        axes: {
            wealth: { type: Number, default: 0 },         // حفظ المال
            fairness: { type: Number, default: 0 },       // العدل
            circulation: { type: Number, default: 0 },    // الرواج
            transparency: { type: Number, default: 0 },   // الشفافية
            accessibility: { type: Number, default: 0 }   // يُسر العمل
        },
        
        // ----- النتيجة الإجمالية -----
        total: { type: Number, default: 0 },              // 0-100
        grade: { type: String, default: 'غير مقيم' },     // ممتاز/جيد/مقبول/يحتاج تحسيناً
        
        // ----- البيانات الوصفية -----
        evidenceGrade: { type: String, default: 'C' },    // A/B/C
        sourceUrl: String,
        verifiedAt: Date,
        reviewer: String,
        methodologyVersion: { type: String, default: '0.1' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);