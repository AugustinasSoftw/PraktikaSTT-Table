import { RiCloseLargeFill } from "react-icons/ri";
import { BsTelegram,BsWhatsapp, BsPerson } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { RefObject } from "react";
import { BiLogoGmail } from "react-icons/bi";



type ShareProps = {
  selectedFromIds: any[]; // your row type
  openShare: boolean;
  setOpenShare: React.Dispatch<React.SetStateAction<boolean>>;
  btnRef: RefObject<HTMLButtonElement | null>;
};

export default function Share({ selectedFromIds, openShare, setOpenShare, btnRef }: ShareProps) {
  
  return (
  <>
     <div
      className="fixed inset-0 z-40 bg-black/0" // make it /20 for a dimmed backdrop
      onClick={() => setOpenShare(false)}       // or setOpenFilter(false)
    />
    <div className="relative flex justify-end">
    <div
    
      className="
      w-[320px] rounded-2xl mt-1 bg-zinc-700 text-zinc-100 shadow-2xl ring-1 ring-black/10 p-4 absolute z-50 "
      
      role="dialog"
      aria-label="Share menu"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Bendrinti</h2>
        <button
          onClick={() => setOpenShare(false)}
          className="p-1 rounded-md hover:bg-zinc-700"
          aria-label="Close"
        >
          <RiCloseLargeFill />
        </button>
      </div>

      <ul className="space-y-1">
        <MenuItem icon={<BiLogoGmail />} text='Siųsti naudojant „Gmail“' />
        <MenuItem icon={<FaFacebookMessenger />} text='Siųsti per „Messenger“' />
        <MenuItem icon={<BsWhatsapp />} text='Bendrinti "WhatsApp"' />
        <MenuItem icon={<BsTelegram />} text='Bendrinti "Telegram"' />
      </ul>

      {/* selectedFromIds list (optional) */}
      {selectedFromIds.length > 0 && (
        <ul className="mt-4 max-h-40 overflow-auto list-disc pl-6 text-sm">
          {selectedFromIds.map((row) => (
            <li key={row.id}>
              <span className="font-medium">{row.pavadinimas}</span> – {row.istaigos_nr} – {row.priemimo_data}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  </>
);
}

function MenuItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li>
      <button
        className="w-full flex items-center gap-3 rounded-xl px-3 py-2
                   hover:bg-white/5 text-left transition"
      >
        <span className="text-lg">{icon}</span>
        <span className="text-sm">{text}</span>
      </button>
    </li>
  );
}
