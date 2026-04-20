import type { LinkedObjectType } from '../enums/linked-object-type';
import type { ThreadType } from '../enums/thread-type';
import type { VisibilityState } from '../enums/visibility-state';
import type { ParticipantRef } from './helpers/participant-ref';
import type { QuickAction } from './helpers/quick-action';

export type ThreadModel = {
  threadId: string;
  title: string;
  threadType: ThreadType;
  linkedObjectRef: string;
  linkedObjectType: LinkedObjectType;
  participants: ParticipantRef[];
  departmentTags?: string[];
  unreadCount: number;
  lastUpdatedAt: string;
  visibilityState?: VisibilityState;
  ownerLane?: string;
  quickActions?: QuickAction[];
};
