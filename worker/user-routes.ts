import { Hono } from "hono";
import type { Env } from './core-utils';
import { SeasonEntity, LessonEntity } from "./entities";
import { ok } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure data is seeded on first request
  app.use('/api/*', async (c, next) => {
    await Promise.all([
      SeasonEntity.ensureSeed(c.env),
      LessonEntity.ensureSeed(c.env)
    ]);
    await next();
  });
  // GET all seasons
  app.get('/api/seasons', async (c) => {
    const { items } = await SeasonEntity.list(c.env);
    // Sort by season number
    items.sort((a, b) => a.seasonNumber - b.seasonNumber);
    return ok(c, items);
  });
  // GET all lessons
  app.get('/api/lessons', async (c) => {
    const { items } = await LessonEntity.list(c.env);
    // Sort by lesson number
    items.sort((a, b) => a.lessonNumber - b.lessonNumber);
    return ok(c, items);
  });
}