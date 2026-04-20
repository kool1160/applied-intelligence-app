import React from 'react';

import { ScreenLayout } from '../components/foundation/ScreenLayout';
import { TopBar } from '../components/foundation/TopBar';

export function MeetingsScreen() {
  return (
    <ScreenLayout
      title={
        <TopBar
          title="Meetings / Prep"
          subtitle="Placeholder until the Meetings lane is built"
        />
      }
    >
      <div data-component="MeetingsPlaceholder">
        Meetings / Prep is not implemented in this milestone.
      </div>
    </ScreenLayout>
  );
}
