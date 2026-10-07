// =====// ==========================================
// 1. رسالة تأكيد التشغيل
// ==========================================
console.log("✅ JavaScript تعمل الآن في منصة مقاصدي.");

// ==========================================
// 2. إعادة بناء الشبكة تلقائياً (حل جذري)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('products');
    if (!section) return;

    // اجمع جميع البطاقات
    const allCards = Array.from(section.querySelectorAll('.bento-card'));
    console.log('📦 عدد البطاقات الموجودة: ' + allCards.length);

    // احذف الشبكات القديمة إن وجدت
    const oldGrid = document.getElementById('products-grid');
    if (oldGrid) {
        oldGrid.remove();
    }

    // أنشئ شبكة جديدة نظيفة
    const newGrid = document.createElement('div');
    newGrid.id = 'maqasidi-grid';
    newGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 28px;
        width: 100%;
        margin-top: 20px;
    `;

    // انقل جميع البطاقات إلى الشبكة الجديدة
    allCards.forEach(card => {
        newGrid.appendChild(card);
    });

    // أضف الشبكة إلى القسم
    section.appendChild(newGrid);

    // تجاوب الهواتف
    function adjustGrid() {
        if (window.innerWidth <= 767) {
            newGrid.style.gridTemplateColumns = '1fr';
        } else if (window.innerWidth <= 1024) {
            newGrid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
        } else {
            newGrid.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
        }
    }

    adjustGrid();
    window.addEventListener('resize', adjustGrid);

    console.log('✅ تم بناء الشبكة بنجاح: 3 أعمدة');
});

// ==========================================
// 3. دالة الفلترة
// ==========================================
function setFilter(category) {
    const products = document.querySelectorAll('.bento-card');
    const tabs = document.querySelectorAll('.filter-tab');
    let visibleCount = 0;

    tabs.forEach(function(tab) {
        if (tab.textContent.includes(category) || (category === 'الكل' && tab.textContent.includes('الكل'))) {
            tab.classList.add('active', 'bg-brand-emerald', 'text-black');
            tab.classList.remove('border', 'border-brand-emerald/30', 'text-brand-emerald');
        } else {
            tab.classList.remove('active', 'bg-brand-emerald', 'text-black');
            tab.classList.add('border', 'border-brand-emerald/30', 'text-brand-emerald');
        }
    });

    products.forEach(function(product) {
        const productText = product.textContent;
        let shouldShow = false;

        if (category === 'الكل') shouldShow = true;
        else if (category === 'تمويل') shouldShow = productText.includes('مرابحة') || (productText.includes('إجارة') && !productText.includes('صكوك')) || productText.includes('مشاركة') || productText.includes('استصناع') || productText.includes('سلم') || productText.includes('تورق');
        else if (category === 'استثمار') shouldShow = productText.includes('صكوك') || productText.includes('مضاربة');
        else if (category === 'ادخار') shouldShow = productText.includes('ادخار') || productText.includes('وديعة') || productText.includes('توفير') || productText.includes('قرض حسن');
        else if (category === 'خدمات') shouldShow = productText.includes('بطاقة') || productText.includes('تأمين') || productText.includes('تحويل') || productText.includes('كفالة');

        product.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) visibleCount++;
    });

    console.log('✅ تم عرض ' + visibleCount + ' منتج من تصنيف: ' + category);
}

// ==========================================
// 4. دالة البحث
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
// 5. دالة الإشعارات
// ==========================================
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
}// ==========================================
// 1. رسالة تأكيد التشغيل
// ==========================================
console.log("✅ JavaScript تعمل الآن في منصة مقاصدي.");

// ==========================================
// 2. إعادة بناء الشبكة تلقائياً (حل جذري)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('products');
    if (!section) return;

    // اجمع جميع البطاقات
    const allCards = Array.from(section.querySelectorAll('.bento-card'));
    console.log('📦 عدد البطاقات الموجودة: ' + allCards.length);

    // احذف الشبكات القديمة إن وجدت
    const oldGrid = document.getElementById('products-grid');
    if (oldGrid) {
        oldGrid.remove();
    }

    // أنشئ شبكة جديدة نظيفة
    const newGrid = document.createElement('div');
    newGrid.id = 'maqasidi-grid';
    newGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 28px;
        width: 100%;
        margin-top: 20px;
    `;

    // انقل جميع البطاقات إلى الشبكة الجديدة
    allCards.forEach(card => {
        newGrid.appendChild(card);
    });

    // أضف الشبكة إلى القسم
    section.appendChild(newGrid);

    // تجاوب الهواتف
    function adjustGrid() {
        if (window.innerWidth <= 767) {
            newGrid.style.gridTemplateColumns = '1fr';
        } else if (window.innerWidth <= 1024) {
            newGrid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
        } else {
            newGrid.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
        }
    }

    adjustGrid();
    window.addEventListener('resize', adjustGrid);

    console.log('✅ تم بناء الشبكة بنجاح: 3 أعمدة');
});

// ==========================================
// 3. دالة الفلترة
// ==========================================
function setFilter(category) {
    const products = document.querySelectorAll('.bento-card');
    const tabs = document.querySelectorAll('.filter-tab');
    let visibleCount = 0;

    tabs.forEach(function(tab) {
        if (tab.textContent.includes(category) || (category === 'الكل' && tab.textContent.includes('الكل'))) {
            tab.classList.add('active', 'bg-brand-emerald', 'text-black');
            tab.classList.remove('border', 'border-brand-emerald/30', 'text-brand-emerald');
        } else {
            tab.classList.remove('active', 'bg-brand-emerald', 'text-black');
            tab.classList.add('border', 'border-brand-emerald/30', 'text-brand-emerald');
        }
    });

    products.forEach(function(product) {
        const productText = product.textContent;
        let shouldShow = false;

        if (category === 'الكل') shouldShow = true;
        else if (category === 'تمويل') shouldShow = productText.includes('مرابحة') || (productText.includes('إجارة') && !productText.includes('صكوك')) || productText.includes('مشاركة') || productText.includes('استصناع') || productText.includes('سلم') || productText.includes('تورق');
        else if (category === 'استثمار') shouldShow = productText.includes('صكوك') || productText.includes('مضاربة');
        else if (category === 'ادخار') shouldShow = productText.includes('ادخار') || productText.includes('وديعة') || productText.includes('توفير') || productText.includes('قرض حسن');
        else if (category === 'خدمات') shouldShow = productText.includes('بطاقة') || productText.includes('تأمين') || productText.includes('تحويل') || productText.includes('كفالة');

        product.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) visibleCount++;
    });

    console.log('✅ تم عرض ' + visibleCount + ' منتج من تصنيف: ' + category);
}

// ==========================================
// 4. دالة البحث
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
// 5. دالة الإشعارات
// ==========================================
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