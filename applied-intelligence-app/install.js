const BRAND_ICON = '/assets/brand/applied-intelligence-icon.svg';
const BRAND_LAUNCH = '/assets/brand/applied-intelligence-launch.svg';
const LAUNCH_SESSION_KEY = 'applied-intelligence-brand-launch-v4';

function applyRuntimeMobileButtonFix() {
  const existing = document.querySelector('[data-runtime-mobile-button-fix]');
  if (existing) return;

  const style = document.createElement('style');
  style.setAttribute('data-runtime-mobile-button-fix', 'true');
  style.textContent = `
    .runtimeActions { gap: 10px !important; }
    .runtimeActions .btn {
      flex: 0 0 auto !important;
      flex-basis: auto !important;
      min-height: 48px !important;
      height: auto !important;
      padding: 10px 14px !important;
      border-radius: 18px !important;
    }
    .scenarioCard .runtimeActions .btn,
    .runtimeCard .runtimeActions .btn {
      flex: 0 0 auto !important;
      flex-basis: auto !important;
      min-height: 48px !important;
      height: auto !important;
      padding: 10px 14px !important;
    }
    @media (max-width: 700px) {
      body { padding-bottom: calc(148px + env(safe-area-inset-bottom, 0px)) !important; }
      .top { position: relative !important; }
      .runtimeActions { flex-direction: column !important; }
      .runtimeActions .btn {
        width: 100% !important;
        flex: 0 0 auto !important;
        flex-basis: auto !important;
        min-height: 48px !important;
        height: auto !important;
        padding: 10px 14px !important;
      }
      .bottomBar { bottom: calc(18px + env(safe-area-inset-bottom, 0px)) !important; }
    }
  `;
  document.head.appendChild(style);
}

