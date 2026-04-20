import type { AckState } from '../enums/ack-state';
import type { LinkedObjectType } from '../enums/linked-object-type';
import type { SeverityLevel } from '../enums/severity-level';
import type { QuickAction } from './helpers/quick-action';

export type MyWorkItemModel = {
  itemId: string;
  itemType: string;
  title: string;
  linkedObjectRef: string;
  linkedObjectType: LinkedObjectType;
  status?: string;
  severity?: SeverityLevel;
  ackRequired?: boolean;
  ackState?: AckState;
  timestamp: string;
  quickActions?: QuickAction[];
};
