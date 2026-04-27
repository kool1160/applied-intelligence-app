# Approved Brand Source

This document defines where **approved** Applied Intelligence app icon assets must live and what is currently blocked.

## Source of truth for approved square app icons

- Approved square app icon files must be uploaded under:
  - `/assets/brand/approved/`
- Treat files in this folder as the only candidate source for final, locked icon references.

## Not approved (do not treat as final)

- `/assets/icons/icon-512.png` is **not approved**.
- `/assets/icons/apple-touch-icon.png` is **not approved as the final icon**.
- No existing placeholder icon in `/assets/icons/` should be treated as approved brand source.

## Reference lock rule

Do **not** lock or finalize icon references in any of the following until approved icon files exist in `/assets/brand/approved/`:

- `index.html`
- `manifest.json`
- `install.js`
- `sw.js`
- `applied-intelligence-app/sw.js`

Preparation-only status: Approved icon files must be uploaded before reference lock can be completed.
