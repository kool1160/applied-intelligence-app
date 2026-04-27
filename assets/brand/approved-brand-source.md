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

## Reference lock status

Approved icon files now exist and reference lock is active for app/PWA/header icon usage in:

- `index.html`
- `manifest.json`
- `install.js`
- `sw.js`
- `applied-intelligence-app/sw.js`


## Approved files (now present)

- `/assets/brand/approved/applied-intelligence-icon-512.png`
- `/assets/brand/approved/applied-intelligence-icon-192.png`
- `/assets/brand/approved/applied-intelligence-apple-touch-icon.png`

All future app icon references must use files under `/assets/brand/approved/`.
