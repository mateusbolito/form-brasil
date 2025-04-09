"use client";

import { Search, X, CircleUserRound, ArrowLeft } from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

export default function Footer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <footer className="fixed bottom-0 w-full bg-[#d4decf] h-20 flex items-center justify-around md:hidden z-50">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-8 h-8 text-[#1D4D19] cursor-pointer" />
        </button>

        <Link href="/perfil">
          <CircleUserRound className="w-8 h-8 text-[#1D4D19] cursor-pointer" />
        </Link>
      </footer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90%] sm:w-[400px] bg-white p-6 rounded-lg">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">
              Pesquisar
            </DialogTitle>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
            </button>
          </DialogHeader>

          <div className="relative">
            <Input
              type="text"
              placeholder="Digite sua busca..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
