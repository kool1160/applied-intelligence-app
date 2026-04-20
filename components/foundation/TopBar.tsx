import React from 'react';

type TopBarProps = {
  title: string;
  subtitle?: string;
};

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <div data-component="TopBar">
      <h1 data-slot="title">{title}</h1>
      {subtitle ? <p data-slot="subtitle">{subtitle}</p> : null}
    </div>
  );
}

export type { TopBarProps };
