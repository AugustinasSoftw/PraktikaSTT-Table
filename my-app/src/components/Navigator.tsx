'use client';

import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import type { SelectedProps } from '@/app/types/navigation';

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
  const rusys = ['Įsakymas', 'Potvarkis', 'Nutarimas', 'Dekretas', 'Rezoliucija'];

  const dazniausiaiNaudNavigatoriai = ['Aukšta korupcijos rizika'];

  const [selected, setSelected] = useState(false);

  // Close on ESC + lock body scroll while openFilter
  useEffect(() => {
    if (!openFilter) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenFilter(false);
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openFilter, setOpenFilter]);

  if (!openFilter) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop (outside click closes) */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpenFilter(false)} />

      {/* Popup container */}
      <div className="absolute inset-0 flex items-start justify-center p-6 pointer-events-none">
        {/* Panel (stop propagation so inside clicks don't close) */}
        <div
          className="relative mr-0 w-[380px] h-[600px]  flex flex-col rounded-lg overflow-hidden bg-white shadow-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Header */}
          <div className="bg-blue-300 w-full h-16 font-bold items-center flex pl-4 pr-2 text-2xl">
            <span>Navigatoriai</span>
            <button
              onClick={() => setOpenFilter(false)}
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/10"
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
                            setSorting((prev) => (prev ? { ...prev, [key]: '' } : prev))
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

            {!sorting?.dazniausiaiNaudNav && (
              <div className="flex flex-col mt-2">
                <span className="font-semibold mb-1">Dažniausiai naudojami navigatoriai</span>
                {dazniausiaiNaudNavigatoriai.map((r) => (
                  <label key={r} className="pb-1 pl-1 flex items-center gap-2">
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected(true);
                          setSorting((prev) => ({
                            ...(prev ?? { dazniausiaiNaudNav: '', rusys: '' }),
                            dazniausiaiNaudNav: r,
                          }));
                        }
                      }}
                      className="scale-130"
                      type="checkbox"
                    />
                    <span className="text-xl">{r}</span>
                  </label>
                ))}
                <div className="my-2 h-px bg-gray-300 mx-1" />
              </div>
            )}

            {!sorting?.rusys && (
              <div className="flex flex-col">
                <span className="font-semibold mb-1">Rūšys</span>
                {rusys.map((r) => (
                  <label key={r} className="pb-1 pl-1 flex items-center gap-2">
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected(true);
                          setSorting((prev) => ({
                            ...(prev ?? { dazniausiaiNaudNav: '', rusys: '' }),
                            rusys: r,
                          }));
                        }
                      }}
                      className="scale-130"
                      type="checkbox"
                    />
                    <span className="text-xl">{r}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
