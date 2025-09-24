"use client";
//reactIcons
import { FaRegFile } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import Paggination from "./Pagination";
//Components
import Checkbox from "./Checkbox";
import { NextNextButton,NextButton,BacktButton,BackBackButton } from "./ui/Buttons";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  getExpandedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";


// ✅ type-only import so client bundle doesn’t pull server code
import type { TableRow } from "@/db/schema";


const columns: ColumnDef<TableRow>[] = [
 {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected?.()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 32, // optional: keep it narrow
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "eil_nr", header: "Eil. nr" },
  { accessorKey: "rusis", header: "Rūšis" },
  { accessorKey: "pavadinimas", header: "Pavadinimas" },
  { accessorKey: "istaigos_nr", header: "Įstaigos Nr." },
  { accessorKey: "priemimo_data", header: "Priėmimo data" },
  { accessorKey: "isigaliojimo_data", header: "Įsigaliojimo data" },
  { id: "projektai_nuoroda", header: " Projektai_nuoroda",
    cell: ({ row } ) => {
      const value = row.original.projektai_nuoroda;

      if(!value) return null;

      const fullurl = `https://www.e-tar.lt/${value}`

      return(
        <a href={fullurl}> <FaRegFile /></a>
          
      )
    }
  
  },
  
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
        <button
    type="button"
    onClick={() => row.toggleExpanded()}  
    aria-expanded={row.getIsExpanded()}    
    title={row.getIsExpanded() ? 'Collapse' : 'Expand'}
  >
    {row.getIsExpanded() ?  <MdKeyboardArrowDown/>: <MdKeyboardArrowUp />}    
  </button>
    ) 
  },
];

export default function TATable() {
  const [data, setData] = useState<TableRow[]>([]);
  const [expanded,setExpanded] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const selectedKeys = rowSelection; 
  useEffect(() => {
        console.log("selected ids:", Object.keys(selectedKeys)); 
}, [selectedKeys]);

  
  useEffect(() => {
    fetch("/api/ta")
      .then((r) => r.json())
      .then((rows: TableRow[]) => setData(rows))
      .catch(console.error);
  }, []);

  const table = useReactTable({
    data,columns,
    state: {expanded, rowSelection},
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    
  });

  return (
    <div className="flex flex-col">
    <table className="w-[1500px] table-fixed">
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((h) => (
              <th key={h.id} className={`border border-gray-200
              ${h.column.id === 'pavadinimas' ? 'bg-yellow-50 text-blue-800 font-medium w-[450px]' : undefined}
              `}>
                {h.isPlaceholder
                  ? null
                  : flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.flatMap((row) => [
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={`
              px-4 py-2 border  border-gray-200
              ${cell.column.id === 'pavadinimas' ? 'bg-yellow-50 text-blue-800 font-medium w-[450px]' : undefined}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>,

            row.getIsExpanded() && (
              <tr key={`${row.id}-exp`} className="bg-gray-50">
                <td colSpan={table.getVisibleLeafColumns().length}>
                  <div className="p-4">
                    <h4 className="font-semibold">AI Summary</h4>
                    <p>{row.original.ai_summary ?? '—'}</p>
                    <h4 className="font-semibold mt-2">Risk Score</h4>
                    <p>{row.original.ai_risk_score ?? '—'}</p>
                   </div>
                </td>
              </tr>
            ),
        
        ].filter(Boolean))}
      </tbody>
    </table>
  <div>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</div>
  <div className="flex flex-row"> 

  
        <Paggination table={table}/>
  </div>
   
 

    </div>
  );
}
