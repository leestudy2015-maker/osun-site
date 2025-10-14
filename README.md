# Osun Beauty & Boutique 靜態網站

這是一個可直接部署的多頁式展示網站，提供首頁、分類頁、品牌故事以及簡易後台紀錄表單。使用 Tailwind CSS CDN 實作，適合快速建立品牌形象頁面。

## 專案結構
- `index.html`：首頁，包含品牌標語、精選分類及門市資訊。
- `categories.html`：依分類選購頁面，呈現主要商品分類。
- `about.html`：品牌故事與創辦人介紹。
- `admin.html`：後台管理表單，可暫存商品名稱、亮點與圖片檔名。
- `js/admin.js`：後台表單的互動邏輯。
- `privacy.html`、`shipping.html`、`returns.html`：政策相關靜態頁面。
- 其他 `.jpg/.png`：示意用圖片資源。

## 部署方式
1. 在 GitHub 建立新儲存庫並上傳所有檔案，或直接上傳到任何支援靜態檔案的主機。
2. 若使用 GitHub Pages：
   - 進入儲存庫設定 → **Pages**。
   - Source 選擇「Deploy from a branch」，分支與資料夾選擇 `main` / `(root)`。
   - 儲存後等待 GitHub Pages 啟用。
3. 若使用 Vercel / Netlify：直接匯入儲存庫，設定入口檔為 `index.html`，無須額外建置流程。

## 開發說明
- Tailwind CSS 透過 CDN 載入，方便快速調整樣式。如需最佳化，可改用官方建置流程以移除未使用的樣式。
- 後台表單僅示意用途，送出後會在頁面顯示整理結果，並不會寫入資料庫。
- 如需擴充功能（多語系、購物車等），建議整合前端框架或後端服務以利維護。
