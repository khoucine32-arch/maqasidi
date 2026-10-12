// ==========================================
// عرض المنتجات ديناميكياً من الـ API
// ==========================================

async function loadProducts() {
    try {
        console.log('🔄 جاري تحميل المنتجات من API...');
        
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (!data.success) {
            console.error('❌ فشل تحميل المنتجات');
            return;
        }
        
        const products = data.data;
        const section = document.getElementById('products');
        
        if (!section) {
            console.error('❌ لم يتم العثور على قسم المنتجات');
            return;
        }
        
        // احذف جميع الشبكات القديمة
        const oldGrids = section.querySelectorAll('#products-grid, #maqasidi-grid');
        oldGrids.forEach(g => g.remove());
        
        // أنشئ شبكة جديدة
        const grid = document.createElement('div');
        grid.id = 'products-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 28px;
            width: 100%;
            margin-top: 20px;
        `;
        section.appendChild(grid);
        
        // إنشاء بطاقة لكل منتج
        products.forEach(product => {
            const card = createProductCard(product);
            grid.appendChild(card);
        });
        
        // التجاوب
        function adjustGrid() {
            if (window.innerWidth <= 767) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (window.innerWidth <= 1024) {
                grid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
            } else {
                grid.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
            }
        }
        
        adjustGrid();
        window.addEventListener('resize', adjustGrid);
        
        console.log('✅ تم عرض ' + products.length + ' منتجاً بنجاح!');
        
    } catch (error) {
        console.error('❌ خطأ في تحميل المنتجات:', error);
    }
}

// ==========================================
// إنشاء بطاقة منتج واحدة
// ==========================================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bento-card rounded-3xl p-7 flex flex-col justify-between relative group';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-brand-emerald to-transparent"></div>
        <div>
            <div class="flex items-center justify-between mb-6">
                <span class="px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-xs font-bold">${product.type}</span>
                <div class="flex items-center gap-1.5 bg-brand-gold/10 px-3 py-1 rounded-full">
                    <i class="fa-solid fa-star text-brand-gold text-xs"></i>
                    <span class="text-brand-gold font-black text-xs">${product.rating}</span>
                </div>
            </div>
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h3 class="text-2xl font-black text-white mb-1">${product.name}</h3>
                    <p class="text-slate-400 text-sm">${product.bank}</p>
                </div>
                <div class="w-14 h-14 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center">
                    <i class="fa-solid ${product.icon} text-brand-emerald text-xl"></i>
                </div>
            </div>
            <div class="space-y-3 mb-6 p-4 rounded-2xl bg-black/30 border border-white/5">
                <div class="flex justify-between items-center">
                    <span class="text-slate-400 font-semibold text-sm">المبلغ:</span>
                    <span class="font-black text-brand-emerald text-sm">${product.amount}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-slate-400 font-semibold text-sm">المدة:</span>
                    <span class="font-black text-brand-emerald text-sm">${product.duration}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-slate-400 font-semibold text-sm">نسبة الربح:</span>
                    <span class="font-black text-brand-emerald text-sm">${product.rate}</span>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <button onclick="showProductDetails('${product._id}')" class="px-3 py-2 rounded-lg bg-brand-emerald text-black font-bold text-xs hover:bg-brand-gold transition">التفاصيل</button>
            <button onclick="showToast('إضافة ${product.name} للمقارنة')" class="px-3 py-2 rounded-lg border border-brand-emerald text-brand-emerald font-bold text-xs hover:bg-brand-emerald/10 transition">قارن</button>
        </div>
    `;
    
    return card;
}

// ==========================================
// تشغيل عند تحميل الصفحة
// ==========================================
document.addEventListener('DOMContentLoaded', loadProducts);