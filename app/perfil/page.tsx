import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Perfil() {
  return (
    <main className="block items-center justify-center mt-6">
      <h1 className="font-bold text-4xl text-[#1D4D19] flex items-center justify-center">
        Meu Perfil
      </h1>

      <div className="flex items-center justify-center ">
        <Avatar className="w-[96px] h-[96px] mt-7 ">
          <AvatarImage src="https://secure.gravatar.com/avatar/58dba17dd96a2558e67dae0eb7751a1d?s=96&d=mm&r=g" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p className="flex items-center justify-center mt-3">
        <strong>Olá, Admin</strong>
      </p>
      <p className="flex items-center justify-center text-xs">
        cpd@raftembalagens.com.br
      </p>

      <div className="flex items-center justify-center">
        <Link href="/senha">
          <Button className="bg-[#1D4D19] text-white font-bold mt-6 cursor-pointer rounded-[2px] ">
            Mudar Senha
          </Button>
        </Link>
      </div>
    </main>
  );
}
