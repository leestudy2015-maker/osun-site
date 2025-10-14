const form = document.getElementById('adminForm');
const result = document.getElementById('result');

if (form && result) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const title = (document.getElementById('title')?.value || '').trim();
    const description = (document.getElementById('description')?.value || '').trim();
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput && fileInput.files ? fileInput.files[0] : undefined;

    const details = [
      title ? `名稱：${title}` : '名稱：未輸入',
      description ? `亮點：${description}` : '亮點：未提供',
      `圖片：${file ? file.name : '未選擇'}`
    ];

    result.innerHTML = `
      <p class="font-semibold text-brand-rose">更新已暫存：</p>
      <ul class="mt-2 list-disc space-y-1 pl-5">
        ${details.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p class="mt-4 text-xs text-gray-500">＊請將結果提供給網站管理者，以進行正式內容更新。</p>
    `;
    result.classList.remove('hidden');
    form.reset();
  });
}
