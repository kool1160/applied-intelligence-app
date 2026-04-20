import React from 'react';

import type { HandoffModel } from '../../models/handoff-model';

type HandoffDetailViewProps = {
  handoff: HandoffModel;
};

export function HandoffDetailView({ handoff }: HandoffDetailViewProps) {
  return (
    <section
      data-component="HandoffDetailView"
      data-handoff-id={handoff.handoffId}
      data-handoff-status={handoff.status}
    >
      <div data-slot="title">{handoff.title}</div>
      <div data-slot="source">{handoff.sourceRef}</div>
      <div data-slot="destination">{handoff.destinationRef}</div>
      <div data-slot="owner">{handoff.ownerDisplay}</div>
      <div data-slot="status">{handoff.status}</div>
      {handoff.agingStage ? <div data-slot="aging-stage">{handoff.agingStage}</div> : null}
      {handoff.ackState ? <div data-slot="ack-state">{handoff.ackState}</div> : null}
      {handoff.linkedObjectRef ? <div data-slot="linked-object">{handoff.linkedObjectRef}</div> : null}
      {handoff.linkedThreadRef ? <div data-slot="linked-thread">{handoff.linkedThreadRef}</div> : null}
      <div data-slot="last-updated">{handoff.lastUpdatedAt}</div>
    </section>
  );
}

export type { HandoffDetailViewProps };
