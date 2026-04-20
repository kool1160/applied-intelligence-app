export type AgingStage =
  | 'freshOpen'
  | 'pendingAcknowledgment'
  | 'stalled'
  | 'escalationRisk';

export const AGING_STAGES: AgingStage[] = [
  'freshOpen',
  'pendingAcknowledgment',
  'stalled',
  'escalationRisk',
];
