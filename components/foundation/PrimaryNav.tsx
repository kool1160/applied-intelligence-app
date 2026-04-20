import React from 'react';

import type { ScreenKey } from '../../enums/screen-key';

type PrimaryNavItem = {
  key: ScreenKey;
  label: string;
  disabled?: boolean;
};

type PrimaryNavProps = {
  items: PrimaryNavItem[];
  activeKey: ScreenKey;
  onSelect: (key: ScreenKey) => void;
};

export function PrimaryNav({ items, activeKey, onSelect }: PrimaryNavProps) {
  return (
    <nav aria-label="Primary Navigation" data-component="PrimaryNav">
      <ul data-slot="nav-list">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onSelect(item.key)}
                disabled={item.disabled}
                aria-current={isActive ? 'page' : undefined}
                data-active={isActive ? 'true' : 'false'}
                data-screen-key={item.key}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export type { PrimaryNavItem, PrimaryNavProps };
