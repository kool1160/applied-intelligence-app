import React, { useMemo, useState } from 'react';

import { ObjectList } from '../components/foundation/ObjectList';
import { ScreenLayout } from '../components/foundation/ScreenLayout';
import { SummaryBar } from '../components/foundation/SummaryBar';
import { TopBar } from '../components/foundation/TopBar';
import type { FilterOption } from '../models/helpers/filter-option';
import type { SummaryItem } from '../models/helpers/summary-item';

type ParticipantRef = {
  userId?: string;
  displayName: string;
  role?: string;
  department?: string;
};

type QuickAction = {
  type: string;
  label: string;
  enabled?: boolean;
};

type ThreadLaneModel = {
  threadId: string;
  title: string;
  threadType: string;
  linkedObjectRef?: string;
  linkedObjectType: string;
  participants: ParticipantRef[];
  departmentTags?: string[];
  unreadCount: number;
  lastUpdatedAt: string;
  visibilityState?: string;
  ownerLane?: string;
  threadStatus?: string;
  priority?: string;
  lastMessagePreview?: string;
  linkedHandoffRef?: string;
  visibilityHolders?: string[];
  ownerDisplayName?: string;
  ownerName?: string;
  starterDisplayName?: string;
  starterName?: string;
  quickActions?: QuickAction[];
};

type ThreadsFilterState = {
  status: string;
  unread: string;
  priority: string;
  owner: string;
  linkedObjectType: string;
};

