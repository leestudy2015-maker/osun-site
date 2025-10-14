// Init AOS
AOS.init();

// Mobile menu toggle
const menuBtn = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
}

// I18N dictionary (en, zh, ms)
const dict = {
  en: {
    bar: { free: "Free shipping", return: "7-day returns" },
    nav: { shop: "Shop", categories: "Categories", beauty: "Beauty", about: "About", visit: "Visit Us" },
    hero: { title: "Elegance. Confidence. Osun.", subtitle: "Discover your radiance where fashion meets inner glow." },
    cat: { title: "Shop by Category", viewall: "View all", dresses: "Dresses", tops: "Tops & Blouses", beauty: "Beauty" },
    feat: { title: "Featured Collections", subtitle: "Hand-picked styles & glow kits." },
    tag: { bestseller: "Best Seller" },
    prod1: { name: "Floral Elegance Dress", desc: "Sizes XS–XL · 3 colors" },
    btn: { add: "Add to Cart" },
    visit: { title: "Visit Our Store", desc: "Find us at Bayu Tinggi, Klang. Welcome to try on and shop.", addrTitle: "Address", hours: "Daily 10:00–20:00" },
    foot: { shop: "Shop", support: "Support", follow: "Follow" },
    pol: { ship: "Shipping", return: "Returns", privacy: "Privacy" },
    beauty: { desc: "Discover our curated selection of skincare and cosmetics that let your inner glow shine." },
    about: { text: "Founded in Klang, Osun celebrates timeless elegance and everyday confidence. We curate fashion and beauty for women of all ages." },
    cart: { title: "Your Cart", empty: "Your cart is empty.", checkout: "Checkout (Demo)", total: "Total" }
  },
  zh: {
    bar: { free: "消費滿 MYR 300 免運費", return: "七天內可退貨" },
    nav: { shop: "購物", categories: "分類", beauty: "美妝", about: "關於我們", visit: "親臨門市" },
    hero: { title: "優雅。自信。Osun。", subtitle: "在時尚與內在光芒的交會處，發現屬於你的璀璨。" },
    cat: { title: "依分類選購", viewall: "查看全部", dresses: "洋裝", tops: "上衣與襯衫", beauty: "美妝" },
    feat: { title: "精選商品", subtitle: "嚴選潮流服飾與美妝保養組合。" },
    tag: { bestseller: "熱銷" },
    prod1: { name: "優雅碎花洋裝", desc: "尺碼 XS–XL · 3 色" },
    btn: { add: "加入購物車" },
    visit: { title: "親臨門市", desc: "我們的實體店位於巴優高地 Klang，歡迎親臨試穿選購。", addrTitle: "地址", hours: "每日 10:00–20:00" },
    foot: { shop: "購物", support: "支援", follow: "追蹤我們" },
    pol: { ship: "運送", return: "退貨", privacy: "隱私" },
    beauty: { desc: "精選護膚與彩妝，綻放你的內在光芒。" },
    about: { text: "Osun 源於巴生，堅信每個人都值得擁有優雅與自信。我們為不同年齡層精選時尚與美妝。" },
    cart: { title: "購物車", empty: "購物車是空的。", checkout: "結帳（示範）", total: "小計" }
  },
  ms: {
    bar: { free: "Penghantaran percuma", return: "Pulangan 7 hari" },
    nav: { shop: "Kedai", categories: "Kategori", beauty: "Kecantikan", about: "Tentang Kami", visit: "Kunjungi Kami" },
    hero: { title: "Anggun. Yakin. Osun.", subtitle: "Serlahkan pesonamu di persimpangan fesyen dan keyakinan." },
    cat: { title: "Belanja mengikut kategori", viewall: "Lihat semua", dresses: "Gaun", tops: "Blus & Atasan", beauty: "Kecantikan" },
    feat: { title: "Koleksi Pilihan", subtitle: "Gaya terpilih & kit seri." },
    tag: { bestseller: "Terlaris" },
    prod1: { name: "Gaun Elegan Flora", desc: "Saiz XS–XL · 3 warna" },
    btn: { add: "Tambah ke Troli" },
    visit: { title: "Kunjungi Kedai Kami", desc: "Cari kami di Bayu Tinggi, Klang. Selamat mencuba & membeli-belah.", addrTitle: "Alamat", hours: "Setiap hari 10:00–20:00" },
    foot: { shop: "Kedai", support: "Sokongan", follow: "Ikuti" },
    pol: { ship: "Penghantaran", return: "Pemulangan", privacy: "Privasi" },
    beauty: { desc: "Terokai pilihan penjagaan kulit & kosmetik kami yang menyerlahkan seri dalaman anda." },
    about: { text: "Diasaskan di Klang, Osun meraikan keanggunan abadi dan keyakinan harian." },
    cart: { title: "Troli", empty: "Troli anda kosong.", checkout: "Daftar Keluar (Demo)", total: "Jumlah" }
  }
};

