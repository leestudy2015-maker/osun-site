const STORAGE_KEY = 'osun-admin-config';

const form = document.getElementById('adminForm');
const previewTitle = document.getElementById('previewTitle');
const previewSubtitle = document.getElementById('previewSubtitle');
const previewPrimary = document.getElementById('previewPrimary');
const previewSecondary = document.getElementById('previewSecondary');
const resultBox = document.getElementById('admin-result');
const resetBtn = document.getElementById('adminReset');
const exportBtn = document.getElementById('adminExport');

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

function showResult(lines){
  if (!resultBox) return;
  resultBox.innerHTML = `
    <p class="font-semibold text-brand.red">${t('admin.result.success')}</p>
    <ul class="mt-3 list-disc space-y-1 pl-5">
      ${lines.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <p class="mt-4 text-xs text-gray-500">${t('admin.notes.desc')}</p>
  `;
  resultBox.classList.remove('hidden');
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
  const stored = loadData();
  if (stored) applyToForm(stored);

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