const threadsMock: ThreadLaneModel[] = [
  {
    threadId: 'THR-00018',
    title: 'Part A-1001 recurring issue coordination',
    threadType: 'handoff',
    linkedObjectRef: 'HOF-00021',
    linkedObjectType: 'handoff',
    participants: [
      { userId: 'USR-004', displayName: 'Welding Supervisor', role: 'supervisor', department: 'Welding' },
      { userId: 'USR-006', displayName: 'Laser Supervisor', role: 'supervisor', department: 'Laser' },
      { userId: 'USR-009', displayName: 'Quality Lead', role: 'lead', department: 'Quality' },
    ],
    departmentTags: ['Welding', 'Laser', 'Quality'],
    unreadCount: 3,
    lastUpdatedAt: '2026-04-20 09:05 AM',
    visibilityState: 'standard',
    ownerLane: 'Welding Supervisor',
    ownerDisplayName: 'Welding Supervisor',
    threadStatus: 'open',
    priority: 'high',
    lastMessagePreview: 'Laser confirmed a cut condition issue may be contributing to repeat fit-up trouble.',
    linkedHandoffRef: 'HOF-00021',
    visibilityHolders: ['Welding Supervisor', 'Laser Supervisor', 'Quality Lead'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'openLinkedObject', label: 'Open Handoff' },
      { type: 'reply', label: 'Reply' },
    ],
  },
  {
    threadId: 'THR-00019',
    title: 'Delay review meeting prep thread',
    threadType: 'meeting',
    linkedObjectRef: 'MTG-00011',
    linkedObjectType: 'meeting',
    participants: [
      { userId: 'USR-004', displayName: 'Welding Supervisor', role: 'supervisor', department: 'Welding' },
      { userId: 'USR-008', displayName: 'Production Manager', role: 'manager', department: 'Production' },
    ],
    departmentTags: ['Welding', 'Production'],
    unreadCount: 1,
    lastUpdatedAt: '2026-04-20 09:18 AM',
    visibilityState: 'standard',
    ownerLane: 'Production Manager',
    ownerName: 'Production Manager',
    threadStatus: 'waiting',
    priority: 'warning',
    lastMessagePreview: 'Need acknowledgment from required attendees before the review starts.',
    visibilityHolders: ['Production Manager', 'Welding Supervisor'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'openLinkedObject', label: 'Open Meeting' },
    ],
  },
  {
    threadId: 'THR-00020',
    title: 'Fixture repair follow-up',
    threadType: 'reportLinked',
    linkedObjectRef: 'LIR-P-015',
    linkedObjectType: 'report',
    participants: [
      { userId: 'USR-002', displayName: 'Welding Lead', role: 'lead', department: 'Welding' },
      { userId: 'USR-004', displayName: 'Welding Supervisor', role: 'supervisor', department: 'Welding' },
    ],
    departmentTags: ['Welding'],
    unreadCount: 0,
    lastUpdatedAt: '2026-04-20 09:26 AM',
    visibilityState: 'standard',
    ownerLane: 'Welding Lead',
    starterDisplayName: 'Welding Lead',
    threadStatus: 'active',
    priority: 'medium',
    lastMessagePreview: 'Clamp replacement is complete. Waiting on verification from supervision.',
    visibilityHolders: ['Welding Lead', 'Welding Supervisor'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'openLinkedObject', label: 'Open Report' },
    ],
  },
  {
    threadId: 'THR-00021',
    title: 'Escalated routing control discussion',
    threadType: 'escalation',
    linkedObjectRef: 'ESC-00008',
    linkedObjectType: 'escalation',
    participants: [
      { userId: 'USR-008', displayName: 'Production Manager', role: 'manager', department: 'Production' },
      { userId: 'USR-011', displayName: 'Engineering Manager', role: 'manager', department: 'Engineering' },
      { userId: 'USR-004', displayName: 'Welding Supervisor', role: 'supervisor', department: 'Welding' },
    ],
    departmentTags: ['Production', 'Engineering', 'Welding'],
    unreadCount: 2,
    lastUpdatedAt: '2026-04-20 09:31 AM',
    visibilityState: 'leadershipVisible',
    ownerLane: 'Production Manager',
    ownerDisplayName: 'Production Manager',
    threadStatus: 'active',
    priority: 'critical',
    lastMessagePreview: 'Engineering asked for temporary containment while routing cleanup is reviewed.',
    linkedHandoffRef: 'HOF-00025',
    visibilityHolders: ['Production Manager', 'Engineering Manager', 'Welding Supervisor'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'openLinkedObject', label: 'Open Escalation' },
      { type: 'reply', label: 'Reply' },
    ],
  },
  {
    threadId: 'THR-00022',
    title: 'Assembly response pending on stalled handoff',
    threadType: 'handoff',
    linkedObjectRef: 'HOF-00026',
    linkedObjectType: 'handoff',
    participants: [
      { userId: 'USR-012', displayName: 'Assembly Lead', role: 'lead', department: 'Assembly' },
      { userId: 'USR-004', displayName: 'Welding Supervisor', role: 'supervisor', department: 'Welding' },
    ],
    departmentTags: ['Assembly', 'Welding'],
    unreadCount: 0,
    lastUpdatedAt: '2026-04-20 09:46 AM',
    visibilityState: 'restricted',
    ownerLane: 'Assembly Lead',
    ownerName: 'Assembly Lead',
    threadStatus: 'waiting',
    priority: 'high',
    lastMessagePreview: 'Still waiting on ownership confirmation before work can continue.',
    linkedHandoffRef: 'HOF-00026',
    visibilityHolders: ['Assembly Lead', 'Welding Supervisor'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'openLinkedObject', label: 'Open Handoff' },
    ],
  },
  {
    threadId: 'THR-00023',
    title: 'Routing cleanup execution thread',
    threadType: 'department',
    linkedObjectRef: 'LIR-P-017',
    linkedObjectType: 'report',
    participants: [
      { userId: 'USR-011', displayName: 'Engineering Manager', role: 'manager', department: 'Engineering' },
      { userId: 'USR-013', displayName: 'Routing Coordinator', role: 'standardUser', department: 'Engineering' },
    ],
    departmentTags: ['Engineering'],
    unreadCount: 4,
    lastUpdatedAt: '2026-04-20 10:18 AM',
    visibilityState: 'standard',
    ownerLane: 'Engineering Manager',
    ownerDisplayName: 'Engineering Manager',
    threadStatus: 'active',
    priority: 'medium',
    lastMessagePreview: 'Updated routing draft is ready for review before release to the floor.',
    linkedHandoffRef: 'HOF-00028',
    visibilityHolders: ['Engineering Manager', 'Routing Coordinator'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'reply', label: 'Reply' },
    ],
  },
  {
    threadId: 'THR-00024',
    title: 'Closed issue archive thread',
    threadType: 'reportLinked',
    linkedObjectRef: 'LIR-P-012',
    linkedObjectType: 'report',
    participants: [
      { userId: 'USR-002', displayName: 'Welding Lead', role: 'lead', department: 'Welding' },
      { userId: 'USR-004', displayName: 'Welding Supervisor', role: 'supervisor', department: 'Welding' },
    ],
    departmentTags: ['Welding'],
    unreadCount: 0,
    lastUpdatedAt: '2026-04-20 10:34 AM',
    visibilityState: 'standard',
    ownerLane: 'Welding Supervisor',
    ownerDisplayName: 'Welding Supervisor',
    threadStatus: 'resolved',
    priority: 'low',
    lastMessagePreview: 'Issue verified complete and thread can remain as historical reference.',
    visibilityHolders: ['Welding Lead', 'Welding Supervisor'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'viewHistory', label: 'View History' },
    ],
  },
  {
    threadId: 'THR-00025',
    title: 'Broadcast-linked shift coordination',
    threadType: 'broadcastLinked',
    linkedObjectRef: 'BRC-00003',
    linkedObjectType: 'broadcast',
    participants: [
      { userId: 'USR-008', displayName: 'Production Manager', role: 'manager', department: 'Production' },
      { userId: 'USR-004', displayName: 'Welding Supervisor', role: 'supervisor', department: 'Welding' },
      { userId: 'USR-006', displayName: 'Laser Supervisor', role: 'supervisor', department: 'Laser' },
    ],
    departmentTags: ['Production', 'Welding', 'Laser'],
    unreadCount: 5,
    lastUpdatedAt: '2026-04-20 10:47 AM',
    visibilityState: 'leadershipVisible',
    ownerLane: 'Production Manager',
    starterName: 'Production Manager',
    threadStatus: 'open',
    priority: 'warning',
    lastMessagePreview: 'Operations wants all department leads aligned on today’s sequence and timing.',
    visibilityHolders: ['Production Manager', 'Welding Supervisor', 'Laser Supervisor'],
    quickActions: [
      { type: 'openThread', label: 'Open Thread' },
      { type: 'openLinkedObject', label: 'Open Broadcast' },
      { type: 'reply', label: 'Reply' },
    ],
  },
];

const statusFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Statuses', value: 'all' },
  { key: 'open', label: 'Open', value: 'open' },
  { key: 'active', label: 'Active', value: 'active' },
  { key: 'waiting', label: 'Waiting', value: 'waiting' },
  { key: 'resolved', label: 'Resolved', value: 'resolved' },
  { key: 'closed', label: 'Closed', value: 'closed' },
];
const unreadFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All', value: 'all' },
  { key: 'unread', label: 'Unread', value: 'unread' },
  { key: 'read', label: 'Read', value: 'read' },
];
const priorityFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Priorities', value: 'all' },
  { key: 'low', label: 'Low', value: 'low' },
  { key: 'medium', label: 'Medium', value: 'medium' },
  { key: 'high', label: 'High', value: 'high' },
  { key: 'critical', label: 'Critical', value: 'critical' },
  { key: 'warning', label: 'Warning', value: 'warning' },
];
const ownerFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Owners', value: 'all' },
  { key: 'weldingSupervisor', label: 'Welding Supervisor', value: 'Welding Supervisor' },
  { key: 'productionManager', label: 'Production Manager', value: 'Production Manager' },
  { key: 'engineeringManager', label: 'Engineering Manager', value: 'Engineering Manager' },
  { key: 'assemblyLead', label: 'Assembly Lead', value: 'Assembly Lead' },
  { key: 'weldingLead', label: 'Welding Lead', value: 'Welding Lead' },
];
const linkedObjectTypeFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Linked Objects', value: 'all' },
  { key: 'report', label: 'Report', value: 'report' },
  { key: 'handoff', label: 'Handoff', value: 'handoff' },
  { key: 'meeting', label: 'Meeting', value: 'meeting' },
  { key: 'part', label: 'Part', value: 'part' },
  { key: 'broadcast', label: 'Broadcast', value: 'broadcast' },
  { key: 'escalation', label: 'Escalation', value: 'escalation' },
];

