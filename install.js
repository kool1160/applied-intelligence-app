const APP_ICON = 'data:image/png;base64,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...';

function ensureLink(rel, href, sizes = null) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
  if (sizes) link.sizes = sizes;
  return link;
}

function applyApprovedAppIcon() {
  ensureLink('apple-touch-icon', APP_ICON, '192x192');
  ensureLink('icon', APP_ICON, '192x192');
  ensureLink('shortcut icon', APP_ICON);
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