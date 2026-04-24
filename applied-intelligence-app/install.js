const APP_BASE = '/applied-intelligence-app/';
const SERVICE_WORKER_PATH = `${APP_BASE}sw.js`;

let deferredPrompt = null;

function showInstallButton(shouldShow) {
  const button = document.querySelector('[data-install-app]');
  if (button) {
    button.hidden = !shouldShow;
  }
}

function isiOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function showIOSInstallHint() {
  const hint = document.querySelector('[data-ios-install-hint]');
  if (!hint) return;
  hint.hidden = !(isiOS() && !isStandalone());
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register(SERVICE_WORKER_PATH, {
      scope: APP_BASE
    });

    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  } catch (error) {
    console.warn('Applied Intelligence service worker was not registered.', error);
  }
}

async function triggerInstall() {
  if (!deferredPrompt) return false;

  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  deferredPrompt = null;
  showInstallButton(false);
  return result?.outcome === 'accepted';
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton(true);
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  showInstallButton(false);
});

document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  showIOSInstallHint();

  const button = document.querySelector('[data-install-app]');
  if (button) {
    button.addEventListener('click', () => {
      triggerInstall();
    });
  }
});
