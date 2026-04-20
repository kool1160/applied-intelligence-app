import React from 'react';

import type { SummaryItem } from '../../models/helpers/summary-item';
import { SummaryCard } from './SummaryCard';

type SummaryBarProps = {
  items: SummaryItem[];
};

export function SummaryBar({
  items,
}: SummaryBarProps) {
  return (
    <section data-component="SummaryBar">
      {items.map((item) => (
        <SummaryCard
          key={item.key}
          label={item.label}
          count={item.count}
          severity={item.severity}
          isActive={item.isActive}
        />
      ))}
    </section>
  );
}

export type { SummaryBarProps };
