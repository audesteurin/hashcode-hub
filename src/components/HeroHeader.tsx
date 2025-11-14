import React from 'react';
export function HeroHeader() {
  return (
    <div className="relative isolate overflow-hidden pt-16 sm:pt-24 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background to-amber-100/20 dark:to-slate-900/20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in">
            HashCode Hub
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in [animation-delay:200ms]">
            An elegant, minimalist platform for the HashCode developer community to read, discuss, and share motivational tech lessons.
          </p>
        </div>
      </div>
    </div>
  );
}