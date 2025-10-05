"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";


interface AddProductToCartProps{
    productVariantId: string;
    quantity: number;
    onError?: (error: Error) => void; // callback opcional
}

const AddToCartButton = ({ productVariantId, quantity, onError }: AddProductToCartProps) => {
    const queryClient = useQueryClient();

  // useMutation: propriedade do react query, onde lida com mudanças frenquentes: adicao, delete...
    const {mutate, isPending} = useMutation({
        mutationKey: ["addProductToCart", productVariantId, quantity],
        mutationFn: () => //src\actions\add-cart-product\index.ts
        addProductToCart({
            productVariantId,
            quantity
        }),
        onSuccess: () => {
            // informa para o react refazer todas a queries dessa chave cart, ou seja
            // auxilia na adicao de produtos, onde estantaneamente quando add um produto ele ja vai estar no carrinho
            queryClient.invalidateQueries({queryKey: ['cart']})
        },
        onError: (err: unknown) => {
            if(err instanceof Error){
                if (err.message.includes("Unauthorized")){
                    onError?.(err)
                }
                else{
                    toast.error("Erro ao adicionar ao carrinho")
                }
            }
        }
    });


    return (
        <>
            <Button
                variant="outline"
                className="rounded-3xl sm:py-6 py-4 font-semibold flex-1"
                disabled={isPending}
                onClick={() => mutate()}
            >
            {isPending && <Loader2 className="animate-spin"></Loader2>}
                Adicionar à sacola
            </Button>
        </>
        
    );
};

export default AddToCartButton;
