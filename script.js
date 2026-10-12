// ==========================================
// script.js - النسخة النظيفة
// ==========================================

// دالة الإشعارات
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    } else {
        alert(message);
    }
}

// دالة البحث
function executeSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    
    if (!searchInput || searchInput.value.trim() === '') {
        showToast('⚠️ الرجاء إدخال كلمة البحث أولاً.');
        return;
    }
    
    const query = searchInput.value.trim().toLowerCase();
    
    // ✅ محدد دقيق: فقط بطاقات المنتجات
    const products = document.querySelectorAll('#products-grid .bento-card');
    let visibleCount = 0;
    
    products.forEach(function(product) {
        const productText = product.textContent.toLowerCase();
        
        if (productText.includes(query)) {
            product.style.display = 'block';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    if (visibleCount > 0) {
        showToast('✅ تم العثور على ' + visibleCount + ' منتج');
    } else {
        showToast('❌ لا توجد نتائج للبحث عن "' + query + '"');
    }
    
    console.log('✅ نتائج البحث عن "' + query + '": ' + visibleCount + ' منتج');
}

// دالة الفلترة (للمنتجات الديناميكية)
function setFilter(category) {
    const products = document.querySelectorAll('.bento-card');
    const tabs = document.querySelectorAll('.filter-tab');
    let visibleCount = 0;

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
        const productCategory = product.getAttribute('data-category');
        let shouldShow = false;

        if (category === 'الكل') {
            shouldShow = true;
        } else if (productCategory === category) {
            shouldShow = true;
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

console.log('✅ script.js جاهز');
// ==========================================
// البحث الفوري عند الكتابة
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[type="text"]');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim().toLowerCase();
            
            // ✅ محدد دقيق: فقط بطاقات المنتجات
            const products = document.querySelectorAll('#products-grid .bento-card');
            
            if (query === '') {
                products.forEach(p => p.style.display = 'block');
                return;
            }
            
            products.forEach(function(product) {
                const productText = product.textContent.toLowerCase();
                if (productText.includes(query)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
});