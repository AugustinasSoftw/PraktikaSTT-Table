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
  pageIndex: number;
};

export default function Paggination<TableRow>({
  totalRows,
  table,
  setPageIndex,
  isLoading = false,
  pageSize,
  pageIndex,
}: PaginationProps<TableRow>) {
  const totalPages = Math.ceil(totalRows / pageSize);
  console.log(totalPages);
  const maxButtons = 10;
  const current = pageIndex + 1;

  let start = Math.max(1, current - Math.floor((maxButtons - 1) / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  start = Math.max(1, end - maxButtons + 1);

  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => setPageIndex(0)} disabled={pageIndex < 1}>
        <BackBackButton disabled={pageIndex < 1} />
      </button>
      <button
        disabled={pageIndex < 1}
        onClick={() => setPageIndex(pageIndex - 1)}
      >
        <BacktButton disabled={pageIndex < 1} />
      </button>
      {pages.map((p) => {
        const active = p === current;
        return (
          <button
            key={p}
            disabled={isLoading || active}
            onClick={() => setPageIndex(p - 1)} // pass 0-based index
            aria-current={active ? "page" : undefined}
            className={
              "inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 shadow-sm transition " +
              (active
                ? "bg-zinc-800 text-white ring-zinc-800"
                : "bg-zinc-700 text-zinc-200 ring-zinc-700/60 hover:ring-zinc-500")
            }
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={pageIndex === totalPages - 1}
        onClick={() => setPageIndex(pageIndex + 1)}
      >
        <NextButton disabled={pageIndex === totalPages - 1} />
      </button>

      <button
        onClick={() => setPageIndex(totalPages - 1)}
        disabled={pageIndex === totalPages - 1}
      >
        <NextNextButton disabled={pageIndex === totalPages - 1} />
      </button>
    </div>
  );
}
