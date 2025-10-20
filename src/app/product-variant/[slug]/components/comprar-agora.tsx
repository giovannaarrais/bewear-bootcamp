"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface ComprarAgoraProps {
    productVariantId: string,
    quantity: number
}

const ComprarAgora = ({ productVariantId, quantity }: ComprarAgoraProps) => {

    const router = useRouter()
    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationKey:['addProductToCart', productVariantId, quantity],
        mutationFn: () => addProductToCart({ productVariantId, quantity }),
        onSuccess: () => {
            console.log('Comprar agora ativado!!!!!')
            router.push('/cart/identification')
            queryClient.invalidateQueries({queryKey: ['cart']})
        },
        onError: (error) => {
            console.log('Erro ao comprar agora: ', error)
        }
    })

    return (
        <>
            <Button 
                variant="default" 
                className="rounded-3xl sm:py-6 py-4 font-semibold flex-1" 
                onClick={() => mutate()} 
                disabled={isPending}
            >
                Comprar Agora
                {isPending && <Loader2  className="animate-spin"> </Loader2>}
            </Button>
        </>
    );
};

export default ComprarAgora;