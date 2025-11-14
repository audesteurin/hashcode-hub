import React, { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from '@/components/ui/sonner';
import { api } from '@/lib/api-client';
import type { Season, Lesson } from '@shared/types';
import { MainLayout } from '@/components/layout/MainLayout';
import { SeasonSidebar } from '@/components/SeasonSidebar';
import { LessonCard } from '@/components/LessonCard';
import { HeroHeader } from '@/components/HeroHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/ThemeToggle';
export function HomePage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [seasonsData, lessonsData] = await Promise.all([
          api<Season[]>('/api/seasons'),
          api<Lesson[]>('/api/lessons'),
        ]);
        setSeasons(seasonsData);
        setLessons(lessonsData);
        if (seasonsData.length > 0) {
          setSelectedSeasonId(seasonsData[0].id);
        }
      } catch (error) {
        toast.error('Failed to load lessons. Please try again later.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  const filteredLessons = useMemo(() => {
    if (!selectedSeasonId) return [];
    return lessons.filter((lesson) => lesson.seasonId === selectedSeasonId);
  }, [lessons, selectedSeasonId]);
  const sidebar = (
    <SeasonSidebar
      seasons={seasons}
      selectedSeasonId={selectedSeasonId}
      onSelectSeason={setSelectedSeasonId}
    />
  );
  const content = (
    <div className="py-8 md:py-10 lg:py-12">
      <HeroHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
        ) : (
          <div className="space-y-8">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No lessons found for this season.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <footer className="text-center mt-24 text-sm text-muted-foreground">
        <p>Built with ���️ at Cloudflare</p>
      </footer>
    </div>
  );
  return (
    <>
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <MainLayout sidebar={sidebar}>
        {content}
      </MainLayout>
      <Toaster richColors />
    </>
  );
}