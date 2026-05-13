# AI-Trace Core for Refab Connect

## What this package is

This folder contains a separated AI-Trace core extraction package for Refab Connect.

Its job is to take a plain Refab Connect issue object and turn it into a structured corrective action / trace report plus formatted text output.

Refab Connect can later use this package as a report-generation utility without importing the full Applied Intelligence App V8 shell.

## What this package is not

This is not the Applied Intelligence App.

This is not a UI redesign.

This is not a dashboard implementation.

This is not the AI-CIS workflow.

This is not routing ownership, navigation, PWA behavior, or app shell logic.

## Boundary statement

Refab Connect owns the workflow.

AI-Trace owns the report structure.

AI-Trace Core must not add screens, navigation, PWA behavior, routing ownership, app shell changes, AI-CIS UI, unrelated agents, manifest behavior, service worker behavior, icons, or full Applied Intelligence branding shell.

## Included files

- `trace-report-model.js`  
  Defines the report model, section names, and package boundary constants.

- `classify-trace-issue.js`  
  Classifies the incoming issue into a trace/corrective-action category.

- `format-trace-report.js`  
  Converts a structured report object into preview/copy/export/send-ready text.

- `build-trace-report.js`  
  Public builder function. Accepts a plain Refab Connect issue object and returns the structured report plus formatted text.

- `README_AI_TRACE_CORE_FOR_REFAB_CONNECT.md`  
  Explains usage, boundaries, and integration rules.

## Public function

```js
import { buildTraceReport } from './assets/ai-trace-core/build-trace-report.js';

const result = buildTraceReport(refabConnectIssue);

console.log(result.report);
console.log(result.formattedText);
```

## Input

Input should be a plain Refab Connect issue object.

Example:

```js
const refabConnectIssue = {
  workOrder: '008604',
  partNumber: '1124191',
  revision: 'C',
  customer: 'JOST INTERNATIONAL',
  quantity: '500 EA',
  material: '3/8 in. HSLA GR50',
  currentOperation: 'CT10 - 4K Mazak Laser',
  nextOperation: 'RW10 - Cobot Welder',
  inspectionOperation: 'QC10 - Inspection',
  keyFeature: 'Ø .672 hole / square check',
  issueType: 'Laser Process Output Not Ready for Welding',
  issueSummary: 'Parts from laser are not consistently cleaned, verified, or staged before moving to welding.',
  detectedProblems: [
    'Laser dross',
    'Slag',
    'Burrs',
    'Rough laser edge',
    'Hole verification risk',
    'Uncontrolled stacking'
  ],
  correctiveActions: [
    'Clean parts after laser',
    'Verify Ø .672 hole with approved no-go pin',
    'Stack cleaned and verified parts neatly in sets of 8',
    'Hold questionable parts for Supervisor / Quality review'
  ],
  evidence: [
    {
      label: 'Work order / router control',
      type: 'photo',
      note: 'Shows WO, PN, operations, and router requirements'
    },
    {
      label: 'Correct cleaned condition',
      type: 'photo',
      note: 'Shows expected cleaned/ground lower area'
    },
    {
      label: 'Incorrect uncleaned condition',
      type: 'photo',
      note: 'Shows missing cleanup condition'
    },
    {
      label: 'No-go gauge verification',
      type: 'photo',
      note: 'Shows approved no-go pin used for hole verification'
    }
  ]
};
```

## Output

`buildTraceReport(refabConnectIssue)` returns:

```js
{
  report: {
    reportType: 'AI-Trace Corrective Action / Trace Report',
    sourceSystem: 'Refab Connect',
    engine: 'AI-Trace Core',
    version: 'V8-M11',
    status: 'Draft',
    reportHeader: {},
    issueSummary: {},
    sourceRouterContext: {},
    photoEvidenceSummary: [],
    correctiveActionRequirements: [],
    containmentAction: '',
    responsibilityMatrix: [],
    passFailCondition: '',
    operatorChecklist: [],
    releaseApproval: {},
    patternTracking: {}
  },
  formattedText: 'AI-TRACE CORRECTIVE ACTION / TRACE REPORT...'
}
```

The formatted text is intended for preview, copy, export, save, or send-ready workflows controlled by Refab Connect.

## Report sections generated

- Report header
- Issue summary
- Source / router context
- Photo evidence summary
- Corrective action requirements
- Containment action
- Responsibility matrix
- Pass / fail condition
- Operator checklist
- Release approval

## How Refab Connect should call it

1. Refab Connect captures the issue.
2. Refab Connect captures evidence/photos.
3. Refab Connect confirms work order and part number.
4. Refab Connect sends the confirmed plain issue object into `buildTraceReport()`.
5. AI-Trace Core returns a report object and formatted text.
6. Refab Connect previews, saves, copies, exports, or sends the output.
7. Refab Connect owns history, draft state, routing, department owner, and final workflow behavior.

## Refab Connect responsibilities

- Capture issue
- Capture photos/evidence
- Confirm work order / part number
- Route to department owner
- Show review screen
- Save draft/history
- Send/copy/export final output

## AI-Trace Core responsibilities

- Accept captured Refab Connect issue data
- Structure the issue into a corrective action / trace report
- Classify issue type
- Preserve work order, part number, operation, department, and evidence references
- Build report sections
- Format report output for preview, copy, export, or send-ready text
- Support future pattern tracking without requiring dashboard implementation

## Do-not-import list

Do not import or copy these from Applied Intelligence App V8 into Refab Connect for this package:

- `index.html`
- bottom navigation
- Home / More screens
- AI-Trace dashboard UI
- `manifest.json`
- `sw.js`
- `install.js`
- icons
- AI-CIS UI
- unrelated agents
- full Applied Intelligence branding shell

## Integration rule

Use this package as a utility/report engine only.

Do not let AI-Trace Core control the Refab Connect app flow.