function applyBrandRuntime() {
  if (!document.getElementById('applied-intelligence-brand-runtime-styles')) {
    const style = document.createElement('style');
    style.id = 'applied-intelligence-brand-runtime-styles';
    style.textContent = `
      :root {
        --ai-runtime-blue: #78bbff;
        --ai-runtime-blue-soft: rgba(120,187,255,.16);
        --ai-runtime-blue-faint: rgba(120,187,255,.08);
        --ai-runtime-border: rgba(151,207,255,.22);
      }

      .topWrap.ai-brand-shell {
        position: relative !important;
        min-height: 102px !important;
        padding: 16px 94px 15px 16px !important;
        overflow: hidden !important;
        border-color: rgba(151,207,255,.26) !important;
        background:
          radial-gradient(circle at 88% 50%, rgba(120,187,255,.16), transparent 0 32%),
          linear-gradient(180deg, rgba(22,38,66,.44), rgba(8,16,30,.22)) !important;
        box-shadow:
          0 18px 42px rgba(0,0,0,.24),
          0 0 30px rgba(120,187,255,.10),
          inset 0 1px 0 rgba(255,255,255,.10) !important;
      }

      .topWrap.ai-brand-shell h1 {
        max-width: calc(100% - 4px) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        letter-spacing: -.06em !important;
      }

      .topWrap.ai-brand-shell .sub {
        max-width: calc(100% - 2px) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        color: #c8d8f2 !important;
      }

      .aiBrandMark {
        position: absolute;
        right: 18px;
        top: 50%;
        width: 66px;
        height: 66px;
        transform: translateY(-50%);
        border-radius: 22px;
        object-fit: contain;
        filter: drop-shadow(0 0 20px rgba(120,187,255,.45));
        pointer-events: none;
        opacity: .98;
      }

      .aiHeroMark {
        position: absolute;
        right: 18px;
        top: 18px;
        width: 76px;
        height: 76px;
        opacity: .18;
        object-fit: contain;
        filter: drop-shadow(0 0 18px rgba(120,187,255,.30));
        pointer-events: none;
        z-index: 0;
      }

      .hero > *:not(.aiHeroMark) { position: relative; z-index: 1; }

      .glass,
      .panel,
      .hero,
      .stat,
      .kpi,
      .card,
      .listItem,
      .chartBox,
      .frameworkCard,
      .runtimeCard,
      .scenarioCard,
      .runtimeBuildCard,
      .validationScenarioDashboard__item,
      .validationReleaseHandoff__content,
      .validationScenarioDetail__content {
        border-color: var(--ai-runtime-border) !important;
        box-shadow:
          0 18px 42px rgba(0,0,0,.32),
          0 0 22px rgba(120,187,255,.07),
          inset 0 1px 0 rgba(255,255,255,.055) !important;
      }

      .hero,
      .stat,
      .kpi,
      .card,
      .listItem,
      .chartBox,
      .frameworkCard,
      .runtimeCard,
      .scenarioCard,
      .runtimeBuildCard,
      .validationScenarioDashboard__item {
        background:
          radial-gradient(circle at 90% 18%, rgba(120,187,255,.13), transparent 0 34%),
          linear-gradient(180deg, rgba(15,27,49,.95), rgba(6,13,24,.97)) !important;
      }

      .hero {
        border-color: rgba(151,207,255,.24) !important;
        box-shadow:
          0 20px 48px rgba(0,0,0,.34),
          0 0 32px rgba(120,187,255,.10),
          inset 0 1px 0 rgba(255,255,255,.07) !important;
      }

      #home .stats {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 12px !important;
      }

      #home .stat {
        min-height: 118px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }

      .frameworkCard::after,
      .stat::after,
      .kpi::after,
      .card::after,
      .runtimeCard::after,
      .scenarioCard::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(135deg, rgba(255,255,255,.055), transparent 32%, rgba(120,187,255,.055));
        opacity: .58;
      }

      .stat,
      .kpi,
      .card,
      .frameworkCard,
      .runtimeCard,
      .scenarioCard {
        position: relative !important;
        overflow: hidden !important;
      }

      .frameworkCard.blue,
      .frameworkCard.teal,
      .frameworkCard.indigo,
      .frameworkCard.copper,
      .frameworkCard.green,
      .frameworkCard.orange,
      .frameworkCard.red,
      .frameworkCard.silver {
        border-color: rgba(151,207,255,.24) !important;
      }

      .frameworkPill,
      .runtimeBuildChip,
      .validationScenarioShell__chip,
      .validationScenarioDashboard__chip {
        border-color: rgba(151,207,255,.28) !important;
        box-shadow: 0 0 18px rgba(120,187,255,.08), inset 0 1px 0 rgba(255,255,255,.10) !important;
      }

      .bottomBar {
        border-color: rgba(151,207,255,.25) !important;
        box-shadow:
          0 18px 42px rgba(0,0,0,.24),
          0 0 30px rgba(120,187,255,.11),
          inset 0 1px 0 rgba(255,255,255,.12) !important;
      }

      .bottomBar .navBtn.active,
      .tabRow .navBtn.active {
        border-color: rgba(151,207,255,.42) !important;
        background:
          radial-gradient(circle at 50% 0%, rgba(120,187,255,.25), transparent 0 68%),
          linear-gradient(180deg, rgba(130,196,255,.24), rgba(120,187,255,.10)) !important;
        box-shadow:
          0 0 22px rgba(120,187,255,.18),
          inset 0 1px 0 rgba(255,255,255,.18) !important;
      }

      .aiBrandAssetPreview { margin-top: 16px; display: grid; gap: 16px; }
      .aiBrandAssetCard {
        padding: 18px;
        border-radius: 28px;
        background:
          radial-gradient(circle at 90% 18%, rgba(120,187,255,.13), transparent 0 34%),
          linear-gradient(180deg, rgba(12,24,45,.96), rgba(5,12,24,.98));
        border: 1px solid rgba(151,207,255,.22);
        box-shadow: 0 18px 42px rgba(0,0,0,.30), 0 0 24px rgba(120,187,255,.08);
      }
      .aiBrandAssetCard img {
        display: block;
        width: 100%;
        max-height: 320px;
        object-fit: contain;
        border-radius: 24px;
        background: rgba(2,7,17,.42);
        border: 1px solid rgba(151,207,255,.18);
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
      .aiLaunchScreen.is-hiding { opacity: 0; pointer-events: none; }
      .aiLaunchScreen img {
        width: min(100vw, 520px);
        height: min(100dvh, 1128px);
        object-fit: cover;
        display: block;
      }

      @media (min-width: 920px) {
        .aiBrandAssetPreview { grid-template-columns: 360px 1fr; align-items: stretch; }
      }

      @media (max-width: 700px) {
        .topWrap.ai-brand-shell {
          padding: 14px 84px 13px 14px !important;
          min-height: 96px !important;
        }
        .topWrap.ai-brand-shell h1 {
          font-size: clamp(25px, 6.65vw, 30px) !important;
          line-height: .98 !important;
        }
        .topWrap.ai-brand-shell .sub {
          margin-top: 7px !important;
          font-size: 13px !important;
          letter-spacing: .01em !important;
        }
        .aiBrandMark {
          width: 58px;
          height: 58px;
          right: 14px;
          border-radius: 19px;
        }
        .aiHeroMark { width: 58px; height: 58px; right: 12px; top: 12px; opacity: .16; }
        #home .stats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        #home .stat { min-height: 104px !important; padding: 13px !important; }
        #home .statNum { font-size: 24px !important; }
        #home .statLabel { font-size: 11px !important; line-height: 1.25 !important; }
      }

      @media (max-width: 380px) {
        .topWrap.ai-brand-shell h1 { font-size: 24px !important; }
        .topWrap.ai-brand-shell { padding-right: 78px !important; }
        .aiBrandMark { width: 54px; height: 54px; }
      }
    `;
    document.head.appendChild(style);
  }

  const topWrap = document.querySelector('.topWrap');
  if (topWrap) {
    topWrap.classList.add('ai-brand-shell');
    let headerMark = topWrap.querySelector('.aiBrandMark');
    if (!headerMark) {
      headerMark = document.createElement('img');
      headerMark.className = 'aiBrandMark';
      headerMark.alt = '';
      headerMark.decoding = 'async';
      topWrap.appendChild(headerMark);
    }
    headerMark.src = BRAND_ICON;
  }

  const subtitle = document.querySelector('.topWrap .sub');
  if (subtitle) subtitle.textContent = 'Standardize to Optimize.';

  const heroMini = document.querySelector('#home .heroMini');
  if (heroMini) heroMini.textContent = 'APPLIED INTELLIGENCE FRAMEWORK';

  const hero = document.querySelector('#home .hero');
  if (hero && !hero.querySelector('.aiHeroMark')) {
    const img = document.createElement('img');
    img.className = 'aiHeroMark';
    img.src = BRAND_ICON;
    img.alt = '';
    img.decoding = 'async';
    hero.appendChild(img);
  }

  const morePanel = document.querySelector('#more .glass.panel');
  const oldBrandPanel = document.querySelector('[data-brand-assets-panel]');
  if (oldBrandPanel) oldBrandPanel.remove();

  if (morePanel && !morePanel.querySelector('[data-app-identity-panel]')) {
    const section = document.createElement('div');
    section.className = 'frameworkSection';
    section.setAttribute('data-app-identity-panel', 'true');
    section.innerHTML = `
      <h3 class="frameworkSectionTitle">App Identity</h3>
      <div class="frameworkSectionSub">Locked Applied Intelligence app mark and launch identity.</div>
      <div class="aiBrandAssetPreview">
        <div class="aiBrandAssetCard">
          <div class="aiBrandAssetTitle">App Icon</div>
          <div class="aiBrandAssetText">Primary Applied Intelligence icon used as the in-app identity mark.</div>
          <img src="${BRAND_ICON}" alt="Applied Intelligence app icon" loading="lazy" />
        </div>
      </div>
    `;
    morePanel.appendChild(section);
  }
}

