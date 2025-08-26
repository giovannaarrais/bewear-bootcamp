"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";


interface AddProductToCartProps{
    productVariantId: string;
    quantity: number;
}

const AddToCartButton = ({ productVariantId, quantity }: AddProductToCartProps) => {
    
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
        }
    });

    return (
        <Button 
            variant="outline" 
            className="rounded-3xl py-6 font-semibold"
            disabled={isPending}
            onClick={() => mutate()}
        > 
        {isPending && <Loader2 className="animate-spin"></Loader2>}
            Adicionar à sacola 
        </Button>
        
    );
};

export default AddToCartButton;
