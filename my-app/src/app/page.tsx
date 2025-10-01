import Image from "next/image";
import Table from "@/components/Table";
import Header from "@/components/Header";
import Navigator from "@/components/Navigator";

export default function Home() {
  return (<>
  <div className="">
    <Header/>
   
   
     <div className="w-full  pt-14 flex">
    <div className="flex-1 min-w-0">
      <div className="overflow-x-auto flex items-center justify-center">
        <Table />
      </div>
    </div>
  </div>
    </div>
   
   </>
  );
}
