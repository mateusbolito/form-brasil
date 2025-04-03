import { IOrderData } from '@/types/get-order';
import { useQuery, UseQueryResult } from "@tanstack/react-query"

import { api } from "./api";

interface ConsultarOrdemParams {
  ordemProducao: string;
  pedidoVenda: any;
}

export interface IRolesList {
  id: string;
  name: string;
  menus: string[];
  status: string;
  createdBy: string;
  createdAt: string;
  allowEveryoneAlways: boolean;
}

export function useQueryGetOrder({ ordemProducao, pedidoVenda }: ConsultarOrdemParams): UseQueryResult<IOrderData[], Error> {
  return useQuery({
    queryKey: ["Order-by-id", ordemProducao, pedidoVenda],
    queryFn: async () => {
      try {
        const response = await api.get(`formulario/carregamento/000000/${ordemProducao}/${pedidoVenda}`);
        const data = response.data;
        return data;
      } catch (e: unknown) {
        const error = e;
        throw new Error(error as string);
      }
    },
    enabled: false,
    retry: false
  });
}
