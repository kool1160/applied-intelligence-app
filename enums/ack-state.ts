export type AckState =
  | 'pending'
  | 'acknowledged'
  | 'notRequired';

export const ACK_STATES: AckState[] = [
  'pending',
  'acknowledged',
  'notRequired',
];
