import { Input } from "@/components/ui/input";

export default function FormularioCarregamento() {
  return (
    <div className="container mx-auto max-w-4xl p-6 min-h-screen pb-28">
      <h2 className="flex text-3xl font-bold mb-4 mt-7">
        Formulário de Carregamento
      </h2>
      <span className="border-t-2 flex"></span>

      <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-left">
            Ordem de Produção
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite ou escaneie"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-left">
            Pedido de Venda
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite ou escaneie"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4 mt-7">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-left">
            Código FE
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite o código FE"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-left">
            Descrição
          </label>
          <Input
            type="text"
            className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
            placeholder="Digite a descrição"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-left">Cliente</label>
        <Input
          type="text"
          className="w-full border p-2 rounded border-gray-200 mt-[15px] focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
          placeholder="Digite o nome do cliente"
        />
      </div>
    </div>
  );
}
