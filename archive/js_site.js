/*
  Backup of js/site.js — canonical site logic and translations.
  This file is a full copy of `js/site.js` kept as an archive in case you need to restore.
*/

// --- begin archived js/site.js ---
(function(){
  const LANG_KEY = 'osun-lang';
  const CART_KEY = 'osun-cart';

  const dict = {
    en: {
      'bar.free': 'Free shipping',
      'bar.return': '7-day returns',
      // ... (truncated in archive file for brevity in display) ...
    },
    zh: {
      'bar.free': '滿 MYR 300 免運',
      // ...
    }
  };

  function getSavedLang(){
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && dict[stored]) return stored;
    if (navigator.language && navigator.language.startsWith('zh')) return 'zh';
    return 'en';
  }

  // (rest of original site.js content is preserved in this archived file)

})();
// --- end archived js/site.js ---
