"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import type { SelectedProps } from "@/app/types/navigation";
import { IoIosArrowDown } from "react-icons/io";

type NavigatorProps = {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  sorting: SelectedProps | null;
  setSorting: React.Dispatch<React.SetStateAction<SelectedProps | null>>;
};

export default function Navigator({
  setSorting,
  sorting,
  openFilter,
  setOpenFilter,
}: NavigatorProps) {
  //
  const rusys = [
    "Įsakymas",
    "Potvarkis",
    "Nutarimas",
    "Dekretas",
    "Rezoliucija",
  ];
  //
  const dazniausiaiNaudNavigatoriai = ["Aukšta korupcijos rizika"];
  //
  const [selected, setSelected] = useState(false);
  const [DNNopen, setDNNOpen] = useState(false);
  const [Ropen, setROpen] = useState(false);

  if (!openFilter) return null;

  console.log(DNNopen);

  return (
    <div className="relative flex justify-start">
      <div className="w-[420px] rounded-lg mt-1 bg-zinc-700 text-zinc-100 shadow-2xl ring-1 ring-black/10 p-2 absolute z-50">
        <div className="w-full h-16 font-bold items-center flex pl-3 pr-2 text-xl">
          <span className="">Filtrai</span>
          <button
            onClick={() => setOpenFilter(false)}
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/10 cursor-pointer"
            aria-label="Uždaryti"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Content (scrollable if long) */}
        <div className="flex flex-col px-4 mt-2 text-xl overflow-y-auto">
          {sorting && Object.values(sorting).some((v) => v) && (
            <div>
              <span className="font-semibold">Pažymėti navigatoriai:</span>
              <br />

              <div className="flex flex-col gap-1 mt-1">
                {Object.entries(sorting ?? {}).map(([key, value], index) =>
                  value ? (
                    <div key={index} className="flex items-center gap-2">
                      <span>{String(value)}</span>
                      <button
                        onClick={() =>
                          setSorting((prev) =>
                            prev ? { ...prev, [key]: "" } : prev
                          )
                        }
                        className="flex items-center justify-center rounded hover:bg-black/10"
                        aria-label="Pašalinti filtrą"
                      >
                        <IoMdClose className="font-bold" />
                      </button>
                    </div>
                  ) : null
                )}
              </div>
              <div className="my-2 h-px bg-gray-300 mx-1" />
            </div>
          )}

          <div>
            <button
              onClick={() => setDNNOpen((p) => !p)}
              className="text-lg flex flex-row items-center justify-center gap-x-2"
            >
              <IoIosArrowDown />
              Dažniausiai naudojami navigatoriai
            </button>
            {DNNopen && (
              <li>
                {dazniausiaiNaudNavigatoriai.map((r) => (
                  <ul key={r} className="pb-1 pl-1 flex items-center gap-2">
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected(true);
                          setSorting((prev) => ({
                            ...(prev ?? { dazniausiaiNaudNav: "", rusys: "" }),
                            dazniausiaiNaudNav: r,
                          }));
                        }
                      }}
                      className="scale-130"
                      type="checkbox"
                    />
                    <span className="text-xl">{r}</span>
                  </ul>
                ))}
              </li>
            )}
          </div>

          <div>
            <button
              onClick={() => setROpen((p) => !p)}
              className="text-lg flex flex-row items-center justify-center gap-x-2"
            >
              <IoIosArrowDown />
              Rušys
            </button>

            {Ropen && (
              <li>
                {rusys.map((r) => (
                  <ul key={r} className="pb-1 pl-1 flex items-center gap-2">
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected(true);
                          setSorting((prev) => ({
                            ...(prev ?? { dazniausiaiNaudNav: "", rusys: "" }),
                            rusys: r,
                          }));
                        }
                      }}
                      className="scale-130"
                      type="checkbox"
                    />
                    <span className="text-xl">{r}</span>
                  </ul>
                ))}
              </li>
            )}
          </div>
        </div>
      </div>
      {/* Close*/}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setOpenFilter(false)}
      />
      {/* Close*/}
    </div>
  );
}
