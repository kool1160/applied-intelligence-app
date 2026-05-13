const ISSUE_KEYWORDS = Object.freeze([
  {
    classification: 'Laser Process Output Not Ready for Welding',
    match: ['laser', 'dross', 'slag', 'burr', 'rough laser edge', 'hole verification', 'stacking', 'cleaned', 'welding']
  },
  {
    classification: 'Routing / Operation Readiness Issue',
    match: ['router', 'operation', 'missing operation', 'current operation', 'next operation', 'inspection']
  },
  {
    classification: 'Quality Verification Risk',
    match: ['inspection', 'no-go', 'gauge', 'pin', 'pass', 'fail', 'quality', 'hold']
  },
  {
    classification: 'Material / Component Readiness Issue',
    match: ['material', 'shortage', 'wrong material', 'component', 'purchased']
  }
]);

function normalize(value) {
  if (Array.isArray(value)) return value.join(' ');
  return value == null ? '' : String(value);
}

export function classifyTraceIssue(issue = {}) {
  const searchText = [
    issue.issueType,
    issue.issueSummary,
    issue.currentOperation,
    issue.nextOperation,
    issue.inspectionOperation,
    issue.keyFeature,
    normalize(issue.detectedProblems),
    normalize(issue.correctiveActions)
  ].join(' ').toLowerCase();

  const explicitType = normalize(issue.issueType).trim();
  if (explicitType) {
    const explicitMatch = ISSUE_KEYWORDS.find((item) => item.classification.toLowerCase() === explicitType.toLowerCase());
    if (explicitMatch) return explicitMatch.classification;
  }

  let bestMatch = null;
  let bestScore = 0;

  ISSUE_KEYWORDS.forEach((candidate) => {
    const score = candidate.match.reduce((total, keyword) => {
      return searchText.includes(keyword.toLowerCase()) ? total + 1 : total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = candidate.classification;
    }
  });

  return bestMatch || explicitType || 'General Corrective Action / Trace Issue';
}
