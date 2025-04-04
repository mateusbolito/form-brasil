"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IOrderData } from "@/types/get-order";
import {
  Barcode,
  Check,
  Keyboard,
  Save,
  X,
  ArrowLeftCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postFormularioCarregamento } from "@/services/api/postFormularioCarregamento";

export default function FormularioCarregamento() {
  const [formData, setFormData] = useState<IOrderData>();
  const router = useRouter();
  const [dadosFaturamento, setDadosFaturamento] = useState({
    quantidade: '',
    placa: '',
    transportadora: '',
    localImpressao: '',
    observacao: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formularioData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDadosFaturamento(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const dadosParaEnviar = {
        ZP_PEDIDO: formData?.items[0]?.ZQ_PEDIDO || '',
        ZP_OP: formData?.items[0]?.ZQ_ORDEM || '',
        ZP_DATA: new Date().toISOString().split('T')[0],
        ZP_QTDECAR: Number(dadosFaturamento.quantidade),
        ZP_PLACA: dadosFaturamento.placa,
        ZP_TRANSP: dadosFaturamento.transportadora,
        ZP_LOCIMP: dadosFaturamento.localImpressao,
        ZP_OBS: dadosFaturamento.observacao,
        ZP_LOTE: [] // Aqui você pode adicionar os lotes quando implementar essa funcionalidade
      };

      await postFormularioCarregamento(dadosParaEnviar);
      alert('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar formulário');
    }
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
          <label className="block text-sm font-medium text-left">Quantidade</label>
          <Input
            type="number"
            name="quantidade"
            value={dadosFaturamento.quantidade}
            onChange={handleInputChange}
            className="w-full border p-2 rounded border-gray-200 mt-[15px]"
            placeholder="Digite a quantidade"
          />
        </div>

        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-left">Placa</label>
          <Input
            type="text"
            name="placa"
            value={dadosFaturamento.placa}
            onChange={handleInputChange}
            className="w-full border p-2 rounded border-gray-200 mt-[15px]"
            placeholder="Digite a placa"
          />
        </div>

        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-left">
            Transportadora
          </label>
          <Input
            type="text"
            name="transportadora"
            value={dadosFaturamento.transportadora}
            onChange={handleInputChange}
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
            name="localImpressao"
            value={dadosFaturamento.localImpressao}
            onChange={handleInputChange}
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
          name="observacao"
          value={dadosFaturamento.observacao}
          onChange={handleInputChange}
          placeholder="Observações sobre o faturamento"
          rows={4}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSubmit}
          className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-md bg-white transition-all hover:bg-[#1D4D19] hover:text-white"
        >
          <Save size={18} /> SALVAR
        </Button>
      </div>

      <h2 className="flex text-3xl font-bold mb-4 mt-7">CARREGAMENTO </h2>

      <div className="w-full mt-4">
        <table className="w-full border-collapse border border-gray-200">
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
        </table>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex justify-start gap-[5px]">
          <Button className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-md bg-white transition-all hover:bg-[#1D4D19] hover:text-white">
            <Keyboard size={18} /> DIGITAR
          </Button>
          <Button className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-md bg-white transition-all hover:bg-[#1D4D19] hover:text-white">
            <Barcode size={18} /> CARREGAR
          </Button>
        </div>
        <div className="flex justify-start mt-4">
          <Button className="flex items-center gap-2 cursor-pointer px-6 py-3 font-bold border-2 border-[#1D4D19] text-[#1D4D19] rounded-md bg-white transition-all hover:bg-[#1D4D19] hover:text-white print:hidden">
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
