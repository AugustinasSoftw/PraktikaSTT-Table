import { table } from "console";
import { BackBackButton, BacktButton, NextButton, NextNextButton } from "./ui/Buttons"
import { Table } from "@tanstack/react-table";
import type { TableRow } from "@/db/schema";

export default function Paggination({table}:{table:Table<TableRow>}){
    return(
    <div>      

        <button onClick={() => table.firstPage() }><BackBackButton /></button>
        <button><BacktButton/></button>
        
        <button><NextButton/></button>
        <button onClick={() => table.lastPage() }><NextNextButton/></button>
    </div>
);
 } 