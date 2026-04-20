export type HandoffStatus =
  | 'open'
  | 'acknowledged'
  | 'inProgress'
  | 'completed'
  | 'escalated';

export const HANDOFF_STATUSES: HandoffStatus[] = [
  'open',
  'acknowledged',
  'inProgress',
  'completed',
  'escalated',
];
