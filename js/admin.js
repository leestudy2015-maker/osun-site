const STORAGE_KEY = (window.OSUN_CONTENT && window.OSUN_CONTENT.STORAGE_KEY) || 'osun-content-config';
const AUTH_KEY = 'osun-admin-auth';
const LOCK_KEY = 'osun-admin-lock';
// NOTE: For security, do not store real admin passwords in client-side JavaScript.
// If you need a placeholder for local testing, set ADMIN_PASSWORD to 'REPLACE_ME' and
// configure your local deployment to check a server-side secret instead.
const ADMIN_PASSWORD = 'REPLACE_ME';
const ADMIN_PASS_HASH = '0cd3ae9c48e1cc5b608cedeb3d7c207b59a53c730ba3f35cf331565edde4ccaf';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 30000;

const loginSection = document.getElementById('admin-login');
const appShell = document.getElementById('admin-app');
const loginForm = document.getElementById('adminLoginForm');
const passwordField = document.getElementById('adminPassword');
const loginError = document.getElementById('adminLoginError');
const heroWrap = document.getElementById('hero-form-wrap');
const categoryWrap = document.getElementById('category-manager');
const addCategoryBtn = document.getElementById('categoryAddItem');
const aboutWrap = document.getElementById('about-form-wrap');
const exportBtn = document.getElementById('adminExport');
const resultBox = document.getElementById('admin-result');

const defaults = window.OSUN_CONTENT && typeof window.OSUN_CONTENT.clone === 'function'
  ? window.OSUN_CONTENT.clone()
  : {};

let adminConfig = loadConfig();
let activeCategory = 'wardrobe';
let pendingHeroImage = null;
let pendingFounderImage = null;
let failedAttempts = 0;

const languages = ['en', 'zh'];

function clone(obj){
  return JSON.parse(JSON.stringify(obj || {}));
}

async function hashPassword(value){
  if (typeof value !== 'string' || !value) return '';
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof TextEncoder !== 'undefined'){
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
      return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err){
    console.warn('Password hashing failed, falling back to lightweight hash.', err);
  }
  let hash = 0;
  for (let i = 0; i < value.length; i += 1){
    hash = ((hash << 5) - hash) + value.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

function getLockUntil(){
  const raw = sessionStorage.getItem(LOCK_KEY);
  if (!raw) return 0;
  const parsed = parseInt(raw, 10);
  if (Number.isNaN(parsed)){
    sessionStorage.removeItem(LOCK_KEY);
    return 0;
  }
  if (Date.now() >= parsed){
    sessionStorage.removeItem(LOCK_KEY);
    return 0;
  }
  return parsed;
}

function setLock(){
  const until = Date.now() + LOCK_DURATION_MS;
  sessionStorage.setItem(LOCK_KEY, String(until));
  failedAttempts = 0;
  return until;
}

function formatSeconds(ms){
  return Math.max(1, Math.ceil(ms / 1000));
}

function loadConfig(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : null;
    if (window.OSUN_CONTENT && typeof window.OSUN_CONTENT.merge === 'function'){
      return window.OSUN_CONTENT.merge(stored);
    }
    if (stored) return stored;
    return clone(defaults);
  } catch (err){
    console.warn('Failed to parse admin config', err);
    return clone(defaults);
  }
}

function saveConfig(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(adminConfig));
  if (window.OSUN && typeof window.OSUN.invalidateContent === 'function'){
    window.OSUN.invalidateContent();
  }
}

