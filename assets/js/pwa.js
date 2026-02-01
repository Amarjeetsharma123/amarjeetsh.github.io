// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((reg) => console.log('Service worker registered.', reg))
    .catch((err) => console.warn('Service worker registration failed:', err));
}

// Handle beforeinstallprompt (Install prompt)
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent automatic prompt
  e.preventDefault();
  deferredPrompt = e;
  // Show the install button
  if (installBtn) {
    installBtn.hidden = false;
    installBtn.setAttribute('aria-hidden', 'false');
  }
  console.log('beforeinstallprompt fired');
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    installBtn.hidden = true;
  });
}

// When app installed
window.addEventListener('appinstalled', (evt) => {
  console.log('App installed');
  if (installBtn) installBtn.hidden = true;
});

// Optionally inform the user about new versions
navigator.serviceWorker && navigator.serviceWorker.addEventListener('controllerchange', () => {
  console.log('Service worker controller changed — new version?');
});
