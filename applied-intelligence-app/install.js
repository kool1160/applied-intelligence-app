const APP_BASE = '/applied-intelligence-app/';
const SERVICE_WORKER_PATH = `${APP_BASE}sw.js`;
const BRAND_ICON = '/assets/icons/icon-512.png?v=20260424-ticket008';

let deferredPrompt = null;

function showInstallButton(shouldShow) {
  const button = document.querySelector('[data-install-app]');
  if (button) button.hidden = !shouldShow;
}

function hideIOSInstallHint() {
  const hint = document.querySelector('[data-ios-install-hint]');
  if (!hint) return;
  hint.hidden = true;
  hint.setAttribute('aria-hidden', 'true');
}

function applyApprovedVisualPass() {
  if (!document.getElementById('applied-intelligence-approved-visual-pass')) {
    const style = document.createElement('style');
    style.id = 'applied-intelligence-approved-visual-pass';
    style.textContent = `
      :root {
        --ai-border-blue: rgba(151, 207, 255, .30);
        --ai-glow-blue: rgba(120,187,255,.14);
        --ai-trace: #78bbff;
        --ai-connect: #79d2a7;
        --ai-improve: #d6a66b;
        --ai-roi: #66dcd2;
        --ai-case: #b69cff;
        --ai-rma: #ff8f8f;
      }

      [data-ios-install-hint], .ios-install-hint { display: none !important; }
      .aiHeroMark, .aiBrandMark { display: none !important; }

      .topWrap.ai-approved-header {
        position: relative !important;
        min-height: 100px !important;
        padding: 14px 84px 14px 14px !important;
        overflow: hidden !important;
        border-color: var(--ai-border-blue) !important;
        background: radial-gradient(circle at 88% 48%, rgba(120,187,255,.20), transparent 0 31%), linear-gradient(180deg, rgba(18,35,64,.58), rgba(5,12,24,.66)) !important;
        box-shadow: 0 20px 48px rgba(0,0,0,.30), 0 0 28px var(--ai-glow-blue), inset 0 1px 0 rgba(255,255,255,.10) !important;
      }

      .topWrap.ai-approved-header::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(135deg, rgba(255,255,255,.06), transparent 34%, rgba(120,187,255,.06));
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

      .glass, .panel, .hero, .stat, .kpi, .card, .listItem, .chartBox, .frameworkCard, .runtimeCard, .scenarioCard, .runtimeBuildCard, .validationScenarioDashboard__item, .validationReleaseHandoff__content, .validationScenarioDetail__content, .runtimeTimelineItem, .validationScenarioList__item {
        border-color: var(--ai-border-blue) !important;
        box-shadow: 0 18px 42px rgba(0,0,0,.30), 0 0 24px rgba(120,187,255,.085), inset 0 1px 0 rgba(255,255,255,.06) !important;
      }

      .hero, .stat, .kpi, .card, .listItem, .chartBox, .frameworkCard, .runtimeCard, .scenarioCard, .runtimeBuildCard, .validationScenarioDashboard__item, .runtimeTimelineItem, .validationScenarioList__item {
        position: relative !important;
        overflow: hidden !important;
        background: radial-gradient(circle at 88% 18%, rgba(120,187,255,.12), transparent 0 33%), linear-gradient(180deg, rgba(13,25,47,.96), rgba(5,12,24,.98)) !important;
      }

      .hero::after, .stat::after, .kpi::after, .card::after, .listItem::after, .chartBox::after, .frameworkCard::after, .runtimeCard::after, .scenarioCard::after, .runtimeBuildCard::after, .validationScenarioDashboard__item::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(135deg, rgba(255,255,255,.055), transparent 36%, rgba(120,187,255,.055));
        opacity: .58;
      }

      .hero > *:not(.heroGlow), .stat > *, .kpi > *, .card > *, .listItem > *, .chartBox > *, .frameworkCard > *, .runtimeCard > *, .scenarioCard > *, .runtimeBuildCard > *, .validationScenarioDashboard__item > * { position: relative; z-index: 1; }

      #home .hero { border-color: rgba(151,207,255,.34) !important; box-shadow: 0 22px 54px rgba(0,0,0,.36), 0 0 34px rgba(120,187,255,.13), inset 0 1px 0 rgba(255,255,255,.075) !important; }
      #home .heroMini { color: #c8d8f2 !important; }
      #home .stats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 14px !important; }
      #home .stat { min-height: 104px !important; padding: 13px !important; display: flex !important; flex-direction: column !important; justify-content: center !important; border-color: rgba(151,207,255,.31) !important; }
      #home .statNum { font-size: 24px !important; }
      #home .statLabel { font-size: 11px !important; line-height: 1.25 !important; }

      .frameworkCard.blue { border-color: rgba(120,187,255,.34) !important; }
      .frameworkCard.teal { border-color: rgba(102,220,210,.30) !important; }
      .frameworkCard.copper { border-color: rgba(214,166,107,.30) !important; }
      .frameworkCard.green { border-color: rgba(121,210,167,.30) !important; }
      .frameworkCard.indigo { border-color: rgba(182,156,255,.30) !important; }
      .frameworkCard.orange { border-color: rgba(255,178,107,.30) !important; }
      .frameworkCard.red { border-color: rgba(255,143,143,.28) !important; }

      .frameworkPill, .runtimeBuildChip, .validationScenarioShell__chip, .validationScenarioDashboard__chip, .lockPill {
        border-color: rgba(151,207,255,.34) !important;
        box-shadow: 0 0 16px rgba(120,187,255,.08), inset 0 1px 0 rgba(255,255,255,.10) !important;
      }

      .bottomBar {
        border-color: rgba(151,207,255,.30) !important;
        box-shadow: 0 18px 42px rgba(0,0,0,.24), 0 0 34px rgba(120,187,255,.14), inset 0 1px 0 rgba(255,255,255,.12) !important;
      }
      .bottomBar .navBtn.active, .tabRow .navBtn.active {
        border-color: rgba(151,207,255,.48) !important;
        background: radial-gradient(circle at 50% 0%, rgba(120,187,255,.30), transparent 0 68%), linear-gradient(180deg, rgba(130,196,255,.28), rgba(120,187,255,.10)) !important;
        box-shadow: 0 0 24px rgba(120,187,255,.21), inset 0 1px 0 rgba(255,255,255,.20) !important;
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

  const topWrap = document.querySelector('.topWrap');
  if (topWrap) {
    topWrap.classList.add('ai-approved-header');
    topWrap.querySelectorAll('.aiBrandMark, .aiHeaderLogo').forEach((mark, index) => {
      if (index > 0 || mark.classList.contains('aiBrandMark')) mark.remove();
    });

    let logo = topWrap.querySelector('.aiHeaderLogo');
    if (!logo) {
      logo = document.createElement('img');
      logo.className = 'aiHeaderLogo';
      logo.alt = '';
      logo.decoding = 'async';
      topWrap.appendChild(logo);
    }
    logo.src = BRAND_ICON;
  }

  const subtitle = document.querySelector('.topWrap .sub');
  if (subtitle) subtitle.textContent = 'Connected manufacturing intelligence.';

  document.querySelectorAll('.aiHeroMark').forEach((mark) => mark.remove());

  const heroMini = document.querySelector('#home .heroMini');
  if (heroMini) heroMini.textContent = 'APPLIED INTELLIGENCE FRAMEWORK';
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register(SERVICE_WORKER_PATH, { scope: APP_BASE });
    if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
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
  showInstallButton(false);
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  showInstallButton(false);
});

document.addEventListener('DOMContentLoaded', () => {
  applyApprovedVisualPass();
  registerServiceWorker();
  hideIOSInstallHint();
  showInstallButton(false);

  const button = document.querySelector('[data-install-app]');
  if (button) button.addEventListener('click', () => triggerInstall());
});