function t(key, vars){
  if (window.OSUN){
    if (typeof window.OSUN.translate === 'function'){
      return window.OSUN.translate(key, vars);
    }
    if (typeof window.OSUN.getText === 'function'){
      let template = window.OSUN.getText(key);
      if (vars && typeof template === 'string'){
        Object.keys(vars).forEach(k => {
          template = template.replace(new RegExp(`{{\s*${k}\s*}}`, 'g'), vars[k]);
        });
      }
      return template;
    }
  }
  if (!vars) return key;
  return Object.keys(vars).reduce((acc, current) => acc.replace(new RegExp(`{{\s*${current}\s*}}`, 'g'), vars[current]), key);
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

function showResult(messageKey, lines = []){
  if (!resultBox) return;
  const items = Array.isArray(lines) ? lines : [String(lines)];
  const listMarkup = items.length
    ? `<ul class="mt-3 list-disc space-y-1 pl-5">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';
  resultBox.innerHTML = `
    <p class="font-semibold text-brand.red">${escapeHtml(t(messageKey))}</p>
    ${listMarkup}
    <p class="mt-4 text-xs text-gray-500">${escapeHtml(t('admin.notes.desc'))}</p>
  `;
  resultBox.classList.remove('hidden');
}

function ensureCategoryGroup(key){
  adminConfig.categories = adminConfig.categories || clone(defaults.categories);
  adminConfig.categories.groups = adminConfig.categories.groups || clone(defaults.categories?.groups);
  if (!adminConfig.categories.groups[key]){
    adminConfig.categories.groups[key] = clone(defaults.categories?.groups?.[key]);
  }
  adminConfig.categories.groups[key].items = adminConfig.categories.groups[key].items || [];
  return adminConfig.categories.groups[key];
}

function createEmptyCategoryItem(){
  const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return {
    id,
    price: '',
    image: '',
    badge: { theme: 'rose', en: '', zh: '' },
    texts: {
      en: { name: '', description: '' },
      zh: { name: '', description: '' }
    },
    inventory: { en: '', zh: '' }
  };
}
function renderHeroForm(){
  if (!heroWrap) return;
  adminConfig.hero = adminConfig.hero || clone(defaults.hero);
  const hero = adminConfig.hero;
  const primaryLink = hero.primaryLink || hero.en?.primaryLink || '#shop';
  const secondaryLink = hero.secondaryLink || hero.en?.secondaryLink || 'about.html';
  heroWrap.innerHTML = `
    <form id="heroForm" class="space-y-6">
      <div class="grid gap-6 md:grid-cols-2">
        ${languages.map(lang => `
          <fieldset class="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 space-y-4">
            <legend class="text-sm font-semibold text-brand.red">${escapeHtml(t(`admin.language.${lang}`))}</legend>
            <div>
              <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))}</label>
              <input name="hero-${lang}-title" value="${escapeHtml(hero[lang]?.title || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.subtitle'))}</label>
              <textarea name="hero-${lang}-subtitle" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(hero[lang]?.subtitle || '')}</textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.cta'))}</label>
              <input name="hero-${lang}-primaryCta" value="${escapeHtml(hero[lang]?.primaryCta || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.secondary'))}</label>
              <input name="hero-${lang}-secondaryCta" value="${escapeHtml(hero[lang]?.secondaryCta || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
            </div>
          </fieldset>
        `).join('')}
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.primaryLink'))}</label>
          <input name="hero-primaryLink" value="${escapeHtml(primaryLink)}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.secondaryLink'))}</label>
          <input name="hero-secondaryLink" value="${escapeHtml(secondaryLink)}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.imageUrl'))}</label>
          <input name="hero-imageUrl" value="${escapeHtml(hero.en?.image || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.imageUpload'))}</label>
          <input name="hero-imageUpload" type="file" accept="image/*" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" />
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
        <button type="submit" class="shine-btn rounded-full bg-brand.red px-6 py-3 text-sm font-semibold text-white shadow hover:bg-rose-600 transition">${escapeHtml(t('admin.hero.save'))}</button>
        <button type="button" data-action="reset-hero" class="shine-btn rounded-full border border-brand.red bg-rose-50/80 px-6 py-3 text-sm font-semibold text-brand.red hover:bg-rose-100 hover:shadow transition">${escapeHtml(t('admin.hero.reset'))}</button>
      </div>
    </form>
  `;

  const form = document.getElementById('heroForm');
  form.addEventListener('submit', handleHeroSubmit);
  form.querySelector('input[name="hero-imageUpload"]').addEventListener('change', handleHeroImageUpload);
  form.querySelector('[data-action="reset-hero"]').addEventListener('click', resetHero);
}

function handleHeroImageUpload(event){
  const file = event.target.files && event.target.files[0];
  if (!file){
    pendingHeroImage = null;
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    pendingHeroImage = reader.result;
  };
  reader.readAsDataURL(file);
}

function handleHeroSubmit(event){
  event.preventDefault();
  const data = new FormData(event.target);
  adminConfig.hero = adminConfig.hero || clone(defaults.hero);
  languages.forEach(lang => {
    adminConfig.hero[lang] = adminConfig.hero[lang] || {};
    adminConfig.hero[lang].title = data.get(`hero-${lang}-title`) || '';
    adminConfig.hero[lang].subtitle = data.get(`hero-${lang}-subtitle`) || '';
    adminConfig.hero[lang].primaryCta = data.get(`hero-${lang}-primaryCta`) || '';
    adminConfig.hero[lang].secondaryCta = data.get(`hero-${lang}-secondaryCta`) || '';
  });
  adminConfig.hero.primaryLink = data.get('hero-primaryLink') || '#shop';
  adminConfig.hero.secondaryLink = data.get('hero-secondaryLink') || 'about.html';
  const imageUrl = data.get('hero-imageUrl');
  if (imageUrl){
    languages.forEach(lang => {
      adminConfig.hero[lang].image = imageUrl;
    });
  }
  if (pendingHeroImage){
    languages.forEach(lang => {
      adminConfig.hero[lang].image = pendingHeroImage;
    });
    pendingHeroImage = null;
  }
  saveConfig();
  showResult('admin.result.heroSaved', [
    `${t('admin.language.en')}: ${adminConfig.hero.en?.title || t('admin.result.nameFallback')}`,
    `${t('admin.language.zh')}: ${adminConfig.hero.zh?.title || t('admin.result.nameFallback')}`
  ]);
}

function resetHero(){
  adminConfig.hero = clone(defaults.hero);
  pendingHeroImage = null;
  saveConfig();
  renderHeroForm();
  showResult('admin.result.heroSaved', [t('admin.hero.reset')]);
}
function groupLabel(key){
  const map = {
    wardrobe: t('catpage.wardrobe.tag'),
    ritual: t('catpage.ritual.tag'),
    designer: t('catpage.designer.tag')
  };
  return map[key] || key;
}

function renderCategoryManager(){
  if (!categoryWrap) return;
  adminConfig.categories = adminConfig.categories || clone(defaults.categories);
  adminConfig.categories.groups = adminConfig.categories.groups || clone(defaults.categories?.groups) || {};
  const groups = adminConfig.categories.groups;
  if (!groups[activeCategory]){
    const keys = Object.keys(groups);
    if (keys.length){
      activeCategory = keys[0];
    }
  }
  ensureCategoryGroup(activeCategory);
  const items = groups[activeCategory]?.items || [];
  const themeLabels = {
    rose: t('admin.categories.theme.rose'),
    amber: t('admin.categories.theme.amber'),
    emerald: t('admin.categories.theme.emerald'),
    slate: t('admin.categories.theme.slate'),
    violet: t('admin.categories.theme.violet'),
    sky: t('admin.categories.theme.sky')
  };
  categoryWrap.innerHTML = `
    <div class="flex flex-wrap gap-3" role="tablist">
      ${Object.keys(groups).map(key => {
        const active = key === activeCategory;
        return `<button type="button" data-category-tab="${key}" class="shine-btn rounded-full ${active ? 'bg-brand.red text-white shadow' : 'border border-brand.red bg-rose-50/80 text-brand.red hover:bg-rose-100 hover:shadow'} px-4 py-2 text-sm font-semibold">${escapeHtml(groupLabel(key))}</button>`;
      }).join('')}
    </div>
    <div id="categoryItemsWrap" class="mt-6 space-y-6">
      ${items.length ? items.map((item, index) => renderCategoryItem(item, index, themeLabels)).join('') : `<p class="text-sm text-gray-500">${escapeHtml(t('admin.categories.empty'))}</p>`}
    </div>
    <div class="mt-6 flex flex-wrap gap-3">
      <button type="button" class="shine-btn rounded-full bg-brand.red px-6 py-3 text-sm font-semibold text-white shadow hover:bg-rose-600 transition" data-action="save-category">${escapeHtml(t('admin.categories.save'))}</button>
      <button type="button" class="shine-btn rounded-full border border-brand.red bg-rose-50/80 px-6 py-3 text-sm font-semibold text-brand.red hover:bg-rose-100 hover:shadow transition" data-action="add-item">${escapeHtml(t('admin.categories.add'))}</button>
    </div>
  `;

  categoryWrap.querySelectorAll('[data-category-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category-tab');
      renderCategoryManager();
    });
  });

  const itemsWrap = document.getElementById('categoryItemsWrap');
  if (itemsWrap){
    itemsWrap.addEventListener('input', handleCategoryInput);
    itemsWrap.addEventListener('change', handleCategoryChange);
    itemsWrap.addEventListener('click', handleCategoryClick);
  }
  categoryWrap.querySelector('[data-action="add-item"]').addEventListener('click', addCategoryItem);
  categoryWrap.querySelector('[data-action="save-category"]').addEventListener('click', saveCategoryGroup);
}

function renderCategoryItem(item, index, themeLabels){
  const selectedTheme = item?.badge?.theme || 'rose';
  const themeOptions = Object.keys(themeLabels).map(key => `<option value="${key}" ${key === selectedTheme ? 'selected' : ''}>${escapeHtml(themeLabels[key])}</option>`).join('');
  return `
    <section class="rounded-2xl border border-rose-100 bg-rose-50/40 p-5" data-category-item="${escapeHtml(item.id)}">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-lg font-semibold text-gray-900">${escapeHtml(item.texts?.en?.name || `${t('admin.field.name')} ${index + 1}`)}</h3>
        <div class="flex gap-3 text-sm">
          <button type="button" class="text-gray-600 hover:underline" data-action="move-up">${escapeHtml(t('admin.categories.moveUp'))}</button>
          <button type="button" class="text-gray-600 hover:underline" data-action="move-down">${escapeHtml(t('admin.categories.moveDown'))}</button>
          <button type="button" class="text-red-600 hover:underline" data-action="remove-item">${escapeHtml(t('admin.categories.remove'))}</button>
        </div>
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.price'))}</label>
          <input name="price" value="${escapeHtml(item.price || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.badgeTheme'))}</label>
          <select name="badge-theme" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">
            ${themeOptions}
          </select>
        </div>
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        ${languages.map(lang => `
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.badgeText'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
            <input name="badge-${lang}" value="${escapeHtml(item.badge?.[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
          </div>
        `).join('')}
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        ${languages.map(lang => `
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.name'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
            <input name="name-${lang}" value="${escapeHtml(item.texts?.[lang]?.name || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
          </div>
        `).join('')}
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        ${languages.map(lang => `
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.description'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
            <textarea name="description-${lang}" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(item.texts?.[lang]?.description || '')}</textarea>
          </div>
        `).join('')}
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        ${languages.map(lang => `
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.inventory'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
            <input name="inventory-${lang}" value="${escapeHtml(item.inventory?.[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
          </div>
        `).join('')}
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.imageUrl'))}</label>
          <input name="imageUrl" value="${escapeHtml(item.image || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.imageUpload'))}</label>
          <input name="imageUpload" type="file" accept="image/*" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" />
        </div>
      </div>
    </section>
  `;
}

function findCategoryItem(itemId){
  const group = ensureCategoryGroup(activeCategory);
  return group.items.find(entry => entry.id === itemId);
}

function handleCategoryInput(event){
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
  const itemEl = target.closest('[data-category-item]');
  if (!itemEl) return;
  const item = findCategoryItem(itemEl.getAttribute('data-category-item'));
  if (!item) return;
  const value = target.value;
  const name = target.getAttribute('name');
  if (name === 'price') item.price = value;
  if (name === 'imageUrl') item.image = value;
  if (name && name.startsWith('badge-') && name !== 'badge-theme'){
    const lang = name.split('-')[1];
    item.badge = item.badge || { theme: 'rose' };
    item.badge[lang] = value;
  }
  if (name && name.startsWith('name-')){
    const lang = name.split('-')[1];
    item.texts = item.texts || {};
    item.texts[lang] = item.texts[lang] || {};
    item.texts[lang].name = value;
  }
  if (name && name.startsWith('description-')){
    const lang = name.split('-')[1];
    item.texts = item.texts || {};
    item.texts[lang] = item.texts[lang] || {};
    item.texts[lang].description = value;
  }
  if (name && name.startsWith('inventory-')){
    const lang = name.split('-')[1];
    item.inventory = item.inventory || {};
    item.inventory[lang] = value;
  }
}

function handleCategoryChange(event){
  const target = event.target;
  const itemEl = target.closest('[data-category-item]');
  if (!itemEl) return;
  const item = findCategoryItem(itemEl.getAttribute('data-category-item'));
  if (!item) return;
  if (target.name === 'badge-theme'){
    item.badge = item.badge || {};
    item.badge.theme = target.value || 'rose';
  }
  if (target.name === 'imageUpload' && target.files && target.files[0]){
    const reader = new FileReader();
    reader.onload = () => {
      item.image = reader.result;
    };
    reader.readAsDataURL(target.files[0]);
    target.value = '';
  }
}

function handleCategoryClick(event){
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.getAttribute('data-action');
  if (action === 'save-category'){
    saveCategoryGroup();
    return;
  }
  const itemEl = button.closest('[data-category-item]');
  if (!itemEl) return;
  const group = ensureCategoryGroup(activeCategory);
  const items = group.items;
  const index = items.findIndex(entry => entry.id === itemEl.getAttribute('data-category-item'));
  if (index === -1) return;
  if (action === 'remove-item'){
    items.splice(index, 1);
    renderCategoryManager();
  }
  if (action === 'move-up' && index > 0){
    const [entry] = items.splice(index, 1);
    items.splice(index - 1, 0, entry);
    renderCategoryManager();
  }
  if (action === 'move-down' && index < items.length - 1){
    const [entry] = items.splice(index, 1);
    items.splice(index + 1, 0, entry);
    renderCategoryManager();
  }
}

function addCategoryItem(){
  const group = ensureCategoryGroup(activeCategory);
  group.items.push(createEmptyCategoryItem());
  renderCategoryManager();
}

function saveCategoryGroup(){
  saveConfig();
  const count = ensureCategoryGroup(activeCategory).items.length;
  showResult('admin.result.categoriesSaved', [`${escapeHtml(groupLabel(activeCategory))}: ${count}`]);
}

function handleFounderImageUpload(event){
  const file = event.target.files && event.target.files[0];
  if (!file){
    pendingFounderImage = null;
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    pendingFounderImage = reader.result;
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function renderAboutForm(){
  if (!aboutWrap) return;
  adminConfig.about = adminConfig.about || clone(defaults.about);
  const about = adminConfig.about;
  const hero = about.hero || clone(defaults.about?.hero);
  const founder = about.founder || clone(defaults.about?.founder);
  const values = about.values || clone(defaults.about?.values);
  const timeline = about.timeline || clone(defaults.about?.timeline);
  const community = about.community || clone(defaults.about?.community);

  const heroTag = hero.tag || {};
  const heroTitle = hero.title || {};
  const heroSubtitle = hero.subtitle || {};
  const heroPrimaryCta = hero.primaryCta || {};
  const heroSecondaryCta = hero.secondaryCta || {};
  const heroPrimaryLink = hero.primaryLink || '#founder';
  const heroSecondaryLink = hero.secondaryLink || 'index.html#visit';

  const founderTag = founder.tag || {};
  const founderTitle = founder.title || {};
  const founderStory = founder.story || {};
  const founderQuote = founder.quote || {};
  const founderAlt = founder.alt || {};
  const highlights = Array.isArray(founder.highlights) && founder.highlights.length
    ? founder.highlights
    : clone(defaults.about?.founder?.highlights || []);

  const valuesTag = values.tag || {};
  const valuesTitle = values.title || {};
  const valuesDescription = values.description || {};
  const valueItems = Array.isArray(values.items) && values.items.length
    ? values.items
    : clone(defaults.about?.values?.items || []);

  const timelineTag = timeline.tag || {};
  const timelineTitle = timeline.title || {};
  const timelineDescription = timeline.description || {};
  const timelineItems = Array.isArray(timeline.items) && timeline.items.length
    ? timeline.items
    : clone(defaults.about?.timeline?.items || []);

  const communityTitle = community.title || {};
  const communityDescription = community.description || {};
  const communityCtaText = community.ctaText || {};
  const communityLink = community.ctaLink || 'index.html#visit';

  aboutWrap.innerHTML = `
    <form id="aboutForm" class="space-y-10" data-highlight-count="${highlights.length}" data-values-count="${valueItems.length}" data-timeline-count="${timelineItems.length}">
      <section class="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
        <h3 class="text-xl font-semibold text-gray-900">${escapeHtml(t('admin.about.heroSection'))}</h3>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          ${languages.map(lang => `
            <fieldset class="space-y-4 rounded-xl border border-white/60 bg-white/50 p-4">
              <legend class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t(`admin.language.${lang}`))}</legend>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.tag'))}</label>
                <input name="aboutHero-${lang}-tag" value="${escapeHtml(heroTag[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))}</label>
                <input name="aboutHero-${lang}-title" value="${escapeHtml(heroTitle[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.subtitle'))}</label>
                <textarea name="aboutHero-${lang}-subtitle" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(heroSubtitle[lang] || '')}</textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.ctaPrimary'))}</label>
                <input name="aboutHero-${lang}-primaryCta" value="${escapeHtml(heroPrimaryCta[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.ctaSecondary'))}</label>
                <input name="aboutHero-${lang}-secondaryCta" value="${escapeHtml(heroSecondaryCta[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
            </fieldset>
          `).join('')}
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.primaryLink'))}</label>
            <input name="aboutHero-primaryLink" value="${escapeHtml(heroPrimaryLink)}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.hero.secondaryLink'))}</label>
            <input name="aboutHero-secondaryLink" value="${escapeHtml(heroSecondaryLink)}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
          </div>
        </div>
      </section>

      <section class="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
        <h3 class="text-xl font-semibold text-gray-900">${escapeHtml(t('admin.about.founderSection'))}</h3>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          ${languages.map(lang => `
            <fieldset class="space-y-4 rounded-xl border border-white/60 bg-white/50 p-4">
              <legend class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t(`admin.language.${lang}`))}</legend>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.tag'))}</label>
                <input name="aboutFounder-${lang}-tag" value="${escapeHtml(founderTag[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))}</label>
                <input name="aboutFounder-${lang}-title" value="${escapeHtml(founderTitle[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.story'))}</label>
                <textarea name="aboutFounder-${lang}-story" rows="4" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(founderStory[lang] || '')}</textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.quote'))}</label>
                <textarea name="aboutFounder-${lang}-quote" rows="2" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(founderQuote[lang] || '')}</textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.altText'))}</label>
                <input name="aboutFounder-${lang}-alt" value="${escapeHtml(founderAlt[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
            </fieldset>
          `).join('')}
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.imageUrl'))}</label>
            <input name="founder-imageUrl" value="${escapeHtml(founder.image || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.imageUpload'))}</label>
            <input name="founder-imageUpload" type="file" accept="image/*" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" />
          </div>
        </div>
        <div class="mt-6 space-y-4">
          <p class="text-sm font-semibold text-gray-700">${escapeHtml(t('admin.about.founderHighlights'))}</p>
          ${highlights.map((entry, idx) => `
            <div class="rounded-xl border border-white/60 bg-white/50 p-4 space-y-3">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t('admin.field.highlight'))} ${idx + 1}</p>
              ${languages.map(lang => `
                <div>
                  <label class="block text-xs font-semibold text-gray-600">${escapeHtml(t(`admin.language.${lang}`))}</label>
                  <input name="aboutFounder-highlight-${lang}-${idx}" value="${escapeHtml(entry?.[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-brand.red focus:outline-none" type="text" />
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </section>

      <section class="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
        <h3 class="text-xl font-semibold text-gray-900">${escapeHtml(t('admin.about.valuesSection'))}</h3>
        <div class="mt-6 grid gap-6 md:grid-cols-3">
          ${languages.map(lang => `
            <fieldset class="space-y-4 rounded-xl border border-white/60 bg-white/50 p-4">
              <legend class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t(`admin.language.${lang}`))}</legend>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.tag'))}</label>
                <input name="aboutValues-${lang}-tag" value="${escapeHtml(valuesTag[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))}</label>
                <input name="aboutValues-${lang}-title" value="${escapeHtml(valuesTitle[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.description'))}</label>
                <textarea name="aboutValues-${lang}-description" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(valuesDescription[lang] || '')}</textarea>
              </div>
            </fieldset>
          `).join('')}
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-3">
          ${valueItems.map((entry, idx) => `
            <div class="rounded-xl border border-white/60 bg-white/50 p-4 space-y-4">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t('admin.about.values.item'))} ${idx + 1}</p>
              ${languages.map(lang => `
                <div>
                  <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
                  <input name="aboutValues-${idx}-title-${lang}" value="${escapeHtml(entry?.title?.[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
                </div>
              `).join('')}
              ${languages.map(lang => `
                <div>
                  <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.description'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
                  <textarea name="aboutValues-${idx}-description-${lang}" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(entry?.description?.[lang] || '')}</textarea>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </section>

      <section class="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
        <h3 class="text-xl font-semibold text-gray-900">${escapeHtml(t('admin.about.timelineSection'))}</h3>
        <div class="mt-6 grid gap-6 md:grid-cols-3">
          ${languages.map(lang => `
            <fieldset class="space-y-4 rounded-xl border border-white/60 bg-white/50 p-4">
              <legend class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t(`admin.language.${lang}`))}</legend>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.tag'))}</label>
                <input name="aboutTimeline-${lang}-tag" value="${escapeHtml(timelineTag[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))}</label>
                <input name="aboutTimeline-${lang}-title" value="${escapeHtml(timelineTitle[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.description'))}</label>
                <textarea name="aboutTimeline-${lang}-description" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(timelineDescription[lang] || '')}</textarea>
              </div>
            </fieldset>
          `).join('')}
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-3">
          ${timelineItems.map((entry, idx) => `
            <div class="rounded-xl border border-white/60 bg-white/50 p-4 space-y-4">
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t('admin.about.timeline.item'))} ${idx + 1}</p>
              ${languages.map(lang => `
                <div>
                  <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
                  <input name="aboutTimeline-${idx}-title-${lang}" value="${escapeHtml(entry?.title?.[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
                </div>
              `).join('')}
              ${languages.map(lang => `
                <div>
                  <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.description'))} (${escapeHtml(t(`admin.language.${lang}`))})</label>
                  <textarea name="aboutTimeline-${idx}-description-${lang}" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(entry?.description?.[lang] || '')}</textarea>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </section>

      <section class="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
        <h3 class="text-xl font-semibold text-gray-900">${escapeHtml(t('admin.about.communitySection'))}</h3>
        <div class="mt-6 grid gap-6 md:grid-cols-3">
          ${languages.map(lang => `
            <fieldset class="space-y-4 rounded-xl border border-white/60 bg-white/50 p-4">
              <legend class="text-xs font-semibold uppercase tracking-[0.25em] text-brand.red">${escapeHtml(t(`admin.language.${lang}`))}</legend>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.title'))}</label>
                <input name="aboutCommunity-title-${lang}" value="${escapeHtml(communityTitle[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.description'))}</label>
                <textarea name="aboutCommunity-description-${lang}" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none">${escapeHtml(communityDescription[lang] || '')}</textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.ctaText'))}</label>
                <input name="aboutCommunity-cta-${lang}" value="${escapeHtml(communityCtaText[lang] || '')}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="text" />
              </div>
            </fieldset>
          `).join('')}
        </div>
        <div class="mt-6">
          <label class="block text-sm font-semibold text-gray-700">${escapeHtml(t('admin.field.ctaLink'))}</label>
          <input name="aboutCommunity-link" value="${escapeHtml(communityLink)}" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-brand.red focus:outline-none" type="url" />
        </div>
      </section>

      <div class="flex flex-wrap gap-3">
        <button type="submit" class="shine-btn rounded-full bg-brand.red px-6 py-3 text-sm font-semibold text-white shadow hover:bg-rose-600 transition">${escapeHtml(t('admin.about.save'))}</button>
        <button type="button" data-action="reset-about" class="shine-btn rounded-full border border-brand.red bg-rose-50/80 px-6 py-3 text-sm font-semibold text-brand.red hover:bg-rose-100 hover:shadow transition">${escapeHtml(t('admin.about.reset'))}</button>
      </div>
    </form>
  `;

  const form = document.getElementById('aboutForm');
  form.addEventListener('submit', handleAboutSubmit);
  form.querySelector('input[name="founder-imageUpload"]').addEventListener('change', handleFounderImageUpload);
  form.querySelector('[data-action="reset-about"]').addEventListener('click', resetAbout);
}

function handleAboutSubmit(event){
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  adminConfig.about = adminConfig.about || clone(defaults.about);
  const about = adminConfig.about;

  about.hero = about.hero || {};
  about.hero.tag = about.hero.tag || {};
  about.hero.title = about.hero.title || {};
  about.hero.subtitle = about.hero.subtitle || {};
  about.hero.primaryCta = about.hero.primaryCta || {};
  about.hero.secondaryCta = about.hero.secondaryCta || {};
  languages.forEach(lang => {
    about.hero.tag[lang] = data.get(`aboutHero-${lang}-tag`) || '';
    about.hero.title[lang] = data.get(`aboutHero-${lang}-title`) || '';
    about.hero.subtitle[lang] = data.get(`aboutHero-${lang}-subtitle`) || '';
    about.hero.primaryCta[lang] = data.get(`aboutHero-${lang}-primaryCta`) || '';
    about.hero.secondaryCta[lang] = data.get(`aboutHero-${lang}-secondaryCta`) || '';
  });
  about.hero.primaryLink = data.get('aboutHero-primaryLink') || '#founder';
  about.hero.secondaryLink = data.get('aboutHero-secondaryLink') || 'index.html#visit';

  about.founder = about.founder || {};
  about.founder.tag = about.founder.tag || {};
  about.founder.title = about.founder.title || {};
  about.founder.story = about.founder.story || {};
  about.founder.quote = about.founder.quote || {};
  about.founder.alt = about.founder.alt || {};
  languages.forEach(lang => {
    about.founder.tag[lang] = data.get(`aboutFounder-${lang}-tag`) || '';
    about.founder.title[lang] = data.get(`aboutFounder-${lang}-title`) || '';
    about.founder.story[lang] = data.get(`aboutFounder-${lang}-story`) || '';
    about.founder.quote[lang] = data.get(`aboutFounder-${lang}-quote`) || '';
    about.founder.alt[lang] = data.get(`aboutFounder-${lang}-alt`) || '';
  });
  const highlightCount = parseInt(form.getAttribute('data-highlight-count') || '0', 10) || 0;
  about.founder.highlights = [];
  for (let i = 0; i < highlightCount; i += 1){
    const entry = {};
    languages.forEach(lang => {
      entry[lang] = data.get(`aboutFounder-highlight-${lang}-${i}`) || '';
    });
    about.founder.highlights.push(entry);
  }
  const founderImageUrl = data.get('founder-imageUrl');
  if (pendingFounderImage){
    about.founder.image = pendingFounderImage;
    pendingFounderImage = null;
  } else if (founderImageUrl){
    about.founder.image = founderImageUrl;
  }

  about.values = about.values || {};
  about.values.tag = about.values.tag || {};
  about.values.title = about.values.title || {};
  about.values.description = about.values.description || {};
  languages.forEach(lang => {
    about.values.tag[lang] = data.get(`aboutValues-${lang}-tag`) || '';
    about.values.title[lang] = data.get(`aboutValues-${lang}-title`) || '';
    about.values.description[lang] = data.get(`aboutValues-${lang}-description`) || '';
  });
  const valuesCount = parseInt(form.getAttribute('data-values-count') || '0', 10) || 0;
  about.values.items = about.values.items || [];
  for (let i = 0; i < valuesCount; i += 1){
    const item = about.values.items[i] || {};
    item.title = item.title || {};
    item.description = item.description || {};
    languages.forEach(lang => {
      item.title[lang] = data.get(`aboutValues-${i}-title-${lang}`) || '';
      item.description[lang] = data.get(`aboutValues-${i}-description-${lang}`) || '';
    });
    about.values.items[i] = item;
  }

  about.timeline = about.timeline || {};
  about.timeline.tag = about.timeline.tag || {};
  about.timeline.title = about.timeline.title || {};
  about.timeline.description = about.timeline.description || {};
  languages.forEach(lang => {
    about.timeline.tag[lang] = data.get(`aboutTimeline-${lang}-tag`) || '';
    about.timeline.title[lang] = data.get(`aboutTimeline-${lang}-title`) || '';
    about.timeline.description[lang] = data.get(`aboutTimeline-${lang}-description`) || '';
  });
  const timelineCount = parseInt(form.getAttribute('data-timeline-count') || '0', 10) || 0;
  about.timeline.items = about.timeline.items || [];
  for (let i = 0; i < timelineCount; i += 1){
    const item = about.timeline.items[i] || {};
    item.title = item.title || {};
    item.description = item.description || {};
    languages.forEach(lang => {
      item.title[lang] = data.get(`aboutTimeline-${i}-title-${lang}`) || '';
      item.description[lang] = data.get(`aboutTimeline-${i}-description-${lang}`) || '';
    });
    about.timeline.items[i] = item;
  }

  about.community = about.community || {};
  about.community.title = about.community.title || {};
  about.community.description = about.community.description || {};
  about.community.ctaText = about.community.ctaText || {};
  languages.forEach(lang => {
    about.community.title[lang] = data.get(`aboutCommunity-title-${lang}`) || '';
    about.community.description[lang] = data.get(`aboutCommunity-description-${lang}`) || '';
    about.community.ctaText[lang] = data.get(`aboutCommunity-cta-${lang}`) || '';
  });
  const communityLink = data.get('aboutCommunity-link');
  about.community.ctaLink = communityLink || 'index.html#visit';

  saveConfig();
  renderAboutForm();
  showResult('admin.result.aboutSaved', [
    `${t('admin.language.en')}: ${about.hero?.title?.en || t('admin.result.nameFallback')}`,
    `${t('admin.language.zh')}: ${about.hero?.title?.zh || t('admin.result.nameFallback')}`
  ]);
}

function resetAbout(){
  adminConfig.about = clone(defaults.about);
  pendingFounderImage = null;
  saveConfig();
  renderAboutForm();
  showResult('admin.result.aboutSaved', [t('admin.about.reset')]);
}

function exportConfig(){
  const json = JSON.stringify(adminConfig, null, 2);
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(json).then(() => {
      showResult('admin.result.exportReady');
    }).catch(() => {
      downloadConfig(json);
    });
  } else {
    downloadConfig(json);
  }
}

function downloadConfig(json){
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'osun-content.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showResult('admin.result.exportReady');
}

function isAuthenticated(){
  return sessionStorage.getItem(AUTH_KEY) === '1';
}

function unlockAdmin(){
  if (loginSection) loginSection.classList.add('hidden');
  if (appShell) appShell.classList.remove('hidden');
  if (resultBox) resultBox.classList.add('hidden');
  if (loginError){
    loginError.classList.add('hidden');
    loginError.textContent = t('admin.login.success');
  }
  renderHeroForm();
  renderCategoryManager();
  renderAboutForm();
}

function showLockMessage(until){
  if (!loginError) return;
  const remainingMs = Math.max(0, until - Date.now());
  loginError.textContent = t('admin.login.locked', { seconds: formatSeconds(remainingMs) });
  loginError.classList.remove('hidden');
}

async function handleLoginSubmit(event){
  event.preventDefault();
  const lockUntil = getLockUntil();
  if (lockUntil){
    showLockMessage(lockUntil);
    return;
  }
  const password = passwordField ? passwordField.value.trim() : '';
  const hashed = await hashPassword(password);
  if (hashed === ADMIN_PASS_HASH){
    sessionStorage.setItem(AUTH_KEY, '1');
    sessionStorage.removeItem(LOCK_KEY);
    failedAttempts = 0;
    if (loginError) loginError.classList.add('hidden');
    if (passwordField) passwordField.value = '';
    showResult('admin.login.successTitle', [t('admin.login.success')]);
    unlockAdmin();
    return;
  }

  failedAttempts += 1;
  if (failedAttempts >= MAX_LOGIN_ATTEMPTS){
    const until = setLock();
    showLockMessage(until);
    return;
  }

  if (loginError){
    loginError.textContent = t('admin.login.error');
    loginError.classList.remove('hidden');
  }
}

function initAdmin(){
  if (addCategoryBtn){
    addCategoryBtn.addEventListener('click', () => {
      if (appShell && appShell.classList.contains('hidden')) return;
      addCategoryItem();
    });
  }
  if (exportBtn){
    exportBtn.addEventListener('click', exportConfig);
  }
  if (loginForm){
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
  if (isAuthenticated()){
    unlockAdmin();
  } else {
    if (loginSection) loginSection.classList.remove('hidden');
    if (appShell) appShell.classList.add('hidden');
    const lockUntil = getLockUntil();
    if (lockUntil){
      showLockMessage(lockUntil);
    } else if (loginError){
      loginError.classList.add('hidden');
      loginError.textContent = t('admin.login.error');
    }
  }
}

document.addEventListener('DOMContentLoaded', initAdmin);
