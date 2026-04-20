import React, { useState } from 'react';

import { AppShell } from '../components/foundation/AppShell';
import type { ScreenKey } from '../enums/screen-key';
import { AlertsScreen } from '../screens/AlertsScreen';
import { HandoffsScreen } from '../screens/HandoffsScreen';
import { MeetingsScreen } from '../screens/MeetingsScreen';
import { MyWorkScreen } from '../screens/MyWorkScreen';
import { ThreadsScreen } from '../screens/ThreadsScreen';

function renderPhaseOneScreen(activeScreen: ScreenKey) {
  switch (activeScreen) {
    case 'myWork':
      return <MyWorkScreen />;
    case 'alerts':
      return <AlertsScreen />;
    case 'handoffs':
      return <HandoffsScreen />;
    case 'threads':
      return <ThreadsScreen />;
    case 'meetings':
      return <MeetingsScreen />;
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
