import React, { useState } from 'react';

import { AppShell } from '../components/foundation/AppShell';
import type { ScreenKey } from '../enums/screen-key';
import { AlertsScreen } from '../screens/AlertsScreen';
import { HandoffsScreen } from '../screens/HandoffsScreen';
import { MyWorkScreen } from '../screens/MyWorkScreen';

function renderPhaseOneScreen(activeScreen: ScreenKey) {
  switch (activeScreen) {
    case 'myWork':
      return <MyWorkScreen />;
    case 'alerts':
      return <AlertsScreen />;
    case 'handoffs':
      return <HandoffsScreen />;
    case 'threads':
    case 'meetings':
      return (
        <div data-component="Phase1PlaceholderScreen">
          {activeScreen} is not implemented in this milestone.
        </div>
      );
    default:
      return <MyWorkScreen />;
  }
}

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('myWork');

  return (
    <AppShell activeScreen={activeScreen} onNavigate={setActiveScreen}>
      {renderPhaseOneScreen(activeScreen)}
    </AppShell>
  );
}
