export type QuickActionType =
  | 'acknowledge'
  | 'open'
  | 'openThread'
  | 'openMeeting'
  | 'openHandoff'
  | 'openLinkedObject'
  | 'reply'
  | 'confirmOwnership'
  | 'escalate'
  | 'viewHistory'
  | 'openPrep'
  | 'openReport'
  | 'openBroadcast';

export const QUICK_ACTION_TYPES: QuickActionType[] = [
  'acknowledge',
  'open',
  'openThread',
  'openMeeting',
  'openHandoff',
  'openLinkedObject',
  'reply',
  'confirmOwnership',
  'escalate',
  'viewHistory',
  'openPrep',
  'openReport',
  'openBroadcast',
];
