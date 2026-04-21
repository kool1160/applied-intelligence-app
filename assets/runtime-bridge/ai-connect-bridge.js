const lanes = {
  myWork: {
    kicker: 'AI-Connect · My Work',
    title: 'What needs my attention now',
    copy: 'My Work is the ownership-first operating view. It shows the next actions that are waiting on the user, not a generic activity feed.',
    metrics: [
      { label: 'Unread', value: '5' },
      { label: 'High Priority', value: '3' },
      { label: 'Waiting on Me', value: '4' },
      { label: 'Aging / Stalled', value: '1' },
    ],
    cards: [
      {
        title: 'Fixture readiness issue needs review',
        meta: ['Alert', 'High Priority'],
        tags: ['LIR-P-014', 'Report'],
        copy: 'A work-linked alert is waiting on acknowledgment before the issue can move cleanly into the next action owner.',
        actions: ['Acknowledge', 'Open Report'],
      },
      {
        title: 'Part A-1001 recurring issue handoff',
        meta: ['Handoff', 'Open'],
        tags: ['HOF-00021', 'Ownership'],
        copy: 'This item is tied to a real handoff and should stay connected to the work object instead of floating as a generic message.',
        actions: ['Acknowledge', 'Open Handoff'],
      },
      {
        title: 'Delay review meeting needs acknowledgment',
        meta: ['Meeting', 'Warning'],
        tags: ['MTG-00011', 'Required'],
        copy: 'Meeting prep and acknowledgment belong in the same operational layer so the right people arrive prepared.',
        actions: ['Acknowledge', 'Open Meeting'],
      },
    ],
  },
  alerts: {
    kicker: 'AI-Connect · Alerts',
    title: 'Action-linked inbox, not generic notifications',
    copy: 'Alerts stay tied to reports, handoffs, meetings, and escalation context so the system does not become noisy or disconnected from real work.',
    metrics: [
      { label: 'Unread', value: '5' },
      { label: 'High Priority', value: '4' },
      { label: 'Escalations', value: '1' },
      { label: 'Broadcasts', value: '1' },
    ],
    cards: [
      {
        title: 'Recurring issue has been escalated for visibility',
        meta: ['Escalation', 'Critical'],
        tags: ['ESC-00007', 'Cross-Department'],
        copy: 'Escalation visibility should remain connected to the linked operational context instead of turning into a separate chat trail.',
        actions: ['Acknowledge', 'Open Context'],
      },
      {
        title: 'Shift summary has been posted',
        meta: ['Notice', 'Read'],
        tags: ['SUM-00011', 'Report'],
        copy: 'Lower-friction notices still live in the same system, but they are visually quieter than true alerts or escalations.',
        actions: ['Open Report'],
      },
      {
        title: 'Operations broadcast issued for today’s coordination plan',
        meta: ['Broadcast', 'Unread'],
        tags: ['BRC-00003', 'Operations'],
        copy: 'Broadcasts should be structured and work-linked so communication scales without becoming noise.',
        actions: ['Open Broadcast'],
      },
    ],
  },
  handoffs: {
    kicker: 'AI-Connect · Handoffs',
    title: 'Ownership and transfer control',
    copy: 'Handoffs are where ownership becomes visible. They should be easy to scan, traceable, and clearly tied to what is moving and who owns it next.',
    metrics: [
      { label: 'Open', value: '4' },
      { label: 'Acknowledged', value: '2' },
      { label: 'Escalated', value: '1' },
      { label: 'Waiting on Owner', value: '3' },
    ],
    cards: [
      {
        title: 'Escalated recurring issue handoff',
        meta: ['Escalated', 'Pending'],
        tags: ['HOF-00025', 'THR-00021'],
        copy: 'Escalated handoffs must keep linked context attached so leadership sees the issue, ownership, and active thread in one place.',
        actions: ['Acknowledge', 'Open Linked Thread'],
      },
      {
        title: 'Stalled ownership assignment',
        meta: ['Open', 'Stalled'],
        tags: ['HOF-00026', 'Meeting'],
        copy: 'A stalled handoff should stand out immediately because transfer failure is often where real flow problems start to compound.',
        actions: ['Confirm Ownership', 'Open Handoff'],
      },
      {
        title: 'Quality verification handoff',
        meta: ['Acknowledged', 'Fresh Open'],
        tags: ['HOF-00028', 'Quality'],
        copy: 'Acknowledged handoffs remain visible, but calmer, so users can still trace the transfer path without losing the open work focus.',
        actions: ['Open Handoff', 'View History'],
      },
    ],
  },
  threads: {
    kicker: 'AI-Connect · Threads',
    title: 'Threads / Communication',
    copy: 'Threads stay tied to real work objects, departments, and owners. This lane is the next approved build step after the current bridge.',
    placeholder: 'Threads will become the communication lane where discussion stays attached to the actual work instead of breaking away into a generic chat app.',
  },
  meetings: {
    kicker: 'AI-Connect · Meetings',
    title: 'Meetings / Prep',
    copy: 'Meetings should prepare the right people with the right information before action is needed. This lane is the next step after Threads.',
    placeholder: 'Meetings / Prep will become the preparation lane where required attendees, unread prep, agenda items, and linked work objects stay connected.',
  },
};

