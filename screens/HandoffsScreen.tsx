import React, { useMemo, useState } from 'react';

import { HandoffCard } from '../components/cards/HandoffCard';
import { HandoffDetailView } from '../components/detail/HandoffDetailView';
import { ObjectList } from '../components/foundation/ObjectList';
import { ScreenLayout } from '../components/foundation/ScreenLayout';
import { SummaryBar } from '../components/foundation/SummaryBar';
import { TopBar } from '../components/foundation/TopBar';
import { handoffsMock } from '../mock-data/handoffs.mock';
import type { FilterOption } from '../models/helpers/filter-option';
import type { SummaryItem } from '../models/helpers/summary-item';
import type { HandoffModel } from '../models/handoff-model';

function buildHandoffsSummary(items: HandoffModel[]): SummaryItem[] {
  const openCount = items.filter((item) => item.status === 'open').length;
  const acknowledgedCount = items.filter((item) => item.status === 'acknowledged').length;
  const inProgressCount = items.filter((item) => item.status === 'inProgress').length;
  const escalatedCount = items.filter((item) => item.status === 'escalated').length;
  const agingStalledCount = items.filter(
    (item) => item.agingStage === 'stalled' || item.agingStage === 'escalationRisk'
  ).length;
  const waitingOnOwnerCount = items.filter(
    (item) => item.ackRequired === true && item.ackState === 'pending'
  ).length;

  return [
    { key: 'open', label: 'Open', count: openCount },
    { key: 'acknowledged', label: 'Acknowledged', count: acknowledgedCount },
    { key: 'inProgress', label: 'In Progress', count: inProgressCount },
    {
      key: 'escalated',
      label: 'Escalated',
      count: escalatedCount,
      severity: escalatedCount > 0 ? 'critical' : undefined,
    },
    {
      key: 'agingStalled',
      label: 'Aging / Stalled',
      count: agingStalledCount,
      severity: agingStalledCount > 0 ? 'high' : undefined,
    },
    {
      key: 'waitingOnOwner',
      label: 'Waiting on Owner',
      count: waitingOnOwnerCount,
      severity: waitingOnOwnerCount > 0 ? 'warning' : undefined,
    },
  ];
}

type HandoffsFilterState = {
  status: string;
  aging: string;
  owner: string;
  source: string;
  destination: string;
};

const statusFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Statuses', value: 'all' },
  { key: 'open', label: 'Open', value: 'open' },
  { key: 'acknowledged', label: 'Acknowledged', value: 'acknowledged' },
  { key: 'inProgress', label: 'In Progress', value: 'inProgress' },
  { key: 'completed', label: 'Completed', value: 'completed' },
  { key: 'escalated', label: 'Escalated', value: 'escalated' },
];

const agingFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Aging', value: 'all' },
  { key: 'freshOpen', label: 'Fresh Open', value: 'freshOpen' },
  { key: 'pendingAcknowledgment', label: 'Pending Acknowledgment', value: 'pendingAcknowledgment' },
  { key: 'stalled', label: 'Stalled', value: 'stalled' },
  { key: 'escalationRisk', label: 'Escalation Risk', value: 'escalationRisk' },
];

function uniqueOptions(values: string[], prefix: string): FilterOption[] {
  const unique = Array.from(new Set(values)).sort();
  return [{ key: 'all', label: `All ${prefix}`, value: 'all' }].concat(
    unique.map((value) => ({
      key: value,
      label: value,
      value,
    }))
  );
}

