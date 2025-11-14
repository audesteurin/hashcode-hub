import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Lesson } from '@shared/types';
import { cn } from '@/lib/utils';
interface LessonCardProps {
  lesson: Lesson;
}
export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Card className="bg-card/50 dark:bg-card/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {lesson.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap font-sans text-base leading-relaxed text-muted-foreground">
          {lesson.content}
        </p>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-muted-foreground">
          <Button variant="ghost" size="sm" disabled className="flex items-center space-x-2 cursor-not-allowed">
            <Heart className="w-4 h-4" />
            <span>{lesson.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" disabled className="flex items-center space-x-2 cursor-not-allowed">
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" disabled className="cursor-not-allowed">
          <Share2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}