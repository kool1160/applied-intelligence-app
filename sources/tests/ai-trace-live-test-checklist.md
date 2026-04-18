# AI-Trace Live Test Checklist

## Purpose
Use this checklist to validate the currently deployed Applied Intelligence app with AI-Trace as the active working test focus.

## Current Test Scope
- AI-Trace single entry flow
- AI-Trace batch import flow
- AI-CIS handoff generation from Trace
- export outputs
- dashboard / activity refresh behavior
- placeholder structure should not interfere with active Trace behavior

## Test Rules
- AI-Trace is active and testable
- AI-Connect is present in source only and should not interfere with the app
- tests should focus on currently working front-end behavior

## Test 1 - Single Trace Entry
- Open the live app
- Go to the Trace area
- Enter one complete trace item manually
- Save or submit the trace item
- Confirm the item appears in the expected trace history / activity area
- Confirm no layout break occurs on mobile
- Confirm no placeholder AI-Connect source change affects this flow

## Test 2 - Batch Import
- Open the batch import area under Trace
- Paste multiple test entries
- Run the import
- Confirm all expected entries appear
- Confirm partial imports do not silently fail
- Confirm spacing / formatting remains stable in portrait and landscape

## Test 3 - AI-CIS Handoff Builder
- Start from a trace item or trace batch
- Generate the AI-CIS handoff
- Confirm the handoff content appears
- Confirm the handoff is clearly separated from raw trace entries
- Confirm this still behaves as AI-Trace feeding AI-CIS rather than replacing AI-CIS

## Test 4 - Export Outputs
- Export trace JSON
- Confirm file name and structure are correct
- Export management summary text
- Confirm summary text is generated
- Export pattern summary text
- Confirm pattern summary text is generated
- Confirm exports still use the expected Trace-focused outputs

## Test 5 - Dashboard / Recent Activity
- Open the dashboard or management view
- Confirm recent activity updates after new trace entries
- Confirm priority or activity blocks update correctly
- Confirm no stale visual state remains after refresh

## Test 6 - Mobile Install / App Behavior
- Open the live app from the Home Screen install
- Confirm it opens like an app
- Confirm icon and name look correct enough for testing
- Confirm the app still loads the current deployed version

## Test 7 - Regression Check
- Confirm AI-Trace remains the primary active feature
- Confirm AI-CIS remains a handoff target
- Confirm AI-Connect does not appear as a fake active workflow engine
- Confirm no new source additions broke existing flows

## Suggested Test Data
### Single Entry
- Department: Welding
- Area: Booth 3
- Issue Type: Missing Secondary Tag
- Summary: Parts reached welding without secondary identification
- Immediate Impact: Delay in identification and sorting
- Next Step: Escalate for process review if repeated

### Batch Entry Sample
- Laser / Missing tag / sorting delay
- Welding / fixture clamp damage / repeatability risk
- Machining / routing mismatch / wrong sequence exposure
- Assembly / missing hardware kit / operator delay
- Quality / recheck loop / duplicate inspection time

## Pass Condition
The app should continue to operate cleanly as an AI-Trace-first front-end, with exports and AI-CIS handoff behavior intact, while AI-Connect remains source-structured but inactive.
