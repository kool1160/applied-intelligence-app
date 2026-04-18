# Applied Intelligence App Change Log

## Purpose
This log tracks app-source and architecture changes made to the Applied Intelligence app so updates are documented over time.

## Logging Rule
Every meaningful app update should be logged here with:
- date
- change summary
- affected area
- reason / intent
- notes for follow-up if needed

---

## 2026-04-18
### Update Block
**Affected Areas:** App structure, PWA support, AI-Connect source structure, role permissions, workflow foundations, metrics foundations

**Changes:**
- Established V8 app structure with `index.html`, `manifest.json`, `sw.js`, `install.js`, and icon assets.
- Added PWA / install support structure for GitHub Pages deployment.
- Added AI-Connect placeholder source set under `sources/ai-connect/`.
- Added role-permission schema source.
- Added Locked Settings / device setup source.
- Added Trace-to-Connect resolution workflow source.
- Added approved day-one core metrics source.
- Added approved day-one status chain source.
- Added AI-Trace live test checklist.
- Confirmed valid batch testing beyond 20 entries with successful larger batch testing.

**Intent:**
Move the app from concept-only into a structured, testable, source-backed ecosystem shell.

**Follow-Up Notes:**
- Visible UI still contains some V7 wording and should be cleaned up in a future pass.
- Dashboard should evolve toward tabbed time windows: Day / Week / Month / Year.
- Priority should become the first KPI card using a combined score of repeat count, open count, and aging open count, while showing individual factors elsewhere.
- Trace clearance model should follow Lead marks done -> Supervisor verifies -> CIS clears dashboard visibility.

---

## Logging Format Template
### YYYY-MM-DD
**Affected Areas:**

**Changes:**
- 

**Intent:**

**Follow-Up Notes:**
- 
