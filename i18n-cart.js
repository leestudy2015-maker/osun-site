// Tailored UI interactions, i18n, and demo cart logic
(function(){
  const LANG_KEY = 'osun-lang';
  const CART_KEY = 'osun-cart';

  const dict = {
    en: {
      'bar.free': 'Free shipping',
      'bar.return': '7-day returns',
      'nav.shop': 'Shop',
      'nav.categories': 'Categories',
      'nav.beauty': 'Beauty',
      'nav.about': 'About',
      'nav.visit': 'Visit Us',
      'hero.title': 'Elegance. Confidence. Osun.',
      'hero.subtitle': 'Discover your radiance where fashion meets inner glow.',
      'hero.cta1': 'Shop Now',
      'hero.cta2': 'Explore Beauty',
      'cat.title': 'Shop by Category',
      'cat.viewall': 'View all',
      'cat.dresses': 'Dresses',
      'cat.tops': 'Tops & Blouses',
      'cat.beauty': 'Beauty',
      'feat.title': 'Featured Collections',
      'feat.subtitle': 'Hand-picked styles & glow kits.',
      'tag.bestseller': 'Best Seller',
      'tag.new': 'New',
      'tag.bundle': 'Bundle',
      'prod1.name': 'Floral Elegance Dress',
      'prod1.desc': 'Sizes XS–XL · 3 colors',
      'prod2.name': 'Summer Vibe Blouse',
      'prod2.desc': 'Soft-touch rayon',
      'prod3.name': 'Glow Beauty Set',
      'prod3.desc': 'Clean, cruelty-free',
      'btn.add': 'Add to Cart',
      'beauty.title': 'Beauty Rituals',
      'beauty.desc': 'Discover our curated selection of skincare and cosmetics that let your inner glow shine.',
      'beauty.cta': 'Book a Glow Consultation →',
      'beauty.prod1.name': 'Radiant Skin Kit',
      'beauty.prod1.desc': 'Vitamin-rich cleanser, toner & moisturizer for an effortless glow.',
      'beauty.prod2.name': 'Velvet Bloom Palette',
      'beauty.prod2.desc': 'Blendable pigments inspired by sunset florals for eyes & cheeks.',
      'beauty.prod3.name': 'Silk Touch Body Duo',
      'beauty.prod3.desc': 'Botanical scrub & body souffle to brighten and soften skin.',
      'about.title': 'About Osun',
      'about.text': 'Founded in Klang, Osun celebrates timeless elegance and everyday confidence. We curate fashion and beauty for women of all ages.',
      'about.point1.title': 'Curated Designers',
      'about.point1.desc': 'We handpick emerging Asian designers whose craftsmanship celebrates modern femininity.',
      'about.point2.title': 'Personal Styling',
      'about.point2.desc': 'Our stylists help you build outfits and routines that adapt to workdays and celebrations.',
      'about.point3.title': 'Community Events',
      'about.point3.desc': 'Join weekend workshops and glow sessions tailored for Osun insiders.',
      'visit.title': 'Visit Our Store',
      'visit.desc': 'Find us at Bayu Tinggi, Klang. Welcome to try on and shop.',
      'visit.addrTitle': 'Address',
      'visit.hours': 'Daily 10:00–20:00',
      'foot.shop': 'Shop',
      'foot.support': 'Support',
      'foot.follow': 'Follow',
      'pol.ship': 'Shipping',
      'pol.return': 'Returns',
      'pol.privacy': 'Privacy',
      'cart.title': 'Your Cart',
      'cart.subtotal': 'Subtotal',
      'cart.checkout': 'Checkout (Demo)',
      'cart.note': 'This is a demo cart. No real payments.',
      'cart.empty': 'Your cart is empty.',
      'cart.remove': 'Remove',
      'cart.qty': 'Qty',
      'toast.added': 'Added to cart'
    },
    zh: {
      'bar.free': '滿 MYR 300 免運',
      'bar.return': '7 天鑑賞期',
      'nav.shop': '購物',
      'nav.categories': '分類',
      'nav.beauty': '美妝',
      'nav.about': '關於我們',
      'nav.visit': '門市資訊',
      'hero.title': '明亮自信．OSUN',
      'hero.subtitle': '在時尚與內在光芒之間，找到屬於你的自信。',
      'hero.cta1': '立即選購',
      'hero.cta2': '探索美妝',
      'cat.title': '依分類選購',
      'cat.viewall': '查看全部',
      'cat.dresses': '洋裝',
      'cat.tops': '上衣與襯衫',
      'cat.beauty': '美妝保養',
      'feat.title': '精選系列',
      'feat.subtitle': '嚴選穿搭與發光保養。',
      'tag.bestseller': '熱銷',
      'tag.new': '新品',
      'tag.bundle': '組合',
      'prod1.name': '花漾優雅洋裝',
      'prod1.desc': 'XS–XL 尺寸 · 3 色',
      'prod2.name': '夏日氛圍上衣',
      'prod2.desc': '輕柔人造絲',
      'prod3.name': '發光美肌組',
      'prod3.desc': '潔淨配方 · 無動物實驗',
      'btn.add': '加入購物車',
      'beauty.title': '美妝儀式',
      'beauty.desc': '精選護膚與彩妝，綻放你的內在光芒。',
      'beauty.cta': '預約專屬光澤諮詢 →',
      'beauty.prod1.name': '光采肌膚組',
      'beauty.prod1.desc': '富含維他命的潔顏、化妝水與乳霜，打造自然亮澤。',
      'beauty.prod2.name': '絲絨花漾盤',
      'beauty.prod2.desc': '靈感來自夕陽花朵的多用途眼頰彩盤。',
      'beauty.prod3.name': '絲柔身體雙重奏',
      'beauty.prod3.desc': '植物磨砂與身體舒芙蕾，提亮並柔嫩肌膚。',
      'about.title': '關於 OSUN',
      'about.text': 'OSUN 源於巴生，堅信每個人都值得擁有優雅與自信。我們為不同年齡層精選時尚與美妝。',
      'about.point1.title': '嚴選設計師',
      'about.point1.desc': '聚焦亞洲新銳設計師，呈現現代女性的手作工藝。',
      'about.point2.title': '專屬造型服務',
      'about.point2.desc': '造型顧問協助你打造適合工作與宴會的多元穿搭。',
      'about.point3.title': '社群活動',
      'about.point3.desc': '週末工作坊與保養沙龍，為 OSUN 會員量身打造。',
      'visit.title': '歡迎光臨門市',
      'visit.desc': '門市位於巴生 Bayu Tinggi，歡迎親臨試穿選購。',
      'visit.addrTitle': '地址',
      'visit.hours': '每日 10:00–20:00',
      'foot.shop': '購物',
      'foot.support': '支援',
      'foot.follow': '追蹤我們',
      'pol.ship': '運送政策',
      'pol.return': '退換貨',
      'pol.privacy': '隱私權',
      'cart.title': '購物車',
      'cart.subtotal': '小計',
      'cart.checkout': '前往結帳（示意）',
      'cart.note': '此為示範購物車，無實際金流。',
      'cart.empty': '購物車是空的。',
      'cart.remove': '移除',
      'cart.qty': '數量',
      'toast.added': '已加入購物車'
    }
  };

  const PRODUCTS = {
    p1: { id: 'p1', price: 279, image: 'product1.jpg', i18nNameKey: 'prod1.name' },
    p2: { id: 'p2', price: 169, image: 'dress_pink.jpg', i18nNameKey: 'prod2.name' },
    p3: { id: 'p3', price: 329, image: 'model1.png', i18nNameKey: 'prod3.name' }
  };

  function getSavedLang(){
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && dict[stored]) return stored;
    if (navigator.language && navigator.language.startsWith('zh')) return 'zh';
    return 'en';
  }

  function getDict(lang){
    return dict[lang] || dict.en;
  }

  function getText(key){
    const lang = localStorage.getItem(LANG_KEY) || getSavedLang();
    return getDict(lang)[key] || getDict('en')[key] || key;
  }

  function applyLang(lang){
    const selected = dict[lang] ? lang : 'en';
    document.documentElement.lang = selected === 'zh' ? 'zh-Hant' : 'en';
    const map = getDict(selected);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (map[key]) el.textContent = map[key];
    });
    localStorage.setItem(LANG_KEY, selected);
    renderCart();
  }

  function loadCart(){
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err){
      console.warn('Failed to parse cart from storage', err);
      return [];
    }
  }

  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function calcCount(cart){
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function calcSubtotal(cart){
    return cart.reduce((sum, item) => sum + (item.qty * (PRODUCTS[item.id]?.price || 0)), 0);
  }

  function updateCartCount(){
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    badge.textContent = String(calcCount(loadCart()));
  }

  function formatMYR(amount){
    return `MYR ${amount.toFixed(2)}`;
  }

  function getProductName(product){
    return getText(product.i18nNameKey);
  }

  function renderCart(){
    const listEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    if (!listEl || !subtotalEl) return;

    const cart = loadCart();
    listEl.innerHTML = '';

    if (!cart.length){
      const empty = document.createElement('p');
      empty.className = 'text-gray-500 text-sm';
      empty.textContent = getText('cart.empty');
      listEl.appendChild(empty);
      subtotalEl.textContent = formatMYR(0);
      return;
    }

    cart.forEach(item => {
      const product = PRODUCTS[item.id];
      if (!product) return;
      const row = document.createElement('div');
      row.className = 'flex gap-3 items-center border rounded-xl p-3';
      row.innerHTML = `
        <img src="${product.image}" alt="${getProductName(product)}" class="w-16 h-16 object-cover rounded-lg" />
        <div class="flex-1 min-w-0">
          <p class="font-medium truncate">${getProductName(product)}</p>
          <p class="text-sm text-gray-500">${formatMYR(product.price)}</p>
          <div class="mt-2 flex items-center gap-2 text-sm">
            <button class="px-2 py-1 border rounded" data-action="dec" data-id="${product.id}" aria-label="Decrease">−</button>
            <span class="min-w-[2ch] text-center">${item.qty}</span>
            <button class="px-2 py-1 border rounded" data-action="inc" data-id="${product.id}" aria-label="Increase">+</button>
            <button class="ml-3 text-red-600 hover:underline" data-action="remove" data-id="${product.id}">${getText('cart.remove')}</button>
          </div>
        </div>`;
      listEl.appendChild(row);
    });

    subtotalEl.textContent = formatMYR(calcSubtotal(cart));
  }

  function addToCart(productId){
    const cart = loadCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index >= 0){
      cart[index].qty += 1;
    } else {
      cart.push({ id: productId, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
    renderCart();
    showToast(getText('toast.added'));
  }

  function changeQty(productId, delta){
    const cart = loadCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index === -1) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0){
      cart.splice(index, 1);
    }
    saveCart(cart);
    updateCartCount();
    renderCart();
  }

  function removeItem(productId){
    const updated = loadCart().filter(item => item.id !== productId);
    saveCart(updated);
    updateCartCount();
    renderCart();
  }

  function toggleMobileMenu(){
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('menu-toggle');
    if (!menu || !toggle) return;
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('hidden');
  }

  function openCart(){
    const drawer = document.querySelector('#cart-drawer aside');
    const mask = document.getElementById('cart-mask');
    const wrap = document.getElementById('cart-drawer');
    if (!drawer || !mask || !wrap) return;
    wrap.classList.remove('hidden');
    requestAnimationFrame(() => {
      drawer.classList.remove('translate-x-full');
      mask.classList.remove('opacity-0');
      mask.classList.add('opacity-100');
    });
    renderCart();
  }

  function closeCart(){
    const drawer = document.querySelector('#cart-drawer aside');
    const mask = document.getElementById('cart-mask');
    const wrap = document.getElementById('cart-drawer');
    if (!drawer || !mask || !wrap) return;
    drawer.classList.add('translate-x-full');
    mask.classList.remove('opacity-100');
    mask.classList.add('opacity-0');
    setTimeout(() => wrap.classList.add('hidden'), 250);
  }

  function showToast(message){
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'fixed left-1/2 -translate-x-1/2 top-5 z-[60] bg-gray-900 text-white text-sm px-4 py-2 rounded-full shadow-elev opacity-0';
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transition = 'opacity .25s, transform .25s';
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(8px)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(0)';
      setTimeout(() => toast.remove(), 250);
    }, 1300);
  }

  function initEvents(){
    const zhBtn = document.getElementById('lang-zh');
    const enBtn = document.getElementById('lang-en');
    zhBtn?.addEventListener('click', () => applyLang('zh'));
    enBtn?.addEventListener('click', () => applyLang('en'));

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.productId));
    });

    document.getElementById('cart-open')?.addEventListener('click', openCart);
    document.getElementById('cart-close')?.addEventListener('click', closeCart);
    document.getElementById('cart-mask')?.addEventListener('click', closeCart);

    document.getElementById('menu-toggle')?.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        if (menu && !menu.classList.contains('hidden')) toggleMobileMenu();
      });
    });

    document.getElementById('cart-items')?.addEventListener('click', event => {
      const target = event.target.closest('[data-action]');
      if (!target) return;
      const id = target.getAttribute('data-id');
      const action = target.getAttribute('data-action');
      if (action === 'inc') changeQty(id, 1);
      if (action === 'dec') changeQty(id, -1);
      if (action === 'remove') removeItem(id);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });
    applyLang(getSavedLang());
    updateCartCount();
    renderCart();
    initEvents();
  });
})();
