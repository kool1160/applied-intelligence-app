import React, { useMemo, useState } from 'react';

import { ObjectList } from '../components/foundation/ObjectList';
import { ScreenLayout } from '../components/foundation/ScreenLayout';
import { SummaryBar } from '../components/foundation/SummaryBar';
import { TopBar } from '../components/foundation/TopBar';
import type { FilterOption } from '../models/helpers/filter-option';
import type { SummaryItem } from '../models/helpers/summary-item';

type MeetingType = 'department' | 'crossFunctional' | 'executive' | 'review';
type AckState = 'pending' | 'acknowledged';
type PrepReadiness = 'low' | 'medium' | 'high' | 'warning' | 'critical';
type EscalationState = 'high' | 'warning' | 'critical';

type QuickAction = {
  type: string;
  label: string;
  enabled?: boolean;
};

type MeetingModel = {
  meetingId: string;
  title: string;
  meetingType: MeetingType;
  scheduledAt: string;
  ackState: AckState;
  prepReadiness: PrepReadiness;
  unreadPrepCount?: number;
  attendeeSummary: {
    required: number;
    acknowledged: number;
    pending: number;
  };
  linkedReports?: string[];
  linkedThreads?: string[];
  agendaItems?: string[];
  escalationState?: EscalationState;
  quickActions?: QuickAction[];
};

type MeetingsFilterState = {
  upcoming: string;
  needsAcknowledgment: string;
  atRisk: string;
  myMeetings: string;
  meetingType: string;
};