function applyLang(lang){
  const d = dict[lang] || dict.en;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.dataset.i18n.split('.');
    let t = d;
    keys.forEach(k => { if (t) t = t[k]; });
    if (typeof t === 'string') el.innerText = t;
  });
  localStorage.setItem('osun_lang', lang);
}

['lang-en','lang-zh','lang-ms'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', () => applyLang(id.split('-')[1]));
});
// Initial language
applyLang(localStorage.getItem('osun_lang') || 'en');

// Simple catalog & render
const catalog = [
  {id:'dress1', name:'Floral Elegance Dress', price:279, img:'assets/img/product1.jpg', tag:'bestseller'},
  {id:'dress2', name:'Ribbon Ruffle Dress', price:259, img:'assets/img/dress_pink.jpg'},
  {id:'dress3', name:'Classic Black Dress', price:239, img:'assets/img/dress_black.jpg'}
];
const beauty = [
  {id:'beauty1', name:'Glow Skin Care Set', price:199, img:'assets/img/model1.png'}
];

function productCard(p){
  return `<article class="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-elev transition transform hover:-translate-y-1" data-aos="zoom-in">
    <div class="relative">
      <img src="${p.img}" alt="${p.name}" class="w-full h-96 object-cover" />
      ${p.tag?`<span class="absolute left-3 top-3 bg-brand.red text-white text-xs font-semibold px-2 py-1 rounded-full" data-i18n="tag.${p.tag}">${dict.en.tag[p.tag]}</span>`:''}
    </div>
    <div class="p-4">
      <h3 class="font-semibold">${p.name}</h3>
      <p class="text-sm text-gray-500" data-i18n="prod1.desc">${dict.en.prod1.desc}</p>
      <div class="mt-3 flex items-center justify-between">
        <span class="text-brand.red font-bold">MYR ${p.price}</span>
        <button class="shine-btn add-to-cart rounded-full border px-4 py-2 text-sm hover:bg-gray-50" data-id="${p.id}" data-i18n="btn.add">${dict.en.btn.add}</button>
      </div>
    </div>
  </article>`;
}

function renderGrids(){
  document.getElementById('product-grid').innerHTML = catalog.map(productCard).join('');
  document.getElementById('beauty-grid').innerHTML = beauty.map(productCard).join('');
  // Re-bind add buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}
renderGrids();

// Cart (localStorage)
const CART_KEY = 'osun_cart';
function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)||'[]'); }catch{ return []; } }
function saveCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartCount(); renderCart(); }
function addToCart(id){
  const items = loadCart();
  const exist = items.find(i => i.id === id);
  if (exist) exist.qty += 1; else items.push({id, qty:1});
  saveCart(items);
}
function removeFromCart(id){
  saveCart(loadCart().filter(i => i.id !== id));
}
function updateQty(id, qty){
  const items = loadCart();
  const item = items.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty|0);
  saveCart(items);
}
function updateCartCount(){
  const count = loadCart().reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-count').innerText = count;
}
function renderCart(){
  const t = dict[localStorage.getItem('osun_lang')||'en'];
  const container = document.getElementById('cart-items');
  const items = loadCart();
  if (!items.length){ container.innerHTML = `<p>${t.cart.empty}</p>`; document.getElementById('cart-summary').innerText=''; return; }
  let total = 0;
  container.innerHTML = items.map(it => {
    const prod = [...catalog, ...beauty].find(p=>p.id===it.id);
    const line = prod.price * it.qty; total += line;
    return `<div class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
      <div class="flex items-center gap-4">
        <img src="${prod.img}" class="w-20 h-20 object-cover rounded-lg" alt="${prod.name}">
        <div>
          <p class="font-semibold">${prod.name}</p>
          <p class="text-sm text-gray-500">MYR ${prod.price}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <input type="number" min="1" value="${it.qty}" class="w-16 border rounded px-2 py-1" data-id="${it.id}" />
        <button class="px-3 py-1 border rounded remove" data-id="${it.id}">✕</button>
      </div>
    </div>`;
  }).join('');
  document.getElementById('cart-summary').innerText = `${t.cart.total}: MYR ${total.toFixed(2)}`;
  // bind qty and remove
  container.querySelectorAll('input[type=number]').forEach(inp => {
    inp.addEventListener('change', () => updateQty(inp.dataset.id, parseInt(inp.value,10)));
  });
  container.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click', ()=>removeFromCart(btn.dataset.id)));
}
updateCartCount(); renderCart();

document.getElementById('checkout-btn').addEventListener('click', ()=>{
  alert('Demo checkout — integrate Stripe/PayPal/FPX later.');
});

// Re-apply translations after dynamic renders
const origApplyLang = applyLang;
applyLang = function(lang){
  origApplyLang(lang);
  renderGrids();
  renderCart();
};
