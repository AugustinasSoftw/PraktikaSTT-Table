import { NextResponse } from 'next/server';
import { db } from '@/db/client';
import { TAtable } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET(request: Request) {
try{
  const { searchParams} = new URL(request.url);

  const rawLimit = Number(searchParams.get("limit"));
  const rawOffset = Number(searchParams.get("offset"));

   const DEFAULT_LIMIT = 10;
   const MAX_LIMIT = 100;

   const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(rawLimit, 1), MAX_LIMIT)
      : DEFAULT_LIMIT;

   const offset = Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : 0;
  
   const rows = await db.
   select()
   .from(TAtable)
   .limit(limit)
   .offset(offset);

   const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(TAtable);

   return NextResponse.json({
    rows,
    totalRows: Number(count),
    offset
   })
}
catch(err){
  console.log(err);
  return NextResponse.json(
    { error: "Failed to fetch"},
    { status: 500}
  )
}
}
