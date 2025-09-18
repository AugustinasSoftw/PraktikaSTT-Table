import { Hono } from 'hono';
import { db } from '@/db/client';
import { TAtable } from '@/db/schema';

const app = new Hono();

app.get('/ta', async (c) => {
  const rows = await db.select().from(TAtable); // SELECT * FROM users
  return c.json(rows);
});

export default app;
