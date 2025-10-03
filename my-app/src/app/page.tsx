import Image from "next/image";
import Table from "@/components/Table";
import Header from "@/components/Header";
import Navigator from "@/components/Navigator";

export default function Home() {
 return (
    <div className="min-h-screen bg-slate-50">
      
      <header className="backdrop-blur border-b">
        
          <Header/>
        
      </header>

      <main className="mt-10">

              
              <div className="w-full">
                  <Table/>
              </div>

      </main>
    </div>
  );
}
