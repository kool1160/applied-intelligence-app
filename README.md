# Applied Intelligence App

Applied Intelligence is an iPad-first web app for manufacturing workflow, traceability, continuous improvement, coordination, and analytics.

This repository is the working app shell for Home, AI-Trace, AI-CIS, Dashboard, Analytics, and More/Admin, with the current runtime direction expanding into controlled execution flow and work-linked communication.

## Current direction

The current build is being treated as:

- an iPad-first flagship experience
- an iPhone scaled-down support experience
- a web app now that is wrapper-ready later

The app is no longer being treated as only a visual shell. The current runtime direction is centered on a governing execution model beneath AI-Connect and work-linked communication attached to real execution objects.

## Runtime direction

Current working runtime chain:

**AI-Connect → AI-CIS → AI-Case / AI-ROI → Execution Spine → Work-Linked Thread Layer**

Working interpretation:

- **Execution object** = controlled work record
- **Work-linked thread** = communication layer attached to that work record

Important direction rule:

Execution Spine must not become a detached parallel system.
It is the governing execution model underneath existing AI-Connect behavior.

## Lane alignment

The current lane interpretation is:

- **My Work** = execution objects I own
- **Alerts** = execution objects needing attention
- **Handoffs** = execution objects changing owner or department
- **Threads** = communication attached to live execution objects
- **Meetings** = execution objects requiring alignment, prep, or review

## Visual direction

- Dark navy premium foundation
- Rounded card system
- Restrained glow
- Liquid-glass and translucent chrome direction
- Premium spacing and hierarchy
- App feel over website feel

## Primary goals

- Make shop-floor issues visible
- Support structured trace capture
- Connect trace to improvement workflows
- Provide strong dashboard and analytics views
- Add controlled execution flow beneath coordination
- Keep communication tied to real work, ownership, and action
- Keep the shell clean, premium, and system-driven

## Current active build priorities

- Strengthen Execution Spine as the governing execution model
- Keep work-linked thread behavior derived from execution objects
- Validate lifecycle, ownership, handoff, thread, and sync behavior through structured scenario testing
- Package the next meaningful internal update around the runtime that passes validation
- Improve wrapper-readiness without breaking the current web-app shell

## Core files

- `index.html`
- `manifest.json`
- `install.js`
- `sw.js`
- `assets/icons/`
- `CHANGELOG.md`
- `docs/`

## Working principle

Build the product first.

Now: strong iPad-first web app.
Later: native Apple wrapper or hybrid shell if needed.

## Status

This repo is in active iteration.

The current priority is no longer only shell polish. It is now focused on:

- execution runtime behavior
- work-linked communication behavior
- scenario-based runtime validation
- internal update packaging readiness
- continued app shell and wrapper-readiness improvement