function getOwnerValue(thread: ThreadLaneModel): string {
  return thread.ownerDisplayName || thread.ownerName || thread.starterDisplayName || thread.starterName || thread.ownerLane || 'Unassigned';
}

function buildThreadsSummary(items: ThreadLaneModel[]): SummaryItem[] {
  const openCount = items.filter((thread) => thread.threadStatus === 'open' || thread.threadStatus === 'active').length;
  const unreadCount = items.filter((thread) => thread.unreadCount > 0).length;
  const waitingCount = items.filter((thread) => thread.threadStatus === 'waiting').length;
  const highPriorityCount = items.filter((thread) => thread.priority === 'high' || thread.priority === 'critical' || thread.priority === 'warning').length;
  const escalatedVisibilityCount = items.filter((thread) => thread.visibilityState === 'leadershipVisible').length;
  const resolvedCount = items.filter((thread) => thread.threadStatus === 'resolved' || thread.threadStatus === 'closed').length;

  return [
    { key: 'open', label: 'Open', count: openCount },
    { key: 'unread', label: 'Unread', count: unreadCount },
    { key: 'waiting', label: 'Waiting', count: waitingCount },
    { key: 'highPriority', label: 'High Priority', count: highPriorityCount, severity: highPriorityCount > 0 ? 'high' : undefined },
    { key: 'escalatedVisibility', label: 'Escalated Visibility', count: escalatedVisibilityCount, severity: escalatedVisibilityCount > 0 ? 'critical' : undefined },
    { key: 'resolved', label: 'Resolved', count: resolvedCount },
  ];
}

function ThreadCard({ thread, onAction }: { thread: ThreadLaneModel; onAction?: (actionType: string, thread: ThreadLaneModel) => void }) {
  const linkedRef = thread.linkedObjectRef || '—';
  const unreadLabel = thread.unreadCount > 0 ? `Unread (${thread.unreadCount})` : 'Read';
  const departments = thread.departmentTags && thread.departmentTags.length > 0 ? thread.departmentTags.join(', ') : '—';
  const participants = thread.participants && thread.participants.length > 0 ? thread.participants.map((participant) => participant.displayName).join(', ') : '—';
  const threadStatus = thread.threadStatus || 'Open';
  const priority = thread.priority || 'Normal';
  const lastMessagePreview = thread.lastMessagePreview || '—';
  const linkedHandoffRef = thread.linkedHandoffRef || '—';
  const visibilityHolders = thread.visibilityHolders && thread.visibilityHolders.length > 0 ? thread.visibilityHolders.join(', ') : '—';
  const actions = thread.quickActions ?? [];

  return (
    <article data-component="ThreadCard" data-thread-id={thread.threadId} data-thread-type={thread.threadType}>
      <div data-slot="header">
        <div data-slot="title">{thread.title}</div>
        <div data-slot="unread-state">{unreadLabel}</div>
      </div>
      <div data-slot="body">
        <div data-slot="row"><span data-slot="label">Thread Type</span><span data-slot="value">{thread.threadType}</span></div>
        <div data-slot="row"><span data-slot="label">Linked Object</span><span data-slot="value">{thread.linkedObjectType}: {linkedRef}</span></div>
        <div data-slot="row"><span data-slot="label">Linked Handoff</span><span data-slot="value">{linkedHandoffRef}</span></div>
        <div data-slot="row"><span data-slot="label">Participants</span><span data-slot="value">{participants}</span></div>
        <div data-slot="row"><span data-slot="label">Departments</span><span data-slot="value">{departments}</span></div>
        <div data-slot="row"><span data-slot="label">Owner / Starter</span><span data-slot="value">{getOwnerValue(thread)}</span></div>
        <div data-slot="row"><span data-slot="label">Status</span><span data-slot="value">{threadStatus}</span></div>
        <div data-slot="row"><span data-slot="label">Priority</span><span data-slot="value">{priority}</span></div>
        <div data-slot="row"><span data-slot="label">Last Message</span><span data-slot="value">{lastMessagePreview}</span></div>
        <div data-slot="row"><span data-slot="label">Visibility</span><span data-slot="value">{visibilityHolders}</span></div>
        <div data-slot="row"><span data-slot="label">Last Updated</span><span data-slot="value">{thread.lastUpdatedAt}</span></div>
      </div>
      <div data-slot="actions">
        <button type="button" onClick={() => onAction?.('openThread', thread)}>Open Thread</button>
        <button type="button" onClick={() => onAction?.('markRead', thread)}>Mark Read</button>
        <button type="button" onClick={() => onAction?.('markUnread', thread)}>Mark Unread</button>
        <button type="button" onClick={() => onAction?.('openLinkedObject', thread)}>Open Linked Object</button>
        <button type="button" onClick={() => onAction?.('openHandoff', thread)}>Open Handoff</button>
        {actions.map((action) => (
          <button key={action.type} type="button" disabled={action.enabled === false} onClick={() => onAction?.(action.type, thread)}>
            {action.label}
          </button>
        ))}
      </div>
    </article>
  );
}

