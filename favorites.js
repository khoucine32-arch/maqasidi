// ==========================================
// نظام المفضلة (Favorites System)
// ==========================================

const FAVORITES_KEY = 'maqasidi_favorites_list';

// ==========================================
// جلب قائمة المفضلة
// ==========================================
function getFavorites() {
    const list = localStorage.getItem(FAVORITES_KEY);
    return list ? JSON.parse(list) : [];
}

// ==========================================
// حفظ قائمة المفضلة
// ==========================================
function saveFavorites(list) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
    updateFavoritesButton();
}

// ==========================================
// التحقق إذا كان المنتج في المفضلة
// ==========================================
function isFavorite(productId) {
    const list = getFavorites();
    return list.some(p => p._id === productId);
}

// ==========================================
// إضافة منتج للمفضلة
// ==========================================
function addToFavorite(product) {
    const list = getFavorites();
    
    if (list.some(p => p._id === product._id)) {
        showToast('💛 المنتج موجود بالفعل في المفضلة');
        return;
    }
    
    list.push(product);
    saveFavorites(list);
    showToast('❤️ تمت إضافة "' + product.name + '" للمفضلة');
}

// ==========================================
// إزالة منتج من المفضلة
// ==========================================
function removeFromFavorite(productId) {
    const list = getFavorites();
    const newList = list.filter(p => p._id !== productId);
    saveFavorites(newList);
    showToast('🗑️ تم حذف المنتج من المفضلة');
    
    // إذا كانت النافذة مفتوحة، حدّثها
    const favModal = document.getElementById('favorites-modal');
    if (favModal) {
        if (newList.length > 0) {
            showFavoritesPage();
        } else {
            closeFavoritesModal();
        }
    }
}

// ==========================================
// إفراغ المفضلة
// ==========================================
function clearFavorites() {
    localStorage.removeItem(FAVORITES_KEY);
    updateFavoritesButton();
    closeFavoritesModal();
    showToast('🗑️ تم إفراغ قائمة المفضلة');
}

// ==========================================
// تحديث الزر العائم
// ==========================================
function updateFavoritesButton() {
    const list = getFavorites();
    let button = document.getElementById('favorites-floating-btn');
    
    if (list.length === 0) {
        if (button) button.remove();
        return;
    }
    
    if (!button) {
        button = document.createElement('button');
        button.id = 'favorites-floating-btn';
        button.className = 'fixed bottom-6 left-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-black shadow-2xl hover:scale-105 transition-all';
        button.onclick = showFavoritesPage;
        document.body.appendChild(button);
    }
    
    button.innerHTML = `
        <i class="fa-solid fa-heart text-xl"></i>
        <span>مفضلاتي (${list.length})</span>
    `;
}

// ==========================================
// عرض صفحة المفضلة
// ==========================================
function showFavoritesPage() {
    const list = getFavorites();
    
    if (list.length === 0) {
        showToast('⚠️ لا توجد منتجات في المفضلة');
        return;
    }
    
    const oldModal = document.getElementById('favorites-modal');
    if (oldModal) oldModal.remove();
    
    // أنشئ بطاقات المفضلة
    let cardsHTML = '';
    list.forEach(product => {
        cardsHTML += `
            <div class="bento-card rounded-3xl p-6 relative group">
                <button onclick="removeFromFavorite('${product._id}')" class="absolute top-4 left-4 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition flex items-center justify-center text-xs">
                    <i class="fa-solid fa-times"></i>
                </button>
                
                <div class="flex items-center gap-3 mb-4 mt-6">
                    <div class="w-12 h-12 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center">
                        <i class="fa-solid ${product.icon} text-brand-emerald"></i>
                    </div>
                    <div>
                        <h3 class="text-white font-black">${product.name}</h3>
                        <p class="text-slate-400 text-xs">${product.bank}</p>
                    </div>
                </div>
                
                <div class="flex items-center justify-between mb-4">
                    <span class="px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-xs font-bold">${product.type}</span>
                    <div class="flex items-center gap-1">
                        <i class="fa-solid fa-star text-brand-gold text-xs"></i>
                        <span class="text-brand-gold font-black text-xs">${product.rating}</span>
                    </div>
                </div>
                
                <div class="bg-black/40 p-3 rounded-xl border border-brand-border/40 text-sm mb-4 space-y-2">
                    <div class="flex justify-between">
                        <span class="text-slate-400 text-xs">المبلغ:</span>
                        <span class="text-brand-emerald font-bold text-xs">${product.amount}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400 text-xs">المدة:</span>
                        <span class="text-brand-emerald font-bold text-xs">${product.duration}</span>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="closeFavoritesModal(); showProductDetails('${product._id}');" class="py-2 rounded-lg bg-brand-emerald text-black font-bold text-xs hover:bg-brand-gold transition">التفاصيل</button>
                    <button onclick='addToCompare(${JSON.stringify(product).replace(/'/g, "&#39;")});' class="py-2 rounded-lg border border-brand-emerald text-brand-emerald font-bold text-xs hover:bg-brand-emerald/10 transition">قارن</button>
                </div>
            </div>
        `;
    });
    
    const modal = document.createElement('div');
    modal.id = 'favorites-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
    modal.style.cssText = 'background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);';
    
    modal.innerHTML = `
        <div class="bento-card rounded-3xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative" onclick="event.stopPropagation()">
            
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-black text-white flex items-center gap-3">
                    <i class="fa-solid fa-heart text-pink-500"></i>
                    مفضلاتي <span class="text-brand-emerald">(${list.length})</span>
                </h2>
                <div class="flex gap-3">
                    <button onclick="clearFavorites()" class="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold hover:bg-red-500/20 transition text-sm">
                        <i class="fa-solid fa-trash mr-1"></i> إفراغ الكل
                    </button>
                    <button onclick="closeFavoritesModal()" class="w-10 h-10 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald hover:bg-brand-emerald hover:text-black transition flex items-center justify-center">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${cardsHTML}
            </div>
            
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', closeFavoritesModal);
}

// ==========================================
// إغلاق نافذة المفضلة
// ==========================================
function closeFavoritesModal() {
    const modal = document.getElementById('favorites-modal');
    if (modal) modal.remove();
}

// ==========================================
// تشغيل عند تحميل الصفحة
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    updateFavoritesButton();
    console.log('✅ favorites.js جاهز');
});