const meetingsMock: MeetingModel[] = [
  {
    meetingId: 'MTG-00011',
    title: 'Part A-1001 recurring delay review',
    meetingType: 'crossFunctional',
    scheduledAt: '2026-04-21 08:00 AM',
    ackState: 'pending',
    prepReadiness: 'warning',
    unreadPrepCount: 2,
    attendeeSummary: { required: 4, acknowledged: 2, pending: 2 },
    linkedReports: ['LIR-P-014'],
    linkedThreads: ['THR-00018'],
    agendaItems: ['Recurring delays', 'Cross-department coordination'],
    escalationState: 'warning',
    quickActions: [
      { type: 'acknowledge', label: 'Acknowledge' },
      { type: 'openMeeting', label: 'Open Meeting' },
      { type: 'openPrep', label: 'Open Prep' },
    ],
  },
  {
    meetingId: 'MTG-00012',
    title: 'Today welding standup',
    meetingType: 'department',
    scheduledAt: '2026-04-20 01:30 PM',
    ackState: 'acknowledged',
    prepReadiness: 'low',
    unreadPrepCount: 0,
    attendeeSummary: { required: 6, acknowledged: 6, pending: 0 },
    linkedReports: ['LIR-P-015'],
    linkedThreads: ['THR-00020'],
    agendaItems: ['Today priorities', 'Fixture repair follow-up'],
    quickActions: [
      { type: 'openMeeting', label: 'Open Meeting' },
      { type: 'openPrep', label: 'Open Prep' },
    ],
  },
  {
    meetingId: 'MTG-00013',
    title: 'Executive escalation review',
    meetingType: 'executive',
    scheduledAt: '2026-04-21 10:00 AM',
    ackState: 'pending',
    prepReadiness: 'critical',
    unreadPrepCount: 3,
    attendeeSummary: { required: 5, acknowledged: 3, pending: 2 },
    linkedReports: ['LIR-P-017'],
    linkedThreads: ['THR-00021'],
    agendaItems: ['Escalated visibility', 'Routing control risk'],
    escalationState: 'critical',
    quickActions: [
      { type: 'acknowledge', label: 'Acknowledge' },
      { type: 'openMeeting', label: 'Open Meeting' },
      { type: 'openLinkedThread', label: 'Open Linked Thread' },
    ],
  },
  {
    meetingId: 'MTG-00014',
    title: 'Unread prep package review',
    meetingType: 'review',
    scheduledAt: '2026-04-21 02:00 PM',
    ackState: 'acknowledged',
    prepReadiness: 'medium',
    unreadPrepCount: 4,
    attendeeSummary: { required: 3, acknowledged: 3, pending: 0 },
    linkedReports: ['LIR-P-016'],
    linkedThreads: ['THR-00023'],
    agendaItems: ['Prep packet review', 'Release readiness'],
    quickActions: [
      { type: 'openPrep', label: 'Open Prep' },
      { type: 'openMeeting', label: 'Open Meeting' },
    ],
  },
  {
    meetingId: 'MTG-00015',
    title: 'At-risk cross-functional readiness check',
    meetingType: 'crossFunctional',
    scheduledAt: '2026-04-22 09:00 AM',
    ackState: 'pending',
    prepReadiness: 'high',
    unreadPrepCount: 1,
    attendeeSummary: { required: 4, acknowledged: 1, pending: 3 },
    linkedReports: ['LIR-P-018'],
    linkedThreads: ['THR-00025'],
    agendaItems: ['Readiness gap', 'Ownership confirmation'],
    escalationState: 'high',
    quickActions: [
      { type: 'acknowledge', label: 'Acknowledge' },
      { type: 'openMeeting', label: 'Open Meeting' },
      { type: 'openPrep', label: 'Open Prep' },
    ],
  },
  {
    meetingId: 'MTG-00016',
    title: 'Resolved issue review closeout',
    meetingType: 'review',
    scheduledAt: '2026-04-22 11:00 AM',
    ackState: 'acknowledged',
    prepReadiness: 'low',
    unreadPrepCount: 0,
    attendeeSummary: { required: 2, acknowledged: 2, pending: 0 },
    linkedReports: ['LIR-P-012'],
    linkedThreads: ['THR-00024'],
    agendaItems: ['Closeout confirmation', 'Archive decision'],
    quickActions: [
      { type: 'openMeeting', label: 'Open Meeting' },
      { type: 'openLinkedReport', label: 'Open Linked Report' },
    ],
  },
  {
    meetingId: 'MTG-00017',
    title: 'Manager prep sync for production plan',
    meetingType: 'crossFunctional',
    scheduledAt: '2026-04-20 03:30 PM',
    ackState: 'pending',
    prepReadiness: 'warning',
    unreadPrepCount: 2,
    attendeeSummary: { required: 3, acknowledged: 2, pending: 1 },
    linkedReports: ['LIR-P-019'],
    linkedThreads: ['THR-00019'],
    agendaItems: ['Production plan', 'Meeting prep alignment'],
    quickActions: [
      { type: 'acknowledge', label: 'Acknowledge' },
      { type: 'openPrep', label: 'Open Prep' },
      { type: 'openMeeting', label: 'Open Meeting' },
    ],
  },
  {
    meetingId: 'MTG-00018',
    title: 'Department review for weld flow',
    meetingType: 'department',
    scheduledAt: '2026-04-23 07:00 AM',
    ackState: 'acknowledged',
    prepReadiness: 'medium',
    unreadPrepCount: 1,
    attendeeSummary: { required: 5, acknowledged: 5, pending: 0 },
    linkedReports: ['LIR-P-020'],
    linkedThreads: ['THR-00022'],
    agendaItems: ['Flow constraints', 'Next-step ownership'],
    quickActions: [
      { type: 'openMeeting', label: 'Open Meeting' },
      { type: 'openPrep', label: 'Open Prep' },
    ],
  },
];

const upcomingFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All', value: 'all' },
  { key: 'upcoming', label: 'Upcoming', value: 'upcoming' },
  { key: 'today', label: 'Today', value: 'today' },
];
const needsAcknowledgmentFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All', value: 'all' },
  { key: 'pending', label: 'Needs Acknowledgment', value: 'pending' },
  { key: 'acknowledged', label: 'Acknowledged', value: 'acknowledged' },
];
const atRiskFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All', value: 'all' },
  { key: 'atRisk', label: 'At Risk', value: 'atRisk' },
  { key: 'notAtRisk', label: 'Not At Risk', value: 'notAtRisk' },
];
const myMeetingsFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Meetings', value: 'all' },
  { key: 'mine', label: 'My Meetings', value: 'mine' },
];
const meetingTypeFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Types', value: 'all' },
  { key: 'department', label: 'Department', value: 'department' },
  { key: 'crossFunctional', label: 'Cross-Functional', value: 'crossFunctional' },
  { key: 'executive', label: 'Executive', value: 'executive' },
  { key: 'review', label: 'Review', value: 'review' },
];

