const APP_ICON = '/applied-intelligence-app/assets/icons/applied-intelligence-icon.svg';

function ensureLink(rel, href, sizes = null, type = null) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
  if (sizes) link.sizes = sizes;
  if (type) link.type = type;
  return link;
}

function applyApprovedAppIcon() {
  ensureLink('apple-touch-icon', APP_ICON, 'any', 'image/svg+xml');
  ensureLink('icon', APP_ICON, 'any', 'image/svg+xml');
  ensureLink('shortcut icon', APP_ICON, null, 'image/svg+xml');
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event;
  document.documentElement.classList.add('can-install');
  const btn = document.querySelector('[data-install-app]');
  if (btn) btn.hidden = false;
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  document.documentElement.classList.remove('can-install');
  const btn = document.querySelector('[data-install-app]');
  if (btn) btn.hidden = true;
});

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/applied-intelligence-app/sw.js', { scope: '/applied-intelligence-app/' });
      console.log('Service worker registered');
    } catch (error) {
      console.error('Service worker registration failed', error);
    }
  }
}

export async function triggerInstall() {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return result?.outcome === 'accepted';
}

export function isiOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export function showIOSInstallHint() {
  const hint = document.querySelector('[data-ios-install-hint]');
  if (!hint) return;
  const shouldShow = isiOS() && !isStandalone();
  hint.hidden = !shouldShow;
}

document.addEventListener('DOMContentLoaded', () => {
  applyApprovedAppIcon();
  registerServiceWorker();
  showIOSInstallHint();

  const btn = document.querySelector('[data-install-app]');
  if (btn) {
    btn.addEventListener('click', async () => {
      await triggerInstall();
    });
  }
});
