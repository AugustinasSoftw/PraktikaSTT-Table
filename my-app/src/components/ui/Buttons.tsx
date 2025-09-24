import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

export  function NextButton(){ 
    return (
        <span className="inline-flex items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-150 hover:bg-zinc-800/70 hover:shadow-md hover:ring-zinc-600">
      <ChevronRightIcon className="h-4 w-4" />
    </span>
    );
}
export  function NextNextButton(){ 
    return (
     <span className="inline-flex items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-150 hover:bg-zinc-800/70 hover:shadow-md hover:ring-zinc-600">
      <ChevronRightIcon className="h-4 w-4" />
      <ChevronRightIcon className="h-4 w-4 -ml-3" />
    </span>
    );
}
export  function BacktButton(){ 
    return (
    <span className="inline-flex items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-150 hover:bg-zinc-800/70 hover:shadow-md hover:ring-zinc-600">
      <ChevronLeftIcon className="h-4 w-4" />
    </span>
    );
}
export  function BackBackButton(){ 
    return (
          <span className="inline-flex items-center justify-center rounded-md bg-zinc-700 h-9 w-9 text-zinc-200 shadow-sm ring-1 ring-zinc-700/60 transition-all duration-150 hover:bg-zinc-800/70 hover:shadow-md hover:ring-zinc-600">
      <ChevronLeftIcon className="h-4 w-4" />
      <ChevronLeftIcon className="h-4 w-4 -ml-3" />
    </span>
    );
}