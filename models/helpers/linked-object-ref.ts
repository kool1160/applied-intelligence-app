import type { LinkedObjectType } from '../../enums/linked-object-type';

export type LinkedObjectRef = {
  ref: string;
  type: LinkedObjectType;
  displayLabel?: string;
};
