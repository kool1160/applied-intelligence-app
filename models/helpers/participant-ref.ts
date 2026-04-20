import type { RoleType } from '../../enums/role-type';

export type ParticipantRef = {
  userId?: string;
  displayName: string;
  role?: RoleType;
  department?: string;
};
