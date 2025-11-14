import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api-client';
import type { Comment } from '@shared/types';
import { formatDistanceToNow } from 'date-fns';
interface CommentSectionProps {
  lessonId: string;
  onAddComment: (lessonId: string, content: string) => Promise<Comment | null>;
}
export function CommentSection({ lessonId, onAddComment }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedComments = await api<Comment[]>(`/api/lessons/${lessonId}/comments`);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId]);
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const addedComment = await onAddComment(lessonId, newComment);
    if (addedComment) {
      setComments(prev => [...prev, addedComment]);
      setNewComment('');
    }
    setIsSubmitting(false);
  };
  return (
    <div className="pt-6">
      <Separator />
      <div className="mt-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Comments</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Textarea
            placeholder="Add your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={!newComment.trim() || isSubmitting} className="self-end">
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${comment.author}`} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Be the first to comment.</p>
          )}
        </div>
      </div>
    </div>
  );
}