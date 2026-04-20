import React from 'react';

import type { SeverityLevel } from '../../enums/severity-level';

type SummaryCardProps = {
  label: string;
  count: number;
  severity?: SeverityLevel;
  isActive?: boolean;
};

export function SummaryCard({
  label,
  count,
  severity,
  isActive = false,
}: SummaryCardProps) {
  return (
    <div
      data-component="SummaryCard"
      data-active={isActive ? 'true' : 'false'}
      data-severity={severity ?? 'none'}
    >
      <div data-slot="label">{label}</div>
      <div data-slot="count">{count}</div>
    </div>
  );
}

export type { SummaryCardProps };
