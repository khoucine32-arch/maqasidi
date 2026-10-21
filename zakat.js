// ==========================================
// حاسبة الزكاة - مقاصدي
// ==========================================

// سعر غرام الذهب (قابل للتعديل)
const GOLD_PRICE_PER_GRAM = 12000; // دج

// نصاب الذهب (85 غرام)
const NISAB_GOLD_GRAMS = 85;

// نسبة الزكاة (2.5%)
const ZAKAT_RATE = 0.025;

function calculateZakat() {
    // 1. جلب القيم من الحقول
    const cash = parseFloat(document.getElementById('cash').value) || 0;
    const goldGrams = parseFloat(document.getElementById('gold').value) || 0;
    const stocks = parseFloat(document.getElementById('stocks').value) || 0;
    const debts = parseFloat(document.getElementById('debts').value) || 0;

    // 2. حساب قيمة الذهب
    const goldValue = goldGrams * GOLD_PRICE_PER_GRAM;

    // 3. حساب إجمالي الثروة
    const totalWealth = cash + goldValue + stocks;

    // 4. حساب الوعاء الزكوي (بعد خصم الديون)
    const zakatBase = totalWealth - debts;

    // 5. حساب النصاب (قيمة 85 غرام ذهب)
    const nisabValue = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM;

    // 6. التحقق من بلوغ النصاب
    const isNisabReached = zakatBase >= nisabValue;

    // 7. حساب الزكاة
    let zakatAmount = 0;
    if (isNisabReached && zakatBase > 0) {
        zakatAmount = zakatBase * ZAKAT_RATE;
    }

    // 8. عرض النتائج
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    document.getElementById('totalWealth').textContent = totalWealth.toLocaleString('ar-DZ');
    document.getElementById('zakatBase').textContent = zakatBase.toLocaleString('ar-DZ');
    document.getElementById('nisabStatus').textContent = isNisabReached ? '✅ نعم، بلغت النصاب' : '❌ لا، لم تبلغ النصاب';
    document.getElementById('zakatAmount').textContent = zakatAmount.toLocaleString('ar-DZ');
}