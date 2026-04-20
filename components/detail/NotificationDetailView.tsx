import React from 'react';

import type { NotificationModel } from '../../models/notification-model';

type NotificationDetailViewProps = {
  notification: NotificationModel;
};

export function NotificationDetailView({
  notification,
}: NotificationDetailViewProps) {
  return (
    <section
      data-component="NotificationDetailView"
      data-notification-id={notification.notificationId}
      data-notification-type={notification.type}
    >
      <div data-slot="title">{notification.title}</div>
      <div data-slot="type">{notification.type}</div>
      <div data-slot="linked-object">
        {notification.linkedObjectType}: {notification.linkedObjectRef}
      </div>
      <div data-slot="priority">{notification.priority}</div>
      <div data-slot="read-state">{notification.readState}</div>

      {notification.ackState ? (
        <div data-slot="ack-state">{notification.ackState}</div>
      ) : null}

      <div data-slot="timestamp">{notification.timestamp}</div>

      {notification.deliveryContext ? (
        <div data-slot="delivery-context">{notification.deliveryContext}</div>
      ) : null}
    </section>
  );
}

export type { NotificationDetailViewProps };