function buildMeetingsSummary(items: MeetingModel[]): SummaryItem[] {
  const upcomingCount = items.filter((meeting) => meeting.scheduledAt).length;
  const needsAcknowledgmentCount = items.filter((meeting) => meeting.ackState === 'pending').length;
  const atRiskCount = items.filter((meeting) => meeting.prepReadiness === 'high' || meeting.prepReadiness === 'warning' || meeting.prepReadiness === 'critical').length;
  const unreadPrepCount = items.filter((meeting) => (meeting.unreadPrepCount || 0) > 0).length;
  const escalatedMeetingsCount = items.filter((meeting) => meeting.escalationState === 'high' || meeting.escalationState === 'warning' || meeting.escalationState === 'critical').length;
  const todayCount = items.filter((meeting) => meeting.scheduledAt.includes('2026-04-20')).length;

  return [
    { key: 'upcoming', label: 'Upcoming', count: upcomingCount },
    { key: 'needsAcknowledgment', label: 'Needs Acknowledgment', count: needsAcknowledgmentCount, severity: needsAcknowledgmentCount > 0 ? 'warning' : undefined },
    { key: 'atRisk', label: 'At Risk', count: atRiskCount, severity: atRiskCount > 0 ? 'high' : undefined },
    { key: 'unreadPrep', label: 'Unread Prep', count: unreadPrepCount },
    { key: 'escalatedMeetings', label: 'Escalated Meetings', count: escalatedMeetingsCount, severity: escalatedMeetingsCount > 0 ? 'critical' : undefined },
    { key: 'today', label: 'Today', count: todayCount },
  ];
}

function buildMeetingActions(meeting: MeetingModel) {
  const defaultActions = [
    { type: 'acknowledge', label: 'Acknowledge' },
    { type: 'openMeeting', label: 'Open Meeting' },
    { type: 'openPrep', label: 'Open Prep' },
    { type: 'openLinkedThread', label: 'Open Linked Thread' },
    { type: 'openLinkedReport', label: 'Open Linked Report' },
  ];
  const existingTypes = new Set(defaultActions.map((action) => action.type));
  const extraActions = meeting.quickActions?.filter((action) => !existingTypes.has(action.type)) ?? [];
  return [...defaultActions, ...extraActions];
}

function MeetingCard({ meeting, onAction }: { meeting: MeetingModel; onAction?: (actionType: string, meeting: MeetingModel) => void }) {
  const linkedReports = meeting.linkedReports && meeting.linkedReports.length > 0 ? meeting.linkedReports.join(', ') : '—';
  const linkedThreads = meeting.linkedThreads && meeting.linkedThreads.length > 0 ? meeting.linkedThreads.join(', ') : '—';
  const agendaPreview = meeting.agendaItems && meeting.agendaItems.length > 0 ? meeting.agendaItems.slice(0, 2).join(' | ') : '—';
  const actions = buildMeetingActions(meeting);

  return (
    <article data-component="MeetingCard" data-meeting-id={meeting.meetingId} data-meeting-type={meeting.meetingType}>
      <div data-slot="title">{meeting.title}</div>
      <div data-slot="meeting-type">{meeting.meetingType}</div>
      <div data-slot="scheduled-at">{meeting.scheduledAt}</div>
      <div data-slot="ack-state">{meeting.ackState}</div>
      <div data-slot="prep-readiness">{meeting.prepReadiness}</div>
      <div data-slot="attendee-summary">Required: {meeting.attendeeSummary.required} | Acknowledged: {meeting.attendeeSummary.acknowledged} | Pending: {meeting.attendeeSummary.pending}</div>
      {meeting.unreadPrepCount !== undefined ? <div data-slot="unread-prep-count">Unread Prep: {meeting.unreadPrepCount}</div> : null}
      <div data-slot="linked-reports">{linkedReports}</div>
      <div data-slot="linked-threads">{linkedThreads}</div>
      {meeting.escalationState ? <div data-slot="escalation-state">{meeting.escalationState}</div> : null}
      <div data-slot="agenda-preview">{agendaPreview}</div>
      <div data-slot="actions">
        {actions.map((action) => (
          <button key={action.type} type="button" disabled={action.enabled === false} onClick={() => onAction?.(action.type, meeting)}>
            {action.label}
          </button>
        ))}
      </div>
    </article>
  );
}

