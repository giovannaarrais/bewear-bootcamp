"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";


interface AddProductToCartProps{
    productVariantId: string;
    quantity: number;
}

const AddToCartButton = ({ productVariantId, quantity }: AddProductToCartProps) => {
  // useMutation: propriedade do react query, onde lida com mudanças frenquentes: adicao, delete...
    const {mutate, isPending} = useMutation({
        mutationKey: ["addProductToCart", productVariantId, quantity],
        mutationFn: () => //src\actions\add-cart-product\index.ts
        addProductToCart({
            productVariantId,
            quantity
        })
        ,
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
