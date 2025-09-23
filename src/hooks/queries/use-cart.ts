import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

// chave para que vai ser reutilizada em outros hooks
export const getUseCartQueryKey = () => ["cart"] as const;

export const useCart = (params?: {
  initialData?: Awaited<ReturnType<typeof getCart>>
}) => {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: () => getCart(), // funcao q vai pegar os dados do carrinho src\actions\get-cart\index.ts
    initialData: params?.initialData, // logica para evitar carregamento demorado de endereço padrao selecinado
  });
};
