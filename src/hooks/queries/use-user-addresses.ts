import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/actions/get-user-addresses";

export const getUserAddressesQueryKey = () => ['user-addresses'] as const;

export const useGetUserAddresses = () => {
    return useQuery({
        queryKey: getUserAddressesQueryKey(),
        queryFn: getUserAddresses, // funcao q vai pegar os dados do carrinho src\actions\get-cart\index.ts
    });
};