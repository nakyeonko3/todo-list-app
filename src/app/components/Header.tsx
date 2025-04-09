import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-[60px] bg-white flex justify-center border-b border-slate-200">
      <div className="flex items-center justify-start h-full w-[1200px] px-4">
        <Image src="/images/logo.svg" alt="Logo" width={151} height={40} />
      </div>
    </header>
  );
}
