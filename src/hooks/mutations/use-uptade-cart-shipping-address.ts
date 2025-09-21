import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    UpdateCartShippingAddressSchema,
    updateCartShippingAddressSchema,
} from "@/actions/uptade-cart-shipping-address/schema";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUptadeCartShippingAddressMutationKey = () => [
    "update-cart-shipping-address",
];

export const useUptadeCartShippingAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: getUptadeCartShippingAddressMutationKey(),
        mutationFn: updateCartShippingAddressSchema.parseAsync,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUseCartQueryKey,
            });
        },
    });
};
