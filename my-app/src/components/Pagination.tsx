import {
  BackBackButton,
  BacktButton,
  NextButton,
  NextNextButton,
} from "./ui/Buttons";
import { Table } from "@tanstack/react-table";
import type { TableRow } from "@/db/schema";
import { TotalRows } from "@/db/client";

export default function Paggination({ table }: { table: Table<TableRow> }) {

    const total = TotalRows();
    console.log(total);

  return (
    <div>
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
