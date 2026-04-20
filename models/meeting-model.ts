import type { AckState } from '../enums/ack-state';
import type { AgingStage } from '../enums/aging-stage';
import type { SeverityLevel } from '../enums/severity-level';
import type { MeetingType } from '../enums/meeting-type';
import type { AttendeeSummary } from './helpers/attendee-summary';
import type { QuickAction } from './helpers/quick-action';

export type MeetingModel = {
  meetingId: string;
  title: string;
  meetingType: MeetingType;
  scheduledAt: string;
  ackState: AckState;
  prepReadiness: SeverityLevel | AgingStage;
  unreadPrepCount?: number;
  attendeeSummary: AttendeeSummary;
  linkedReports?: string[];
  linkedThreads?: string[];
  agendaItems?: string[];
  escalationState?: SeverityLevel;
  quickActions?: QuickAction[];
};
