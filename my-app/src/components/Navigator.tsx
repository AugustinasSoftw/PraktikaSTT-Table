  'use client'
  
  type NavigatorProps = {
        setSorting: (v: string) => void;
    }


export default function Navigator({setSorting}:NavigatorProps){

    const rusys = [
            'Įsakymas', 'Potvarkis', 'Nutarimas','Dekretas', 'Rezoliucija'
     ]

  
    return(
    <div className="mr-8 w-[380px] h-[600px] border flex flex-col rounded-lg border-gray-200 overflow-hidden">
        <div className="bg-blue-300 w-full h-16 font-bold items-center flex pl-4 text-2xl">
            Navigatoriai
        </div>

        <div className="flex flex-col px-4 mt-2 text-xl">

            <div className="flex flex-col mt-2">
                <span className="font-semibold mb-1">Dažniausiai naudojami navigatoriai</span>
                 <label className="pb-1 pl-1">
                <input className="mr-2  font-medium  scale-130" type="checkbox"></input>
                <span className="text-xl">Aukšta korupcijos rizika</span>
            </label>
            </div>

            <div className="my-2 h-px bg-gray-300 mx-1"></div>

            <div className="flex flex-col border-t-gray-200" >
                <span className="font-semibold mb-1">Rušys</span>
                 {rusys.map((r) => (

                 <label key={r} className="pb-1 pl-1">
                    <input 
                      onChange={(e) => {
              if (e.target.checked) setSorting(r);   // or setSorting(prev => ...)
              else setSorting("");                    // decide your uncheck behavior
            }}
                    className="mr-2 font-medium scale-130" type="checkbox"></input>
                    <span className="text-xl">{r}</span>
                 </label>))
                    } 
                             
                        
                        
             </div>
            
            

        </div>
        
    </div>);
}