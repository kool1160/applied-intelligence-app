# AI-WOC Agent Rules

## Scope
This repository builds **Applied Intelligence AI-WOC** only.

## Boundaries
- Create work order correction reports only.
- Create engineering email drafts only.
- Do NOT create Lean Incident Reports.
- Do NOT create ROI reports.
- Do NOT create case studies.
- Do NOT implement AI-CIS workflows.

## Build Rules
- Keep MVP mobile-first.
- Keep data in local state only.
- No login and no database for MVP.
- Email send must happen server-side only.
- Never expose `RESEND_API_KEY` client-side.
- Enforce confirmation checkboxes before enabling send.
