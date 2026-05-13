export const TRACE_REPORT_SECTIONS = Object.freeze([
  'reportHeader',
  'issueSummary',
  'sourceRouterContext',
  'photoEvidenceSummary',
  'correctiveActionRequirements',
  'containmentAction',
  'responsibilityMatrix',
  'passFailCondition',
  'operatorChecklist',
  'releaseApproval'
]);

export const TRACE_REPORT_BOUNDARY = Object.freeze({
  refabConnectOwns: [
    'issue capture',
    'photo and evidence capture',
    'work order and part number confirmation',
    'department routing',
    'review screen',
    'draft/history save behavior',
    'send/copy/export workflow'
  ],
  aiTraceOwns: [
    'report structure',
    'issue classification support',
    'corrective action report sections',
    'formatted report output',
    'future pattern-tracking-ready fields'
  ],
  notOwnedByAITraceCore: [
    'screens',
    'navigation',
    'PWA behavior',
    'routing ownership',
    'app shell changes',
    'AI-CIS UI',
    'dashboard UI'
  ]
});

export const DEFAULT_TRACE_REPORT_MODEL = Object.freeze({
  reportType: 'AI-Trace Corrective Action / Trace Report',
  sourceSystem: 'Refab Connect',
  engine: 'AI-Trace Core',
  version: 'V8-M11',
  status: 'Draft',
  reportHeader: {
    workOrder: '',
    partNumber: '',
    revision: '',
    customer: '',
    quantity: '',
    material: '',
    issueType: '',
    classification: '',
    currentOperation: '',
    nextOperation: '',
    inspectionOperation: '',
    keyFeature: ''
  },
  issueSummary: {
    summary: '',
    detectedProblems: []
  },
  sourceRouterContext: {
    currentOperation: '',
    nextOperation: '',
    inspectionOperation: '',
    material: '',
    keyFeature: ''
  },
  photoEvidenceSummary: [],
  correctiveActionRequirements: [],
  containmentAction: '',
  responsibilityMatrix: [],
  passFailCondition: '',
  operatorChecklist: [],
  releaseApproval: {
    requiredBy: 'Supervisor / Quality',
    condition: 'Release only after corrective action requirements and checklist are complete.',
    status: 'Pending'
  },
  patternTracking: {
    enabled: false,
    futureUseOnly: true,
    keys: ['workOrder', 'partNumber', 'issueType', 'currentOperation', 'detectedProblems']
  }
});

export function createEmptyTraceReportModel() {
  return JSON.parse(JSON.stringify(DEFAULT_TRACE_REPORT_MODEL));
}
