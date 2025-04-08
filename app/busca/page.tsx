"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useQueryGetOrder } from "@/services/useQueryGetOrder";
import { Barcode, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BarcodeScanner } from "@/components/BarcodeScanner";

export default function BuscaPvOp() {
  const [ordemProducao, setOrdemProducao] = useState("");
  const [pedidoVenda, setPedidoVenda] = useState("");

  const [isScannerOpenOP, setIsScannerOpenOP] = useState(false);
  const [isScannerOpenPV, setIsScannerOpenPV] = useState(false);
  const [isLoadingOP, setIsLoadingOP] = useState(false);
  const [isLoadingPV, setIsLoadingPV] = useState(false);

  const router = useRouter();
  const { data, refetch, isSuccess, isError, error } = useQueryGetOrder({
    ordemProducao,
    pedidoVenda,
  });

  const handleSearchClick = async (op: string, pv: string) => {
    if (op) {
      setIsLoadingOP(true);
      setIsLoadingPV(false);
      setPedidoVenda(""); // zera o outro campo
    } else if (pv) {
      setIsLoadingPV(true);
      setIsLoadingOP(false);
      setOrdemProducao(""); // zera o outro campo
    }

    await refetch();
  };

  useEffect(() => {
    if (data && isSuccess && (isLoadingOP || isLoadingPV)) {
      toast.success("Encontrado com sucesso!");
      setIsLoadingOP(false);
      setIsLoadingPV(false);
      localStorage.setItem("formularioData", JSON.stringify(data));
      router.push("/formulario");
    }
    if (isError && (isLoadingOP || isLoadingPV)) {
      toast.error(`Erro durante a busca: ${error.message}`);
      setIsLoadingOP(false);
      setIsLoadingPV(false);
    }
  }, [
    data,
    isSuccess,
    isError,
    isLoadingOP,
    isLoadingPV,
    router,
    error?.message,
  ]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mt-5 px-4">
      <h2 className="font-semibold text-[#1D4D19] text-xl sm:text-3xl">
        Digitar ou Scanear o Pedido de Venda ou Ordem de Produção
      </h2>
      <h4 className="text-[#1D4D19] text-lg sm:text-2xl font-semibold">
        Preencha apenas um dos campos abaixo
      </h4>
      <main className="flex flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-start sm:gap-3 gap-4 w-full max-w-lg">
        <div className="flex flex-col w-full max-w-xs sm:max-w-md sm:ml-0">
          <label htmlFor="ordem" className="text-left w-full">
            Ordem de Produção
          </label>
          <div className="flex items-center gap-1.5 w-full">
            <Input
              type="text"
              placeholder="OP"
              value={ordemProducao}
              onChange={(e) => setOrdemProducao(e.target.value)}
              onKeyDown={
                (e) => {
                  if(e.key === "Enter") {
                    e.preventDefault();
                    handleSearchClick(ordemProducao, "");
                  }
                } 
              }
              className="w-full mt-1 h-[42px]"
            />
            <Button
              onClick={() => setIsScannerOpenOP(true)}
              className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white cursor-pointer"
              title="Escanear Ordem"
            >
              <Barcode />
            </Button>
            <Button
              onClick={() => handleSearchClick(ordemProducao, "")}
              className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white cursor-pointer"
            >
              {isLoadingOP && ordemProducao ? (
                <Loader2 className="animate-spin" />
              ) : (
                <FaSearch />
              )}{" "}
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-xs sm:max-w-md sm:ml-0">
          <label htmlFor="ordem" className="text-left w-full">
            Pedido de venda
          </label>
          <div className="flex items-center gap-1.5 w-full">
            <Input
              type="text"
              placeholder="PV"
              value={pedidoVenda}
              onChange={(e) => setPedidoVenda(e.target.value)}
               onKeyDown={
                (e) => {
                  if(e.key === "Enter") {
                    e.preventDefault();
                    handleSearchClick("", pedidoVenda);
                  }
                } 
              }
              className="w-full mt-1 h-[42px]"
            />
            <Button
              onClick={() => setIsScannerOpenPV(true)}
              className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white cursor-pointer"
              title="Escanear Pedido"
            >
              <Barcode />
            </Button>
            <Button
              onClick={() => handleSearchClick("", pedidoVenda)}
              className="w-[42px] h-[42px] bg-white border-2 border-[#1D4D19] text-[#1D4D19] hover:bg-[#1D4D19] hover:text-white  cursor-pointer"
            >
              {isLoadingPV && pedidoVenda ? (
                <Loader2 className="animate-spin" />
              ) : (
                <FaSearch />
              )}
            </Button>
          </div>
        </div>
        {isScannerOpenOP && (
          <BarcodeScanner
            onDetected={(code) => {
              setOrdemProducao(code);
              setIsScannerOpenOP(false);
            }}
            onClose={() => setIsScannerOpenOP(false)}
          />
        )}

        {isScannerOpenPV && (
          <BarcodeScanner
            onDetected={(code) => {
              setPedidoVenda(code);
              setIsScannerOpenPV(false);
            }}
            onClose={() => setIsScannerOpenPV(false)}
          />
        )}
      </main>
    </div>
  );
}
