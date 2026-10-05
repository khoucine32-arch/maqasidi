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
// 3. دالة الفلترة الذكية - حسب التصنيف
// ==========================================
function setFilter(category) {
    const products = document.querySelectorAll('.bento-card');
    const tabs = document.querySelectorAll('.filter-tab');
    let visibleCount = 0;

    // تحديث شكل الأزرار (تفعيل الزر المختار)
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
        }
        // تمويل: مرابحة، إجارة، استصناع، سلم
        else if (category === 'تمويل') {
            shouldShow = productText.includes('مرابحة') || 
                        (productText.includes('إجارة') && !productText.includes('صكوك')) ||
                        productText.includes('استصناع') || 
                        productText.includes('سلم');
        }
        // استثمار: صكوك، مضاربة، مشاركة
        else if (category === 'استثمار') {
            shouldShow = productText.includes('صكوك') || 
                        productText.includes('مضاربة') || 
                        productText.includes('مشاركة');
        }
        // ادخار: وديعة، حساب توفير، قرض حسن
        else if (category === 'ادخار') {
            shouldShow = productText.includes('ادخار') || 
                        productText.includes('وديعة') || 
                        productText.includes('توفير') || 
                        productText.includes('قرض حسن');
        }
        // خدمات: بطاقة، تأمين، تحويل، كفالة
        else if (category === 'خدمات') {
            shouldShow = productText.includes('بطاقة') || 
                        productText.includes('تأمين') || 
                        productText.includes('تحويل') || 
                        productText.includes('كفالة') || 
                        productText.includes('ضمان');
        }
        // الفلترة القديمة (للتوافق)
        else if (category === 'صكوك') {
            shouldShow = productText.includes('صكوك');
        }
        else if (category === 'مرابحة') {
            shouldShow = productText.includes('مرابحة');
        }
        else if (category === 'إجارة') {
            shouldShow = productText.includes('إجارة') && !productText.includes('صكوك');
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