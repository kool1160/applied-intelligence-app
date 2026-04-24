const APP_BASE = '/applied-intelligence-app/';
const SERVICE_WORKER_PATH = `${APP_BASE}sw.js`;
const APPLE_TOUCH_ICON = '/applied-intelligence-app/assets/icons/apple-touch-icon.png';
const FAVICON_32 = '/applied-intelligence-app/assets/icons/favicon-32.png';
const FAVICON_16 = '/applied-intelligence-app/assets/icons/favicon-16.png';
const BRAND_ICON = '/applied-intelligence-app/assets/brand/applied-intelligence-primary-icon.png?v=20260424-approved-primary';

let deferredPrompt = null;

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
  ensureLink('preload', BRAND_ICON, null, 'image/png').as = 'image';
}

function applyHeaderStyles() {
  if (document.getElementById('applied-intelligence-approved-visual-pass')) return;

  const style = document.createElement('style');
  style.id = 'applied-intelligence-approved-visual-pass';
  style.textContent = `
    [data-ios-install-hint], .ios-install-hint { display: none !important; }
    .aiHeroMark, .aiBrandMark { display: none !important; }
    .topWrap.ai-approved-header {
      position: relative !important;
      min-height: 100px !important;
      padding: 14px 84px 14px 14px !important;
      overflow: hidden !important;
      border-color: rgba(151,207,255,.30) !important;
      background: radial-gradient(circle at 88% 48%, rgba(120,187,255,.20), transparent 0 31%), linear-gradient(180deg, rgba(18,35,64,.58), rgba(5,12,24,.66)) !important;
      box-shadow: 0 20px 48px rgba(0,0,0,.30), 0 0 28px rgba(120,187,255,.14), inset 0 1px 0 rgba(255,255,255,.10) !important;
    }
    .topWrap.ai-approved-header > *:not(.aiHeaderLogo) { position: relative; z-index: 1; }
    .topWrap.ai-approved-header h1 {
      max-width: 100% !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      font-size: clamp(24px, 6.35vw, 29px) !important;
      line-height: .98 !important;
      letter-spacing: -.055em !important;
    }
    .topWrap.ai-approved-header .sub {
      margin-top: 7px !important;
      max-width: 100% !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      color: #c8d8f2 !important;
      font-weight: 700 !important;
      font-size: clamp(11px, 3.15vw, 13px) !important;
      line-height: 1.2 !important;
      letter-spacing: -.03em !important;
    }
    .aiHeaderLogo {
      position: absolute;
      right: 14px;
      top: 50%;
      z-index: 2;
      width: 56px;
      height: 56px;
      transform: translateY(-50%);
      border-radius: 18px;
      object-fit: contain;
      filter: drop-shadow(0 0 20px rgba(120,187,255,.48));
      pointer-events: none;
    }
    @media (max-width: 380px) {
      .topWrap.ai-approved-header { padding-right: 76px !important; }
      .topWrap.ai-approved-header h1 { font-size: 23px !important; }
      .topWrap.ai-approved-header .sub { font-size: 10.8px !important; }
      .aiHeaderLogo { width: 52px; height: 52px; }
    }
  `;
  document.head.appendChild(style);
}

function applyHeaderBranding() {
  const topWrap = document.querySelector('.topWrap');
  if (!topWrap) return;

  topWrap.classList.add('ai-approved-header');

  const subtitle = topWrap.querySelector('.sub');
  if (subtitle) subtitle.textContent = 'Connected manufacturing intelligence.';

  topWrap.querySelectorAll('.aiBrandMark, .aiHeroMark').forEach((mark) => mark.remove());

  let logo = topWrap.querySelector('.aiHeaderLogo');
  if (!logo) {
    logo = document.createElement('img');
    logo.className = 'aiHeaderLogo';
    logo.alt = '';
    logo.decoding = 'async';
    topWrap.appendChild(logo);
  }
  logo.src = BRAND_ICON;

  const heroMini = document.querySelector('#home .heroMini');
  if (heroMini) heroMini.textContent = 'APPLIED INTELLIGENCE FRAMEWORK';
}

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register(SERVICE_WORKER_PATH, { scope: APP_BASE });
    if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    console.log('Service worker registered');
  } catch (error) {
    console.error('Service worker registration failed', error);
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
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

export function showIOSInstallHint() {
  const hint = document.querySelector('[data-ios-install-hint]');
  if (!hint) return;
  hint.hidden = true;
  hint.setAttribute('aria-hidden', 'true');
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

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  const btn = document.querySelector('[data-install-app]');
  if (btn) btn.hidden = true;
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  const btn = document.querySelector('[data-install-app]');
  if (btn) btn.hidden = true;
});

document.addEventListener('DOMContentLoaded', () => {
  applyApprovedAppIcon();
  applyHeaderStyles();
  applyHeaderBranding();
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