function injectBridgeStyles() {
  if (document.querySelector('link[data-ai-connect-bridge="true"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/applied-intelligence-app/assets/runtime-bridge/ai-connect-bridge.css';
  link.dataset.aiConnectBridge = 'true';
  document.head.appendChild(link);
}

function updateHomeTiles() {
  const mappings = [
    { key: 'AI-Trace', badge: 'Visibility' },
    { key: 'AI-CIS', badge: 'Improvement' },
    { key: 'Dashboard', badge: 'Analytics' },
    { key: 'AI-Connect', badge: 'Connective Layer' },
  ];

  document.querySelectorAll('.homeTile').forEach((tile, index) => {
    const config = mappings[index];
    if (!config) return;
    tile.dataset.badge = config.badge;
    const title = tile.querySelector('.tileTitle');
    if (title) title.textContent = config.key;
  });

  const connectTile = document.querySelector('.homeTile.silver');
  if (connectTile) {
    connectTile.setAttribute('onclick', "goToScreen('connect')");
  }
}

function ensureConnectScreen() {
  if (document.getElementById('connect')) return;
  const app = document.querySelector('.app');
  if (!app) return;
  const section = document.createElement('section');
  section.className = 'screen';
  section.id = 'connect';
  section.innerHTML = '<div class="glass panel" id="aiConnectMount"></div>';
  const moreScreen = document.getElementById('more');
  if (moreScreen) {
    app.insertBefore(section, moreScreen);
  } else {
    app.appendChild(section);
  }
}

function buildMetric(metric) {
  return `
    <div class="ai-connect-metric">
      <div class="ai-connect-metric-label">${metric.label}</div>
      <div class="ai-connect-metric-value">${metric.value}</div>
    </div>
  `;
}

function buildCard(card) {
  return `
    <article class="ai-connect-card">
      <div class="ai-connect-card-top">
        <h3 class="ai-connect-card-title">${card.title}</h3>
        <div class="ai-connect-card-meta">
          ${card.meta.map((item) => `<span class="ai-connect-chip">${item}</span>`).join('')}
        </div>
      </div>
      <div class="ai-connect-card-tags">
        ${card.tags.map((item) => `<span class="ai-connect-chip">${item}</span>`).join('')}
      </div>
      <p class="ai-connect-card-copy">${card.copy}</p>
      <div class="ai-connect-card-actions">
        ${card.actions.map((action, index) => `<button type="button" class="ai-connect-button ${index === 0 ? 'primary' : ''}">${action}</button>`).join('')}
      </div>
    </article>
  `;
}

function renderLane(laneKey) {
  const lane = lanes[laneKey];
  const mount = document.getElementById('aiConnectMount');
  if (!lane || !mount) return;

  const tabButtons = Object.keys(lanes).map((key) => {
    const label = key === 'myWork' ? 'My Work' : key.charAt(0).toUpperCase() + key.slice(1);
    return `<button type="button" class="ai-connect-tab ${key === laneKey ? 'active' : ''}" data-lane="${key}">${label}</button>`;
  }).join('');

  const summary = lane.metrics
    ? `<div class="ai-connect-summary">${lane.metrics.map(buildMetric).join('')}</div>`
    : '';

  const list = lane.cards
    ? `<div class="ai-connect-list">${lane.cards.map(buildCard).join('')}</div>`
    : `<div class="ai-connect-panel-placeholder">${lane.placeholder}</div>`;

  mount.innerHTML = `
    <div class="ai-connect-shell">
      <div class="ai-connect-header">
        <span class="ai-connect-kicker">${lane.kicker}</span>
        <h2 class="ai-connect-title">${lane.title}</h2>
        <p class="ai-connect-copy">${lane.copy}</p>
      </div>
      <div class="ai-connect-tab-row">${tabButtons}</div>
      ${summary}
      ${list}
    </div>
  `;

  mount.querySelectorAll('[data-lane]').forEach((button) => {
    button.addEventListener('click', () => renderLane(button.dataset.lane));
  });
}

function wireConnectEntryPoints() {
  const moreCards = Array.from(document.querySelectorAll('#more .agentCard'));
  const connectCard = moreCards.find((card) => card.textContent.includes('AI-Connect'));
  if (connectCard) {
    connectCard.addEventListener('click', () => window.goToScreen('connect'));
    const sub = connectCard.querySelector('.tileSub');
    if (sub) {
      sub.textContent = 'Open the AI-Connect operating layer inside the same universal runtime.';
    }
  }
}

function enhanceTopShell() {
  const sub = document.querySelector('.top .sub');
  if (sub) {
    sub.textContent = 'Universal web app · website shell + operating runtime';
  }
}

export function initAIConnectRuntimeBridge() {
  injectBridgeStyles();
  updateHomeTiles();
  ensureConnectScreen();
  wireConnectEntryPoints();
  enhanceTopShell();
  renderLane('myWork');
}
