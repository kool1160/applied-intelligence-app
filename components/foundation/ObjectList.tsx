import React from 'react';
import type { ReactNode } from 'react';

type ObjectListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyState?: ReactNode;
};

export function ObjectList<T>({
  items,
  renderItem,
  emptyState,
}: ObjectListProps<T>) {
  if (items.length === 0) {
    return (
      <section data-component="ObjectList" data-empty="true">
        {emptyState ?? <div data-slot="empty-state">No items available.</div>}
      </section>
    );
  }

  return (
    <section data-component="ObjectList" data-empty="false">
      {items.map((item, index) => (
        <div key={index} data-slot="object-list-item">
          {renderItem(item, index)}
        </div>
      ))}
    </section>
  );
}

export type { ObjectListProps };
