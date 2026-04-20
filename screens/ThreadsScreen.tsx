import React from 'react';

import { ScreenLayout } from '../components/foundation/ScreenLayout';
import { TopBar } from '../components/foundation/TopBar';

export function ThreadsScreen() {
  return (
    <ScreenLayout
      title={
        <TopBar
          title="Threads / Communication"
          subtitle="Placeholder until the Threads lane is built"
        />
      }
    >
      <div data-component="ThreadsPlaceholder">
        Threads / Communication is not implemented in this milestone.
      </div>
    </ScreenLayout>
  );
}
