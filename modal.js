// ==========================================
// نافذة تفاصيل المنتج (Product Details Modal)
// ==========================================

// دالة فتح النافذة
async function showProductDetails(productId) {
    try {
        // جلب تفاصيل المنتج من API
        const response = await fetch('/api/products/' + productId);
        const data = await response.json();
        
        if (!data.success) {
            console.error('❌ فشل جلب تفاصيل المنتج');
            return;
        }
        
        const product = data.data;
        displayModal(product);
        
    } catch (error) {
        console.error('❌ خطأ:', error);
    }
}

// دالة عرض النافذة
function displayModal(product) {
    // احذف أي نافذة قديمة
    const oldModal = document.getElementById('product-modal');
    if (oldModal) oldModal.remove();
    
    // أنشئ النافذة
    const modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
    modal.style.cssText = 'background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(10px);';
    
    modal.innerHTML = `
        <div class="bento-card rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" onclick="event.stopPropagation()">
            
            <!-- زر الإغلاق -->
            <button onclick="closeModal()" class="absolute top-4 left-4 w-10 h-10 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald hover:bg-brand-emerald hover:text-black transition flex items-center justify-center">
                <i class="fa-solid fa-times"></i>
            </button>
            
            <!-- الشارة والتقييم -->
            <div class="flex items-center justify-between mb-6 pt-2">
                <span class="px-4 py-2 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-sm font-bold">
                    ${product.type}
                </span>
                <div class="flex items-center gap-2 bg-brand-gold/10 px-4 py-2 rounded-full">
                    <i class="fa-solid fa-star text-brand-gold"></i>
                    <span class="text-brand-gold font-black">${product.rating}</span>
                </div>
            </div>
            
            <!-- العنوان والبنك -->
            <div class="mb-8">
                <div class="flex items-center gap-4 mb-3">
                    <div class="w-16 h-16 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center">
                        <i class="fa-solid ${product.icon} text-brand-emerald text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-3xl font-black text-white mb-1">${product.name}</h2>
                        <p class="text-slate-400">${product.bank}</p>
                    </div>
                </div>
            </div>
            
            <!-- البيانات الأساسية -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div class="bg-black/40 p-4 rounded-2xl border border-brand-border/40">
                    <div class="text-slate-400 text-sm font-semibold mb-2">المبلغ</div>
                    <div class="text-brand-emerald font-black">${product.amount}</div>
                </div>
                <div class="bg-black/40 p-4 rounded-2xl border border-brand-border/40">
                    <div class="text-slate-400 text-sm font-semibold mb-2">المدة</div>
                    <div class="text-brand-emerald font-black">${product.duration}</div>
                </div>
                <div class="bg-black/40 p-4 rounded-2xl border border-brand-border/40">
                    <div class="text-slate-400 text-sm font-semibold mb-2">نسبة الربح</div>
                    <div class="text-brand-emerald font-black">${product.rate}</div>
                </div>
            </div>
            
            <!-- الوصف -->
            <div class="mb-8">
                <h3 class="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-info-circle text-brand-emerald"></i>
                    وصف المنتج
                </h3>
                <p class="text-slate-300 leading-relaxed">
                    ${product.name} هو منتج مالي إسلامي مقدم من ${product.bank}، يعتمد على صيغة ${product.type} المتوافقة مع أحكام الشريعة الإسلامية ومقاصدها. يتميز بمرونة عالية في الشروط والأحكام، مما يجعله مناسباً لمختلف الفئات.
                </p>
            </div>
            
            <!-- الشروط -->
            <div class="mb-8">
                <h3 class="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-clipboard-check text-brand-emerald"></i>
                    الشروط
                </h3>
                <ul class="space-y-2 text-slate-300">
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check text-brand-emerald mt-1"></i>
                        <span>الالتزام بالضوابط الشرعية للمعاملات المالية الإسلامية.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check text-brand-emerald mt-1"></i>
                        <span>تقديم المستندات المطلوبة (بطاقة التعريف، إثبات الدخل).</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check text-brand-emerald mt-1"></i>
                        <span>ألا يكون العميل قد تعامل بالربا خلال السنوات الأخيرة.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check text-brand-emerald mt-1"></i>
                        <span>الموافقة على بنود العقد المتفق عليها.</span>
                    </li>
                </ul>
            </div>
            
            <!-- المزايا -->
            <div class="mb-8">
                <h3 class="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-star text-brand-gold"></i>
                    المزايا
                </h3>
                <ul class="space-y-2 text-slate-300">
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check-circle text-brand-emerald mt-1"></i>
                        <span>توافق تام مع أحكام الشريعة الإسلامية.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check-circle text-brand-emerald mt-1"></i>
                        <span>شفافية كاملة في التكاليف والرسوم.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check-circle text-brand-emerald mt-1"></i>
                        <span>مرونة في السداد حسب إمكانيات العميل.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check-circle text-brand-emerald mt-1"></i>
                        <span>خدمة عملاء متميزة ودعم مستمر.</span>
                    </li>
                </ul>
            </div>
            
            <!-- التقييم المقاصدي -->
            <div class="mb-8">
                <h3 class="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-scale-balanced text-brand-cyan"></i>
                    التقييم المقاصدي
                </h3>
                <div class="space-y-3">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-slate-300">حفظ المال</span>
                            <span class="text-brand-emerald font-bold">90%</span>
                        </div>
                        <div class="w-full bg-black/40 rounded-full h-2">
                            <div class="bg-gradient-to-r from-brand-emerald to-brand-cyan h-2 rounded-full" style="width: 90%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-slate-300">العدالة</span>
                            <span class="text-brand-emerald font-bold">85%</span>
                        </div>
                        <div class="w-full bg-black/40 rounded-full h-2">
                            <div class="bg-gradient-to-r from-brand-emerald to-brand-cyan h-2 rounded-full" style="width: 85%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-slate-300">الرواج الاقتصادي</span>
                            <span class="text-brand-emerald font-bold">80%</span>
                        </div>
                        <div class="w-full bg-black/40 rounded-full h-2">
                            <div class="bg-gradient-to-r from-brand-emerald to-brand-cyan h-2 rounded-full" style="width: 80%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- الأزرار -->
            <div class="grid grid-cols-2 gap-4">
                <button onclick="showToast('تمت إضافة ${product.name} للمفضلة')" class="py-4 rounded-2xl bg-gradient-to-r from-brand-emerald to-brand-cyan text-black font-black hover:opacity-90 transition">
                    <i class="fa-solid fa-heart ml-2"></i>
                    أضف للمفضلة
                </button>
                <button onclick="showToast('تمت إضافة ${product.name} للمقارنة'); closeModal();" class="py-4 rounded-2xl border border-brand-emerald text-brand-emerald font-bold hover:bg-brand-emerald/10 transition">
                    <i class="fa-solid fa-scale-balanced ml-2"></i>
                    أضف للمقارنة
                </button>
            </div>
            
        </div>
    `;
    
    // أضف النافذة إلى الصفحة
    document.body.appendChild(modal);
    
    // أغلق عند الضغط على الخلفية
    modal.addEventListener('click', closeModal);
    
    // أغلق عند الضغط على Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// دالة إغلاق النافذة
function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.remove();
    }
}