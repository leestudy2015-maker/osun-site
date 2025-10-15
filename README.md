# Osun Beauty & Boutique 靜態網站

這是一個可直接部署的多頁式展示網站，提供首頁、分類頁、品牌故事、結帳流程以及後台紀錄表單。使用 Tailwind CSS CDN 實作，內建入場動畫、雙語切換、示範購物車與 SMS 驗證結帳體驗，適合快速建立品牌形象頁面。

## 專案結構
- `index.html`：首頁，包含品牌標語、精選分類、入場動畫及示範購物車。
- `categories.html`：依分類選購頁面，呈現主要商品分類。
- `about.html`：品牌故事與創辦人介紹。
- `checkout.html`：安全結帳頁，含帳戶註冊、手機簡訊驗證、付款方式與物流追蹤示意。
- `admin.html`：後台管理表單，可暫存商品名稱、亮點與圖片檔名。
- `js/site.js`：全站多語、購物車、結帳流程與入場動畫邏輯。
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
- 多語與購物車狀態會記錄在瀏覽器 localStorage，重新載入仍能保留選擇。
- 結帳流程使用 sessionStorage 暫存資料，提供密碼註冊、SMS 驗證碼模擬、付款方式與物流節點展示，可依需求串接真實金流與簡訊服務。
- 後台表單具備密碼鎖與即時預覽，送出後會在頁面顯示整理結果並可匯出 JSON，不會寫入資料庫。
- 如需與後端整合，可將 `js/site.js` 與 `js/content.js` 的資料來源改為 API 或串接實際 CMS。

## Headless CMS integration
1. **定義內容模型**：在 Sanity、Contentful、Strapi 等 Headless CMS 中建立與後台相同欄位的模型（首頁 hero、分類輪播、關於我們區塊）。
2. **串接資料來源**：以 CMS API 取代 `js/content.js` 內的預設資料，並沿用頁面上的 `data-content-*` 屬性進行渲染。
3. **同步後台輸出**：使用後台的 JSON 匯出功能作為初始種子資料，協助建立 CMS 內容。
4. **自動化佈署**：在 CMS 設定 Webhook，於內容儲存後觸發靜態網站重新部署或清除快取，確保前台即時更新。
- 後台表單僅示意用途，送出後會在頁面顯示整理結果並可匯出 JSON，不會寫入資料庫。
- 如需與後端整合，可將 `js/site.js` 中的資料來源改為 API 或串接實際 CMS。
