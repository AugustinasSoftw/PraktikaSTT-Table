import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

type ButtonProps = {
  disabled?: boolean;
};

export function NextButton({ disabled }: ButtonProps) {

  return (
    <span
      className={`inline-flex border-gray-400 border items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-160 hover:bg-zinc-800
        ${disabled ? "opacity-45 cursor-not-allowed hover:bg-zinc-700" : ""}`}
    >
      <ChevronRightIcon className="h-4 w-4" />
    </span>
  );
}
export function NextNextButton({ disabled }: ButtonProps) {
  return (
    <span
      className={`inline-flex border-gray-400 border items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-160 hover:bg-zinc-800
        ${disabled ? "opacity-45 cursor-not-allowed hover:bg-zinc-700" : ""}`}
    >
      <ChevronRightIcon className="h-4 w-4" />
      <ChevronRightIcon className="h-4 w-4 -ml-3" />
    </span>
  );
}
export function BacktButton({ disabled }: ButtonProps) {
  return (
    <span
      className={`inline-flex border-gray-400 border items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-160 hover:bg-zinc-800
        ${disabled ? "opacity-45 cursor-not-allowed hover:bg-zinc-700" : ""}`}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </span>
  );
}
export function BackBackButton({ disabled }: ButtonProps) {
  return (
    <span
      className={`inline-flex border-gray-400 border items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-160 hover:bg-zinc-800
        ${disabled ? "opacity-45 cursor-not-allowed hover:bg-zinc-700" : ""}`}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <ChevronLeftIcon className="h-4 w-4 -ml-3" />
    </span>
  );
}
