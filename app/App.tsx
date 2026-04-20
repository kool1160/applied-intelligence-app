import React, { useState } from 'react';

import { AppShell } from '../components/foundation/AppShell';
import type { ScreenKey } from '../enums/screen-key';
import { MyWorkScreen } from '../screens/MyWorkScreen';

function renderMilestoneOneScreen(activeScreen: ScreenKey) {
  switch (activeScreen) {
    case 'myWork':
      return <MyWorkScreen />;

    case 'alerts':
    case 'handoffs':
    case 'threads':
    case 'meetings':
      return (
        <div data-component='Phase1PlaceholderScreen'>
          {activeScreen} is not implemented in Milestone 1.
        </div>
      );

    default:
      return <MyWorkScreen />;
  }
}

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('myWork');

  return (
    <AppShell
      activeScreen={activeScreen}
      onNavigate={setActiveScreen}
    >
      {renderMilestoneOneScreen(activeScreen)}
    </AppShell>
  );
}
