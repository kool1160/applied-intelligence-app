import React from 'react';

import type { HandoffModel } from '../../models/handoff-model';

type HandoffCardProps = {
  handoff: HandoffModel;
  onAction?: (actionType: string, handoff: HandoffModel) => void;
};

export function HandoffCard({ handoff, onAction }: HandoffCardProps) {
  return (
    <article
      data-component="HandoffCard"
      data-handoff-id={handoff.handoffId}
      data-handoff-status={handoff.status}
    >
      <div data-slot="title">{handoff.title}</div>
      <div data-slot="source-destination">
        {handoff.sourceRef} -&gt; {handoff.destinationRef}
      </div>
      <div data-slot="owner">{handoff.ownerDisplay}</div>
      <div data-slot="status">{handoff.status}</div>
      {handoff.agingStage ? (
        <div data-slot="aging-stage">{handoff.agingStage}</div>
      ) : null}
      {handoff.ackState ? <div data-slot="ack-state">{handoff.ackState}</div> : null}
      {handoff.linkedObjectRef ? (
        <div data-slot="linked-object">{handoff.linkedObjectRef}</div>
      ) : null}
      {handoff.linkedThreadRef ? (
        <div data-slot="linked-thread">{handoff.linkedThreadRef}</div>
      ) : null}
      {handoff.visibilityHolders && handoff.visibilityHolders.length > 0 ? (
        <div data-slot="visibility-holders">{handoff.visibilityHolders.join(', ')}</div>
      ) : null}
      <div data-slot="timestamp">{handoff.lastUpdatedAt}</div>
      {handoff.quickActions && handoff.quickActions.length > 0 ? (
        <div data-slot="quick-actions">
          {handoff.quickActions.map((action) => (
            <button
              key={action.type}
              type="button"
              disabled={action.enabled === false}
              onClick={() => onAction?.(action.type, handoff)}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export type { HandoffCardProps };
