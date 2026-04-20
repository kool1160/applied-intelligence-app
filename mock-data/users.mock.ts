import type { RoleType } from '../enums/role-type';

type UserMock = {
  userId: string;
  displayName: string;
  role: RoleType;
  department: string;
};

export const usersMock: UserMock[] = [
  {
    userId: 'USR-004',
    displayName: 'Welding Supervisor',
    role: 'supervisor',
    department: 'Welding',
  },
  {
    userId: 'USR-002',
    displayName: 'Welding Lead',
    role: 'lead',
    department: 'Welding',
  },
  {
    userId: 'USR-008',
    displayName: 'Production Manager',
    role: 'manager',
    department: 'Production',
  },
];
