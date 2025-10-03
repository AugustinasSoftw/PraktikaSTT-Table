import { check } from "drizzle-orm/gel-core";
import { useEffect, useRef } from "react";

export default function Checkbox({checked, indeterminate, onChange}: {checked: boolean; indeterminate?: boolean; onChange: React.ChangeEventHandler<HTMLInputElement>}){
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(ref.current) ref.current.indeterminate = Boolean(indeterminate) && !checked;
    },[indeterminate, checked]);
    return <input ref={ref} type="checkbox" checked={checked} onChange={onChange} />
}