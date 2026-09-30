// رسالة تأكيد التشغيل
console.log("مرحباً! JavaScript تعمل الآن في منصة مقاصدي.");

// دالة البحث: تظهر رسالة منبثقة
function executeSearch() {
    const searchInput = document.getElementById('hero-search');
    if (searchInput && searchInput.value.trim() !== '') {
        alert('جاري البحث عن: ' + searchInput.value);
    } else {
        alert('الرجاء إدخال كلمة البحث أولاً.');
    }
}

// دالة الفلترة: تظهر رسالة منبثقة
function setFilter(category) {
    alert('تم اختيار التصنيف: ' + category);
}