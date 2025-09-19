
import { useMutation, useQueryClient,  } from "@tanstack/react-query";

import { createShippingAddress } from "@/actions/create-shipping-address";

import { getUserAddressesQueryKey } from "../queries/use-user-addresses";


// chave para que vai ser reutilizada em outros hooks
export const getCreateShippingAddressMutationKey = () =>
    ['create-shipping-address'] as const;


    // add novo endereço
    export const useCreateShippingAddress = () => {
        const queryClient = useQueryClient()

        return useMutation({
            mutationKey: getCreateShippingAddressMutationKey(),
            mutationFn: createShippingAddress,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: getUserAddressesQueryKey(),
                })
            }
        });
};
