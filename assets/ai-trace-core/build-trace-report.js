import { createEmptyTraceReportModel } from './trace-report-model.js';
import { classifyTraceIssue } from './classify-trace-issue.js';
import { formatTraceReport } from './format-trace-report.js';

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value == null || value === '') return [];
  return [value];
}

function withDefault(value, fallback = '') {
  return value == null ? fallback : value;
}

function buildResponsibilityMatrix(issue = {}) {
  if (Array.isArray(issue.responsibilityMatrix) && issue.responsibilityMatrix.length > 0) {
    return issue.responsibilityMatrix;
  }

  return [
    {
      role: 'Laser Operator / Department Owner',
      responsibility: 'Clean parts after laser and complete required readiness checks before moving parts forward.'
    },
    {
      role: 'Supervisor',
      responsibility: 'Review questionable parts, confirm staging expectations, and hold nonconforming output when needed.'
    },
    {
      role: 'Quality / Inspection',
      responsibility: 'Verify critical feature requirements and support pass/fail release decision when risk is present.'
    },
    {
      role: 'Welding / Next Operation',
      responsibility: 'Receive only cleaned, verified, and properly staged parts ready for welding.'
    }
  ];
}

function buildOperatorChecklist(issue = {}) {
  if (Array.isArray(issue.operatorChecklist) && issue.operatorChecklist.length > 0) {
    return issue.operatorChecklist;
  }

  const checklist = [
    'Confirm work order and part number match the router / job packet.',
    'Confirm current operation is complete before moving parts to the next operation.'
  ];

  asArray(issue.correctiveActions).forEach((action) => checklist.push(action));

  checklist.push('Separate or hold any questionable parts for Supervisor / Quality review.');
  checklist.push('Move forward only parts that meet the pass condition.');

  return checklist;
}

function buildContainmentAction(issue = {}) {
  if (issue.containmentAction) return issue.containmentAction;

  return 'Hold questionable or nonconforming parts at the current operation. Do not release to welding until cleanup, critical feature verification, staging, and Supervisor / Quality review requirements are complete.';
}

function buildPassFailCondition(issue = {}) {
  if (issue.passFailCondition) return issue.passFailCondition;

  const keyFeature = issue.keyFeature ? ` Critical feature must pass: ${issue.keyFeature}.` : '';
  return `PASS when parts are cleaned, verified, staged correctly, and released for the next operation. FAIL when dross, slag, burrs, rough edges, unchecked critical features, or uncontrolled stacking remain.${keyFeature}`;
}

export function buildTraceReport(refabConnectIssue = {}) {
  const issue = refabConnectIssue || {};
  const report = createEmptyTraceReportModel();
  const classification = classifyTraceIssue(issue);

  report.status = withDefault(issue.status, 'Draft');

  report.reportHeader = {
    workOrder: withDefault(issue.workOrder),
    partNumber: withDefault(issue.partNumber),
    revision: withDefault(issue.revision),
    customer: withDefault(issue.customer),
    quantity: withDefault(issue.quantity),
    material: withDefault(issue.material),
    issueType: withDefault(issue.issueType),
    classification,
    currentOperation: withDefault(issue.currentOperation),
    nextOperation: withDefault(issue.nextOperation),
    inspectionOperation: withDefault(issue.inspectionOperation),
    keyFeature: withDefault(issue.keyFeature)
  };

  report.issueSummary = {
    summary: withDefault(issue.issueSummary),
    detectedProblems: asArray(issue.detectedProblems)
  };

  report.sourceRouterContext = {
    currentOperation: withDefault(issue.currentOperation),
    nextOperation: withDefault(issue.nextOperation),
    inspectionOperation: withDefault(issue.inspectionOperation),
    material: withDefault(issue.material),
    keyFeature: withDefault(issue.keyFeature)
  };

  report.photoEvidenceSummary = asArray(issue.evidence).map((item, index) => ({
    label: withDefault(item?.label, `Evidence ${index + 1}`),
    type: withDefault(item?.type, 'evidence'),
    note: withDefault(item?.note, '')
  }));

  report.correctiveActionRequirements = asArray(issue.correctiveActions);
  report.containmentAction = buildContainmentAction(issue);
  report.responsibilityMatrix = buildResponsibilityMatrix(issue);
  report.passFailCondition = buildPassFailCondition(issue);
  report.operatorChecklist = buildOperatorChecklist(issue);

  report.releaseApproval = {
    requiredBy: withDefault(issue.releaseApproval?.requiredBy, 'Supervisor / Quality'),
    condition: withDefault(issue.releaseApproval?.condition, 'Release only after corrective action requirements and checklist are complete.'),
    status: withDefault(issue.releaseApproval?.status, 'Pending')
  };

  report.patternTracking = {
    enabled: false,
    futureUseOnly: true,
    keys: [
      report.reportHeader.workOrder,
      report.reportHeader.partNumber,
      report.reportHeader.issueType,
      report.reportHeader.currentOperation,
      ...report.issueSummary.detectedProblems
    ].filter(Boolean)
  };

  return {
    report,
    formattedText: formatTraceReport(report)
  };
}

export default buildTraceReport;
