import type { AckState } from '../enums/ack-state';
import type { AgingStage } from '../enums/aging-stage';
import type { HandoffStatus } from '../enums/handoff-status';
import type { LinkedObjectType } from '../enums/linked-object-type';
import type { QuickAction } from './helpers/quick-action';

export type HandoffModel = {
  handoffId: string;
  title: string;
  sourceType: string;
  sourceRef: string;
  destinationType: string;
  destinationRef: string;
  ownerUserId?: string;
  ownerDisplay: string;
  status: HandoffStatus;
  agingStage?: AgingStage;
  linkedObjectRef?: string;
  linkedObjectType?: LinkedObjectType;
  linkedThreadRef?: string;
  ackRequired?: boolean;
  ackState?: AckState;
  lastUpdatedAt: string;
  visibilityHolders?: string[];
  quickActions?: QuickAction[];
};
