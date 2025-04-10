"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Header() {
  return (
    <main>
      <header className="bg-[#d4decf] h-32 md:h-52 print:hidden w-screen">
        <div className="flex items-center justify-between px-6 md:px-12 py-6 md:py-16">
          <Link href="/">
            <Image
              src="/logo-raft.png"
              width={200}
              height={50}
              alt="Logo"
              className="flex items-center justify-center"
            />
          </Link>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-12 h-12 ">
                  <AvatarImage src="https://secure.gravatar.com/avatar/58dba17dd96a2558e67dae0eb7751a1d?s=96&d=mm&r=g" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[250px] h-[140px] bg-white border-0 mr-14 mt-1 shadow-2xl">
                <DropdownMenuSeparator />

                <Link href="/perfil">
                  <DropdownMenuCheckboxItem className="cursor-pointer hover:bg-gray-100 pl-3.5 text-[#333]">
                    Perfil
                  </DropdownMenuCheckboxItem>
                </Link>
                <DropdownMenuCheckboxItem className="cursor-pointer hover:bg-gray-100 pl-3.5 text-[#333]">
                  <Link href="/senha">Senha</Link>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="cursor-pointer hover:bg-gray-100 pl-3.5 border-t-[1px] border-[#dddd] text-[#333]">
                  Sair
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </main>
  );
}
