// ==========================================
// نظام المقارنة بين المنتجات
// ==========================================

const COMPARE_KEY = 'maqasidi_compare_list';
const MAX_COMPARE = 3;

// ==========================================
// جلب قائمة المقارنة من localStorage
// ==========================================
function getCompareList() {
    const list = localStorage.getItem(COMPARE_KEY);
    return list ? JSON.parse(list) : [];
}

// ==========================================
// حفظ قائمة المقارنة
// ==========================================
function saveCompareList(list) {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
    updateCompareButton();
}

// ==========================================
// إضافة منتج للمقارنة
// ==========================================
function addToCompare(product) {
    const list = getCompareList();
    
    // تحقق إذا كان المنتج مضافاً بالفعل
    if (list.find(p => p._id === product._id)) {
        showToast('⚠️ المنتج مضاف مسبقاً للمقارنة');
        return;
    }
    
    // تحقق من الحد الأقصى
    if (list.length >= MAX_COMPARE) {
        showToast('⚠️ يمكنك مقارنة ' + MAX_COMPARE + ' منتجات كحد أقصى');
        return;
    }
    
    list.push(product);
    saveCompareList(list);
    showToast('✅ تمت إضافة "' + product.name + '" للمقارنة');
}

// ==========================================
// إزالة منتج من المقارنة
// ==========================================
function removeFromCompare(productId) {
    const list = getCompareList();
    const newList = list.filter(p => p._id !== productId);
    saveCompareList(newList);
    showToast('🗑️ تم حذف المنتج من المقارنة');
    
    // إذا كانت نافذة المقارنة مفتوحة، حدّثها
    const compareModal = document.getElementById('compare-modal');
    if (compareModal) {
        if (newList.length >= 2) {
            showComparePage();
        } else {
            closeCompareModal();
        }
    }
}

// ==========================================
// إفراغ قائمة المقارنة
// ==========================================
function clearCompare() {
    localStorage.removeItem(COMPARE_KEY);
    updateCompareButton();
    closeCompareModal();
    showToast('🗑️ تم إفراغ قائمة المقارنة');
}

// ==========================================
// تحديث الزر العائم
// ==========================================
function updateCompareButton() {
    const list = getCompareList();
    let button = document.getElementById('compare-floating-btn');
    
    // إذا كانت القائمة فارغة، أخفِ الزر
    if (list.length === 0) {
        if (button) button.remove();
        return;
    }
    
    // إذا لم يوجد الزر، أنشئه
    if (!button) {
        button = document.createElement('button');
        button.id = 'compare-floating-btn';
        button.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-black font-black shadow-2xl hover:scale-105 transition-all';
        button.onclick = showComparePage;
        document.body.appendChild(button);
    }
    
    // تحديث المحتوى
    button.innerHTML = `
        <i class="fa-solid fa-scale-balanced text-xl"></i>
        <span>قارن (${list.length})</span>
    `;
}

// ==========================================
// عرض نافذة المقارنة
// ==========================================
function showComparePage() {
    const list = getCompareList();
    
    if (list.length < 2) {
        showToast('⚠️ اختر منتجين على الأقل للمقارنة');
        return;
    }
    
    // احذف أي نافذة قديمة
    const oldModal = document.getElementById('compare-modal');
    if (oldModal) oldModal.remove();
    
    // أنشئ النافذة
    const modal = document.createElement('div');
    modal.id = 'compare-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
    modal.style.cssText = 'background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);';
    
    // أنشئ رأس الجدول والأعمدة
    let tableHeaders = '<th class="p-4 text-right text-slate-400 font-bold">المعيار</th>';
    list.forEach(product => {
        tableHeaders += `
            <th class="p-4 text-center">
                <div class="flex flex-col items-center gap-2">
                    <div class="w-12 h-12 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center">
                        <i class="fa-solid ${product.icon} text-brand-emerald"></i>
                    </div>
                    <span class="text-white font-black">${product.name}</span>
                    <span class="text-slate-400 text-xs">${product.bank}</span>
                    <button onclick="removeFromCompare('${product._id}')" class="text-red-400 hover:text-red-300 text-xs mt-2">
                        <i class="fa-solid fa-times-circle"></i> إزالة
                    </button>
                </div>
            </th>
        `;
    });
    
    // جلب أفضل قيمة لكل معيار
    const bestRating = Math.max(...list.map(p => p.rating));
    
    // أنشئ صفوف الجدول
    const rows = [
        { label: 'التقييم العام', key: 'rating', getValue: p => p.rating + ' ⭐', best: p => p.rating === bestRating },
        { label: 'النوع', key: 'type', getValue: p => p.type, best: () => false },
        { label: 'المبلغ', key: 'amount', getValue: p => p.amount, best: () => false },
        { label: 'المدة', key: 'duration', getValue: p => p.duration, best: () => false },
        { label: 'نسبة الربح', key: 'rate', getValue: p => p.rate, best: () => false },
        { label: 'البنك', key: 'bank', getValue: p => p.bank, best: () => false }
    ];
    
    let tableRows = '';
    rows.forEach(row => {
        tableRows += `
            <tr class="border-t border-brand-border/30">
                <td class="p-4 text-slate-300 font-bold">${row.label}</td>
        `;
        list.forEach(product => {
            const isBest = row.best(product);
            const cellClass = isBest ? 'text-brand-gold font-black' : 'text-white font-bold';
            const bestIcon = isBest ? '<i class="fa-solid fa-trophy text-brand-gold mr-2"></i>' : '';
            tableRows += `
                <td class="p-4 text-center ${cellClass}">${bestIcon}${row.getValue(product)}</td>
            `;
        });
        tableRows += '</tr>';
    });
    
    modal.innerHTML = `
        <div class="bento-card rounded-3xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative" onclick="event.stopPropagation()">
            
            <!-- الرأس -->
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-black text-white flex items-center gap-3">
                    <i class="fa-solid fa-scale-balanced text-brand-emerald"></i>
                    مقارنة المنتجات
                </h2>
                <div class="flex gap-3">
                    <button onclick="clearCompare()" class="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold hover:bg-red-500/20 transition">
                        <i class="fa-solid fa-trash mr-1"></i> إفراغ الكل
                    </button>
                    <button onclick="closeCompareModal()" class="w-10 h-10 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald hover:bg-brand-emerald hover:text-black transition flex items-center justify-center">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            </div>
            
            <!-- الجدول -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b-2 border-brand-emerald/30">
                            ${tableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
            
            <!-- الخلاصة -->
            <div class="mt-8 p-6 rounded-2xl bg-gradient-to-r from-brand-emerald/10 to-brand-cyan/10 border border-brand-emerald/30">
                <h3 class="text-xl font-black text-white mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-lightbulb text-brand-gold"></i>
                    الخلاصة
                </h3>
                <p class="text-slate-300 leading-relaxed">
                    بناءً على المقارنة، المنتج صاحب أعلى تقييم هو 
                    <span class="text-brand-gold font-black">"${list.find(p => p.rating === bestRating).name}"</span>
                    بتقييم <span class="text-brand-gold font-black">${bestRating}</span> نجمة.
                    يُنصح باختيار المنتج الذي يناسب احتياجاتك من حيث المبلغ والمدة ونسبة الربح.
                </p>
            </div>
            
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', closeCompareModal);
}

// ==========================================
// إغلاق نافذة المقارنة
// ==========================================
function closeCompareModal() {
    const modal = document.getElementById('compare-modal');
    if (modal) modal.remove();
}

// ==========================================
// تشغيل عند تحميل الصفحة
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    updateCompareButton();
    console.log('✅ compare.js جاهز');
});