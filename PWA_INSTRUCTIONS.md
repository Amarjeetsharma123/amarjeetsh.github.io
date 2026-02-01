# PWA Installation & Testing — Amarjeet Portfolio ✅

## What I added
- `manifest.json` (root) — App name, icons, theme, start URL, display=standalone
- `service-worker.js` (root) — Caching + offline fallback to `/offline.html`
- `/offline.html` — Simple offline page
- `assets/js/pwa.js` — Registers SW and handles the `beforeinstallprompt` (Install button)
- Small install button in `index.html` and styles in `assets/css/style.css`

## Quick local testing (Chrome Desktop)
1. Serve the site over `http://localhost` (Chrome requires HTTPS for SW on remote hosts, but `localhost` is allowed).
   - Example: `npx http-server -c-1` (or any static server) from the project root.
2. Open DevTools → Application tab → **Manifest** to preview icons and settings.
3. In DevTools → Application → Service Workers: check that `service-worker.js` is registered.
4. Enable Offline in DevTools → Network and refresh — site should show `/offline.html` when navigating.
5. To test install behavior: in DevTools → Application → Manifest, click the install link or trigger the beforeinstallprompt flow. You should also see the floating **Install App** button when Chrome allows it.

## Test on Android (Chrome)
1. Deploy to a HTTPS-hosted URL (or use `ngrok` to tunnel localhost over HTTPS).
2. Open the site in Chrome on Android.
3. After meeting PWA criteria, Chrome will show an install prompt or you can use the install button added to the page.
4. After installing, the app will open in standalone mode (no address bar), and use your icons and splash screen provided by Chrome.

## Notes & Tips
- Icons: I used the existing `assets/images/AS.png` for `192x192` and `512x512`. For best results replace these with properly sized images (square, 192 and 512 px). Consider providing maskable icons for nicer results on Android.
- To force a new service worker version: update `CACHE_NAME` in `service-worker.js` and reload; the new SW will install and activate (old caches are cleared).
- Offline improvements: currently static assets and pages are cached. You can expand/adjust `URLS_TO_CACHE` in `service-worker.js` to customize which resources are cached.

If you want, I can:
- Add real icon files (192x192, 512x512 + maskable) and generate a proper splash image set for iOS.
- Add a small UI notice when an update is available.

Enjoy — you now have a working PWA with install prompt, offline page, and standalone mode! 🚀