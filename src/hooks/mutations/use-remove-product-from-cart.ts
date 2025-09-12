import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProductFromCart } from "@/actions/remove-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

// chave para que vai ser reutilizada em outros hooks
export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
    ["remove-cart-product", cartItemId] as const;

    export const useRemoveProductFromCart = (cartItemId: string) => {
    const queryClient = useQueryClient();

    // remover produto do carirnho
    return useMutation({
        mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
        mutationFn: () => removeProductFromCart({ cartItemId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getUseCartQueryKey });
        },
    });
};
