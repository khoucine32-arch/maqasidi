// ==========================================
// حساب Maqasid Score
// ==========================================

// الأوزان (حسب الوثيقة)
const WEIGHTS = {
    wealth: 25,          // حفظ المال
    fairness: 25,        // العدل
    circulation: 20,     // الرواج الاقتصادي
    transparency: 20,    // الشفافية
    accessibility: 10    // يُسر العمل
};

// المؤشرات لكل محور
const AXES_INDICATORS = {
    wealth: ['W1', 'W2', 'W3', 'W4'],           // 4 مؤشرات × 2 = 8 نقاط
    fairness: ['J1', 'J2', 'J3', 'J4'],         // 4 × 2 = 8
    circulation: ['E1', 'E2', 'E3'],            // 3 × 2 = 6
    transparency: ['T1', 'T2', 'T3', 'T4'],     // 4 × 2 = 8
    accessibility: ['A1', 'A2', 'A3']           // 3 × 2 = 6
};

// ==========================================
// حساب درجة محور واحد
// ==========================================
function calculateAxisScore(indicators, axisName) {
    const indicatorsList = AXES_INDICATORS[axisName];
    let totalPoints = 0;
    const maxPoints = indicatorsList.length * 2;
    
    indicatorsList.forEach(function(key) {
        totalPoints += indicators[key] || 0;
    });
    
    // النسبة المئوية
    return Math.round((totalPoints / maxPoints) * 100);
}

// ==========================================
// حساب النتيجة الإجمالية
// ==========================================
function calculateMaqasidScore(product) {
    // 1. التحقق من البوابة الدخول
    const gate = product.maqasid?.gate || {};
    const gatePassed = gate.g1 && gate.g2 && gate.g3;
    
    if (!gatePassed) {
        return {
            gate: { ...gate, passed: false },
            axes: { wealth: 0, fairness: 0, circulation: 0, transparency: 0, accessibility: 0 },
            total: 0,
            grade: 'غير مقيم'
        };
    }
    
    // 2. حساب درجات المحاور
    const indicators = product.maqasid?.indicators || {};
    
    const axes = {
        wealth: calculateAxisScore(indicators, 'wealth'),
        fairness: calculateAxisScore(indicators, 'fairness'),
        circulation: calculateAxisScore(indicators, 'circulation'),
        transparency: calculateAxisScore(indicators, 'transparency'),
        accessibility: calculateAxisScore(indicators, 'accessibility')
    };
    
    // 3. حساب النتيجة الإجمالية
    let total = 0;
    for (const axis in axes) {
        total += (axes[axis] * WEIGHTS[axis]) / 100;
    }
    total = Math.round(total);
    
    // 4. تحديد التصنيف
    let grade;
    if (total >= 85) grade = 'ممتاز';
    else if (total >= 70) grade = 'جيد';
    else if (total >= 55) grade = 'مقبول';
    else grade = 'يحتاج تحسيناً';
    
    return {
        gate: { ...gate, passed: true },
        axes,
        total,
        grade
    };
}
// ==========================================
// التحقق من البوابة الفقهية (Fiqh Gate)
// ==========================================
function checkFiqhGate(product) {
    const gate = product.fiqhGate || {};
    
    const passed = 
        gate.contractValid === true &&
        gate.noRiba === true &&
        gate.noGharar === true &&
        gate.noMaysir === true &&
        gate.noInvalidConditions === true;
    
    return {
        contractValid: gate.contractValid || false,
        noRiba: gate.noRiba || false,
        noGharar: gate.noGharar || false,
        noMaysir: gate.noMaysir || false,
        noInvalidConditions: gate.noInvalidConditions || false,
        passed: passed,
        school: gate.school || 'مالكي',
        controversial: gate.controversial || false,
        controversyNote: gate.controversyNote || '',
        references: gate.references || []
    };
}

// ==========================================
// تصدير الدوال
// ==========================================
module.exports = {
    calculateMaqasidScore,
    calculateAxisScore,
    checkFiqhGate,
    WEIGHTS,
    AXES_INDICATORS
};
