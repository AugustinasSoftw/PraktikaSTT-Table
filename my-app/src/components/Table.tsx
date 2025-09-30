"use client";

import type { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    offset: number;
  }
}
//reactIcons
import { FaRegFile } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import Paggination from "./Pagination";
//Components
import Checkbox from "./Checkbox";
import Navigator from './Navigator';

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  getExpandedRowModel,
  PaginationState,
} from "@tanstack/react-table";

// ✅ type-only import so client bundle doesn’t pull server code
import type { TableRow } from "@/db/schema";



const columns: ColumnDef<TableRow>[] = [
  {
    id: "select",
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
  { id: "eil_nr", header: "Eil_nr", cell: ({row, table}) => {
    const offs = table.options.meta?.offset ?? 0;
    return offs + row.index +1;
  }
  },
  { accessorKey: "rusis", header: "Rūšis" },
  { accessorKey: "pavadinimas", header: "Pavadinimas" },
  { accessorKey: "istaigos_nr", header: "Įstaigos Nr." },
  { accessorKey: "priemimo_data", header: "Priėmimo data" },
  { accessorKey: "isigaliojimo_data", header: "Įsigaliojimo data" },
  {
    id: "projektai_nuoroda",
    header: " Projektai nuoroda",
    cell: ({ row }) => {
      const value = row.original.projektai_nuoroda;

      if (!value) return null;

      const fullurl = `https://www.e-tar.lt/${value}`;

      return (
        <a className="flex items-center justify-center" href={fullurl}>
          {" "}
          <FaRegFile />
        </a>
      );
    },
  },

  {
    id: "actions",
    header: "Analizė",
    cell: ({ row }) => (
      <button
        type="button"
        onClick={() => row.toggleExpanded()}
        aria-expanded={row.getIsExpanded()}
        title={row.getIsExpanded() ? "Collapse" : "Expand"}
      >
        {row.getIsExpanded() ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
      </button>
    ),
  },
];

export default function Table() {
  
  

  const [data, setData] = useState<TableRow[]>([]);
  const [expanded, setExpanded] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const selectedKeys = rowSelection;

  //Pagination declarations
  const [totalRows, setTotalRows] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  //Navigation declars
  const [sorting, setSorting] = useState('lapas')
  //Loading
  const [isLoading, setIsLoading] = useState(true);


  const pageSize = 5;

  useEffect(() => {
    const controller = new AbortController();
    let showTimer: any;
    (async () =>{
      setIsLoading(true);
      
      try{
      const newOffset = pageIndex * pageSize;
      setOffset(newOffset);
      const res = await fetch(`/api/ta?limit=${pageSize}&offset=${newOffset}`,{
        signal: controller.signal,
      });
      const isFirstLoad = isLoading && data.length === 0;
      const json = await res.json();
      setData(json.rows);
      setTotalRows(json.totalRows);
    }catch (e){
      if((e as any).name !== 'AbortError') console.error(e);
    }finally{
      clearTimeout(showTimer);
     
      setIsLoading(false);
    }
    })();
    return () => 
      {clearTimeout(showTimer)
       controller.abort();}
  },[pageIndex]);


    const table = useReactTable({
    data,
    columns,
    state: { expanded, rowSelection},
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    meta: {
      offset,
    }
  });
 
const isFirstLoad = isLoading && data.length === 0;
const rowHeight = 44;
console.log(sorting);
  return (<div className='flex flex-row'>
    <Navigator setSorting={setSorting}/>
    
    <div className="flex flex-col rounded-lg overflow-hidden">
      <div className="w-[1300px] border h-24 offset bg-blue-300 flex items-center justify-center">
          <Paggination pageIndex={pageIndex} isLoading={isLoading} pageSize={pageSize} totalRows={totalRows} table={table} setPageIndex={setPageIndex}/>
      </div>
      <table className="w-[1300px] table-fixed text-center">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className={`border border-t-0 border-gray-200
              ${
                h.column.id === "pavadinimas"
                  ? "bg-yellow-50 text-blue-800 font-medium w-[450px]"
                  : undefined
              }
              `}
                >
                  {h.isPlaceholder
                    ? null
                    : flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isFirstLoad ? (
       <tbody>
        {Array.from({ length: pageSize }).map((_, i) => (
          <tr key={i} style={{ height: rowHeight }}>
            {table.getAllLeafColumns().map((col) => (
              <td key={col.id} className="px-3">
                <div className="h-3 w-3/4 rounded bg-gray-200 animate-pulse" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
        ) :
       ( <tbody>
          {table.getRowModel().rows.flatMap((row) =>
            [
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`
              px-4 py-2 border border-b-0 border-gray-200
              ${
                cell.column.id === "pavadinimas"
                  ? "bg-yellow-50 text-blue-800 font-medium w-[450px]"
                  : undefined
              }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>,

              row.getIsExpanded() && (
                <tr key={`${row.id}-exp`} className="bg-gray-50">
                  <td colSpan={table.getVisibleLeafColumns().length}>
                    <div className="p-4">
                      <h4 className="font-semibold">AI Summary</h4>
                      <p>{row.original.ai_summary ?? "—"}</p>
                      <h4 className="font-semibold mt-2">Risk Score</h4>
                      <p>{row.original.ai_risk_score ?? "—"}</p>
                    </div>
                  </td>
                </tr>
              ),
            ].filter(Boolean)
          )}
        </tbody>
        )
        }
      </table>
      
     <div className="w-[1300px] border h-24 offset bg-blue-300 flex items-center justify-center">
          <Paggination pageIndex={pageIndex} isLoading={isLoading} totalRows={totalRows} table={table} pageSize={pageSize} setPageIndex={setPageIndex}/>
      </div>
    </div>
    </div>
  );
}
