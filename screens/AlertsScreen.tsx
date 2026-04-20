import React, { useMemo, useState } from 'react';

import { NotificationCard } from '../components/cards/NotificationCard';
import { NotificationDetailView } from '../components/detail/NotificationDetailView';
import { ObjectList } from '../components/foundation/ObjectList';
import { ScreenLayout } from '../components/foundation/ScreenLayout';
import { SummaryBar } from '../components/foundation/SummaryBar';
import { TopBar } from '../components/foundation/TopBar';
import { notificationsMock } from '../mock-data/notifications.mock';
import type { FilterOption } from '../models/helpers/filter-option';
import type { SummaryItem } from '../models/helpers/summary-item';
import type { NotificationModel } from '../models/notification-model';

function buildAlertsSummary(items: NotificationModel[]): SummaryItem[] {
  const unreadCount = items.filter((item) => item.readState === 'unread').length;
  const highPriorityCount = items.filter(
    (item) =>
      item.priority === 'high' ||
      item.priority === 'critical' ||
      item.priority === 'warning'
  ).length;
  const alertsCount = items.filter((item) => item.type === 'alert').length;
  const remindersCount = items.filter((item) => item.type === 'reminder').length;
  const escalationsCount = items.filter((item) => item.type === 'escalation').length;
  const meetingsCount = items.filter((item) => item.type === 'meeting').length;
  const handoffsCount = items.filter((item) => item.type === 'handoff').length;
  const broadcastsCount = items.filter((item) => item.type === 'broadcast').length;

  return [
    { key: 'unread', label: 'Unread', count: unreadCount },
    {
      key: 'highPriority',
      label: 'High Priority',
      count: highPriorityCount,
      severity: highPriorityCount > 0 ? 'high' : undefined,
    },
    { key: 'alerts', label: 'Alerts', count: alertsCount },
    { key: 'reminders', label: 'Reminders', count: remindersCount },
    {
      key: 'escalations',
      label: 'Escalations',
      count: escalationsCount,
      severity: escalationsCount > 0 ? 'critical' : undefined,
    },
    { key: 'meetings', label: 'Meetings', count: meetingsCount },
    { key: 'handoffs', label: 'Handoffs', count: handoffsCount },
    { key: 'broadcasts', label: 'Broadcasts', count: broadcastsCount },
  ];
}

type AlertsFilterState = {
  unread: string;
  priority: string;
  type: string;
};

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

const typeFilterOptions: FilterOption[] = [
  { key: 'all', label: 'All Types', value: 'all' },
  { key: 'notice', label: 'Notice', value: 'notice' },
  { key: 'alert', label: 'Alert', value: 'alert' },
  { key: 'reminder', label: 'Reminder', value: 'reminder' },
  { key: 'escalation', label: 'Escalation', value: 'escalation' },
  { key: 'meeting', label: 'Meeting', value: 'meeting' },
  { key: 'handoff', label: 'Handoff', value: 'handoff' },
  { key: 'broadcast', label: 'Broadcast', value: 'broadcast' },
];

export function AlertsScreen() {
  const [filters, setFilters] = useState<AlertsFilterState>({
    unread: 'all',
    priority: 'all',
    type: 'all',
  });

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationModel | null>(null);

  const alertsFilterConfig = useMemo(
    () => ({
      unread: unreadFilterOptions,
      priority: priorityFilterOptions,
      type: typeFilterOptions,
    }),
    []
  );

  const filteredNotifications = useMemo(() => {
    return notificationsMock.filter((notification) => {
      const unreadMatch =
        filters.unread === 'all' || notification.readState === filters.unread;
      const priorityMatch =
        filters.priority === 'all' || notification.priority === filters.priority;
      const typeMatch =
        filters.type === 'all' || notification.type === filters.type;
      return unreadMatch && priorityMatch && typeMatch;
    });
  }, [filters]);

  const summaryItems = useMemo(() => buildAlertsSummary(notificationsMock), []);

  const handleNotificationAction = (
    actionType: string,
    notification: NotificationModel
  ) => {
    switch (actionType) {
      case 'acknowledge':
        console.log('Acknowledge notification', notification.notificationId);
        break;
      case 'openLinkedObject':
      case 'openReport':
      case 'openMeeting':
      case 'openHandoff':
      case 'openBroadcast':
      case 'open':
        console.log('Open linked context', actionType, notification.notificationId);
        break;
      default:
        console.log(
          'Unhandled Alerts action',
          actionType,
          notification.notificationId
        );
        break;
    }
  };

  return (
    <ScreenLayout
      title={
        <TopBar
          title="Alerts / Notifications"
          subtitle="Action-linked inbox"
        />
      }
      summary={<SummaryBar items={summaryItems} />}
    >
      <section data-component="AlertsFilterControls">
        <div data-slot="filter-group">
          <label htmlFor="alerts-filter-unread">Unread</label>
          <select
            id="alerts-filter-unread"
            value={filters.unread}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                unread: event.target.value,
              }))
            }
          >
            {alertsFilterConfig.unread.map((option) => (
              <option key={option.key} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="alerts-filter-priority">Priority</label>
          <select
            id="alerts-filter-priority"
            value={filters.priority}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                priority: event.target.value,
              }))
            }
          >
            {alertsFilterConfig.priority.map((option) => (
              <option key={option.key} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div data-slot="filter-group">
          <label htmlFor="alerts-filter-type">Type</label>
          <select
            id="alerts-filter-type"
            value={filters.type}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                type: event.target.value,
              }))
            }
          >
            {alertsFilterConfig.type.map((option) => (
              <option key={option.key} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div data-slot="filter-actions">
          <button
            type="button"
            onClick={() =>
              setFilters({
                unread: 'all',
                priority: 'all',
                type: 'all',
              })
            }
          >
            Clear Filters
          </button>
        </div>
      </section>
      <section data-component="AlertsDetailPanel">
        {selectedNotification ? (
          <div>
            <NotificationDetailView notification={selectedNotification} />
            <div data-slot="detail-actions">
              <button
                type="button"
                onClick={() =>
                  handleNotificationAction('acknowledge', selectedNotification)
                }
              >
                Acknowledge
              </button>
              <button
                type="button"
                onClick={() =>
                  handleNotificationAction('openLinkedObject', selectedNotification)
                }
              >
                Open Linked Object
              </button>
              <button type="button" onClick={() => setSelectedNotification(null)}>
                Close Detail
              </button>
            </div>
          </div>
        ) : (
          <div data-slot="detail-placeholder">
            Select a notification to view detail.
          </div>
        )}
      </section>
      <ObjectList
        items={filteredNotifications}
        emptyState={
          <div data-component="AlertsEmptyState">
            No notifications match the current filters.
          </div>
        }
        renderItem={(notification) => (
          <div>
            <NotificationCard
              key={notification.notificationId}
              notification={notification}
              onAction={(actionType) =>
                handleNotificationAction(actionType, notification)
              }
            />
            <button type="button" onClick={() => setSelectedNotification(notification)}>
              Open Detail
            </button>
          </div>
        )}
      />
    </ScreenLayout>
  );
}
