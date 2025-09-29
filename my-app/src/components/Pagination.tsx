import {
  BackBackButton,
  BacktButton,
  NextButton,
  NextNextButton,
} from "./ui/Buttons";
import { Table } from "@tanstack/react-table";
import type { TableRow } from "@/db/schema";

type PaginationProps<TableRow> = {
    table: Table<TableRow>;
    totalRows: number;
    setPageIndex: (page: number) => void;
    pageSize: number;
    isLoading: boolean;
}

export default function Paggination<TableRow>({ totalRows, table, setPageIndex, isLoading, pageSize }: PaginationProps<TableRow>) {

     const totalNumberofPages = totalRows / pageSize;
     console.log(totalNumberofPages);

  return (
    <div className="flex flex-row">
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.firstPage()}
      >
        <BackBackButton />
      </button>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <BacktButton />
      </button>
<div>
    <div>
        {Array.from({ length: 4}).map((_,i) => (
            <button
             disabled={isLoading}
             key={i+1}
             onClick={() => setPageIndex(i)}
             className="inline-flex items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-150 hover:bg-zinc-800/70 hover:shadow-md hover:ring-zinc-600"
              >{i+1}</button>
        ))}
    </div>
</div>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <NextButton />
      </button>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.lastPage()}
      >
        <NextNextButton />
      </button>
    </div>
  );
}
