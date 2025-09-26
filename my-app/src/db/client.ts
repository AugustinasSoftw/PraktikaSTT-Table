import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { TAtable } from './schema';
import { sql } from 'drizzle-orm';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

export async function TotalRows(): Promise<number>{
    const result = await db.execute(sql`SELECT COUNT(*)::int AS total FROM ${TAtable}`);
    return result.rows[0].total as number
    
};

