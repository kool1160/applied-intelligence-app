function clean(value, fallback = 'Not provided') {
  if (value == null || value === '') return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

function listLines(items = []) {
  if (!Array.isArray(items) || items.length === 0) return '- Not provided';
  return items.map((item) => `- ${item}`).join('\n');
}

function evidenceLines(evidence = []) {
  if (!Array.isArray(evidence) || evidence.length === 0) return '- No photo evidence listed';

  return evidence.map((item, index) => {
    const label = clean(item.label, `Evidence ${index + 1}`);
    const type = clean(item.type, 'evidence');
    const note = clean(item.note, 'No note provided');
    return `- ${label} (${type}): ${note}`;
  }).join('\n');
}

function matrixLines(matrix = []) {
  if (!Array.isArray(matrix) || matrix.length === 0) return '- Not provided';

  return matrix.map((item) => {
    return `- ${clean(item.role)}: ${clean(item.responsibility)}`;
  }).join('\n');
}

function approvalLines(approval = {}) {
  return [
    `Required By: ${clean(approval.requiredBy)}`,
    `Condition: ${clean(approval.condition)}`,
    `Status: ${clean(approval.status)}`
  ].join('\n');
}

export function formatTraceReport(report = {}) {
  const header = report.reportHeader || {};
  const issueSummary = report.issueSummary || {};
  const source = report.sourceRouterContext || {};

  return [
    'AI-TRACE CORRECTIVE ACTION / TRACE REPORT',
    '',
    'REPORT HEADER',
    `Work Order: ${clean(header.workOrder)}`,
    `Part Number: ${clean(header.partNumber)}`,
    `Revision: ${clean(header.revision)}`,
    `Customer: ${clean(header.customer)}`,
    `Quantity: ${clean(header.quantity)}`,
    `Material: ${clean(header.material)}`,
    `Issue Type: ${clean(header.issueType)}`,
    `Classification: ${clean(header.classification)}`,
    '',
    'SOURCE / ROUTER CONTEXT',
    `Current Operation: ${clean(source.currentOperation)}`,
    `Next Operation: ${clean(source.nextOperation)}`,
    `Inspection Operation: ${clean(source.inspectionOperation)}`,
    `Key Feature / Critical Check: ${clean(source.keyFeature)}`,
    '',
    'ISSUE SUMMARY',
    clean(issueSummary.summary),
    '',
    'DETECTED PROBLEMS',
    listLines(issueSummary.detectedProblems),
    '',
    'PHOTO EVIDENCE SUMMARY',
    evidenceLines(report.photoEvidenceSummary),
    '',
    'CORRECTIVE ACTION REQUIREMENTS',
    listLines(report.correctiveActionRequirements),
    '',
    'CONTAINMENT ACTION',
    clean(report.containmentAction),
    '',
    'RESPONSIBILITY MATRIX',
    matrixLines(report.responsibilityMatrix),
    '',
    'PASS / FAIL CONDITION',
    clean(report.passFailCondition),
    '',
    'OPERATOR CHECKLIST',
    listLines(report.operatorChecklist),
    '',
    'RELEASE APPROVAL',
    approvalLines(report.releaseApproval),
    '',
    'BOUNDARY NOTE',
    'Refab Connect owns capture, routing, review, save, send, copy, and export workflow. AI-Trace Core owns report structure and formatted report output only.'
  ].join('\n');
}
