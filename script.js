// ==========================================
// 1. رسالة تأكيد التشغيل
// ==========================================
console.log("✅ JavaScript تعمل الآن في منصة مقاصدي.");

// ==========================================
// 2. دالة البحث
// ==========================================
function executeSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput && searchInput.value.trim() !== '') {
        alert('جاري البحث عن: ' + searchInput.value);
    } else {
        alert('الرجاء إدخال كلمة البحث أولاً.');
    }
}

// ==========================================
// دالة الفلترة الذكية (باستخدام قائمة صريحة)
// ==========================================
function setFilter(category) {
    const products = document.querySelectorAll('.bento-card');
    const tabs = document.querySelectorAll('.filter-tab');
    let visibleCount = 0;

    // قائمة المنتجات لكل تصنيف (سهلة التحديث)
    const categoryMap = {
        'تمويل': [
    'مرابحة السيارة',
    'مرابحة الأجهزة الإلكترونية',
    'مرابحة العقار',
    'إجارة منتهية بالتمليك',
    'مشاركة متنامية',
    'الاستصناع'
    'السلم',
],
        'استثمار': [
            'صكوك الإجارة',
            'مضاربة مطلقة',
            'صكوك المضاربة'
        ],
        'ادخار': [
            'حساب التوفير',
            'وديعةاستثمارية',
            'قرض حسن'
        ],
        'خدمات': [
            'بطاقة المرابحة',
            'التأمين التكافلي',
            'التحويلات المالية'
        ]
    };

    // تحديث شكل الأزرار
    tabs.forEach(function(tab) {
        if (tab.textContent.includes(category) || (category === 'الكل' && tab.textContent.includes('الكل'))) {
            tab.classList.add('active', 'bg-brand-emerald', 'text-black');
            tab.classList.remove('border', 'border-brand-emerald/30', 'text-brand-emerald');
        } else {
            tab.classList.remove('active', 'bg-brand-emerald', 'text-black');
            tab.classList.add('border', 'border-brand-emerald/30', 'text-brand-emerald');
        }
    });

    // فلترة البطاقات
    products.forEach(function(product) {
        const productText = product.textContent;
        let shouldShow = false;

        if (category === 'الكل') {
            shouldShow = true;
        } else if (categoryMap[category]) {
            // نبحث عن أي اسم منتج في القائمة داخل البطاقة
            shouldShow = categoryMap[category].some(function(productName) {
                return productText.includes(productName);
            });
        }

        if (shouldShow) {
            product.style.display = 'block';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });

    console.log('✅ تم عرض ' + visibleCount + ' منتج من تصنيف: ' + category);
}

// ==========================================
// 4. تشغيل عند تحميل الصفحة
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ تم تحميل الصفحة بنجاح!');
});