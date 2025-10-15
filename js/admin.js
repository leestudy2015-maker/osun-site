const STORAGE_KEY = 'osun-admin-config';
const AUTH_KEY = 'osun-admin-auth';
const ADMIN_PASSWORD = 'OsunGlow2024!';

const form = document.getElementById('adminForm');
const previewTitle = document.getElementById('previewTitle');
const previewSubtitle = document.getElementById('previewSubtitle');
const previewPrimary = document.getElementById('previewPrimary');
const previewSecondary = document.getElementById('previewSecondary');
const resultBox = document.getElementById('admin-result');
const resetBtn = document.getElementById('adminReset');
const exportBtn = document.getElementById('adminExport');
const loginSection = document.getElementById('admin-login');
const appShell = document.getElementById('admin-app');
const loginForm = document.getElementById('adminLoginForm');
const passwordField = document.getElementById('adminPassword');
const loginError = document.getElementById('adminLoginError');

const defaults = {
  title: previewTitle?.textContent?.trim() || 'Elegance. Confidence. Osun.',
  description: previewSubtitle?.textContent?.trim() || 'Discover your radiance where fashion meets inner glow.',
  primaryCta: previewPrimary?.textContent?.trim() || 'Shop Now',
  secondaryCta: previewSecondary?.textContent?.trim() || 'Explore Beauty',
  imageUrl: ''
};

function t(key){
  return (window.OSUN && typeof window.OSUN.getText === 'function') ? window.OSUN.getText(key) : key;
}

function readForm(){
  return {
    title: document.getElementById('title')?.value?.trim() || '',
    description: document.getElementById('description')?.value?.trim() || '',
    primaryCta: document.getElementById('primaryCta')?.value?.trim() || '',
    secondaryCta: document.getElementById('secondaryCta')?.value?.trim() || '',
    imageUrl: document.getElementById('imageUrl')?.value?.trim() || ''
  };
}

function applyToForm(data){
  if (!form) return;
  document.getElementById('title') && (document.getElementById('title').value = data.title || '');
  document.getElementById('description') && (document.getElementById('description').value = data.description || '');
  document.getElementById('primaryCta') && (document.getElementById('primaryCta').value = data.primaryCta || '');
  document.getElementById('secondaryCta') && (document.getElementById('secondaryCta').value = data.secondaryCta || '');
  document.getElementById('imageUrl') && (document.getElementById('imageUrl').value = data.imageUrl || '');
  updatePreview(data);
}

function updatePreview(data){
  if (previewTitle) previewTitle.textContent = data.title || defaults.title;
  if (previewSubtitle) previewSubtitle.textContent = data.description || defaults.description;
  if (previewPrimary) previewPrimary.textContent = data.primaryCta || defaults.primaryCta;
  if (previewSecondary) previewSecondary.textContent = data.secondaryCta || defaults.secondaryCta;
}

function saveData(data){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err){
    console.warn('Failed to load admin config', err);
    return null;
  }
}

function showResult(lines, headingKey = 'admin.result.success'){
  if (!resultBox) return;
  resultBox.innerHTML = `
    <p class="font-semibold text-brand.red">${t(headingKey)}</p>
    <ul class="mt-3 list-disc space-y-1 pl-5">
      ${lines.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <p class="mt-4 text-xs text-gray-500">${t('admin.notes.desc')}</p>
  `;
  resultBox.classList.remove('hidden');
}

function isAuthenticated(){
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

function unlockAdmin(){
  sessionStorage.setItem(AUTH_KEY, 'true');
  revealApp();
}

function revealApp(){
  loginSection?.classList.add('hidden');
  appShell?.classList.remove('hidden');
  if (loginError) loginError.classList.add('hidden');
  if (passwordField) passwordField.value = '';
  if (form){
    const stored = loadData();
    applyToForm(stored || defaults);
  }
}

function showLogin(){
  appShell?.classList.add('hidden');
  loginSection?.classList.remove('hidden');
  if (loginError) loginError.classList.add('hidden');
  if (passwordField) passwordField.focus();
}

function handleLogin(event){
  event.preventDefault();
  const value = passwordField?.value || '';
  if (value === ADMIN_PASSWORD){
    unlockAdmin();
    showResult([t('admin.login.success')], 'admin.login.successTitle');
  } else {
    if (loginError){
      loginError.textContent = t('admin.login.error');
      loginError.classList.remove('hidden');
    }
    if (passwordField){
      passwordField.focus();
      passwordField.select();
    }
  }
}

function handleSubmit(event){
  event.preventDefault();
  const data = readForm();
  saveData(data);
  updatePreview(data);

  const fileInput = document.getElementById('imageUpload');
  const fileName = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0].name : '';
  if (fileInput) fileInput.value = '';

  const lines = [
    `${t('admin.hero.title')}: ${data.title || t('admin.result.nameFallback')}`,
    `${t('admin.hero.subtitle')}: ${data.description || '—'}`,
    `${t('admin.hero.cta')}: ${data.primaryCta || '—'}`,
    `${t('admin.hero.secondary')}: ${data.secondaryCta || '—'}`,
    `${t('admin.result.image')}: ${fileName || data.imageUrl || t('admin.result.imageFallback')}`
  ];

  showResult(lines);
}

function handleReset(){
  localStorage.removeItem(STORAGE_KEY);
  applyToForm(defaults);
  showResult([
    `${t('admin.hero.title')}: ${defaults.title}`,
    `${t('admin.hero.subtitle')}: ${defaults.description}`
  ]);
}

function handleExport(){
  const data = loadData() || readForm();
  const payload = JSON.stringify(data, null, 2);
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(payload).then(() => {
      showResult([t('admin.result.exportReady')]);
    }).catch(() => {
      showResult([payload]);
    });
  } else {
    showResult([payload]);
  }
}

if (form){
  form.addEventListener('submit', handleSubmit);
  form.querySelectorAll('input[type="text"], input[type="url"], textarea').forEach(field => {
    field.addEventListener('input', () => {
      const liveData = readForm();
      updatePreview(liveData);
    });
  });
}

resetBtn?.addEventListener('click', handleReset);
exportBtn?.addEventListener('click', handleExport);

if (passwordField){
  passwordField.addEventListener('input', () => {
    if (loginError) loginError.classList.add('hidden');
  });
}

if (loginForm){
  loginForm.addEventListener('submit', handleLogin);
}

if (isAuthenticated()){
  revealApp();
} else {
  showLogin();
}
