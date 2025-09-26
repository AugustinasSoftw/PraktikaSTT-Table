// app/page.tsx (Server Component)
import Pagination from "@/components/Pagination";
import { TotalRows } from "@/db/client";

export default async function Page() {
  const total = await TotalRows(); // plain number from DB
  return <Pagination total={total} />; // pass as prop
}
