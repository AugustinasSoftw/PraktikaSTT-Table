import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { TAtable } from '@/db/schema';

export async function GET() {
  const rows = await db.select().from(TAtable);
  return NextResponse.json(rows); 
}