function MeetingDetailView({ meeting, onAction }: { meeting: MeetingModel; onAction?: (actionType: string, meeting: MeetingModel) => void }) {
  const linkedReports = meeting.linkedReports && meeting.linkedReports.length > 0 ? meeting.linkedReports.join(', ') : '—';
  const linkedThreads = meeting.linkedThreads && meeting.linkedThreads.length > 0 ? meeting.linkedThreads.join(', ') : '—';
  const agendaItems = meeting.agendaItems && meeting.agendaItems.length > 0 ? meeting.agendaItems.join(' | ') : '—';
  const actions = buildMeetingActions(meeting);

  return (
    <section data-component="MeetingDetailView" data-meeting-id={meeting.meetingId} data-meeting-type={meeting.meetingType}>
      <div data-slot="title">{meeting.title}</div>
      <div data-slot="meeting-type">{meeting.meetingType}</div>
      <div data-slot="scheduled-at">{meeting.scheduledAt}</div>
      <div data-slot="ack-state">{meeting.ackState}</div>
      <div data-slot="prep-readiness">{meeting.prepReadiness}</div>
      <div data-slot="attendee-summary">Required: {meeting.attendeeSummary.required} | Acknowledged: {meeting.attendeeSummary.acknowledged} | Pending: {meeting.attendeeSummary.pending}</div>
      <div data-slot="linked-reports">{linkedReports}</div>
      <div data-slot="linked-threads">{linkedThreads}</div>
      <div data-slot="agenda-items">{agendaItems}</div>
      {meeting.escalationState ? <div data-slot="escalation-state">{meeting.escalationState}</div> : null}
      <div data-slot="actions">
        {actions.map((action) => (
          <button key={action.type} type="button" disabled={action.enabled === false} onClick={() => onAction?.(action.type, meeting)}>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function MeetingsScreen() {
  const [filters, setFilters] = useState<MeetingsFilterState>({
    upcoming: 'all',
    needsAcknowledgment: 'all',
    atRisk: 'all',
    myMeetings: 'all',
    meetingType: 'all',
  });
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingModel | null>(null);

  const summaryItems = useMemo(() => buildMeetingsSummary(meetingsMock), []);
  const meetingsFilterConfig = useMemo(
    () => ({
      upcoming: upcomingFilterOptions,
      needsAcknowledgment: needsAcknowledgmentFilterOptions,
      atRisk: atRiskFilterOptions,
      myMeetings: myMeetingsFilterOptions,
      meetingType: meetingTypeFilterOptions,
    }),
    []
  );

  const filteredMeetings = useMemo(() => {
    return meetingsMock.filter((meeting) => {
      const upcomingMatch = filters.upcoming === 'all' || (filters.upcoming === 'upcoming' && !!meeting.scheduledAt) || (filters.upcoming === 'today' && meeting.scheduledAt.includes('2026-04-20'));
      const needsAcknowledgmentMatch = filters.needsAcknowledgment === 'all' || meeting.ackState === filters.needsAcknowledgment;
      const atRiskMatch = filters.atRisk === 'all' || (filters.atRisk === 'atRisk' && (meeting.prepReadiness === 'high' || meeting.prepReadiness === 'warning' || meeting.prepReadiness === 'critical')) || (filters.atRisk === 'notAtRisk' && meeting.prepReadiness !== 'high' && meeting.prepReadiness !== 'warning' && meeting.prepReadiness !== 'critical');
      const myMeetingsMatch = filters.myMeetings === 'all' || (filters.myMeetings === 'mine' && meeting.attendeeSummary.required > 0);
      const meetingTypeMatch = filters.meetingType === 'all' || meeting.meetingType === filters.meetingType;
      return upcomingMatch && needsAcknowledgmentMatch && atRiskMatch && myMeetingsMatch && meetingTypeMatch;
    });
  }, [filters]);

  const handleMeetingAction = (actionType: string, meeting: MeetingModel) => {
    switch (actionType) {
      case 'acknowledge':
        console.log('Acknowledge meeting', meeting.meetingId);
        break;
      case 'openMeeting':
        console.log('Open meeting', meeting.meetingId);
        setSelectedMeeting(meeting);
        break;
      case 'openPrep':
        console.log('Open prep', meeting.meetingId);
        break;
      case 'openLinkedThread':
      case 'openThread':
        console.log('Open linked thread', meeting.meetingId);
        break;
      case 'openLinkedReport':
      case 'openReport':
        console.log('Open linked report', meeting.meetingId);
        break;
      default:
        console.log('Unhandled Meetings action', actionType, meeting.meetingId);
        break;
    }
  };

  return (
    <ScreenLayout title={<TopBar title="Meetings / Prep" subtitle="Readiness and preparation" />} summary={<SummaryBar items={summaryItems} />}>
      <section data-component="MeetingsFilterControls">
        <div data-slot="filter-group">
          <label htmlFor="meetings-filter-upcoming">Upcoming</label>
          <select id="meetings-filter-upcoming" value={filters.upcoming} onChange={(event) => setFilters((current) => ({ ...current, upcoming: event.target.value }))}>
            {meetingsFilterConfig.upcoming.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="meetings-filter-needs-acknowledgment">Needs Acknowledgment</label>
          <select id="meetings-filter-needs-acknowledgment" value={filters.needsAcknowledgment} onChange={(event) => setFilters((current) => ({ ...current, needsAcknowledgment: event.target.value }))}>
            {meetingsFilterConfig.needsAcknowledgment.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="meetings-filter-at-risk">At Risk</label>
          <select id="meetings-filter-at-risk" value={filters.atRisk} onChange={(event) => setFilters((current) => ({ ...current, atRisk: event.target.value }))}>
            {meetingsFilterConfig.atRisk.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="meetings-filter-my-meetings">My Meetings</label>
          <select id="meetings-filter-my-meetings" value={filters.myMeetings} onChange={(event) => setFilters((current) => ({ ...current, myMeetings: event.target.value }))}>
            {meetingsFilterConfig.myMeetings.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="meetings-filter-meeting-type">Meeting Type</label>
          <select id="meetings-filter-meeting-type" value={filters.meetingType} onChange={(event) => setFilters((current) => ({ ...current, meetingType: event.target.value }))}>
            {meetingsFilterConfig.meetingType.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-actions">
          <button type="button" onClick={() => setFilters({ upcoming: 'all', needsAcknowledgment: 'all', atRisk: 'all', myMeetings: 'all', meetingType: 'all' })}>Clear Filters</button>
        </div>
      </section>

      <section data-component="MeetingsDetailPanel">
        {selectedMeeting ? (
          <div>
            <MeetingDetailView meeting={selectedMeeting} onAction={handleMeetingAction} />
            <button type="button" onClick={() => setSelectedMeeting(null)}>Close Detail</button>
          </div>
        ) : (
          <div data-slot="detail-placeholder">Select a meeting to view detail.</div>
        )}
      </section>

      <ObjectList
        items={filteredMeetings}
        emptyState={<div data-component="MeetingsEmptyState">No meetings match the current filters.</div>}
        renderItem={(meeting) => (
          <div>
            <MeetingCard meeting={meeting} onAction={(actionType) => handleMeetingAction(actionType, meeting)} />
            <button type="button" onClick={() => setSelectedMeeting(meeting)}>Open Detail</button>
          </div>
        )}
      />
    </ScreenLayout>
  );
}