export function HandoffsScreen() {
  const [filters, setFilters] = useState<HandoffsFilterState>({
    status: 'all',
    aging: 'all',
    owner: 'all',
    source: 'all',
    destination: 'all',
  });

  const [selectedHandoff, setSelectedHandoff] = useState<HandoffModel | null>(null);

  const ownerFilterOptions = useMemo(
    () => uniqueOptions(handoffsMock.map((item) => item.ownerDisplay), 'Owners'),
    []
  );
  const sourceFilterOptions = useMemo(
    () => uniqueOptions(handoffsMock.map((item) => item.sourceRef), 'Sources'),
    []
  );
  const destinationFilterOptions = useMemo(
    () => uniqueOptions(handoffsMock.map((item) => item.destinationRef), 'Destinations'),
    []
  );

  const filteredHandoffs = useMemo(() => {
    return handoffsMock.filter((handoff) => {
      const statusMatch = filters.status === 'all' || handoff.status === filters.status;
      const agingMatch = filters.aging === 'all' || handoff.agingStage === filters.aging;
      const ownerMatch = filters.owner === 'all' || handoff.ownerDisplay === filters.owner;
      const sourceMatch = filters.source === 'all' || handoff.sourceRef === filters.source;
      const destinationMatch = filters.destination === 'all' || handoff.destinationRef === filters.destination;
      return statusMatch && agingMatch && ownerMatch && sourceMatch && destinationMatch;
    });
  }, [filters]);

  const summaryItems = useMemo(() => buildHandoffsSummary(handoffsMock), []);

  const handleHandoffAction = (actionType: string, handoff: HandoffModel) => {
    switch (actionType) {
      case 'acknowledge':
        console.log('Acknowledge handoff', handoff.handoffId);
        break;
      case 'confirmOwnership':
        console.log('Confirm ownership', handoff.handoffId);
        break;
      case 'openHandoff':
      case 'openThread':
      case 'openLinkedObject':
      case 'escalate':
      case 'viewHistory':
        console.log('Open handoff context', actionType, handoff.handoffId);
        break;
      default:
        console.log('Unhandled Handoffs action', actionType, handoff.handoffId);
        break;
    }
  };

  return (
    <ScreenLayout
      title={<TopBar title="Handoffs" subtitle="Ownership and transfer control" />}
      summary={<SummaryBar items={summaryItems} />}
    >
      <section data-component="HandoffsFilterControls">
        <div data-slot="filter-group">
          <label htmlFor="handoffs-filter-status">Status</label>
          <select id="handoffs-filter-status" value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            {statusFilterOptions.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="handoffs-filter-aging">Aging / Stalled</label>
          <select id="handoffs-filter-aging" value={filters.aging} onChange={(event) => setFilters((current) => ({ ...current, aging: event.target.value }))}>
            {agingFilterOptions.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="handoffs-filter-owner">Owner</label>
          <select id="handoffs-filter-owner" value={filters.owner} onChange={(event) => setFilters((current) => ({ ...current, owner: event.target.value }))}>
            {ownerFilterOptions.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="handoffs-filter-source">Source</label>
          <select id="handoffs-filter-source" value={filters.source} onChange={(event) => setFilters((current) => ({ ...current, source: event.target.value }))}>
            {sourceFilterOptions.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="handoffs-filter-destination">Destination</label>
          <select id="handoffs-filter-destination" value={filters.destination} onChange={(event) => setFilters((current) => ({ ...current, destination: event.target.value }))}>
            {destinationFilterOptions.map((option) => <option key={option.key} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div data-slot="filter-actions">
          <button type="button" onClick={() => setFilters({ status: 'all', aging: 'all', owner: 'all', source: 'all', destination: 'all' })}>Clear Filters</button>
        </div>
      </section>
      <section data-component="HandoffsDetailPanel">
        {selectedHandoff ? (
          <div>
            <HandoffDetailView handoff={selectedHandoff} />
            <div data-slot="detail-actions">
              <button type="button" onClick={() => handleHandoffAction('acknowledge', selectedHandoff)}>Acknowledge</button>
              <button type="button" onClick={() => handleHandoffAction('confirmOwnership', selectedHandoff)}>Confirm Ownership</button>
              <button type="button" onClick={() => handleHandoffAction('openThread', selectedHandoff)}>Open Linked Thread</button>
              <button type="button" onClick={() => setSelectedHandoff(null)}>Close Detail</button>
            </div>
          </div>
        ) : (
          <div data-slot="detail-placeholder">Select a handoff to view detail.</div>
        )}
      </section>
      <ObjectList
        items={filteredHandoffs}
        emptyState={<div data-component="HandoffsEmptyState">No handoffs match the current filters.</div>}
        renderItem={(handoff) => (
          <div>
            <HandoffCard key={handoff.handoffId} handoff={handoff} onAction={(actionType) => handleHandoffAction(actionType, handoff)} />
            <button type="button" onClick={() => setSelectedHandoff(handoff)}>Open Detail</button>
          </div>
        )}
      />
    </ScreenLayout>
  );
}
