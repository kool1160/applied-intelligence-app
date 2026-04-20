import React from 'react';

import { WorkItemCard } from '../components/cards/WorkItemCard';
import { ObjectList } from '../components/foundation/ObjectList';
import { ScreenLayout } from '../components/foundation/ScreenLayout';
import { SummaryBar } from '../components/foundation/SummaryBar';
import { TopBar } from '../components/foundation/TopBar';
import { myWorkMock } from '../mock-data/my-work.mock';
import type { SummaryItem } from '../models/helpers/summary-item';

function buildMyWorkSummary(): SummaryItem[] {
  const unreadCount = myWorkMock.filter(
    (item) => item.status === 'Unread' || item.ackState === 'pending'
  ).length;

  const highPriorityCount = myWorkMock.filter(
    (item) => item.severity === 'high' || item.severity === 'critical'
  ).length;

  const alertsCount = myWorkMock.filter(
    (item) => item.itemType === 'alert' || item.itemType === 'escalation'
  ).length;

  const handoffsCount = myWorkMock.filter(
    (item) => item.itemType === 'handoff'
  ).length;

  const meetingsCount = myWorkMock.filter(
    (item) => item.itemType === 'meeting'
  ).length;

  const waitingOnMeCount = myWorkMock.filter(
    (item) => item.ackRequired === true && item.ackState === 'pending'
  ).length;

  const agingOrStalledCount = myWorkMock.filter(
    (item) => item.status === 'Stalled'
  ).length;

  return [
    { key: 'unread', label: 'Unread', count: unreadCount },
    {
      key: 'highPriority',
      label: 'High Priority',
      count: highPriorityCount,
      severity: highPriorityCount > 0 ? 'high' : undefined,
    },
    { key: 'alerts', label: 'Alerts', count: alertsCount },
    { key: 'handoffs', label: 'Handoffs', count: handoffsCount },
    { key: 'meetings', label: 'Meetings', count: meetingsCount },
    {
      key: 'waitingOnMe',
      label: 'Waiting on Me',
      count: waitingOnMeCount,
      severity: waitingOnMeCount > 0 ? 'warning' : undefined,
    },
    {
      key: 'agingStalled',
      label: 'Aging / Stalled',
      count: agingOrStalledCount,
      severity: agingOrStalledCount > 0 ? 'high' : undefined,
    },
  ];
}

export function MyWorkScreen() {
  const summaryItems = buildMyWorkSummary();

  return (
    <ScreenLayout
      title={
        <TopBar
          title='My Work'
          subtitle='What needs my attention now'
        />
      }
      summary={<SummaryBar items={summaryItems} />}
    >
      <ObjectList
        items={myWorkMock}
        emptyState={
          <div data-component='MyWorkEmptyState'>
            No work items are currently assigned.
          </div>
        }
        renderItem={(item) => (
          <WorkItemCard
            key={item.itemId}
            item={item}
            onAction={(actionType) => {
              console.log('MyWork action', actionType, item.itemId);
            }}
          />
        )}
      />
    </ScreenLayout>
  );
}
