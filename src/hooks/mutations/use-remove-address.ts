import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeAddress } from "@/actions/remove-address";
import { getUserAddressesQueryKey } from "@/hooks/queries/use-user-addresses";

export const getRemoveAddressMutationKey = (shippingAddressId: string) =>
    ["address", shippingAddressId] as const;

export const useRemoveAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["remove-address"],
        mutationFn: (shippingAddressId: string) =>
            removeAddress({ shippingAddressId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUserAddressesQueryKey(),
            });
        },
    });
};
