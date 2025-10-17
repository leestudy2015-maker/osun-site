(function(){
  const LANG_KEY = 'osun-lang';
  const CART_KEY = 'osun-cart';

  let aosInitialized = false;

  function initAOS(){
    if (aosInitialized) return;
    if (window.AOS && typeof window.AOS.init === 'function'){
      window.AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });
      aosInitialized = true;
    }
  }

  function initHeroOverlay(){
    const overlay = document.querySelector('.entry-overlay');
    const markReady = () => {
      if (!document.body.classList.contains('hero-ready')){
        document.body.classList.add('hero-ready');
      }
    };
    if (!overlay){
      markReady();
      return;
    }
    let resolved = false;
    const finalize = () => {
      if (resolved) return;
      resolved = true;
      overlay.remove();
      markReady();
    };
    overlay.addEventListener('animationend', event => {
      if (event.animationName === 'overlayOut') finalize();
    });
    setTimeout(finalize, 2400);
  }

  const dict = {
    en: {
      'bar.free': 'Free shipping',
      'bar.return': '7-day returns',
      'nav.shop': 'Shop',
      'nav.categories': 'Categories',
      'nav.beauty': 'Beauty',
      'nav.about': 'About',
      'nav.visit': 'Visit Us',
      'nav.admin': 'Admin',
      'hero.title': 'Elegance. Confidence. Osun.',
      'hero.subtitle': 'Discover your radiance where fashion meets inner glow.',
      'hero.cta1': 'Shop Now',
      'hero.cta2': 'Discover Our Story',
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
      'tag.restocked': 'Restocked',
      'tag.capsule': 'Capsule',
      'tag.limited': 'Limited',
      'tag.editor': 'Editor Pick',
      'tag.exclusive': 'Exclusive',
      'tag.couture': 'Couture',
      'prod1.name': 'Floral Elegance Dress',
      'prod1.desc': 'Sizes XS–XL · 3 colors',
      'prod2.name': 'Summer Vibe Blouse',
      'prod2.desc': 'Soft-touch rayon',
      'prod3.name': 'Glow Beauty Set',
      'prod3.desc': 'Clean, cruelty-free',
      'btn.add': 'Add to Cart',
      'beauty.title': 'Beauty Rituals',
      'beauty.heading': 'Glow inside out',
      'beauty.desc': 'Discover our curated selection of skincare and cosmetics that let your inner glow shine.',
      'beauty.cta': 'Book a Glow Consultation →',
      'beauty.prod1.name': 'Radiant Skin Kit',
      'beauty.prod1.desc': 'Vitamin-rich cleanser, toner & moisturizer for an effortless glow.',
      'beauty.prod2.name': 'Velvet Bloom Palette',
      'beauty.prod2.desc': 'Blendable pigments inspired by sunset florals for eyes & cheeks.',
      'beauty.prod3.name': 'Silk Touch Body Duo',
      'beauty.prod3.desc': 'Botanical scrub & body souffle to brighten and soften skin.',
      'visit.title': 'Visit Our Store',
      'visit.desc': 'Find us at Bayu Tinggi, Klang. Welcome to try on and shop.',
      'visit.addrTitle': 'Address',
      'visit.hours': 'Daily 10:00–20:00',
      'visit.map': 'Open in Google Maps',
      'foot.shop': 'Shop',
      'foot.support': 'Support',
      'foot.follow': 'Follow',
      'foot.admin': 'Admin',
      'pol.ship': 'Shipping',
      'pol.return': 'Returns',
      'pol.privacy': 'Privacy',
      'cart.title': 'Your Cart',
      'cart.subtotal': 'Subtotal',
      'cart.checkout': 'Secure checkout',
      'cart.note': 'This storefront is for demos only. Payments are simulated.',
      'cart.empty': 'Your cart is empty.',
      'cart.remove': 'Remove',
      'cart.qty': 'Qty',
      'toast.added': 'Added to cart',
      'flow.demo.welcome.title': 'Welcome to Osun',
      'flow.demo.welcome.desc': 'This is a demo checkout journey. Use the buttons below to simulate a multi-page flow.',
      'flow.demo.welcome.cta': 'Start checkout',
      'flow.demo.welcome.add': 'Add demo item',
      'flow.login.title': 'Member sign in',
      'flow.login.email': 'Member email',
      'flow.login.password': 'Password',
      'flow.login.submit': 'Sign in (demo)',
      'flow.login.notice': '* Demo only – continue as guest if you prefer.',
      'flow.login.firstTime.title': 'New here?',
      'flow.login.firstTime.desc': 'Checkout as a guest or create a member account for saved details.',
      'flow.login.guest': 'Guest checkout',
      'flow.login.register': 'Register (demo)',
      'flow.info.title': 'Shipping details',
      'flow.info.name': 'Full name',
      'flow.info.email': 'Email',
      'flow.info.phone': 'Phone number',
      'flow.info.city': 'City',
      'flow.info.district': 'District',
      'flow.info.address': 'Address',
      'flow.info.next': 'Continue',
      'flow.info.back': 'Previous',
      'flow.confirm.order': 'Order summary',
      'flow.confirm.customer': 'Shipping contact',
      'flow.confirm.missing': 'No customer details yet.',
      'flow.confirm.next': 'Proceed to payment',
      'flow.confirm.back': 'Previous',
      'flow.payment.title': 'Choose your payment method',
      'flow.payment.option.card': 'Pay with Visa / MasterCard (Stripe)',
      'flow.payment.option.tng': "Touch 'n Go (iPay88) — coming soon",
      'flow.payment.back': 'Previous',
      'flow.payment.cancel': 'Cancel',
      'flow.success.title': 'Payment successful 🎉',
      'flow.success.desc': 'Thank you for your order! A confirmation email is on the way (demo).',
      'flow.success.home': 'Back to home',
      'flow.cancel.title': 'Payment cancelled',
      'flow.cancel.desc': 'You can return to choose another payment method or edit your order.',
      'flow.cancel.retry': 'Retry payment',
      'flow.cancel.home': 'Back to home',
      'flow.summary.empty': 'Your cart is empty. Add an item to preview the order summary.',
      'flow.summary.subtotal': 'Subtotal',
      'flow.summary.total': 'Total',
      'checkout.hero.tag': 'Secure checkout',
      'checkout.hero.title': 'Finish your order in three mindful steps.',
      'checkout.hero.subtitle': 'Register, verify your phone by SMS, choose a payment method, and follow your glow parcel on its way to you.',
      'checkout.hero.secure': 'All payments are encrypted. Card data is never stored.',
      'checkout.hero.primaryCta': 'Start filling your details',
      'checkout.hero.secondaryCta': 'Jump to registration form',
      'checkout.flow.altTitle': 'Prefer a step-by-step experience?',
      'checkout.flow.altLink': 'Open the multi-page checkout',
      'checkout.progress.title': 'Your journey',
      'checkout.progress.desc': 'Follow the guided steps below. You can return to previous sections anytime.',
      'checkout.progress.account': 'Account',
      'checkout.progress.account.desc': 'Create profile',
      'checkout.progress.verify': 'Verify',
      'checkout.progress.verify.desc': 'SMS confirm',
      'checkout.progress.shipping': 'Shipping',
      'checkout.progress.shipping.desc': 'Address & delivery',
      'checkout.progress.payment': 'Payment',
      'checkout.progress.payment.desc': 'Select method',
      'checkout.progress.review': 'Confirm',
      'checkout.progress.review.desc': 'Review & track',
      'checkout.common.next': 'Save & continue',
      'checkout.common.back': 'Back',
      'checkout.account.title': 'Create your Osun profile',
      'checkout.account.desc': 'Save your contact details for faster glow deliveries.',
      'checkout.account.newTag': 'New to Osun?',
      'checkout.account.newTitle': 'First time shopping?',
      'checkout.account.newDesc': 'Create an Osun member account to save preferences and track parcels.',
      'checkout.account.newCtaPrimary': 'Register now',
      'checkout.account.newCtaSecondary': 'Continue as guest',
      'checkout.account.newHint': 'Complete the registration form below to continue.',
      'checkout.account.sectionTitle': 'New member registration',
      'checkout.account.sectionDesc': 'Enter your details below to store them for future checkouts.',
      'checkout.account.fullName': 'Full name',
      'checkout.account.fullName.placeholder': 'e.g. Liyana Osman',
      'checkout.account.email': 'Email',
      'checkout.account.email.placeholder': 'you@example.com',
      'checkout.account.password': 'Password',
      'checkout.account.password.placeholder': 'Create a secure password',
      'checkout.account.notes': 'Order notes (optional)',
      'checkout.account.notes.placeholder': 'Let us know about sizing preferences or delivery notes',
      'checkout.login.tag': 'Member access',
      'checkout.login.title': 'Member sign in',
      'checkout.login.desc': 'Sign in to load your saved addresses and orders.',
      'checkout.login.email': 'Email address',
      'checkout.login.email.placeholder': 'Registered email',
      'checkout.login.password': 'Password',
      'checkout.login.password.placeholder': 'Enter your account password',
      'checkout.login.submit': 'Sign in',
      'checkout.login.forgot': 'Forgot password?',
      'checkout.login.error': 'We could not find an account with those details. Please register below.',
      'checkout.login.success': 'Welcome back! Your saved details have been loaded.',
      'checkout.verify.title': 'Verify your phone number',
      'checkout.verify.desc': 'We will send a one-time code to keep your parcel updates secure.',
      'checkout.verify.phone': 'Mobile number',
      'checkout.verify.phone.placeholder': '+60 12-345 6789',
      'checkout.verify.send': 'Send SMS',
      'checkout.verify.code': 'Verification code',
      'checkout.verify.code.placeholder': 'Enter 6-digit code',
      'checkout.verify.resend': 'Resend code',
      'checkout.verify.skip': 'Skip SMS verification (demo)',
      'checkout.verify.skipHint': 'Use this during presentations if you prefer not to send a code.',
      'checkout.verify.next': 'Verify & continue',
      'checkout.verify.sent': 'Demo SMS code {{code}} sent to {{phone}}. Valid for 3 minutes.',
      'checkout.verify.wait': 'You can resend a code in {{seconds}}s.',
      'checkout.verify.success': 'Number verified. You can continue.',
      'checkout.verify.error': 'Please enter the six-digit code we sent to your phone.',
      'checkout.verify.mismatch': 'That code did not match. Please try again.',
      'checkout.verify.phoneError': 'Please enter a valid mobile number before requesting a code.',
      'checkout.verify.expired': 'Your code expired. Please request a new SMS.',
      'checkout.shipping.title': 'Where should we deliver?',
      'checkout.shipping.desc': 'Share your address and choose the delivery speed that fits your week.',
      'checkout.shipping.address': 'Street address',
      'checkout.shipping.address.placeholder': 'Apartment, street, and building details',
      'checkout.shipping.city': 'City',
      'checkout.shipping.city.placeholder': 'e.g. Klang',
      'checkout.shipping.state': 'State',
      'checkout.shipping.state.placeholder': 'e.g. Selangor',
      'checkout.shipping.postcode': 'Postcode',
      'checkout.shipping.postcode.placeholder': 'e.g. 41200',
      'checkout.shipping.speed': 'Delivery speed',
      'checkout.shipping.speed.standard': 'Standard (3-5 days)',
      'checkout.shipping.speed.express': 'Express (1-2 days)',
      'checkout.shipping.speed.pickup': 'In-store pickup',
      'checkout.shipping.next': 'Save shipping',
      'checkout.payment.title': 'Choose how you would like to pay',
      'checkout.payment.desc': 'We support major credit cards, e-wallets, and bank transfers.',
      'checkout.payment.method.visa': 'VISA / MasterCard',
      'checkout.payment.method.visa.badge': 'Card',
      'checkout.payment.method.visa.desc': 'Visa · MasterCard · Amex',
      'checkout.payment.method.fpx': 'FPX / Bank Transfer',
      'checkout.payment.method.fpx.badge': 'Bank',
      'checkout.payment.method.fpx.desc': 'Maybank · CIMB · RHB',
      'checkout.payment.method.ewallet': 'E-wallet',
      'checkout.payment.method.ewallet.badge': 'Wallet',
      'checkout.payment.method.ewallet.desc': "GrabPay · Touch 'n Go · Boost",
      'checkout.payment.cardName': 'Name on card',
      'checkout.payment.cardName.placeholder': 'As shown on card',
      'checkout.payment.cardNumber': 'Card number',
      'checkout.payment.cardNumber.placeholder': '0000 0000 0000 0000',
      'checkout.payment.cardExpiry': 'Expiry',
      'checkout.payment.cardCvv': 'CVV',
      'checkout.payment.cardCvv.placeholder': '3-4 digits',
      'checkout.payment.next': 'Review order',
      'checkout.payment.fillDemo': 'Fill demo card details',
      'checkout.payment.fillDemo.toast': 'Demo card details added. You can continue.',
      'checkout.review.title': 'Confirm your order',
      'checkout.review.desc': 'Double-check your information below. Submit to generate your tracking status instantly.',
      'checkout.review.place': 'Place order & start tracking',
      'checkout.review.error': 'We could not find your cart items. Please add products before checking out.',
      'checkout.summary.account': 'Account',
      'checkout.summary.contact': 'Contact',
      'checkout.summary.shipping': 'Shipping',
      'checkout.summary.payment': 'Payment',
      'checkout.summary.items': 'Order summary',
      'checkout.summary.method.visa': 'Visa / Mastercard',
      'checkout.summary.method.fpx': 'Online banking (FPX)',
      'checkout.summary.method.ewallet': 'E-wallet',
      'checkout.summary.subtotal': 'Subtotal',
      'checkout.summary.shippingFee': 'Shipping',
      'checkout.summary.total': 'Total',
      'checkout.summary.empty': 'Your cart is empty. Head back to the boutique to add items.',
      'checkout.success.tag': 'Order placed',
      'checkout.success.title': 'Your glow pieces are on the way',
      'checkout.success.subtitle': 'Track each milestone below and expect an SMS when your courier is nearby.',
      'checkout.success.trackingLabel': 'Tracking ID',
      'checkout.tracking.eta': 'Estimated delivery: {{date}}',
      'checkout.tracking.stage.ordered': 'Order confirmed',
      'checkout.tracking.stage.preparing': 'Preparing your pieces',
      'checkout.tracking.stage.shipped': 'Parcel dispatched',
      'checkout.tracking.stage.out': 'Out for delivery',
      'checkout.tracking.stage.pickup': 'Ready for pickup',
      'checkout.tracking.stage.note.ordered': 'We have received your order and sent a confirmation email.',
      'checkout.tracking.stage.note.preparing': 'Our stylists are carefully packing your garments.',
      'checkout.tracking.stage.note.shipped': 'Courier picked up your parcel. Tracking updates will refresh soon.',
      'checkout.tracking.stage.note.out': 'Your courier will contact you shortly before arrival.',
      'checkout.tracking.stage.note.pickup': 'Your order is ready for collection at the boutique front desk.',
      'catpage.hero.tag': 'Curated Categories',
      'catpage.hero.title': 'Dive into our boutique wardrobe library',
      'catpage.hero.subtitle': 'Swipe through seasonal edits and uncover the looks that keep your style effortless.',
      'catpage.hero.cta': 'Back to shop',
      'catpage.slider.hint': 'Swipe sideways to explore every look',
      'catpage.loading': 'Loading looks…',
      'catpage.inventory': 'Inventory',
      'catpage.empty': 'New looks coming soon',
      'catpage.card.defaultName': 'Coming soon',
      'catpage.wardrobe.tag': 'Wardrobe Foundations',
      'catpage.wardrobe.title': 'Everyday layers for your signature style.',
      'catpage.wardrobe.desc': 'Mix-and-match staples that balance polish and comfort from office hours to weekend brunch.',
      'catpage.wardrobe1.name': 'Lotus Wrap Dress',
      'catpage.wardrobe1.desc': 'Satin drape with adjustable waist ties and flutter sleeves.',
      'catpage.wardrobe1.stock': '12 pieces left',
      'catpage.wardrobe2.name': 'Citrine Co-ord Set',
      'catpage.wardrobe2.desc': 'Two-piece cotton set with cropped shirt and high-rise trousers.',
      'catpage.wardrobe2.stock': '18 sets available',
      'catpage.wardrobe3.name': 'Aura Pleat Skirt',
      'catpage.wardrobe3.desc': 'Weightless pleats with elastic comfort waistband.',
      'catpage.wardrobe3.stock': '24 skirts ready',
      'catpage.wardrobe4.name': 'Layered Essentials Pack',
      'catpage.wardrobe4.desc': 'Cardigan, slip, and scarf trio curated for effortless layering.',
      'catpage.wardrobe4.stock': '9 sets remaining',
      'catpage.ritual.tag': 'Lifestyle Rituals',
      'catpage.ritual.title': 'Comfort-led looks for slow mornings and mindful evenings.',
      'catpage.ritual.desc': 'Loungewear, weekend staples, and mindful textiles for every daily ritual.',
      'catpage.ritual1.name': 'Velvet Dawn Robe',
      'catpage.ritual1.desc': 'Plush lounge robe with detachable sash and deep pockets.',
      'catpage.ritual1.stock': '6 robes remaining',
      'catpage.ritual2.name': 'Weekend Glow Jumpsuit',
      'catpage.ritual2.desc': 'Relaxed-fit jumpsuit with breathable linen blend fabric.',
      'catpage.ritual2.stock': '20 pieces stocked',
      'catpage.ritual3.name': 'Sage Ritual Set',
      'catpage.ritual3.desc': 'Mindful knit top and culottes designed for stretch and breathability.',
      'catpage.ritual3.stock': '15 sets ready',
      'catpage.ritual4.name': 'Moonbeam Knit Dress',
      'catpage.ritual4.desc': 'Cozy rib-knit midi that drapes without clinging.',
      'catpage.ritual4.stock': '14 dresses in stock',
      'catpage.designer.tag': 'Designer Exclusives',
      'catpage.designer.title': 'Statement eveningwear crafted for unforgettable nights.',
      'catpage.designer.desc': 'Limited couture edits and bespoke gowns tailored by Southeast Asian designers.',
      'catpage.designer1.name': 'Aurora Beaded Gown',
      'catpage.designer1.desc': 'Hand-applied beadwork with illusion neckline and dramatic train.',
      'catpage.designer1.stock': '3 gowns remaining',
      'catpage.designer2.name': 'Celeste Column Dress',
      'catpage.designer2.desc': 'Structured satin silhouette with detachable overskirt.',
      'catpage.designer2.stock': '5 dresses available',
      'catpage.designer3.name': 'Nocturne Cape Dress',
      'catpage.designer3.desc': 'Sequinned cape overlay with minimalist slip base.',
      'catpage.designer3.stock': '4 dresses left',
      'catpage.designer4.name': 'Obsidian Velvet Suit',
      'catpage.designer4.desc': 'Tailored velvet tux with crystal lapel embellishments.',
      'catpage.designer4.stock': '2 suits remaining',
      'aboutpage.hero.tag': 'Our Founder Story',
      'aboutpage.hero.title': 'Elegance rooted in community.',
      'aboutpage.hero.subtitle': 'Osun began as a living room styling circle hosted by our founder, Madam Liyana Osman. Today we continue her tradition of personalised care with fashion and beauty that celebrates your glow.',
      'aboutpage.hero.cta': 'Meet Madam Liyana',
      'aboutpage.hero.secondary': 'Plan a visit',
      'aboutpage.owner.tag': 'Founder',
      'aboutpage.owner.title': 'Meet Madam Liyana Osman',
      'aboutpage.owner.story': 'Raised in Klang, Madam Liyana blended her Peranakan heritage with contemporary styling to help women feel confident at every milestone. She believes beauty is a ritual of care, and each Osun appointment honours that ritual.',
      'aboutpage.owner.quote': '“When a woman feels seen, her glow is unstoppable. Osun exists to light that glow.”',
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
      'admin.language.en': 'English',
      'admin.language.zh': 'Chinese',
      'admin.field.title': 'Title',
      'admin.field.subtitle': 'Subtitle',
      'admin.field.name': 'Name',
      'admin.field.description': 'Description',
      'admin.field.inventory': 'Inventory note',
      'admin.field.price': 'Price',
      'admin.field.badgeTheme': 'Badge theme',
      'admin.field.badgeText': 'Badge label',
      'admin.field.tag': 'Tag',
      'admin.field.story': 'Story',
      'admin.field.quote': 'Quote',
      'admin.field.altText': 'Alt text',
      'admin.field.ctaPrimary': 'Primary CTA',
      'admin.field.ctaSecondary': 'Secondary CTA',
      'admin.field.ctaText': 'CTA text',
      'admin.field.ctaLink': 'CTA link',
      'admin.field.imageUrl': 'Image URL',
      'admin.field.imageUpload': 'Upload image',
      'admin.field.highlight': 'Highlight',
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
      'admin.hero.primaryLink': 'Primary CTA link',
      'admin.hero.secondaryLink': 'Secondary CTA link',
      'admin.hero.imageUrl': 'Hero image URL',
      'admin.hero.imageUpload': 'Upload new hero image',
      'admin.hero.save': 'Save hero section',
      'admin.hero.reset': 'Reset to defaults',
      'admin.preview.heading': 'Live preview',
      'admin.preview.desc': 'This preview reflects the text and image you save above.',
      'admin.categories.heading': 'Category library',
      'admin.categories.desc': 'Add new collections and reorder highlights for the categories page.',
      'admin.categories.export': 'Export JSON',
      'admin.categories.add': 'Add item',
      'admin.categories.save': 'Save group',
      'admin.categories.empty': 'No looks yet — add your first highlight.',
      'admin.categories.moveUp': 'Move up',
      'admin.categories.moveDown': 'Move down',
      'admin.categories.remove': 'Remove',
      'admin.categories.theme.rose': 'Rose glow',
      'admin.categories.theme.amber': 'Amber',
      'admin.categories.theme.emerald': 'Emerald',
      'admin.categories.theme.slate': 'Slate',
      'admin.categories.theme.violet': 'Violet',
      'admin.categories.theme.sky': 'Sky',
      'admin.categories.table.name': 'Name',
      'admin.categories.table.description': 'Description',
      'admin.categories.table.group': 'Group',
      'admin.categories.group.apparel': 'Apparel',
      'admin.categories.group.beauty': 'Beauty',
      'admin.categories.group.lifestyle': 'Lifestyle',
      'admin.result.heroSaved': 'Homepage hero updated',
      'admin.result.categoriesSaved': 'Category group saved',
      'admin.result.aboutSaved': 'About page updated',
      'admin.nav.hero': 'Homepage',
      'admin.nav.categories': 'Categories',
      'admin.nav.about': 'About page',
      'admin.reset': 'Reset to defaults',
      'admin.reset.confirm': 'Restore the default Osun content? This will replace your current edits.',
      'admin.reset.success': 'Defaults restored. The live pages now reflect the original showcase content.',
      'admin.about.heading': 'About page',
      'admin.about.desc': 'Refresh founder stories, milestones, and community invitations.',
      'admin.about.heroSection': 'Hero intro',
      'admin.about.founderSection': 'Founder spotlight',
      'admin.about.valuesSection': 'Values',
      'admin.about.timelineSection': 'Timeline',
      'admin.about.communitySection': 'Community invite',
      'admin.about.founderHighlights': 'Founder highlights',
      'admin.about.values.item': 'Value',
      'admin.about.timeline.item': 'Milestone',
      'admin.about.save': 'Save about page',
      'admin.about.reset': 'Reset to defaults',
      'admin.notes.heading': 'Publishing notes',
      'admin.notes.desc': 'Share the exported configuration or manually replace copy within the HTML files. A condensed integration checklist is included below when you are ready to connect a CMS.',
      'admin.notes.item1.prefix': 'Homepage hero updates live in',
      'admin.notes.item2.prefix': 'Category cards can be updated in',
      'admin.notes.item3.prefix': 'Founder story copy resides in',
      'admin.integration.heading': 'Headless CMS integration guide',
      'admin.integration.desc': 'When you are ready to automate updates, follow the quick plan below or share it with your developer.',
      'admin.integration.step1': 'Connect a headless CMS such as Sanity, Contentful, or Strapi and recreate the hero, category, and about models that mirror the forms above.',
      'admin.integration.step2': 'Replace the demo fetch in js/content.js with live API calls, then hydrate the pages using the same data attributes.',
      'admin.integration.step3': 'Use the export JSON action as your migration seed and schedule webhooks so content saves trigger a redeploy or cache refresh.',
      'admin.integration.link': 'View the README integration checklist →',
      'admin.login.title': 'Secure admin access',
      'admin.login.subtitle': 'Enter the admin password to continue updating boutique content.',
      'admin.login.password': 'Admin password',
      'admin.login.submit': 'Unlock dashboard',
      'admin.login.hint': 'Need the password? Reach out to your Osun web partner.',
      'admin.login.error': 'Incorrect password. Please try again.',
      'admin.login.locked': 'Too many attempts. Please wait {{seconds}}s before trying again.',
      'admin.login.successTitle': 'Access granted',
      'admin.login.success': 'Welcome back — the content studio is now unlocked.',
      'admin.result.success': 'Update saved',
      'admin.result.nameFallback': 'Untitled entry',
      'admin.result.imageFallback': 'No image selected',
      'admin.result.image': 'Image',
      'admin.result.exportReady': 'JSON exported to your clipboard'
    },
    zh: {
      'bar.free': '滿 MYR 300 免運',
      'bar.return': '7 天鑑賞期',
      'nav.shop': '購物',
      'nav.categories': '分類',
      'nav.beauty': '美妝',
      'nav.about': '關於我們',
      'nav.visit': '門市資訊',
      'nav.admin': '後台',
      'hero.title': '明亮自信．OSUN',
      'hero.subtitle': '在時尚與內在光芒之間，找到屬於你的自信。',
      'hero.cta1': '立即選購',
      'hero.cta2': '了解品牌故事',
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
      'tag.restocked': '重新上架',
      'tag.capsule': '膠囊系列',
      'tag.limited': '限量',
      'tag.editor': '編輯推薦',
      'tag.exclusive': '獨家',
      'tag.couture': '高訂',
      'prod1.name': '花漾優雅洋裝',
      'prod1.desc': 'XS–XL 尺寸 · 3 色',
      'prod2.name': '夏日氛圍上衣',
      'prod2.desc': '輕柔人造絲',
      'prod3.name': '發光美肌組',
      'prod3.desc': '潔淨配方 · 無動物實驗',
      'btn.add': '加入購物車',
      'beauty.title': '美妝儀式',
      'beauty.heading': '由內而外綻放光芒',
      'beauty.desc': '精選護膚與彩妝，綻放你的內在光芒。',
      'beauty.cta': '預約專屬光澤諮詢 →',
      'beauty.prod1.name': '光采肌膚組',
      'beauty.prod1.desc': '富含維他命的潔顏、化妝水與乳霜，打造自然亮澤。',
      'beauty.prod2.name': '絲絨花漾盤',
      'beauty.prod2.desc': '靈感來自夕陽花朵的多用途眼頰彩盤。',
      'beauty.prod3.name': '絲柔身體雙重奏',
      'beauty.prod3.desc': '植物磨砂與身體舒芙蕾，提亮並柔嫩肌膚。',
      'visit.title': '歡迎光臨門市',
      'visit.desc': '門市位於巴生 Bayu Tinggi，歡迎親臨試穿選購。',
      'visit.addrTitle': '地址',
      'visit.hours': '每日 10:00–20:00',
      'visit.map': '在 Google 地圖開啟',
      'foot.shop': '購物',
      'foot.support': '支援',
      'foot.follow': '追蹤我們',
      'foot.admin': '後台',
      'pol.ship': '運送政策',
      'pol.return': '退換貨',
      'pol.privacy': '隱私權',
      'cart.title': '購物車',
      'cart.subtotal': '小計',
      'cart.checkout': '安全結帳',
      'cart.note': '此網站僅供示範，付款流程為模擬。',
      'cart.empty': '購物車是空的。',
      'cart.remove': '移除',
      'cart.qty': '數量',
      'toast.added': '已加入購物車',
      'flow.demo.welcome.title': '歡迎來到 OSUN',
      'flow.demo.welcome.desc': '這是一個示範用的多頁式結帳流程，可透過下方按鈕體驗。',
      'flow.demo.welcome.cta': '開始結帳',
      'flow.demo.welcome.add': '加入示範商品',
      'flow.login.title': '會員登入',
      'flow.login.email': '會員信箱',
      'flow.login.password': '會員密碼',
      'flow.login.submit': '登入（示意）',
      'flow.login.notice': '* 示範頁面，可直接訪客結帳。',
      'flow.login.firstTime.title': '首次購物？',
      'flow.login.firstTime.desc': '可選擇訪客結帳或建立會員以保存資料。',
      'flow.login.guest': '訪客結帳',
      'flow.login.register': '註冊會員（示意）',
      'flow.info.title': '填寫收件資訊',
      'flow.info.name': '姓名',
      'flow.info.email': '電子郵件',
      'flow.info.phone': '聯絡電話',
      'flow.info.city': '城市',
      'flow.info.district': '區域',
      'flow.info.address': '地址',
      'flow.info.next': '下一步',
      'flow.info.back': '← 上一步',
      'flow.confirm.order': '訂單明細',
      'flow.confirm.customer': '收件資訊',
      'flow.confirm.missing': '尚未填寫資料。',
      'flow.confirm.next': '前往付款',
      'flow.confirm.back': '← 上一步',
      'flow.payment.title': '選擇付款方式',
      'flow.payment.option.card': '使用 Visa / MasterCard（Stripe）',
      'flow.payment.option.tng': 'Touch’n Go（iPay88）— 即將推出',
      'flow.payment.back': '← 上一步',
      'flow.payment.cancel': '取消',
      'flow.success.title': '付款成功 🎉',
      'flow.success.desc': '感謝您的訂購！我們已寄出確認信（示意）。',
      'flow.success.home': '返回首頁',
      'flow.cancel.title': '已取消付款',
      'flow.cancel.desc': '您可以返回重新選擇付款方式或修改訂單。',
      'flow.cancel.retry': '回到付款',
      'flow.cancel.home': '返回首頁',
      'flow.summary.empty': '購物車內沒有商品，請先加入品項。',
      'flow.summary.subtotal': '小計',
      'flow.summary.total': '總計',
      'checkout.hero.tag': '安全結帳',
      'checkout.hero.title': '三個步驟完成你的訂單。',
      'checkout.hero.subtitle': '註冊資料、以 SMS 驗證手機、選擇付款方式，並即時掌握包裹進度。',
      'checkout.hero.secure': '全程加密處理，卡號不會被儲存。',
      'checkout.hero.primaryCta': '開始填寫資料',
      'checkout.hero.secondaryCta': '直接前往填寫區',
      'checkout.flow.altTitle': '想體驗多頁式流程？',
      'checkout.flow.altLink': '開啟多步驟結帳',
      'checkout.progress.title': '結帳流程',
      'checkout.progress.desc': '依序完成下列步驟，隨時可返回修改。',
      'checkout.progress.account': '帳戶',
      'checkout.progress.account.desc': '建立資料',
      'checkout.progress.verify': '驗證',
      'checkout.progress.verify.desc': '手機簡訊',
      'checkout.progress.shipping': '配送',
      'checkout.progress.shipping.desc': '地址與方式',
      'checkout.progress.payment': '付款',
      'checkout.progress.payment.desc': '選擇方式',
      'checkout.progress.review': '確認',
      'checkout.progress.review.desc': '檢視與追蹤',
      'checkout.common.next': '儲存並繼續',
      'checkout.common.back': '返回',
      'checkout.account.title': '建立你的 OSUN 帳戶',
      'checkout.account.desc': '保存聯絡資訊，讓每次寄送更順暢。',
      'checkout.account.newTag': '首次造訪 OSUN？',
      'checkout.account.newTitle': '第一次購物嗎？',
      'checkout.account.newDesc': '註冊 OSUN 會員以儲存偏好並追蹤訂單。',
      'checkout.account.newCtaPrimary': '立即註冊',
      'checkout.account.newCtaSecondary': '以訪客身分繼續',
      'checkout.account.newHint': '向下捲動填寫註冊表單即可繼續。',
      'checkout.account.sectionTitle': '新會員註冊',
      'checkout.account.sectionDesc': '填寫以下資料，未來結帳即可直接套用。',
      'checkout.account.fullName': '姓名',
      'checkout.account.fullName.placeholder': '例：Liyana Osman',
      'checkout.account.email': '電子郵件',
      'checkout.account.email.placeholder': 'you@example.com',
      'checkout.account.password': '密碼',
      'checkout.account.password.placeholder': '設定安全密碼',
      'checkout.account.notes': '訂單備註（選填）',
      'checkout.account.notes.placeholder': '可填寫尺寸偏好或配送提醒',
      'checkout.login.tag': '會員登入',
      'checkout.login.title': '已有帳戶？',
      'checkout.login.desc': '登入後即可載入先前儲存的地址與訂單。',
      'checkout.login.email': '電子郵件',
      'checkout.login.email.placeholder': '註冊時使用的信箱',
      'checkout.login.password': '密碼',
      'checkout.login.password.placeholder': '輸入帳戶密碼',
      'checkout.login.submit': '登入',
      'checkout.login.forgot': '忘記密碼',
      'checkout.login.error': '查無此帳戶資訊，請於下方完成註冊。',
      'checkout.login.success': '歡迎回來！已載入你的帳戶資料。',
      'checkout.verify.title': '驗證你的手機號碼',
      'checkout.verify.desc': '我們會傳送一次性驗證碼，保護配送通知安全。',
      'checkout.verify.phone': '手機號碼',
      'checkout.verify.phone.placeholder': '+60 12-345 6789',
      'checkout.verify.send': '發送簡訊',
      'checkout.verify.code': '驗證碼',
      'checkout.verify.code.placeholder': '輸入 6 位數字',
      'checkout.verify.resend': '重新發送',
      'checkout.verify.skip': '跳過驗證（示範）',
      'checkout.verify.skipHint': '展示時可直接完成此步驟，無需接收簡訊。',
      'checkout.verify.next': '驗證並繼續',
      'checkout.verify.sent': '示範驗證碼 {{code}} 已傳送至 {{phone}}，有效期限 3 分鐘。',
      'checkout.verify.wait': '{{seconds}} 秒後可重新發送。',
      'checkout.verify.success': '已驗證成功，可以繼續下一步。',
      'checkout.verify.error': '請輸入我們傳送到手機的六位數驗證碼。',
      'checkout.verify.mismatch': '驗證碼不正確，請再試一次。',
      'checkout.verify.phoneError': '請先輸入正確的手機號碼再索取驗證碼。',
      'checkout.verify.expired': '驗證碼已過期，請重新索取簡訊。',
      'checkout.shipping.title': '要寄送到哪裡？',
      'checkout.shipping.desc': '填寫地址並挑選最適合的配送時程。',
      'checkout.shipping.address': '街道地址',
      'checkout.shipping.address.placeholder': '公寓、街道與樓層等資訊',
      'checkout.shipping.city': '城市',
      'checkout.shipping.city.placeholder': '例：Klang',
      'checkout.shipping.state': '州別',
      'checkout.shipping.state.placeholder': '例：Selangor',
      'checkout.shipping.postcode': '郵遞區號',
      'checkout.shipping.postcode.placeholder': '例：41200',
      'checkout.shipping.speed': '配送速度',
      'checkout.shipping.speed.standard': '標準（3-5 天）',
      'checkout.shipping.speed.express': '快遞（1-2 天）',
      'checkout.shipping.speed.pickup': '門市自取',
      'checkout.shipping.next': '儲存配送資訊',
      'checkout.payment.title': '選擇付款方式',
      'checkout.payment.desc': '支援主要信用卡、電子錢包與網銀轉帳。',
      'checkout.payment.method.visa': 'VISA / MasterCard',
      'checkout.payment.method.visa.badge': '信用卡',
      'checkout.payment.method.visa.desc': 'Visa · MasterCard · Amex',
      'checkout.payment.method.fpx': 'FPX / 網路轉帳',
      'checkout.payment.method.fpx.badge': '銀行',
      'checkout.payment.method.fpx.desc': 'Maybank · CIMB · RHB',
      'checkout.payment.method.ewallet': '電子錢包',
      'checkout.payment.method.ewallet.badge': '錢包',
      'checkout.payment.method.ewallet.desc': "GrabPay · Touch 'n Go · Boost",
      'checkout.payment.cardName': '持卡人姓名',
      'checkout.payment.cardName.placeholder': '與信用卡相同的姓名',
      'checkout.payment.cardNumber': '信用卡卡號',
      'checkout.payment.cardNumber.placeholder': '0000 0000 0000 0000',
      'checkout.payment.cardExpiry': '有效期限',
      'checkout.payment.cardCvv': '安全碼',
      'checkout.payment.cardCvv.placeholder': '3-4 位數',
      'checkout.payment.next': '檢視訂單',
      'checkout.payment.fillDemo': '填入示範信用卡',
      'checkout.payment.fillDemo.toast': '已填入示範卡資料，可繼續下一步。',
      'checkout.review.title': '確認你的訂單',
      'checkout.review.desc': '再次檢查以下資訊，送出後立即取得物流追蹤。',
      'checkout.review.place': '送出訂單並開始追蹤',
      'checkout.review.error': '目前購物車是空的，請先選購商品再結帳。',
      'checkout.summary.account': '帳戶',
      'checkout.summary.contact': '聯絡方式',
      'checkout.summary.shipping': '配送資訊',
      'checkout.summary.payment': '付款方式',
      'checkout.summary.items': '訂單摘要',
      'checkout.summary.method.visa': '信用卡（Visa / Mastercard）',
      'checkout.summary.method.fpx': '線上銀行（FPX）',
      'checkout.summary.method.ewallet': '電子錢包',
      'checkout.summary.subtotal': '小計',
      'checkout.summary.shippingFee': '運費',
      'checkout.summary.total': '總計',
      'checkout.summary.empty': '購物車為空，歡迎返回商店挑選商品。',
      'checkout.success.tag': '訂單已成立',
      'checkout.success.title': '你的光采商品正在路上',
      'checkout.success.subtitle': '下方即時更新物流節點，司機抵達前也會發送 SMS。',
      'checkout.success.trackingLabel': '追蹤編號',
      'checkout.tracking.eta': '預估送達時間：{{date}}',
      'checkout.tracking.stage.ordered': '訂單確認',
      'checkout.tracking.stage.preparing': '備貨中',
      'checkout.tracking.stage.shipped': '已出貨',
      'checkout.tracking.stage.out': '配送中',
      'checkout.tracking.stage.pickup': '備妥待取',
      'checkout.tracking.stage.note.ordered': '我們已收到訂單並寄出確認信。',
      'checkout.tracking.stage.note.preparing': '造型團隊正在仔細檢查與包裝你的商品。',
      'checkout.tracking.stage.note.shipped': '物流業者已取件，追蹤資訊即將更新。',
      'checkout.tracking.stage.note.out': '配送人員抵達前會再以簡訊通知。',
      'checkout.tracking.stage.note.pickup': '商品已備妥，可於門市前台取件。',
      'catpage.hero.tag': '精選分類',
      'catpage.hero.title': '滑動探索 OSUN 衣櫥圖書館',
      'catpage.hero.subtitle': '沿著季節選輯滑動，找到讓造型輕鬆到位的每一套穿搭。',
      'catpage.hero.cta': '返回精選商品',
      'catpage.slider.hint': '左右滑動瀏覽更多造型',
      'catpage.loading': '造型載入中…',
      'catpage.inventory': '庫存',
      'catpage.empty': '新系列即將登場',
      'catpage.card.defaultName': '敬請期待',
      'catpage.wardrobe.tag': '衣櫥基礎',
      'catpage.wardrobe.title': '打造每日儀式感的必備層次。',
      'catpage.wardrobe.desc': '從通勤到週末早午餐，兼顧舒適與俐落的混搭單品。',
      'catpage.wardrobe1.name': 'Lotus 包裹洋裝',
      'catpage.wardrobe1.desc': '柔緞垂墜搭配可調腰帶與飄逸袖型。',
      'catpage.wardrobe1.stock': '剩餘 12 件',
      'catpage.wardrobe2.name': 'Citrine 套裝',
      'catpage.wardrobe2.desc': '短版上衣與高腰長褲的輕棉兩件式。',
      'catpage.wardrobe2.stock': '現貨 18 套',
      'catpage.wardrobe3.name': 'Aura 百褶裙',
      'catpage.wardrobe3.desc': '極輕百褶搭配彈性腰頭，行走飄逸。',
      'catpage.wardrobe3.stock': '現貨 24 件',
      'catpage.wardrobe4.name': '層次必備組',
      'catpage.wardrobe4.desc': '開襟衫、內襯與絲巾三件式，輕鬆堆疊造型。',
      'catpage.wardrobe4.stock': '剩餘 9 組',
      'catpage.ritual.tag': '生活儀式',
      'catpage.ritual.title': '慢晨與夜晚儀式的舒適穿著。',
      'catpage.ritual.desc': '居家套裝、週末單品與療癒材質，陪你完成日常儀式感。',
      'catpage.ritual1.name': 'Velvet Dawn 浴袍',
      'catpage.ritual1.desc': '柔軟絨面浴袍，附可拆腰帶與深口袋。',
      'catpage.ritual1.stock': '剩餘 6 件',
      'catpage.ritual2.name': 'Weekend Glow 連身褲',
      'catpage.ritual2.desc': '透氣亞麻混紡，寬鬆剪裁自在行動。',
      'catpage.ritual2.stock': '現貨 20 件',
      'catpage.ritual3.name': 'Sage Ritual 套裝',
      'catpage.ritual3.desc': '彈性針織上衣與寬褲，舒適透氣。',
      'catpage.ritual3.stock': '現貨 15 套',
      'catpage.ritual4.name': 'Moonbeam 針織洋裝',
      'catpage.ritual4.desc': '柔軟羅紋長洋裝，服貼不緊貼。',
      'catpage.ritual4.stock': '現貨 14 件',
      'catpage.designer.tag': '設計師獨創',
      'catpage.designer.title': '專為晚宴時刻打造的高訂亮點。',
      'catpage.designer.desc': '東南亞設計師限量手作與量身禮服，綻放獨特光芒。',
      'catpage.designer1.name': 'Aurora 手工珠鑽禮服',
      'catpage.designer1.desc': '手工珠鑽與透膚領口，展現流線拖尾。',
      'catpage.designer1.stock': '剩餘 3 套',
      'catpage.designer2.name': 'Celeste 直筒晚裝',
      'catpage.designer2.desc': '雕塑感緞面剪裁，附可拆式外裙。',
      'catpage.designer2.stock': '現貨 5 套',
      'catpage.designer3.name': 'Nocturne 披肩洋裝',
      'catpage.designer3.desc': '亮片披肩罩上極簡吊帶裙，低調華麗。',
      'catpage.designer3.stock': '剩餘 4 套',
      'catpage.designer4.name': 'Obsidian 絲絨套裝',
      'catpage.designer4.desc': '絲絨量身西裝，飾以水晶翻領細節。',
      'catpage.designer4.stock': '剩餘 2 套',
      'aboutpage.hero.tag': '創辦人故事',
      'aboutpage.hero.title': '優雅源於社群。',
      'aboutpage.hero.subtitle': 'OSUN 由創辦人 Madam Liyana Osman 在客廳造型聚會中萌芽。今天，我們延續她的貼心服務，為你帶來專屬光芒的時尚與美妝。',
      'aboutpage.hero.cta': '認識 Liyana 女士',
      'aboutpage.hero.secondary': '預約門市',
      'aboutpage.owner.tag': '創辦人',
      'aboutpage.owner.title': '關於 Madam Liyana Osman',
      'aboutpage.owner.story': '出生於巴生的 Liyana 女士結合娘惹文化與現代造型，陪伴女性在每個重要時刻展現自信。她相信美是日常儀式，每一次 OSUN 服務都向這份儀式致敬。',
      'aboutpage.owner.quote': '「當一位女性被看見，她的光芒無可阻擋。OSUN 為此而存在。」',
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
      'admin.language.en': '英文',
      'admin.language.zh': '中文',
      'admin.field.title': '標題',
      'admin.field.subtitle': '副標題',
      'admin.field.name': '名稱',
      'admin.field.description': '描述',
      'admin.field.inventory': '庫存資訊',
      'admin.field.price': '價格',
      'admin.field.badgeTheme': '標語色系',
      'admin.field.badgeText': '標語文字',
      'admin.field.tag': '標籤',
      'admin.field.story': '故事',
      'admin.field.quote': '引言',
      'admin.field.altText': '替代文字',
      'admin.field.ctaPrimary': '主要 CTA',
      'admin.field.ctaSecondary': '次要 CTA',
      'admin.field.ctaText': 'CTA 文案',
      'admin.field.ctaLink': 'CTA 連結',
      'admin.field.imageUrl': '圖片網址',
      'admin.field.imageUpload': '上傳圖片',
      'admin.field.highlight': '亮點',
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
      'admin.hero.primaryLink': '主要 CTA 連結',
      'admin.hero.secondaryLink': '次要 CTA 連結',
      'admin.hero.imageUrl': '主視覺圖片網址',
      'admin.hero.imageUpload': '上傳新圖片',
      'admin.hero.save': '儲存主視覺',
      'admin.hero.reset': '恢復預設',
      'admin.preview.heading': '即時預覽',
      'admin.preview.desc': '預覽你儲存的文字與圖片。',
      'admin.categories.heading': '分類管理',
      'admin.categories.desc': '新增集合並調整分類頁面的呈現。',
      'admin.categories.export': '匯出 JSON',
      'admin.categories.add': '新增項目',
      'admin.categories.save': '儲存分類',
      'admin.categories.empty': '尚未新增造型，請先加入。',
      'admin.categories.moveUp': '上移',
      'admin.categories.moveDown': '下移',
      'admin.categories.remove': '移除',
      'admin.categories.theme.rose': '玫瑰光',
      'admin.categories.theme.amber': '琥珀',
      'admin.categories.theme.emerald': '祖母綠',
      'admin.categories.theme.slate': '岩灰',
      'admin.categories.theme.violet': '紫羅蘭',
      'admin.categories.theme.sky': '天青',
      'admin.categories.table.name': '名稱',
      'admin.categories.table.description': '描述',
      'admin.categories.table.group': '群組',
      'admin.categories.group.apparel': '服飾',
      'admin.categories.group.beauty': '美妝',
      'admin.categories.group.lifestyle': '生活',
      'admin.nav.hero': '首頁',
      'admin.nav.categories': '分類',
      'admin.nav.about': '關於頁面',
      'admin.reset': '恢復預設內容',
      'admin.reset.confirm': '確定要恢復為 OSUN 預設展示內容嗎？此動作會覆蓋目前的調整。',
      'admin.reset.success': '已恢復預設示範內容，前台頁面已同步更新。',
      'admin.about.heading': '關於頁面',
      'admin.about.desc': '更新創辦人故事、里程碑與社群邀請。',
      'admin.about.heroSection': '品牌開場',
      'admin.about.founderSection': '創辦人焦點',
      'admin.about.valuesSection': '品牌理念',
      'admin.about.timelineSection': '里程碑',
      'admin.about.communitySection': '社群邀請',
      'admin.about.founderHighlights': '創辦人亮點',
      'admin.about.values.item': '理念',
      'admin.about.timeline.item': '里程碑',
      'admin.about.save': '儲存關於頁面',
      'admin.about.reset': '恢復預設內容',
      'admin.notes.heading': '發佈提醒',
      'admin.notes.desc': '可將匯出的設定檔交給工程團隊，或手動複製到 HTML。下方提供精簡串接清單，協助你導入 CMS。',
      'admin.notes.item1.prefix': '首頁主視覺位於',
      'admin.notes.item2.prefix': '分類卡片可在此頁更新：',
      'admin.notes.item3.prefix': '創辦人故事內容位於',
      'admin.integration.heading': 'Headless CMS 串接指南',
      'admin.integration.desc': '想自動化更新時，可依照以下步驟規劃，或將清單交給合作的工程師。',
      'admin.integration.step1': '選擇 Sanity、Contentful 或 Strapi 等 Headless CMS，建立對應的 hero、分類與關於我們資料模型。',
      'admin.integration.step2': '以即時 API 取代 js/content.js 的示範資料來源，並沿用現有 data-* 屬性進行渲染。',
      'admin.integration.step3': '使用匯出 JSON 作為初始資料，並設定 Webhook 讓每次儲存自動觸發重新部署或快取更新。',
      'admin.integration.link': '前往 README 查看串接清單 →',
      'admin.login.title': '後台安全登入',
      'admin.login.subtitle': '請輸入後台密碼以繼續更新精品內容。',
      'admin.login.password': '後台密碼',
      'admin.login.submit': '解鎖管理介面',
      'admin.login.hint': '忘記密碼？請聯繫你的 OSUN 網站夥伴。',
      'admin.login.error': '密碼錯誤，請再試一次。',
      'admin.login.locked': '嘗試次數過多，請在 {{seconds}} 秒後再試。',
      'admin.login.successTitle': '登入成功',
      'admin.login.success': '歡迎回來，內容工作室已解鎖。',
      'admin.result.success': '已儲存更新',
      'admin.result.nameFallback': '未命名項目',
      'admin.result.imageFallback': '未選擇圖片',
      'admin.result.image': '圖片',
      'admin.result.heroSaved': '首頁主視覺已更新',
      'admin.result.categoriesSaved': '分類已儲存',
      'admin.result.aboutSaved': '關於頁面已更新',
      'admin.result.exportReady': 'JSON 已複製到剪貼簿'
    }
  };

  const CONTENT_KEY = (window.OSUN_CONTENT && window.OSUN_CONTENT.STORAGE_KEY) || 'osun-content-config';
  let contentCache = null;

  const CATEGORY_FALLBACK_KEYS = {
    wardrobe: { tag: 'catpage.wardrobe.tag', title: 'catpage.wardrobe.title', description: 'catpage.wardrobe.desc' },
    ritual: { tag: 'catpage.ritual.tag', title: 'catpage.ritual.title', description: 'catpage.ritual.desc' },
    designer: { tag: 'catpage.designer.tag', title: 'catpage.designer.title', description: 'catpage.designer.desc' }
  };

  const BADGE_THEMES = {
    rose: { badge: 'bg-brand-red text-white', border: 'border-rose-100' },
    amber: { badge: 'bg-amber-500 text-white', border: 'border-amber-100' },
    emerald: { badge: 'bg-emerald-500 text-white', border: 'border-emerald-100' },
    slate: { badge: 'bg-slate-700 text-white', border: 'border-slate-100' },
    violet: { badge: 'bg-violet-500 text-white', border: 'border-violet-200' },
    sky: { badge: 'bg-sky-500 text-white', border: 'border-sky-100' }
  };

  function readStoredContent(){
    try {
      const raw = localStorage.getItem(CONTENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err){
      console.warn('Failed to parse stored content', err);
      return null;
    }
  }

  function getContent(){
    if (!contentCache){
      const stored = readStoredContent();
      if (window.OSUN_CONTENT && typeof window.OSUN_CONTENT.merge === 'function'){
        contentCache = window.OSUN_CONTENT.merge(stored);
      } else {
        contentCache = stored || {};
      }
    }
    return contentCache;
  }

  function invalidateContent(){
    contentCache = null;
    const currentLang = localStorage.getItem(LANG_KEY) || getSavedLang();
    applyContent(currentLang);
  }

  function escapeHtml(value){
    if (value == null) return '';
    return String(value).replace(/[&<>"]+/g, match => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    })[match] || match);
  }

  function setTextKey(key, value){
    if (typeof value !== 'string') return;
    document.querySelectorAll(`[data-content-key="${key}"]`).forEach(el => {
      el.textContent = value;
    });
  }

  function setLinkKey(key, value){
    if (!value) return;
    document.querySelectorAll(`[data-content-link="${key}"]`).forEach(el => {
      el.setAttribute('href', value);
    });
  }

  function setImageKey(key, value){
    if (!value) return;
    document.querySelectorAll(`[data-content-image="${key}"]`).forEach(el => {
      el.setAttribute('src', value);
    });
  }

  function setAltKey(key, value){
    if (!value) return;
    document.querySelectorAll(`[data-content-alt="${key}"]`).forEach(el => {
      el.setAttribute('alt', value);
    });
  }

  function setListText(key, index, value){
    if (typeof value !== 'string') return;
    document.querySelectorAll(`[data-content-key="${key}"][data-content-index="${index}"]`).forEach(el => {
      el.textContent = value;
    });
  }

  function getBadgeTheme(theme){
    return BADGE_THEMES[theme] || BADGE_THEMES.rose;
  }

  function applyHeroContent(heroConfig, lang){
    if (!heroConfig) return;
    const data = heroConfig[lang] || heroConfig.en || {};
    setTextKey('hero.title', data.title || getText('hero.title'));
    setTextKey('hero.subtitle', data.subtitle || getText('hero.subtitle'));
    setTextKey('hero.primaryCta', data.primaryCta || getText('hero.cta1'));
    setTextKey('hero.secondaryCta', data.secondaryCta || getText('hero.cta2'));
    setLinkKey('hero.primaryLink', data.primaryLink || heroConfig.primaryLink || '#shop');
    setLinkKey('hero.secondaryLink', data.secondaryLink || heroConfig.secondaryLink || 'about.html');
    const imageSrc = data.image || heroConfig.en?.image || heroConfig.image || 'assets/images/hero.jpg';
    setImageKey('hero.image', imageSrc);
  }

  function renderCategoryGroup(key, groupConfig, lang, sliderHint){
    const section = document.querySelector(`[data-category-section="${key}"]`);
    if (!section) return;
    const fallback = CATEGORY_FALLBACK_KEYS[key] || {};
    const tagText = groupConfig?.tag?.[lang] || groupConfig?.tag?.en || getText(fallback.tag || 'catpage.hero.tag');
    const titleText = groupConfig?.title?.[lang] || groupConfig?.title?.en || getText(fallback.title || 'catpage.hero.title');
    const descText = groupConfig?.description?.[lang] || groupConfig?.description?.en || getText(fallback.description || 'catpage.hero.subtitle');
    const tagEl = section.querySelector('[data-category-field="tag"]');
    if (tagEl) tagEl.textContent = tagText;
    const titleEl = section.querySelector('[data-category-field="title"]');
    if (titleEl) titleEl.textContent = titleText;
    const descEl = section.querySelector('[data-category-field="description"]');
    if (descEl) descEl.textContent = descText;
    const hintEl = section.querySelector('[data-category-field="hint"]');
    if (hintEl) hintEl.textContent = sliderHint;

    const container = section.querySelector('[data-category-items]');
    if (!container) return;
    container.innerHTML = '';
    const items = Array.isArray(groupConfig?.items) ? groupConfig.items : [];
    if (!items.length){
      const empty = document.createElement('p');
      empty.className = 'text-sm text-gray-500';
      empty.textContent = getText('catpage.empty');
      container.appendChild(empty);
      return;
    }
    items.forEach(item => {
      container.appendChild(createCategoryCard(item, lang));
    });
  }

  function createCategoryCard(item, lang){
    const theme = getBadgeTheme(item?.badge?.theme);
    const badgeLabel = item?.badge?.[lang] || item?.badge?.en || '';
    const price = item?.price || '—';
    const name = item?.texts?.[lang]?.name || item?.texts?.en?.name || getText('catpage.card.defaultName');
    const description = item?.texts?.[lang]?.description || item?.texts?.en?.description || '';
    const stock = item?.inventory?.[lang] || item?.inventory?.en || '';
    const imageSrc = item?.image || 'assets/images/store.jpg';

    const card = document.createElement('article');
    card.className = `category-card min-w-[260px] max-w-xs snap-start rounded-3xl border ${theme.border} bg-white shadow-sm`;
    card.setAttribute('role', 'listitem');

    const figure = document.createElement('div');
    figure.className = 'relative';
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = name;
    img.loading = 'lazy';
    img.className = 'h-60 w-full rounded-t-3xl object-cover';
    figure.appendChild(img);

    if (badgeLabel){
      const badge = document.createElement('span');
      badge.className = `absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${theme.badge}`;
      badge.textContent = badgeLabel;
      figure.appendChild(badge);
    }

    const body = document.createElement('div');
    body.className = 'p-6 space-y-3';

    const titleEl = document.createElement('h3');
    titleEl.className = 'text-xl font-semibold text-gray-900';
    titleEl.textContent = name;
    body.appendChild(titleEl);

    const descEl = document.createElement('p');
    descEl.className = 'text-sm text-gray-600';
    descEl.textContent = description;
    body.appendChild(descEl);

    if (badgeLabel){
      const inlineBadge = document.createElement('span');
      inlineBadge.className = `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${theme.badge}`;
      inlineBadge.textContent = badgeLabel;
      body.appendChild(inlineBadge);
    }

    const priceEl = document.createElement('p');
    priceEl.className = 'text-lg font-semibold text-brand-red';
    priceEl.textContent = price;
    body.appendChild(priceEl);

    const stockRow = document.createElement('p');
    stockRow.className = 'text-sm text-gray-500';
    const stockLabel = document.createElement('span');
    stockLabel.textContent = getText('catpage.inventory');
    stockRow.appendChild(stockLabel);
    const stockValue = document.createElement('span');
    stockValue.className = 'ml-1 font-medium text-gray-700';
    stockValue.textContent = stock;
    stockRow.appendChild(stockValue);
    body.appendChild(stockRow);

    card.appendChild(figure);
    card.appendChild(body);
    return card;
  }

  function applyCategoriesContent(categoriesConfig, lang){
    if (!categoriesConfig) return;
    const hero = categoriesConfig.hero;
    if (hero){
      const tagText = hero.tag?.[lang] || hero.tag?.en || getText('catpage.hero.tag');
      const titleText = hero.title?.[lang] || hero.title?.en || getText('catpage.hero.title');
      const subText = hero.subtitle?.[lang] || hero.subtitle?.en || getText('catpage.hero.subtitle');
      const ctaText = hero.ctaText?.[lang] || hero.ctaText?.en || getText('catpage.hero.cta');
      setTextKey('categories.hero.tag', tagText);
      setTextKey('categories.hero.title', titleText);
      setTextKey('categories.hero.subtitle', subText);
      setTextKey('categories.hero.ctaText', ctaText);
      setLinkKey('categories.hero.ctaLink', hero.ctaLink || 'index.html#shop');
    }
    const sliderHint = categoriesConfig.sliderHint?.[lang] || categoriesConfig.sliderHint?.en || getText('catpage.slider.hint');
    Object.keys(CATEGORY_FALLBACK_KEYS).forEach(key => {
      renderCategoryGroup(key, categoriesConfig.groups?.[key], lang, sliderHint);
    });
  }

  function applyAboutContent(aboutConfig, lang){
    if (!aboutConfig) return;
    const hero = aboutConfig.hero;
    if (hero){
      setTextKey('about.hero.tag', hero.tag?.[lang] || hero.tag?.en || getText('aboutpage.hero.tag'));
      setTextKey('about.hero.title', hero.title?.[lang] || hero.title?.en || getText('aboutpage.hero.title'));
      setTextKey('about.hero.subtitle', hero.subtitle?.[lang] || hero.subtitle?.en || getText('aboutpage.hero.subtitle'));
      setTextKey('about.hero.primaryCta', hero.primaryCta?.[lang] || hero.primaryCta?.en || getText('aboutpage.hero.cta'));
      setTextKey('about.hero.secondaryCta', hero.secondaryCta?.[lang] || hero.secondaryCta?.en || getText('aboutpage.hero.secondary'));
      setLinkKey('about.hero.primaryLink', hero.primaryLink || '#founder');
      setLinkKey('about.hero.secondaryLink', hero.secondaryLink || 'index.html#visit');
    }

    const founder = aboutConfig.founder || {};
    setTextKey('about.founder.tag', founder.tag?.[lang] || founder.tag?.en || getText('aboutpage.owner.tag'));
    setTextKey('about.founder.title', founder.title?.[lang] || founder.title?.en || getText('aboutpage.owner.title'));
    setTextKey('about.founder.story', founder.story?.[lang] || founder.story?.en || getText('aboutpage.owner.story'));
    setTextKey('about.founder.quote', founder.quote?.[lang] || founder.quote?.en || getText('aboutpage.owner.quote'));
    setImageKey('about.founder.image', founder.image || 'assets/images/model1.png');
    setAltKey('about.founder.alt', founder.alt?.[lang] || founder.alt?.en || getText('aboutpage.owner.name'));
    const highlights = Array.isArray(founder.highlights) ? founder.highlights : [];
    highlights.forEach((item, index) => {
      setListText('about.founder.highlights', index, item?.[lang] || item?.en || '');
    });

    const values = aboutConfig.values || {};
    setTextKey('about.values.tag', values.tag?.[lang] || values.tag?.en || getText('aboutpage.values.tag'));
    setTextKey('about.values.title', values.title?.[lang] || values.title?.en || getText('aboutpage.values.title'));
    setTextKey('about.values.description', values.description?.[lang] || values.description?.en || getText('aboutpage.values.desc'));
    const valueItems = Array.isArray(values.items) ? values.items : [];
    valueItems.forEach((item, index) => {
      setListText('about.values.items.title', index, item?.title?.[lang] || item?.title?.en || getText(`aboutpage.values.value${index + 1}.title`));
      setListText('about.values.items.description', index, item?.description?.[lang] || item?.description?.en || getText(`aboutpage.values.value${index + 1}.desc`));
    });

    const timeline = aboutConfig.timeline || {};
    setTextKey('about.timeline.tag', timeline.tag?.[lang] || timeline.tag?.en || getText('aboutpage.timeline.tag'));
    setTextKey('about.timeline.title', timeline.title?.[lang] || timeline.title?.en || getText('aboutpage.timeline.title'));
    setTextKey('about.timeline.description', timeline.description?.[lang] || timeline.description?.en || getText('aboutpage.timeline.desc'));
    const timelineItems = Array.isArray(timeline.items) ? timeline.items : [];
    timelineItems.forEach((item, index) => {
      setListText('about.timeline.items.title', index, item?.title?.[lang] || item?.title?.en || getText(`aboutpage.timeline.${index + 1}.title`));
      setListText('about.timeline.items.description', index, item?.description?.[lang] || item?.description?.en || getText(`aboutpage.timeline.${index + 1}.desc`));
    });

    const community = aboutConfig.community || {};
    setTextKey('about.community.title', community.title?.[lang] || community.title?.en || getText('aboutpage.community.title'));
    setTextKey('about.community.description', community.description?.[lang] || community.description?.en || getText('aboutpage.community.desc'));
    setTextKey('about.community.ctaText', community.ctaText?.[lang] || community.ctaText?.en || getText('aboutpage.community.cta'));
    setLinkKey('about.community.ctaLink', community.ctaLink || 'index.html#visit');
  }

  function applyContent(lang){
    const content = getContent();
    applyHeroContent(content.hero, lang);
    applyCategoriesContent(content.categories, lang);
    applyAboutContent(content.about, lang);
  }

  const PRODUCTS = {
    p1: { id: 'p1', price: 279, image: 'assets/images/product1.jpg', i18nNameKey: 'prod1.name' },
    p2: { id: 'p2', price: 169, image: 'assets/images/dress_pink.jpg', i18nNameKey: 'prod2.name' },
    p3: { id: 'p3', price: 329, image: 'assets/images/model1.png', i18nNameKey: 'prod3.name' }
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
    const current = getDict(lang);
    if (key in current) return current[key];
    return getDict('en')[key] || key;
  }

  function translate(key, vars){
    let template = getText(key);
    if (!vars) return template;
    return Object.keys(vars).reduce((acc, k) => acc.replace(new RegExp(`{{\s*${k}\s*}}`, 'g'), vars[k]), template);
  }

  function escapeHtml(input){
    if (typeof input !== 'string') return '';
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function applyLang(lang){
    const selected = dict[lang] ? lang : 'en';
    document.documentElement.lang = selected === 'zh' ? 'zh-Hant' : 'en';
    const map = getDict(selected);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = map[key] ?? getDict('en')[key];
      if (typeof text === 'string') el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const text = map[key] ?? getDict('en')[key];
      if (typeof text === 'string') el.setAttribute('alt', text);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = map[key] ?? getDict('en')[key];
      if (typeof text === 'string') el.setAttribute('placeholder', text);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      const text = map[key] ?? getDict('en')[key];
      if (typeof text === 'string') el.setAttribute('aria-label', text);
    });
    localStorage.setItem(LANG_KEY, selected);
    renderCart();
    applyContent(selected);
    document.dispatchEvent(new CustomEvent('osun:langchange', { detail: { lang: selected } }));
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
    const willOpen = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
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

  const FLOW_KEYS = {
    items: 'osun-flow-items',
    customer: 'osun-flow-customer',
    total: 'osun-flow-total'
  };

  function normaliseFlowItems(items){
    return (items || []).map(entry => {
      const productId = entry.productId || entry.id || '';
      const quantity = Math.max(1, Number(entry.quantity) || 1);
      const cents = Number(entry.unit_amount_cents);
      const unitAmount = Number.isFinite(cents) ? Math.max(0, Math.round(cents)) : 0;
      const normalised = { productId, quantity, unit_amount_cents: unitAmount };
      if (!productId && entry.name){
        normalised.name = String(entry.name);
      }
      return normalised;
    }).filter(Boolean);
  }

  function calcFlowTotalCents(items){
    return (items || []).reduce((sum, item) => {
      const cents = Number(item.unit_amount_cents) || 0;
      const qty = Number(item.quantity) || 1;
      return sum + Math.max(0, Math.round(cents)) * Math.max(1, Math.round(qty));
    }, 0);
  }

  function flowSetItems(items){
    const normalised = normaliseFlowItems(items);
    localStorage.setItem(FLOW_KEYS.items, JSON.stringify(normalised));
    flowSetTotal(calcFlowTotalCents(normalised));
    return normalised;
  }

  function flowSyncFromCart(){
    const cart = loadCart();
    if (!cart.length) return [];
    const mapped = cart.map(item => {
      const product = PRODUCTS[item.id];
      if (!product) return null;
      return {
        productId: product.id,
        quantity: Math.max(1, Number(item.qty) || 1),
        unit_amount_cents: Math.round((product.price || 0) * 100)
      };
    }).filter(Boolean);
    if (mapped.length) flowSetItems(mapped);
    return mapped;
  }

  function flowGetStoredItems(){
    try {
      const raw = localStorage.getItem(FLOW_KEYS.items);
      if (!raw) return [];
      return normaliseFlowItems(JSON.parse(raw));
    } catch (err){
      console.warn('Failed to parse checkout flow items', err);
      return [];
    }
  }

  function flowGetItems(){
    const fromCart = flowSyncFromCart();
    if (fromCart.length) return fromCart;
    return flowGetStoredItems();
  }

  function flowEnsureDemoCart(){
    const existing = flowGetItems();
    if (existing.length) return existing;
    const catalog = Object.values(PRODUCTS);
    const first = catalog.length ? catalog[0] : null;
    const fallback = first
      ? [{ productId: first.id, quantity: 1, unit_amount_cents: Math.round((first.price || 0) * 100) }]
      : [{ name: 'Osun Glow Serum', quantity: 1, unit_amount_cents: 15000 }];
    return flowSetItems(fallback);
  }

  function flowGetCustomer(){
    try {
      const raw = localStorage.getItem(FLOW_KEYS.customer);
      return raw ? JSON.parse(raw) : null;
    } catch (err){
      console.warn('Failed to parse checkout flow customer', err);
      return null;
    }
  }

  function flowSetCustomer(customer){
    const payload = customer ? {
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      city: customer.city || '',
      district: customer.district || '',
      address: customer.address || ''
    } : null;
    localStorage.setItem(FLOW_KEYS.customer, JSON.stringify(payload));
  }

  function flowGetTotal(){
    const items = flowGetItems();
    const computed = calcFlowTotalCents(items);
    if (computed){
      flowSetTotal(computed);
      return computed;
    }
    return Number(localStorage.getItem(FLOW_KEYS.total) || '0');
  }

  function flowSetTotal(cents){
    const numeric = Number(cents);
    const normalised = Number.isFinite(numeric) ? Math.max(0, Math.round(numeric)) : 0;
    localStorage.setItem(FLOW_KEYS.total, String(normalised));
  }

  function flowFormatCents(cents){
    return formatMYR((Number(cents) || 0) / 100);
  }

  function flowBuildLineItems(){
    return flowGetItems().map(item => {
      const product = item.productId && PRODUCTS[item.productId];
      const name = product ? getProductName(product) : (item.name || 'Osun Selection');
      return {
        name,
        quantity: Math.max(1, Number(item.quantity) || 1),
        unit_amount_cents: Math.max(0, Math.round(Number(item.unit_amount_cents) || 0))
      };
    });
  }

  function flowRenderSummary(target){
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) return;
    const items = flowGetItems();
    if (!items.length){
      el.innerHTML = `<div class="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-4 text-sm text-gray-600">${translate('flow.summary.empty')}</div>`;
      return;
    }

    const rows = items.map(item => {
      const product = item.productId && PRODUCTS[item.productId];
      const name = product ? getProductName(product) : (item.name || '');
      const qty = Math.max(1, Number(item.quantity) || 1);
      const totalCents = Math.max(0, Math.round(Number(item.unit_amount_cents) || 0)) * qty;
      return `<div class="py-3 flex items-center justify-between gap-4">
        <div>
          <p class="font-medium text-gray-900">${escapeHtml(name)}</p>
          <p class="text-xs text-gray-500">× ${qty}</p>
        </div>
        <p class="text-sm font-semibold text-gray-900">${escapeHtml(flowFormatCents(totalCents))}</p>
      </div>`;
    }).join('');

    const subtotal = calcFlowTotalCents(items);
    flowSetTotal(subtotal);
    el.innerHTML = `
      <div class="divide-y divide-gray-200">
        ${rows}
        <div class="pt-4 space-y-1 text-sm text-gray-700">
          <div class="flex items-center justify-between font-medium text-gray-900"><span>${translate('flow.summary.subtotal')}</span><span>${escapeHtml(flowFormatCents(subtotal))}</span></div>
          <div class="flex items-center justify-between text-gray-900 font-semibold"><span>${translate('flow.summary.total')}</span><span>${escapeHtml(flowFormatCents(subtotal))}</span></div>
        </div>
      </div>`;
  }

  function initCheckoutPage(){
    const root = document.getElementById('checkout-app');
    if (!root) return;

    const stepsOrder = ['account', 'verify', 'shipping', 'payment', 'review'];
    const progressItems = Array.from(document.querySelectorAll('#checkout-progress [data-step]'));
    const stepElements = Object.fromEntries(stepsOrder.map(step => [step, root.querySelector(`[data-checkout-step="${step}"]`)]));
    const CHECKOUT_STORAGE_KEY = 'osun-checkout-state';
    const ORDER_STORAGE_KEY = 'osun-checkout-order';
    const defaultState = {
      account: { fullName: '', email: '', password: '', notes: '' },
      verify: { phone: '', verified: false },
      shipping: { address: '', city: '', state: '', postcode: '', delivery: 'standard' },
      payment: { method: 'visa', cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '' }
    };

    function cloneDefaults(){
      return JSON.parse(JSON.stringify(defaultState));
    }

    function loadState(){
      try {
        const raw = sessionStorage.getItem(CHECKOUT_STORAGE_KEY);
        if (!raw) return cloneDefaults();
        const parsed = JSON.parse(raw);
        return {
          account: { ...defaultState.account, ...(parsed.account || {}) },
          verify: { ...defaultState.verify, ...(parsed.verify || {}) },
          shipping: { ...defaultState.shipping, ...(parsed.shipping || {}) },
          payment: { ...defaultState.payment, ...(parsed.payment || {}) }
        };
      } catch (err){
        console.warn('Failed to load checkout state', err);
        return cloneDefaults();
      }
    }

    function saveState(){
      sessionStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(state));
    }

    function loadOrder(){
      try {
        const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (err){
        console.warn('Failed to load checkout order', err);
        return null;
      }
    }

    function saveOrder(order){
      sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    }

    let state = loadState();
    let currentStepIndex = 0;
    let smsCode = '';
    let smsExpiry = 0;
    let countdownTimer = null;
    let countdownSeconds = 0;
    let lastSentCode = '';
    let lastSentPhone = '';
    let currentOrder = loadOrder();
    if (currentOrder && (!Array.isArray(currentOrder.items) || !currentOrder.items.length)){
      currentOrder = null;
      sessionStorage.removeItem(ORDER_STORAGE_KEY);
    }

    function computeCurrentStepIndex(){
      if (currentOrder){
        return 4;
      }
      if (!state.account.fullName || !state.account.email){
        return 0;
      }
      if (!state.verify.verified){
        return 1;
      }
      if (!state.shipping.address || !state.shipping.city || !state.shipping.postcode){
        return 2;
      }
      return 3;
    }

    currentStepIndex = computeCurrentStepIndex();

    const sendBtn = document.getElementById('checkoutSendCode');
    const resendBtn = document.getElementById('checkoutResendCode');
    const statusEl = document.getElementById('checkoutCodeStatus');
    const skipVerifyBtn = document.querySelector('[data-checkout-skip-verify]');
    const accountForm = document.getElementById('checkout-account-form');
    const loginForm = document.getElementById('checkout-login-form');
    const loginErrorEl = document.getElementById('checkoutLoginError');
    const verifyForm = document.getElementById('checkout-verify-form');
    const shippingForm = document.getElementById('checkout-shipping-form');
    const paymentForm = document.getElementById('checkout-payment-form');
    const summaryEl = document.getElementById('checkout-summary');
    const reviewErrorEl = document.getElementById('checkoutReviewError');
    const placeOrderBtn = document.getElementById('checkoutPlaceOrder');
    const successSection = document.getElementById('checkout-success');
    const trackingNumberEl = document.getElementById('checkoutTrackingNumber');
    const trackingEtaEl = document.getElementById('checkoutTrackingEta');
    const timelineEl = document.getElementById('checkoutTrackingTimeline');
    const cardFields = document.getElementById('checkoutCardFields');
    const cardInputs = cardFields ? Array.from(cardFields.querySelectorAll('input')) : [];
    const cardNumberInput = document.getElementById('checkoutCardNumber');
    const cardExpiryInput = document.getElementById('checkoutCardExpiry');
    const demoCardBtn = document.querySelector('[data-checkout-fill-demo]');

    const scrollButtons = Array.from(root.querySelectorAll('[data-scroll-target]'));

    function updateProgress(){
      progressItems.forEach((item, index) => {
        const reached = index <= currentStepIndex;
        item.style.borderColor = reached ? '#E11D48' : 'rgba(251,213,225,1)';
        item.style.backgroundColor = index < currentStepIndex ? 'rgba(255,241,246,1)' : 'transparent';
        const title = item.querySelector('span:first-child');
        if (title) title.style.color = reached ? '#E11D48' : '#6B7280';
      });
    }

    function showStep(index){
      currentStepIndex = Math.max(0, Math.min(index, stepsOrder.length - 1));
      stepsOrder.forEach(step => {
        const section = stepElements[step];
        if (!section) return;
        if (stepsOrder.indexOf(step) === currentStepIndex){
          section.classList.add('checkout-step-active');
        } else {
          section.classList.remove('checkout-step-active');
        }
      });
      updateProgress();
    }

    function setInputValue(id, value){
      const input = document.getElementById(id);
      if (input) input.value = value || '';
    }

    function hydrateForms(){
      setInputValue('checkoutFullName', state.account.fullName);
      setInputValue('checkoutEmail', state.account.email);
      setInputValue('checkoutPassword', state.account.password);
      setInputValue('checkoutLoginEmail', state.account.email);
      const notes = document.getElementById('checkoutNotes');
      if (notes) notes.value = state.account.notes || '';
      setInputValue('checkoutPhone', state.verify.phone);
      const codeInput = document.getElementById('checkoutCode');
      if (codeInput) codeInput.value = '';
      const address = document.getElementById('checkoutAddress');
      if (address) address.value = state.shipping.address || '';
      setInputValue('checkoutCity', state.shipping.city);
      setInputValue('checkoutState', state.shipping.state);
      setInputValue('checkoutPostcode', state.shipping.postcode);
      const deliverySelect = document.getElementById('checkoutDelivery');
      if (deliverySelect){
        deliverySelect.value = state.shipping.delivery || 'standard';
      }
      const paymentRadios = document.querySelectorAll('#checkoutPaymentOptions input[name="paymentMethod"]');
      paymentRadios.forEach(radio => {
        radio.checked = radio.value === state.payment.method;
      });
      setInputValue('checkoutCardName', state.payment.cardName);
      setInputValue('checkoutCardNumber', state.payment.cardNumber);
      setInputValue('checkoutCardExpiry', state.payment.cardExpiry);
      setInputValue('checkoutCardCvv', state.payment.cardCvv);
      toggleCardFields();
      updateStatusMessage();
    }

    function toggleCardFields(){
      if (!cardFields) return;
      const isCard = state.payment.method === 'visa';
      cardFields.style.display = isCard ? 'grid' : 'none';
      cardInputs.forEach(input => {
        if (isCard){
          input.setAttribute('required', 'required');
        } else {
          input.removeAttribute('required');
        }
      });
    }

    function disableResend(disabled){
      if (!resendBtn) return;
      resendBtn.disabled = disabled;
      if (disabled){
        resendBtn.classList.add('pointer-events-none', 'opacity-60');
      } else {
        resendBtn.classList.remove('pointer-events-none', 'opacity-60');
      }
    }

    function updateStatusMessage(){
      if (!statusEl) return;
      if (state.verify.verified){
        statusEl.textContent = translate('checkout.verify.success');
        return;
      }
      if (lastSentCode && lastSentPhone){
        const base = translate('checkout.verify.sent', { code: lastSentCode, phone: lastSentPhone });
        if (countdownSeconds > 0){
          statusEl.innerHTML = `${base}<br>${translate('checkout.verify.wait', { seconds: countdownSeconds })}`;
        } else {
          statusEl.innerHTML = base;
        }
      } else {
        statusEl.textContent = '';
      }
    }

    function startCountdown(){
      countdownSeconds = 45;
      disableResend(true);
      updateStatusMessage();
      if (countdownTimer) clearInterval(countdownTimer);
      countdownTimer = setInterval(() => {
        countdownSeconds -= 1;
        if (countdownSeconds <= 0){
          clearInterval(countdownTimer);
          countdownTimer = null;
          countdownSeconds = 0;
          disableResend(false);
          updateStatusMessage();
        } else {
          updateStatusMessage();
        }
      }, 1000);
    }

    function stopCountdown(){
      if (countdownTimer) clearInterval(countdownTimer);
      countdownTimer = null;
      countdownSeconds = 0;
      disableResend(false);
    }

    function requestSmsCode(){
      const phoneInput = document.getElementById('checkoutPhone');
      if (!phoneInput) return;
      const phone = phoneInput.value.trim();
      if (!phone){
        statusEl.textContent = translate('checkout.verify.phoneError');
        return;
      }
      smsCode = String(Math.floor(100000 + Math.random() * 900000));
      smsExpiry = Date.now() + 3 * 60 * 1000;
      lastSentCode = smsCode;
      lastSentPhone = phone;
      state.verify.phone = phone;
      state.verify.verified = false;
      saveState();
      updateStatusMessage();
      startCountdown();
      showToast(translate('checkout.verify.sent', { code: smsCode, phone }));
    }

    function handleAccountSubmit(event){
      event.preventDefault();
      const formData = new FormData(accountForm);
      state.account.fullName = formData.get('fullName')?.toString().trim() || '';
      state.account.email = formData.get('email')?.toString().trim() || '';
      state.account.password = formData.get('password')?.toString() || '';
      state.account.notes = formData.get('notes')?.toString().trim() || '';
      saveState();
      showStep(Math.max(1, computeCurrentStepIndex()));
    }

    function handleLoginSubmit(event){
      event.preventDefault();
      const data = new FormData(loginForm);
      const email = (data.get('loginEmail') || '').toString().trim().toLowerCase();
      const password = (data.get('loginPassword') || '').toString();
      const storedEmail = (state.account.email || '').toLowerCase();
      const storedPassword = state.account.password || '';
      if (!email || !password || !storedEmail || !storedPassword || storedEmail !== email || storedPassword !== password){
        if (loginErrorEl){
          loginErrorEl.textContent = translate('checkout.login.error');
          loginErrorEl.classList.remove('hidden');
        }
        return;
      }
      if (loginErrorEl) loginErrorEl.classList.add('hidden');
      showToast(translate('checkout.login.success'));
      showStep(Math.max(1, computeCurrentStepIndex()));
    }

    function handleVerifySubmit(event){
      event.preventDefault();
      const phoneInput = document.getElementById('checkoutPhone');
      const codeInput = document.getElementById('checkoutCode');
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const code = codeInput ? codeInput.value.trim() : '';
      if (!code){
        statusEl.textContent = translate('checkout.verify.error');
        return;
      }
      if (!smsCode || !phone || phone !== lastSentPhone){
        statusEl.textContent = translate('checkout.verify.phoneError');
        return;
      }
      if (Date.now() > smsExpiry){
        statusEl.textContent = translate('checkout.verify.expired');
        return;
      }
      if (code !== smsCode){
        statusEl.textContent = translate('checkout.verify.mismatch');
        return;
      }
      state.verify.phone = phone;
      state.verify.verified = true;
      saveState();
      stopCountdown();
      lastSentCode = '';
      updateStatusMessage();
      showToast(translate('checkout.verify.success'));
      showStep(2);
    }

    function handleShippingSubmit(event){
      event.preventDefault();
      const formData = new FormData(shippingForm);
      state.shipping.address = formData.get('address')?.toString().trim() || '';
      state.shipping.city = formData.get('city')?.toString().trim() || '';
      state.shipping.state = formData.get('state')?.toString().trim() || '';
      state.shipping.postcode = formData.get('postcode')?.toString().trim() || '';
      state.shipping.delivery = formData.get('delivery')?.toString() || 'standard';
      saveState();
      showStep(3);
    }

    function formatCardNumber(value){
      return value.replace(/[^0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    function formatExpiry(value){
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 4);
      if (cleaned.length <= 2) return cleaned;
      return `${cleaned.slice(0,2)}/${cleaned.slice(2)}`;
    }

    function handlePaymentSubmit(event){
      event.preventDefault();
      const formData = new FormData(paymentForm);
      state.payment.method = formData.get('paymentMethod')?.toString() || 'visa';
      if (state.payment.method === 'visa'){
        state.payment.cardName = formData.get('cardName')?.toString().trim() || '';
        state.payment.cardNumber = formData.get('cardNumber')?.toString().trim() || '';
        state.payment.cardExpiry = formData.get('cardExpiry')?.toString().trim() || '';
        state.payment.cardCvv = formData.get('cardCvv')?.toString().trim() || '';
      } else {
        state.payment.cardName = '';
        state.payment.cardNumber = '';
        state.payment.cardExpiry = '';
        state.payment.cardCvv = '';
      }
      saveState();
      renderSummary();
      showStep(4);
    }

    function computeShippingFee(){
      const fees = { standard: 15, express: 25, pickup: 0 };
      return fees[state.shipping.delivery] ?? 15;
    }

    function renderSummary(){
      if (!summaryEl) return;
      const cart = loadCart();
      if (!cart.length){
        summaryEl.innerHTML = `<div class="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 text-sm text-gray-600">${translate('checkout.summary.empty')}</div>`;
        return;
      }
      const items = cart.map(item => {
        const product = PRODUCTS[item.id];
        if (!product) return '';
        const total = formatMYR(item.qty * (product.price || 0));
        return `<div class="flex items-center justify-between gap-4">
          <div>
            <p class="font-semibold text-gray-900">${escapeHtml(getProductName(product))}</p>
            <p class="text-xs text-gray-500">× ${item.qty}</p>
          </div>
          <p class="text-sm font-medium text-gray-800">${total}</p>
        </div>`;
      }).join('');

      const subtotal = calcSubtotal(cart);
      const shippingFee = computeShippingFee();
      const total = subtotal + shippingFee;
      const paymentLabel = translate(`checkout.summary.method.${state.payment.method}`);
      const deliveryLabel = translate(`checkout.shipping.speed.${state.shipping.delivery}`);

      summaryEl.innerHTML = `
        <div class="grid gap-4">
          <div class="rounded-2xl border border-gray-200 p-4 text-sm text-gray-700">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">${translate('checkout.summary.account')}</h4>
            <p>${escapeHtml(state.account.fullName)}</p>
            <p>${escapeHtml(state.account.email)}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 p-4 text-sm text-gray-700">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">${translate('checkout.summary.contact')}</h4>
            <p>${escapeHtml(state.verify.phone)}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 p-4 text-sm text-gray-700">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">${translate('checkout.summary.shipping')}</h4>
            <p>${escapeHtml(state.shipping.address)}</p>
            <p>${escapeHtml([state.shipping.postcode, state.shipping.city].filter(Boolean).join(' '))}</p>
            <p>${escapeHtml(state.shipping.state)}</p>
            <p class="mt-1 text-xs text-gray-500">${deliveryLabel}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 p-4 text-sm text-gray-700">
            <h4 class="text-sm font-semibold text-gray-900 mb-1">${translate('checkout.summary.payment')}</h4>
            <p>${paymentLabel}</p>
          </div>
          <div class="rounded-2xl border border-gray-200 p-4 text-sm text-gray-700">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">${translate('checkout.summary.items')}</h4>
            <div class="space-y-2">${items}</div>
            <div class="mt-4 border-t border-gray-200 pt-3 space-y-2 text-sm">
              <div class="flex justify-between"><span>${translate('checkout.summary.subtotal')}</span><span>${formatMYR(subtotal)}</span></div>
              <div class="flex justify-between"><span>${translate('checkout.summary.shippingFee')}</span><span>${formatMYR(shippingFee)}</span></div>
              <div class="flex justify-between font-semibold text-gray-900"><span>${translate('checkout.summary.total')}</span><span>${formatMYR(total)}</span></div>
            </div>
          </div>
        </div>`;
    }

    function formatDateTime(ts){
      const lang = localStorage.getItem(LANG_KEY) || getSavedLang();
      return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-Hant' : 'en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ts));
    }

    function computeEtaTimestamp(){
      const now = Date.now();
      const days = { standard: 4, express: 2, pickup: 0 };
      const duration = days[state.shipping.delivery] ?? 4;
      return now + duration * 24 * 60 * 60 * 1000;
    }

    function renderTracking(order){
      if (!successSection || !trackingNumberEl || !trackingEtaEl || !timelineEl) return;
      successSection.classList.remove('hidden');
      trackingNumberEl.textContent = order.trackingNumber;
      trackingEtaEl.textContent = translate('checkout.tracking.eta', { date: formatDateTime(order.eta) });

      const offsets = {
        standard: [0, 6, 30, 70],
        express: [0, 3, 12, 30],
        pickup: [0, 3, 6, 20]
      };
      const delivery = order.delivery || state.shipping.delivery;
      const schedule = offsets[delivery] || offsets.standard;
      const finalKey = delivery === 'pickup' ? 'pickup' : 'out';
      const stages = [
        { key: 'ordered', offset: schedule[0] },
        { key: 'preparing', offset: schedule[1] },
        { key: 'shipped', offset: schedule[2] },
        { key: finalKey, offset: schedule[3] }
      ];

      timelineEl.innerHTML = stages.map((stage, index) => {
        const timestamp = order.createdAt + stage.offset * 60 * 60 * 1000;
        const nameKey = stage.key === 'pickup' ? 'checkout.tracking.stage.pickup' : `checkout.tracking.stage.${stage.key}`;
        const noteKey = stage.key === 'pickup' ? 'checkout.tracking.stage.note.pickup' : `checkout.tracking.stage.note.${stage.key}`;
        const reached = index === 0;
        return `<div class="relative pl-10 timeline-item">
          <div class="absolute left-0 top-1 h-3 w-3 rounded-full ${reached ? 'bg-brand-red' : 'bg-gray-300'}"></div>
          <p class="text-sm font-semibold text-gray-900">${translate(nameKey)}</p>
          <p class="text-xs text-gray-500">${formatDateTime(timestamp)}</p>
          <p class="mt-1 text-sm text-gray-600">${translate(noteKey)}</p>
        </div>`;
      }).join('');
    }

    function handlePlaceOrder(){
      const cart = loadCart();
      if (!cart.length){
        if (reviewErrorEl){
          reviewErrorEl.textContent = translate('checkout.review.error');
          reviewErrorEl.classList.remove('hidden');
        }
        return;
      }
      if (reviewErrorEl) reviewErrorEl.classList.add('hidden');
      const order = {
        trackingNumber: `OSUN${Date.now().toString().slice(-8)}`,
        createdAt: Date.now(),
        delivery: state.shipping.delivery,
        eta: computeEtaTimestamp()
      };
      currentOrder = order;
      saveOrder(order);
      renderTracking(order);
      saveCart([]);
      updateCartCount();
      renderCart();
      renderSummary();
      showToast(translate('checkout.success.tag'));
      successSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function bindBackButtons(){
      root.querySelectorAll('[data-checkout-back]').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-checkout-back');
          const index = stepsOrder.indexOf(target);
          if (index >= 0) showStep(index);
        });
      });
    }

    if (loginForm){
      loginForm.addEventListener('submit', handleLoginSubmit);
      loginForm.addEventListener('input', () => {
        if (loginErrorEl) loginErrorEl.classList.add('hidden');
      });
    }
    if (accountForm) accountForm.addEventListener('submit', handleAccountSubmit);
    if (verifyForm) verifyForm.addEventListener('submit', handleVerifySubmit);
    if (shippingForm) shippingForm.addEventListener('submit', handleShippingSubmit);
    if (paymentForm) paymentForm.addEventListener('submit', handlePaymentSubmit);
    if (sendBtn) sendBtn.addEventListener('click', requestSmsCode);
    if (resendBtn) resendBtn.addEventListener('click', () => {
      if (!resendBtn.disabled) requestSmsCode();
    });
    if (skipVerifyBtn){
      skipVerifyBtn.addEventListener('click', () => {
        const phoneInput = document.getElementById('checkoutPhone');
        const fallbackPhone = '+60 12-345 6789';
        const phone = phoneInput ? (phoneInput.value.trim() || fallbackPhone) : fallbackPhone;
        if (phoneInput && !phoneInput.value.trim()) phoneInput.value = phone;
        state.verify.phone = phone;
        state.verify.verified = true;
        saveState();
        stopCountdown();
        lastSentCode = '';
        updateStatusMessage();
        showToast(translate('checkout.verify.success'));
        showStep(2);
      });
    }
    if (cardNumberInput){
      cardNumberInput.addEventListener('input', event => {
        const target = event.target;
        target.value = formatCardNumber(target.value);
      });
    }
    if (cardExpiryInput){
      cardExpiryInput.addEventListener('input', event => {
        const target = event.target;
        target.value = formatExpiry(target.value);
      });
    }
    root.querySelectorAll('#checkoutPaymentOptions input[name="paymentMethod"]').forEach(radio => {
      radio.addEventListener('change', event => {
        state.payment.method = event.target.value;
        toggleCardFields();
      });
    });
    if (placeOrderBtn) placeOrderBtn.addEventListener('click', handlePlaceOrder);

    if (demoCardBtn){
      demoCardBtn.addEventListener('click', () => {
        state.payment.method = 'visa';
        state.payment.cardName = state.account.fullName || 'Osun Demo';
        state.payment.cardNumber = '4242 4242 4242 4242';
        state.payment.cardExpiry = '12/34';
        state.payment.cardCvv = '123';
        saveState();
        hydrateForms();
        showToast(translate('checkout.payment.fillDemo.toast'));
      });
    }

    scrollButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selector = btn.getAttribute('data-scroll-target');
        if (!selector) return;
        const target = selector ? root.querySelector(selector) : null;
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const focusable = target.querySelector('input, textarea');
        if (focusable) focusable.focus({ preventScroll: true });
      });
    });

    bindBackButtons();
    hydrateForms();
    renderSummary();
    showStep(currentStepIndex);
    if (currentOrder){
      renderTracking(currentOrder);
    }

    document.addEventListener('osun:langchange', () => {
      updateProgress();
      updateStatusMessage();
      renderSummary();
      if (loginErrorEl && !loginErrorEl.classList.contains('hidden')){
        loginErrorEl.textContent = translate('checkout.login.error');
      }
      if (currentOrder) renderTracking(currentOrder);
    });
  }

  function initEvents(){
    document.getElementById('lang-zh')?.addEventListener('click', () => applyLang('zh'));
    document.getElementById('lang-en')?.addEventListener('click', () => applyLang('en'));

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.getAttribute('data-product-id')));
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
    initHeroOverlay();
    initAOS();
    applyLang(getSavedLang());
    updateCartCount();
    initCheckoutPage();
    renderCart();
    initEvents();
  });

  window.OSUN = {
    getText,
    translate,
    applyLang,
    getCurrentLang: () => localStorage.getItem(LANG_KEY) || getSavedLang(),
    invalidateContent,
    initAOS,
    ensureDemoCart: flowEnsureDemoCart,
    renderOrderSummary: flowRenderSummary,
    flow: {
      getItems: flowGetItems,
      setItems: flowSetItems,
      ensureCart: flowEnsureDemoCart,
      getCustomer: flowGetCustomer,
      setCustomer: flowSetCustomer,
      getTotalCents: flowGetTotal,
      formatCents: flowFormatCents,
      renderSummary: flowRenderSummary,
      buildLineItems: flowBuildLineItems
    }
  };
  window.renderOrderSummary = flowRenderSummary;
})();
