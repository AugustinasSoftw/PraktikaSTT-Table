'use client';

import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

// ✅ type-only import so client bundle doesn’t pull server code
import type { TableRow } from '@/db/schema';

const columns: ColumnDef<TableRow>[] = [
  { accessorKey: 'eil_nr',           header: 'Eil. nr' },
  { accessorKey: 'rusis',            header: 'Rūšis' },
  { accessorKey: 'pavadinimas',      header: 'Pavadinimas' },
  { accessorKey: 'istaigos_nr',      header: 'Įstaigos Nr.' },
  { accessorKey: 'priemimo_data',    header: 'Priėmimo data' },
  { accessorKey: 'isigaliojimo_data',header: 'Įsigaliojimo data' },
  { accessorKey: 'projektai_nuoroda',header: 'Nuoroda' },
  { accessorKey: 'scraped_at',       header: 'Scraped' },
  {
    accessorKey: 'ai_risk_score',
    header: 'AI Risk',
    cell: (info) => {
      const v = info.getValue() as string | null; // numeric -> string from pg
      return v ? Number(v).toFixed(2) : '';
    },
  },
  { accessorKey: 'ai_summary', header: 'Santrauka' },
];

export default function TATable() {
  const [data, setData] = useState<TableRow[]>([]);

  useEffect(() => {
    fetch('/ta') // or 'http://localhost:<port>/ta' if Hono runs elsewhere
      .then((r) => r.json())
      .then((rows: TableRow[]) => setData(rows))
      .catch(console.error);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((h) => (
              <th key={h.id}>
                {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
