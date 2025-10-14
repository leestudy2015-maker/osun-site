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
      'catpage.tag': 'Category Library',
      'catpage.title': 'Explore Every Osun Category',
      'catpage.subtitle': 'Browse our full range of apparel, beauty rituals, and lifestyle services designed to celebrate your elegance.',
      'catpage.cta.primary': 'Shop featured styles',
      'catpage.cta.secondary': 'Jump to beauty',
      'catpage.section1.tag': 'Apparel',
      'catpage.section1.title': 'Wardrobe Foundations',
      'catpage.section1.desc': 'From day-to-night silhouettes to modest layers, discover the fits that make every moment yours.',
      'catpage.card.dresses.title': 'Statement Dresses',
      'catpage.card.dresses.desc': 'Romantic silhouettes, petite to plus sizing, and special-occasion exclusives.',
      'catpage.card.tops.title': 'Tops & Blouses',
      'catpage.card.tops.desc': 'Silk, satin, and breathable cotton staples tailored for tropical days.',
      'catpage.card.bottoms.title': 'Elevated Bottoms',
      'catpage.card.bottoms.desc': 'Wide-leg trousers, sculpted skirts, and denim with polished finishes.',
      'catpage.card.modest.title': 'Modest Layers',
      'catpage.card.modest.desc': 'Kaftans, abayas, and layering essentials that balance coverage and style.',
      'catpage.card.outerwear.title': 'Outerwear & Knits',
      'catpage.card.outerwear.desc': 'Lightweight blazers, cropped jackets, and textured knits for every climate.',
      'catpage.card.occasion.title': 'Occasionwear',
      'catpage.card.occasion.desc': 'Evening gowns, bridesmaid edits, and bespoke tailoring appointments.',
      'catpage.section2.tag': 'Beauty & Glow',
      'catpage.section2.title': 'Radiance Rituals',
      'catpage.section2.desc': 'Build your glow routine with clean skincare, artistry pigments, and sensorial treats.',
      'catpage.card.skincare.title': 'Glow Skincare Rituals',
      'catpage.card.skincare.desc': 'Cleansers, essences, serums, and creams curated for humid climates.',
      'catpage.card.makeup.title': 'Color Cosmetics',
      'catpage.card.makeup.desc': 'Skin-first foundations, multi-use palettes, and high-performance lip tints.',
      'catpage.card.body.title': 'Body & Wellness',
      'catpage.card.body.desc': 'Body scrubs, spa-grade oils, and at-home massage essentials.',
      'catpage.card.fragrance.title': 'Fragrance Library',
      'catpage.card.fragrance.desc': 'Bespoke perfumes, travel atomisers, and home scents to set the mood.',
      'catpage.card.beautytools.title': 'Beauty Tools',
      'catpage.card.beautytools.desc': 'Facial rollers, LED tech, and pro brushes vetted by our glow artists.',
      'catpage.card.giftsets.title': 'Gift Sets & Minis',
      'catpage.card.giftsets.desc': 'Ready-to-gift curation for bridesmaids, besties, and self-care moments.',
      'catpage.section3.tag': 'Lifestyle & Services',
      'catpage.section3.title': 'Beyond the Boutique',
      'catpage.section3.desc': 'Experience Osun through bespoke services and community-driven happenings.',
      'catpage.card.bridal.title': 'Bridal Studio',
      'catpage.card.bridal.desc': 'Made-to-measure gowns, veil styling, and premium fitting appointments.',
      'catpage.card.styling.title': 'Personal Styling',
      'catpage.card.styling.desc': 'One-on-one wardrobe edits and capsule-building sessions with our experts.',
      'catpage.card.workshops.title': 'Workshops & Events',
      'catpage.card.workshops.desc': 'Weekend masterclasses on skincare layering, mindful beauty, and styling.',
      'catpage.card.lounge.title': 'Lounge & Café',
      'catpage.card.lounge.desc': 'Sip artisanal tea, preview lookbooks, and enjoy member-only pop-ups.',
      'catpage.cta.title': 'Need a curated recommendation?',
      'catpage.cta.desc': 'Book a styling or beauty consultation and our team will handpick pieces that match your lifestyle.',
      'catpage.cta.button': 'Visit our boutique',
      'aboutpage.hero.tag': 'Our Founder Story',
      'aboutpage.hero.title': 'Elegance rooted in community.',
      'aboutpage.hero.subtitle': 'Osun began as a living room styling circle hosted by our founder, Madam Liyana Osman. Today we continue her tradition of personalised care with fashion and beauty that celebrates your glow.',
      'aboutpage.hero.cta': 'Meet Madam Liyana',
      'aboutpage.hero.secondary': 'Plan a visit',
      'aboutpage.owner.tag': 'Founder',
      'aboutpage.owner.title': 'Meet Madam Liyana Osman',
      'aboutpage.owner.story': 'Raised in Klang, Madam Liyana blended her Peranakan heritage with contemporary styling to help women feel confident at every milestone. She believes beauty is a ritual of care, and each Osun appointment honours that ritual.',
      'aboutpage.owner.quote': '“When a woman feels seen, her glow is unstoppable. Osun exists to light that glow.”',
      'aboutpage.owner.profile': 'Founder & Creative Director',
      'aboutpage.owner.name': 'Madam Liyana Osman',
      'aboutpage.owner.values': 'Her philosophy is anchored in kindness, craftsmanship, and the belief that confidence is nurtured through rituals.',
      'aboutpage.owner.detail1': '15+ years curating Southeast Asian designers.',
      'aboutpage.owner.detail2': 'Certified beauty therapist and wardrobe stylist.',
      'aboutpage.owner.detail3': 'Hosts monthly glow circles for the Osun community.',
      'aboutpage.values.tag': 'Philosophy',
      'aboutpage.values.title': 'Our guiding glow principles',
      'aboutpage.values.desc': 'Every collection, consultation, and event reflects the values Madam Liyana instilled in Osun.',
      'aboutpage.values.value1.title': 'Intentional Craft',
      'aboutpage.values.value1.desc': 'We partner with artisans and designers committed to fair practices and exquisite finishing.',
      'aboutpage.values.value2.title': 'Personal Rituals',
      'aboutpage.values.value2.desc': 'From custom fittings to facial mapping, every touchpoint is tailored to your lifestyle.',
      'aboutpage.values.value3.title': 'Community Glow',
      'aboutpage.values.value3.desc': 'We create safe, inclusive spaces where women encourage each other to shine.',
      'aboutpage.timeline.tag': 'Milestones',
      'aboutpage.timeline.title': 'How Osun blossomed',
      'aboutpage.timeline.desc': 'From humble beginnings to a beloved destination boutique, we continue to evolve with our community.',
      'aboutpage.timeline.1.title': '2010 · Living room fittings',
      'aboutpage.timeline.1.desc': 'Madam Liyana hosted intimate styling sessions for friends, testing fabrics and silhouettes tailored to Malaysian weather.',
      'aboutpage.timeline.2.title': '2015 · Boutique opening',
      'aboutpage.timeline.2.desc': 'Osun’s first storefront launched in Bayu Tinggi, combining fashion racks with a beauty treatment room.',
      'aboutpage.timeline.3.title': '2023 · Glow collective',
      'aboutpage.timeline.3.desc': 'We introduced glow circles, wellness workshops, and digital styling appointments for global clients.',
      'aboutpage.community.title': 'Join the glow community',
      'aboutpage.community.desc': 'RSVP to our upcoming masterclasses, seasonal lookbook launches, and founder-led conversations.',
      'aboutpage.community.cta': 'Book an in-store session',
      'admin.nav': 'Admin',
      'admin.title': 'Osun Content Studio',
      'admin.subtitle': 'Update homepage copy, surface new categories, and refresh hero imagery before publishing.',
      'admin.status.storage': 'Local save',
      'admin.status.storageDesc': 'Changes are stored in your browser. Export JSON when you are ready to push live.',
      'admin.status.workflow': 'Workflow tip',
      'admin.status.workflowDesc': 'After saving, share the export file with your web developer or replace content manually.',
      'admin.hero.heading': 'Homepage hero',
      'admin.hero.desc': 'Adjust the main headline, supporting copy, and call-to-action buttons.',
      'admin.hero.title': 'Hero title',
      'admin.hero.subtitle': 'Hero subtitle',
      'admin.hero.cta': 'Primary CTA',
      'admin.hero.secondary': 'Secondary CTA',
      'admin.hero.imageUrl': 'Hero image URL',
      'admin.hero.imageUpload': 'Upload new hero image',
      'admin.hero.save': 'Save hero section',
      'admin.hero.reset': 'Reset to defaults',
      'admin.preview.heading': 'Live preview',
      'admin.preview.desc': 'This preview reflects the text and image you save above.',
      'admin.categories.heading': 'Category library',
      'admin.categories.desc': 'Add new collections and reorder highlights for the categories page.',
      'admin.categories.export': 'Export JSON',
      'admin.categories.name': 'Category name',
      'admin.categories.description': 'Description',
      'admin.categories.group': 'Group',
      'admin.categories.group.apparel': 'Apparel',
      'admin.categories.group.beauty': 'Beauty',
      'admin.categories.group.lifestyle': 'Lifestyle',
      'admin.categories.add': 'Add',
      'admin.categories.table.name': 'Name',
      'admin.categories.table.description': 'Description',
      'admin.categories.table.group': 'Group',
      'admin.categories.table.actions': 'Actions',
      'admin.notes.heading': 'Publishing notes',
      'admin.notes.desc': 'Share the exported configuration or manually replace copy within the HTML files. For rapid updates, coordinate with your developer to connect these inputs to a CMS or headless backend.',
      'admin.notes.item1.prefix': 'Homepage hero updates live in',
      'admin.notes.item2.prefix': 'Category cards can be updated in',
      'admin.notes.item3.prefix': 'Founder story copy resides in',
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
      'foot.admin': 'Admin',
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
      'catpage.tag': '分類圖書館',
      'catpage.title': '探索所有 OSUN 分類',
      'catpage.subtitle': '瀏覽我們完整的時裝、美妝儀式與生活風格服務，綻放專屬優雅。',
      'catpage.cta.primary': '前往精選商品',
      'catpage.cta.secondary': '前往美妝分類',
      'catpage.section1.tag': '服飾',
      'catpage.section1.title': '衣櫥基礎',
      'catpage.section1.desc': '從日夜轉換的剪裁到優雅罩衫，挑選每一刻的理想穿搭。',
      'catpage.card.dresses.title': '特色洋裝',
      'catpage.card.dresses.desc': '浪漫版型、齊全尺碼與特殊場合限定款。',
      'catpage.card.tops.title': '上衣與襯衫',
      'catpage.card.tops.desc': '絲緞、棉質與透氣材質，為熱帶氣候打造。',
      'catpage.card.bottoms.title': '質感下身',
      'catpage.card.bottoms.desc': '寬褲、造型裙款與精緻牛仔，展現俐落風格。',
      'catpage.card.modest.title': '優雅層次',
      'catpage.card.modest.desc': '長袍、罩衫與穿搭內搭，兼顧修飾與風格。',
      'catpage.card.outerwear.title': '外套與針織',
      'catpage.card.outerwear.desc': '輕盈西外、短版外套與多樣針織，適應各種氣候。',
      'catpage.card.occasion.title': '盛宴禮服',
      'catpage.card.occasion.desc': '晚宴禮服、伴娘系列與訂製量身服務。',
      'catpage.section2.tag': '美妝與光采',
      'catpage.section2.title': '亮采儀式',
      'catpage.section2.desc': '以潔淨護膚、專業彩妝與感官療癒組合，打造每日光芒。',
      'catpage.card.skincare.title': '光采保養',
      'catpage.card.skincare.desc': '潔顏、精華、乳霜到面膜，為潮濕氣候精選。',
      'catpage.card.makeup.title': '彩妝藝術',
      'catpage.card.makeup.desc': '以肌膚為本的底妝、多功能彩盤與高持色唇彩。',
      'catpage.card.body.title': '身體與療癒',
      'catpage.card.body.desc': '身體磨砂、SPA 等級精油與居家按摩好物。',
      'catpage.card.fragrance.title': '香氛圖書館',
      'catpage.card.fragrance.desc': '客製香水、旅行瓶與居家香氛，營造專屬氛圍。',
      'catpage.card.beautytools.title': '美妝工具',
      'catpage.card.beautytools.desc': '臉部滾輪、LED 科技與專業刷具，經光采團隊認證。',
      'catpage.card.giftsets.title': '禮盒與迷你組',
      'catpage.card.giftsets.desc': '即刻送禮的精選組合，寵愛自己與閨蜜。',
      'catpage.section3.tag': '生活與服務',
      'catpage.section3.title': '超越精品店',
      'catpage.section3.desc': '透過訂製服務與社群活動，體驗 OSUN 的完整旅程。',
      'catpage.card.bridal.title': '新娘工作室',
      'catpage.card.bridal.desc': '量身訂製婚紗、頭紗造型與尊榮試裝預約。',
      'catpage.card.styling.title': '個人造型',
      'catpage.card.styling.desc': '專屬造型師陪伴整理衣櫥與打造膠囊衣櫥。',
      'catpage.card.workshops.title': '工作坊與活動',
      'catpage.card.workshops.desc': '週末課程涵蓋保養分層、心靈美學與穿搭分享。',
      'catpage.card.lounge.title': 'Lounge & 咖啡吧',
      'catpage.card.lounge.desc': '品嚐手沖茶飲、搶先看型錄，享受會員限定體驗。',
      'catpage.cta.title': '需要專屬建議嗎？',
      'catpage.cta.desc': '預約造型或美妝諮詢，讓團隊為你挑選最合適的單品。',
      'catpage.cta.button': '造訪門市',
      'aboutpage.hero.tag': '創辦人故事',
      'aboutpage.hero.title': '優雅源於社群。',
      'aboutpage.hero.subtitle': 'OSUN 由創辦人 Madam Liyana Osman 在客廳造型聚會中萌芽。今天，我們延續她的貼心服務，為你帶來專屬光芒的時尚與美妝。',
      'aboutpage.hero.cta': '認識 Liyana 女士',
      'aboutpage.hero.secondary': '預約門市',
      'aboutpage.owner.tag': '創辦人',
      'aboutpage.owner.title': '關於 Madam Liyana Osman',
      'aboutpage.owner.story': '出生於巴生的 Liyana 女士結合娘惹文化與現代造型，陪伴女性在每個重要時刻展現自信。她相信美是日常儀式，每一次 OSUN 服務都向這份儀式致敬。',
      'aboutpage.owner.quote': '「當一位女性被看見，她的光芒無可阻擋。OSUN 為此而存在。」',
      'aboutpage.owner.profile': '創辦人暨創意總監',
      'aboutpage.owner.name': 'Madam Liyana Osman',
      'aboutpage.owner.values': '她堅守善意、工藝與透過儀式培養自信的理念。',
      'aboutpage.owner.detail1': '15 年以上東南亞設計師策展經驗。',
      'aboutpage.owner.detail2': '具備美容治療師與造型師雙重證照。',
      'aboutpage.owner.detail3': '每月舉辦 OSUN 社群光采聚會。',
      'aboutpage.values.tag': '品牌理念',
      'aboutpage.values.title': '我們的光采準則',
      'aboutpage.values.desc': '每一季的商品、諮詢與活動都承載 Liyana 女士的品牌精神。',
      'aboutpage.values.value1.title': '精心工藝',
      'aboutpage.values.value1.desc': '與堅持公平製作、細膩手工的設計師合作。',
      'aboutpage.values.value2.title': '專屬儀式',
      'aboutpage.values.value2.desc': '從量身試衣到臉部分析，每一步都貼合你的生活。',
      'aboutpage.values.value3.title': '社群光芒',
      'aboutpage.values.value3.desc': '打造安全、包容的空間，彼此鼓勵綻放光彩。',
      'aboutpage.timeline.tag': '里程碑',
      'aboutpage.timeline.title': 'OSUN 的成長軌跡',
      'aboutpage.timeline.desc': '從溫馨的客廳到深受喜愛的精品門市，我們與社群一同成長。',
      'aboutpage.timeline.1.title': '2010 · 客廳試裝',
      'aboutpage.timeline.1.desc': 'Liyana 女士在家中與友人試布料、調整剪裁，打造適合大馬氣候的穿搭。',
      'aboutpage.timeline.2.title': '2015 · 門市開幕',
      'aboutpage.timeline.2.desc': 'OSUN 首間門市落腳 Bayu Tinggi，結合時裝陳列與美妝護理室。',
      'aboutpage.timeline.3.title': '2023 · Glow 社群',
      'aboutpage.timeline.3.desc': '推出光采圈聚、身心靈工作坊與線上造型諮詢，服務全球客戶。',
      'aboutpage.community.title': '加入光采社群',
      'aboutpage.community.desc': '立即報名即將到來的大師課、季節型錄發佈與創辦人對談。',
      'aboutpage.community.cta': '預約門市體驗',
      'admin.nav': '後台',
      'admin.title': 'OSUN 內容工作室',
      'admin.subtitle': '快速更新首頁文案、分類重點與主視覺，隨時保持網站新鮮。',
      'admin.status.storage': '本地儲存',
      'admin.status.storageDesc': '變更會保存於瀏覽器，準備上線時可匯出 JSON。',
      'admin.status.workflow': '流程提醒',
      'admin.status.workflowDesc': '儲存後，可將檔案交給工程師或手動套用至網站。',
      'admin.hero.heading': '首頁主視覺',
      'admin.hero.desc': '調整主標題、副文與行動按鈕文字。',
      'admin.hero.title': '主標題',
      'admin.hero.subtitle': '副標題',
      'admin.hero.cta': '主要行動按鈕',
      'admin.hero.secondary': '次要行動按鈕',
      'admin.hero.imageUrl': '主視覺圖片網址',
      'admin.hero.imageUpload': '上傳新圖片',
      'admin.hero.save': '儲存主視覺',
      'admin.hero.reset': '恢復預設',
      'admin.preview.heading': '即時預覽',
      'admin.preview.desc': '預覽你儲存的文字與圖片。',
      'admin.categories.heading': '分類管理',
      'admin.categories.desc': '新增集合並調整分類頁面的呈現。',
      'admin.categories.export': '匯出 JSON',
      'admin.categories.name': '分類名稱',
      'admin.categories.description': '描述',
      'admin.categories.group': '群組',
      'admin.categories.group.apparel': '服飾',
      'admin.categories.group.beauty': '美妝',
      'admin.categories.group.lifestyle': '生活',
      'admin.categories.add': '新增',
      'admin.categories.table.name': '名稱',
      'admin.categories.table.description': '描述',
      'admin.categories.table.group': '群組',
      'admin.categories.table.actions': '操作',
      'admin.notes.heading': '發佈提醒',
      'admin.notes.desc': '可將匯出的設定檔交給工程團隊，或手動複製到 HTML。建議後續串接 CMS 或 Headless 後台以自動化流程。',
      'admin.notes.item1.prefix': '首頁主視覺位於',
      'admin.notes.item2.prefix': '分類卡片可在此頁更新：',
      'admin.notes.item3.prefix': '創辦人故事內容位於',
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
      'foot.admin': '後台',
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
