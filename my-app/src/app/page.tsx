import Image from "next/image";
import Table from "@/components/Table";
import Header from "@/components/Header";
import Navigator from "@/components/Navigator";

export default function Home() {
  return (<>
    <Header/>
   
   
    <div className="flex justify-end pr-16 pt-14 w-full content-between">
      
      

      <Table/>
    </div>
   
   </>
  );
}
