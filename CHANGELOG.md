# Changelog

All notable changes to the Applied Intelligence app should be documented in this file.

## 2026-04-23

### Added
- Added `docs/master-app-handoff-2026-04-23.md` as the current full project/runtime handoff for the app.
- Added `docs/runtime-update-packaging-handoff-2026-04-23.md` as the current update-packaging reference for the next internal runtime-focused release.

### Changed
- Updated `README.md` to reflect the current runtime direction beyond shell-only work.
- Updated repo direction to document Execution Spine as the governing execution model beneath AI-Connect.
- Updated repo direction to document the work-linked thread layer as communication attached to live execution objects.
- Documented current lane alignment around execution objects, handoffs, alerts, work-linked threads, and meetings.
- Documented the current validation-first update path for the next internal release.

### Notes
- This update is primarily a documentation and handoff pass.
- It captures the current runtime direction established in working build/planning chats, especially around Execution Spine, work-linked thread behavior, and scenario-based validation.
- Runtime implementation should continue to follow the documented execution-to-thread relationship and should avoid detached parallel behavior.

## 2026-04-20

### Changed
- Normalized app icon metadata in `manifest.json` so the declared icon type and sizing match the current primary icon source.
- Normalized runtime icon metadata in `install.js` to align with the current wrapper-ready icon source.
- Cleaned repo direction by adding `docs/wrapper-ready-plan.md` as the in-repo project-direction reference.

### Removed
- Removed the unused `assets/icons/applied-intelligence-icon-v3.svg` experiment asset.

### Notes
- The repo cleanup pass focused on making the project read cleaner and behave more like a stable web-app foundation for future native wrapping.
- Static icon references embedded in `index.html` still need a separate dedicated fix pass.

## 2026-04-18

### Added
- Established V8 app support structure with `index.html`, `manifest.json`, `sw.js`, `install.js`, and icon assets.
- Added PWA / install support structure for GitHub Pages deployment.
- Added AI-Connect placeholder source set under `sources/ai-connect/`.
- Added role-permission schema source under `sources/roles/role-permissions.json`.
- Added Locked Settings / device setup source under `sources/device-setup/locked-settings.md`.
- Added Trace-to-Connect resolution workflow source under `sources/workflows/trace-connect-resolution-flow.md`.
- Added approved day-one core metrics source under `sources/metrics/core-metrics.json`.
- Added approved day-one status chain source under `sources/workflows/status-chain.md`.
- Added AI-Trace live test checklist under `sources/tests/ai-trace-live-test-checklist.md`.
- Added change-log tracking source under `sources/logs/app-change-log.md`.
- Added theme alignment source spec under `sources/design/theme-alignment-v1.md`.
- Added premium dark theme tokens under `sources/design/theme-tokens.json`.

### Changed
- Revised role and authority model so Continuous Improvement is the normal trace-clearing authority.
- Updated workflow model to: Lead marks done -> Supervisor verifies -> CIS clears dashboard visibility.
- Defined company-level Admin Mode concept for company-specific permissions and governance.
- Defined dashboard direction with Day / Week / Month / Year tabbed time windows.
- Defined Priority as the first KPI card using a combined score of repeat count, open count, and aging open count, while keeping contributing factors visible for testing.
- Locked dashboard and analytics visual direction toward a premium iPad-first theme aligned with the Applied Intelligence website.
- Applied the first premium dark UI theme pass to the live app shell, including updated visual styling for the background, cards, buttons, tabs, and dashboard panels.
- Updated visible app wording from V7 to V8 in the live shell.
- Refined the live shell after hands-on feedback by shrinking the header, shortening header copy, removing the oversized hero ring treatment, centering the bottom navigation, enlarging the batch-entry area, and restoring bar-style placeholders for dashboard sections before real data is loaded.

### Tested
- Confirmed single trace entry flow works.
- Confirmed strict-schema batch import works.
- Confirmed larger batch testing beyond 20 entries works, including successful 25-entry and 50-entry batch tests.

### Notes
- Theme alignment is still an early pass and should continue evolving toward closer parity with the Applied Intelligence website.
- Future passes should refine Analytics, Open / Aging, and Priority presentation in the new visual language.
- Future updates should be logged here as the standard running changelog.
