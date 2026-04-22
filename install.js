const APPLE_TOUCH_ICON = '/applied-intelligence-app/assets/icons/apple-touch-icon.png';
const FAVICON_32 = '/applied-intelligence-app/assets/icons/favicon-32.png';
const FAVICON_16 = '/applied-intelligence-app/assets/icons/favicon-16.png';

function ensureLink(rel, href, sizes = null, type = null) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
  if (sizes) {
    link.sizes = sizes;
  }
  if (type) {
    link.type = type;
  }
  return link;
}

function applyApprovedAppIcon() {
  ensureLink('apple-touch-icon', APPLE_TOUCH_ICON, '180x180', 'image/png');
  ensureLink('icon', FAVICON_32, '32x32', 'image/png');

  let favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]');
  if (!favicon16) {
    favicon16 = document.createElement('link');
    favicon16.rel = 'icon';
    document.head.appendChild(favicon16);
  }
  favicon16.href = FAVICON_16;
  favicon16.sizes = '16x16';
  favicon16.type = 'image/png';

  ensureLink('shortcut icon', FAVICON_32, null, 'image/png');
}

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  document.documentElement.classList.add('can-install');

  const btn = document.querySelector('[data-install-app]');
  if (btn) {
    btn.hidden = false;
  }
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  document.documentElement.classList.remove('can-install');

  const btn = document.querySelector('[data-install-app]');
  if (btn) {
    btn.hidden = true;
  }
});

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    await navigator.serviceWorker.register('/applied-intelligence-app/sw.js', {
      scope: '/applied-intelligence-app/'
    });
    console.log('Service worker registered');
  } catch (error) {
    console.error('Service worker registration failed', error);
  }
}

export async function triggerInstall() {
  if (!deferredPrompt) {
    return false;
  }

  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return result?.outcome === 'accepted';
}

export function isiOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

export function showIOSInstallHint() {
  const hint = document.querySelector('[data-ios-install-hint]');
  if (!hint) {
    return;
  }

  const shouldShow = isiOS() && !isStandalone();
  hint.hidden = !shouldShow;
}

async function initOptionalAIConnectRuntimeBridge() {
  try {
    const module = await import('./assets/runtime-bridge/ai-connect-bridge.js');
    if (typeof module.initAIConnectRuntimeBridge === 'function') {
      module.initAIConnectRuntimeBridge();
    }
  } catch (error) {
    console.warn('AI-Connect runtime bridge not loaded; continuing without it.', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyApprovedAppIcon();
  registerServiceWorker();
  showIOSInstallHint();
  initOptionalAIConnectRuntimeBridge();

  const btn = document.querySelector('[data-install-app]');
  if (btn) {
    btn.addEventListener('click', async () => {
      await triggerInstall();
    });
  }
});
