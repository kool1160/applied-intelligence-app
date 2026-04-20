import React from 'react';
import type { ReactNode } from 'react';

import type { ScreenKey } from '../../enums/screen-key';
import { PrimaryNav, type PrimaryNavItem } from './PrimaryNav';

type AppShellProps = {
  activeScreen: ScreenKey;
  onNavigate: (screen: ScreenKey) => void;
  children: ReactNode;
};

const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { key: 'myWork', label: 'My Work' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'handoffs', label: 'Handoffs' },
  { key: 'threads', label: 'Threads', disabled: true },
  { key: 'meetings', label: 'Meetings', disabled: true },
];

export function AppShell({ activeScreen, onNavigate, children }: AppShellProps) {
  return (
    <div data-component="AppShell" data-active-screen={activeScreen}>
      <header data-slot="shell-header">
        <PrimaryNav items={PRIMARY_NAV_ITEMS} activeKey={activeScreen} onSelect={onNavigate} />
      </header>
      <main data-slot="content">{children}</main>
    </div>
  );
}

export type { AppShellProps };
