"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useQueryGetOrder } from "@/services/useQueryGetOrder";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuscaPvOp() {
  const [ordemProducao, setOrdemProducao] = useState("");
  const [pedidoVenda, setPedidoVenda] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data, refetch, isSuccess } = useQueryGetOrder({
    ordemProducao,
    pedidoVenda,
  });

  const handleSearchClick = async (op: string, pv: string) => {
    setIsLoading(true);
    await refetch();
  };

  useEffect(() => {
    if (data && isSuccess) {
      setIsLoading(false);
      localStorage.setItem("formularioData", JSON.stringify(data));
      router.push("/formulario");
    }
  }, [data, isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mt-5 px-4">
      <h2 className="font-semibold text-[#1D4D19] text-xl sm:text-3xl">
        Digitar ou Scanear o Pedido de Venda ou Ordem de Produção
      </h2>
      <h4 className="text-[#1D4D19] text-lg sm:text-2xl font-semibold">
        Preencha apenas um dos campos abaixo
      </h4>
      <main className="flex flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-start sm:gap-3 w-full max-w-lg">
        <div className="flex flex-col w-full max-w-xs sm:max-w-md sm:ml-0">
          <label htmlFor="ordem" className="text-left w-full">
            Ordem de Produção
          </label>
          <div className="flex items-center gap-1.5 w-full">
            <Input
              type="text"
              placeholder="Op"
              value={ordemProducao}
              onChange={(e) => setOrdemProducao(e.target.value)}
              className="w-full mt-1"
            />
            <Button
              onClick={() => handleSearchClick(ordemProducao, "")}
              className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white"
            >
              {isLoading && ordemProducao ? (
                <Loader2 className="animate-spin" />
              ) : (
                <FaSearch />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-xs sm:max-w-md sm:ml-0 mt-4 sm:mt-0">
          <label htmlFor="pedido" className="text-left w-full">
            Pedido de Venda
          </label>
          <div className="flex items-center gap-1.5 w-full">
            <Input
              type="text"
              placeholder="Pv"
              value={pedidoVenda}
              onChange={(e) => setPedidoVenda(e.target.value)}
              className="w-full mt-1"
            />
            <Button
              onClick={() => handleSearchClick("", pedidoVenda)}
              className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white"
            >
              {isLoading && pedidoVenda ? (
                <Loader2 className="animate-spin" />
              ) : (
                <FaSearch />
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
