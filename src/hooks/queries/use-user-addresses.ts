import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/actions/get-user-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getUserAddressesQueryKey = () => ['user-addresses'] as const;

export const useGetUserAddresses = (params: {
    initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
    return useQuery({
        queryKey: getUserAddressesQueryKey(),
        queryFn: getUserAddresses, // funcao q vai pegar os dados do carrinho src\actions\get-cart\index.ts
        initialData: params?.initialData,
    });
};