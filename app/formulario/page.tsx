"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IOrderData } from "@/types/get-order";
import {
  Barcode,
  Check,
  Save,
  X,
  ArrowLeftCircle,
  Trash,
  Pencil,
  Keyboard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function FormularioCarregamento() {
  const [loteInput, setLoteInput] = useState("");
  const [lotes, setLotes] = useState<{ seq: number; lote: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<IOrderData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem("formularioData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  const handleSaveLote = () => {
    if (!loteInput.trim()) return;

    if (editingIndex !== null) {
      const updatedLotes = [...lotes];
      updatedLotes[editingIndex].lote = loteInput;
      setLotes(updatedLotes);
      setEditingIndex(null);
    } else {
      setLotes([...lotes, { seq: lotes.length + 1, lote: loteInput }]);
    }

    setLoteInput("");
    setIsModalOpen(false);
  };

  const handleEditLote = (index: number) => {
    setLoteInput(lotes[index].lote);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteLote = (index: number) => {
    const updatedLotes = lotes.filter((_, i) => i !== index);
    setLotes(updatedLotes);
  };
  return (
    <div className="container mx-auto max-w-4xl p-6 min-h-screen pb-28">
      <h2 className="flex text-3xl font-bold mb-4 mt-7">
        Formulário de Carregamento
      </h2>
      <button onClick={() => router.back()} className="cursor-pointer ">
        <ArrowLeftCircle />
      </button>
      <span className="border-t-2 flex border-t-gray-100"></span>

      <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Ordem de Produção
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite ou escaneie"
            value={formData?.items[0]?.ZQ_ORDEM}
            disabled
          />
        </div>
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Pedido de Venda
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite ou escaneie"
            value={formData?.items[0]?.ZQ_PEDIDO}
            disabled
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Código FE
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite o código FE"
            value={formData?.items[0]?.ZQ_CODFE}
            disabled
          />
        </div>
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Descrição
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite a descrição"
            value={formData?.items[0]?.ZQ_OBS}
            disabled
          />
        </div>
      </div>

      <div className="w-full cursor-not-allowed">
        <label className="block text-sm font-medium text-left">Cliente</label>
        <Input
          type="text"
          className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
          placeholder="Digite o nome do cliente"
          value={formData?.items[0]?.ZQ_CLIENTE}
          disabled
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Nota Fiscal
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite o número da nota fiscal"
            value={formData?.items[0]?.ZQ_NF}
            disabled
          />
        </div>
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Qtd. Pedido de Venda
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Quantidade de pedido"
            value={formData?.items[0]?.ZQ_QTDE}
            disabled
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Data de Entrega
          </label>
          <Input
            type="date"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite o código FE"
            value={formData?.items[0]?.ZQ_DTENTR}
            disabled
          />
        </div>
        <div className="w-full md:w-1/2 cursor-not-allowed">
          <label className="block text-sm font-medium text-left">
            Local Entrega
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Local de entrega"
            value={formData?.items[0]?.ZQ_LOCENT}
            disabled
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-left">
          Observações
        </label>
        <textarea
          className="w-full border h-[80px]  p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200 cursor-not-allowed"
          placeholder="Observações adicionais"
          value={formData?.items[0]?.ZQ_OBS}
          disabled
          rows={4}
        />
      </div>

      <h2 className="flex text-3xl font-bold mb-4 mt-7">
        Dados Para Faturamento
      </h2>
      <span className="border-t-2 flex border-t-gray-100"></span>
      <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-left">
            Quantidade
          </label>
          <Input
            type="number"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite a quantidade"
          />
        </div>

        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-left">Placa</label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite a placa"
          />
        </div>

        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-left">
            Transportadora
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Nome da transportadora"
          />
        </div>

        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-left">
            Local de Impressão NFe
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite o local"
          />
        </div>
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-left">
          Observação de Faturamento
        </label>
        <textarea
          className="w-full border h-[80px]  p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
          placeholder="Observações sobre o faturamento"
          rows={4}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button className=" cursor-pointer flex items-center gap-2 px-6 py-3 font-bold w-[148px] h-[35px] border-2 border-[#198754] text-[#198754] rounded-md bg-white transition-all hover:bg-[#1D4D19] hover:text-white">
          <Check size={18} /> SOLICITAR NFE
        </Button>
      </div>

      <h2 className="flex text-3xl font-bold mb-4 mt-7">CARREGAMENTO </h2>

      <div className="w-full mt-4">
        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                SEQ
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                LOTE
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                AÇÃO
              </th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border px-4 py-2">{item.seq}</td>
                <td className="border px-4 py-2">{item.lote}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => handleEditLote(index)}
                    className="text-yellow-300 hover:bg-[#1D4D19] hover:text-yellow-400 cursor-pointer"
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteLote(index)}
                    className="text-red-600 hover:bg-[#1D4D19] cursor-pointer"
                  >
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex justify-start gap-[5px]">
          <Button
            size={"large"}
            className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-xs  bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
          >
            <Save size={18} /> SALVAR
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                size={"large"}
                onClick={() => setIsModalOpen(true)}
                className="rounded-xs flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19]  bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
              >
                <Keyboard size={18} />
                DIGITAR
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1">
                  <Keyboard size={18} />
                  {editingIndex !== null ? "Editar" : "Digitar"} Lote
                </DialogTitle>
              </DialogHeader>
              <p className="text-base">Número do Lote</p>
              <Input
                type="text"
                placeholder="Digite o lote..."
                value={loteInput}
                onChange={(e) => setLoteInput(e.target.value)}
                className="w-full border p-2 rounded border-gray-200"
              />
              <p className="text-xs">
                Digite o número do lote no formato indicado
              </p>
              <div className="flex justify-end mt-4">
                <Button className="bg-gray-400 text-white text-base cursor-pointer">
                  <X size={18} />
                  Cancelar
                </Button>

                <DialogClose>
                  <Button
                    onClick={handleSaveLote}
                    className="bg-blue-500 text-white ml-2 cursor-pointer hover:opacity-40 text-base"
                  >
                    <Check size={18} />
                    Confirmar
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            size={"large"}
            className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-xs  bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
          >
            <Barcode size={18} /> CARREGAR
          </Button>
        </div>
        <div className="flex justify-start mt-4">
          <Button
            size={"large"}
            className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-xs  bg-white transition-all hover:bg-[#1D4D19] hover:text-white print:hidden"
          >
            <X size={18} /> ENCERRAR
          </Button>
        </div>
      </div>
      <div className="flex items-center  justify-center mt-3">
        <Button
          onClick={() => window.print()}
          className="bg-[#1D4D19] text-white cursor-pointer w-2xs font-bold print:hidden"
        >
          Imprimir PDF
        </Button>
      </div>
    </div>
  );
}
