import React from 'react';

import type { NotificationModel } from '../../models/notification-model';

type NotificationCardProps = {
  notification: NotificationModel;
  onAction?: (actionType: string, notification: NotificationModel) => void;
};

export function NotificationCard({
  notification,
  onAction,
}: NotificationCardProps) {
  return (
    <article
      data-component="NotificationCard"
      data-notification-id={notification.notificationId}
      data-notification-type={notification.type}
    >
      <div data-slot="title">{notification.title}</div>
      <div data-slot="notification-type">{notification.type}</div>
      <div data-slot="linked-object">
        {notification.linkedObjectType}: {notification.linkedObjectRef}
      </div>
      <div data-slot="priority">{notification.priority}</div>
      <div data-slot="read-state">{notification.readState}</div>

      {notification.ackRequired !== undefined ? (
        <div data-slot="ack-required">
          Ack Required: {notification.ackRequired ? 'Yes' : 'No'}
        </div>
      ) : null}

      {notification.ackState ? (
        <div data-slot="ack-state">{notification.ackState}</div>
      ) : null}

      {notification.deliveryContext ? (
        <div data-slot="delivery-context">{notification.deliveryContext}</div>
      ) : null}

      <div data-slot="timestamp">{notification.timestamp}</div>

      {notification.quickActions && notification.quickActions.length > 0 ? (
        <div data-slot="quick-actions">
          {notification.quickActions.map((action) => (
            <button
              key={action.type}
              type="button"
              disabled={action.enabled === false}
              onClick={() => onAction?.(action.type, notification)}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export type { NotificationCardProps };
