import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Lesson, Comment } from '@shared/types';
import { cn } from '@/lib/utils';
import { CommentSection } from './CommentSection';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
interface LessonCardProps {
  lesson: Lesson;
  onLike: (lessonId: string) => void;
  onAddComment: (lessonId: string, content: string) => Promise<Comment | null>;
  isLiked: boolean;
}
export function LessonCard({ lesson, onLike, onAddComment, isLiked }: LessonCardProps) {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const url = window.location.href;
    const text = `Check out this lesson from HashCode Hub: "${lesson.title}"`;
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(lesson.title)}&summary=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <Card className="bg-card/50 dark:bg-card/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
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
          <Button variant="ghost" size="sm" onClick={() => onLike(lesson.id)} className="flex items-center space-x-2 group">
            <Heart className={cn("w-4 h-4 transition-colors", isLiked ? "text-red-500 fill-current" : "group-hover:text-red-500")} />
            <span>{lesson.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCommentsVisible(!commentsVisible)} className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}><Twitter className="w-4 h-4 text-[#1DA1F2]" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}><Linkedin className="w-4 h-4 text-[#0A66C2]" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleShare('facebook')}><Facebook className="w-4 h-4 text-[#1877F2]" /></Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
      {commentsVisible && (
        <CardContent>
          <CommentSection lessonId={lesson.id} onAddComment={onAddComment} />
        </CardContent>
      )}
    </Card>
  );
}