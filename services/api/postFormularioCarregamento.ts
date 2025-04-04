import { api } from "../api";

interface IFormularioCarregamentoPost {
  ZP_FILIAL: string;
  ZP_CODFORM: string;
  ZP_PEDIDO: string;
  ZP_OP: string;
  ZP_DATA: string;
  ZP_NOTA: string;
  ZP_QTDECAR: number;
  ZP_PLACA: string;
  ZP_TRANSP: string;
  ZP_LOCIMP: string;
  ZP_OBS: string;
  ZP_CODUSER: string;
  ZP_STATUS: string;
  ZP_LOTE: string[];
}

export const postFormularioCarregamento = async (data: Partial<IFormularioCarregamentoPost>) => {
  const dadosParaEnviar = {
    ZP_FILIAL: "02",
    ZP_CODFORM: "FORMCARREGA0001",
    ZP_CODUSER: "000000",
    ZP_STATUS: "A",
    ...data
  };

  const response = await api.post('formulario/carregamento', dadosParaEnviar);
  return response.data;
}; 