function showLaunchScreenOnce() {
  if (window.sessionStorage?.getItem(LAUNCH_SESSION_KEY) === 'shown') return;
  try { window.sessionStorage?.setItem(LAUNCH_SESSION_KEY, 'shown'); } catch {}
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

function addInlineOpenThreadAction() {
  const root = document.getElementById('workThreadRuntimePanel');
  if (!root) return;
  const isEmptyThreadState = root.textContent.includes('No work-linked thread open yet');
  const alreadyAdded = root.querySelector('[data-open-thread-inline]');
  if (!isEmptyThreadState || alreadyAdded) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'runtimeActions';
  wrapper.setAttribute('data-open-thread-inline', 'true');

  const button = document.createElement('button');
  button.className = 'btn';
  button.type = 'button';
  button.textContent = 'Open Work Thread';
  button.addEventListener('click', () => {
    if (typeof window.openWorkThread === 'function') window.openWorkThread();
    if (typeof window.goToScreen === 'function') window.goToScreen('connect-thread');
    setTimeout(addInlineOpenThreadAction, 0);
  });

  wrapper.appendChild(button);
  root.appendChild(wrapper);
}

function observeRuntimePanels() {
  addInlineOpenThreadAction();
  const observer = new MutationObserver(() => {
    applyBrandRuntime();
    addInlineOpenThreadAction();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyRuntimeMobileButtonFix();
    applyBrandRuntime();
    showLaunchScreenOnce();
    observeRuntimePanels();
  });
} else {
  applyRuntimeMobileButtonFix();
  applyBrandRuntime();
  showLaunchScreenOnce();
  observeRuntimePanels();
}
