import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-[60px] bg-white flex justify-center border-b border-slate-200">
      <div className="flex items-center justify-start h-full w-[1200px] px-4">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={151}
            height={40}
            className="hidden sm:block"
          />
          <Image
            src="/images/logo_mobile.svg"
            alt="Logo"
            width={71}
            height={40}
            className="block sm:hidden"
          />
        </Link>
      </div>
    </header>
  );
}
