import { Hono } from "hono";
import type { Env } from './core-utils';
import { SeasonEntity, LessonEntity, CommentEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import type { Comment } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure data is seeded on first request
  app.use('/api/*', async (c, next) => {
    await Promise.all([
      SeasonEntity.ensureSeed(c.env),
      LessonEntity.ensureSeed(c.env),
      CommentEntity.ensureSeed(c.env),
    ]);
    await next();
  });
  // GET all seasons
  app.get('/api/seasons', async (c) => {
    const { items } = await SeasonEntity.list(c.env);
    items.sort((a, b) => a.seasonNumber - b.seasonNumber);
    return ok(c, items);
  });
  // GET all lessons
  app.get('/api/lessons', async (c) => {
    const { items } = await LessonEntity.list(c.env);
    items.sort((a, b) => a.lessonNumber - b.lessonNumber);
    return ok(c, items);
  });
  // POST to like a lesson
  app.post('/api/lessons/:id/like', async (c) => {
    const id = c.req.param('id');
    try {
      const updatedLesson = await LessonEntity.like(c.env, id);
      return ok(c, updatedLesson);
    } catch (error) {
      console.error(`Failed to like lesson ${id}:`, error);
      return notFound(c, 'Lesson not found or failed to update.');
    }
  });
  // GET comments for a lesson
  app.get('/api/lessons/:lessonId/comments', async (c) => {
    const lessonId = c.req.param('lessonId');
    const { items } = await CommentEntity.list(c.env);
    const lessonComments = items.filter(comment => comment.lessonId === lessonId);
    lessonComments.sort((a, b) => a.timestamp - b.timestamp);
    return ok(c, lessonComments);
  });
  // POST a new comment
  app.post('/api/lessons/:lessonId/comments', async (c) => {
    const lessonId = c.req.param('lessonId');
    const { content, author } = await c.req.json<{ content: string, author?: string }>();
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return bad(c, 'Comment content is required.');
    }
    const newComment: Comment = {
      id: crypto.randomUUID(),
      lessonId,
      author: author || 'Anonymous',
      content: content.trim(),
      timestamp: Date.now(),
    };
    const createdComment = await CommentEntity.create(c.env, newComment);
    return ok(c, createdComment);
  });
}