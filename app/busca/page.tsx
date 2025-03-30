import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaBarcode, FaSearch } from "react-icons/fa";

export default function BuscaPvOp() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mt-5">
      <h2 className="font-semibold text-[#1D4D19] text-xl sm:text-3xl">
        Digitar ou Scanear o Pedido de Venda ou Ordem de Produção
      </h2>

      <h4 className="text-[#1D4D19] text-lg sm:text-2xl font-semibold">
        Preencha apenas um dos campos abaixo
      </h4>

      <main className="flex flex-col sm:flex-row sm:gap-3 w-full justify-center">
        <div className="flex flex-col items-center sm:items-start w-full sm:w-[300px]">
          <label
            htmlFor="ordem"
            className="flex text-left sm:text-left sm:w-auto"
          >
            Ordem de Produção
          </label>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 w-full">
            <Input
              type="email"
              placeholder="Op"
              className="w-full sm:w-[200px] mt-1"
            />

            <Button className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white cursor-pointer">
              <FaBarcode />
            </Button>
            <Button className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white cursor-pointer">
              <FaSearch />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start w-full sm:w-[300px] mt-4 sm:mt-0">
          <label htmlFor="pedido" className="flex">
            Pedido de Venda
          </label>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 w-full">
            <Input
              type="email"
              placeholder="Pv"
              className="w-full sm:w-[200px] mt-1"
            />
            <Button className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white cursor-pointer">
              <FaBarcode />
            </Button>
            <Button className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white cursor-pointer">
              <FaSearch />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
