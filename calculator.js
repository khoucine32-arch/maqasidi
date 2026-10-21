// ==========================================
// حاسبة التمويل (المرابحة) - مقاصدي
// ==========================================

function calculateMurabaha() {
    // 1. جلب القيم من الحقول
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const duration = parseFloat(document.getElementById('duration').value) || 0;
    const annualRate = parseFloat(document.getElementById('rate').value) || 0;

    // 2. التحقق من المدخلات
    if (amount <= 0 || duration <= 0 || annualRate < 0) {
        alert('الرجاء إدخال قيم صحيحة (المبلغ والمدة أكبر من صفر).');
        return;
    }

    // 3. حساب إجمالي الربح (نسبة سنوية × عدد السنوات)
    const years = duration / 12;
    const totalProfit = amount * (annualRate / 100) * years;

    // 4. حساب إجمالي المبلغ المدفوع
    const totalPaid = amount + totalProfit;

    // 5. حساب القسط الشهري
    const monthlyPayment = totalPaid / duration;

    // 6. عرض النتائج
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    document.getElementById('originalAmount').textContent = amount.toLocaleString('ar-DZ', { maximumFractionDigits: 0 });
    document.getElementById('totalProfit').textContent = totalProfit.toLocaleString('ar-DZ', { maximumFractionDigits: 0 });
    document.getElementById('totalPaid').textContent = totalPaid.toLocaleString('ar-DZ', { maximumFractionDigits: 0 });
    document.getElementById('monthlyPayment').textContent = monthlyPayment.toLocaleString('ar-DZ', { maximumFractionDigits: 0 });
}