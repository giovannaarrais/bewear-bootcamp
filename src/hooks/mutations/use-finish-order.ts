import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { finishOrder } from "@/actions/finish-order";

import { getUseCartQueryKey } from "../queries/use-cart";

// chave para que vai ser reutilizada em outros hooks
export const getFinishOrderMutationKey = () => ["finish_order"] as const ;

export const useFinishOrder = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: getFinishOrderMutationKey(),
        mutationFn: async () => {
            return await finishOrder();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getUseCartQueryKey()
            })

            toast.success("Compra finalizada com sucesso!")
        },
        onError: (error) => {
            toast.error("Erro ao finalizar compra")
            console.log("erro ao finalizar compra", error)
        }
    });
};
