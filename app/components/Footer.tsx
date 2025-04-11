"use client";

import { CircleUserRound, ArrowLeft } from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";
import useRouterBack from '../hooks/useRouterBack';

export default function Footer() {

const pathname = usePathname();
const handleGoBack = useRouterBack(pathname || "");
  return (
    <>
      <footer className="fixed bottom-0 w-full bg-[#d4decf] h-20 flex items-center justify-around md:hidden z-50">
        {pathname !== "/" && <button onClick={handleGoBack}>
          <ArrowLeft className="w-8 h-8 text-[#1D4D19] cursor-pointer" />
        </button>}

        <Link href="/perfil">
          <CircleUserRound className="w-8 h-8 text-[#1D4D19] cursor-pointer" />
        </Link>
      </footer>
    </>
  );
}
