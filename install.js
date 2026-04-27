const APPLE_TOUCH_ICON = '/assets/brand/approved/applied-intelligence-apple-touch-icon.png';
const FAVICON_32 = '/assets/brand/approved/applied-intelligence-icon-192.png';
const FAVICON_16 = '/assets/brand/approved/applied-intelligence-icon-192.png';
const BRAND_ICON = '/assets/brand/approved/applied-intelligence-icon-512.png';
const BRAND_LAUNCH = '/applied-intelligence-app/assets/brand/applied-intelligence-launch.svg';
const BRAND_HAT_SET = '/applied-intelligence-app/assets/brand/applied-intelligence-hat-icon-set.svg';
const LAUNCH_SESSION_KEY = 'applied-intelligence-brand-launch-v1';

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

function ensureBrandRuntimeStyles() {
  if (document.getElementById('applied-intelligence-brand-runtime-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'applied-intelligence-brand-runtime-styles';
  style.textContent = `
    .topWrap.ai-brand-shell {
      position: relative;
      padding-left: 86px;
      min-height: 82px;
    }

    .aiBrandMark {
      position: absolute;
      left: 16px;
      top: 50%;
      width: 56px;
      height: 56px;
      transform: translateY(-50%);
      border-radius: 18px;
      object-fit: contain;
      filter: drop-shadow(0 0 16px rgba(120,187,255,.34));
      pointer-events: none;
    }

    .aiHeroMark {
      position: absolute;
      right: 18px;
      top: 18px;
      width: 76px;
      height: 76px;
      opacity: .22;
      object-fit: contain;
      filter: drop-shadow(0 0 18px rgba(120,187,255,.28));
      pointer-events: none;
      z-index: 0;
    }

    .hero > *:not(.aiHeroMark) {
      position: relative;
      z-index: 1;
    }

    .aiBrandAssetPreview {
      margin-top: 16px;
      display: grid;
      gap: 16px;
    }

    .aiBrandAssetCard {
      padding: 18px;
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(12,24,45,.96), rgba(5,12,24,.98));
      border: 1px solid rgba(151,182,255,.12);
      box-shadow: 0 18px 42px rgba(0,0,0,.30);
    }

    .aiBrandAssetCard img {
      display: block;
      width: 100%;
      max-height: 420px;
      object-fit: contain;
      border-radius: 24px;
      background: rgba(2,7,17,.42);
      border: 1px solid rgba(151,182,255,.12);
    }

    .aiBrandAssetTitle {
      margin: 0 0 6px;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: -.03em;
      color: #eef4ff;
    }

    .aiBrandAssetText {
      margin-bottom: 14px;
      font-size: 13px;
      line-height: 1.45;
      color: #b8c8e8;
    }

    .aiLaunchScreen {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: grid;
      place-items: center;
      background: #020711;
      opacity: 1;
      transition: opacity .38s ease;
    }

    .aiLaunchScreen.is-hiding {
      opacity: 0;
      pointer-events: none;
    }

    .aiLaunchScreen img {
      width: min(100vw, 520px);
      height: min(100dvh, 1128px);
      object-fit: cover;
      display: block;
    }

    @media (min-width: 920px) {
      .aiBrandAssetPreview {
        grid-template-columns: 360px 1fr;
        align-items: stretch;
      }
    }

    @media (max-width: 700px) {
      .topWrap.ai-brand-shell {
        padding-left: 76px;
        min-height: 76px;
      }

      .aiBrandMark {
        width: 48px;
        height: 48px;
        border-radius: 16px;
      }

      .aiHeroMark {
        width: 62px;
        height: 62px;
        right: 14px;
        top: 14px;
        opacity: .18;
      }
    }
  `;
  document.head.appendChild(style);
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
  ensureLink('preload', BRAND_LAUNCH, null, 'image/svg+xml').as = 'image';
}

function injectBrandHeader() {
  const topWrap = document.querySelector('.topWrap');
  if (topWrap && !topWrap.querySelector('.aiBrandMark')) {
    topWrap.classList.add('ai-brand-shell');
    const img = document.createElement('img');
    img.className = 'aiBrandMark';
    img.src = BRAND_ICON;
    img.alt = '';
    img.decoding = 'async';
    topWrap.appendChild(img);
  }

  const hero = document.querySelector('#home .hero');
  if (hero && !hero.querySelector('.aiHeroMark')) {
    const img = document.createElement('img');
    img.className = 'aiHeroMark';
    img.src = BRAND_ICON;
    img.alt = '';
    img.decoding = 'async';
    hero.appendChild(img);
  }
}

function injectBrandAssetPanel() {
  const morePanel = document.querySelector('#more .glass.panel');
  if (!morePanel || morePanel.querySelector('[data-brand-assets-panel]')) {
    return;
  }

  const section = document.createElement('div');
  section.className = 'frameworkSection';
  section.setAttribute('data-brand-assets-panel', 'true');
  section.innerHTML = `
    <h3 class="frameworkSectionTitle">Brand Assets</h3>
    <div class="frameworkSectionSub">Locked Applied Intelligence identity assets for the app icon, launch screen, and hat / patch direction.</div>
    <div class="aiBrandAssetPreview">
      <div class="aiBrandAssetCard">
        <div class="aiBrandAssetTitle">App Icon</div>
        <div class="aiBrandAssetText">Primary Applied Intelligence icon used as the in-app identity mark.</div>
        <img src="${BRAND_ICON}" alt="Applied Intelligence app icon" loading="lazy" />
      </div>
      <div class="aiBrandAssetCard">
        <div class="aiBrandAssetTitle">Hat Icon Set</div>
        <div class="aiBrandAssetText">Embroidery, one-color, rubber patch, and tonal patch directions for future hats and physical branding.</div>
        <img src="${BRAND_HAT_SET}" alt="Applied Intelligence hat icon set" loading="lazy" />
      </div>
    </div>
  `;
  morePanel.appendChild(section);
}

function showLaunchScreenOnce() {
  if (window.sessionStorage?.getItem(LAUNCH_SESSION_KEY) === 'shown') {
    return;
  }

  try {
    window.sessionStorage?.setItem(LAUNCH_SESSION_KEY, 'shown');
  } catch {
    // Non-critical. Continue without session persistence.
  }

  const launch = document.createElement('div');
  launch.className = 'aiLaunchScreen';
  launch.setAttribute('aria-hidden', 'true');
  launch.innerHTML = `<img src="${BRAND_LAUNCH}" alt="" decoding="async" />`;
  document.body.appendChild(launch);

  window.setTimeout(() => {
    launch.classList.add('is-hiding');
    window.setTimeout(() => launch.remove(), 420);
  }, 1050);
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
  ensureBrandRuntimeStyles();
  applyApprovedAppIcon();
  injectBrandHeader();
  injectBrandAssetPanel();
  showLaunchScreenOnce();
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
