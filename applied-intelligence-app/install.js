function applyRuntimeMobileButtonFix() {
  const existing = document.querySelector('[data-runtime-mobile-button-fix]');
  if (existing) return;

  const style = document.createElement('style');
  style.setAttribute('data-runtime-mobile-button-fix', 'true');
  style.textContent = `
    .runtimeActions .btn {
      flex: 0 0 auto !important;
      flex-basis: auto !important;
      min-height: 52px !important;
      height: auto !important;
      padding: 12px 14px !important;
    }

    .scenarioCard .runtimeActions .btn,
    .runtimeCard .runtimeActions .btn {
      flex: 0 0 auto !important;
      flex-basis: auto !important;
      min-height: 52px !important;
      height: auto !important;
    }

    @media (max-width: 700px) {
      .runtimeActions {
        flex-direction: column !important;
      }

      .runtimeActions .btn {
        width: 100% !important;
        flex: 0 0 auto !important;
        flex-basis: auto !important;
        min-height: 52px !important;
        height: auto !important;
      }
    }
  `;

  document.head.appendChild(style);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyRuntimeMobileButtonFix);
} else {
  applyRuntimeMobileButtonFix();
}
