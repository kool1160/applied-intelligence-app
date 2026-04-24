function applyRuntimeMobileButtonFix() {
  const existing = document.querySelector('[data-runtime-mobile-button-fix]');
  if (existing) return;

  const style = document.createElement('style');
  style.setAttribute('data-runtime-mobile-button-fix', 'true');
  style.textContent = `
    .runtimeActions {
      gap: 10px !important;
    }

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
      body {
        padding-bottom: calc(148px + env(safe-area-inset-bottom, 0px)) !important;
      }

      .top {
        position: relative !important;
      }

      .runtimeActions {
        flex-direction: column !important;
      }

      .runtimeActions .btn {
        width: 100% !important;
        flex: 0 0 auto !important;
        flex-basis: auto !important;
        min-height: 48px !important;
        height: auto !important;
        padding: 10px 14px !important;
      }

      .bottomBar {
        bottom: calc(18px + env(safe-area-inset-bottom, 0px)) !important;
      }
    }
  `;

  document.head.appendChild(style);
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
    if (typeof window.openWorkThread === 'function') {
      window.openWorkThread();
    }
    if (typeof window.goToScreen === 'function') {
      window.goToScreen('connect-thread');
    }
    setTimeout(addInlineOpenThreadAction, 0);
  });

  wrapper.appendChild(button);
  root.appendChild(wrapper);
}

function observeRuntimePanels() {
  addInlineOpenThreadAction();

  const observer = new MutationObserver(() => {
    addInlineOpenThreadAction();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyRuntimeMobileButtonFix();
    observeRuntimePanels();
  });
} else {
  applyRuntimeMobileButtonFix();
  observeRuntimePanels();
}