function ThreadDetailView({ thread, onAction }: { thread: ThreadLaneModel; onAction?: (actionType: string, thread: ThreadLaneModel) => void }) {
  const participants = thread.participants && thread.participants.length > 0 ? thread.participants.map((participant) => participant.displayName).join(', ') : '—';
  return (
    <section data-component="ThreadDetailView" data-thread-id={thread.threadId} data-thread-type={thread.threadType}>
      <div data-slot="title">{thread.title}</div>
      <div data-slot="linked-object">{thread.linkedObjectType}: {thread.linkedObjectRef}</div>
      <div data-slot="owner-starter">{getOwnerValue(thread)}</div>
      <div data-slot="participants">{participants}</div>
      <div data-slot="status">{thread.threadStatus || 'Open'}</div>
      <div data-slot="priority">{thread.priority || 'Normal'}</div>
      <div data-slot="unread-count">{thread.unreadCount > 0 ? `Unread (${thread.unreadCount})` : 'Read'}</div>
      <div data-slot="last-message-preview">{thread.lastMessagePreview || '—'}</div>
      {thread.linkedHandoffRef ? <div data-slot="linked-handoff-ref">{thread.linkedHandoffRef}</div> : null}
      <div data-slot="last-updated">{thread.lastUpdatedAt}</div>
      <div data-slot="actions">
        <button type="button" onClick={() => onAction?.('openThread', thread)}>Open Thread</button>
        <button type="button" onClick={() => onAction?.('markRead', thread)}>Mark Read</button>
        <button type="button" onClick={() => onAction?.('markUnread', thread)}>Mark Unread</button>
        <button type="button" onClick={() => onAction?.('openLinkedObject', thread)}>Open Linked Object</button>
        <button type="button" onClick={() => onAction?.('openHandoff', thread)}>Open Handoff</button>
      </div>
    </section>
  );
}

