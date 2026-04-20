import type { AckState } from '../enums/ack-state';
import type { LinkedObjectType } from '../enums/linked-object-type';
import type { NotificationType } from '../enums/notification-type';
import type { ReadState } from '../enums/read-state';
import type { SeverityLevel } from '../enums/severity-level';
import type { QuickAction } from './helpers/quick-action';

export type NotificationModel = {
  notificationId: string;
  type: NotificationType;
  title: string;
  linkedObjectRef: string;
  linkedObjectType: LinkedObjectType;
  priority: SeverityLevel;
  readState: ReadState;
  ackRequired: boolean;
  ackState?: AckState;
  timestamp: string;
  deliveryContext?: string;
  quickActions?: QuickAction[];
};
