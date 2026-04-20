import type { QuickActionType } from '../../enums/quick-action-type';

export type QuickAction = {
  type: QuickActionType;
  label: string;
  enabled?: boolean;
};