export function ThreadsScreen() {
  const [filters, setFilters] = useState<ThreadsFilterState>({
    status: 'all',
    unread: 'all',
    priority: 'all',
    owner: 'all',
    linkedObjectType: 'all',
  });
  const [selectedThread, setSelectedThread] = useState<ThreadLaneModel | null>(null);

  const summaryItems = useMemo(() => buildThreadsSummary(threadsMock), []);
  const threadsFilterConfig = useMemo(
    () => ({
      status: statusFilterOptions,
      unread: unreadFilterOptions,
      priority: priorityFilterOptions,
      owner: ownerFilterOptions,
      linkedObjectType: linkedObjectTypeFilterOptions,
    }),
    []
  );

  const filteredThreads = useMemo(() => {
    return threadsMock.filter((thread) => {
      const statusMatch = filters.status === 'all' || thread.threadStatus === filters.status;
      const unreadMatch = filters.unread === 'all' || (filters.unread === 'unread' && thread.unreadCount > 0) || (filters.unread === 'read' && thread.unreadCount === 0);
      const priorityMatch = filters.priority === 'all' || thread.priority === filters.priority;
      const ownerMatch = filters.owner === 'all' || getOwnerValue(thread) === filters.owner;
      const linkedObjectTypeMatch = filters.linkedObjectType === 'all' || thread.linkedObjectType === filters.linkedObjectType;
      return statusMatch && unreadMatch && priorityMatch && ownerMatch && linkedObjectTypeMatch;
    });
  }, [filters]);

  const handleThreadAction = (actionType: string, thread: ThreadLaneModel) => {
    switch (actionType) {
      case 'openThread':
        console.log('Open thread', thread.threadId);
        setSelectedThread(thread);
        break;
      case 'markRead':
        console.log('Mark thread read', thread.threadId);
        break;
      case 'markUnread':
        console.log('Mark thread unread', thread.threadId);
        break;
      case 'openLinkedObject':
        console.log('Open linked object', thread.threadId);
        break;
      case 'openHandoff':
        console.log('Open linked handoff', thread.threadId);
        break;
      default:
        console.log('Unhandled Threads action', actionType, thread.threadId);
        break;
    }
  };

  return (
    <ScreenLayout title={<TopBar title="Threads" subtitle="Work-linked communication" />} summary={<SummaryBar items={summaryItems} />}>
      <section data-component="ThreadsFilterControls">
        <div data-slot="filter-group">
          <label htmlFor="threads-filter-status">Status</label>
          <select id="threads-filter-status" value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            {threadsFilterConfig.status.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="threads-filter-unread">Unread</label>
          <select id="threads-filter-unread" value={filters.unread} onChange={(event) => setFilters((current) => ({ ...current, unread: event.target.value }))}>
            {threadsFilterConfig.unread.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="threads-filter-priority">Priority</label>
          <select id="threads-filter-priority" value={filters.priority} onChange={(event) => setFilters((current) => ({ ...current, priority: event.target.value }))}>
            {threadsFilterConfig.priority.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="threads-filter-owner">Owner</label>
          <select id="threads-filter-owner" value={filters.owner} onChange={(event) => setFilters((current) => ({ ...current, owner: event.target.value }))}>
            {threadsFilterConfig.owner.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="threads-filter-linked-object-type">Linked Object Type</label>
          <select id="threads-filter-linked-object-type" value={filters.linkedObjectType} onChange={(event) => setFilters((current) => ({ ...current, linkedObjectType: event.target.value }))}>
            {threadsFilterConfig.linkedObjectType.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-actions">
          <button type="button" onClick={() => setFilters({ status: 'all', unread: 'all', priority: 'all', owner: 'all', linkedObjectType: 'all' })}>Clear Filters</button>
        </div>
      </section>

      <section data-component="ThreadsDetailPanel">
        {selectedThread ? (
          <div>
            <ThreadDetailView thread={selectedThread} onAction={handleThreadAction} />
            <button type="button" onClick={() => setSelectedThread(null)}>Close Detail</button>
          </div>
        ) : (
          <div data-slot="detail-placeholder">Select a thread to view detail.</div>
        )}
      </section>

      <ObjectList
        items={filteredThreads}
        emptyState={<div data-component="ThreadsEmptyState">No threads match the current filters.</div>}
        renderItem={(thread) => (
          <div>
            <ThreadCard thread={thread} onAction={(actionType) => handleThreadAction(actionType, thread)} />
            <button type="button" onClick={() => setSelectedThread(thread)}>Open Detail</button>
          </div>
        )}
      />
    </ScreenLayout>
  );
}
