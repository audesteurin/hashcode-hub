import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Season } from '@shared/types';
interface SeasonSidebarProps {
  seasons: Season[];
  selectedSeasonId: string | null;
  onSelectSeason: (id: string) => void;
}
export function SeasonSidebar({ seasons, selectedSeasonId, onSelectSeason }: SeasonSidebarProps) {
  return (
    <aside className="w-full md:w-64 lg:w-72 md:shrink-0 h-full">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <div className="space-y-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 text-2xl font-semibold font-display tracking-tight">
              Seasons
            </h2>
            <div className="space-y-1">
              {seasons.map((season) => (
                <Button
                  key={season.id}
                  variant="ghost"
                  onClick={() => onSelectSeason(season.id)}
                  className={cn(
                    'w-full justify-start text-left h-auto py-2',
                    selectedSeasonId === season.id && 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-50'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">Saison {season.seasonNumber}</span>
                    <span className="text-sm text-muted-foreground">{season.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}