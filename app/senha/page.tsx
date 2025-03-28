import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Senha() {
  return (
    <main className="block font-semibold mt-5">
      <h1 className="text-[#1D4D19] text-2xl sm:text-4xl md:text-5xl flex items-center justify-center">
        Quer Mudar sua Senha ?
      </h1>

      <div className="flex items-center justify-start text-2xl text-left sm:justify-center sm:text-center pl-4 mt-10">
        <h4>Mudar Senha</h4>
      </div>

      <div className="flex items-center justify-start sm:justify-center pl-4 mt-10">
        <p className="text-xs w-full sm:w-96 max-sm:max-w-80 text-[#333] ">
          Insira seu endereço de e-mail ou nome de usuário. Você receberá um
          link para criar uma nova senha por e-mail.
        </p>
      </div>

      <div className="flex items-center justify-start sm:justify-center pl-4 mt-5">
        <form action="">
          <label htmlFor="senha" className="text-xs">
            Email Address or Username
          </label>

          <Input type="email" className=" sm:w-[400px] mt-1 max-sm:max-w-96" />

          <Button className="bg-[#1D4D19] text-white font-bold mt-4 w-full sm:w-auto max-sm:max-w-32 cursor-pointer rounded-[2px] ">
            Mudar Senha
          </Button>
        </form>
      </div>
    </main>
  );
}
