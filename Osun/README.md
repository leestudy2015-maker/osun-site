# Osun Beauty & Boutique (Static Site)
A ready-to-deploy static site with multi-language (EN/ZH/BM), AOS animations, responsive navbar, demo cart (localStorage), and basic policy pages.

## How to deploy on GitHub Pages
1. Create a new repository on GitHub, e.g. `osun-boutique`.
2. Upload all files in this folder to the repo root.
3. Commit and push.
4. In the repo settings → **Pages**, set:
   - Source: `Deploy from a branch`
   - Branch: `main` (or `master`), folder `/ (root)`
5. Wait for build → Your site will be available at `https://<username>.github.io/osun-boutique/`.

## Deploy on Vercel
- Import the repository on https://vercel.com/import
- Use `index.html` as the entry. No build step required for this static version.

## Notes
- Tailwind is included via CDN for convenience. For production, consider a build setup to purge unused CSS.
- Cart is demo-only (no backend). Integrate Stripe/PayPal/FPX for real checkout later.
