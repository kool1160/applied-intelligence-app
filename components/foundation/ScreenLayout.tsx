import React from 'react';
import type { ReactNode } from 'react';

type ScreenLayoutProps = {
  title: ReactNode;
  children: ReactNode;
  summary?: ReactNode;
};

export function ScreenLayout({ title, summary, children }: ScreenLayoutProps) {
  return (
    <section data-component="ScreenLayout">
      <header data-slot="title">{title}</header>
      {summary ? <section data-slot="summary">{summary}</section> : null}
      <section data-slot="content">{children}</section>
    </section>
  );
}

export type { ScreenLayoutProps };
