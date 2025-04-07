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

function formatParam(value: string | undefined, spaceCount: number): string {
  if (value && value.trim() !== "") {
    return value;
  }
  return "%20".repeat(spaceCount);
}

export function useQueryGetOrder({ ordemProducao, pedidoVenda }: ConsultarOrdemParams): UseQueryResult<IOrderData[], Error> {
  const pedidoParam = formatParam(pedidoVenda, 9);   // 9 espaços => 9 * "%20"
  const ordemParam = formatParam(ordemProducao, 6);  // 6 espaços => 6 * "%20"

  return useQuery({
    queryKey: ["Order-by-id", pedidoParam, ordemParam],
    queryFn: async () => {
      try {
        const response = await api.get(`formulario/carregamento/000000/${pedidoParam}/${ordemParam}`);
        return response.data;
      } catch (e: unknown) {
        throw new Error((e as Error)?.message || 'Erro ao buscar ordem');
      }
    },
    enabled: false,
    retry: false,
  });
}