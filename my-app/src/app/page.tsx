import Image from "next/image";
import UsersTable from "@/components/TableDatabase";
import Header from "@/components/Header";

export default function Home() {
  return (<>
    <Header/>
   
   
    <div className="flex justify-end pr-16 pt-14 items-center w-full">    <UsersTable/>
</div>
   
   </>
  );
}
